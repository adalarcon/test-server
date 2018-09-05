const express = require('express')
const app = express()
const bodyParser = require("body-parser");

const Categories = require('./controller/Categories.js');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/v1/categories', Categories.find)
app.post('/v1/categories', Categories.save)
app.put('/v1/categories', Categories.update)
app.delete('/v1/categories', Categories.delete)



app.listen(3000, () => console.log('Example app listening on port 3000!'))
