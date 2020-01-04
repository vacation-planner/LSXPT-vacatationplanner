exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('secondaryUsers').del()
      .then(function () {
        // Inserts seed entries
        return knex('secondaryUsers').insert([
          {id: 1, vacationsId: 1, firstName: 'Anon', lastName: 'Anonymous', email: 'test4@here.com'},
          {id: 2, vacationsId: 2, firstName: 'Mike', lastName: 'Smith', email: 'test5@here.com'},
          {id: 3, vacationsId: 3, firstName: 'Jane', lastName: 'Doe', email: 'test6@here.com'}, 
        ]);
      });
  };