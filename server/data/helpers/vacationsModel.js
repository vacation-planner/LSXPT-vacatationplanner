const db = require('../dbConfig')

module.exports = {
    getById: getById,
    getPlansById: getPlansById,
    getSecondaryUsersById: getSecondaryUsersById,
    getByUserUid: getByUserUid,
    getExpensesById: getExpensesById,
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

function remove(id) {
    return db('vacations').where('id', id).del();
}

function update(id, changes) {
    return db('vacations').where('id', id).update(changes);
}

function getById(id) {
    return db('vacations').where('id', id);
}

function getPlansById(id) {
    // return db('plans').where('vacationId', id);
}

function getSecondaryUsersById(id) {
    return db('secondaryUsers').where('vacationId', id);
}

function getByUserUid(uid) {
    return db('secondaryUsers').where('userUid', uid)
}

function getExpensesById(id) {
    // return db('expenses').where('vacationId', id);
}