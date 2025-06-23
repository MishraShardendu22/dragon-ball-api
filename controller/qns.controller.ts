import { Request, Response } from 'express';
import Data from '../Model/pattern.model';

export const getRandomQuestion = async (req: Request, res: Response) => {
  try {
    const randomData = await Data.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(randomData[0]);
  } catch (error) {
    console.error('Error in getRandomQuestion:', error);
    res.status(500).json({ message: 'Failed to find a random question' });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Data.findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ message: `No question with such ID. The given ID is ${id > 0 ? "too big" : "too small"}` });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getQuestionById:', error);
    res.status(500).json({ message: 'Failed to find a question by ID' });
  }
};

export const getQuestionsBySeries = async (req: Request, res: Response) => {
  try {
    const seriesName = req.params.series;
    const data = await Data.find({ series: seriesName }).limit(5);

    if (!data) {
      return res.status(404).json({ message: 'No such series exists' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getQuestionsBySeries:', error);
    res.status(500).json({ message: 'Failed to find a question by series' });
  }
};

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const maxIdDoc = await Data.findOne().sort({ _id: -1 });
    const maxId = maxIdDoc ? maxIdDoc._id + 1 : 1;

    const newData = new Data({
      _id: maxId,
      series: data.series,
      question: data.question,
      answer: data.answer
    });

    await newData.save();
    res.status(201).json({ message: 'Question added successfully', newData });
  } catch (error) {
    console.error('Error in addQuestion:', error);
    res.status(500).json({ message: 'Failed to add a question' });
  }
};
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const updatedData = await Data.findOneAndUpdate(
      { _id: id },
      {
        series: data.series,
        question: data.question,
        answer: data.answer
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', updatedData });
  } catch (error) {
    console.error('Error in updateQuestion:', error);
    res.status(500).json({ message: 'Failed to update the question' });
  }
};

export const patchQuestion = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { series, question, answer } = req.body;

    const updatedQuestion = await Data.findOneAndUpdate(
      { _id: id },
      { series, question, answer },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
  } catch (error) {
    console.error('Error in patchQuestion:', error);
    res.status(500).json({ message: 'Failed to update the question' });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await Data.findOneAndDelete({ _id: parseInt(id) });

    if (!deleted) {
      return res.status(404).json({ message: 'No such question exists' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error in deleteQuestion:', error);
    res.status(500).json({ message: 'Failed to delete the question' });
  }
};

export const resetAllQuestions = async (req: Request, res: Response) => {
  try {
    const result = await Data.deleteMany({});
    res.status(200).json({ message: 'Data reset to default state', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error in resetAllQuestions:', error);
    res.status(500).json({ message: 'Failed to reset data' });
  }
};
