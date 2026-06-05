import { Request, Response } from 'express';
import * as qnsController from '../../../controller/qns.controller';
import Data from '../../../Model/pattern.model';

const mockSave = jest.fn();

type MockedModel = {
  (...args: any[]): {
    save: jest.Mock;
  };

  aggregate: jest.Mock;
  find: jest.Mock;
  findOne: jest.Mock;
  findOneAndUpdate: jest.Mock;
  findOneAndDelete: jest.Mock;
  deleteMany: jest.Mock;
};

jest.mock('../../../Model/pattern.model', () => {
  const mockModel = jest.fn(() => ({
    save: mockSave,
  })) as unknown as MockedModel;

  mockModel.aggregate = jest.fn();
  mockModel.find = jest.fn();
  mockModel.findOne = jest.fn();
  mockModel.findOneAndUpdate = jest.fn();
  mockModel.findOneAndDelete = jest.fn();
  mockModel.deleteMany = jest.fn();

  return {
    __esModule: true,
    default: mockModel,
  };
});

const MockedData = Data as unknown as MockedModel;

const mockRes = () => {
  const json = jest.fn();

  const status = jest.fn(() => ({
    json,
  }));

  return {
    status,
    json,
  };
};

describe('qns.controller full coverage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getRandomQuestion → 200', async () => {
    MockedData.aggregate.mockResolvedValue([{ _id: 1 }]);

    const res = mockRes() as unknown as Response;

    await qnsController.getRandomQuestion({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getRandomQuestion → 500', async () => {
    MockedData.aggregate.mockRejectedValue(new Error());

    const res = mockRes() as unknown as Response;

    await qnsController.getRandomQuestion({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('getQuestionsBySeries → 200', async () => {
    MockedData.find.mockReturnValueOnce({
      limit: jest.fn().mockResolvedValue([{}]),
    });

    const req = {
      params: { series: 'DBZ' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.getQuestionsBySeries(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getQuestionsBySeries → 404', async () => {
    MockedData.find.mockReturnValueOnce({
      limit: jest.fn().mockResolvedValue(null),
    });

    const req = {
      params: { series: 'XYZ' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.getQuestionsBySeries(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('getQuestionsBySeries → 500', async () => {
    MockedData.find.mockReturnValueOnce({
      limit: jest.fn().mockRejectedValue(new Error()),
    });

    const req = {
      params: { series: 'DBZ' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.getQuestionsBySeries(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('getQuestionById → 200', async () => {
    MockedData.findOne.mockResolvedValue({
      _id: 1,
    });

    const req = {
      params: { id: '1' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.getQuestionById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getQuestionById → 404', async () => {
    MockedData.findOne.mockResolvedValue(null);

    const req = {
      params: { id: '999' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.getQuestionById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('getQuestionById → 500', async () => {
    MockedData.findOne.mockRejectedValue(new Error());

    const req = {
      params: { id: '1' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.getQuestionById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('addQuestion → 201 (no prev)', async () => {
    MockedData.findOne.mockReturnValueOnce({
      sort: jest.fn().mockResolvedValue(null),
    });

    mockSave.mockResolvedValue(true);

    const req = {
      body: {
        series: 'DBZ',
        question: 'Q?',
        answer: 'A',
      },
    } as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.addQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('addQuestion → 201 (has prev)', async () => {
    MockedData.findOne.mockReturnValueOnce({
      sort: jest.fn().mockResolvedValue({ _id: 5 }),
    });

    mockSave.mockResolvedValue(true);

    const req = {
      body: {
        series: 'GT',
        question: 'Q?',
        answer: 'A',
      },
    } as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.addQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('addQuestion → 500', async () => {
    MockedData.findOne.mockReturnValueOnce({
      sort: jest.fn().mockRejectedValue(new Error()),
    });

    const req = {
      body: {},
    } as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.addQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('updateQuestion → 200', async () => {
    MockedData.findOneAndUpdate.mockResolvedValue({
      _id: 1,
    });

    const req = {
      params: { id: '1' },
      body: {},
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.updateQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('updateQuestion → 404', async () => {
    MockedData.findOneAndUpdate.mockResolvedValue(null);

    const req = {
      params: { id: '999' },
      body: {},
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.updateQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('updateQuestion → 500', async () => {
    MockedData.findOneAndUpdate.mockRejectedValue(new Error());

    const req = {
      params: { id: '1' },
      body: {},
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.updateQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('patchQuestion → 200', async () => {
    MockedData.findOneAndUpdate.mockResolvedValue({
      _id: 1,
    });

    const req = {
      params: { id: '1' },
      body: {},
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.patchQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('patchQuestion → 404', async () => {
    MockedData.findOneAndUpdate.mockResolvedValue(null);

    const req = {
      params: { id: '999' },
      body: {},
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.patchQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('patchQuestion → 500', async () => {
    MockedData.findOneAndUpdate.mockRejectedValue(new Error());

    const req = {
      params: { id: '1' },
      body: {},
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.patchQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('deleteQuestion → 200', async () => {
    MockedData.findOneAndDelete.mockResolvedValue({
      _id: 1,
    });

    const req = {
      params: { id: '1' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.deleteQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deleteQuestion → 404', async () => {
    MockedData.findOneAndDelete.mockResolvedValue(null);

    const req = {
      params: { id: '999' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.deleteQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('deleteQuestion → 500', async () => {
    MockedData.findOneAndDelete.mockRejectedValue(new Error());

    const req = {
      params: { id: '1' },
    } as unknown as Request;

    const res = mockRes() as unknown as Response;

    await qnsController.deleteQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('resetAllQuestions → 200', async () => {
    MockedData.deleteMany.mockResolvedValue({
      deletedCount: 10,
    });

    const res = mockRes() as unknown as Response;

    await qnsController.resetAllQuestions({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('resetAllQuestions → 500', async () => {
    MockedData.deleteMany.mockRejectedValue(new Error());

    const res = mockRes() as unknown as Response;

    await qnsController.resetAllQuestions({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});