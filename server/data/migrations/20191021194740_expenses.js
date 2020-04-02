
exports.up = function (knex) {
    return  knex.schema.createTable('expenses', (expenses) => {
        expenses.increments();
        expenses.integer('vacationsId').references('vacations.id');
        expenses.string('usersUid');
        expenses.integer('eventsId').references('events.id');
        expenses.string('eventName');
        expenses.string('vacationsTitle');
        expenses.integer('secondaryUsersId');
        expenses.string('secondaryUsersFirstName');
        expenses.string('secondaryUsersLastName');
        expenses.decimal('expenseOwed');
        expenses.decimal('secondaryUsersExpense');
        expenses.string('secondaryUsersPayeeLastName');
        expenses.string('secondaryUsersPayeeFirstName');
        expenses.integer('secondaryUsersPayeeId');
      })
  };
  
  
  exports.down = function (knex) {
     return knex.schema.dropTableIfExists('expenses')
  };
  