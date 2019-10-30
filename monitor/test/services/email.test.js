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
    const params = { foo: faker.random.word(), bar: faker.random.word() };
    const result = { foo: faker.random.word() };
    const mock = sandbox.mock(nodemailer);

    mock.expects('createTransport').once().withArgs(params).returns(result);
    assert.equal(email.getClient(params), result);
  });
});

describe('email.notify', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send email notification with correct parameters.', () => {
    const emailHtml = '<h1>Test</h1>';
    const name = faker.random.word();
    const status = STATUS_UP;
    const clientStub = { sendMail: sandbox.stub() };

    sandbox.stub(nodemailer, 'createTransport').returns(clientStub);
    sandbox.stub(emailRenderer, 'render').callsFake(() => emailHtml);

    // Trigger notify
    email.notify({
      name,
      status,
      downtime: 5
    });

    assert.isTrue(clientStub.sendMail.called);
  });
});
