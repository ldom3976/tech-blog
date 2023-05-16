const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');

// GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 
        'title',
        'content',
        'created_at'
        ],
        order: [['created_at', 'DESC']], 
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
        }
     }
]
});

.then(dbPostData => res.json(dbPostData.reverse()))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});
