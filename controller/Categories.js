const Client = require('../database/mongo-client')


module.exports = {
  find: function(req, res){
    var query = {};
    if(req.query.filter){
      console.log(req.query.filter);
      query = req.query.filter;
    }
    Client.find(query).then(function(data){
      res.json(data);
    });
  },

  save: function(req, res){
    console.log("Categories save");
    res.json({data: "document saved", status: "ok"});

  },

  update: function(req, res){
    console.log("Categories update");
    res.json({data: "document updated", status: "ok"});

  },

  delete: function(req, res){
    console.log("Categories delete");
    res.json({data: "document deleted", status: "ok"});
  }
}
