import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import * as slack from '../../src/services/slack';
import { STATUS_UP } from '../../src/services/status';
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
    const params = { status: STATUS_UP, name: faker.random.word() };

    sandbox.stub(slack, 'isEnabled').returns(true);
    notifier.notify(params);

    assert(notify.calledOnce);
    assert(notify.calledWith(params));
  });

  it('should not notify if slack is not enabled', () => {
    const params = { status: STATUS_UP, name: faker.random.word() };

    sandbox.stub(slack, 'isEnabled').returns(false);
    notifier.notify(params);

    assert(notify.notCalled);
  });
});
