"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _thread = _interopRequireDefault(require("./thread.controller"));

var router = (0, _express.Router)(); // api/threads/

router.route("/").get(_thread["default"].getThreads).post(_thread["default"].createThread).put(_thread["default"].updateThread)["delete"](_thread["default"].deleteThread);
var _default = router;
exports["default"] = _default;