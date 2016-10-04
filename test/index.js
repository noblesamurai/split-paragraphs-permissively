var expect = require('chai').expect;

describe('the plugin', function() {
  it('accepts a space between two newlines', function() {
    var P = require('parse-english');
    var p = new P;
    var plugin = require('..');
    var inspect = require('unist-util-inspect');
    p.use('tokenizeRoot', plugin);
    var tree = p.parse('Mr. Henry Brown: A hapless but friendly City of London worker.\n \n I am testing.');
    console.log(inspect(tree));
    expect(tree.children.length).to.equal(3); //two paragraph nodes with a whitespace node in b/w
  });
  it('accepts a space at the end/start of a sentence', function() {
    var P = require('parse-english');
    var p = new P;
    var plugin = require('..');
    var inspect = require('unist-util-inspect');
    p.use('tokenizeRoot', plugin);
    var tree = p.parse('Mr. Henry Brown: A hapless but friendly City of London worker. \n\n I am testing.');
    console.log(inspect(tree));
    expect(tree.children.length).to.equal(3); //two paragraph nodes with a whitespace node in b/w
  });
  it('accepts multiple spaces at the end of a sentence', function() {
    var P = require('parse-english');
    var p = new P;
    var plugin = require('..');
    var inspect = require('unist-util-inspect');
    p.use('tokenizeRoot', plugin);
    var tree = p.parse('Mr. Henry Brown: A hapless but friendly City of London worker.   \n\n I am testing.');
    console.log(inspect(tree));
    expect(tree.children.length).to.equal(3); //two paragraph nodes with a whitespace node in b/w
  });
  it('accepts multiple spaces at the start of a sentence', function() {
    var P = require('parse-english');
    var p = new P;
    var plugin = require('..');
    var inspect = require('unist-util-inspect');
    p.use('tokenizeRoot', plugin);
    var tree = p.parse('Mr. Henry Brown: A hapless but friendly City of London worker.\n\n  I am testing.');
    console.log(inspect(tree));
    expect(tree.children.length).to.equal(3); //two paragraph nodes with a whitespace node in b/w
  });
  it('handles multiple paragraphs', function() {
    var P = require('parse-english');
    var p = new P;
    var plugin = require('..');
    var inspect = require('unist-util-inspect');
    p.use('tokenizeRoot', plugin);
    var tree = p.parse('Mr. Henry Brown: A hapless but friendly City of London worker.\n\n  I am testing.\n\nI am testing.');
    console.log(inspect(tree));
    expect(tree.children.length).to.equal(5); //three paragraph nodes with two whitespace nodes in b/w
  });
});
