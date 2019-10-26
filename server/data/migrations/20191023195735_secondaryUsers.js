
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('secondaryUsers', (secondary) => {
            secondary.increments();
            secondary
            .string('vacationId')
            .references('vacation.id');
            secondary
            .string('userUid')
            .references('users.uid');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('secondaryUsers')
    ]);
};
