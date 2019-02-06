import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import Monitor from '../../src/monitoring/Monitor';
import * as events from '../../src/services/events';
import { STATUS_UP } from '../../src/services/status';

describe('Monitor.handleStatusChange', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should trigger the EVENT_STATUS_CHANGED event.', () => {
    const status = STATUS_UP;
    const serviceName = faker.random.word();
    const monitor = new Monitor({ name: serviceName });
    const listener = sandbox.stub().callsFake(params => {
      assert.equal(params.serviceName, serviceName);
      assert.equal(params.status, status);
    });

    events.addListener(events.EVENT_STATUS_CHANGED, listener);

    monitor.handleStatusChange(status);

    assert(listener.calledOnce);
  });
});
