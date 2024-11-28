import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';

export const generateThumbnailBuffer = async (fileBuffer: Buffer) => {
  const tempPath = path.join(os.tmpdir(), `temp-${Date.now()}`);
  try {
    await fs.promises.writeFile(tempPath, fileBuffer);
    
    return new Promise<Buffer>((resolve, reject) => {
      ffmpeg(tempPath)
        .screenshots({
          timestamps: [1],
          filename: 'thumbnail.jpg',
          folder: os.tmpdir(),
          size: '320x192'
        })
        .on('end', async () => {
          const thumbPath = path.join(os.tmpdir(), 'thumbnail.jpg');
          const thumbnail = await fs.promises.readFile(thumbPath);
          await fs.promises.unlink(thumbPath);
          await fs.promises.unlink(tempPath);
          resolve(thumbnail);
        })
        .on('error', reject);
    });
  } catch (err) {
    await fs.promises.unlink(tempPath).catch(() => {});
    throw err;
  }
};