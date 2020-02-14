const db = require('../dbConfig');

module.exports = {
    get: get,
    getById: getById,
    getByUid: getByUid,
    getByVacId: getByVacId,
    getByEventsId: getByEventsId,
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

function getByVacId(vacationsId) {
    return db('expenses').where('vacationsId', vacationsId);
}

function getByEventsId(eventsId) {
    return db('expenses').where('eventsId', eventsId);
}

function insert(data) {
    return db('expenses').insert(data);
}

function remove(id) {
    return db('expenses').where('id', id).del();
}

function update(id, data) {
    return db('expenses').where('id', id).update(data);
}
