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
      type:'int',
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
      type:'float'
    },
    bath:{
      type:'float'
    },
    listPrice:{
      type:'int'
    },
    yearBuilt:{
      type:'int'
    },
    sqft:{
      type:'int'
    },
    images:{
      collection:'images'
    },
    status:{
      model:'Status'
    },
    active:{
      type:'boolean',
      defaultsTo:false
    }

  }
};
