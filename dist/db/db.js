"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

require("dotenv");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var connect = function connect() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config["default"].dbUrl;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _mongoose["default"].connect(process.env.MONGODB_URI || url, _objectSpread({}, options, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })).then(function () {
    console.log("Connected to Database");
  })["catch"](function (err) {
    console.log("Not Connected to Database ERROR! ", err);
  });
};

exports.connect = connect;