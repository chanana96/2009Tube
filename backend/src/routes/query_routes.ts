import { Router } from 'express';
import { queryProfile, queryVideo } from '../controllers/query_controller';

const queryRouter = Router();

queryRouter.get('/profile/:username', queryProfile);
queryRouter.get('/video/:video_id', queryVideo);

export default queryRouter;
