'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },

      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Users');
  },
};
