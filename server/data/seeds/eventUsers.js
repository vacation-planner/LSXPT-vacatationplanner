
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('eventUsers').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventUsers').insert([
        {id: 1, eventsId: 1, vacationsId: 2, secondaryUsersId: 2, expensePaid: 23.50, expense: 75.00, secondaryUsersExpense: 100.00, title: "jetski"},
        {id: 2, eventsId: 2, vacationsId: 1, secondaryUsersId: 3, expensePaid: 15.25, expense: 175.00, secondaryUsersExpense: 200.00, title: "camp site"},
        {id: 3, eventsId: 3, vacationsId: 3, secondaryUsersId: 1, expensePaid: 22.50, expense: 65.00, secondaryUsersExpense: 50.00, title: "gas"},
      ]);
    });
};