import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { swaggerSpec } from './swagger';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import authRoutes from './route/auth.route';
import questionRoutes from './route/qns.route';

dotenv.config();

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Extend Request type for JWT
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use(
  '/',
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 120,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  })
);

app.get('/', (_req, res) => {
  res.send(
    'Welcome to the Dragon Ball API => Here is the Link to the Docs : https://shardendu-mishra-documentation-dragon-ball-api.vercel.app/'
  );
});

app.use('/', authRoutes);
app.use('/', questionRoutes);

export default app;
