const db = require("../dbConfig.js");

module.exports = {
  get: () => {
    return db("secondaryUsers");
  },


// I can't think of a case where we'd need this, but just in case
  // getByid: id => {
  //   let query = db("secondaryUsers");
  //   if (id) {
  //     query.where("id", id);
  //     return query;
  //   }
  //   return db("secondaryUsers");
  // },

  getByVacationsId: vacationsId => {
    let query = db("secondaryUsers");
    if (vacationsId) {
      query.where("vacationsId", vacationsId)
      return query;
    }
    return db("secondaryUsers");
  },
  getById: id =>{
    return db('secondaryUsers')
           .where('id', id)
           .first()
   },
  /* getById: id => {
    let query = db("secondaryUsers");
    if (id) {
      query.where("id", id)
      return query;
    }
    return db("secondaryUsers");
  }, */

  remove: recordId => {
    return db("secondaryUsers")
      .where("id", recordId)
      .del();
  },

  insert: user => {
    return db("secondaryUsers").insert(user);
   },
};
