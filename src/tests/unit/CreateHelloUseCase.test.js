const CreateHelloUseCase = require('../../application/use-cases/CreateHelloUseCase');
const HelloRepository = require('../../domain/repositories/HelloRepository');
const Hello = require('../../domain/entities/Hello');

describe('CreateHelloUseCase', () => {
  it('should create a hello and return the saved hello', async () => {
    const helloRepository = new HelloRepository();
    helloRepository.save = jest.fn().mockResolvedValue({ helloText: 'Hello, World!', createdAt: new Date().toISOString() });

    const createHelloUseCase = new CreateHelloUseCase(helloRepository);
    const hello = new Hello({ helloText: 'Hello, World!' });

    const result = await createHelloUseCase.execute(hello);

    expect(result).toHaveProperty('helloText', 'Hello, World!');
    expect(helloRepository.save).toHaveBeenCalledWith(hello);
  });
});
