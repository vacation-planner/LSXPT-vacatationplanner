
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('billing')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('billing').insert([
        { id: 1, accountType: 1, usersUid: '5XVDcbsvwka_bnC' },
        { id: 2, accountType: 2, usersUid: 'luY3BUF5OpoaYiM' },
        { id: 3, accountType: 2, usersUid: '8ar9mNLYHaslfyj' },
      ]);
    });
};