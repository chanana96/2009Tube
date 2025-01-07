import { Router } from 'express';
import {
	registerUser,
	loginUser,
	isUser,
	logoutUser,
	uploadAvatar,
	uploadVideo,
	uploadVideoGetId,
	progressReport,
} from '@/controllers/auth_controller';
import { upload } from '../config/multer_config';
import { submitRatingForVideo, submitCommentForVideo } from '../controllers/watch_controller';
import { isUserSignedIn } from '../middleware/auth_middleware';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

// authRouter.post('/update');

authRouter.get('/me', isUserSignedIn, isUser);

authRouter.post('/avatar/:username', upload.single('avatar'), uploadAvatar);

authRouter.post('/progress', progressReport);
authRouter.get('/upload/:useruuid', uploadVideoGetId);
authRouter.post('/upload/:useruuid', upload.single('video'), uploadVideo);

authRouter.post('/submit/rating/:video_id', submitRatingForVideo);
authRouter.post('/submit/comment/:video_id', submitCommentForVideo);

export default authRouter;
