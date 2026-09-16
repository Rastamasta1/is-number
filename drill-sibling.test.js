/*!
 * DRILL REVERTED 2026-09-16: the whitespace change of drill 1512ac5a is undone;
 * this test now pins upstream behaviour.
 */

'use strict';

require('mocha');
var assert = require('assert');
var isNumber = require('./');

describe('whitespace-padded strings (drill reverted)', function() {
  it('isNumber(\'   56\') should be true', function() {
    assert.strictEqual(isNumber('   56'), true);
  });

  it('isNumber(\'56\') should be true', function() {
    assert.strictEqual(isNumber('56'), true);
  });

  it('isNumber(56) should be true', function() {
    assert.strictEqual(isNumber(56), true);
  });
});
