'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA || 'thanks_togar';  
 } //else {
//   options.schema = 'thanks_togar'; // Default schema for non-production environments
// }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${options.schema};`);
    }

    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
    }, { schema: options.schema });
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
    }, { schema: options.schema });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'firstName', { schema: options.schema });
    await queryInterface.removeColumn('Users', 'lastName', { schema: options.schema });

    options.tableName = "Users";
    return queryInterface.dropTable(options);
  }
};
