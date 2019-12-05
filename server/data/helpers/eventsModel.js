const db = require("../dbConfig.js");

module.exports = {
  get: () => {
    return db("events");
  },

  getById: id =>{
   return db('events')
          .where('id', id)
          .first()
  },

  getByVacationsId: vacationsId => {
    let query = db("events");
    if (vacationsId) {
      query.where("vacationsId", vacationsId).first();
      return query;
    }
    return db("events");
  },

  insert: event => {
    return db("events")
      .insert(event)
   },

  update: (id, changes) => {
    return db("events")
      .where("id", id)
      .update(changes);
  },

  remove: id => {
    return db("events")
      .where("id", id)
      .del();
  },
};