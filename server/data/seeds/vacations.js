
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vacations').del()
    .then(function () {
      // Inserts seed entries
      return knex('vacations').insert([
        {id: 1, title: 'Winter', startDate: '10/24/2019', endDate: '10/28/2019', uid: '5XVDcbsvwka_bnC'},
        {id: 2, title: 'Summer', startDate: '11/24/2019', endDate: '11/28/2019', uid: '5XVDhhsvwka_bnC'},
        {id: 3, title: 'Spring', startDate: '12/24/2019', endDate: '12/28/2019', uid: '5XVkkbsvwka_bnC'}     
      ]);
    });
};3 