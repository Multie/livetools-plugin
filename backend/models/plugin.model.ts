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

import { IPlugin } from "../../shared/plugin";
import { DataTypes, Model, ModelAttributes } from "sequelize";

export class PluginModel extends Model implements IPlugin {
    id: number;
    name: string;
    active: boolean;
    installed: boolean;
    nodeName: string;
    configurationParameter: Record<string, string>;

    constructor() {
        super();
        this.id = 0;
        this.name = "";
        this.active = false;
        this.installed = false;
        this.nodeName = "";
        this.configurationParameter = {};
    }

    static getModelDefinition() {
        let definition: ModelAttributes = {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            active: {
                type: DataTypes.BOOLEAN,
            },
            installed: {
                type: DataTypes.BOOLEAN,
            },
            nodeName: {
                type: DataTypes.STRING,
            },
            configurationParameter: {
                type: DataTypes.STRING,
                get() {
                    let dbValue: unknown = this.getDataValue(
                        "configurationParameter"
                    );
                    let modelValue: Record<string, string> = {};
                    if (
                        dbValue != null &&
                        dbValue != undefined &&
                        typeof dbValue == "string"
                    ) {
                        modelValue = JSON.parse(dbValue);
                    }
                    return modelValue;
                },
                set(val: Record<string, string> | null | undefined) {
                    if (val == null || val == undefined) {
                        val = {};
                    }
                    this.setDataValue(
                        "configurationParameter",
                        JSON.stringify(val)
                    );
                },
            },
        };
        return definition;
    }
}
