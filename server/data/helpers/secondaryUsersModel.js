const db = require("../dbConfig.js");

module.exports = {
  get: () => {
    return db("secondaryUsers");
  },

  getByid: id => {
    let query = db("secondaryUsers");
    if (id) {
      query.where("id", id);
      return query;
    }
    return db("secondaryUsers");
  },

  getByVacationId: vacationId => {
    let query = db("secondaryUsers");
    if (vacationId) {
      query.where("vacationId", vacationId)
      return query;
    }
    return db("secondaryUsers");
  },

  getByEmail: email => {
    let query = db("secondaryUsers");
    if (email) {
      query.where("email", email)
      return query;
    }
    return db("secondaryUsers");
  },

  remove: recordId => {
    return db("secondaryUsers")
      .where("id", recordId)
      .del();
  },

  insert: user => {
    return db("secondaryUsers")
      .insert(user)
   },
};
