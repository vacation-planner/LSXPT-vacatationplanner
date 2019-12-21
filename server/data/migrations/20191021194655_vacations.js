
exports.up = function (knex) {
    return knex.schema.createTable('vacations', (vacations) => {
        vacations.increments();
        vacations.string('title', 128).notNullable();
        vacations.string('location', 128);
        vacations.date('startDate');
        vacations.date('endDate');
        vacations
        .string('usersUid', 128)
        .references('users.uid');
      })
  };
  
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('vacations');
  };
  
  