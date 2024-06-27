import CreateHelloUseCase from '../../application/useCases/CreateHelloUseCase';
import { Hello } from '../../domain/entities/Hello';
import { IHelloRepository } from '../../domain/repositories/IHelloRepository';

describe('CreateHelloUseCase', () => {
  it('should create a hello entity', async () => {
    const mockRepository: IHelloRepository = {
      save: jest.fn().mockResolvedValue({
        helloText: 'Hello World',
        createdAt: new Date(),
      }),
    };

    const createHelloUseCase = new CreateHelloUseCase(mockRepository);
    const hello = new Hello({ helloText: 'Hello World' });
    const result = await createHelloUseCase.execute(hello);

    expect(mockRepository.save).toHaveBeenCalledWith(hello);
    expect(result).toHaveProperty('helloText', 'Hello World');
  });
});