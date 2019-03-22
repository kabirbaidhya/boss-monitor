import { assert } from 'chai';
import * as base64 from '../../src/utils/base64';

describe('base64', () => {
  const encodedStr = base64.encode('chill:justchill');
  const decodedStr = base64.decode('Y2hpbGw6anVzdGNoaWxs');

  describe('base64 encode', () => {
    it('should return a string', () => {
      assert.typeOf(encodedStr, 'string');
    });

    it('should return base64 encoded string', () => {
      assert.strictEqual(encodedStr, 'Y2hpbGw6anVzdGNoaWxs');
    });
  });

  describe('base64 decode', () => {
    it('should return a string', () => {
      assert.typeOf(decodedStr, 'string');
    });

    it('should return ascii string', () => {
      assert.strictEqual(decodedStr, 'chill:justchill');
    });
  });
});
