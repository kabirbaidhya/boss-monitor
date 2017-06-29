import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import * as config from '../../src/config/config';
import { STATUS_UP } from '../../src/services/status';
import * as websocket from '../../src/services/websocket';

describe('websocket.isEnabled', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return true if websocket notification is enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        websocket: {
          enabled: true,
          port: faker.random.number({
            min: 8000,
            max: 9000
          })
        }
      }
    });

    assert.isTrue(websocket.isEnabled());
  });

  it('should return false if websocket notification is not enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        websocket: {
          enabled: false
        }
      }
    });

    assert.isFalse(websocket.isEnabled());
  });
});

describe('websocket.init', () => {
  let init;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    init = sandbox.stub(websocket, 'init');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call websocket init function.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        websocket: {
          enabled: true,
          port: faker.random.number({
            min: 8000,
            max: 9000
          })
        }
      }
    });

    websocket.init();

    assert.isTrue(init.calledOnce);
  });

});

describe('websocket.notify', () => {
  let notify;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    notify = sandbox.stub(websocket, 'notify');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call websocket notify function.', () => {
    let params = { status: STATUS_UP, name: faker.random.word() };

    websocket.notify(params);

    assert(notify.calledOnce);
    assert(notify.calledWith(params));
  });

});
