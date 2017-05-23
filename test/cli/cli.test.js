import shell from 'shelljs';
import { assert } from 'chai';
import pkg from '../../package.json';

describe('cli', () => {
  describe('--version', () => {
    it('should print the chill cli version', () => {
      let result = shell.exec('bin/chill --version', { silent: true }).stdout.trim();
      let expected = `chill ${pkg.version}`;

      assert.equal(result, expected);
    });
  });

  describe('--help', () => {
    it('should print the chill usage help string', () => {
      let result = shell.exec('bin/chill --help', { silent: true }).stdout.trim();

      assert.include(result, 'Usage: chill');
      assert.include(result, 'Options:');
      assert.include(result, '--help');
      assert.include(result, '--version');
      assert.include(result, '--config');
    });
  });
});
