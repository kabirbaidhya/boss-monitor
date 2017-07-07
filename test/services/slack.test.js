import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import rp from 'request-promise';
import logger from '../../src/utils/logger';
import * as config from '../../src/config/config';
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
    sandbox.stub(config, 'get').returns({
      notifications: {
        slack: {
          color: {
            up: faker.random.word(),
            down: faker.random.word()
          },
          enabled: true,
          endpoint: faker.random.word()
        }
      }
    });

    assert.isTrue(slack.isEnabled());
  });

  it('should return false if slack notification is not enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        slack: {
          enabled: false
        }
      }
    });

    assert.isFalse(slack.isEnabled());
  });
});

describe('slack.notify', () => {
  let sandbox;
  let slackEndpoint = faker.lorem.slug();

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(config, 'get').returns({
      notifications: {
        slack: {
          enabled: true,
          color: {
            up: faker.random.word(),
            down: faker.random.word()
          },
          endpoint: slackEndpoint
        }
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send the notification payload to the slack API endpoint.', () => {
    let rpStub = sandbox.stub(rp, 'post').callsFake(params => {
      assert.match(params.url, new RegExp(`^https://.*${slackEndpoint}$`));
      assert.isObject(params.body);

      return Promise.resolve();
    });

    // Trigger the notification.
    slack.notify({
      status: STATUS_UP,
      name: faker.random.word()
    });

    assert(rpStub.calledOnce);
  });

  it('should log error if it fails to send notification to slack.', () => {
    let loggerStub = sandbox.stub(logger(), 'error');

    sandbox.stub(rp, 'post').throws('Error');

    slack.notify({
      status: STATUS_UP,
      name: faker.random.word()
    });

    assert.isTrue(loggerStub.calledOnce);
  });
});
