import { Router } from 'express';
import { streamVideo } from '../controllers/stream_controller';

const streamRouter = Router();

streamRouter.get('/:videoId', streamVideo);

export default streamRouter;
