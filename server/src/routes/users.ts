import { Router } from 'express';

import * as controllers from '../controllers/users';
import { auth }         from '../middlewares';

const routes = Router();

routes.get( '', auth, controllers.getUsers );

routes.get( '/:id', controllers.getUser );

export default routes;
