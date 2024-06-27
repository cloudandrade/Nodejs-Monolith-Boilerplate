const CreateHello = require('../interfaces/CreateHello');

class CreateHelloUseCase extends CreateHello {
  constructor(helloRepository) {
    super();
    this.helloRepository = helloRepository;
  }

  async execute(helloData) {
    return this.helloRepository.save(helloData);
  }
}

module.exports = CreateHelloUseCase;
