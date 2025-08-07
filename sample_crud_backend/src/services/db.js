const { MongoClient } = require('mongodb');

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;

let client;
let db;

/**
 * Connect to MongoDB and return the db instance.
 * Re-use connection if established.
 * @returns {Promise<Db>}
 */
// PUBLIC_INTERFACE
async function getDb() {
  if (db) return db;
  if (!MONGODB_URL || !MONGODB_DB) {
    throw new Error('Database environment variables are not set (MONGODB_URL/MONGODB_DB)');
  }
  client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(MONGODB_DB);
  return db;
}

/**
 * Get the items collection.
 * @returns {Promise<Collection>}
 */
// PUBLIC_INTERFACE
async function getItemsCollection() {
  const db = await getDb();
  return db.collection('items');
}

module.exports = {
  getDb,
  getItemsCollection
};
