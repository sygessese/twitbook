"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.login = exports.signup = exports.verifyToken = exports.newToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("./config"));

var _user = _interopRequireDefault(require("./users/user.model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

// returns new token, stores user id
var newToken = function newToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user.id,
    username: user.username
  }, _config["default"].secrets.jwt, {
    expiresIn: _config["default"].secrets.jwtExp
  });
}; // checks token is alive, returns user


exports.newToken = newToken;

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].verify(token, _config["default"].secrets.jwt, function (err, payload) {
      if (err) return reject(err);
      resolve(payload);
    });
  });
}; // creates new user, creates new token, returns token


exports.verifyToken = verifyToken;

var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, token, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);

            if (!(!req.body.email || !req.body.password)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "need email and password"
            }));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _user["default"].create(req.body);

          case 6:
            user = _context.sent;
            token = newToken(user);
            return _context.abrupt("return", res.status(201).send({
              token: token,
              username: user.username
            }));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);

            if (_context.t0.errmsg.indexOf("username_1") !== -1) {
              error = "ERROR: There is already an account associated with this username";
            }

            if (_context.t0.errmsg.indexOf("email_1") !== -1) {
              error = "ERROR: There is already an account associated with this email";
            }

            return _context.abrupt("return", res.status(500).send(error));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 11]]);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // finds user by email, checks password, creates new token, returns token


exports.signup = signup;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var invalid, user, match, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!req.body.username || !req.body.password)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              message: "need username and password"
            }));

          case 2:
            invalid = {
              message: "Invalid username and passoword combination"
            };
            _context2.prev = 3;
            _context2.next = 6;
            return _user["default"].findOne({
              username: req.body.username
            }).select("email password username").exec();

          case 6:
            user = _context2.sent;

            if (user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(401).send(invalid));

          case 9:
            _context2.next = 11;
            return user.checkPassword(req.body.password);

          case 11:
            match = _context2.sent;

            if (match) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(401).send(invalid));

          case 14:
            token = newToken(user);
            return _context2.abrupt("return", res.status(201).send({
              token: token,
              username: user.username
            }));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](3);
            console.error(_context2.t0);
            res.status(500).end();

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 18]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // grabs token from header, if token is alive then returns user id, uses user id to find
// user in database, adds user info to request object, continues with route


exports.login = login;

var protect = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var bearer, token, payload, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            bearer = req.headers.authorization;

            if (!(!bearer || !bearer.startsWith("Bearer "))) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(401).end());

          case 3:
            token = bearer.split("Bearer ")[1].trim();
            _context3.prev = 4;
            _context3.next = 7;
            return verifyToken(token);

          case 7:
            payload = _context3.sent;
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](4);
            return _context3.abrupt("return", res.status(401).end());

          case 13:
            _context3.next = 15;
            return _user["default"].findById(payload.id).select("-password").lean().exec();

          case 15:
            user = _context3.sent;

            if (user) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", res.status(401).end());

          case 18:
            req.user = user;
            next();

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 10]]);
  }));

  return function protect(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}(); // sign in needs username and password
// sign up needs email, username and password
// protect needs bearer token in header, attaches user to req as property


exports.protect = protect;