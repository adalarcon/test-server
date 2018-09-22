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


router.get('/api/v1/customers',  CustomersCTRL.find);
router.get('/api/v1/customers/:id', CustomersCTRL.findById);
router.post('/api/v1/customers', CustomersCTRL.insertOne);
router.put( '/api/v1/customers', CustomersCTRL.updateOne);
router.delete('/api/v1/customers/:id',  CustomersCTRL.deleteOne);

module.exports = router;
