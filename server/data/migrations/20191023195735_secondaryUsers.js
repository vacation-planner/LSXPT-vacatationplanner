
exports.up = function(knex) {
    return knex.schema.createTable('secondaryUsers', (secondary) => {
            secondary.increments();
            secondary
            .string('vacationId')
            .references('vacation.id');
            secondary
            .string('userUid')
            .references('users.uid');
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('secondaryUsers');
};
