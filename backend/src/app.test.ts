import request from 'supertest';
import app from './app';

describe('Basic API Tests', () => {
  
  test('GET / should respond with 404', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(404);
  });

  test('GET /auth should return status 200', async () => {
  const response = await request(app).get('/auth');
  expect(response.status).toBe(200);
  });

  test('Health check', async () => {
  const response = await request(app).get('/health');
  expect(response.status).toBe(200);
  });

});