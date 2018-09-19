const express = require('express');
const router = express.Router();

const CategoriesCTRL = require('../controller/categories.controller');
const CustomersCTRL = require('../controller/customers.controller');

router.get("/", (req, res) =>{
  res.send("Welcome to data api");
});

// campaigns
router.get('/api/v1/categories',  CategoriesCTRL.find);
router.get('/api/v1/categories/:id', CategoriesCTRL.findById);
router.post('/api/v1/categories', CategoriesCTRL.insertOne);
router.put('/api/v1/categories',  CategoriesCTRL.updateOne);
router.delete('/api/v1/categories/:id',  CategoriesCTRL.deleteOne);


router.get('/api/v1/customers',  CategoriesCTRL.find);
router.get('/api/v1/customers/:id', CategoriesCTRL.findById);
router.post('/api/v1/customers', CategoriesCTRL.insertOne);
router.put('/api/v1/customers',  CategoriesCTRL.updateOne);
router.delete('/api/v1/customers/:id',  CategoriesCTRL.deleteOne);

module.exports = router;
