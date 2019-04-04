import { assert } from 'chai';
import * as base64 from '../../src/utils/base64';

const testStr = 'chill:justchill';
const testEncodedStr = 'Y2hpbGw6anVzdGNoaWxs';

describe('base64', () => {
  const encodedStr = base64.encode(testStr);
  const decodedStr = base64.decode(testEncodedStr);

  describe('base64 encode', () => {
    it('should return a string', () => {
      assert.typeOf(encodedStr, 'string');
    });

    it('should return base64 encoded string', () => {
      assert.strictEqual(encodedStr, testEncodedStr);
    });
  });

  describe('base64 decode', () => {
    it('should return a string', () => {
      assert.typeOf(decodedStr, 'string');
    });

    it('should return ascii string', () => {
      assert.strictEqual(decodedStr, testStr);
    });
  });
});
