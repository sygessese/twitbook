"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("./user.model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createUser = function createUser(model) {
  return (/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var doc;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return model.create(_objectSpread({}, req.body));

              case 3:
                doc = _context.sent;
                res.status(201).json({
                  data: doc
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                res.status(404).json(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}; // to follow user


var followUser = function followUser(model) {
  return (/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var userToBeFollowed, thisUser;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(req.user.following.toString().indexOf(req.params.user) > -1)) {
                  _context2.next = 5;
                  break;
                }

                res.status(201).json({
                  data: {
                    mesage: "you are already following this user"
                  }
                });
                _context2.next = 12;
                break;

              case 5:
                _context2.next = 7;
                return model.findOneAndUpdate({
                  _id: req.params.user
                }, {
                  $push: {
                    followers: req.user._id
                  }
                });

              case 7:
                userToBeFollowed = _context2.sent;
                _context2.next = 10;
                return model.findOneAndUpdate({
                  _id: req.user._id
                }, {
                  $push: {
                    following: req.params.user
                  }
                });

              case 10:
                thisUser = _context2.sent;
                return _context2.abrupt("return", res.status(201).json({
                  data: [userToBeFollowed, thisUser]
                }));

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                res.status(404).json(_context2.t0);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 14]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}; //userModel.find( {id: _id}, { feed: { $slice: [ 20, 10 ] } } ),
//returns ten after skipping first 20
//userModel.find( {id: _id}, { feed: { $slice: [ -20, 10 ] } } )
// returns ten before last 20


var getHomePage = function getHomePage(model) {
  return (/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var doc;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return model.findById(req.user._id).populate({
                  path: "feed.itemId",
                  populate: {
                    path: "createdBy ",
                    select: "username"
                  }
                });

              case 3:
                doc = _context3.sent;
                res.status(200).json({
                  data: doc.feed
                });
                doc.feed = doc.feed.filter(function (item) {
                  return item.itemId;
                });
                _context3.next = 8;
                return doc.save();

              case 8:
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                return _context3.abrupt("return", res.status(404).end());

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};

var controller = {
  createUser: createUser(_user["default"]),
  followUser: followUser(_user["default"]),
  getHomePage: getHomePage(_user["default"])
};
var _default = controller; // id 5e6cab7f3bd21baca222cca8

exports["default"] = _default;