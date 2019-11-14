const db = require("../dbConfig.js");

module.exports = {
  get: () => {
    return db("secondaryUsers");
  },

  getByUid: userUid => {
    let query = db("secondaryUsers");
    if (userUid) {
      query.where("userUid", userUid);
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
