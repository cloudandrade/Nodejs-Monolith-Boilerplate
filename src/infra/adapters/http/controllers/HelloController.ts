import { Request, Response, NextFunction } from 'express';
import CreateHelloUseCase from '../../../../application/useCases/CreateHelloUseCase';
import HelloRepositoryImpl from '../../../adapters/implementations/repository/HelloRepositoryImpl';
import { Hello } from '../../../../domain/entities/Hello';
import AppError from '../../../../shared/errors/AppError';
import logger from '../../../../shared/utils/logger';

class HelloController {
  static async createHello(req: Request, res: Response, next: NextFunction) {
    try {
      const { helloText } = req.body;

      if (!helloText) {
        throw new AppError('helloText is required', 400);
      }

      const helloRepository = new HelloRepositoryImpl();
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