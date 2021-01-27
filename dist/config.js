"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var developmentIP = "0.0.0.0";
var productionIP = "18.217.73.238";
var _default = {
  port: 8000,
  dbUrl: "mongodb://localhost:27017/twitook",
  secrets: {
    jwt: "aphrodite",
    jwtExp: "7d"
  },
  ipAddress: process.env.NODE_ENV === 'development' ? developmentIP : productionIP
};
exports["default"] = _default;