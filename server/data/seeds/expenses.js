
exports.seed = function(knex, Promise) {
  // No expenses table yet so do nothing.
  return
  // Deletes ALL existing entries
  
  return knex('expenses').del()
    .then(function () {
      // Inserts seed entries
      return knex('expenses').insert([
        {id: 1, title: 'food', amount: 10.25, usersUid: '5XVDcbsvwka_bnC'},
        {id: 2, title: 'dinner', amount: 200.24, usersUid: '5XVDhhsvwka_bnC'},
        {id: 3, title: 'rental', amount: 50.00, usersUid: '5XVkkbsvwka_bnC'}     
      ]);
     return
    });
    
};