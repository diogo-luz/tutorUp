import { Router } from 'express';
import authMiddleware from './middlewares/auth';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';
import FavoritesController from './controllers/FavoritesController';
import PasswordController from './controllers/PasswordController';

const routes = Router();
const classesController = new ClassesController();
const connectionController = new ConnectionsController();
const sessionController = new SessionController();
const userController = new UserController();
const favController = new FavoritesController();
const passwordController = new PasswordController();

routes.post('/sessions', sessionController.store);
routes.post('/users', userController.store);

routes.post('/reset-password', passwordController.reset);
routes.get('/recover-password/:token', passwordController.check);
routes.patch('/recover-password', passwordController.recover);

routes.use(authMiddleware);

routes.post('/classes', classesController.store);
routes.put('/classes', classesController.update);
routes.get('/classes', classesController.index);
routes.get('/classes/:class_id', classesController.show);

routes.post('/connections', connectionController.store);
routes.get('/connections', connectionController.index);

routes.put('/users', userController.update);
routes.get('/users', userController.show);

routes.get('/favorites', favController.index);
routes.post('/favorites', favController.store);
routes.delete('/favorites/:class_id', favController.delete);

export default routes;
