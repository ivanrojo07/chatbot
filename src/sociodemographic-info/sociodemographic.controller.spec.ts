import { Test, TestingModule } from '@nestjs/testing';
import { SociodemographicController } from './sociodemographic.controller';

describe('SociodemographicController', () => {
  let controller: SociodemographicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SociodemographicController],
    }).compile();

    controller = module.get<SociodemographicController>(SociodemographicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
