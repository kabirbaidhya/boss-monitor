import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import Monitor from '../../src/monitoring/Monitor';
import * as events from '../../src/services/events';

describe('Monitor.start', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should trigger the EVENT_MONITORING_STARTED event.', () => {
    let serviceName = faker.random.word();
    let monitor = new Monitor({ name: serviceName });
    let listener = sandbox.stub().callsFake(params => {
      assert.equal(params.serviceName, serviceName);
    });

    sandbox.stub(monitor, 'startMonitoring');
    events.addListener(events.EVENT_MONITORING_STARTED, listener);

    monitor.start();

    assert(listener.calledOnce);
  });
});
