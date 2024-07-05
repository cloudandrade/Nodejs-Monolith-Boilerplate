import { Hello } from '#domain/entity/Hello';

export interface IHelloRepository {
  save(hello: Hello): Promise<any>;
}