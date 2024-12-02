import { Router } from 'express';
import { queryProfile, queryVideo, queryVideoFeed } from '../controllers/query_controller';

const queryRouter = Router();

queryRouter.get('/profile/:username', queryProfile);
queryRouter.get('/video/feed', queryVideoFeed);

queryRouter.get('/video/:video_id', queryVideo); // needs to be below the feed route to avoid conflict due to the feed route being a prefix of the video route

export default queryRouter;
