﻿import * as electron from "electron";
import {BrowserWindow} from "electron";
import {join} from "path";
import {readFileSync, writeFileSync} from "fs";
import {constants} from "node:fs";

const { env } = process;

export default class PatchedBrowserWindow extends BrowserWindow {
    constructor(opts: Electron.BrowserWindowConstructorOptions) {
        env.DISCORD_PRELOADER = opts.webPreferences!.preload;

        opts.webPreferences!.preload = join(__dirname, "preload.min.js");

        return new BrowserWindow(opts);

        super();
    }
}

// i no no tink dis works
let appSettings: { settings?: any; };

Object.defineProperty(global, "appSettings", {
    get: () => appSettings,
    set: (v: { settings?: any, }) => {
        if (!v.hasOwnProperty("settings")) v.settings = {};
        v.settings.DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING = true;
        v.settings.SKIP_HOST_UDPATE = true // does this even work
        appSettings = v;
    }
});
const electronModule = require.resolve("electron");
delete require.cache[electronModule]!.exports;

const electronMod: typeof Electron.CrossProcessExports = {
    ...electron,
    BrowserWindow: PatchedBrowserWindow
};

require.cache[electronModule]!.exports = electronMod;