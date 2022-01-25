import { Injectable } from '@angular/core';

import { ConfigData, ConfigModel } from '../models/config-options.model';

@Injectable()
export class ConfigOptionsService implements ConfigModel {
  private config!: ConfigData;

  constructor() {}

  setConfig(configUpdates: Partial<ConfigModel>): void {
    this.config = { ...this.config, ...configUpdates };
  }

  getConfig(): ConfigData {
    return this.config;
  }
}
