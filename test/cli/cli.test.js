import shell from 'shelljs';
import { assert } from 'chai';
import pkg from '../../package.json';

describe('cli', () => {
  shell.fatal = true;

  describe('--version', () => {
    it('should print the chill cli version', () => {
      let { stdout } = shell.exec('bin/chill --version', { fatal: true });
      let expected = `chill ${pkg.version}`;

      assert.equal(stdout.trim(), expected);
    });
  });

  describe('--help', () => {
    it('should print the chill usage help string', () => {
      let { stdout } = shell.exec('bin/chill --help', { fatal: true });
      let result = stdout.trim();

      assert.include(result, 'Usage: chill');
      assert.include(result, 'Options:');
      assert.include(result, '--help');
      assert.include(result, '--version');
      assert.include(result, '--config');
    });
  });
});
