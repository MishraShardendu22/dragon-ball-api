import mongoose from 'mongoose';
import dbConnect from '../../dbConnect/dbConnect';

jest.mock('mongoose');

describe('dbConnect', () => {
  afterEach(() => jest.resetAllMocks());

  it('connects successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue(null);
    await expect(dbConnect()).resolves.toBeUndefined();
  });

  it('throws when MONGO_URI missing', async () => {
    delete process.env.MONGO_URI;
    await expect(dbConnect()).rejects.toThrow('MONGO_URI is not defined');
  });

  it('throws on connect failure', async () => {
    process.env.MONGO_URI = 'uri';
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error('fail'));
    await expect(dbConnect()).rejects.toThrow('fail');
  });
});
