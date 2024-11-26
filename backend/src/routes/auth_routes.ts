import { Router } from 'express';
import { registerUser, loginUser, isUser, logoutUser,uploadAvatar} from '../controllers/auth_controller';
import {upload} from '../config/multer_config'

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser)

authRouter.get('/me', isUser)

authRouter.post('/avatar/:username',upload.single('avatar'), uploadAvatar)

export default authRouter;