import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import cache from 'memory-cache';
import * as config from '../../src/config/config';

describe('config.get', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the previously resolved config from the cache.', () => {
    const resolvedConfig = {
      foo: faker.random.word()
    };

    sandbox.stub(cache, 'get').callsFake(key => {
      assert.equal(key, config.CACHE_KEY);

      return resolvedConfig;
    });
    assert.deepEqual(config.get(), resolvedConfig);
  });
});
