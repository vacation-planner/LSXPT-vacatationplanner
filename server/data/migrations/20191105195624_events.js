
exports.up = function(knex) {
    return knex.schema.createTable('events', (event) => {
            event.increments();
            event.string('eventName', 128).notNullable();
            event.integer('vacationsId');
            event.string('usersUid', 128);
            event.integer('secondaryUsersId');
            event.date('startDate');
            event.date('endDate');
            event.time('startTime');
            event.time('endTime');
            event.string('description', 140);
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('events');
};
