export interface ConfigModel {
  setConfig(data: ConfigData, otherProperties: ConfigModel): void;
  getConfig(): ConfigData;
}

export interface ConfigData {
  id: string;
  login: string;
  email: string;
}
