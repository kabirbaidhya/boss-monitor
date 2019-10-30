import faker from 'faker';
import { assert } from 'chai';
import Monitor from '../../src/monitoring/Monitor';
import { STATUS_UP, STATUS_DOWN } from '../../src/services/status';

describe('Monitor.shouldRetry', () => {
  it('should return false if status is up.', () => {
    const name = faker.random.word();
    const monitor = new Monitor({ name });
    const maxRetry = faker.random.number({ min: 3, max: 5 });

    monitor.retried = maxRetry;
    assert.isFalse(monitor.shouldRetry(name, STATUS_UP, maxRetry));
  });

  it('should return false if status is down and retried count is greater than max retry', () => {
    const name = faker.random.word();
    const monitor = new Monitor({ name });
    const maxRetry = faker.random.number({ min: 3, max: 5 });

    monitor.retried = maxRetry + 1;
    assert.isFalse(monitor.shouldRetry(name, STATUS_DOWN, maxRetry));
  });

  it('should return true if status is down and retried count is less than max retry', () => {
    const name = faker.random.word();
    const monitor = new Monitor({ name });
    const maxRetry = faker.random.number({ min: 3, max: 5 });

    monitor.retried = maxRetry - 1;
    assert.isTrue(monitor.shouldRetry(name, STATUS_DOWN, maxRetry));
  });
});
