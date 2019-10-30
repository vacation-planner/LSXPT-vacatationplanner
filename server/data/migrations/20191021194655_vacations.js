
exports.up = function(knex, Promise) {
    return knex.schema.createTable('vacations', (vacations) => {
        vacations.increments();
        vacations.string('title', 128).notNullable();
        vacations.date('startDate');
        vacations.date('endDate');
        vacations
        .string('uid')
        .references('users.uid');
      })
   
  };
  
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('vacations')
    
  };
  
  