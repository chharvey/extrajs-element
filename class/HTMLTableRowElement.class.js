const xjs = {
  DocumentFragment: require('./DocumentFragment.class.js'),
  HTMLElement: require('./HTMLElement.class.js'),
  HTMLTemplateElement: require('./HTMLTemplateElement.class.js'),
}


/**
 * Wrapper for HTML `tr` element.
 * @see https://www.w3.org/TR/html/tabular-data.html#htmltablerowelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLTableRowElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLTableRowElement object.
   * @version EXPERIMENTAL
   * @param {HTMLTableRowElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLTableRowElement}
   */
  get node() { return super.node }

  /**
   * @summary Populate this list with items containing data.
   * @description This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<tr>` element must have
   * a `<template>` child, which in turn has a single child that is an `<td>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<td>` children; they are not affected.
   *
   * @example
   * let {document} = new jsdom.JSDOM(`
   * <table>
   *   <tbody>
   *     <tr>
   *       <template>
   *         <td>
   *           <a href="{{ url }}">{{ text }}</a>
   *         </td>
   *       </template>
   *     </tr>
   *   </tbody>
   * <table>
   * `).window
   * let data = [
   *   { "url": "#0", "text": "Career Connections" },
   *   { "url": "#1", "text": "Getting Licensed & Certified" },
   *   { "url": "#2", "text": "Career resources" },
   *   { "url": "#3", "text": "Code of Ethics" }
   * ]
   * new xjs.HTMLTableRowElement(document.querySelector('tr'))
   *   .populate(data, function (f, d) {
   *     f.querySelector('a').href        = d.url
   *     f.querySelector('a').textContent = d.text
   *   })
   * new xjs.HTMLTableRowElement(document.querySelector('tr'))
   *  .populate(data, function (f, d) {
   *    // some code involving `this`
   *  }, other_context)
   *
   * @param   {Array} dataset any array of things
   * @param   {xjs.HTMLTemplateElement~RenderingFunction=} renderer a typical rendering function
   * @param   {?Object=} this_arg provide a `this` context to the rendering function
   * @param   {!Object=} options additional rendering options for all items
   * @todo WARNING: in the next breaking release (v5), the order of params will be: `dataset`, `renderer`, `options`, `this_arg`
   * @todo WARNING: in the next breaking release (v5), param `renderer` will be required
   * @returns {xjs.HTMLTableRowElement} `this`
   * @throws  {ReferenceError} if this `<tr>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<td>`.
   */
  populate(dataset, renderer = (f,d,o) => {}, this_arg = this, options = {}) {
    let template = this.node.querySelector('template')
    if (template===null) {
      throw new ReferenceError('This <tr> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('td')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be a <td>.')
    }
    let component = new xjs.HTMLTemplateElement(template).setRenderer(renderer)
    return this.append(...dataset.map((data) => component.render(data, this_arg, options))) // TODO: in the next breaking release, fix order of params
  }
}

module.exports = xjs.HTMLTableSectionElement