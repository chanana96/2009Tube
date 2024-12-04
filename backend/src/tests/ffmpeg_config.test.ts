// @ts-nocheck
import { jest } from '@jest/globals';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { ffmpegProcess } from '../config/ffmpeg_config';

jest.mock('fluent-ffmpeg');
jest.spyOn(console, 'log');

describe('FFMPEG Functions', () => {
  const mockInputPath = '/test/path';
  const mockFilename = 'test.mp4';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should log progress until completion', async () => {
    const mockOn = jest.fn().mockImplementation((event, callback) => {
      if (event === 'progress') {
        callback({ percent: 25 });
        callback({ percent: 50 });
        callback({ percent: 75 });
        callback({ percent: 100 });
      }
      if (event === 'end') callback();
      return { on: mockOn, run: jest.fn() };
    });

    (ffmpeg as jest.Mock).mockReturnValue({
      outputOptions: jest.fn().mockReturnThis(),
      output: jest.fn().mockReturnValue({ on: mockOn }),
    });

    await ffmpegProcess(mockInputPath, mockFilename);

    expect(console.log).toHaveBeenNthCalledWith(1, 'Processing: 25% done');
    expect(console.log).toHaveBeenNthCalledWith(2, 'Processing: 50% done');
    expect(console.log).toHaveBeenNthCalledWith(3, 'Processing: 75% done');
    expect(console.log).toHaveBeenNthCalledWith(4, 'Processing: 100% done');
  });
});