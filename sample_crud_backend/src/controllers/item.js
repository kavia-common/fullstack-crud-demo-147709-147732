const itemService = require('../services/item');
const { validateItem } = require('../models/item');

/**
 * Controller for CRUD endpoints for items.
 */
class ItemController {
  // PUBLIC_INTERFACE
  async list(req, res) {
    try {
      const items = await itemService.listItems();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ status: 'error', message: 'Failed to list items.' });
    }
  }

  // PUBLIC_INTERFACE
  async get(req, res) {
    const { id } = req.params;
    try {
      const item = await itemService.getItem(id);
      if (!item) return res.status(404).json({ status: 'error', message: 'Item not found' });
      res.status(200).json(item);
    } catch (err) {
      res.status(400).json({ status: 'error', message: 'Invalid item ID' });
    }
  }

  // PUBLIC_INTERFACE
  async create(req, res) {
    const { valid, errors } = validateItem(req.body);
    if (!valid) {
      return res.status(400).json({ status: 'error', message: 'Validation failed', errors });
    }

    try {
      const item = await itemService.createItem(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ status: 'error', message: 'Failed to create item.' });
    }
  }

  // PUBLIC_INTERFACE
  async update(req, res) {
    const { id } = req.params;
    const { valid, errors } = validateItem(req.body);
    if (!valid) {
      return res.status(400).json({ status: 'error', message: 'Validation failed', errors });
    }

    try {
      const updated = await itemService.updateItem(id, req.body);
      if (!updated) return res.status(404).json({ status: 'error', message: 'Item not found' });
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ status: 'error', message: 'Invalid item ID' });
    }
  }

  // PUBLIC_INTERFACE
  async delete(req, res) {
    const { id } = req.params;
    try {
      const success = await itemService.deleteItem(id);
      if (!success) return res.status(404).json({ status: 'error', message: 'Item not found' });
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ status: 'error', message: 'Invalid item ID' });
    }
  }
}

module.exports = new ItemController();
