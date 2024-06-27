import { Hello } from '../entity/Hello';

export interface IHelloRepository {
  save(hello: Hello): Promise<any>;
}