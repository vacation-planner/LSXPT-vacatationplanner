
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vacations').del()
    .then(function () {
      // Inserts seed entries
      return knex('vacations').insert([
        {id: 1, title: 'Winter', location: 'Port Lavaca, TX', startDate: '10/24/2019', endDate: '10/28/2019', usersUid: 'vX1TpjhyrgMVQJuBQcBqgfxidvH3',},
        {id: 2, title: 'Summer', location: 'Kitty Hawk, NC', startDate: '11/24/2019', endDate: '11/28/2019', usersUid: '5XVDhhsvwka_bnC',},
        {id: 3, title: 'Spring', location: 'Ypsilanti, MI', startDate: '12/24/2020', endDate: '12/28/2020', usersUid: 'vX1TpjhyrgMVQJuBQcBqgfxidvH3',}     
      ]);
    });
};3 