
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, eventName: 'Horse Shoes', vacationsId: 1, usersUid: 'vX1TpjhyrgMVQJuBQcBqgfxidvH3', secondaryUsersId: 2, startTimeDate: '10/24/2019', endTimeDate: '10/24/2019', description: 'Horseshoes Tournament - Sign Up Early'},
        {id: 2, eventName: 'Luau', vacationsId: 2, usersUid: 'vX1TpjhyrgMVQJuBQcBqgfxidvH3', secondaryUsersId: 3,  startTimeDate: '10/24/2019', endTimeDate: '10/24/2019', description: 'Roast Pig & Limbo! Bring your grass skirts!'},
        {id: 3, eventName: 'Potluck Dinner', vacationsId: 1, usersUid: '5XVDcbsvwka_bnC', secondaryUsersId: 1,  startTimeDate: '10/24/2019', endTimeDate: '10/24/2019', description: 'Farewell Potluck Dinner. Men bring sides. Women bring dessert. Roast turkey will be provided.'},
      ]);
    });
};

