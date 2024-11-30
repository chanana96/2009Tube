import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { s3 } from './s3_config';
import { promisify } from 'util';

require('dotenv').config();
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const ffmpegProcess = async (inputPath: string, filename: string) => {
	return new Promise<void>((resolve, reject) => {
		ffmpeg(path.join(inputPath, filename))
			.outputOptions([
				'-c copy',
				'-f hls',
				'-hls_time 10',
				'-hls_playlist_type vod',
				`-hls_segment_filename ${inputPath}\\%03d.ts`,
				'-hls_list_size 0',
			])
			.output(path.join(inputPath, 'playlist.m3u8'))
			.on('end', () => resolve())
			.on('error', reject)
			.run();
	});
};

const generateThumbnailBuffer = (inputPath: string, filename: string) => {
	return new Promise<void>((resolve, reject) => {
		ffmpeg(path.join(inputPath, filename))
			.screenshots({
				timestamps: ['50%'],
				filename: 'thumbnail.jpg',
				folder: inputPath,
				size: '320x240',
			})
			.on('end', () => resolve())
			.on('error', reject);
	});
};

export const segmentForHls = async (inputPath: string, filename: string, video_uuid: string) => {
	try {
		const readdirAsync = promisify(fs.readdir);

		await ffmpegProcess(inputPath, filename);
		await generateThumbnailBuffer(inputPath, filename);

		await fs.promises.unlink(path.join(inputPath, filename));
		const files = await readdirAsync(inputPath);

		for (const file of files) {
			const filePath = path.join(inputPath, file);
			const s3Key = `Videos/${video_uuid}/${file}`;

			try {
				const fileStream = fs.createReadStream(filePath);
				await s3.putObject({
					Bucket: BUCKET_NAME,
					Key: s3Key,
					Body: fileStream,
					ACL: 'public-read',
					ContentType:
						file.endsWith('.m3u8') ? 'application/vnd.apple.mpegurl'
						: file.endsWith('.ts') ? 'video/MP2T'
						: file.endsWith('.jpg') ? 'image/jpeg'
						: undefined,
				});
			} catch (uploadErr) {
				console.error(`failed to upload ${file}: ${uploadErr.message}`);
			}
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};
