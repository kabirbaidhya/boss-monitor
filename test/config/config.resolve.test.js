import sinon from 'sinon';
import faker from 'faker';
import Yaml from 'yamljs';
import { assert } from 'chai';
import cache from 'memory-cache';
import merge from 'webpack-merge';
import * as config from '../../src/config/config';
import defaultConfig from '../../src/config/default.config';

describe('config.resolve', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return default configuration even if the config file is empty.', () => {
    sandbox.stub(Yaml, 'load').returns({});
    sandbox.stub(cache, 'put');

    let result = config.resolve(faker.system.fileName);

    assert.deepEqual(result, defaultConfig);
  });

  it('should merge and return both the config loaded from file and the default ones.', () => {
    let configFromFile = {
      foo: faker.random.word(),
      bar: faker.random.word()
    };

    sandbox.stub(Yaml, 'load').returns(configFromFile);
    sandbox.stub(cache, 'put');

    let result = config.resolve(faker.system.fileName);

    assert.deepEqual(result, merge(defaultConfig, configFromFile));
    assert.containSubset(result, configFromFile);
    assert.containSubset(result, defaultConfig);
  });

  it('should return the resolved config that overrides the default values if same keys are found.', () => {
    let configFromFile = {
      notifications: {
        slack: {
          enabled: true
        }
      },
      monitoring: {
        maxInterval: 600000
      }
    };

    sandbox.stub(Yaml, 'load').returns(configFromFile);
    sandbox.stub(cache, 'put');

    let result = config.resolve(faker.system.fileName);

    assert.deepEqual(result.notifications.slack, Object.assign({},
      defaultConfig.notifications.slack,
      configFromFile.notifications.slack
    ));

    assert.deepEqual(result.monitoring, Object.assign({},
      defaultConfig.monitoring,
      configFromFile.monitoring
    ));

    assert.deepEqual(result, merge(defaultConfig, configFromFile));
  });

  it('should put the resolved config in the cache.', () => {
    let configFromFile = {
      foo: faker.random.word(),
      bar: faker.random.word()
    };
    let expectedResult = merge(defaultConfig, configFromFile);

    sandbox.stub(Yaml, 'load').returns(configFromFile);
    sandbox.stub(cache, 'put').callsFake((key, valueToBeCached) => {
      assert.equal(key, config.CACHE_KEY);
      assert.deepEqual(valueToBeCached, expectedResult);
    });

    let result = config.resolve(faker.random.word());

    assert.deepEqual(result, expectedResult);
  });
});
