import { getRedisClient } from '../config/redis_config';
import type { RedisClientType } from 'redis';
import {io} from '../app';

export const progressReport = async (req: Request, res: Response) => {
	let video_id = 'key';
	
	const redis = await getRedisClient();

	const interval = setInterval(async () => {
		const progress = await redis.get(video_id);
		if (progress) {
		  io.emit(video_id, progress); 
		}
	  }, 1000);
  
	 setTimeout(() => {
		clearInterval(interval)
	 }, 20000);
};
