import { Router } from 'express';
import { registerUser, loginUser, isUser, logoutUser} from '../controllers/auth_controller';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser)

authRouter.get('/me', isUser)


export default authRouter;