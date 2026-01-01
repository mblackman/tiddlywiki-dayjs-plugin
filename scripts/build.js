const fs = require("fs");
const path = require("path");
const dayjsPkg = require("dayjs/package.json");

const OUTPUT_DIR = "./dist";
const PLUGIN_TITLE = "$:/plugins/mblackman/dayjs";

const createTiddler = (title, type, moduleType, text) => ({
  title,
  type,
  "module-type": moduleType,
  text,
});

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

const readmeCode = fs.readFileSync("./src/readme.tid", "utf8");

// We resolve specifically to the minified file in node_modules
const dayjsPath = require.resolve("dayjs/dayjs.min.js");
const dayjsCode = fs.readFileSync(dayjsPath, "utf8");

const isoWeekPath = require.resolve("dayjs/plugin/isoWeek.js");
const isoWeekCode = fs.readFileSync(isoWeekPath, "utf8");

const advFormatPath = require.resolve("dayjs/plugin/advancedFormat.js");
const advFormatCode = fs.readFileSync(advFormatPath, "utf8");

const wrapperCode = fs.readFileSync("./src/wrapper.js", "utf8");
const pluginInfo = JSON.parse(fs.readFileSync("./src/plugin.info", "utf8"));

pluginInfo.version = dayjsPkg.version;

const tiddlers = {
  // README
  [`${PLUGIN_TITLE}/readme`]: createTiddler(
    `${PLUGIN_TITLE}/readme`,
    "text/vnd.tiddlywiki", // Standard WikiText MIME type
    undefined, // NOT a module
    readmeCode
  ),
  // The Core Library
  [`${PLUGIN_TITLE}/lib/dayjs.min.js`]: createTiddler(
    `${PLUGIN_TITLE}/lib/dayjs.min.js`,
    "application/javascript",
    "library",
    dayjsCode
  ),
  // The ISO Week Plugin
  [`${PLUGIN_TITLE}/lib/plugin/isoWeek.js`]: createTiddler(
    `${PLUGIN_TITLE}/lib/plugin/isoWeek.js`,
    "application/javascript",
    "library",
    isoWeekCode
  ),
  // Advanced Format Plugin
  [`${PLUGIN_TITLE}/lib/plugin/advancedFormat.js`]: createTiddler(
    `${PLUGIN_TITLE}/lib/plugin/advancedFormat.js`,
    "application/javascript",
    "library",
    advFormatCode
  ),
  // The Wrapper Macro
  [`${PLUGIN_TITLE}/wrapper.js`]: createTiddler(
    `${PLUGIN_TITLE}/wrapper.js`,
    "application/javascript",
    "macro",
    wrapperCode
  ),
};

const pluginJson = {
  ...pluginInfo,
  text: JSON.stringify({ tiddlers }),
};

fs.writeFileSync(
  path.join(OUTPUT_DIR, "dayjs-plugin.json"),
  JSON.stringify(pluginJson, null, 2)
);

console.log(`Build complete: dayjs-plugin.json (v${pluginInfo.version})`);
