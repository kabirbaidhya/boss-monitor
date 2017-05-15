import faker from 'faker';
import { assert } from 'chai';
import string from '../utils/string';
import config from '../../src/config/config';

describe('string.center', () => {
  const { width } = config.logging; 
  let text = faker.random.word();

  it('should return centerized stringn with proper padding.', () => {
    let result = string.center(text, width);

    assert.equal(result);
  });
});
