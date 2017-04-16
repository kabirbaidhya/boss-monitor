import sinon from 'sinon';
import { assert } from 'chai';
import config from '../../src/config/config';
import * as slack from '../../src/services/slack';


describe('slack.isEnabled', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return true if slack notification is enabled.', () => {
    sandbox.stub(config.notifications, 'slack', {
      enabled: true,
      endpoint: 'foo'
    });

    assert.isTrue(slack.isEnabled());
  });

  it('should return false if slack notification is not enabled.', () => {
    sandbox.stub(config.notifications, 'slack', { enabled: false });

    assert.isFalse(slack.isEnabled());
  });
});
