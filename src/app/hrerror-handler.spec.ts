import { HRErrorHandler } from './hrerror-handler';
import { TestBed } from '@angular/core/testing';
import { HRErrorLogService } from './hrerror-log.service';


let logService: HRErrorLogService;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [],
    providers: [
      {provide: HRErrorLogService}
    ]
  });
  logService = TestBed.get(HRErrorLogService);
});
describe('HRErrorHandler', () => {
  it('should create an instance', () => {
    expect(new HRErrorHandler(logService)).toBeTruthy();
  });
});
