"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _thread = _interopRequireDefault(require("./thread.model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createThread = function createThread(model) {
  return (/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var doc;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                console.log(req.user);
                _context.next = 4;
                return model.create(_objectSpread({}, req.body, {
                  createdBy: req.user._id
                }));

              case 4:
                doc = _context.sent;
                res.status(201).json({
                  data: doc
                });
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                res.status(404).json(_context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

var getThreads = function getThreads(model) {
  return (/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var docs;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return model.find({});

              case 3:
                docs = _context2.sent;
                res.status(201).json({
                  data: docs
                });
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                res.status(404).json(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};

var deleteThread = function deleteThread(model) {
  return (/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var doc;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return model.findOne({
                  id: req.body.thread_id
                });

              case 3:
                doc = _context3.sent;
                console.log("user: ", req.user);
                console.log("doc: ", doc);

                if (!(req.user._id === doc.createdBy)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", res.status(201).json({
                  data: doc
                }));

              case 8:
                res.status(404).json({
                  message: "ERROR: A thread may only be deleted by it's creator."
                });
                _context3.next = 15;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                res.status(404).json(_context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};

var updateThread = function updateThread(model) {
  return (/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var doc, updatedDoc;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return model.findOne({
                  id: req.body.thread_id
                });

              case 3:
                doc = _context4.sent;
                console.log("user: ", req.user);
                console.log("doc: ", doc);

                if (!(req.user._id === doc.createdBy)) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 9;
                return model.findByIdAndUpdate(req.body.thread_id, req.body.thread_update);

              case 9:
                updatedDoc = _context4.sent;
                return _context4.abrupt("return", res.status(201).json({
                  data: updatedDoc
                }));

              case 11:
                res.status(404).json({
                  message: "ERROR: A thread may only be updated by it's creator."
                });
                _context4.next = 18;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                res.status(404).json(_context4.t0);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 14]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};

var controller = {
  createThread: createThread(_thread["default"]),
  getThreads: getThreads(_thread["default"]),
  deleteThread: deleteThread(_thread["default"]),
  updateThread: updateThread(_thread["default"])
};
var _default = controller; // 5e6cadbc5497f9ae12108a2a thread id

exports["default"] = _default;