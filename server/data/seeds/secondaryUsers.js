
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('secondaryUsers').del()
    .then(function () {
      // Inserts seed entries
     /*  return knex('secondaryUsers').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]); */
    });
};