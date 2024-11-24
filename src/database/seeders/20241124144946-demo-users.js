'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          first_name: 'saheed',
          last_name: 'lawanson',
          email: 'saheedlawanson47@gmail.com',
          type: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          first_name: 'john',
          last_name: 'dutton',
          email: 'johndutton@yellowstone.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          first_name: 'oakley',
          last_name: 'caesar-su',
          email: 'centralcee@gmail.co.uk',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          first_name: 'donald',
          last_name: 'trump',
          email: 'donaldtrump@whitehouse.gov',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
