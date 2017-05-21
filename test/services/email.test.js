import faker from 'faker';
import sinon from 'sinon';
import { assert } from 'chai';
import nodemailer from 'nodemailer';
import * as config from '../../src/config/config';
import * as email from '../../src/services/email';
import { STATUS_UP } from '../../src/services/status';
import * as emailRenderer from '../../src/utils/emailRenderer';

describe('email.isEnabled', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return true if email notification is enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        email: { enabled: true }
      }
    });

    assert.isTrue(email.isEnabled());
  });

  it('should return false if email notification is not enabled.', () => {
    sandbox.stub(config, 'get').returns({
      notifications: {
        email: { enabled: false }
      }
    });

    assert.isFalse(email.isEnabled());
  });
});

describe('email.getClient', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a nodemailer transport with provided configurations', () => {
    let params = { foo: faker.random.word(), bar: faker.random.word() };
    let result = { foo: faker.random.word() };
    let mock = sandbox.mock(nodemailer);

    mock.expects('createTransport').once().withArgs(params).returns(result);
    assert.equal(email.getClient(params), result);
  });
});

describe('email.notify', () => {
  let sandbox;
  // let email

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send email notification with correct parameters.', () => {
    let emailHtml = '<h1>Test</h1>';
    let sendMailStub = sandbox.stub().callsFake(payload => {
      assert.equal(payload.html, emailHtml);
    });
    let name = faker.random.word();
    let status = STATUS_UP;

    sandbox.stub(emailRenderer, 'render').callsFake(() => emailHtml);

    // Trigger notify
    email.notify({
      name,
      status,
      downtime: 5
    });

    assert(sendMailStub.calledOnce);
  });
});
