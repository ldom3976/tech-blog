const { Post } = require('../models');

const postData = [
  {
    title: 'testtitle',
    content: 'testcontent',
    user_id: 1
    
  },
  {
    title: 'testtitle1',
    content: 'testcontent1',
    user_id: 2
  },
  {
    title: 'testtitle2',
    content: 'testcontent2',
    user_id: 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;