/* global emisys */
/*
 * Provide the global variable injected in the system by posapp.
 */

let handler = {
  get(target, prop) {
    return typeof emisys === 'object' ? emisys[prop] : undefined;
  },
};
let emisysProxy = new Proxy({}, handler);

export default emisysProxy;
