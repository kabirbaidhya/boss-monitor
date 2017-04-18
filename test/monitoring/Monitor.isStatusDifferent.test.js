import faker from 'faker';
import { assert } from 'chai';
import Monitor from '../../src/monitoring/Monitor';
import { STATUS_UP, STATUS_DOWN } from '../../src/services/status';

describe('Monitor.isStatusDifferent', () => {
  let monitor = new Monitor({ name: faker.random.word() });

  monitor.status = STATUS_UP;

  it('should return true if status is different.', () => {
    assert(monitor.isStatusDifferent(STATUS_DOWN));
  });

  it('should return false if status is same.', () => {
    assert(monitor.isStatusDifferent(STATUS_UP));
  });
});
