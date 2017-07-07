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
    let sendMessageStub = sandbox.stub().returns({
      // Fake response from https://www.twilio.com/docs/api/rest/response
      'sid': 'SM1f0e8ae6ade43cb3c0ce4525424e404f',
      'date_created': 'Fri, 13 Aug 2010 01:16:24 +0000',
      'date_updated': 'Fri, 13 Aug 2010 01:16:24 +0000',
      'date_sent': null,
      'account_sid': 'AC228b97a5fe4138be081eaff3c44180f3',
      'to': '+15305431221',
      'from': '+15104564545',
      'body': 'A Test Message',
      'status': 'queued',
      'flags': [ 'outbound' ],
      'api_version': '2010-04-01',
      'price': null,
      'uri': '\/2010-04-01\/Accounts\/AC228ba7a5fe4238be081ea6f3c44186f3\/SMS\/Messages\/SM1f0e8ae6ade43cb3c0ce4525424e404f.json'
    });

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
