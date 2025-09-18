'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // First get admin role ID
    const [adminRole] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name='admin' LIMIT 1;`
    );

    const passwordHash = await bcrypt.hash('Admin@123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'Admin User',
        email: 'admin@example.com',
        password: passwordHash,
        role_id: adminRole[0].id,
        provider: null,
        provider_id: null,
        avatar: null,
        is_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  }
};
