
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, eventName: 'jetski', vacationsId: 1, usersUid: 'vX1TpjhyrgMVQJuBQcBqgfxidvH3', secondaryUsersId: 2, startDateTime: '10/24/2019', endDateTime: '10/24/2019', description: 'jetsking', cost: 25.99},
        {id: 2, eventName: 'Luau', vacationsId: 2, usersUid: 'vX1TpjhyrgMVQJuBQcBqgfxidvH3', secondaryUsersId: 3,  startDateTime: '10/24/2019', endDateTime: '10/24/2019', description: 'Roast Pig & Limbo! Bring your grass skirts!', cost: 125.00},
        {id: 3, eventName: 'Potluck Dinner', vacationsId: 1, usersUid: '5XVDcbsvwka_bnC', secondaryUsersId: 1,  startDateTime: '10/24/2019', endDateTime: '10/24/2019', description: 'Farewell Potluck Dinner. Men bring sides. Women bring dessert. Roast turkey will be provided.', cost: 50.00},
      ]);
    });
};

