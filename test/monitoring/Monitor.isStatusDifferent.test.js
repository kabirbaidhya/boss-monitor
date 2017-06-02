import faker from 'faker';
import { assert } from 'chai';
import Monitor from '../../src/monitoring/Monitor';
import { STATUS_UP, STATUS_DOWN } from '../../src/services/status';

describe('Monitor.isStatusDifferent', () => {
  let monitor = new Monitor({ name: faker.random.word() });

  it('should return true if status is different.', () => {
    monitor.status = STATUS_UP;
    assert.isTrue(monitor.isStatusDifferent(STATUS_DOWN));
  });

  it('should return false if status is same.', () => {
    monitor.status = STATUS_UP;
    assert.isFalse(monitor.isStatusDifferent(STATUS_UP));
  });
});
