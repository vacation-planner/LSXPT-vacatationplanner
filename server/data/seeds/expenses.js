
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('secondaryUsers').del()
    .then(function () {
      // Inserts seed entries
      /*
      return knex('expenses').insert([
        {id: 1, title: 'food', amount: 10.25, userId: '5XVDcbsvwka_bnC',},
        {id: 2, title: 'dinner', amount: 200.24, userId: '5XVDhhsvwka_bnC',},
        {id: 3, title: 'rental', amount: 50.00, userId: '5XVkkbsvwka_bnC',}     
      ]);
      */
     return
    });
};