import type { Request, Response } from 'express';
import { s3 } from '../config/s3_config';

require('dotenv').config();
import { Readable } from 'stream';
import type { GetObjectCommandOutput } from '@aws-sdk/client-s3';

const asStream = (response: GetObjectCommandOutput) => {
	return response.Body as Readable;
};

export const streamVideo = async (req: Request, res: Response): Promise<void> => {
	const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
	try {
		const video_id = req.params.videoId;
		const range = req.headers.range;

		if (!range) {
			res.status(400).send('Range header required');
			throw new Error('Range header required');
		}
		const headParams = { Bucket: BUCKET_NAME, Key: `Videos/${video_id}` };

		const headData = await s3.headObject(headParams);
		const fileSize = headData.ContentLength;

		const [start, end] = range.replace(/bytes=/, '').split('-');
		const startByte = parseInt(start, 10);
		const endByte = end ? parseInt(end, 10) : fileSize - 1;

		const streamParams = {
			Bucket: BUCKET_NAME,
			Key: `Videos/${video_id}`,
			Range: range,
		};

		const response = await s3.getObject(streamParams);

		const stream = asStream(response);
		stream.on('error', (error) => {
			console.error('Stream error:', error);
		});
		res.writeHead(206, {
			'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': endByte - startByte + 1,
			'Content-Type': 'video/mp4',
		});

		stream.pipe(res);
	} catch (err) {
		res.status(500).send('Streaming error occurred');
	}
};
