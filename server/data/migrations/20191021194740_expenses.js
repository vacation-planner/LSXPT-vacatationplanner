
exports.up = function (knex) {
    return  knex.schema.createTable('expenses', (expenses) => {
        expenses.increments();
        expenses.integer('vacationsId').references('vacations.id');
        expenses.string('usersUid');
        expenses.integer('eventsId').references('events.id');
        expenses.string('eventName');
        expenses.string('vacationsTitle');
        expenses.integer('secondaryUsersId').references('secondaryUsers.id');
        expenses.string('secondaryUsersFirstName').references('secondaryUsers.firstName');
        expenses.string('secondaryUsersLastName').references('secondaryUsers.lastName');
        expenses.decimal('expenseOwed');
        expenses.decimal('secondaryUsersExpense');
      })
  };
  
  
  exports.down = function (knex) {
     return knex.schema.dropTableIfExists('expenses')
  };
  