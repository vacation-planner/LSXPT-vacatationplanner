
exports.up = function (knex) {
    return  knex.schema.createTable('expenses', (expenses) => {
        expenses.increments();
        expenses.string('title', 128).notNullable();
        expenses.decimal('amount');
        expenses.integer('vacationId').references('vacations.id');
        expenses.string('usersUid');
        expenses.integer('eventsId');
        expenses.string('vacationsTitle');
        expenses.integer('secondaryUsersId');
        expenses.string('secondaryUsersName');
        expenses.decimal('expensePaid');
        expenses.decimal('secondaryUsersExpense');
      })
  };
  
  
  exports.down = function (knex) {
     return knex.schema.dropTableIfExists('expenses')
  };
  