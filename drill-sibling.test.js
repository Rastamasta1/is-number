/*!
 * DRILL 2026-09-16: this test pins the change that makes test.js issue#3 fail on purpose;
 * the merge gate is expected to refuse the branch by name.
 */

'use strict';

require('mocha');
var assert = require('assert');
var isNumber = require('./');

describe('whitespace-padded strings (drill)', function() {
  it('isNumber(\'   56\') should be false', function() {
    assert.strictEqual(isNumber('   56'), false);
  });

  it('isNumber(\'56\') should be true', function() {
    assert.strictEqual(isNumber('56'), true);
  });

  it('isNumber(56) should be true', function() {
    assert.strictEqual(isNumber(56), true);
  });
});
