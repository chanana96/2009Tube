import { createClient } from 'redis';

export const getRedisClient = async () => {
	const client = createClient();
	await client.connect();
	return client;
};
