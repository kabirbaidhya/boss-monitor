import sinon from 'sinon';
import { assert } from 'chai';
import { STATUS_UP } from '../../src/services/status';
import * as slack from '../../src/services/slack';
import * as notifier from '../../src/services/notifier';

describe('notifier.notify', () => {
  let notify;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    notify = sandbox.stub(slack, 'notify');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should notify if slack is enabled', () => {
    let isEnabled = sinon.stub(slack, 'isEnabled').returns(true);
    let params = { status: STATUS_UP, name: 'foo' };

    notifier.notify(params);

    assert(notify.calledOnce);
    assert(notify.calledWith(params));

    isEnabled.restore();
  });

  it('should not notify if slack is not enabled', () => {
    let isEnabled = sinon.stub(slack, 'isEnabled').returns(false);
    let params = { status: STATUS_UP, name: 'foo' };

    notifier.notify(params);

    assert(notify.notCalled);

    isEnabled.restore();
  });
});
