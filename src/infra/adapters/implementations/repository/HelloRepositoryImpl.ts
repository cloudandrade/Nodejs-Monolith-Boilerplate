import { IHelloRepository } from '../../../../domain/repositories/IHelloRepository';
import HelloModel from '../../database/model/HelloModel';
import { Hello } from '../../../../domain/entities/Hello';

class HelloRepositoryImpl implements IHelloRepository {
  async save(hello: Hello): Promise<any> {
    const helloDoc = new HelloModel({
      helloText: hello.helloText,
      createdAt: hello.createdAt,
    });
    return await helloDoc.save();
  }
}

export default HelloRepositoryImpl;
