import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { HealthService } from './health.service';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(@Res() res: Response) {
    const health = this.healthService.getHealth();

    res.status(HttpStatus.OK).json(health);
  }
}
