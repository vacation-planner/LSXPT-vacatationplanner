const db = require('../dbConfig')

module.exports = {
    getById();
}

function getById(id) {
    db('vacations').where('id', id)
}