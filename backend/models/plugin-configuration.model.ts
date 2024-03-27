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
import { IPluginConfiguation } from "../../shared/plugin-configuation";
import { DataTypes, Model, ModelAttributes } from "sequelize";

export class PluginConfiguationModel
    extends Model
    implements IPluginConfiguation
{
    id: number;
    pluginName: string;
    name: string;
    type: string;
    value: string;

    constructor() {
        super();
        this.id = 0;
        this.pluginName = "";
        this.name = "";
        this.type = "";
        this.value = "";
    }

    static getModelDefinition() {
        let definition: ModelAttributes = {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            pluginName: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.STRING,
            },
            value: {
                type: DataTypes.STRING,
            },
        };
        return definition;
    }
}
