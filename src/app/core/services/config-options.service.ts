import { Injectable } from '@angular/core';
import { ConfigData, ConfigModel } from '../models/config-options.model';

@Injectable()
export class ConfigOptionsService implements ConfigModel {
  private config!: ConfigData;

  constructor() {}

  setConfig(data: ConfigData, otherProperties: Partial<ConfigModel>): void {
    // ?
  }

  getConfig(): ConfigData {
    return this.config;
  }
}
