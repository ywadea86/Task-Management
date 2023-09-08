'use strict';
const bcrypt = require('bcrypt'); // You may need to install this package

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample user data
    const users = [
      {
        username: 'user1',
        email:"user1@user.com",
        password: await bcrypt.hash('password1', 8), // Hash the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user2',
        email:"user2@user.com",
        password: await bcrypt.hash('password2', 8), // Hash the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more users as needed
    ];

    // Insert the sample data into the 'Users' table
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data when rolling back the seed
    await queryInterface.bulkDelete('Users', null, {});
  },
};
