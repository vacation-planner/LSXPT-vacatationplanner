const db = require("../dbConfig.js");

module.exports = {
  get: () => {
    return db("eventUsers");
  },

  getById: id =>{
   return db('eventUsers')
          .where('id', id)
          .first()
  },

  getByEventsId: eventsId => {
    let query = db("eventUsers");
    if (eventsId) {
      query.where("eventsId", eventsId);
      return query;
    }
    return db("eventUsers");
  },

  insert: event => {
    return db("eventUsers")
      .insert(event)
   },

  update: (id, changes) => {
    return db("eventUsers")
      .where("id", id)
      .update(changes);
  },

  remove: id => {
    return db("eventUsers")
      .where("id", id)
      .del();
  },
};