﻿import "./api/modules";

import { Logger } from './api/logger';
import { Patcher } from './api/patcher';
import Webpack from "./api/webpack";
import {Flux, React} from "./modules/discordModules";
import {getExports, plugins} from "./renderer/managers/plugins";
import {proxyCache} from "./api/helpers";
import {injectCSS, uninjectCSS} from "./api/css";
// @ts-ignore
window.distrust = new class Distrust {
   logger = Logger;
   patcher = Patcher;
   webpack = Webpack;
   common = {flux: Flux,react: React}
   plugins = {plugins, getExports, proxyCache}
   css = {injectCSS, uninjectCSS}
}