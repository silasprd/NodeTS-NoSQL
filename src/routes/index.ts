import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);
router.post('/new-user', HomeController.addUserAction);
router.get('/user/:id/addage', HomeController.addAgeAction);
router.get('/user/:id/decrementage', HomeController.decrementAgeAction);
router.get('/user/:id/remove', HomeController.removeUserAction);


router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

export default router;