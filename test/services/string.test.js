import { assert } from 'chai';
import * as str from '../../src/utils/string';

describe('center', () => {
  it('would return the text centered with left-padding slightly less than' +
    ' the right-padding if width is even and text length is odd.',
    () => {
      let width = 16;
      let text = 'something';
      let result = str.center(text, width);

      assert.equal(result, `   ${text}    `);
    });

  it('would return the text centered with left-padding slightly less than' +
    ' the right-padding if width is odd and text length is even.',
    () => {
      let width = 11;
      let text = 'EUROPE';
      let result = str.center(text, width);

      assert.equal(result, `  ${text}   `);
    });

  it('should return the text centered with equal padding on both sides ' +
    'if the width and text length are both odd numbers.',
    () => {
      // Here the width and text length both are odd numbers,
      // so the difference is 9 - 5 = 4. So, the string should be 
      // equally padded on the both sides.
      let width = 9;
      let text = 'NEPAL';
      let result = str.center(text, width);

      assert.equal(result, `  ${text}  `);
    });


  it('should return the text centered with equal padding on both sides ' +
    'if the width and text length are both even numbers.',
    () => {
      // Here the width and text length both are even numbers,
      // so the difference is 12 - 6 = 6. So, the string should be 
      // equally padded on the both sides.
      let width = 12;
      let text = 'EUROPE';
      let result = str.center(text, width);

      assert.equal(result, `   ${text}   `);
    });

  it('should return the same text if the width is less than or equal to the text length.', () => {
    let width = 1;
    let text = 'something';
    let result = str.center(text, width);

    assert.equal(result, text);
  });

  it('should return the centered text with custom fillchar too.', () => {
    let width = 15;
    let text = 'HEADING';
    let result = str.center(text, width, '_');

    assert.equal(result, `____${text}____`);
  });
});
