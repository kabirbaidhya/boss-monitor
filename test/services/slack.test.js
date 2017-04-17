import sinon from 'sinon';
import { assert } from 'chai';
import rp from 'request-promise';
import config from '../../src/config/config';
import * as slack from '../../src/services/slack';
import { STATUS_UP } from '../../src/services/status';

describe('slack.isEnabled', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return true if slack notification is enabled.', () => {
    sandbox.stub(config.notifications, 'slack', {
      enabled: true,
      endpoint: 'foo'
    });

    assert.isTrue(slack.isEnabled());
  });

  it('should return false if slack notification is not enabled.', () => {
    sandbox.stub(config.notifications, 'slack', { enabled: false });

    assert.isFalse(slack.isEnabled());
  });
});

describe('slack.notify', () => {
  let sandbox;
  let slackEndpoint = '/just-a-test-slack-endpoint'; // TODO: Use faker.

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(config.notifications, 'slack', {
      enabled: true,
      endpoint: slackEndpoint
    })
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send the notification payload to the slack API endpoint.', () => {
    let rpStub = sandbox.stub(rp, 'post', params => {
      assert.match(params.url, new RegExp(`^https://.*${slackEndpoint}$`));
      assert.isObject(params.body);

      return Promise.resolve();
    });

    // Trigger the notification.
    slack.notify({
      status: STATUS_UP,
      name: 'foo service'
    });

    assert(rpStub.calledOnce);
  });
});
