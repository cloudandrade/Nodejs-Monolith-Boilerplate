const HelloRepository = require('../../../../domain/repositories/HelloRepository');
const HelloSchema = require('../../database/model/HelloModel');

class HelloRepositoryImpl extends HelloRepository {
  async save(hello) {
    const newHello = new HelloSchema(hello);
    return await newHello.save();
  }
}

module.exports = HelloRepositoryImpl;
