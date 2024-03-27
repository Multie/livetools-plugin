/*
 *   Copyright (c) 2024 Malte Hering
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { Logger, Roarr } from "roarr";
import { JsonObject } from "roarr/src/types";
import { ILivetoolsPlugins } from "../shared/plugins";
import { ILivetoolsServer } from "./server";
import { IPlugin } from "../shared/plugin";
import { PluginConfiguationModel } from "./models/plugin-configuration.model";
import { PluginModel } from "./models/plugin.model";
import { DataTypes } from "sequelize";
import { exec } from "child_process"
import path from "path";
import fs from "fs";
import { LivetoolsPlugin } from "./plugin";

export class LivetoolsPlugins implements ILivetoolsPlugins {
  get name(): string {
    return "plugins";
  }
  logger: Logger<JsonObject>;

  plugins: Array<LivetoolsPlugin>;

  constructor(public server: ILivetoolsServer) {
    this.logger = Roarr.child({
      package: this.name, // this will be included in all logs
    });
    this.plugins = new Array<LivetoolsPlugin>();

    PluginConfiguationModel.init(
      PluginConfiguationModel.getModelDefinition(),
      {
        sequelize: this.server.sequelize,
        modelName: this.name + "PluginConfiguation",
      }
    );
    PluginModel.init(PluginModel.getModelDefinition(), {
      sequelize: this.server.sequelize,
      modelName: this.name + "Plugin",
    });
  }

  setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.logger.info("Setup start");


        let installedPluginNames = await this.getInstalledPlugins().catch((err: Error) => {
          throw err;
        })

        let promises = installedPluginNames.map((pluginName) => {
          let relative = path.relative(__dirname, path.join(
            this.server.config.runtimePath, "node_modules", pluginName, "backend", "plugin"));
          relative = relative.replace(/\\/g, "/")
          this.logger.info({ cwd: process.cwd(), dir: __dirname, rel: relative }, "cwd")
          return import(relative);
        });
        let results = await Promise.allSettled(promises);
        let loadResults = results.filter((result)=> {
          return result.status == "fulfilled";
        }).map((result)=> {
          return (result as PromiseFulfilledResult<any>).value;
        })
        this.plugins = loadResults.map((module)=> {
          return (new module["default"](this.server)) as LivetoolsPlugin;
        });



        this.logger.info("Setup finished");
        resolve();
      } catch (err) {
        -
        reject(err);
      }
    });
  }

  getInstalledPlugins(): Promise<Array<string>> {
    return new Promise<Array<string>>(async (resolve, reject) => {
      try {
        let packagePath = path.join(this.server.config.runtimePath, "package.json");

        let fileBuffer = await fs.promises.readFile(packagePath).catch((err: Error) => {
          throw new Error("Failed to read package json:" + err.message);
        })

        let packageJson = JSON.parse(fileBuffer.toString());

        if (!packageJson) {
          throw new Error("Package json ist undefined or null");
        }
        if (!packageJson.dependencies) {
          throw new Error("Package dependencies ist undefined or null");
        }
        let dependenciesNames = Object.keys(packageJson.dependencies);
        dependenciesNames = dependenciesNames.filter((dependency) => {
          return dependency.startsWith("livetools") &&
            dependency !== "livetools-application" &&
            dependency !== "livetools-backend" &&
            dependency !== "livetools-plugin"
        })
        resolve(dependenciesNames);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAllPlugins(): Promise<Array<IPlugin>> {
    return new Promise<Array<IPlugin>>(async (resolve, reject) => {
      try {
        this.logger.info("getAllPlugins start");
        let result = new Array<IPlugin>();

        let plugins = await PluginModel.findAll({}).catch((err) => {
          throw new Error("Failed to get all plugins from db");
        });

        let res = plugins.map((plugin) => {
          return plugin.get({ clone: true });
        })

        this.logger.info({ plugins: res }, "all")

        this.logger.info("getAllPlugins finished");
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  install(name: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.logger.info({ name: name }, "Install start");

        let stdout = "";
        let stderr = "";
        let childprocess = exec(`npm install ${name}`, {
          cwd: this.server.config.runtimePath
        });
        if (childprocess.stdout) {
          childprocess.stdout.on("data", (data: string | Buffer) => {
            stdout += data.toString();
          })
        }
        if (childprocess.stderr) {
          childprocess.stderr.on("data", (data: string | Buffer) => {
            stderr += data.toString();
          })
        }
        childprocess.on("error", (error) => {

        });
        childprocess.on("exit", (code) => {
          this.logger.info({ name: name }, "Install finished");
          resolve();
        })


      } catch (err) {
        reject(err);
      }
    });
  }
  uninstall(name: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.logger.info({ name: name }, "Uninstall start");

        this.logger.info({ name: name }, "Uninstall finished");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  enable(name: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.logger.info({ name: name }, "Enable start");

        this.logger.info({ name: name }, "Enable finished");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  disable(name: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.logger.info({ name: name }, "Disable start");

        this.logger.info({ name: name }, "Disable finished");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
