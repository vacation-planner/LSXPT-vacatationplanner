
exports.up = function(knex) {
    return knex.schema.createTable('secondaryUsers', (secondary) => {
            secondary.increments();
            secondary
            .integer('vacationsId')
            .references('vacations.id');
            secondary
            .string('usersUid')
            .references('users.uid');
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('secondaryUsers');
};
