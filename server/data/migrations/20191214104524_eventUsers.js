
exports.up = function(knex) {
    return knex.schema.createTable('eventUsers', (eventUsers) => {
        eventUsers.increments();
        eventUsers.integer('eventsId');
        eventUsers
            .integer('vacationsId')
            .references('vacations.id')
            .notNullable();
        eventUsers.integer('secondaryUsersId');
        eventUsers.decimal('expensePaid');
        eventUsers.decimal('expense');
        eventUsers.decimal('secondaryUsersExpense');
        eventUsers.string('title', 140);
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('eventUsers');
};
