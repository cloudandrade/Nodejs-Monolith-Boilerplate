import { Request, Response, NextFunction } from 'express';
import CreateHelloUseCase from '../../../../application/useCases/CreateHelloUseCase';
import HelloRepository from '../../../adapters/database/repository/HelloRepository';
import { Hello } from '../../../../domain/entity/Hello';
import AppError from '../../../../shared/errors/AppError';
import logger from '../../../../shared/utils/logger';

class HelloController {
  
  /**
 * @swagger
 * /hello:
 *   post:
 *     summary: Create a new hello message
 *     tags: [Hello]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - helloText
 *             properties:
 *               helloText:
 *                 type: string
 *                 example: Hello World
 *     responses:
 *       201:
 *         description: Hello message created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 helloText:
 *                   type: string
 *                   example: Hello World
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request
 */
  static async createHello(req: Request, res: Response, next: NextFunction) {
    try {
      const { helloText } = req.body;

      if (!helloText) {
        throw new AppError('helloText is required', 400);
      }

      const helloRepository = new HelloRepository();
      const createHelloUseCase = new CreateHelloUseCase(helloRepository);

      const hello = new Hello({ helloText });
      const result = await createHelloUseCase.execute(hello);

      logger.info(`Hello created with text: ${helloText}`);

      res.status(201).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Error creating hello: ${error.message}`);
        next(new AppError(error.message, 400));
      } else {
        logger.error('Unknown error');
        next(new AppError('Internal Server Error', 500));
      }
    }
  }
}

export default HelloController;