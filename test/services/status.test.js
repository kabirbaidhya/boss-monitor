import { assert } from 'chai';
import * as status from '../../src/services/status';

describe('status.getCheckInterval', () => {
  let minInterval = 1000;
  let maxInterval = 10000;

  it('should return maximum interval if status is up.', () => {
    let result = status.getCheckInterval(status.STATUS_UP, minInterval, maxInterval);

    assert.equal(result, maxInterval);
  });

  it('should return minimum interval if status is down.', () => {
    let result = status.getCheckInterval(status.STATUS_DOWN, minInterval, maxInterval);

    assert.equal(result, minInterval);
  });
});
