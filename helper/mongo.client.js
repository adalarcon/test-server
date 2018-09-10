const mongodb     = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID    = require('mongodb').ObjectID;
const config      = require('../config/config');

const url         = config.database.url;
const dbName      = config.database.dbName;
const fs          = require('fs');
const isID        = new RegExp("^[0-9a-fA-F]{24}$");

// Connect
const connection = (closure) => {
  return MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    closure(db, err);
    client.close();
    
  });
};

module.exports = {

  find: (collection, params ) => {
    params = params || {};
    params.pager = params.pager || {};

    var limit = 0;
    var skip = 0;
    if(params.pager.index && params.pager.size){
      skip = params.pager.size*(params.pager.index-1);
      limit = params.pager.size;
    }
    return new Promise((resolve, reject) => {
       connection((db, err) => {
           if (err) {
             reject(err);
             return;
           }
           db.collection(collection)
           .find(params.query, params.fields)
           .sort(params.sort)
           .skip(skip)
           .limit(limit)
           .toArray()
           .then((obj) => {
               resolve(obj);
           })
           .catch((err) => {
               reject(err);
           });
       });
    });
  },

  findOne: (collection, params ) => {
    params = params || {};
    return new Promise((resolve, reject) => {
       connection((db, err) => {
         if (err) {
           reject(err);
           return;
         }
         db.collection(collection)
         .find(params.query, params.fields)
         .sort(params.sort)
         .toArray()
         .then((obj) => {
             resolve(obj[0]);
         })
         .catch((err) => {
             reject(err);
         });
       });
    });
  },

  findById: (collection, params ) => {
    params = params || {};

    return new Promise((resolve, reject) => {
       connection((db, err) => {
         if (err) {
           reject(err);
           return;
         }
         if (!isID.test(params.id)) {
           resolve();
           return;
         }
         db.collection(collection)
         .find({_id: new ObjectID(params.id)}, params.fields)
         .sort(params.sort)
         .toArray()
         .then((obj) => {
             resolve(obj[0]);
         })
         .catch((err) => {
             reject(err);
         });
       });
    });
  },

  insertOne: (collection, obj) => {
    return new Promise((resolve, reject) => {
      connection((db, err) => {
        if (err) {
          reject(err);
          return;
        }

        db.collection(collection)
        .insertOne(obj)
        .then((obj) => {
            resolve(obj);
        })
        .catch((err) => {
            reject(err);
        });
      });
    });
  },

  updateOne: (collection, obj) => {
    var id = obj._id;
    delete obj._id;
    return new Promise((resolve, reject) => {
      connection((db, err) => {
          if (err) {
            reject(err);
            return;
          }
          if (!isID.test(id)) {
            resolve();
            return;
          }
          db.collection(collection)
          .updateOne({_id: new ObjectID(id)}, { $set: obj})
          .then((obj) => {
              resolve(obj.result);
          })
          .catch((err) => {
              reject(err);
          });
      });
    });
  },

  deleteOne: (collection, id) => {
    return new Promise((resolve, reject) => {
      connection((db, err) => {

        if (err) {
          reject(err);
          return;
        }
        if (!isID.test(id)) {
          resolve();
          return;
        }
          db.collection(collection)
          .deleteOne({_id: new ObjectID(id)})
          .then((obj) => {
              resolve(obj.result);
          })
          .catch((err) => {
              reject(err);
          });
      });
    });
  },
}
