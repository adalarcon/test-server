const express = require('express');
const router = express.Router();

const CategoriesCTRL = require('../controller/categories.controller');

// campaigns
router.get('/api/v1/categories',  CategoriesCTRL.find);
router.get('/api/v1/categories/:id', CategoriesCTRL.findById);
router.post('/api/v1/categories', CategoriesCTRL.insertOne);
router.put('/api/v1/categories',  CategoriesCTRL.updateOne);
router.delete('/api/v1/categories/:id',  CategoriesCTRL.deleteOne);

module.exports = router;
