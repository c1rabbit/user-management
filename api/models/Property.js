/**
 * Property.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'properties',
  attributes: {
    // id:{
    //   type:'integer',
    //   primaryKey:true,
    //   autoIncrement:true
    // },
    address:{
      type:'string'
    },
    city:{
      type:'string'
    },
    zip:{
      type:'int'
    },
    state:{
      type:'string'
    },
    description:{
      type:'string'
    },
    bed:{
      type:'float',
      defaultsTo:null
    },
    bath:{
      type:'float',
      defaultsTo:null
    },
    listPrice:{
      type:'int',
      defaultsTo:null
    },
    yearBuilt:{
      type:'int'
    },
    sqft:{
      type:'int',
      defaultsTo:null
    },
    images:{
      collection:'image'
    },
    status:{
      model:'Status'
    },
    active:{
      type:'boolean',
      defaultsTo:false
    },
    feature:{
      type:'boolean',
      defaultsTo:false
    }
  },

  addImage: function(options, cb){
    Property.findOne({
      id: options.id
    }).populate('images').exec(function(err, prop){
      if(err) cb(err);
      if(prop.length == 0 ) cb(new Error("Property not found or is not active") );

      prop.images.add({
        url: options.url,
        filename: options.filename,
        size: options.size,
        filetype: options.filetype
      });
      prop.save(function (err, result){
        if(err) cb(err);
        cb(null, prop);
      });
    });
  },
  deleteImage: function(options, cb){
    Property.findOne({
      id: options.id
    }).populate('images').exec(function(err, prop){
      if(err) cb(err);
      if(prop.length == 0 ) cb(new Error("Property not found or is not active") );
      prop.images.remove(options.img);
      //prop.images.destroy(options.img);
      prop.save(function (err, result){
        if(err) cb(err);
        Image.destroy({
          id:options.img
        }).exec(function(err){
          if(err) cb(err);

          var fs = require('fs');
          var pathToFile = sails.config.paths.storage + '/' + options.id + '/' + options.imgUrl;
          sails.log.info('[Property/deleteImage]: '+pathToFile);
          fs.unlink( pathToFile );

          cb(null, prop);
        });

      });

    });
  }
};
