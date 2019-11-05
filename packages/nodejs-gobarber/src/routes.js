import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentsController from './app/controllers/AppointmentsController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// User and Sessions
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware of authentication
routes.use(authMiddleware);

// Create data
routes.post('/appointments', AppointmentsController.store);
routes.post('/files', upload.single('file'), FileController.store);

// Update data
routes.put('/users', UserController.update);
routes.put('/notifications/:id', NotificationController.update);

// Fetch data
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);
routes.get('/appointments', AppointmentsController.index);
routes.get('/schedules', ScheduleController.index);
routes.get('/notifications', NotificationController.index);

// Delete data
routes.delete('/appointments/:id', AppointmentsController.delete);

export default routes;
