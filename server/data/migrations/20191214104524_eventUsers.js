
exports.up = function(knex) {
    return knex.schema.createTable('eventUsers', (eventUsers) => {
        eventUsers.increments();
        eventUsers.integer('vacationsId').references('vacations.id');
        eventUsers.integer('secondaryUsersId').references('secondaryUsers.id');
        eventUsers.decimal('eventPaid');
        eventUsers.decimal('eventCost');
        eventUsers.string('description', 140);
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('eventUsers');
};
