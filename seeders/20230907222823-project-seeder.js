'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const projects = [
      {
        name: 'Project 1',
        description: 'This is the first project.',
        userId: 1, // Replace with the actual user ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project 2',
        description: 'This is the second project.',
        userId: 2, // Replace with the actual user ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more projects as needed
    ];

    // Insert the sample data into the 'Projects' table
    await queryInterface.bulkInsert('projects', projects, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Project', null, {});

  }

};
