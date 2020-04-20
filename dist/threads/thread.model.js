"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var threadSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  description: String,
  createdBy: {
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  createdByUsername: String,
  comments: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});
threadSchema.index({
  name: 1
}, {
  unique: true
});

var Thread = _mongoose["default"].model("thread", threadSchema);

var _default = Thread;
exports["default"] = _default;