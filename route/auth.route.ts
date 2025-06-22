import express from 'express';
import { getAdminToken } from '../controller/auth.controller';

const router = express.Router();

router.post('/GetTokenAdmin', getAdminToken);

export default router;
