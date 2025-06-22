import express from 'express';
import {
  getRandomQuestion,
  getQuestionById,
  getQuestionsBySeries,
  addQuestion,
  updateQuestion,
  patchQuestion,
  deleteQuestion,
  resetAllQuestions
} from '../controller/qns.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/random', getRandomQuestion);
router.get('/question/:id', getQuestionById);
router.get('/series/:series', getQuestionsBySeries);
router.post('/add', addQuestion);
router.put('/question/:id', updateQuestion);
router.patch('/question/:id', patchQuestion);
router.delete('/question/:id', verifyToken, deleteQuestion);
router.delete('/delete', verifyToken, resetAllQuestions);

export default router;
