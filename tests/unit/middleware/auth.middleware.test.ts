import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken as authMiddleware } from '../../../middleware/auth.middleware';

jest.mock('jsonwebtoken');

const mockReq = (token?: string): Request => ({
  headers: {
    authorization: token ? `Bearer ${token}` : undefined,
  },
}) as Request;

describe('authMiddleware', () => {
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no token', () => {
    const req = mockReq();
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
  });

  it('should return 400 if token invalid', () => {
    (jwt.verify as jest.Mock).mockImplementation((_token, _secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    const req = mockReq('invalid.token');
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
  });

  it('should call next if token valid', () => {
    const userPayload = { id: '123', name: 'Goku' };
    (jwt.verify as jest.Mock).mockImplementation((_token, _secret, callback) => {
      callback(null, userPayload);
    });

    const req = mockReq('valid.token') as Request & { user?: any };
    authMiddleware(req, res, next);

    expect(req.user).toEqual(userPayload);
    expect(next).toHaveBeenCalled();
  });
});
