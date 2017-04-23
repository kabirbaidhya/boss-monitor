import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import rp from 'request-promise';
import config from '../../src/config/config';
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
    sandbox.stub(config.notifications, 'hipchat', {
      enabled: true,
      roomId: faker.random.word(),
      authToken: faker.random.word()
    });

    assert.isTrue(hipchat.isEnabled());
  });

  it('should return false if hipchat notification is not enabled.', () => {
    sandbox.stub(config.notifications, 'hipchat', { enabled: false });

    assert.isFalse(hipchat.isEnabled());
  });
});

describe('hipchat.notify', () => {
  let sandbox;
  let hipchatRoomId = faker.lorem.slug();
  let hipchatAuthToken = faker.lorem.slug();

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(config.notifications, 'hipchat', {
      enabled: true,
      roomId: hipchatRoomId,
      authToken: hipchatAuthToken
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send the notification payload to the hipchat API endpoint.', () => {
    let rpStub = sandbox.stub(rp, 'post').callsFake(params => {
      assert.match(params.url, new RegExp(`^https://.*${hipchatRoomId}/notification?auth_token=${hipchatAuthToken}`));
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
});
