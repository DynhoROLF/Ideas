const express = require('express');

const UserController = require('./controllers/UsersController');
const IdeaController = require('./controllers/IdeasController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create); 

routes.get('/profile', ProfileController.index);

routes.get('/ideas', IdeaController.index);
routes.post('/ideas', IdeaController.create);
routes.delete('/ideas/:id', IdeaController.delete);

module.exports = routes;