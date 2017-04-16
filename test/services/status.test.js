import { assert } from 'chai';
import * as status from '../../src/services/status';

describe('status.getCheckInterval', () => {
  let maxInterval = 10000;
  let minInterval = 1000;

  it('should return the max. interval if status is up.', () => {
    let result = status.getCheckInterval(status.STATUS_UP, minInterval, maxInterval);

    assert.equal(result, maxInterval);
  });

  it('should return the min. interval if status is down.', () => {
    let result = status.getCheckInterval(status.STATUS_DOWN, minInterval, maxInterval);

    assert.equal(result, minInterval);
  });
});
