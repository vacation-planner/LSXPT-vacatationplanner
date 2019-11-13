exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('secondaryUsers').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, firstName: 'Joe', vacationId: '1', userUid: '5XVDcbsvwka_bnC'},
          {id: 1, firstName: 'Jane', vacationId: '2', userUid: '5XVDcbsvwka_bnC'},
          {id: 1, firstName: 'Maria', vacationId: '3', userUid: '5XVDcbsvwka_bnC'}, 
        ]);
      });
  };















