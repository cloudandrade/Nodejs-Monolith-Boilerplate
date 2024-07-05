import { Request, Response, NextFunction } from 'express';
import HelloController from '#infra/adapters/http/controllers/HelloController';
import CreateHelloUseCase from '#application/useCases/CreateHelloUseCase';
import HelloRepository from '#infra/adapters/database/repository/HelloRepository';
import { Hello } from '#domain/entity/Hello';
import AppError from '#shared/errors/AppError';

// Mock the HelloRepository and CreateHelloUseCase
//jest.mock('../../application/useCases/CreateHelloUseCase');
jest.mock('#infra/adapters/database/repository/HelloRepository');

// Extend the NextFunction type to include Jest mock properties
type MockNextFunction = NextFunction & jest.Mock;

describe('HelloController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: MockNextFunction;
  let helloRepository: jest.Mocked<HelloRepository>;
  let createHelloUseCase: CreateHelloUseCase;

  beforeEach(() => {
    req = {
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn() as MockNextFunction;

    helloRepository = new HelloRepository() as jest.Mocked<HelloRepository>;

    // Create an instance of CreateHelloUseCase
    createHelloUseCase = new CreateHelloUseCase(helloRepository);
  });

  it('should create a hello and return 201 status', async () => {
    req.body = { helloText: 'Hello World' };
    const mockResult = {
      helloText: 'Hello World',
      createdAt: new Date(),
    };

    // Spy on execute method of createHelloUseCase
    const executeSpy = jest.spyOn(createHelloUseCase, 'execute');
    executeSpy.mockResolvedValue(mockResult);

    await HelloController.createHello(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);

    // Restore the spy
    executeSpy.mockRestore();
  });

  it('should return 400 if helloText is missing', async () => {
    req.body = {};

    await HelloController.createHello(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const appError = next.mock.calls[0][0] as AppError;
    expect(appError.statusCode).toBe(400);
    expect(appError.message).toBe('helloText is required');
  });

  it('should handle errors and return 500 status', async () => {
    req.body = { helloText: 'Hello World' };

    const executeSpy = jest.spyOn(createHelloUseCase, 'execute');
    executeSpy.mockRejectedValue(new Error('Internal Server Error'));

    await HelloController.createHello(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    const error = next.mock.calls[0][0] as any;
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Internal Server Error');

    // Restore the spy
    executeSpy.mockRestore();
  });
});