import { Router } from 'express';

import * as controllers from '../controllers/auth';
import { auth, upload } from '../middlewares';

const routes = Router();

routes.post( '/signup', upload.single( 'profileImage' ), controllers.createUser );

routes.post( '/login', controllers.loginUser );

routes.post( '/verify-token', auth, controllers.verifyToken );

export default routes;
