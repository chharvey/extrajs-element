import {dev_HTMLMetaElement} from '../dev.d'
import {ValueArg} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * Wrapper for HTML `meta` element.
 * @see https://www.w3.org/TR/html52/document-metadata.html#htmlmetaelement
 */
export default class xjs_HTMLMetaElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLMetaElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLMetaElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLMetaElement { return <dev_HTMLMetaElement>super.node }

  /**
   * @summary Reflect the `name` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-name
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  name(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('name', val, this_arg)
  }

  /**
   * @summary Reflect the `content` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-content
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  content(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('content', val, this_arg)
  }
}