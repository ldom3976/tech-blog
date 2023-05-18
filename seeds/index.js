const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('database synced');
    await seedUsers();
    console.log('users seeded');
    await seedPosts();
    console.log('posts seeded');
    await seedComments();
    console.log('comments seeded');
  
  
    process.exit(0);
  };
  
  seedAll();