import { Test, TestingModule } from '@nestjs/testing';
import { AirlineService } from './airline.service';
import { Repository } from 'typeorm';
import { AirlineEntity } from './airline.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AirlineService', () => {
  let service: AirlineService;
  let repository: Repository<AirlineEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AirlineService],
    }).compile();

    service = module.get<AirlineService>(AirlineService);
    repository = module.get<Repository<AirlineEntity>>(getRepositoryToken(AirlineEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
