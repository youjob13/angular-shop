export interface AppSettings {
  sort: {
    order: string;
    isAsc: boolean;
  };
}

export enum AppSettingsOptions {
  SortOrder = 'order',
  SortDirection = 'isAsc',
}
