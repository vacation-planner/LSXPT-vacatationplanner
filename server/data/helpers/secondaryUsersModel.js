const db = require("../dbConfig.js");

module.exports = {
  get: () => {
    return db("secondaryUsers");
  },

  getById: id =>{
   return db('secondaryUsers')
          .where('id', id)
          .first()
  },

  getByUid: userUid => {
    let query = db("secondaryUsers");
    if (userUid) {
      query.where("userUid", userUid).first();
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

  update: (userUid, changes) => {
    return db("secondaryUsers")
      .where("userUid", userUid)
      .update(changes);
  },

  remove: userUid => {
    return db("secondaryUsers")
      .where("userUid", userUid)
      .del();
  },

  findByUid: userUid => {
    return db("secondaryUsers")
      .where("userUid", userUid)
      .first();
  }
};
