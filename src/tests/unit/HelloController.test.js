const HelloController = require('../../infra/adapters/http/controllers/HelloController');
const HelloRepositoryImpl = require('../../infra/adapters/database/HelloRepositoryImpl');
const CreateHelloUseCase = require('../../application/use-cases/CreateHelloUseCase');
const Hello = require('../../domain/entities/Hello');
const httpMocks = require('node-mocks-http');
const AppError = require('../../shared/errors/AppError');

jest.mock('../../infra/adapters/database/HelloRepositoryImpl');

describe('HelloController', () => {
  it('should create a hello and return the saved hello', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/hello',
      body: {
        helloText: 'Hello, World!',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const mockHelloRepository = new HelloRepositoryImpl();
    mockHelloRepository.save = jest.fn().mockResolvedValue({
      id: '1',
      helloText: 'Hello, World!',
      createdAt: new Date().toISOString(),
    });

    CreateHelloUseCase.mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue({
          id: '1',
          helloText: 'Hello, World!',
          createdAt: new Date().toISOString(),
        }),
      };
    });

    await HelloController.createHello(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toHaveProperty('helloText', 'Hello, World!');
  });

  it('should return 400 if helloText is not provided', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/hello',
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await HelloController.createHello(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError('helloText is required', 400));
  });
});
