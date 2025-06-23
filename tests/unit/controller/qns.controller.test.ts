import { Request, Response } from 'express';
import * as qnsController from '../../../controller/qns.controller';
import Data from '../../../Model/pattern.model';

jest.mock('../../../Dragon-Ball-Api/Model/pattern.model', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));


const mockRes = () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  return { status, json };
};

describe('qns.controller full coverage', () => {
  afterEach(() => jest.clearAllMocks());

  it('getRandomQuestion → 200', async () => {
    (Data.aggregate as jest.Mock).mockResolvedValue([{ _id: 1 }]);
    const res = mockRes() as unknown as Response;
    await qnsController.getRandomQuestion({} as Request, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getRandomQuestion → 500', async () => {
    (Data.aggregate as jest.Mock).mockRejectedValue(new Error());
    const res = mockRes() as unknown as Response;
    await qnsController.getRandomQuestion({} as Request, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('getQuestionsBySeries → 200', async () => {
    (Data.find as jest.Mock).mockReturnValueOnce({ limit: jest.fn().mockResolvedValue([{}]) });
    const req = { params: { series: 'DBZ' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.getQuestionsBySeries(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getQuestionsBySeries → 404', async () => {
    (Data.find as jest.Mock).mockReturnValueOnce({ limit: jest.fn().mockResolvedValue(null) });
    const req = { params: { series: 'X' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.getQuestionsBySeries(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('getQuestionsBySeries → 500', async () => {
    (Data.find as jest.Mock).mockRejectedValue(new Error());
    const req = { params: { series: 'DBZ' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.getQuestionsBySeries(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('getQuestionById → 200', async () => {
    (Data.findOne as jest.Mock).mockResolvedValue({ _id: 1 });
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.getQuestionById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getQuestionById → 404', async () => {
    (Data.findOne as jest.Mock).mockResolvedValue(null);
    const req = { params: { id: '999' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.getQuestionById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('getQuestionById → 500', async () => {
    (Data.findOne as jest.Mock).mockRejectedValue(new Error());
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.getQuestionById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('addQuestion → 201 (no prev)', async () => {
    (Data.findOne as jest.Mock).mockResolvedValue(null);
    const save = jest.fn().mockResolvedValue(true);
    (Data as unknown as jest.Mock).mockImplementation(() => ({ save }));
    const req = { body: { series: 'DBZ', question: 'Q?', answer: 'A' } } as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.addQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('addQuestion → 201 (has prev)', async () => {
    (Data.findOne as jest.Mock).mockResolvedValue({ _id: 5 });
    const save = jest.fn().mockResolvedValue(true);
    (Data as unknown as jest.Mock).mockImplementation(() => ({ save }));
    const req = { body: { series: 'GT', question: 'Q?', answer: 'A' } } as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.addQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('addQuestion → 500', async () => {
    (Data.findOne as jest.Mock).mockRejectedValue(new Error());
    const req = { body: {} } as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.addQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('updateQuestion → 200', async () => {
    (Data.findByIdAndUpdate as jest.Mock).mockResolvedValue({ _id: 1 });
    const req = { params: { id: '1' }, body: {} } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.updateQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('updateQuestion → 404', async () => {
    (Data.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    const req = { params: { id: '999' }, body: {} } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.updateQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('updateQuestion → 500', async () => {
    (Data.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error());
    const req = { params: { id: '1' }, body: {} } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.updateQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('patchQuestion → 200', async () => {
    (Data.findByIdAndUpdate as jest.Mock).mockResolvedValue({ _id: 1 });
    const req = { params: { id: '1' }, body: {} } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.patchQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('patchQuestion → 404', async () => {
    (Data.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    const req = { params: { id: '999' }, body: {} } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.patchQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('patchQuestion → 500', async () => {
    (Data.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error());
    const req = { params: { id: '1' }, body: {} } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.patchQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('deleteQuestion → 200', async () => {
    (Data.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: 1 });
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.deleteQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deleteQuestion → 404', async () => {
    (Data.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
    const req = { params: { id: '999' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.deleteQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('deleteQuestion → 500', async () => {
    (Data.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error());
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes() as unknown as Response;
    await qnsController.deleteQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('resetAllQuestions → 200', async () => {
    (Data.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: 10 });
    const res = mockRes() as unknown as Response;
    await qnsController.resetAllQuestions({} as Request, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('resetAllQuestions → 500', async () => {
    (Data.deleteMany as jest.Mock).mockRejectedValue(new Error());
    const res = mockRes() as unknown as Response;
    await qnsController.resetAllQuestions({} as Request, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
