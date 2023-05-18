const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const CommentData = require('./commentData.json');
const UserData = require('./userData.json');
const PostData = require('./postData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(UserData, {
    individualHooks: true,
    returning: true,
  });

  const postSeed = await Post.bulkCreate(PostData);
  const commentSeed = await Comment.bulkCreate(CommentData);

  process.exit(0);
};

seedAll();