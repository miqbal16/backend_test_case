import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

// Swagger config
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOption from './swagger.js';
const jsDoc = swaggerJsDoc(swaggerOption);

dotenv.config({ path: 'config.env' });

// Import error response
import ErrorResponse from './utils/ErrorResponse.js';

// Import error handler
import errorHandler from './middlewares/error.js';

// Import router
import bookRouter from './routes/book.route.js';
import memberRouter from './routes/member.route.js';

const app = express();

// Using Swagger
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(jsDoc));

// Using middlewares
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using router
app.use('/api/books', bookRouter);
app.use('/api/members', memberRouter);

app.use((req, res, next) => {
  const err = new ErrorResponse('Route not found', 404);
  next(err);
});

// Error handler
app.use(errorHandler);

export default app;
