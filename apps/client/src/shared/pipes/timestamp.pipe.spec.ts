import { TestBed } from '@angular/core/testing';
import { TimestampPipe } from './timestamp.pipe';

describe('Pipe: TimestampPipe', () => {
  let timestampPipe: TimestampPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TimestampPipe ],
      providers: [ TimestampPipe ]
    });

    timestampPipe = TestBed.get(TimestampPipe);
  });

  describe('Function: transform()', () => {
    it('should return seconds', () => {
      const result = timestampPipe.transform(Date.now() - 18603);

      expect(result).toBe('18 sec');
    });

    it('should return minutes', () => {
      const result = timestampPipe.transform(Date.now() - 61000);

      expect(result).toBe('1 min');
    });

    it('should return hours', () => {
      const result = timestampPipe.transform(Date.now() - 3600000);

      expect(result).toBe('1 hrs');
    });
  });
});
