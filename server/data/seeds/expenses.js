
exports.seed = function(knex, Promise) {
  // No expenses table yet so do nothing.
  
  // Deletes ALL existing entries
  
  return knex('expenses').del()
    .then(function () {
      // Inserts seed entries
      return knex('expenses').insert([
        {id: 1, eventsId: 1, vacationId: 1, vacationsTitle: "Winter", secondaryUsersId: 2, secondaryUsersName: "Mike Smith", expensePaid: 23.50, amount: 75.00, secondaryUsersExpense: 100.00, title: "jetski"},
        {id: 2, eventsId: 2, vacationId: 1, vacationsTitle: "Summer", secondaryUsersId: 3, secondaryUsersName: "Jane Doe", expensePaid: 15.25, amount: 175.00, secondaryUsersExpense: 200.00, title: "camp site"},
        {id: 3, eventsId: 3, vacationId: 3, vacationsTitle: "Spring", secondaryUsersId: 1, secondaryUsersName: "Anon Anonymous", expensePaid: 22.50, amount: 65.00, secondaryUsersExpense: 50.00, title: "gas"},  
      ]);
    });
    
};