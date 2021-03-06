
exports.up = function(knex) {
    return knex.schema.createTable('events', (event) => {
            event.increments();
            event.string('eventName', 128).notNullable();
            event.integer('vacationsId').references('vacations.id');
            event.string('usersUid').references('users.uid');
            event.integer('secondaryUsersId').references('secondaryUsers.id');
            event.datetime('startDateTime');
            event.datetime('endDateTime');
            event.string('description', 140);
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('events');
};
