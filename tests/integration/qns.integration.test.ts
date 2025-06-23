import request from 'supertest';
import app from '../../app';
import dbConnect from '../../dbConnect/dbConnect';

let newId: number;
let adminToken: string;

beforeAll(async () => {
  await dbConnect();

  // Obtain admin token
  const loginRes = await request(app)
    .post('/GetTokenAdmin')
    .send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });
  if (loginRes.status !== 200 || !loginRes.body.token) {
    throw new Error('Failed to get admin token');
  }
  adminToken = loginRes.body.token;
});

describe('QnS API Integration', () => {
  it('POST /add → should create a new question', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        series: 'Z',
        question: 'What is Goku’s last form?',
        answer: 'Ultra Instinct'
      });
    expect(res.status).toBe(201);
    expect(res.body.newData).toBeDefined();
    // parse to number if needed
    newId = parseInt(res.body.newData._id);
  });

  it('GET /question/:id → should return created question', async () => {
    const res = await request(app).get(`/question/${newId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(newId);
  });

  it('DELETE /question/:id → cleanup with auth', async () => {
    const res = await request(app)
      .delete(`/question/${newId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    // successful delete should be 200
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Question deleted successfully');
  });
});
