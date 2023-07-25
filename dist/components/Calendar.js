"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Cell = _interopRequireDefault(require("./Cell"));
var _dateFns = require("date-fns");
require("./Calendar.css");
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const weekDays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
/**
 * Creates a calendar component with label and input elements
 * @param className: to customise the calendar css
 * @param text: customise label text
 * @param handleMyClick: function to retrieve the date
 * @param ID to add an ID to the input
 * @return { component }
 */

const Calendar = _ref => {
  let {
    className,
    text,
    handleMyClick,
    ID
  } = _ref;
  const [openCalendar, setOpenCalendar] = (0, _react.useState)(false);
  const [currentDate, setCurrentDate] = (0, _react.useState)(new Date());
  const showCalendar = () => {
    setOpenCalendar(openCalendar => true);
  };
  const startDate = (0, _dateFns.startOfMonth)(currentDate);
  const endDate = (0, _dateFns.endOfMonth)(currentDate);
  const numDays = (0, _dateFns.differenceInDays)(endDate, startDate) + 1;
  const prefixDays = startDate.getDay() - 1;
  const suffixDays = 7 - endDate.getDay();
  const prevMonth = () => setCurrentDate((0, _dateFns.sub)(currentDate, {
    months: 1
  }));
  const nextMonth = () => setCurrentDate((0, _dateFns.add)(currentDate, {
    months: 1
  }));
  const prevYear = () => setCurrentDate((0, _dateFns.sub)(currentDate, {
    years: 1
  }));
  const nextYear = () => setCurrentDate((0, _dateFns.add)(currentDate, {
    years: 1
  }));
  const handleClickDate = index => {
    const date = (0, _dateFns.setDate)(currentDate, index);
    handleMyClick && handleMyClick((0, _dateFns.format)(date, "PPP"));
    setCurrentDate(date);
    setOpenCalendar(false);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-block"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: ID
  }, text), /*#__PURE__*/_react.default.createElement("input", {
    id: ID,
    className: "calendar-input",
    onClick: showCalendar,
    onChange: () => {},
    value: (0, _dateFns.format)(currentDate, "PPP")
  })), openCalendar === true ? /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cell-container"
  }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
    className: "cell top-cell clickable-cell",
    onClick: prevYear
  }, "<<"), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    className: "cell top-cell clickable-cell",
    onClick: prevMonth
  }, "<"), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    className: "cell top-cell full-date-cell"
  }, (0, _dateFns.format)(currentDate, "LLLL yyyy")), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    className: "cell top-cell clickable-cell",
    onClick: nextMonth
  }, ">"), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    className: "cell top-cell clickable-cell",
    onClick: nextYear
  }, ">>"), weekDays.map(day => /*#__PURE__*/_react.default.createElement(_Cell.default, {
    key: day,
    className: "cell day-cell"
  }, day)), Array.from({
    length: prefixDays
  }).map((_, index) => {
    return /*#__PURE__*/_react.default.createElement(_Cell.default, {
      key: index,
      className: "cell"
    });
  }), Array.from({
    length: numDays
  }).map((_, index) => {
    const date = index + 1;
    return /*#__PURE__*/_react.default.createElement(_Cell.default, {
      key: date,
      className: "cell clickable-cell",
      onClick: () => handleClickDate(date, index + 1)
    }, date);
  }), Array.from({
    length: suffixDays
  }).map((_, index) => {
    return /*#__PURE__*/_react.default.createElement(_Cell.default, {
      key: index,
      className: "cell"
    });
  })))) : "");
};
var _default = Calendar;
exports.default = _default;
Calendar.propTypes = {
  className: _propTypes.default.string,
  text: _propTypes.default.string,
  handleMyClick: _propTypes.default.func,
  ID: _propTypes.default.string
};