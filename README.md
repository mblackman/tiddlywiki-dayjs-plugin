# tiddlywiki-dayjs-plugin

A lightweight, robust wrapper for [Day.js](https://day.js.org/) designed for TiddlyWiki 5.

This plugin bridges the Day.js library into TiddlyWiki's CommonJS environment, exposing it via a global macro. It includes the **Core** library plus the **isoWeek** and **advancedFormat** plugins to handle complex date math and ISO 8601 boundary cases (e.g., getting the correct week-year for December 31st).

## Installation

### 1. [Preferred] Install from Example TiddlyWiki

Go to [https://dayjs-plugin-example.tiddlyhost.com/] and follow the installation instructions on the page.

### 2. Manual: Build the Plugin

Since this repository manages dependencies via npm, you must build the plugin bundle first.

```bash
# Install dependencies (Day.js)
npm install

# Build the TiddlyWiki JSON bundle
npm run build

```

This will generate a file at `dist/dayjs-plugin.json`.

Import into TiddlyWiki

1. Open your TiddlyWiki.
2. Drag and drop the `dist/dayjs-plugin.json` file onto the browser window.
3. Click **Import**.
4. **Save and Reload** your wiki (reloading is required for the JavaScript module to boot).

## Usage

The plugin provides a global macro `<<dayjs>>`.

### Syntax

```wikitext
<<dayjs [date] [format]>>

```

* **date**: (Optional) An ISO 8601 string (e.g., `2025-12-31`). Defaults to `now` if empty.
* **format**: (Optional) A Day.js format string. Defaults to `YYYY-MM-DD`.

### Examples

| Goal | WikiText | Output |
| --- | --- | --- |
| **Current Date** | `<<dayjs>>` | `2025-05-15` |
| **Custom Format** | `<<dayjs "" "dddd, MMMM D">>` | `Thursday, May 15` |
| **Specific Date** | `<<dayjs "2023-12-25" "MM/DD/YYYY">>` | `12/25/2023` |
| **ISO Week Number** | `<<dayjs "2024-01-04" "WW">>` | `01` |
| **ISO Week Year** | `<<dayjs "2024-12-31" "GGGG">>` | `2025` |

> **Note on ISO Weeks:** To avoid the "December 31st Bug," always pair the week token `WW` with the ISO-Week-Year token `GGGG`, not the calendar year `YYYY`.

## Development

The project is structured to separate the raw library code from the TiddlyWiki wrapper logic.

### Directory Structure

* `src/wrapper.js`: The TiddlyWiki macro that `require()`s the library and runs the logic.
* `src/plugin.info`: TiddlyWiki metadata (title, version, author).
* `scripts/build.js`: A Node.js script that reads `node_modules`, extracts the minified Day.js code, and packages it with the wrapper into a valid TiddlyWiki JSON plugin.

### Adding More Day.js Plugins

If you need extra functionality (e.g., `relativeTime` for "2 days ago"):

1. Open `scripts/build.js` and extract the plugin code from `node_modules` (similar to how `isoWeek` is handled).
2. Add the new file to the `tiddlers` object in the build script.
3. Open `src/wrapper.js`, `require()` the new plugin tiddler, and call `dayjs.extend()`.
4. Rebuild.

## License

MIT
