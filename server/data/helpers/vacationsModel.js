const db = require('../dbConfig')

module.exports = {
    get: get,
    getById: getById,
    //getPlansById: getPlansById,
    //getSecondaryUsersById: getSecondaryUsersById,
    //getByUserUid: getByUserUid,
    //getExpensesById: getExpensesById,
    insert: insert,
    remove: remove,
    update: update,
}

/* Vacation table necessary functions.
getById: return a vacation with the passed in ID 
getPlansById: return all vacation plans for a vacation by the passed in ID
getSecondaryUsersById: return all secondary users registered to a vacation ID
getExpensesById: return all expenses associated with this ID
*/

function insert(vacation) {
    return db('vacations').insert(vacation)
}

function get() {
    return db('vacations');
}

function remove(id) {
    return db('vacations').where('id', id).del();
}

function update(id, changes) {
    return db('vacations').where('id', id).update(changes);
}

function getById(id) {
    return db('vacations').where('id', id);
}

   /*  get: () => {
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
}; */
