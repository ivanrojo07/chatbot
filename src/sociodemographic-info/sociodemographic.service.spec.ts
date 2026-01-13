import { Test, TestingModule } from '@nestjs/testing';
import { SociodemographicService } from './sociodemographic.service';

describe('SociodemographicService', () => {
  let service: SociodemographicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SociodemographicService],
    }).compile();

    service = module.get<SociodemographicService>(SociodemographicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
