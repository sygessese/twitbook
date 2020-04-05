"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  port: 8000,
  dbUrl: "mongodb://localhost:27017/twitook",
  secrets: {
    jwt: "aphrodite",
    jwtExp: 3600
  }
};
exports["default"] = _default;