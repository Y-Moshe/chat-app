const routes = require('express').Router();

const controllers = require('../controllers/auth');
const { auth, upload } = require('../middlewares');

routes.post( '/signup', upload.single( 'profileImage' ), controllers.createUser );

routes.post( '/login', controllers.loginUser );

routes.post( '/verify-token', auth, controllers.verifyToken );

module.exports = routes;
