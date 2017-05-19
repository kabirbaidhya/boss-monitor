import { assert } from 'chai';
import { center } from '../../src/utils/string';

describe('center', () => {
  const width = 8;
  let text = 'something'; // using random text will generate different results

  it('should return centerized string with proper padding for even width.', () => {
    let result = center(text, width);

    assert.equal(result, `     ${text}    `);
  });
});

describe('center', () => {
  const width = 7;
  let text = 'something';

  it('should return centerized string with proper padding for odd width.', () => {
    let result = center(text, width);

    assert.equal(result, `    ${text}    `);
  });
});

describe('center', () => {
  const width = 0;
  let text = 'somethings';

  it('should return default text if width length is less than text length.', () => {
    let result = center(text, width);

    assert.equal(result, text);
  });
});
