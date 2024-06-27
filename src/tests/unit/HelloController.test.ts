import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import HelloController from '../../infra/adapters/http/controllers/HelloController';
import { Hello } from '../../domain/entities/Hello';
import AppError from '../../shared/errors/AppError';

const app: Application = express();
app.use(bodyParser.json());

app.post('/api/hello', HelloController.createHello);

describe('HelloController', () => {
  it('should create a hello and return 201 status', async () => {
    const mockRepository = {
      save: jest.fn().mockResolvedValue({
        helloText: 'Hello World',
        createdAt: new Date(),
      }),
    };
    
    jest.spyOn(HelloController, 'createHello').mockImplementation(async (req, res, next) => {
      const hello = new Hello({ helloText: req.body.helloText });
      const result = await mockRepository.save(hello);
      res.status(201).json(result);
    });

    const response = await request(app)
      .post('/api/hello')
      .send({ helloText: 'Hello World' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('helloText', 'Hello World');
  });

  it('should return 400 if helloText is missing', async () => {
    const response = await request(app)
      .post('/api/hello')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'helloText is required');
  });

  it('should handle errors and return 500 status', async () => {
    jest.spyOn(HelloController, 'createHello').mockImplementation(async (req, res, next) => {
      throw new AppError('Internal Server Error', 500);
    });

    const response = await request(app)
      .post('/api/hello')
      .send({ helloText: 'Hello World' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Internal Server Error');
  });
});
