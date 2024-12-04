// @ts-nocheck
const { progressReport } = require('./testSetup');
const { io } = require('../app');
const { getRedisClient } = require('../config/redis_config');
jest.useFakeTimers();
jest.mock('../app', () => ({
	io: {
	  emit: jest.fn()
	}
  }));

  const mockRedis = {
    get: jest.fn(),
};

jest.mock('../config/redis_config', () => ({
    getRedisClient: jest.fn(() => mockRedis),
}));

describe('progressReport', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockRedis.get.mockResolvedValue('50');
    });

    test('should emit progress at intervals', async () => {
        const mockReq = { params: { video_id: 'key' } };
        const mockRes = { json: jest.fn() };

		mockRedis.get
        .mockResolvedValueOnce('25')
        .mockResolvedValueOnce('50')
        .mockResolvedValueOnce('75')
        .mockResolvedValueOnce('100');


        await progressReport(mockReq as any, mockRes as any);
        await jest.advanceTimersByTime(4000);

		io.emit.mock.calls.forEach((call, index) => {
			console.log(`Emission ${index + 1}:`, {
				event: call[0],
				data: call[1],
				timestamp: new Date().toISOString()
			});
		});
	
         expect(io.emit).toHaveBeenNthCalledWith(1, 'key', '25');
    expect(io.emit).toHaveBeenNthCalledWith(2, 'key', '50');
    expect(io.emit).toHaveBeenNthCalledWith(3, 'key', '75');
    expect(io.emit).toHaveBeenNthCalledWith(4, 'key', '100');

        await jest.advanceTimersByTime(20000);
        const previousCallCount = io.emit.mock.calls.length;
        await jest.advanceTimersByTime(1000);
        expect(io.emit).toHaveBeenCalledTimes(previousCallCount);
    });
});