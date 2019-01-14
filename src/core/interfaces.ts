export interface IConfigSettings {

}

export interface IConfig {
  settings: IConfigSettings;
  version: string;
}

export interface IBookmarksPartial {
  bookmarks?: string;
  lastAccessed: Date;
  lastUpdated: Date;
  version?: string;
}

// Interface for bookmarks model
export interface IBookmarks extends IBookmarksPartial {
  _id: string;
}

export interface INewSyncLogsPartial {
  expiresAt?: Date,
  ipAddress?: string,
  syncCreated?: Date
}

export interface INewSyncLogs extends INewSyncLogsPartial {
  _id: string;
}