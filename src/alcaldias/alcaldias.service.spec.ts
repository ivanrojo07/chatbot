import { Test, TestingModule } from '@nestjs/testing';
import { AlcaldiasService } from './alcaldias.service';

describe('AlcaldiasService', () => {
  let service: AlcaldiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlcaldiasService],
    }).compile();

    service = module.get<AlcaldiasService>(AlcaldiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
