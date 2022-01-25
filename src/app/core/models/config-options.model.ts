export interface ConfigModel {
  setConfig(configUpdates: ConfigModel): void;
  getConfig(): ConfigData;
}

export interface ConfigData {
  id: string;
  login: string;
  email: string;
}
