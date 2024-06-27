import { HelloRepository } from '../../domain/repositories/HelloRepository';
import { Hello } from '../../domain/entities/Hello';
import { CreateHello } from '../interfaces/CreateHello';

class CreateHelloUseCase implements CreateHello {
  private helloRepository: HelloRepository;

  constructor(helloRepository: HelloRepository) {
    this.helloRepository = helloRepository;
  }

  async execute(hello: Hello): Promise<any> {
    return await this.helloRepository.save(hello);
  }
}

export default CreateHelloUseCase;
