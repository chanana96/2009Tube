import { S3 } from '@aws-sdk/client-s3';

require('dotenv').config();

const ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const SECRET_KEY = process.env.AWS_SECRET_KEY;
const REGION = process.env.AWS_REGION;

export const s3 = new S3({
	region: REGION,
	credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});
