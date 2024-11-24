'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'product_categories',
      [
        {
          id: 1,
          name: 'health',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'auto',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    );
    await queryInterface.bulkInsert(
      'products',
      [
        {
          id: 1,
          name: 'optimal care mini',
          category_id: 1,
          price: 10000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'optimal care standard',
          category_id: 1,
          price: 20000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'third-party',
          category_id: 2,
          price: 5000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'comprehensive',
          category_id: 2,
          price: 15000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('product_categories', null, {});
  }
};
