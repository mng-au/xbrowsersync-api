// import * as mongoose from 'mongoose';
// import * as uuid from 'uuid';
// import { IBookmarks } from "../core/interfaces";

// Implements a mongoose schema and model to connect data service methods to MongoDB collection
// export default (() => {
//   require('mongoose-uuid2')(mongoose);
//   const types: any = mongoose.Types;
//   const UUID = types.UUID;
//
//   // Create bookmarks schema to store bookmarks sync data
//   // Store IDs as binary uuid v4 and disable default id properties
//   // No concurrent updates so disable version keys
//   const bookmarksSchema = new mongoose.Schema(
//     {
//       _id: {
//         default: uuid.v4,
//         type: UUID
//       },
//       bookmarks: String,
//       lastAccessed: {
//         default: () => new Date(),
//         type: Date
//       },
//       lastUpdated: {
//         default: () => new Date(),
//         type: Date
//       },
//       version: String
//     },
//     {
//       _id: false,
//       id: false,
//       versionKey: false
//     }
//   );
//
//   return mongoose.model<IBookmarksModel>('Bookmark', bookmarksSchema, 'bookmarks');
// })();