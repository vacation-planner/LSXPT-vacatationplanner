
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'Joe', lastName: 'Doe', email: 'test@here.com', uid: '5XVDcbsvwka_bnC'},
        {id: 2, firstName: 'Jane', lastName: 'Jones', email: 'test2@here.com', uid: '5XVDhhsvwka_bnC'},
        {id: 3, firstName: 'Maria', lastName: 'Smith', email: 'test3@here.com', uid: '5XVkkbsvwka_bnC'}     
      ]);
    });
};
