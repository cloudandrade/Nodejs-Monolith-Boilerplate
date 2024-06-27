import { IHelloRepository } from '../../../../domain/repository/IHelloRepository';
import HelloModel from '../model/HelloModel';
import { Hello } from '../../../../domain/entity/Hello';

class HelloRepository implements IHelloRepository {
  async save(hello: Hello): Promise<any> {
    const helloDoc = new HelloModel({
      helloText: hello.helloText,
      createdAt: hello.createdAt,
    });
    return await helloDoc.save();
  }
}

export default HelloRepository;
