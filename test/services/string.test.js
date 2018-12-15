import { assert } from 'chai';
import * as str from '../../src/utils/string';

describe('center', () => {
  it('would return the text centered with left-padding slightly less than' +
    ' the right-padding if width is even and text length is odd.',
  () => {
    const width = 16;
    const text = 'something';
    const result = str.center(text, width);

    assert.equal(result, `   ${text}    `);
  });

  it('would return the text centered with left-padding slightly less than' +
    ' the right-padding if width is odd and text length is even.',
  () => {
    const width = 11;
    const text = 'EUROPE';
    const result = str.center(text, width);

    assert.equal(result, `  ${text}   `);
  });

  it('should return the text centered with equal padding on both sides ' +
    'if the width and text length are both odd numbers.',
  () => {
    // Here the width and text length both are odd numbers,
    // so the difference is 9 - 5 = 4. So, the string should be 
    // equally padded on the both sides.
    const width = 9;
    const text = 'NEPAL';
    const result = str.center(text, width);

    assert.equal(result, `  ${text}  `);
  });


  it('should return the text centered with equal padding on both sides ' +
    'if the width and text length are both even numbers.',
  () => {
    // Here the width and text length both are even numbers,
    // so the difference is 12 - 6 = 6. So, the string should be 
    // equally padded on the both sides.
    const width = 12;
    const text = 'EUROPE';
    const result = str.center(text, width);

    assert.equal(result, `   ${text}   `);
  });

  it('should return the same text if the width is less than or equal to the text length.', () => {
    const width = 1;
    const text = 'something';
    const result = str.center(text, width);

    assert.equal(result, text);
  });

  it('should return the centered text with custom fillchar too.', () => {
    const width = 15;
    const text = 'HEADING';
    const result = str.center(text, width, '_');

    assert.equal(result, `____${text}____`);
  });
});
