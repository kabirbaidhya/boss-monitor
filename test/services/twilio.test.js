import faker from 'faker';
import sinon from 'sinon';
import { assert } from 'chai';
import proxyquire from 'proxyquire';
import logger from '../../src/utils/logger';
import * as config from '../../src/config/config';
import * as twilio from '../../src/services/twilio';
import { STATUS_UP, STATUS_DOWN } from '../../src/services/status';

describe('twilio.isEnabled', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return true if twilio notification is enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        twilio: { enabled: true }
      }
    });

    assert.isTrue(twilio.isEnabled());
  });

  it('should return false if twilio notification is not enabled', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        twilio: { enabled: false }
      }
    });

    assert.isFalse(twilio.isEnabled());
  });
});

describe('twilio.notify', () => {
  let sandbox;
  let randomId = faker.random.uuid();
  let phoneNumber = faker.phone.phoneNumber();

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(config, 'get').returns({
      notifications: {
        twilio: {
          enabled: true,
          sender: phoneNumber,
          receiver: phoneNumber,
          authToken: randomId,
          accountSid: randomId
        }
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send notification from twilio with correct params', () => {
    let sendMessageStub = sandbox.stub();
    let twilioSerivce = proxyquire('../../src/services/twilio', {
      twilio() {
        return { sendMessage: sendMessageStub };
      }
    });

    twilioSerivce.notify({ status: STATUS_UP, name: faker.random.word() });
    assert.isTrue(sendMessageStub.calledOnce);
  });

  it('should log error when twilio fails to send the message', () => {
    let sendMessageStub = sandbox.stub().throws(new Error());
    let twilioSerivce = proxyquire('../../src/services/twilio', {
      twilio() {
        return {
          sendMessage: sendMessageStub
        };
      }
    });
    let loggerInstance = logger();
    let loggerStub = sandbox.stub(loggerInstance, 'error');

    twilioSerivce.notify({ status: STATUS_DOWN, name: faker.random.word() });
    assert.isTrue(loggerStub.calledOnce);
  });
});
