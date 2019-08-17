import { Test, TestingModule } from '@nestjs/testing';
import { PlgController } from './plg.controller';

describe('Plg Controller', () => {
  let controller: PlgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlgController],
    }).compile();

    controller = module.get<PlgController>(PlgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
