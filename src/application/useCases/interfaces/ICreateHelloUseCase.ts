import { Hello } from '../../../domain/entities/Hello';

export interface ICreateHelloUseCase {
  execute(hello: Hello): Promise<any>;
}
