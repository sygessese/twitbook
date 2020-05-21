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

var _user = _interopRequireDefault(require("./user.model"));

var _post = _interopRequireDefault(require("../posts/post.model"));

var _thread = _interopRequireDefault(require("../threads/thread.model"));

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
};

var updateUser = function updateUser(model) {
  return (/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var updatedDoc;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return model.findByIdAndUpdate(req.user._id, req.body);

              case 3:
                updatedDoc = _context2.sent;
                return _context2.abrupt("return", res.status(201).json({
                  data: updatedDoc
                }));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                res.status(404).json(_context2.t0);

              case 10:
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

var filterUserFeed = function filterUserFeed(model) {
  return (/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var doc, count;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // so user is not waiting?
                res.status(201).end();
                _context3.prev = 1;
                _context3.next = 4;
                return model.findById(req.user._id).populate({
                  path: "feed.itemId"
                });

              case 4:
                doc = _context3.sent;
                count = doc.feed.length;
                doc.feed = doc.feed.filter(function (item) {
                  return item.itemId;
                });

                if (!(count !== doc.feed.length)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return doc.save();

              case 10:
                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](1);
                console.log(_context3.t0);
                return _context3.abrupt("return", res.status(404).end());

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 12]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}; // to follow user


var followUser = function followUser(model) {
  return (/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var userToBeFollowed, userToBeFollowedUpdated, thisUser, userPosts, userThreads;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (!(req.user.following.toString().indexOf(req.params.user) > -1)) {
                  _context4.next = 5;
                  break;
                }

                res.status(201).json({
                  data: {
                    message: "You are already following this user"
                  }
                });
                _context4.next = 31;
                break;

              case 5:
                _context4.next = 7;
                return model.findById(req.params.user);

              case 7:
                userToBeFollowed = _context4.sent;

                if (userToBeFollowed.followers[req.user._id]) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 11;
                return model.findOneAndUpdate({
                  _id: req.params.user
                }, {
                  $push: {
                    followers: req.user._id
                  }
                });

              case 11:
                userToBeFollowedUpdated = _context4.sent;

              case 12:
                _context4.next = 14;
                return model.findOneAndUpdate({
                  _id: req.user._id
                }, {
                  $push: {
                    following: req.params.user
                  }
                });

              case 14:
                thisUser = _context4.sent;
                console.log(thisUser);
                _context4.next = 18;
                return _post["default"].find().where("createdBy")["in"](thisUser.following).exec();

              case 18:
                userPosts = _context4.sent;
                userPosts = userPosts.map(function (post) {
                  return {
                    itemId: post._id,
                    itemModel: "post"
                  };
                });
                _context4.next = 22;
                return _thread["default"].find().where("createdBy")["in"](thisUser.following).exec();

              case 22:
                userThreads = _context4.sent;
                userThreads = userThreads.map(function (thread) {
                  return {
                    itemId: thread._id,
                    itemModel: "thread"
                  };
                });
                console.log(userPosts);
                console.log(userThreads);
                thisUser.feed = [].concat((0, _toConsumableArray2["default"])(userPosts), (0, _toConsumableArray2["default"])(userThreads));
                thisUser.markModified("feed");
                _context4.next = 30;
                return thisUser.save();

              case 30:
                return _context4.abrupt("return", res.status(201).json({
                  data: {
                    message: "You are now following ".concat(userToBeFollowed.username)
                  }
                }));

              case 31:
                _context4.next = 37;
                break;

              case 33:
                _context4.prev = 33;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                res.status(404).json(_context4.t0);

              case 37:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 33]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}; // first index of slice represents starting index of set to be returned


var getHomePage = function getHomePage(model) {
  return (/*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var doc, endOfFeed;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log((parseInt(req.params.offset) + 5) * -1);
                _context5.prev = 1;
                _context5.next = 4;
                return model.findById(req.user._id).slice("feed", [(parseInt(req.params.offset) + 5) * -1, 5]).populate({
                  path: "feed.itemId",
                  populate: {
                    path: "createdBy ",
                    select: "username"
                  }
                });

              case 4:
                doc = _context5.sent;
                endOfFeed = 6;
                doc.feed.forEach(function (item, index) {
                  if (item._id.toString() === req.params.lastId) endOfFeed = index;
                }); // search lastId in doc.feed, if found, return slice and property saying: feed-end: true

                console.log(doc.feed, endOfFeed);

                if (endOfFeed === 6) {
                  res.status(200).json({
                    data: doc.feed.reverse(),
                    endOfFeed: false
                  });
                }

                if (endOfFeed < 6) {
                  doc.feed = doc.feed.slice(0, endOfFeed);
                  doc.feed = doc.feed.reverse();
                  res.status(200).json({
                    data: doc.feed,
                    endOfFeed: true
                  });
                } // var count = doc.feed.length;
                // doc.feed = doc.feed.filter(item => item.itemId);
                // if (count !== doc.feed.length) {
                //   await doc.save();
                // }


                _context5.next = 16;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](1);
                console.log(_context5.t0);
                return _context5.abrupt("return", res.status(404).end());

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 12]]);
      }));

      return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
};

var controller = {
  createUser: createUser(_user["default"]),
  followUser: followUser(_user["default"]),
  getHomePage: getHomePage(_user["default"]),
  updateUser: updateUser(_user["default"]),
  filterUserFeed: filterUserFeed(_user["default"])
};
var _default = controller; // id 5e6cab7f3bd21baca222cca8

exports["default"] = _default;