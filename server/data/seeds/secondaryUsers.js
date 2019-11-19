exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('secondaryUsers').del()
      .then(function () {
        // Inserts seed entries
        return knex('secondaryUsers').insert([
          {id: 1, vacationsId: 1, firstName: 'Joe', lastName: 'Cool', email: 'test4@here.com'},
          {id: 2, vacationsId: 2, firstName: 'Mack', lastName: 'Intosh', email: 'test5@here.com'},
          {id: 3, vacationsId: 3, firstName: 'Marie', lastName: 'Kondo', email: 'test6@here.com'}, 
        ]);
      });
  };