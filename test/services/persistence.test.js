import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';

import logger from '../../src/utils/logger';
import StatusLog from '../../src/models/StatusLog';
import { STATUS_DOWN } from '../../src/services/status';
import * as persistence from '../../src/services/persistence';

describe('persistence.persist', () => {
  let sandbox;
  let createStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    createStub = sandbox.stub(StatusLog, 'create');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should persist status log to database.', async() => {
    const params = {
      status: STATUS_DOWN,
      serviceName: faker.random.word()
    };

    createStub.resolves({
      // Fake response from StatusLog model
      attributes: {
        id: faker.random.number(),
        status: STATUS_DOWN,
        name: params.serviceName
      }
    });

    const result = await persistence.persist(params);

    assert.isTrue(createStub.calledWith({
      status: params.status,
      name: params.serviceName
    }));
    assert.equal(params.status, result.attributes.status);
    assert.equal(params.serviceName, result.attributes.name);
  });

  it('should log an error if it cannot persist to database.', async() => {
    const params = {
      status: STATUS_DOWN,
      serviceName: faker.random.word()
    };

    const loggerInstance = logger();
    const loggerStub = sandbox.stub(loggerInstance, 'error');

    createStub.rejects('Database operation failed.');

    await persistence.persist(params);

    assert.isTrue(createStub.calledWith({
      status: params.status,
      name: params.serviceName
    }));
    assert.isTrue(loggerStub.calledOnce);
  });
});

describe('persistence.getLastStatus', () => {
  let sandbox;
  let StatusLogModel;
  let fetchByNameStub;

  beforeEach(() => {
    StatusLogModel = {
      set: sinon.spy(),
      get: sinon.spy(),
      toJSON: sinon.spy()
    };
    sandbox = sinon.sandbox.create();
    fetchByNameStub = sandbox.stub(StatusLog, 'fetchByName');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get last status of service from database.', async() => {
    const serviceName = faker.random.word();

    fetchByNameStub.resolves(StatusLogModel);

    await persistence.getLastStatus(serviceName);

    assert.isTrue(fetchByNameStub.calledWith(serviceName));
    assert.isTrue(StatusLogModel.toJSON.calledOnce);
    assert.isTrue(StatusLogModel.set.calledOnce);
    assert.isTrue(StatusLogModel.get.calledOnce);
  });

  it('should return null if it cannot get last status of service from database.', async() => {
    const serviceName = faker.random.word();

    fetchByNameStub.resolves(null);

    const result = await persistence.getLastStatus(serviceName);

    assert.isTrue(fetchByNameStub.calledWith(serviceName));
    assert.equal(result, null);
  });

  it('should log an error if it cannot fetch from database.', async() => {
    const serviceName = faker.random.word();

    const loggerInstance = logger();
    const loggerStub = sandbox.stub(loggerInstance, 'error');

    fetchByNameStub.rejects('Database operation failed.');

    await persistence.getLastStatus(serviceName);

    assert.isTrue(fetchByNameStub.calledWith(serviceName));
    assert.isTrue(loggerStub.calledOnce);
  });
});
