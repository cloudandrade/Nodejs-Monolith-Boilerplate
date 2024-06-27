import { IHelloRepository } from '../../domain/repository/IHelloRepository';
import { Hello } from '../../domain/entity/Hello';
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