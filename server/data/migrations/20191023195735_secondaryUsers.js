
exports.up = function(knex) {
    return knex.schema.createTable('secondaryUsers', (secondary) => {
            secondary.increments();
            secondary
            .integer('vacationsId')
            .references('vacations.id');
            secondary
            .string('usersUid')
            .references('users.uid');
            secondary.string("firstName", 128).notNullable();
            secondary.string("lastName", 128).notNullable();
            secondary
            .string("email", 128)
            .notNullable();
            })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('secondaryUsers');
};
