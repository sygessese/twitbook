"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  followers: [{
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: "user"
  }],
  following: [{
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: "user"
  }],
  feed: [{
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: "thread"
  }, {
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: "post"
  }]
}, {
  timestamps: true
});
userSchema.index({
  username: 1
}, {
  unique: true
});
userSchema.pre("save", function (next) {
  var _this = this;

  if (!this.isModified("password")) {
    return next();
  }

  _bcrypt["default"].hash(this.password, 8, function (err, hash) {
    if (err) {
      return next(err);
    }

    _this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  var passwordHash = this.password;
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].compare(password, passwordHash, function (err, same) {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

var User = _mongoose["default"].model("user", userSchema);

var _default = User;
exports["default"] = _default;