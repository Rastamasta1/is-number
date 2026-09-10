/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('package.json exports', function() {
  var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

  it('should have an "exports" field', function() {
    assert(pkg.exports, 'expected package.json to have an "exports" field');
  });

  it('should map "." to "./index.js"', function() {
    assert.strictEqual(pkg.exports['.'], './index.js');
  });

  it('should map "./package.json" to "./package.json"', function() {
    assert.strictEqual(pkg.exports['./package.json'], './package.json');
  });

  it('should leave "main" as "index.js"', function() {
    assert.strictEqual(pkg.main, 'index.js');
  });

  it('should have a "types" field pointing at "./index.d.ts"', function() {
    assert.strictEqual(pkg.types, './index.d.ts');
  });

  it('should include "index.d.ts" in the "files" array', function() {
    assert(pkg.files.indexOf('index.d.ts') !== -1, 'expected "files" to include "index.d.ts"');
  });
});

describe('index.d.ts', function() {
  it('should exist on disk', function() {
    assert(fs.existsSync(path.join(__dirname, 'index.d.ts')), 'expected index.d.ts to exist');
  });

  it('should declare a function returning boolean', function() {
    var dts = fs.readFileSync(path.join(__dirname, 'index.d.ts'), 'utf8');
    assert(/:\s*boolean/.test(dts), 'expected index.d.ts to declare a boolean return type');
  });
});

describe('advertised paths are shipped', function() {
  var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

  function collectAdvertisedPaths(pkg) {
    var paths = [];
    if (typeof pkg.main === 'string') paths.push(pkg.main);
    if (typeof pkg.types === 'string') paths.push(pkg.types);
    if (pkg.exports && typeof pkg.exports === 'object') {
      Object.keys(pkg.exports).forEach(function(key) {
        var value = pkg.exports[key];
        if (typeof value === 'string' && value !== './package.json') {
          paths.push(value);
        }
      });
    }
    return paths;
  }

  function normalize(p) {
    return p.replace(/^\.\//, '');
  }

  var advertised = collectAdvertisedPaths(pkg);

  advertised.forEach(function(advertisedPath) {
    var normalized = normalize(advertisedPath);

    it('"' + advertisedPath + '" should exist on disk', function() {
      assert(fs.existsSync(path.join(__dirname, normalized)), 'expected "' + advertisedPath + '" to exist on disk');
    });

    it('"' + advertisedPath + '" should be covered by "files"', function() {
      assert(pkg.files.indexOf(normalized) !== -1, 'expected "files" to cover "' + advertisedPath + '"');
    });
  });
});
