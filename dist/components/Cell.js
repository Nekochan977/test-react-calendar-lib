"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Cell = _ref => {
  let {
    children,
    className,
    onClick
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    onClick: onClick
  }, children);
};
var _default = Cell;
exports.default = _default;