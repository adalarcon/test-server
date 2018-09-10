const express 	  = require('express');
const db          = require('../helper/mongo.client');

module.exports = exports = {

  find: function(collection, params){
    console.log("[%s][dao] find", collection);

    params = params || {};
    params.pager = params.pager || {};
    params.pager.size = parseInt(params.pager.size) || 0;
    params.pager.index = parseInt(params.pager.index) || 0;
    params.sort = params.sort || {};
    params.fields = params.fields || {};

    var atts = [];
    var natts =[];
    var filter = {};
    var sort = {};
    var key;
    var value;

    if(params.filter){
      if(params.nfilter){
        filter = { $and : natts };
        natts.push({$or :atts});
        var keys = Object.keys(params.nfilter);
        for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          if(Array.isArray(params.nfilter[key])){
            var values = params.nfilter[key];
            for (var j = 0; j < values.length; j++) {
              var o = {};
              o[key] = new RegExp(values[j], "i");
              natts.push(o);
            }
          }else{
            var o = {};
            o[key] = new RegExp(params.nfilter[key], "i");
            natts.push(o);
          }
        }

      }else{
        filter = { $or :atts};
      }

      var keys = Object.keys(params.filter);

      for (var i = 0; i < keys.length; i++) {

        key = keys[i];
        if(Array.isArray(params.filter[key])){
          var values = params.filter[key];
          for (var j = 0; j < values.length; j++) {
            var o = {};
            o[key] = new RegExp(values[j], "i");
            atts.push(o);
          }
        }else{
          var o = {};
          o[key] = new RegExp(params.filter[key], "i");
          atts.push(o);
        }
      }
    }

    if(params.sort){
      for (var i = 0; i < Object.keys(params.sort).length; i++) {
        params.sort[Object.keys(params.sort)[i]] = parseInt(params.sort[Object.keys(params.sort)[i]] || 1);
      }
      sort = params.sort;
    }

    return new Promise((resolve, reject) => {
       db.find(collection, { query: filter, fields:{}, sort: sort, pager: params.pager }).then(function(data){
         resolve(data);
       }).catch(function (error) {
         reject(error);
       });
    });
  },

  findById: function(collection, id){
    console.log("[%s][dao] findById", collection);
    return new Promise((resolve, reject) => {
       db.findById(collection, {id: id}).then(function(data){
         resolve(data);
       }).catch(function (error) {
         reject(error);
       });
    });
  },

  insertOne: function(collection, obj){
    console.log("[%s][dao] insertOne", collection);
    return new Promise((resolve, reject) => {
       db.insertOne(collection, obj).then(function(data){
         obj['_id'] = data.insertedId;
        resolve(obj);
       }).catch(function (error) {
         reject(error);
       });
    });
  },

  updateOne: function(collection, obj){
    console.log("[%s][dao] updateOne", collection);
    return new Promise((resolve, reject) => {
       db.updateOne(collection, obj).then(function(data){
         resolve(data);
       }).catch(function (error) {
         reject(error);
       });
    });
  },

  deleteOne: function(collection, id){
    console.log("[%s][dao] deleteOne", collection);
    return new Promise((resolve, reject) => {
       db.deleteOne(collection, id).then(function(data){
         resolve(data);
       }).catch(function (error) {
         reject(error);
       });
    });
  },

}
