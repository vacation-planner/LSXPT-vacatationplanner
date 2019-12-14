
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('eventUsers').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventUsers').insert([
        {id: 1, vacationsId: 1, secondaryUsersId: 2, eventPaid: 23.50, eventCost: 75.00, description: "I still need to pay"},
        {id: 2, vacationsId: 2, secondaryUsersId: 3, eventPaid: 15.25, eventCost: 175.00, description: "talk to bob"},
        {id: 3, vacationsId: 3, secondaryUsersId: 1, eventPaid: 22.50, eventCost: 65.00, description: "what else?"},
      ]);
    });
};