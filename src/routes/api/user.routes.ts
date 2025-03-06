import { Router } from 'express';
import * as controllers from '../../controllers/user.controllers';
import authenticationMiddleware from '../../middlewares/authentication.middleware';

const routes = Router();
// api/users
routes.route('/').post(controllers.create);
routes.route('/').get(authenticationMiddleware, controllers.getMany);
routes.route('/:id').get(authenticationMiddleware, controllers.getOne);
routes.route('/:id').patch(authenticationMiddleware, controllers.updateOne);
routes.route('/:id').delete(authenticationMiddleware, controllers.deleteOne);
// authentication
// eslint-disable-next-line @typescript-eslint/no-explicit-any
routes.route('/authenticate').post(controllers.authenticate as any); //+

export default routes;
