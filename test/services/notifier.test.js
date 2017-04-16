import sinon from 'sinon';
import { assert } from 'chai';
import { STATUS_UP } from '../../src/services/status';
import * as slack from '../../src/services/slack';
import * as notifier from '../../src/services/notifier';

describe('notifier.notify', () => {
  it('should notify if slack is enabled', () => {
    let isEnabled = sinon.stub(slack, 'isEnabled').returns(true);
    let notify = sinon.spy(slack, 'notify');
    let params = { status: STATUS_UP, name: 'foo' };

    notifier.notify(params);

    assert(notify.calledOnce);
    assert(notify.calledWith(params));

    isEnabled.restore();
  });
});
