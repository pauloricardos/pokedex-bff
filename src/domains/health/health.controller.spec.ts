import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = moduleRef.get<HealthController>(HealthController);
    healthService = moduleRef.get<HealthService>(HealthService);
  });

  describe('/health', () => {
    describe('getHealth', () => {
      it('should return the health status', () => {
        const mockResponse = {
          ...jest.requireActual('express'),
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        const mockHealth = 'Mock Health';
        jest.spyOn(healthService, 'getHealth').mockReturnValue(mockHealth);

        healthController.getHealth(mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(mockResponse.json).toHaveBeenCalledWith(mockHealth);
      });
    });
  });
});
