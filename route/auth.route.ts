import express from 'express';
import { getAdminToken } from '../controller/auth.controller';

const router = express.Router();

/**
 * @openapi
 * /GetTokenAdmin:
 *   post:
 *     summary: Get admin JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post('/GetTokenAdmin', getAdminToken);

export default router;
