import faker from 'faker';
import { assert } from 'chai';
import string from '../utils/string';

describe('string.center', () => {
  const width = 8;
  let text = faker.random.word();

  it('should return centerized stringn with proper padding for even width.', () => {
    let result = string.center(text, width);

    assert.equal(result);
  });
});

describe('string.center', () => {
  const width = 7;
  let text = faker.random.word();

  it('should return centerized stringn with proper padding for odd width.', () => {
    let result = string.center(text, width);

    assert.equal(result);
  });
});

describe('string.center', () => {
  const  width  = 0;
  let text = faker.random.word();

  it('should return default text if width length is less than text length', () => {
    let result = string.center(text, width);

    assert.equal(result);
  });
});
