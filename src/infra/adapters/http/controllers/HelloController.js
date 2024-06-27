const CreateHelloUseCase = require('../../../../application/useCases/CreateHelloUseCase');
const HelloRepositoryImpl = require('../../implementations/repository/HelloRepositoryImpl');
const Hello = require('../../../../domain/entities/Hello');
const AppError = require('../../../../shared/errors/AppError');

class HelloController {
  static async createHello(req, res, next) {
    try {
      const { helloText } = req.body;

      if (!helloText) {
        throw new AppError('helloText is required', 400);
      }

      const helloRepository = new HelloRepositoryImpl();
      const createHelloUseCase = new CreateHelloUseCase(helloRepository);

      const hello = new Hello({ helloText });
      const result = await createHelloUseCase.execute(hello);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HelloController;