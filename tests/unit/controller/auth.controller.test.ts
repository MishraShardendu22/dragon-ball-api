import { Request, Response } from 'express';
import { getAdminToken as getTokenAdmin } from "../../../controller/auth.controller"

describe('getTokenAdmin', () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = { ...OLD_ENV };
    process.env.ADMIN_USERNAME = 'admin';
    process.env.ADMIN_PASSWORD = 'admin123';
    process.env.JWT_SECRET = 'testsecret';
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return token for valid credentials', () => {
    const req = {
      body: { username: 'admin', password: 'admin123' }
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    getTokenAdmin(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json.mock.calls[0][0]).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', () => {
    const req = {
      body: { username: 'wrong', password: 'wrong' }
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    getTokenAdmin(req, res);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });
});
