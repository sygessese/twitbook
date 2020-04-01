"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _post = _interopRequireDefault(require("./post.controller"));

var router = (0, _express.Router)(); // api/posts/

router.route("/thread/:thread_id").post(_post["default"].createPost).get(_post["default"].getPosts)["delete"](_post["default"].deletePost).put(_post["default"].updatePost); // api/posts/home

router.route("/home").get(_post["default"].getHomePage);
var _default = router;
exports["default"] = _default;