import { createClient, RedisClientOptions } from 'redis';
require('dotenv').config();
const REDIS_URL = process.env.REDIS_URL;

const options: RedisClientOptions = {
	url: REDIS_URL,
};

export const getRedisClient = async () => {
	const client = createClient(options);
	await client.connect();
	return client;
};
