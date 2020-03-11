
exports.up = function (knex) {
    return  knex.schema.createTable('expenses', (expenses) => {
        expenses.increments();
        expenses.string('title', 128).notNullable();
        expenses.decimal('amount');
        expenses.integer('vacationsId').references('vacations.id');
        expenses.string('usersUid');
        expenses.integer('eventsId').references('events.id');
        expenses.string('eventName');
        expenses.string('vacationsTitle');
        expenses.integer('secondaryUsersId').references('secondaryUsers.id');
        expenses.string('secondaryUsersName');
        expenses.decimal('expensePaid');
        expenses.decimal('secondaryUsersExpense');
      })
  };
  
  
  exports.down = function (knex) {
     return knex.schema.dropTableIfExists('expenses')
  };
  