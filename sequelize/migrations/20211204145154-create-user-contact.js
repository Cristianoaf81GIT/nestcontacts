'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserContacts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'User',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },

      contactId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Contact',
            schema: 'schema',
          },
          key: 'id',
        },
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
    return queryInterface.dropTable('UserContacts');
  },
};
