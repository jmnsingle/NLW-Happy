import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanageController from './controllers/OrphanagesController';

const orphanageController = new OrphanageController();

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', orphanageController.index);
routes.get('/orphanages/:orphanage_id', orphanageController.show);
routes.post('/orphanages', upload.array('images') ,orphanageController.create);

export default routes;