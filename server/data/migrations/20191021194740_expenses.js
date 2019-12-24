
exports.up = function (knex) {
    return  knex.schema.createTable('expenses', (expenses) => {
        expenses.increments();
        expenses.string('title', 128).notNullable();
        expenses.decimal('amount');
        expenses.integer('vacationId').references('vacations.id');
        expenses
        .string('usersUid')
        .references('users.uid');
      })
  };
  
  
  exports.down = function (knex) {
     return knex.schema.dropTableIfExists('expenses')
  };
  