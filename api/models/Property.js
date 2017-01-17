/**
 * Property.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'properties',
  attributes: {
    id:{
      type:'integer',
      primaryKey:true,
      autoIncrement:true
    },
    address:{
      type:'string',
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

    addImage: function(options, cb){
      this.images.add(options.image);
      this.save(cb(err,{file:uploadedFile}));
    }

  }
};
