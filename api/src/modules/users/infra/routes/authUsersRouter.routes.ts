import uploadConfig from '@config/uploadConfig';
import { Router } from 'express';
import multer from 'multer';
import AuthUsersController from '../controllers/AuthUsersController';

const upload = multer(uploadConfig.multer);

const authUsersController = new AuthUsersController();

const authUsersRouter = Router();

authUsersRouter.delete('/delete', authUsersController.delete);

authUsersRouter.put('/update', authUsersController.update);

authUsersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  authUsersController.updateAvatar,
);

authUsersRouter.get('/', authUsersController.showProfile);

export default authUsersRouter;
