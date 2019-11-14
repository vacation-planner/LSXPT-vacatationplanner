
exports.up = function(knex) {
    return knex.schema.createTable('events', (event) => {
            event.increments();
            event.string('eventName', 128).notNullable();
            event.string('vacationId').references('vacation.id');
            event.string('userUid').references('users.uid');
            event.string('secondaryUserId').references('secondaryUsers.id');
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