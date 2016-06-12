import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { FormatTime } from './format-time.pipe';

describe('FormatTime Pipe', () => {
  beforeEachProviders(() => [FormatTime]);

  it('converts seconds to a formatted string', inject([FormatTime], (pipe: FormatTime) => {
    expect(pipe.transform(60)).toBe("1:00");
    expect(pipe.transform(120)).toBe("2:00");
    expect(pipe.transform(150)).toBe("2:30");
  }));
});
