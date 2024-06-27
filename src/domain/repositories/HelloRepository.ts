import { Hello } from '../entities/Hello';

export interface HelloRepository {
  save(hello: Hello): Promise<any>;
}