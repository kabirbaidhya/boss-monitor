import { assert } from 'chai';

import { isSame } from '../../src/utils/common';

describe('common.isEqual', () => {
  it('should return true if same argument value are passed', () => {
    const date = new Date();

    assert.equal(isSame({}, {}), true);
    assert.equal(isSame({ a: '' }, { a: '' }), true);
    assert.equal(isSame({ a: date }, { a: date }), true);
    assert.equal(isSame({ a: 1234 }, { a: 1234 }), true);
    assert.equal(isSame({ a: 'hello' }, { a: 'hello' }), true);
    assert.equal(
      isSame({ a: null, b: { c: null } }, { a: null, b: { c: null } }),
      true
    );
    assert.equal(
      isSame({ a: null, b: { c: 123 } }, { a: null, b: { c: 123 } }),
      true
    );
    assert.equal(
      isSame({ a: null, b: { c: date } }, { a: null, b: { c: date } }),
      true
    );
    assert.equal(
      isSame({ a: null, b: { c: false } }, { a: null, b: { c: false } }),
      true
    );
    assert.equal(
      isSame(
        { a: null, b: { c: 'hello world' } },
        { a: null, b: { c: 'hello world' } }
      ),
      true
    );
  });

  it('should return false if different argument value are passed', () => {
    const date = new Date();
    const oldDate = new Date('Wed Mar 20 2019 16:02:52 GMT+0545');

    assert.equal(isSame({}, { a: '' }), false);
    assert.equal(isSame({ a: '' }, { a: date }), false);
    assert.equal(isSame({ a: 1234 }, { a: date }), false);
    assert.equal(isSame({ a: date }, { a: oldDate }), false);
    assert.equal(isSame({ a: 'hello' }, { a: 'world' }), false);
    assert.equal(
      isSame(
        { a: null, b: { c: null } },
        { a: null, b: { c: 'should not match' } }
      ),
      false
    );
    assert.equal(
      isSame({ a: null, b: { c: 123 } }, { a: null, b: { c: 7645 } }),
      false
    );
    assert.equal(
      isSame({ a: null, b: { c: date } }, { a: null, b: { c: oldDate } }),
      false
    );
    assert.equal(
      isSame({ a: null, b: { c: false } }, { a: null, b: { c: true } }),
      false
    );
    assert.equal(
      isSame(
        { a: null, b: { c: 'hello world' } },
        { a: null, b: { c: undefined } }
      ),
      false
    );
  });

  it('should return true when equal circular objects are passed', () => {
    const a = {};
    const b = {};

    a.c = a;
    b.c = b;

    assert.equal(isSame(a, b), true);
  });


  it('should return true if object\'s key order is not same.', () => {
    assert.equal(
      isSame({ b: null, a: { c: false } }, { a: { c: false }, b: null }),
      true
    );
  });
});
