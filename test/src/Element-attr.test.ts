import * as jsdom from 'jsdom'

import * as xjs from '../../index'
import {ValueFunction} from '../../src/class/Element.class'
import test from './test'


let x: xjs.Element = new xjs.Element(jsdom.JSDOM.fragment('<span></span>').querySelector('span') !)

export default Promise.all([
	test(x.outerHTML(), '<span></span>')
		// set an attribute to a string
		.then(() => test(x.attr('attr1', 'val1').outerHTML(), '<span attr1="val1"></span>'))
		.then(() => test(x.attr('attr1') !                  , 'val1'))
		// add a boolean attribute
		.then(() => test(x.attr('attr2', '').outerHTML()    , '<span attr1="val1" attr2=""></span>'))
		.then(() => test(x.attr('attr2') !                  , ''))
		// remove an attribute
		.then(() => test(x.attr('attr2', null).outerHTML()  , '<span attr1="val1"></span>'))
		.then(() => test(`${x.attr('attr2')}`               , 'null'))
		// set an attribute to the string `'null'`
		.then(() => test(x.attr('attr2', 'null').outerHTML(), '<span attr1="val1" attr2="null"></span>'))
		.then(() => test(x.attr('attr2') !                  , 'null'))
		// set an attribute using a function
		.then(() => test(x.attr('attr3', function () { return this.attr('attr1') }).outerHTML(), '<span attr1="val1" attr2="null" attr3="val1"></span>'))
		.then(() => test((() => {
			let valueFn: ValueFunction = function (this: xjs.Element) { return this.attr('attr2') }
			return x.attr('attr3', valueFn).outerHTML()
		})(), '<span attr1="val1" attr2="null" attr3="null"></span>'))
		// call `attr()` with an object
		.then(() => test(x.attr({ attr1: 'string', attr2: 42, attr3: true }).outerHTML(), '<span attr1="string" attr2="42" attr3="true"></span>'))
		.then(() => test(x.attr({ attr1: null }).outerHTML()                            , '<span attr2="42" attr3="true"></span>'))
		// call `attr()` with no args, `null`, or an empty object `{}`
		.then(() => test(x.attr(    ).outerHTML()                                       , '<span attr2="42" attr3="true"></span>'))
		.then(() => test(x.attr(null).outerHTML()                                       , '<span attr2="42" attr3="true"></span>'))
		.then(() => test(x.attr({}  ).outerHTML()                                       , '<span attr2="42" attr3="true"></span>'))
		// fail to call `attr()` with `''`
		.then(() => test((() => {
			try {
				return x.attr('') !
			} catch (e) {
				return e.name
			}
		})(), 'RangeError'))
		// fail to call `attr()` with `NaN`
		.then(() => test((() => {
			try {
				return x.attr('foo', NaN).attr('foo') !
			} catch (e) {
				return e.name
			}
		})(), 'NaNError'))
])
