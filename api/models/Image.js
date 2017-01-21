/**
 * Images.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'images',
  attributes: {
    // id:{
    //   type:'integer',
    //   primaryKey:true,
    //   autoIncrement:true
    // },
    primary:{
      type:'boolean',
      default:'false'
    },
    url:{
      type:'string',
      required:true
    }

  }
};
