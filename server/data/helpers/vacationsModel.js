const db = require('../dbConfig')

module.exports = {
    get: () => {
        return db("vacations");
    },

   getByUid: id => {
        let query = db('vacations');
        if (id) {
            query.where('id', id).first();
            return query;
        }
        return db('vacations')
    },

    update: (userId, changes) => {
        return db('vacations')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: vacation => {
        return db('vacations')
            .where('id', id)
            .del();
    },

    insert: vacation => {
        return db("vacations").insert(vacation);
       
    }
};
