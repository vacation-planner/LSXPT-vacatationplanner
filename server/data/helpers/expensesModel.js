const db = require('../dbConfig');

module.exports = {
    get: get,
    getById: getById,
    getByUid: getByUid,
    getByVacId: getByVacId,
    insert: insert,
    remove: remove,
    update: update,
}

function get() {
    return db('expenses');
}

function getById(id) {
    return db('expenses').where('id', id);
}

function getByUid(uid) {
    return db('expenses').where('uid', uid);
}

// If we decide to add in the ability to get all expenses associated with a vacation id.
function getByVacId(vacId) {
    //return db('expenses').where('vacId', vacId);
}

function insert(data) {
    return db('expenses').insert(data)
}

function remove(id) {
    return db('expenses').where('id', id).del();
}

function update(id, data) {
    return db('expenses').where('id', id).update(data);
}
