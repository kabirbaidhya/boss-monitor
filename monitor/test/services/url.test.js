import { assert, expect } from 'chai';

import * as url from '../../src/utils/url';

describe('url.parse', () => {
  it('should return parsed url as URL object if valid url is passed', () => {
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

  it('should throw error when invalid url is passed', () => {
    expect(() => url.parse(null)).to.throw('Invalid URL');
    expect(() => url.parse(undefined)).to.throw('Invalid URL');
    expect(() => url.parse('')).to.throw('Invalid URL');
  });
});
