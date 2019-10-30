import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import * as config from '../../src/config/config';
import { STATUS_UP } from '../../src/services/status';
import * as websocket from '../../src/services/websocket';
import * as websocketServer from '../../src/utils/websocketServer';

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
  let sandbox;
  let initStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    initStub = sandbox.stub(websocketServer, 'init');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should initialize websocket server if websocket is enabled.', () => {
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

    assert.isTrue(initStub.calledOnce);
  });

  it('should not initialize websocket server if websocket is disabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        websocket: {
          enabled: false
        }
      }
    });

    websocket.init();

    assert.isFalse(initStub.calledOnce);
  });

});

describe('websocket.notify', () => {
  let sandbox;
  let broadcastStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    broadcastStub = sandbox.stub(websocketServer, 'broadcast');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should broadcast to all clients.', () => {
    const params = { status: STATUS_UP, name: faker.random.word() };

    websocket.notify(params);

    assert(broadcastStub.calledOnce);
    assert(broadcastStub.calledWith(params));
  });
});
