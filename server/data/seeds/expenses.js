
exports.seed = function(knex, Promise) {
  // No expenses table yet so do nothing.
  
  // Deletes ALL existing entries
  
  return knex('expenses').del()
    .then(function () {
      // Inserts seed entries
      return knex('expenses').insert([
        {id: 1, eventsId: 1, vacationsId: 1, vacationsTitle: "Winter", secondaryUsersId: 2, secondaryUsersFirstName: "Mike", secondaryUsersLastName: "Smith", expenseOwed: 23.50, secondaryUsersExpense: 100.00},
        {id: 2, eventsId: 2, vacationsId: 1, vacationsTitle: "Summer", secondaryUsersId: 3, secondaryUsersFirstName: "Jane", secondaryUsersLastName: "Doe", expenseOwed: 15.25, secondaryUsersExpense: 200.00},
        {id: 3, eventsId: 3, vacationsId: 3, vacationsTitle: "Spring", secondaryUsersId: 1, secondaryUsersFirstName: "Anon", secondaryUsersLastName: "Anonymous", expenseOwed: 22.50, secondaryUsersExpense: 50.00},  
      ]);
    });
    
};