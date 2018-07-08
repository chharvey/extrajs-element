// <https://github.com/Microsoft/TypeScript/issues/21150>
declare interface dev_HTMLLinkElement extends HTMLLinkElement {
  after      (...nodes: (Node|string)[]): void;
  before     (...nodes: (Node|string)[]): void;
  replaceWith(...nodes: (Node|string)[]): void;
}

export {dev_HTMLLinkElement}
