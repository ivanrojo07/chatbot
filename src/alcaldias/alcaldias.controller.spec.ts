import { Test, TestingModule } from '@nestjs/testing';
import { AlcaldiasController } from './alcaldias.controller';

describe('AlcaldiasController', () => {
  let controller: AlcaldiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlcaldiasController],
    }).compile();

    controller = module.get<AlcaldiasController>(AlcaldiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
