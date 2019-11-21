
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, eventName: 'Horse Shoes', vacationsId: 1, usersUid: '5XVDcbsvwka_bnC', secondaryUsersId: 2, startDate: '10/24/2019', endDate: '10/24/2019', startTime: '0900', endTime: '1000', description: 'Horseshoes Tournament - Sign Up Early'},
        {id: 2, eventName: 'Luau', vacationsId: 2, usersUid: '5XVDcbsvwka_bnC', secondaryUsersId: 3, startDate: '10/25/2019', endDate: '10/26/2019', startTime: '2000', endTime: '0000', description: 'Roast Pig & Limbo! Bring your grass skirts!'},
        {id: 3, eventName: 'Potluck Dinner', vacationsId: 1, usersUid: '5XVDcbsvwka_bnC', secondaryUsersId: 1, startDate: '10/27/2019', endDate: '10/27/2019', startTime: '1800', endTime: '2000', description: 'Farewell Potluck Dinner. Men bring sides. Women bring dessert. Roast turkey will be provided.'},
      ]);
    });
};

