import { Hello } from '#domain/entity/Hello';

export interface ICreateHelloUseCase {
  execute(hello: Hello): Promise<any>;
}
