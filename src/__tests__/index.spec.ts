import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test basic endpoints', () => {
  it('GET /', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('{"text":"Hello, World!"}');
  });
});
