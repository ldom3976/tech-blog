const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all users

router.get('/', async (req, res) => {
try {
   const userData = await User.findAll({
        attributes: { exclude: ['[password']}
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET user by id

router.get('/:id', async (req, res) => {
try {
    const userData = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_body', 'created_at'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment_body', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            },
          },
        ],
    });
    if (!userData) {
        res.status(404).json({ message: 'No user found with this id.' });
        return;
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
try {
   const newUser = await User.create({
        username: req.body.username,
        password: req.body.password
    });

    req.session.save(() => {
        req.session.userId = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;
  
        res.json(newUser);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

    router.post('/login', async (req, res) => {
    try {
       const user = await User.findOne({
            where: {
                username: req.body.username
            },
        });
        if (!user) {
                res.status(400).json({ message: 'No user with that username.'});
                return;
            }
            
            const validPassword = user.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password.' });
                return;
            }

            req.session.save(() => {
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.loggedIn = true;
          
                res.json({ user, message: 'Successfully logged in.' });
            });

        } catch (err) {
            res.status(400).json({ message: 'No user found.' });
          }
        });

    //log out

    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });

    module.exports = router;