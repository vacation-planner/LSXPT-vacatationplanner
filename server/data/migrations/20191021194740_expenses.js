
exports.up = function (knex, Promise) {
    return Promise.all([
      knex.schema.createTable('expenses', (expenses) => {
        expenses.increments();
        expenses.string('title', 128).notNullable();
        expenses.decimal('amount');
        expenses
        .string('uid')
        .references('users.uid');
      })
    ])
  };
  
  
  exports.down = function (knex, Promise) {
    return Promise.all([
      knex.schema.dropTableIfExists('expenses')
    ]);
  };
  