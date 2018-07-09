import {dev_HTMLTimeElement} from '../dev.d'
import {ValueArg} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * Wrapper for HTML `time` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#htmltimeelement
 */
export default class xjs_HTMLTimeElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLTimeElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTimeElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLTimeElement { return <dev_HTMLTimeElement>super.node }

  /**
   * @summary Reflect the `datetime` content attribute.
   * @description This method accepts {@link Date} objects when setting. When getting, it will always return a string.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmltimeelement-datetime
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  dateTime(val?: (ValueArg|Date), this_arg: any = this): (this|string|null) {
    return this.attr('datetime', (val instanceof Date) ? val.toISOString() : val, this_arg)
  }
}