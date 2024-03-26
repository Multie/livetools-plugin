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

export class LivetoolsPlugins implements ILivetoolsPlugins {
    get name(): string {
        return "plugins";
    }
    logger: Logger<JsonObject>;

    plugins: Array<IPlugin>;

    constructor(public server: ILivetoolsServer) {
        this.logger = Roarr.child({
            package: this.name, // this will be included in all logs
        });
        this.plugins = new Array<IPlugin>();
    }

    setup(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                this.logger.info("Setup start");

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

                /* PluginConfiguationModel.belongsTo(PluginModel, {
                    targetKey: "name",
                    keyType: DataTypes.STRING,
                });*/
                this.logger.info("Setup finished");
                resolve();
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

                this.logger.info({ name: name }, "Install finished");
                resolve();
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
