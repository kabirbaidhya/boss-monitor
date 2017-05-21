import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import rp from 'request-promise';
import logger from '../../src/utils/logger';
import * as config from '../../src/config/config';
import * as hipchat from '../../src/services/hipchat';
import { STATUS_UP } from '../../src/services/status';

describe('hipchat.isEnabled', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return true if hipchat notification is enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        hipchat: {
          enabled: true,
          roomId: faker.random.word(),
          authToken: faker.random.word()
        }
      }
    });

    assert.isTrue(hipchat.isEnabled());
  });

  it('should return false if hipchat notification is not enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        hipchat: {
          enabled: false
        }
      }
    });

    assert.isFalse(hipchat.isEnabled());
  });
});

describe('hipchat.notify', () => {
  let sandbox;
  let roomId = faker.lorem.slug();
  let authToken = faker.lorem.slug();

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(config, 'get').returns({
      notifications: {
        hipchat: {
          enabled: true,
          roomId,
          authToken
        }
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send the notification payload to the hipchat API endpoint.', () => {
    let rpStub = sandbox.stub(rp, 'post').callsFake(params => {
      assert.equal(params.url, hipchat.getUrl(roomId, authToken));
      assert.isObject(params.body);

      return Promise.resolve();
    });

    // Trigger the notification.
    hipchat.notify({
      status: STATUS_UP,
      name: faker.random.word()
    });

    assert(rpStub.calledOnce);
  });

  it('should log error if it fails to send notification to hipchat.', () => {
    let loggerInstance = logger();
    let loggerStub = sandbox.stub(loggerInstance, 'error');

    sandbox.stub(rp, 'post').throws('Error');

    hipchat.notify({
      status: STATUS_UP,
      name: faker.random.word()
    });

    assert.isTrue(loggerStub.calledOnce);
  });
});
