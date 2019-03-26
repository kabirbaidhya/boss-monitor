import { assert, expect } from 'chai';

import * as url from '../../src/utils/url';

describe('url.parse', () => {
  it('would return parsed url into URL object if it url is valid.', () => {
    assert.deepEqual(url.parse('https://lftechnology.com:8000'), {
      protocol: 'https:',
      host: 'lftechnology.com',
      port: '8000',
      href: 'https://lftechnology.com:8000/'
    });

    assert.deepEqual(url.parse('https://lftechnology.com'), {
      protocol: 'https:',
      host: 'lftechnology.com',
      port: '',
      href: 'https://lftechnology.com/'
    });
  });

  it('would throw error if it url is invalid.', () => {
    expect(() => url.parse(null)).to.throw('Invalid URL');
    expect(() => url.parse(undefined)).to.throw('Invalid URL');
    expect(() => url.parse('')).to.throw('Invalid URL');
  });
});
