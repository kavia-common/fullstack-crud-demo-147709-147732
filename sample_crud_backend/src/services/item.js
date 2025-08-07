const { ObjectId } = require('mongodb');
const { getItemsCollection } = require('./db');

/**
 * Get all items.
 * @returns {Promise<Array>}
 */
// PUBLIC_INTERFACE
async function listItems() {
  const coll = await getItemsCollection();
  const items = await coll.find({}).sort({ createdAt: -1 }).toArray();
  return items;
}

/**
 * Get a single item by ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
// PUBLIC_INTERFACE
async function getItem(id) {
  const coll = await getItemsCollection();
  try {
    return await coll.findOne({ _id: new ObjectId(id) });
  } catch (err) {
    return null;
  }
}

/**
 * Create a new item.
 * @param {Object} data
 * @returns {Promise<Object>}
 */
// PUBLIC_INTERFACE
async function createItem(data) {
  const coll = await getItemsCollection();
  const now = new Date();
  const item = {
    name: data.name,
    description: data.description || '',
    createdAt: now,
    updatedAt: now
  };
  const result = await coll.insertOne(item);
  return { ...item, _id: result.insertedId };
}

/**
 * Update an item by ID.
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
// PUBLIC_INTERFACE
async function updateItem(id, data) {
  const coll = await getItemsCollection();
  const update = {
    $set: {
      name: data.name,
      description: data.description || '',
      updatedAt: new Date()
    }
  };
  try {
    const res = await coll.findOneAndUpdate(
      { _id: new ObjectId(id) },
      update,
      { returnDocument: 'after' }
    );
    return res.value;
  } catch (err) {
    return null;
  }
}

/**
 * Delete an item by ID.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
// PUBLIC_INTERFACE
async function deleteItem(id) {
  const coll = await getItemsCollection();
  try {
    const res = await coll.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  } catch (err) {
    return false;
  }
}

module.exports = {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};
