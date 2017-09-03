import faker from 'faker';
import { assert } from 'chai';
import Monitor from '../../src/monitoring/Monitor';
import { STATUS_UP, STATUS_DOWN } from '../../src/services/status';

describe('Monitor.shouldRetry', () => {
  let name = faker.random.word();
  let monitor = new Monitor({ name });

  it('should return false if status is up.', () => {
    let maxRetry = faker.random.number({ min: 3, max: 5 });

    monitor.retried = maxRetry;
    assert.isFalse(monitor.shouldRetry(name, STATUS_UP, maxRetry));
  });

  it('should return false if status is down and retried count is greater than max retry', () => {
    let maxRetry = faker.random.number({ min: 3, max: 5 });

    monitor.retried = maxRetry + 1;
    assert.isFalse(monitor.shouldRetry(name, STATUS_DOWN, maxRetry));
  });

  it('should return true if status is down and retried count is less than max retry', () => {
    let maxRetry = faker.random.number({ min: 3, max: 5 });

    monitor.retried = maxRetry - 1;
    assert.isTrue(monitor.shouldRetry(name, STATUS_DOWN, maxRetry));
  });
});
