import { Hello } from '../entities/Hello';

export interface IHelloRepository {
  save(hello: Hello): Promise<any>;
}