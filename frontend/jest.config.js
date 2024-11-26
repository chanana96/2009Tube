module.exports = {
	preset: 'react-native',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
};
