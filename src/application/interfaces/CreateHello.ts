import { Hello } from '../../domain/entities/Hello';

export interface CreateHello {
  execute(hello: Hello): Promise<any>;
}
