'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contacts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          min: 3,
        },
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
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
    return queryInterface.dropTable('Contacts');
  },
};
