"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _post = _interopRequireDefault(require("./post.model"));

var _thread = _interopRequireDefault(require("../threads/thread.model"));

var _user = _interopRequireDefault(require("../users/user.model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// to create a post on a thread
var createPost = function createPost(model) {
  return (/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var doc, pArray, feedUpdated;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return model.create(_objectSpread({}, req.body, {
                  createdBy: req.user._id
                }));

              case 3:
                doc = _context2.sent;
                pArray = req.user.followers.map( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
                    var response;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            response = _user["default"].findByIdAndUpdate(userId, {
                              $push: {
                                feed: {
                                  itemId: doc._id,
                                  itemModel: "post"
                                }
                              }
                            });
                            return _context.abrupt("return", response);

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context2.next = 7;
                return Promise.all(pArray);

              case 7:
                feedUpdated = _context2.sent;
                res.status(201).json({
                  data: [doc, pArray, feedUpdated]
                });
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0);
                res.status(400).end();

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}; // to get all posts for a thread


var getPosts = function getPosts(model) {
  return (/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var docs, thread;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return model.find({
                  thread: req.params.thread_id
                }).sort("-createdAt").populate("replies.createdBy", "username").populate("createdBy", "username").exec();

              case 3:
                docs = _context3.sent;
                _context3.next = 6;
                return _thread["default"].findByIdAndUpdate(req.params.thread_id, {
                  comments: docs.length
                });

              case 6:
                thread = _context3.sent;
                res.status(201).json({
                  posts: docs,
                  thread: thread
                });
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                res.status(404).json(_context3.t0);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}; // to delete a post on a thread


var deletePost = function deletePost(model) {
  return (/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var doc, deletedDoc;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return model.findOne({
                  _id: req.body.post_id
                });

              case 3:
                doc = _context4.sent;

                if (!(req.user._id === doc.createdBy)) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 7;
                return model.findOneAndDelete({
                  _id: doc._id
                });

              case 7:
                deletedDoc = _context4.sent;
                return _context4.abrupt("return", res.status(201).json({
                  data: deletedDoc
                }));

              case 9:
                res.status(404).json({
                  message: "ERROR: A post may only be deleted by it's creator."
                });
                _context4.next = 16;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                res.status(404).json(_context4.t0);

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}; // to update a post on a thread (most likely to add a reply)


var updatePost = function updatePost(model) {
  return (/*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var doc;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return model.findOneAndUpdate({
                  _id: req.body.post_id,
                  createdBy: req.user._id
                }, {
                  replies: [].concat((0, _toConsumableArray2["default"])(doc.replies), [req.body.reply])
                });

              case 3:
                doc = _context5.sent;
                return _context5.abrupt("return", res.status(201).json({
                  data: updatedDoc
                }));

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);
                res.status(404).json(_context5.t0);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }));

      return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}; // to update a post on a thread (most likely to add a reply)


var addReply = function addReply(model) {
  return (/*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var doc, docId, pArray;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return model.findOneAndUpdate({
                  _id: req.params.post_id
                }, {
                  $push: {
                    replies: {
                      text: req.body.text,
                      createdBy: req.user._id
                    }
                  }
                });

              case 3:
                doc = _context7.sent;
                docId = doc.replies[doc.replies.length - 1]._id;
                pArray = req.user.followers.map( /*#__PURE__*/function () {
                  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId) {
                    var response;
                    return _regenerator["default"].wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            response = _user["default"].findByIdAndUpdate(userId, {
                              $push: {
                                feed: docId
                              }
                            });
                            return _context6.abrupt("return", response);

                          case 2:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x12) {
                    return _ref7.apply(this, arguments);
                  };
                }());
                _context7.next = 8;
                return Promise.all(pArray);

              case 8:
                return _context7.abrupt("return", res.status(201).json({
                  data: doc
                }));

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](0);
                console.log(_context7.t0);
                res.status(404).json(_context7.t0);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 11]]);
      }));

      return function (_x10, _x11) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
};

var controllers = {
  createPost: createPost(_post["default"]),
  getPosts: getPosts(_post["default"]),
  updatePost: updatePost(_post["default"]),
  deletePost: deletePost(_post["default"]),
  addReply: addReply(_post["default"])
};
var _default = controllers; // {content: 'string', createdBy: user_id, thread: thread_id }

exports["default"] = _default;