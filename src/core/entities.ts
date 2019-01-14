import * as fs from "fs";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import * as path from "path";
import * as merge from "./config";
import { IConfig, IConfigSettings } from "./interfaces";
import { TYPES } from "./types";

@injectable()
export class Config implements IConfig {
  // // Get full path to config folder
  // pathToConfig: string; // = path.join(__dirname, '../../config');
  //
  // // Get default settings values
  // pathToSettings: string; // = path.join(pathToConfig, 'settings.default.json');
  //
  // defaultSettings: string; // = require(pathToSettings);
  //
  // // Get user settings values if present
  // pathToUserSettings: string; // = path.join(pathToConfig, 'settings.json');

  settings: IConfigSettings;

  version: string;

  // let userSettings = {};
  // if (fs.existsSync(pathToUserSettings)) {
  //   userSettings = require(pathToUserSettings);
  // }

  // Merge default and user settings
  // const settings = merge(defaultSettings, userSettings);

  // // Get current version number
  // const { version } = require('../../package.json');
  //
  // this.config = {
  //   ...settings,
  //   version
  // };
}