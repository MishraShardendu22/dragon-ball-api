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

/**
 * @openapi
 * /random:
 *   get:
 *     summary: Get a random question
 *     responses:
 *       200:
 *         description: A random question object
 */
router.get('/random', getRandomQuestion);

/**
 * @openapi
 * /question/{id}:
 *   get:
 *     summary: Get a question by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A specific question object
 */
router.get('/question/:id', getQuestionById);

/**
 * @openapi
 * /series/{series}:
 *   get:
 *     summary: Get questions by series
 *     parameters:
 *       - name: series
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of questions
 */
router.get('/series/:series', getQuestionsBySeries);

/**
 * @openapi
 * /add:
 *   post:
 *     summary: Add a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               series:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created
 */
router.post('/add', addQuestion);

/**
 * @openapi
 * /question/{id}:
 *   put:
 *     summary: Fully update a question by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               series:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated question
 */
router.put('/question/:id', updateQuestion);

/**
 * @openapi
 * /question/{id}:
 *   patch:
 *     summary: Partially update a question by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Partially updated
 */
router.patch('/question/:id', patchQuestion);

/**
 * @openapi
 * /question/{id}:
 *   delete:
 *     summary: Delete a question by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 */
router.delete('/question/:id', verifyToken, deleteQuestion);

/**
 * @openapi
 * /delete:
 *   delete:
 *     summary: Delete all questions (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: All questions deleted
 */
router.delete('/delete', verifyToken, resetAllQuestions);

export default router;
