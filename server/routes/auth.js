const routes = require('express').Router();

const controllers = require('../controllers/auth');
const { upload } = require('../middlewares');

routes.post( '/signup', upload.single( 'profileImage' ), controllers.createUser );

routes.post( '/login', controllers.loginUser );

module.exports = routes;
