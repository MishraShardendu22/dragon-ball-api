import mongoose from 'mongoose';
import dbConnect  from "../../dbConnect/dbConnect"

describe('Database Integration Test', () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to MongoDB successfully', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });
});
