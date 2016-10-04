/**
 * @author Tim Allen // Thanks to Titus Woormer
 * @license MIT
 * @fileoverview Split paragraphs even if blank line has \t or ' ' on it.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');
var EXPRESSION_MULTI_NEW_LINE_WS = /^(\r?\n|\r\w?){2,}$/

/* Expose. */
module.exports = modifyChildren(breakParagraphs);

/**
 * Break a paragraph if a white space with more
 * than one new-line is found between sentences.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 */
function breakParagraphs(child, index, parent) {
  var children;
  var position;
  var length;
  var tail;
  var head;
  var end;
  var insertion;
  var node;

  if (child.type !== 'ParagraphNode') {
    return;
  }

  children = child.children;

  /* Ignore first and last child. */
  length = children.length - 1;
  position = 0;

  while (++position < length) {
    node = children[position];

    if (
      node.type !== 'WhiteSpaceNode' ||
      !/^(\r?\n\s?|\r\s?){2,}$/.test(nlcstToString(node))
    ) {
      continue;
    }

    child.children = children.slice(0, position);

    insertion = {
      type: 'ParagraphNode',
      children: children.slice(position + 1)
    };

    tail = children[position - 1];
    head = children[position + 1];

    parent.children.splice(index + 1, 0, node, insertion);

    if (child.position && tail.position && head.position) {
      end = child.position.end;

      child.position.end = tail.position.end;

      insertion.position = {
        start: head.position.start,
        end: end
      };
    }

    return index + 1;
  }
};
