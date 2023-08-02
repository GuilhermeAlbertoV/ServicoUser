import Express from 'express';
import ControllerUser from '../controller/ControllerUser';
import uploadMiddleware from '../middlewares/imageMidleware';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const routers = Express.Router();

routers.post('/cadastro', uploadMiddleware, ControllerUser.createUser);
routers.post('/login', ControllerUser.login);
routers.get('/list', tokenMiddleware.verifyToken, ControllerUser.listUser);

export default routers;
