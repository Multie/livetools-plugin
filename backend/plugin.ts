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
import { ILivetoolsServer } from "./server";

export class LivetoolsBackendPlugin {
    get name(): string {
        return "Plugin";
    }

    logger: Logger<JsonObject>;

    constructor(public server: ILivetoolsServer) {
        this.logger = Roarr.child({
            package: this.name,
        });
    }

    install(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
    uninstall(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    enable(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
    disable(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    setup(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
    run(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
}
