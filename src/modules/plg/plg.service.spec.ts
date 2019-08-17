import { Test, TestingModule } from '@nestjs/testing';
import { PlgService } from './plg.service';

describe('PlgService', () => {
  let service: PlgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlgService],
    }).compile();

    service = module.get<PlgService>(PlgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
