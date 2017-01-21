/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "roles",
  attributes: {
    // id:{
    //   type:'integer',
    //   autoIncrement: true,
    //   primaryKey: true
    // },
    role:{
      type: 'string',
      unique: 'true'
    },
    users:{
      collection: 'user',
      via: 'roles'
    }

  }
};
