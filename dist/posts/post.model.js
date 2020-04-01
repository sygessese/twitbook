"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var postSchema = new _mongoose["default"].Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  replies: [{
    type: new _mongoose["default"].Schema({
      text: String,
      createdBy: {
        type: _mongoose["default"].SchemaTypes.ObjectId,
        ref: "user",
        required: true
      }
    }, {
      timestamps: true
    })
  }],
  createdBy: {
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  thread: {
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: "thread",
    required: true
  }
}, {
  timestamps: true
}); //itemSchema.index({ list: 1, name: 1 }, { unique: true })

var Post = _mongoose["default"].model("post", postSchema);

var _default = Post;
exports["default"] = _default;