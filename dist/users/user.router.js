"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./user.controller"));

var router = (0, _express.Router)(); // api/users/

router.route("/").post(_user["default"].createUser).put(function (req, res) {
  res.send({
    message: "update user ".concat(req.body.id)
  });
})["delete"](function (req, res) {
  res.send({
    message: "update user ".concat(req.body.id)
  });
}); // find many by username contains

router.route("/search/:query").get(function (req, res) {
  res.send({
    message: "looking for ".concat(req.params.query)
  });
}); // find one by id, update user followers to include this user, update this users following to include it as well

router.route("/follow/:user").put(_user["default"].followUser);
router.route("/home").get(_user["default"].getHomePage);
var _default = router;
exports["default"] = _default;