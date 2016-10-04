var expect = require('chai').expect;

describe('the plugin', function() {
  it('works', function() {
    var P = require('parse-english');
    var p = new P;
    var plugin = require('..');
    var inspect = require('unist-util-inspect');
    p.use('tokenizeRoot', plugin);
    var tree = p.parse('Mr. Henry Brown: A hapless but friendly City of London worker.\n \n I am testing.');
    console.log(inspect(tree));
    expect(tree.children.length).to.equal(3); //two paragraph nodes with a whitespace node in b/w
  });
});
