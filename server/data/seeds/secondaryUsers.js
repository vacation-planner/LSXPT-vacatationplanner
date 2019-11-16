exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('secondaryUsers').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, vacationId: '1', firstName: 'Joe', lastName: 'Cool', email: 'test4@here.com'},
          {id: 1, vacationId: '2', firstName: 'Mack', lastName: 'Intosh', email: 'test5@here.com'},
          {id: 1, vacationId: '3', firstName: 'Marie', lastName: 'Kondo', email: 'test6@here.com'}, 
        ]);
      });
  };