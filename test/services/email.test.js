import faker from 'faker';
import sinon from 'sinon';
import { assert } from 'chai';
import logger from '../../src/utils/logger';
import config from '../../src/config/config';
import * as email from '../../src/services/email';
import emailClient from '../../src/utils/emailClient';
import { STATUS_UP, STATUS_DOWN } from '../../src/services/status';

describe('email.isEnabled', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return true if email notification is enabled.', () => {
    sandbox.stub(config.notifications, 'email', {
      enabled: true
    });

    assert.isTrue(email.isEnabled());
  });

  it('should return false if email notification is not enabled.', () => {
    sandbox.stub(config.notifications, 'email', {
      enabled: false
    });

    assert.isFalse(email.isEnabled());
  });
});

describe('email.notify', () => {
  let sandbox;
  let emailService = faker.random.word();
  let user = faker.internet.email();
  let pass = faker.random.number();
  let sender = faker.internet.email();
  let receivers = [];

  for(let i = 5; i >= 0; i--){
    receivers.push(faker.internet.email());
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(config.notifications, 'email', {
      enabled: true,
      transport: {
        service: emailService,
        auth: {
          user,
          pass
        }
      },
      message: {
        sender,
        receivers
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send email notification with correct parameters', () => {
    let randomName = faker.random.word();

    let emailClientStub = sandbox.stub(emailClient, 'sendMail').callsFake(params => {
      assert.equal(params.to, receivers);
      assert.equal(params.from, sender);
      assert.match(params.subject, new RegExp(`^Status for ${randomName}$`));
      assert.isString(params.html);

      return Promise.resolve(params);
    });

    email.notify({
      status: STATUS_UP,
      name: randomName
    });

    assert.isTrue(emailClientStub.calledOnce);
  });

  it('should log error when emailClient fails to send email', () => {
    let loggerStub = sandbox.stub(logger, 'error');

    sandbox.stub(emailClient, 'sendMail').throws('Error');

    email.notify({
      status: STATUS_DOWN,
      name: faker.random.word()
    });

    assert.isTrue(loggerStub.calledOnce);
  });
});
