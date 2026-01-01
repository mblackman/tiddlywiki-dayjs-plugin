/*\
title: $:/macros/dayjs-wrapper.js
type: application/javascript
module-type: macro

Wrapper for Day.js with ISO Week support
\*/

(function () {
  "use strict";

  var dayjs = require("$:/plugins/mblackman/dayjs/lib/dayjs.min.js");
  var isoWeek = require("$:/plugins/mblackman/dayjs/lib/plugin/isoWeek.js");
  var advancedFormat = require("$:/plugins/mblackman/dayjs/lib/plugin/advancedFormat.js");

  dayjs.extend(isoWeek);
  dayjs.extend(advancedFormat);

  exports.name = "dayjs";

  exports.params = [{ name: "date" }, { name: "format" }];

  exports.run = function (date, format) {
    var dateObj = date ? dayjs(date) : dayjs();
    var formatString = format || "YYYY-MM-DD";
    return dateObj.format(formatString);
  };
})();
