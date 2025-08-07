const { ObjectId } = require('mongodb');

/**
 * Item model schema (for documentation and validation).
 *
 * @typedef {Object} Item
 * @property {ObjectId} _id - The unique ID of the item
 * @property {string} name - The name of the item (required)
 * @property {string} [description] - The description of the item
 * @property {Date} createdAt - When the item was created
 * @property {Date} updatedAt - When the item was last updated
 */

/**
 * Validate the shape of a new item.
 * @param {Object} data
 * @returns {{valid: boolean, errors: string[]}}
 */
// PUBLIC_INTERFACE
function validateItem(data) {
  const errors = [];
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string.');
  }
  // Additional validation if needed.
  return { valid: errors.length === 0, errors };
}

module.exports = {
  validateItem,
};
