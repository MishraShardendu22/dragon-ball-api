import request from 'supertest';
import app from '../../app';
import dbConnect from '../../dbConnect/dbConnect';

beforeAll(async () => {
  await dbConnect();
}, 15000);

describe('API Tests', () => {
  it('GET /question/1 → should return a question or 404', async () => {
    const res = await request(app).get('/question/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /add → missing field should return 500', async () => {
    const res = await request(app).post('/add').send({
      series: 'GT',
      question: 'Who is the villain?'
      // missing answer
    });
    expect(res.status).toBe(500);
  });

  it('POST /add → valid request should return 201', async () => {
    const res = await request(app).post('/add').send({
      series: 'GT',
      question: 'Who is the villain?',
      answer: 'Baby'
    });
    expect(res.status).toBe(201);
  });
});
