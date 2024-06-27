import { HelloRepository } from '../../../../domain/repositories/HelloRepository';
import HelloModel, { IHello } from '../../database/model/HelloModel';

class HelloRepositoryImpl implements HelloRepository {
  async save(hello: Hello): Promise<IHello> {
    const helloDoc = new HelloModel({
      helloText: hello.helloText,
      createdAt: hello.createdAt,
    });
    return await helloDoc.save();
  }
}

export default HelloRepositoryImpl;
