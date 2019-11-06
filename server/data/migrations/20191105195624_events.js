
exports.up = function(knex) {
    return knex.schema.createTable('events', (event) => {
            event.increments();
            event.string('eventName', 128).notNullable();
            event
            .string('vacationId')
            .references('vacation.id');
            event
            .string('userUid')
            .references('users.uid');
            event
            .string('secondaryUserId')
            .references('secondaryUsers.id');
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('events');
};
