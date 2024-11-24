'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'wallets',
      [
        {
          id: 1,
          balance: 1500000,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wallets', null, {});
  }
};
