import { IHelloRepository } from '../../domain/repositories/IHelloRepository';
import { Hello } from '../../domain/entities/Hello';
import { ICreateHelloUseCase } from './interfaces/ICreateHelloUseCase';

class CreateHelloUseCase implements ICreateHelloUseCase {
  private helloRepository: IHelloRepository;

  constructor(helloRepository: IHelloRepository) {
    this.helloRepository = helloRepository;
  }

  async execute(hello: Hello): Promise<any> {
    return await this.helloRepository.save(hello);
  }
}

export default CreateHelloUseCase;