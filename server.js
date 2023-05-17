const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');


const helpers = require('./utils/helpers');

//add handlebars
//const hbs = exphbs.create({helpers});

const SequelizeStore = require('connect-session-sequelize')(session.Store);

//session connection
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });

  //need to add helpers
  //need to figure out error in post routes
  //need to work on login/logout