const DAO = require('../dao/mongo.dao');
const COLLECTION  = "categories";

module.exports = {
  find: function(req, res){
    DAO.find(COLLECTION, req.query).then(function(data){
			res.json(data);
    }).catch(function (error) {
      console.error("[%s][controller][error] find %s",COLLECTION, error);
      res.status(500).json(error);
    });
  },

  findById: function(req, res){
    DAO.findById(COLLECTION, req.params.id).then(function(data){
      res.json(data);
    }).catch(function (error) {
      console.error("[%s][controller][error] findById %s",COLLECTION,  error);
      res.status(500).json(error);
    });
  },

  insertOne: function(req, res){
    DAO.insertOne(COLLECTION, req.body).then(function(data){
			res.json(data);
    }).catch(function (error) {
      console.error("[%s][controller][error] save %s",COLLECTION,  error);
      res.status(500).json(error);
    });

  },

  updateOne: function(req, res){
    DAO.updateOne(COLLECTION, req.body).then(function(data){
			res.json(data);
    }).catch(function (error) {
      console.error("[%s][controller][error] update %s",COLLECTION,  error);
      res.status(500).json(error);
    });
  },

  deleteOne: function(req, res){
    DAO.deleteOne(COLLECTION, req.params.id, req.decoded).then(function(data){
			res.json(data);
    }).catch(function (error) {
      console.error("[%s][controller][error] delete %s",COLLECTION,  error);
      res.status(500).json(error);
    });
  }
}
