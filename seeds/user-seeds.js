const { User } = require('../models');

const userData = [
  {
    username: 'test1',
    password: 'test4'
    
  },
  {
    username: 'test2',
    password: 'test5'
  },
  {
    username: 'test3',
    password: 'test6'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;