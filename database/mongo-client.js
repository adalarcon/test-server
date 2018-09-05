const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test-mongo';

// Use connect method to connect to the server

var connection = function(closure) {
    return MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      closure(db, err);
      client.close();
    });
};

module.exports = {

  find: function(query){
    return new Promise((resolve, reject) => {
      connection(function(db, err){
        if(err){
          reject(err);
          return;
        }
        const collection = db.collection('categories');
        console.log(query);
        collection.find(query).toArray(function(err, docs) {
          if(err){
            reject(err);
            return;
          }else{
            resolve(docs);
          }
        });
      });
    });


  },

  save: function(){

  },

  update: function(){

  },
  delete: function(){

  }

}
