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
import { Logger } from "roarr";
import { JsonObject } from "roarr/src/types";
import { IPlugin } from "./plugin";

export interface ILivetoolsPlugins {
    get name(): string;
    logger: Logger<JsonObject>;

    getAllPlugins(): Promise<Array<IPlugin>>;

    install(name: string): Promise<void>;
    uninstall(name: string): Promise<void>;

    enable(name: string): Promise<void>;
    disable(name: string): Promise<void>;
}
