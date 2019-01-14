import { Column, createConnection, Entity, FindOperator } from "typeorm";
import { IBookmarks, IBookmarksPartial, INewSyncLogs, INewSyncLogsPartial } from "./interfaces";

@Entity()
export class Bookmarks implements IBookmarks {
  constructor(src: IBookmarks) {
    this._id = src._id;
    this.bookmarks = src.bookmarks;
    this.lastAccessed = src.lastAccessed;
    this.lastUpdated = src.lastUpdated;
    this.version= src.version;
  }

  @Column({ primary: true, unique: true, nullable: false })
  _id: string;

  @Column({ nullable: true })
  bookmarks?: string;

  @Column()
  lastAccessed: Date;

  @Column()
  lastUpdated: Date;

  @Column({ nullable: true })
  version?: string;

  static async updateLastAccessed(id: string, lastAccessed: Date): Promise<Bookmarks> {
    const connection = await createConnection();
    try {
      const repository = connection.getRepository(Bookmarks);
      const bookmarks = await repository.findOne(id);
      if (!bookmarks) {
        return undefined;
      }
      bookmarks.lastAccessed = lastAccessed;
      return await repository.save(bookmarks);
    } finally {
      await connection.close()
    }
  }

  static async update(id: string, partial: IBookmarksPartial): Promise<Bookmarks> {
    const connection = await createConnection();
    try {
      const repository = connection.getRepository(Bookmarks);

      let bookmarks = await repository.findOne(id);
      if (!bookmarks) {
        return undefined;
      }
      bookmarks.lastAccessed = partial.lastAccessed;
      bookmarks.lastUpdated = partial.lastUpdated;
      if (!partial.version) {
        bookmarks.version = partial.version;
      }
      return await repository.save(bookmarks);
    } finally {
      await connection.close();
    }
  }

  static async estimatedDocumentCount(): Promise<number> {
    const connection = await createConnection();
    try {
      const repository = connection.getRepository(Bookmarks);
      return await repository.count();
    } finally {
      await connection.close();
    }
  }

  static async save(bookmarks: Bookmarks): Promise<Bookmarks> {
    const connection = await createConnection();
    try {
      const repository = connection.getRepository(Bookmarks);
      return await repository.save(bookmarks);
    } finally {
      await connection.close();
    }
  }

  static async idIsValid(id: string): Promise<boolean> {
    const connection = await createConnection();
    try {
      const repository = connection.getRepository(Bookmarks);
      // FIXME performance issue for mongodb
      const bookmarks = await repository.findOne(id);
      return !!bookmarks;
    } finally {
      await connection.close();
    }
  }
}

@Entity()
export class NewSyncLogs implements INewSyncLogs {
  constructor(src: INewSyncLogs) {
    this._id = src._id;
    this.expiresAt = src.expiresAt;
    this.ipAddress = src.ipAddress;
    this.syncCreated = src.syncCreated;
  }

  @Column({ primary: true, unique: true, nullable: false })
  _id: string;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  syncCreated: Date;

  static async countDocuments(conditions: INewSyncLogsPartial): Promise<number> {
    const connection = await createConnection();
    try {
      const repository = connection.getRepository(NewSyncLogs);
      return await repository.count(conditions);
    } finally {
      await connection.close();
    }
  }

  static async save(newSyncLogs: NewSyncLogs): Promise<NewSyncLogs> {
    const connection = await createConnection();
    try {
      const repository = connection.getRepository(NewSyncLogs);
      return await repository.save(newSyncLogs);
    } finally {
      await connection.close();
    }
  }
}