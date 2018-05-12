const fs = require('fs')
const util = require('util')

const jsdom = require('jsdom')

const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `template` element.
 * @see https://www.w3.org/TR/html52/semantics-scripting.html#htmltemplateelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLTemplateElement = class extends xjs.HTMLElement {
  /**
   * @summary A rendering function.
   * @description This function’s signature must be `(DocumentFragment, *, !Object) => undefined`.
   * Its arguments MUST be (1) a document fragment, (2) any data, and (3) any rendering options.
   * it may optionally modify the fragment using the data.
   * It SHOULD NOT have a `this` context, and it SHOULD NOT have a return value.
   * If this function does have a `this` context, a `this_arg` may be passed to
   * {@link xjs.HTMLTemplateElement#render}.
   * Any return value of the function does nothing.
   * @typedef {function} xjs.HTMLTemplateElement~RenderingFunction
   * @param   {DocumentFragment} frag the template content with which to render
   * @param   {*} data the data to fill the template upon rendering
   * @param   {!Object=} options additional rendering options
   */

  /**
   * @summary Construct a new xjs.HTMLTemplateElement object.
   * @param {HTMLTemplateElement} node the node to wrap
   */
  constructor(node) {
    super(node)

    /**
     * @summary The default rendering function added to this wrapper.
     * @private
     * @type {xjs.HTMLTemplateElement~RenderingFunction}
     */
    this._renderer = (f,d,o) => {}
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLTemplateElement}
   */
  get node() { return super.node }

  /**
   * @summary Return the `<template>` element’s template contents.
   * @see https://www.w3.org/TR/html52/semantics-scripting.html#dom-htmltemplateelement-content
   * @returns {DocumentFragment} this element’s template contents
   */
  content() { return this.node.content }


  /**
   * @summary Set this template’s rendering function.
   * @param   {xjs.HTMLTemplateElement~RenderingFunction} renderer modifies the template by filling it in with data
   * @returns {xjs.HTMLTemplateElement} `this`
   */
  setRenderer(renderer) {
    this._renderer = renderer
    return this
  }

  /**
   * @summary Render this template with some data.
   * @param   {*=} data the data to fill
   * @param   {?Object=} this_arg a `this` context, if any, in which a {@link xjs.HTMLTemplateElement~RenderingFunction} is called
   * @param   {!Object=} options additional rendering options
   * @todo WARNING: in the next breaking release (v5), the order of params will be: `data`, `options`, `this_arg`
   * @returns {DocumentFragment} the rendered output
   */
  render(data, this_arg = null, options = {}) {
    let frag = this.content().cloneNode(true)
    this._renderer.call(this_arg, frag, data, options)
    return frag
  }


  /**
   * @summary Read an HTML file and return the first `<template>` element found while walking the DOM tree.
   * @description The `<template>` element will be wrapped in an `xjs.HTMLTemplate` object.
   * To access the actual element, call {@link xjs.HTMLTemplateElement#node}.
   * @param   {string} filepath the path to the file
   * @returns {xjs.HTMLTemplateElement} the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static async fromFile(filepath) {
    let data = await util.promisify(fs.readFile)(filepath, 'utf8')
    return xjs.HTMLTemplateElement._fromFile_process(filepath, data)
  }
  /**
   * @summary Synchronous version of {@link xjs.HTMLTemplateElement.fromFile}.
   * @param   {string} filepath the path to the file
   * @returns {xjs.HTMLTemplateElement} the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static fromFileSync(filepath) {
    let data = fs.readFileSync(filepath, 'utf8')
    return xjs.HTMLTemplateElement._fromFile_process(filepath, data)
  }
  /**
   * @summary Internall processing for {@link xjs.HTMLTemplateElement.fromFile|.fromFile{,Sync}}.
   * @private
   * @param   {string} filepath the path to the file
   * @param   {string} data the result of fs.readFile{,Sync}
   * @returns {xjs.HTMLTemplateElement} the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static _fromFile_process(filepath, data) {
    let elem = jsdom.JSDOM.fragment(data).querySelector('template')
    if (elem === null) {
      throw new ReferenceError(`No template element was found in file: ${filepath}`)
    }
    return new xjs.HTMLTemplateElement(elem)
  }
}

module.exports = xjs.HTMLTemplateElement