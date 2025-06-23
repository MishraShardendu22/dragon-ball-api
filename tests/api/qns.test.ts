import app from '../../app';
import request from 'supertest';
import dbConnect from '../../dbConnect/dbConnect';

beforeAll(async () => {
  await dbConnect();
}, 20000);


describe('Dragon Ball API - Questions', () => {
  it('GET /random → 200 + valid question', async () => {
    const res = await request(app).get('/random');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('question');
  });

  it('GET /series/:series → 200 + list', async () => {
    const res = await request(app).get('/series/DBZ'); 
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /question/:id (invalid) → 500 or 404', async () => {
    const res = await request(app).get('/question/999999');
    expect([404, 500]).toContain(res.status);
  });

  it('POST /add → 201 Created', async () => {
    const payload = {
      series: 'DBGT',
      question: 'Who is the final villain in GT?',
      answer: 'Omega Shenron'
    };
    const res = await request(app).post('/add').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('newData');
    expect(res.body.newData.series).toBe(payload.series);
  });
});
