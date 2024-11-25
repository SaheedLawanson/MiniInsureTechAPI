'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plans', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      price_sold: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('policies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      policy_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      plan_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "plans",
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      activated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('policies', ['user_id'], {
      name: 'idx_policies_user_id'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('policies');
    await queryInterface.dropTable('plans');
  }
};
