// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/object-assign/index.js":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};
},{}],"../node_modules/fbjs/lib/invariant.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ('development' !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],"../node_modules/fbjs/lib/emptyObject.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyObject = {};

if ('development' !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
},{}],"../node_modules/fbjs/lib/emptyFunction.js":[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],"../node_modules/fbjs/lib/warning.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ('development' !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
},{"./emptyFunction":"../node_modules/fbjs/lib/emptyFunction.js"}],"../node_modules/prop-types/lib/ReactPropTypesSecret.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],"../node_modules/prop-types/checkPropTypes.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var printWarning = function () {};

if ('development' !== 'production') {
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};

  printWarning = function (text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if ('development' !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}

module.exports = checkPropTypes;
},{"./lib/ReactPropTypesSecret":"../node_modules/prop-types/lib/ReactPropTypesSecret.js"}],"../node_modules/react/cjs/react.development.js":[function(require,module,exports) {
/** @license React v16.4.1
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if ('development' !== "production") {
  (function () {
    'use strict';

    var _assign = require('object-assign');
    var invariant = require('fbjs/lib/invariant');
    var emptyObject = require('fbjs/lib/emptyObject');
    var warning = require('fbjs/lib/warning');
    var emptyFunction = require('fbjs/lib/emptyFunction');
    var checkPropTypes = require('prop-types/checkPropTypes');

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.4.1';

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    // Relying on the `invariant()` implementation lets us
    // have preserve the format and params in the www builds.

    // Exports ReactDOM.createRoot


    // Experimental error-boundary API that can recover from errors within a single
    // render phase

    // Suspense
    var enableSuspense = false;
    // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:


    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.


    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


    // Warn about legacy context API


    // Gather advanced timing metrics for Profiler subtrees.


    // Only used in www builds.

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function () {};

    {
      var printWarning = function (format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function (condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }
        warning(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function (publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function (publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function (publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    Component.prototype.setState = function (partialState, callback) {
      !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function (methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function () {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;

    /**
     * Convenience component with default shallow equality check for sCU.
     */
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;

    // an immutable object with a single mutable value
    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    var specialPropKeyWarningShown = void 0;
    var specialPropRefWarningShown = void 0;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function () {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function () {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */
    function createElement(type, config, children) {
      var propName = void 0;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    }

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */
    function cloneElement(element, config, children) {
      !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

      var propName = void 0;

      // Original props are copied
      var props = _assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps = void 0;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }

    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};

    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }
        }
      }

      if (invokeCallback) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child = void 0;
      var nextName = void 0;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
              didWarnAboutMaps = true;
            }
          }

          var iterator = iteratorFn.call(children);
          var step = void 0;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (typeof component === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrencount
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        _defaultValue: defaultValue,
        _currentValue: defaultValue,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue2: defaultValue,
        _changedBits: 0,
        _changedBits2: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };

      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      context.Consumer = context;

      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }

      return context;
    }

    function forwardRef(render) {
      {
        !(typeof render === 'function') ? warning(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render) : void 0;

        if (render != null) {
          !(render.defaultProps == null && render.propTypes == null) ? warning(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
        }
      }

      return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
    }

    var describeComponentFrame = function (name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' ||
      // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
    }

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      if (typeof type === 'string') {
        return type;
      }
      switch (type) {
        case REACT_ASYNC_MODE_TYPE:
          return 'AsyncMode';
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';
        case REACT_FRAGMENT_TYPE:
          return 'ReactFragment';
        case REACT_PORTAL_TYPE:
          return 'ReactPortal';
        case REACT_PROFILER_TYPE:
          return 'Profiler(' + fiber.pendingProps.id + ')';
        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';
        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';
        case REACT_TIMEOUT_TYPE:
          return 'Timeout';
      }
      if (typeof type === 'object' && type !== null) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            var functionName = type.render.displayName || type.render.name || '';
            return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        }
      }
      return null;
    }

    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */

    var currentlyValidatingElement = void 0;
    var propTypesMisspellWarningShown = void 0;

    var getDisplayName = function () {};
    var getStackAddendum = function () {};

    {
      currentlyValidatingElement = null;

      propTypesMisspellWarningShown = false;

      getDisplayName = function (element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        }

        var type = element.type;
        if (type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else if (typeof type === 'object' && type !== null && type.$$typeof === REACT_FORWARD_REF_TYPE) {
          var functionName = type.render.displayName || type.render.name || '';
          return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        } else {
          return type.displayName || type.name || 'Unknown';
        }
      };

      getStackAddendum = function () {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;

      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if (typeof node !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step = void 0;
            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var type = element.type;
      var name = void 0,
          propTypes = void 0;
      if (typeof type === 'function') {
        // Class or functional component
        name = type.displayName || type.name;
        propTypes = type.propTypes;
      } else if (typeof type === 'object' && type !== null && type.$$typeof === REACT_FORWARD_REF_TYPE) {
        // ForwardRef
        var functionName = type.render.displayName || type.render.name || '';
        name = functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        propTypes = type.propTypes;
      } else {
        return;
      }
      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }
      if (typeof type.getDefaultProps === 'function') {
        !type.getDefaultProps.isReactClassApproved ? warning(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
      }
    }

    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */
    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;

      var keys = Object.keys(fragment.props);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key !== 'children' && key !== 'key') {
          warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
          break;
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type);

      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      if (!validType) {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';

        var typeString = void 0;
        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else {
          typeString = typeof type;
        }

        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = createElement.apply(this, arguments);

      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }

      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)
      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type;
      // Legacy hook: remove it
      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }

      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },

      createRef: createRef,
      Component: Component,
      PureComponent: PureComponent,

      createContext: createContext,
      forwardRef: forwardRef,

      Fragment: REACT_FRAGMENT_TYPE,
      StrictMode: REACT_STRICT_MODE_TYPE,
      unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
      unstable_Profiler: REACT_PROFILER_TYPE,

      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,

      version: ReactVersion,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };

    if (enableSuspense) {
      React.Timeout = REACT_TIMEOUT_TYPE;
    }

    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }

    var React$2 = Object.freeze({
      default: React
    });

    var React$3 = React$2 && React || React$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var react = React$3.default ? React$3.default : React$3;

    module.exports = react;
  })();
}
},{"object-assign":"../node_modules/object-assign/index.js","fbjs/lib/invariant":"../node_modules/fbjs/lib/invariant.js","fbjs/lib/emptyObject":"../node_modules/fbjs/lib/emptyObject.js","fbjs/lib/warning":"../node_modules/fbjs/lib/warning.js","fbjs/lib/emptyFunction":"../node_modules/fbjs/lib/emptyFunction.js","prop-types/checkPropTypes":"../node_modules/prop-types/checkPropTypes.js"}],"../node_modules/react/index.js":[function(require,module,exports) {
'use strict';

if ('development' === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.development.js":"../node_modules/react/cjs/react.development.js"}],"../node_modules/fbjs/lib/ExecutionEnvironment.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;
},{}],"../node_modules/fbjs/lib/getActiveElement.js":[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;
},{}],"../node_modules/fbjs/lib/shallowEqual.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],"../node_modules/fbjs/lib/isNode.js":[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;
},{}],"../node_modules/fbjs/lib/isTextNode.js":[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = require('./isNode');

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;
},{"./isNode":"../node_modules/fbjs/lib/isNode.js"}],"../node_modules/fbjs/lib/containsNode.js":[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = require('./isTextNode');

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;
},{"./isTextNode":"../node_modules/fbjs/lib/isTextNode.js"}],"../node_modules/fbjs/lib/hyphenate.js":[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;
},{}],"../node_modules/fbjs/lib/hyphenateStyleName.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

'use strict';

var hyphenate = require('./hyphenate');

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;
},{"./hyphenate":"../node_modules/fbjs/lib/hyphenate.js"}],"../node_modules/fbjs/lib/camelize.js":[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;
},{}],"../node_modules/fbjs/lib/camelizeStyleName.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

'use strict';

var camelize = require('./camelize');

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;
},{"./camelize":"../node_modules/fbjs/lib/camelize.js"}],"../node_modules/react-dom/cjs/react-dom.development.js":[function(require,module,exports) {
/** @license React v16.4.1
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if ('development' !== "production") {
  (function () {
    'use strict';

    var invariant = require('fbjs/lib/invariant');
    var React = require('react');
    var warning = require('fbjs/lib/warning');
    var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
    var _assign = require('object-assign');
    var emptyFunction = require('fbjs/lib/emptyFunction');
    var checkPropTypes = require('prop-types/checkPropTypes');
    var getActiveElement = require('fbjs/lib/getActiveElement');
    var shallowEqual = require('fbjs/lib/shallowEqual');
    var containsNode = require('fbjs/lib/containsNode');
    var emptyObject = require('fbjs/lib/emptyObject');
    var hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');
    var camelizeStyleName = require('fbjs/lib/camelizeStyleName');

    // Relying on the `invariant()` implementation lets us
    // have preserve the format and params in the www builds.

    !React ? invariant(false, 'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.') : void 0;

    var invokeGuardedCallback = function (name, func, context, a, b, c, d, e, f) {
      this._hasCaughtError = false;
      this._caughtError = null;
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      try {
        func.apply(context, funcArgs);
      } catch (error) {
        this._caughtError = error;
        this._hasCaughtError = true;
      }
    };

    {
      // In DEV mode, we swap out invokeGuardedCallback for a special version
      // that plays more nicely with the browser's DevTools. The idea is to preserve
      // "Pause on exceptions" behavior. Because React wraps all user-provided
      // functions in invokeGuardedCallback, and the production version of
      // invokeGuardedCallback uses a try-catch, all user exceptions are treated
      // like caught exceptions, and the DevTools won't pause unless the developer
      // takes the extra step of enabling pause on caught exceptions. This is
      // untintuitive, though, because even though React has caught the error, from
      // the developer's perspective, the error is uncaught.
      //
      // To preserve the expected "Pause on exceptions" behavior, we don't use a
      // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
      // DOM node, and call the user-provided callback from inside an event handler
      // for that fake event. If the callback throws, the error is "captured" using
      // a global event handler. But because the error happens in a different
      // event loop context, it does not interrupt the normal program flow.
      // Effectively, this gives us try-catch behavior without actually using
      // try-catch. Neat!

      // Check that the browser supports the APIs we need to implement our special
      // DEV version of invokeGuardedCallback
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');

        var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
          // If document doesn't exist we know for sure we will crash in this method
          // when we call document.createEvent(). However this can cause confusing
          // errors: https://github.com/facebookincubator/create-react-app/issues/3482
          // So we preemptively throw with a better message instead.
          !(typeof document !== 'undefined') ? invariant(false, 'The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.') : void 0;
          var evt = document.createEvent('Event');

          // Keeps track of whether the user-provided callback threw an error. We
          // set this to true at the beginning, then set it to false right after
          // calling the function. If the function errors, `didError` will never be
          // set to false. This strategy works even if the browser is flaky and
          // fails to call our global error handler, because it doesn't rely on
          // the error event at all.
          var didError = true;

          // Create an event handler for our fake event. We will synchronously
          // dispatch our fake event using `dispatchEvent`. Inside the handler, we
          // call the user-provided callback.
          var funcArgs = Array.prototype.slice.call(arguments, 3);
          function callCallback() {
            // We immediately remove the callback from event listeners so that
            // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
            // nested call would trigger the fake event handlers of any call higher
            // in the stack.
            fakeNode.removeEventListener(evtType, callCallback, false);
            func.apply(context, funcArgs);
            didError = false;
          }

          // Create a global error event handler. We use this to capture the value
          // that was thrown. It's possible that this error handler will fire more
          // than once; for example, if non-React code also calls `dispatchEvent`
          // and a handler for that event throws. We should be resilient to most of
          // those cases. Even if our error event handler fires more than once, the
          // last error event is always used. If the callback actually does error,
          // we know that the last error event is the correct one, because it's not
          // possible for anything else to have happened in between our callback
          // erroring and the code that follows the `dispatchEvent` call below. If
          // the callback doesn't error, but the error event was fired, we know to
          // ignore it because `didError` will be false, as described above.
          var error = void 0;
          // Use this to track whether the error event is ever called.
          var didSetError = false;
          var isCrossOriginError = false;

          function onError(event) {
            error = event.error;
            didSetError = true;
            if (error === null && event.colno === 0 && event.lineno === 0) {
              isCrossOriginError = true;
            }
          }

          // Create a fake event type.
          var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

          // Attach our event handlers
          window.addEventListener('error', onError);
          fakeNode.addEventListener(evtType, callCallback, false);

          // Synchronously dispatch our fake event. If the user-provided function
          // errors, it will trigger our global error handler.
          evt.initEvent(evtType, false, false);
          fakeNode.dispatchEvent(evt);

          if (didError) {
            if (!didSetError) {
              // The callback errored, but the error event never fired.
              error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
            } else if (isCrossOriginError) {
              error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
            }
            this._hasCaughtError = true;
            this._caughtError = error;
          } else {
            this._hasCaughtError = false;
            this._caughtError = null;
          }

          // Remove our event listeners
          window.removeEventListener('error', onError);
        };

        invokeGuardedCallback = invokeGuardedCallbackDev;
      }
    }

    var invokeGuardedCallback$1 = invokeGuardedCallback;

    var ReactErrorUtils = {
      // Used by Fiber to simulate a try-catch.
      _caughtError: null,
      _hasCaughtError: false,

      // Used by event system to capture/rethrow the first error.
      _rethrowError: null,
      _hasRethrowError: false,

      /**
       * Call a function while guarding against errors that happens within it.
       * Returns an error if it throws, otherwise null.
       *
       * In production, this is implemented using a try-catch. The reason we don't
       * use a try-catch directly is so that we can swap out a different
       * implementation in DEV mode.
       *
       * @param {String} name of the guard to use for logging or debugging
       * @param {Function} func The function to invoke
       * @param {*} context The context to use when calling the function
       * @param {...*} args Arguments for function
       */
      invokeGuardedCallback: function (name, func, context, a, b, c, d, e, f) {
        invokeGuardedCallback$1.apply(ReactErrorUtils, arguments);
      },

      /**
       * Same as invokeGuardedCallback, but instead of returning an error, it stores
       * it in a global so it can be rethrown by `rethrowCaughtError` later.
       * TODO: See if _caughtError and _rethrowError can be unified.
       *
       * @param {String} name of the guard to use for logging or debugging
       * @param {Function} func The function to invoke
       * @param {*} context The context to use when calling the function
       * @param {...*} args Arguments for function
       */
      invokeGuardedCallbackAndCatchFirstError: function (name, func, context, a, b, c, d, e, f) {
        ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
        if (ReactErrorUtils.hasCaughtError()) {
          var error = ReactErrorUtils.clearCaughtError();
          if (!ReactErrorUtils._hasRethrowError) {
            ReactErrorUtils._hasRethrowError = true;
            ReactErrorUtils._rethrowError = error;
          }
        }
      },

      /**
       * During execution of guarded functions we will capture the first error which
       * we will rethrow to be handled by the top level error handler.
       */
      rethrowCaughtError: function () {
        return rethrowCaughtError.apply(ReactErrorUtils, arguments);
      },

      hasCaughtError: function () {
        return ReactErrorUtils._hasCaughtError;
      },

      clearCaughtError: function () {
        if (ReactErrorUtils._hasCaughtError) {
          var error = ReactErrorUtils._caughtError;
          ReactErrorUtils._caughtError = null;
          ReactErrorUtils._hasCaughtError = false;
          return error;
        } else {
          invariant(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
        }
      }
    };

    var rethrowCaughtError = function () {
      if (ReactErrorUtils._hasRethrowError) {
        var error = ReactErrorUtils._rethrowError;
        ReactErrorUtils._rethrowError = null;
        ReactErrorUtils._hasRethrowError = false;
        throw error;
      }
    };

    /**
     * Injectable ordering of event plugins.
     */
    var eventPluginOrder = null;

    /**
     * Injectable mapping from names to event plugin modules.
     */
    var namesToPlugins = {};

    /**
     * Recomputes the plugin list using the injected plugins and plugin ordering.
     *
     * @private
     */
    function recomputePluginOrdering() {
      if (!eventPluginOrder) {
        // Wait until an `eventPluginOrder` is injected.
        return;
      }
      for (var pluginName in namesToPlugins) {
        var pluginModule = namesToPlugins[pluginName];
        var pluginIndex = eventPluginOrder.indexOf(pluginName);
        !(pluginIndex > -1) ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
        if (plugins[pluginIndex]) {
          continue;
        }
        !pluginModule.extractEvents ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
        plugins[pluginIndex] = pluginModule;
        var publishedEvents = pluginModule.eventTypes;
        for (var eventName in publishedEvents) {
          !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
        }
      }
    }

    /**
     * Publishes an event so that it can be dispatched by the supplied plugin.
     *
     * @param {object} dispatchConfig Dispatch configuration for the event.
     * @param {object} PluginModule Plugin publishing the event.
     * @return {boolean} True if the event was successfully published.
     * @private
     */
    function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
      !!eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
      eventNameDispatchConfigs[eventName] = dispatchConfig;

      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
      if (phasedRegistrationNames) {
        for (var phaseName in phasedRegistrationNames) {
          if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
            var phasedRegistrationName = phasedRegistrationNames[phaseName];
            publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
          }
        }
        return true;
      } else if (dispatchConfig.registrationName) {
        publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
        return true;
      }
      return false;
    }

    /**
     * Publishes a registration name that is used to identify dispatched events.
     *
     * @param {string} registrationName Registration name to add.
     * @param {object} PluginModule Plugin publishing the event.
     * @private
     */
    function publishRegistrationName(registrationName, pluginModule, eventName) {
      !!registrationNameModules[registrationName] ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
      registrationNameModules[registrationName] = pluginModule;
      registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

      {
        var lowerCasedName = registrationName.toLowerCase();
        possibleRegistrationNames[lowerCasedName] = registrationName;

        if (registrationName === 'onDoubleClick') {
          possibleRegistrationNames.ondblclick = registrationName;
        }
      }
    }

    /**
     * Registers plugins so that they can extract and dispatch events.
     *
     * @see {EventPluginHub}
     */

    /**
     * Ordered list of injected plugins.
     */
    var plugins = [];

    /**
     * Mapping from event name to dispatch config
     */
    var eventNameDispatchConfigs = {};

    /**
     * Mapping from registration name to plugin module
     */
    var registrationNameModules = {};

    /**
     * Mapping from registration name to event name
     */
    var registrationNameDependencies = {};

    /**
     * Mapping from lowercase registration names to the properly cased version,
     * used to warn in the case of missing event handlers. Available
     * only in true.
     * @type {Object}
     */
    var possibleRegistrationNames = {};
    // Trust the developer to only use possibleRegistrationNames in true

    /**
     * Injects an ordering of plugins (by plugin name). This allows the ordering
     * to be decoupled from injection of the actual plugins so that ordering is
     * always deterministic regardless of packaging, on-the-fly injection, etc.
     *
     * @param {array} InjectedEventPluginOrder
     * @internal
     * @see {EventPluginHub.injection.injectEventPluginOrder}
     */
    function injectEventPluginOrder(injectedEventPluginOrder) {
      !!eventPluginOrder ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
      // Clone the ordering so it cannot be dynamically mutated.
      eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
      recomputePluginOrdering();
    }

    /**
     * Injects plugins to be used by `EventPluginHub`. The plugin names must be
     * in the ordering injected by `injectEventPluginOrder`.
     *
     * Plugins can be injected as part of page initialization or on-the-fly.
     *
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     * @internal
     * @see {EventPluginHub.injection.injectEventPluginsByName}
     */
    function injectEventPluginsByName(injectedNamesToPlugins) {
      var isOrderingDirty = false;
      for (var pluginName in injectedNamesToPlugins) {
        if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
          continue;
        }
        var pluginModule = injectedNamesToPlugins[pluginName];
        if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
          !!namesToPlugins[pluginName] ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
          namesToPlugins[pluginName] = pluginModule;
          isOrderingDirty = true;
        }
      }
      if (isOrderingDirty) {
        recomputePluginOrdering();
      }
    }

    var EventPluginRegistry = Object.freeze({
      plugins: plugins,
      eventNameDispatchConfigs: eventNameDispatchConfigs,
      registrationNameModules: registrationNameModules,
      registrationNameDependencies: registrationNameDependencies,
      possibleRegistrationNames: possibleRegistrationNames,
      injectEventPluginOrder: injectEventPluginOrder,
      injectEventPluginsByName: injectEventPluginsByName
    });

    var getFiberCurrentPropsFromNode = null;
    var getInstanceFromNode = null;
    var getNodeFromInstance = null;

    var injection$1 = {
      injectComponentTree: function (Injected) {
        getFiberCurrentPropsFromNode = Injected.getFiberCurrentPropsFromNode;
        getInstanceFromNode = Injected.getInstanceFromNode;
        getNodeFromInstance = Injected.getNodeFromInstance;

        {
          !(getNodeFromInstance && getInstanceFromNode) ? warning(false, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.') : void 0;
        }
      }
    };

    var validateEventDispatches = void 0;
    {
      validateEventDispatches = function (event) {
        var dispatchListeners = event._dispatchListeners;
        var dispatchInstances = event._dispatchInstances;

        var listenersIsArr = Array.isArray(dispatchListeners);
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

        var instancesIsArr = Array.isArray(dispatchInstances);
        var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

        !(instancesIsArr === listenersIsArr && instancesLen === listenersLen) ? warning(false, 'EventPluginUtils: Invalid `event`.') : void 0;
      };
    }

    /**
     * Dispatch the event to the listener.
     * @param {SyntheticEvent} event SyntheticEvent to handle
     * @param {boolean} simulated If the event is simulated (changes exn behavior)
     * @param {function} listener Application-level callback
     * @param {*} inst Internal component instance
     */
    function executeDispatch(event, simulated, listener, inst) {
      var type = event.type || 'unknown-event';
      event.currentTarget = getNodeFromInstance(inst);
      ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
      event.currentTarget = null;
    }

    /**
     * Standard/simple iteration through an event's collected dispatches.
     */
    function executeDispatchesInOrder(event, simulated) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchInstances = event._dispatchInstances;
      {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          // Listeners and Instances are two parallel arrays that are always in sync.
          executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
        }
      } else if (dispatchListeners) {
        executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
      }
      event._dispatchListeners = null;
      event._dispatchInstances = null;
    }

    /**
     * @see executeDispatchesInOrderStopAtTrueImpl
     */

    /**
     * Execution of a "direct" dispatch - there must be at most one dispatch
     * accumulated on the event or it is considered an error. It doesn't really make
     * sense for an event with multiple dispatches (bubbled) to keep track of the
     * return values at each dispatch execution, but it does tend to make sense when
     * dealing with "direct" dispatches.
     *
     * @return {*} The return value of executing the single dispatch.
     */

    /**
     * @param {SyntheticEvent} event
     * @return {boolean} True iff number of dispatches accumulated is greater than 0.
     */

    /**
     * Accumulates items that must not be null or undefined into the first one. This
     * is used to conserve memory by avoiding array allocations, and thus sacrifices
     * API cleanness. Since `current` can be null before being passed in and not
     * null after this function, make sure to assign it back to `current`:
     *
     * `a = accumulateInto(a, b);`
     *
     * This API should be sparingly used. Try `accumulate` for something cleaner.
     *
     * @return {*|array<*>} An accumulation of items.
     */

    function accumulateInto(current, next) {
      !(next != null) ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : void 0;

      if (current == null) {
        return next;
      }

      // Both are not empty. Warning: Never call x.concat(y) when you are not
      // certain that x is an Array (x could be a string with concat method).
      if (Array.isArray(current)) {
        if (Array.isArray(next)) {
          current.push.apply(current, next);
          return current;
        }
        current.push(next);
        return current;
      }

      if (Array.isArray(next)) {
        // A bit too dangerous to mutate `next`.
        return [current].concat(next);
      }

      return [current, next];
    }

    /**
     * @param {array} arr an "accumulation" of items which is either an Array or
     * a single item. Useful when paired with the `accumulate` module. This is a
     * simple utility that allows us to reason about a collection of items, but
     * handling the case when there is exactly one item (and we do not need to
     * allocate an array).
     * @param {function} cb Callback invoked with each element or a collection.
     * @param {?} [scope] Scope used as `this` in a callback.
     */
    function forEachAccumulated(arr, cb, scope) {
      if (Array.isArray(arr)) {
        arr.forEach(cb, scope);
      } else if (arr) {
        cb.call(scope, arr);
      }
    }

    /**
     * Internal queue of events that have accumulated their dispatches and are
     * waiting to have their dispatches executed.
     */
    var eventQueue = null;

    /**
     * Dispatches an event and releases it back into the pool, unless persistent.
     *
     * @param {?object} event Synthetic event to be dispatched.
     * @param {boolean} simulated If the event is simulated (changes exn behavior)
     * @private
     */
    var executeDispatchesAndRelease = function (event, simulated) {
      if (event) {
        executeDispatchesInOrder(event, simulated);

        if (!event.isPersistent()) {
          event.constructor.release(event);
        }
      }
    };
    var executeDispatchesAndReleaseSimulated = function (e) {
      return executeDispatchesAndRelease(e, true);
    };
    var executeDispatchesAndReleaseTopLevel = function (e) {
      return executeDispatchesAndRelease(e, false);
    };

    function isInteractive(tag) {
      return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
    }

    function shouldPreventMouseEvent(name, type, props) {
      switch (name) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
          return !!(props.disabled && isInteractive(type));
        default:
          return false;
      }
    }

    /**
     * This is a unified interface for event plugins to be installed and configured.
     *
     * Event plugins can implement the following properties:
     *
     *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
     *     Required. When a top-level event is fired, this method is expected to
     *     extract synthetic events that will in turn be queued and dispatched.
     *
     *   `eventTypes` {object}
     *     Optional, plugins that fire events must publish a mapping of registration
     *     names that are used to register listeners. Values of this mapping must
     *     be objects that contain `registrationName` or `phasedRegistrationNames`.
     *
     *   `executeDispatch` {function(object, function, string)}
     *     Optional, allows plugins to override how an event gets dispatched. By
     *     default, the listener is simply invoked.
     *
     * Each plugin that is injected into `EventsPluginHub` is immediately operable.
     *
     * @public
     */

    /**
     * Methods for injecting dependencies.
     */
    var injection = {
      /**
       * @param {array} InjectedEventPluginOrder
       * @public
       */
      injectEventPluginOrder: injectEventPluginOrder,

      /**
       * @param {object} injectedNamesToPlugins Map from names to plugin modules.
       */
      injectEventPluginsByName: injectEventPluginsByName
    };

    /**
     * @param {object} inst The instance, which is the source of events.
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     * @return {?function} The stored callback.
     */
    function getListener(inst, registrationName) {
      var listener = void 0;

      // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
      // live here; needs to be moved to a better place soon
      var stateNode = inst.stateNode;
      if (!stateNode) {
        // Work in progress (ex: onload events in incremental mode).
        return null;
      }
      var props = getFiberCurrentPropsFromNode(stateNode);
      if (!props) {
        // Work in progress.
        return null;
      }
      listener = props[registrationName];
      if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
        return null;
      }
      !(!listener || typeof listener === 'function') ? invariant(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.', registrationName, typeof listener) : void 0;
      return listener;
    }

    /**
     * Allows registered plugins an opportunity to extract events from top-level
     * native browser events.
     *
     * @return {*} An accumulation of synthetic events.
     * @internal
     */
    function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var events = null;
      for (var i = 0; i < plugins.length; i++) {
        // Not every plugin in the ordering may be loaded at runtime.
        var possiblePlugin = plugins[i];
        if (possiblePlugin) {
          var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
          if (extractedEvents) {
            events = accumulateInto(events, extractedEvents);
          }
        }
      }
      return events;
    }

    function runEventsInBatch(events, simulated) {
      if (events !== null) {
        eventQueue = accumulateInto(eventQueue, events);
      }

      // Set `eventQueue` to null before processing it so that we can tell if more
      // events get enqueued while processing.
      var processingEventQueue = eventQueue;
      eventQueue = null;

      if (!processingEventQueue) {
        return;
      }

      if (simulated) {
        forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
      } else {
        forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
      }
      !!eventQueue ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : void 0;
      // This would be a good time to rethrow if any of the event handlers threw.
      ReactErrorUtils.rethrowCaughtError();
    }

    function runExtractedEventsInBatch(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var events = extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
      runEventsInBatch(events, false);
    }

    var EventPluginHub = Object.freeze({
      injection: injection,
      getListener: getListener,
      runEventsInBatch: runEventsInBatch,
      runExtractedEventsInBatch: runExtractedEventsInBatch
    });

    var IndeterminateComponent = 0; // Before we know whether it is functional or class
    var FunctionalComponent = 1;
    var ClassComponent = 2;
    var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
    var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
    var HostComponent = 5;
    var HostText = 6;

    var Fragment = 10;
    var Mode = 11;
    var ContextConsumer = 12;
    var ContextProvider = 13;
    var ForwardRef = 14;
    var Profiler = 15;
    var TimeoutComponent = 16;

    var randomKey = Math.random().toString(36).slice(2);
    var internalInstanceKey = '__reactInternalInstance$' + randomKey;
    var internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

    function precacheFiberNode(hostInst, node) {
      node[internalInstanceKey] = hostInst;
    }

    /**
     * Given a DOM node, return the closest ReactDOMComponent or
     * ReactDOMTextComponent instance ancestor.
     */
    function getClosestInstanceFromNode(node) {
      if (node[internalInstanceKey]) {
        return node[internalInstanceKey];
      }

      while (!node[internalInstanceKey]) {
        if (node.parentNode) {
          node = node.parentNode;
        } else {
          // Top of the tree. This node must not be part of a React tree (or is
          // unmounted, potentially).
          return null;
        }
      }

      var inst = node[internalInstanceKey];
      if (inst.tag === HostComponent || inst.tag === HostText) {
        // In Fiber, this will always be the deepest root.
        return inst;
      }

      return null;
    }

    /**
     * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
     * instance, or null if the node was not rendered by this React.
     */
    function getInstanceFromNode$1(node) {
      var inst = node[internalInstanceKey];
      if (inst) {
        if (inst.tag === HostComponent || inst.tag === HostText) {
          return inst;
        } else {
          return null;
        }
      }
      return null;
    }

    /**
     * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
     * DOM node.
     */
    function getNodeFromInstance$1(inst) {
      if (inst.tag === HostComponent || inst.tag === HostText) {
        // In Fiber this, is just the state node right now. We assume it will be
        // a host component or host text.
        return inst.stateNode;
      }

      // Without this first invariant, passing a non-DOM-component triggers the next
      // invariant for a missing parent, which is super confusing.
      invariant(false, 'getNodeFromInstance: Invalid argument.');
    }

    function getFiberCurrentPropsFromNode$1(node) {
      return node[internalEventHandlersKey] || null;
    }

    function updateFiberProps(node, props) {
      node[internalEventHandlersKey] = props;
    }

    var ReactDOMComponentTree = Object.freeze({
      precacheFiberNode: precacheFiberNode,
      getClosestInstanceFromNode: getClosestInstanceFromNode,
      getInstanceFromNode: getInstanceFromNode$1,
      getNodeFromInstance: getNodeFromInstance$1,
      getFiberCurrentPropsFromNode: getFiberCurrentPropsFromNode$1,
      updateFiberProps: updateFiberProps
    });

    function getParent(inst) {
      do {
        inst = inst.return;
        // TODO: If this is a HostRoot we might want to bail out.
        // That is depending on if we want nested subtrees (layers) to bubble
        // events to their parent. We could also go through parentNode on the
        // host node but that wouldn't work for React Native and doesn't let us
        // do the portal feature.
      } while (inst && inst.tag !== HostComponent);
      if (inst) {
        return inst;
      }
      return null;
    }

    /**
     * Return the lowest common ancestor of A and B, or null if they are in
     * different trees.
     */
    function getLowestCommonAncestor(instA, instB) {
      var depthA = 0;
      for (var tempA = instA; tempA; tempA = getParent(tempA)) {
        depthA++;
      }
      var depthB = 0;
      for (var tempB = instB; tempB; tempB = getParent(tempB)) {
        depthB++;
      }

      // If A is deeper, crawl up.
      while (depthA - depthB > 0) {
        instA = getParent(instA);
        depthA--;
      }

      // If B is deeper, crawl up.
      while (depthB - depthA > 0) {
        instB = getParent(instB);
        depthB--;
      }

      // Walk in lockstep until we find a match.
      var depth = depthA;
      while (depth--) {
        if (instA === instB || instA === instB.alternate) {
          return instA;
        }
        instA = getParent(instA);
        instB = getParent(instB);
      }
      return null;
    }

    /**
     * Return if A is an ancestor of B.
     */

    /**
     * Return the parent instance of the passed-in instance.
     */
    function getParentInstance(inst) {
      return getParent(inst);
    }

    /**
     * Simulates the traversal of a two-phase, capture/bubble event dispatch.
     */
    function traverseTwoPhase(inst, fn, arg) {
      var path = [];
      while (inst) {
        path.push(inst);
        inst = getParent(inst);
      }
      var i = void 0;
      for (i = path.length; i-- > 0;) {
        fn(path[i], 'captured', arg);
      }
      for (i = 0; i < path.length; i++) {
        fn(path[i], 'bubbled', arg);
      }
    }

    /**
     * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
     * should would receive a `mouseEnter` or `mouseLeave` event.
     *
     * Does not invoke the callback on the nearest common ancestor because nothing
     * "entered" or "left" that element.
     */
    function traverseEnterLeave(from, to, fn, argFrom, argTo) {
      var common = from && to ? getLowestCommonAncestor(from, to) : null;
      var pathFrom = [];
      while (true) {
        if (!from) {
          break;
        }
        if (from === common) {
          break;
        }
        var alternate = from.alternate;
        if (alternate !== null && alternate === common) {
          break;
        }
        pathFrom.push(from);
        from = getParent(from);
      }
      var pathTo = [];
      while (true) {
        if (!to) {
          break;
        }
        if (to === common) {
          break;
        }
        var _alternate = to.alternate;
        if (_alternate !== null && _alternate === common) {
          break;
        }
        pathTo.push(to);
        to = getParent(to);
      }
      for (var i = 0; i < pathFrom.length; i++) {
        fn(pathFrom[i], 'bubbled', argFrom);
      }
      for (var _i = pathTo.length; _i-- > 0;) {
        fn(pathTo[_i], 'captured', argTo);
      }
    }

    /**
     * Some event types have a notion of different registration names for different
     * "phases" of propagation. This finds listeners by a given phase.
     */
    function listenerAtPhase(inst, event, propagationPhase) {
      var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
      return getListener(inst, registrationName);
    }

    /**
     * A small set of propagation patterns, each of which will accept a small amount
     * of information, and generate a set of "dispatch ready event objects" - which
     * are sets of events that have already been annotated with a set of dispatched
     * listener functions/ids. The API is designed this way to discourage these
     * propagation strategies from actually executing the dispatches, since we
     * always want to collect the entire set of dispatches before executing even a
     * single one.
     */

    /**
     * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
     * here, allows us to not have to bind or create functions for each event.
     * Mutating the event's members allows us to not have to create a wrapping
     * "dispatch" object that pairs the event with the listener.
     */
    function accumulateDirectionalDispatches(inst, phase, event) {
      {
        !inst ? warning(false, 'Dispatching inst must not be null') : void 0;
      }
      var listener = listenerAtPhase(inst, event, phase);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
      }
    }

    /**
     * Collect dispatches (must be entirely collected before dispatching - see unit
     * tests). Lazily allocate the array to conserve memory.  We must loop through
     * each event and perform the traversal for each one. We cannot perform a
     * single traversal for the entire collection of events because each event may
     * have a different target.
     */
    function accumulateTwoPhaseDispatchesSingle(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
      }
    }

    /**
     * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
     */
    function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        var targetInst = event._targetInst;
        var parentInst = targetInst ? getParentInstance(targetInst) : null;
        traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
      }
    }

    /**
     * Accumulates without regard to direction, does not look for phased
     * registration names. Same as `accumulateDirectDispatchesSingle` but without
     * requiring that the `dispatchMarker` be the same as the dispatched ID.
     */
    function accumulateDispatches(inst, ignoredDirection, event) {
      if (inst && event && event.dispatchConfig.registrationName) {
        var registrationName = event.dispatchConfig.registrationName;
        var listener = getListener(inst, registrationName);
        if (listener) {
          event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
          event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
        }
      }
    }

    /**
     * Accumulates dispatches on an `SyntheticEvent`, but only for the
     * `dispatchMarker`.
     * @param {SyntheticEvent} event
     */
    function accumulateDirectDispatchesSingle(event) {
      if (event && event.dispatchConfig.registrationName) {
        accumulateDispatches(event._targetInst, null, event);
      }
    }

    function accumulateTwoPhaseDispatches(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
    }

    function accumulateTwoPhaseDispatchesSkipTarget(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
    }

    function accumulateEnterLeaveDispatches(leave, enter, from, to) {
      traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
    }

    function accumulateDirectDispatches(events) {
      forEachAccumulated(events, accumulateDirectDispatchesSingle);
    }

    var EventPropagators = Object.freeze({
      accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
      accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
      accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
      accumulateDirectDispatches: accumulateDirectDispatches
    });

    // Do not uses the below two methods directly!
    // Instead use constants exported from DOMTopLevelEventTypes in ReactDOM.
    // (It is the only module that is allowed to access these methods.)

    function unsafeCastStringToDOMTopLevelType(topLevelType) {
      return topLevelType;
    }

    function unsafeCastDOMTopLevelTypeToString(topLevelType) {
      return topLevelType;
    }

    /**
     * Generate a mapping of standard vendor prefixes using the defined style property and event name.
     *
     * @param {string} styleProp
     * @param {string} eventName
     * @returns {object}
     */
    function makePrefixMap(styleProp, eventName) {
      var prefixes = {};

      prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
      prefixes['Webkit' + styleProp] = 'webkit' + eventName;
      prefixes['Moz' + styleProp] = 'moz' + eventName;
      prefixes['ms' + styleProp] = 'MS' + eventName;
      prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

      return prefixes;
    }

    /**
     * A list of event names to a configurable list of vendor prefixes.
     */
    var vendorPrefixes = {
      animationend: makePrefixMap('Animation', 'AnimationEnd'),
      animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
      animationstart: makePrefixMap('Animation', 'AnimationStart'),
      transitionend: makePrefixMap('Transition', 'TransitionEnd')
    };

    /**
     * Event names that have already been detected and prefixed (if applicable).
     */
    var prefixedEventNames = {};

    /**
     * Element to check for prefixes on.
     */
    var style = {};

    /**
     * Bootstrap if a DOM exists.
     */
    if (ExecutionEnvironment.canUseDOM) {
      style = document.createElement('div').style;

      // On some platforms, in particular some releases of Android 4.x,
      // the un-prefixed "animation" and "transition" properties are defined on the
      // style object but the events that fire will still be prefixed, so we need
      // to check if the un-prefixed events are usable, and if not remove them from the map.
      if (!('AnimationEvent' in window)) {
        delete vendorPrefixes.animationend.animation;
        delete vendorPrefixes.animationiteration.animation;
        delete vendorPrefixes.animationstart.animation;
      }

      // Same as above
      if (!('TransitionEvent' in window)) {
        delete vendorPrefixes.transitionend.transition;
      }
    }

    /**
     * Attempts to determine the correct vendor prefixed event name.
     *
     * @param {string} eventName
     * @returns {string}
     */
    function getVendorPrefixedEventName(eventName) {
      if (prefixedEventNames[eventName]) {
        return prefixedEventNames[eventName];
      } else if (!vendorPrefixes[eventName]) {
        return eventName;
      }

      var prefixMap = vendorPrefixes[eventName];

      for (var styleProp in prefixMap) {
        if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
          return prefixedEventNames[eventName] = prefixMap[styleProp];
        }
      }

      return eventName;
    }

    /**
     * To identify top level events in ReactDOM, we use constants defined by this
     * module. This is the only module that uses the unsafe* methods to express
     * that the constants actually correspond to the browser event names. This lets
     * us save some bundle size by avoiding a top level type -> event name map.
     * The rest of ReactDOM code should import top level types from this file.
     */
    var TOP_ABORT = unsafeCastStringToDOMTopLevelType('abort');
    var TOP_ANIMATION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationend'));
    var TOP_ANIMATION_ITERATION = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationiteration'));
    var TOP_ANIMATION_START = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationstart'));
    var TOP_BLUR = unsafeCastStringToDOMTopLevelType('blur');
    var TOP_CAN_PLAY = unsafeCastStringToDOMTopLevelType('canplay');
    var TOP_CAN_PLAY_THROUGH = unsafeCastStringToDOMTopLevelType('canplaythrough');
    var TOP_CANCEL = unsafeCastStringToDOMTopLevelType('cancel');
    var TOP_CHANGE = unsafeCastStringToDOMTopLevelType('change');
    var TOP_CLICK = unsafeCastStringToDOMTopLevelType('click');
    var TOP_CLOSE = unsafeCastStringToDOMTopLevelType('close');
    var TOP_COMPOSITION_END = unsafeCastStringToDOMTopLevelType('compositionend');
    var TOP_COMPOSITION_START = unsafeCastStringToDOMTopLevelType('compositionstart');
    var TOP_COMPOSITION_UPDATE = unsafeCastStringToDOMTopLevelType('compositionupdate');
    var TOP_CONTEXT_MENU = unsafeCastStringToDOMTopLevelType('contextmenu');
    var TOP_COPY = unsafeCastStringToDOMTopLevelType('copy');
    var TOP_CUT = unsafeCastStringToDOMTopLevelType('cut');
    var TOP_DOUBLE_CLICK = unsafeCastStringToDOMTopLevelType('dblclick');
    var TOP_DRAG = unsafeCastStringToDOMTopLevelType('drag');
    var TOP_DRAG_END = unsafeCastStringToDOMTopLevelType('dragend');
    var TOP_DRAG_ENTER = unsafeCastStringToDOMTopLevelType('dragenter');
    var TOP_DRAG_EXIT = unsafeCastStringToDOMTopLevelType('dragexit');
    var TOP_DRAG_LEAVE = unsafeCastStringToDOMTopLevelType('dragleave');
    var TOP_DRAG_OVER = unsafeCastStringToDOMTopLevelType('dragover');
    var TOP_DRAG_START = unsafeCastStringToDOMTopLevelType('dragstart');
    var TOP_DROP = unsafeCastStringToDOMTopLevelType('drop');
    var TOP_DURATION_CHANGE = unsafeCastStringToDOMTopLevelType('durationchange');
    var TOP_EMPTIED = unsafeCastStringToDOMTopLevelType('emptied');
    var TOP_ENCRYPTED = unsafeCastStringToDOMTopLevelType('encrypted');
    var TOP_ENDED = unsafeCastStringToDOMTopLevelType('ended');
    var TOP_ERROR = unsafeCastStringToDOMTopLevelType('error');
    var TOP_FOCUS = unsafeCastStringToDOMTopLevelType('focus');
    var TOP_GOT_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('gotpointercapture');
    var TOP_INPUT = unsafeCastStringToDOMTopLevelType('input');
    var TOP_INVALID = unsafeCastStringToDOMTopLevelType('invalid');
    var TOP_KEY_DOWN = unsafeCastStringToDOMTopLevelType('keydown');
    var TOP_KEY_PRESS = unsafeCastStringToDOMTopLevelType('keypress');
    var TOP_KEY_UP = unsafeCastStringToDOMTopLevelType('keyup');
    var TOP_LOAD = unsafeCastStringToDOMTopLevelType('load');
    var TOP_LOAD_START = unsafeCastStringToDOMTopLevelType('loadstart');
    var TOP_LOADED_DATA = unsafeCastStringToDOMTopLevelType('loadeddata');
    var TOP_LOADED_METADATA = unsafeCastStringToDOMTopLevelType('loadedmetadata');
    var TOP_LOST_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('lostpointercapture');
    var TOP_MOUSE_DOWN = unsafeCastStringToDOMTopLevelType('mousedown');
    var TOP_MOUSE_MOVE = unsafeCastStringToDOMTopLevelType('mousemove');
    var TOP_MOUSE_OUT = unsafeCastStringToDOMTopLevelType('mouseout');
    var TOP_MOUSE_OVER = unsafeCastStringToDOMTopLevelType('mouseover');
    var TOP_MOUSE_UP = unsafeCastStringToDOMTopLevelType('mouseup');
    var TOP_PASTE = unsafeCastStringToDOMTopLevelType('paste');
    var TOP_PAUSE = unsafeCastStringToDOMTopLevelType('pause');
    var TOP_PLAY = unsafeCastStringToDOMTopLevelType('play');
    var TOP_PLAYING = unsafeCastStringToDOMTopLevelType('playing');
    var TOP_POINTER_CANCEL = unsafeCastStringToDOMTopLevelType('pointercancel');
    var TOP_POINTER_DOWN = unsafeCastStringToDOMTopLevelType('pointerdown');

    var TOP_POINTER_MOVE = unsafeCastStringToDOMTopLevelType('pointermove');
    var TOP_POINTER_OUT = unsafeCastStringToDOMTopLevelType('pointerout');
    var TOP_POINTER_OVER = unsafeCastStringToDOMTopLevelType('pointerover');
    var TOP_POINTER_UP = unsafeCastStringToDOMTopLevelType('pointerup');
    var TOP_PROGRESS = unsafeCastStringToDOMTopLevelType('progress');
    var TOP_RATE_CHANGE = unsafeCastStringToDOMTopLevelType('ratechange');
    var TOP_RESET = unsafeCastStringToDOMTopLevelType('reset');
    var TOP_SCROLL = unsafeCastStringToDOMTopLevelType('scroll');
    var TOP_SEEKED = unsafeCastStringToDOMTopLevelType('seeked');
    var TOP_SEEKING = unsafeCastStringToDOMTopLevelType('seeking');
    var TOP_SELECTION_CHANGE = unsafeCastStringToDOMTopLevelType('selectionchange');
    var TOP_STALLED = unsafeCastStringToDOMTopLevelType('stalled');
    var TOP_SUBMIT = unsafeCastStringToDOMTopLevelType('submit');
    var TOP_SUSPEND = unsafeCastStringToDOMTopLevelType('suspend');
    var TOP_TEXT_INPUT = unsafeCastStringToDOMTopLevelType('textInput');
    var TOP_TIME_UPDATE = unsafeCastStringToDOMTopLevelType('timeupdate');
    var TOP_TOGGLE = unsafeCastStringToDOMTopLevelType('toggle');
    var TOP_TOUCH_CANCEL = unsafeCastStringToDOMTopLevelType('touchcancel');
    var TOP_TOUCH_END = unsafeCastStringToDOMTopLevelType('touchend');
    var TOP_TOUCH_MOVE = unsafeCastStringToDOMTopLevelType('touchmove');
    var TOP_TOUCH_START = unsafeCastStringToDOMTopLevelType('touchstart');
    var TOP_TRANSITION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('transitionend'));
    var TOP_VOLUME_CHANGE = unsafeCastStringToDOMTopLevelType('volumechange');
    var TOP_WAITING = unsafeCastStringToDOMTopLevelType('waiting');
    var TOP_WHEEL = unsafeCastStringToDOMTopLevelType('wheel');

    // List of events that need to be individually attached to media elements.
    // Note that events in this list will *not* be listened to at the top level
    // unless they're explicitly whitelisted in `ReactBrowserEventEmitter.listenTo`.
    var mediaEventTypes = [TOP_ABORT, TOP_CAN_PLAY, TOP_CAN_PLAY_THROUGH, TOP_DURATION_CHANGE, TOP_EMPTIED, TOP_ENCRYPTED, TOP_ENDED, TOP_ERROR, TOP_LOADED_DATA, TOP_LOADED_METADATA, TOP_LOAD_START, TOP_PAUSE, TOP_PLAY, TOP_PLAYING, TOP_PROGRESS, TOP_RATE_CHANGE, TOP_SEEKED, TOP_SEEKING, TOP_STALLED, TOP_SUSPEND, TOP_TIME_UPDATE, TOP_VOLUME_CHANGE, TOP_WAITING];

    function getRawEventName(topLevelType) {
      return unsafeCastDOMTopLevelTypeToString(topLevelType);
    }

    var contentKey = null;

    /**
     * Gets the key used to access text content on a DOM node.
     *
     * @return {?string} Key used to access text content.
     * @internal
     */
    function getTextContentAccessor() {
      if (!contentKey && ExecutionEnvironment.canUseDOM) {
        // Prefer textContent to innerText because many browsers support both but
        // SVG <text> elements don't support innerText even when <div> does.
        contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
      }
      return contentKey;
    }

    /**
     * This helper object stores information about text content of a target node,
     * allowing comparison of content before and after a given event.
     *
     * Identify the node where selection currently begins, then observe
     * both its text content and its current position in the DOM. Since the
     * browser may natively replace the target node during composition, we can
     * use its position to find its replacement.
     *
     *
     */
    var compositionState = {
      _root: null,
      _startText: null,
      _fallbackText: null
    };

    function initialize(nativeEventTarget) {
      compositionState._root = nativeEventTarget;
      compositionState._startText = getText();
      return true;
    }

    function reset() {
      compositionState._root = null;
      compositionState._startText = null;
      compositionState._fallbackText = null;
    }

    function getData() {
      if (compositionState._fallbackText) {
        return compositionState._fallbackText;
      }

      var start = void 0;
      var startValue = compositionState._startText;
      var startLength = startValue.length;
      var end = void 0;
      var endValue = getText();
      var endLength = endValue.length;

      for (start = 0; start < startLength; start++) {
        if (startValue[start] !== endValue[start]) {
          break;
        }
      }

      var minEnd = startLength - start;
      for (end = 1; end <= minEnd; end++) {
        if (startValue[startLength - end] !== endValue[endLength - end]) {
          break;
        }
      }

      var sliceTail = end > 1 ? 1 - end : undefined;
      compositionState._fallbackText = endValue.slice(start, sliceTail);
      return compositionState._fallbackText;
    }

    function getText() {
      if ('value' in compositionState._root) {
        return compositionState._root.value;
      }
      return compositionState._root[getTextContentAccessor()];
    }

    /* eslint valid-typeof: 0 */

    var didWarnForAddedNewProperty = false;
    var EVENT_POOL_SIZE = 10;

    var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

    /**
     * @interface Event
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var EventInterface = {
      type: null,
      target: null,
      // currentTarget is set when dispatching; no use in copying it here
      currentTarget: emptyFunction.thatReturnsNull,
      eventPhase: null,
      bubbles: null,
      cancelable: null,
      timeStamp: function (event) {
        return event.timeStamp || Date.now();
      },
      defaultPrevented: null,
      isTrusted: null
    };

    /**
     * Synthetic events are dispatched by event plugins, typically in response to a
     * top-level event delegation handler.
     *
     * These systems should generally use pooling to reduce the frequency of garbage
     * collection. The system should check `isPersistent` to determine whether the
     * event should be released into the pool after being dispatched. Users that
     * need a persisted event should invoke `persist`.
     *
     * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
     * normalizing browser quirks. Subclasses do not necessarily have to implement a
     * DOM interface; custom application-specific events can also subclass this.
     *
     * @param {object} dispatchConfig Configuration used to dispatch this event.
     * @param {*} targetInst Marker identifying the event target.
     * @param {object} nativeEvent Native browser event.
     * @param {DOMEventTarget} nativeEventTarget Target node.
     */
    function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
      {
        // these have a getter/setter for warnings
        delete this.nativeEvent;
        delete this.preventDefault;
        delete this.stopPropagation;
      }

      this.dispatchConfig = dispatchConfig;
      this._targetInst = targetInst;
      this.nativeEvent = nativeEvent;

      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        if (!Interface.hasOwnProperty(propName)) {
          continue;
        }
        {
          delete this[propName]; // this has a getter/setter for warnings
        }
        var normalize = Interface[propName];
        if (normalize) {
          this[propName] = normalize(nativeEvent);
        } else {
          if (propName === 'target') {
            this.target = nativeEventTarget;
          } else {
            this[propName] = nativeEvent[propName];
          }
        }
      }

      var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
      if (defaultPrevented) {
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      } else {
        this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
      }
      this.isPropagationStopped = emptyFunction.thatReturnsFalse;
      return this;
    }

    _assign(SyntheticEvent.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        if (!event) {
          return;
        }

        if (event.preventDefault) {
          event.preventDefault();
        } else if (typeof event.returnValue !== 'unknown') {
          event.returnValue = false;
        }
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      },

      stopPropagation: function () {
        var event = this.nativeEvent;
        if (!event) {
          return;
        }

        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (typeof event.cancelBubble !== 'unknown') {
          // The ChangeEventPlugin registers a "propertychange" event for
          // IE. This event does not support bubbling or cancelling, and
          // any references to cancelBubble throw "Member not found".  A
          // typeof check of "unknown" circumvents this issue (and is also
          // IE specific).
          event.cancelBubble = true;
        }

        this.isPropagationStopped = emptyFunction.thatReturnsTrue;
      },

      /**
       * We release all dispatched `SyntheticEvent`s after each event loop, adding
       * them back into the pool. This allows a way to hold onto a reference that
       * won't be added back into the pool.
       */
      persist: function () {
        this.isPersistent = emptyFunction.thatReturnsTrue;
      },

      /**
       * Checks if this event should be released back into the pool.
       *
       * @return {boolean} True if this should not be released, false otherwise.
       */
      isPersistent: emptyFunction.thatReturnsFalse,

      /**
       * `PooledClass` looks for `destructor` on each instance it releases.
       */
      destructor: function () {
        var Interface = this.constructor.Interface;
        for (var propName in Interface) {
          {
            Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
          }
        }
        for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
          this[shouldBeReleasedProperties[i]] = null;
        }
        {
          Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
          Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction));
          Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction));
        }
      }
    });

    SyntheticEvent.Interface = EventInterface;

    /**
     * Helper to reduce boilerplate when creating subclasses.
     */
    SyntheticEvent.extend = function (Interface) {
      var Super = this;

      var E = function () {};
      E.prototype = Super.prototype;
      var prototype = new E();

      function Class() {
        return Super.apply(this, arguments);
      }
      _assign(prototype, Class.prototype);
      Class.prototype = prototype;
      Class.prototype.constructor = Class;

      Class.Interface = _assign({}, Super.Interface, Interface);
      Class.extend = Super.extend;
      addEventPoolingTo(Class);

      return Class;
    };

    /** Proxying after everything set on SyntheticEvent
     * to resolve Proxy issue on some WebKit browsers
     * in which some Event properties are set to undefined (GH#10010)
     */
    {
      var isProxySupported = typeof Proxy === 'function' &&
      // https://github.com/facebook/react/issues/12011
      !Object.isSealed(new Proxy({}, {}));

      if (isProxySupported) {
        /*eslint-disable no-func-assign */
        SyntheticEvent = new Proxy(SyntheticEvent, {
          construct: function (target, args) {
            return this.apply(target, Object.create(target.prototype), args);
          },
          apply: function (constructor, that, args) {
            return new Proxy(constructor.apply(that, args), {
              set: function (target, prop, value) {
                if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
                  !(didWarnForAddedNewProperty || target.isPersistent()) ? warning(false, "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.') : void 0;
                  didWarnForAddedNewProperty = true;
                }
                target[prop] = value;
                return true;
              }
            });
          }
        });
        /*eslint-enable no-func-assign */
      }
    }

    addEventPoolingTo(SyntheticEvent);

    /**
     * Helper to nullify syntheticEvent instance properties when destructing
     *
     * @param {String} propName
     * @param {?object} getVal
     * @return {object} defineProperty object
     */
    function getPooledWarningPropertyDefinition(propName, getVal) {
      var isFunction = typeof getVal === 'function';
      return {
        configurable: true,
        set: set,
        get: get
      };

      function set(val) {
        var action = isFunction ? 'setting the method' : 'setting the property';
        warn(action, 'This is effectively a no-op');
        return val;
      }

      function get() {
        var action = isFunction ? 'accessing the method' : 'accessing the property';
        var result = isFunction ? 'This is a no-op function' : 'This is set to null';
        warn(action, result);
        return getVal;
      }

      function warn(action, result) {
        var warningCondition = false;
        !warningCondition ? warning(false, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
      }
    }

    function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
      var EventConstructor = this;
      if (EventConstructor.eventPool.length) {
        var instance = EventConstructor.eventPool.pop();
        EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
        return instance;
      }
      return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
    }

    function releasePooledEvent(event) {
      var EventConstructor = this;
      !(event instanceof EventConstructor) ? invariant(false, 'Trying to release an event instance  into a pool of a different type.') : void 0;
      event.destructor();
      if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
        EventConstructor.eventPool.push(event);
      }
    }

    function addEventPoolingTo(EventConstructor) {
      EventConstructor.eventPool = [];
      EventConstructor.getPooled = getPooledEvent;
      EventConstructor.release = releasePooledEvent;
    }

    var SyntheticEvent$1 = SyntheticEvent;

    /**
     * @interface Event
     * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
     */
    var SyntheticCompositionEvent = SyntheticEvent$1.extend({
      data: null
    });

    /**
     * @interface Event
     * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
     *      /#events-inputevents
     */
    var SyntheticInputEvent = SyntheticEvent$1.extend({
      data: null
    });

    var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
    var START_KEYCODE = 229;

    var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

    var documentMode = null;
    if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
      documentMode = document.documentMode;
    }

    // Webkit offers a very useful `textInput` event that can be used to
    // directly represent `beforeInput`. The IE `textinput` event is not as
    // useful, so we don't use it.
    var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode;

    // In IE9+, we have access to composition events, but the data supplied
    // by the native compositionend event may be incorrect. Japanese ideographic
    // spaces, for instance (\u3000) are not recorded correctly.
    var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

    var SPACEBAR_CODE = 32;
    var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

    // Events and their corresponding property names.
    var eventTypes = {
      beforeInput: {
        phasedRegistrationNames: {
          bubbled: 'onBeforeInput',
          captured: 'onBeforeInputCapture'
        },
        dependencies: [TOP_COMPOSITION_END, TOP_KEY_PRESS, TOP_TEXT_INPUT, TOP_PASTE]
      },
      compositionEnd: {
        phasedRegistrationNames: {
          bubbled: 'onCompositionEnd',
          captured: 'onCompositionEndCapture'
        },
        dependencies: [TOP_BLUR, TOP_COMPOSITION_END, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
      },
      compositionStart: {
        phasedRegistrationNames: {
          bubbled: 'onCompositionStart',
          captured: 'onCompositionStartCapture'
        },
        dependencies: [TOP_BLUR, TOP_COMPOSITION_START, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
      },
      compositionUpdate: {
        phasedRegistrationNames: {
          bubbled: 'onCompositionUpdate',
          captured: 'onCompositionUpdateCapture'
        },
        dependencies: [TOP_BLUR, TOP_COMPOSITION_UPDATE, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
      }
    };

    // Track whether we've ever handled a keypress on the space key.
    var hasSpaceKeypress = false;

    /**
     * Return whether a native keypress event is assumed to be a command.
     * This is required because Firefox fires `keypress` events for key commands
     * (cut, copy, select-all, etc.) even though no character is inserted.
     */
    function isKeypressCommand(nativeEvent) {
      return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
      // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(nativeEvent.ctrlKey && nativeEvent.altKey);
    }

    /**
     * Translate native top level events into event types.
     *
     * @param {string} topLevelType
     * @return {object}
     */
    function getCompositionEventType(topLevelType) {
      switch (topLevelType) {
        case TOP_COMPOSITION_START:
          return eventTypes.compositionStart;
        case TOP_COMPOSITION_END:
          return eventTypes.compositionEnd;
        case TOP_COMPOSITION_UPDATE:
          return eventTypes.compositionUpdate;
      }
    }

    /**
     * Does our fallback best-guess model think this event signifies that
     * composition has begun?
     *
     * @param {string} topLevelType
     * @param {object} nativeEvent
     * @return {boolean}
     */
    function isFallbackCompositionStart(topLevelType, nativeEvent) {
      return topLevelType === TOP_KEY_DOWN && nativeEvent.keyCode === START_KEYCODE;
    }

    /**
     * Does our fallback mode think that this event is the end of composition?
     *
     * @param {string} topLevelType
     * @param {object} nativeEvent
     * @return {boolean}
     */
    function isFallbackCompositionEnd(topLevelType, nativeEvent) {
      switch (topLevelType) {
        case TOP_KEY_UP:
          // Command keys insert or clear IME input.
          return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
        case TOP_KEY_DOWN:
          // Expect IME keyCode on each keydown. If we get any other
          // code we must have exited earlier.
          return nativeEvent.keyCode !== START_KEYCODE;
        case TOP_KEY_PRESS:
        case TOP_MOUSE_DOWN:
        case TOP_BLUR:
          // Events are not possible without cancelling IME.
          return true;
        default:
          return false;
      }
    }

    /**
     * Google Input Tools provides composition data via a CustomEvent,
     * with the `data` property populated in the `detail` object. If this
     * is available on the event object, use it. If not, this is a plain
     * composition event and we have nothing special to extract.
     *
     * @param {object} nativeEvent
     * @return {?string}
     */
    function getDataFromCustomEvent(nativeEvent) {
      var detail = nativeEvent.detail;
      if (typeof detail === 'object' && 'data' in detail) {
        return detail.data;
      }
      return null;
    }

    // Track the current IME composition status, if any.
    var isComposing = false;

    /**
     * @return {?object} A SyntheticCompositionEvent.
     */
    function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var eventType = void 0;
      var fallbackData = void 0;

      if (canUseCompositionEvent) {
        eventType = getCompositionEventType(topLevelType);
      } else if (!isComposing) {
        if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
          eventType = eventTypes.compositionStart;
        }
      } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionEnd;
      }

      if (!eventType) {
        return null;
      }

      if (useFallbackCompositionData) {
        // The current composition is stored statically and must not be
        // overwritten while composition continues.
        if (!isComposing && eventType === eventTypes.compositionStart) {
          isComposing = initialize(nativeEventTarget);
        } else if (eventType === eventTypes.compositionEnd) {
          if (isComposing) {
            fallbackData = getData();
          }
        }
      }

      var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

      if (fallbackData) {
        // Inject data generated from fallback path into the synthetic event.
        // This matches the property of native CompositionEventInterface.
        event.data = fallbackData;
      } else {
        var customData = getDataFromCustomEvent(nativeEvent);
        if (customData !== null) {
          event.data = customData;
        }
      }

      accumulateTwoPhaseDispatches(event);
      return event;
    }

    /**
     * @param {TopLevelType} topLevelType Number from `TopLevelType`.
     * @param {object} nativeEvent Native browser event.
     * @return {?string} The string corresponding to this `beforeInput` event.
     */
    function getNativeBeforeInputChars(topLevelType, nativeEvent) {
      switch (topLevelType) {
        case TOP_COMPOSITION_END:
          return getDataFromCustomEvent(nativeEvent);
        case TOP_KEY_PRESS:
          /**
           * If native `textInput` events are available, our goal is to make
           * use of them. However, there is a special case: the spacebar key.
           * In Webkit, preventing default on a spacebar `textInput` event
           * cancels character insertion, but it *also* causes the browser
           * to fall back to its default spacebar behavior of scrolling the
           * page.
           *
           * Tracking at:
           * https://code.google.com/p/chromium/issues/detail?id=355103
           *
           * To avoid this issue, use the keypress event as if no `textInput`
           * event is available.
           */
          var which = nativeEvent.which;
          if (which !== SPACEBAR_CODE) {
            return null;
          }

          hasSpaceKeypress = true;
          return SPACEBAR_CHAR;

        case TOP_TEXT_INPUT:
          // Record the characters to be added to the DOM.
          var chars = nativeEvent.data;

          // If it's a spacebar character, assume that we have already handled
          // it at the keypress level and bail immediately. Android Chrome
          // doesn't give us keycodes, so we need to blacklist it.
          if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
            return null;
          }

          return chars;

        default:
          // For other native event types, do nothing.
          return null;
      }
    }

    /**
     * For browsers that do not provide the `textInput` event, extract the
     * appropriate string to use for SyntheticInputEvent.
     *
     * @param {number} topLevelType Number from `TopLevelEventTypes`.
     * @param {object} nativeEvent Native browser event.
     * @return {?string} The fallback string for this `beforeInput` event.
     */
    function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
      // If we are currently composing (IME) and using a fallback to do so,
      // try to extract the composed characters from the fallback object.
      // If composition event is available, we extract a string only at
      // compositionevent, otherwise extract it at fallback events.
      if (isComposing) {
        if (topLevelType === TOP_COMPOSITION_END || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
          var chars = getData();
          reset();
          isComposing = false;
          return chars;
        }
        return null;
      }

      switch (topLevelType) {
        case TOP_PASTE:
          // If a paste event occurs after a keypress, throw out the input
          // chars. Paste events should not lead to BeforeInput events.
          return null;
        case TOP_KEY_PRESS:
          /**
           * As of v27, Firefox may fire keypress events even when no character
           * will be inserted. A few possibilities:
           *
           * - `which` is `0`. Arrow keys, Esc key, etc.
           *
           * - `which` is the pressed key code, but no char is available.
           *   Ex: 'AltGr + d` in Polish. There is no modified character for
           *   this key combination and no character is inserted into the
           *   document, but FF fires the keypress for char code `100` anyway.
           *   No `input` event will occur.
           *
           * - `which` is the pressed key code, but a command combination is
           *   being used. Ex: `Cmd+C`. No character is inserted, and no
           *   `input` event will occur.
           */
          if (!isKeypressCommand(nativeEvent)) {
            // IE fires the `keypress` event when a user types an emoji via
            // Touch keyboard of Windows.  In such a case, the `char` property
            // holds an emoji character like `\uD83D\uDE0A`.  Because its length
            // is 2, the property `which` does not represent an emoji correctly.
            // In such a case, we directly return the `char` property instead of
            // using `which`.
            if (nativeEvent.char && nativeEvent.char.length > 1) {
              return nativeEvent.char;
            } else if (nativeEvent.which) {
              return String.fromCharCode(nativeEvent.which);
            }
          }
          return null;
        case TOP_COMPOSITION_END:
          return useFallbackCompositionData ? null : nativeEvent.data;
        default:
          return null;
      }
    }

    /**
     * Extract a SyntheticInputEvent for `beforeInput`, based on either native
     * `textInput` or fallback behavior.
     *
     * @return {?object} A SyntheticInputEvent.
     */
    function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var chars = void 0;

      if (canUseTextInputEvent) {
        chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
      } else {
        chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
      }

      // If no characters are being inserted, no BeforeInput event should
      // be fired.
      if (!chars) {
        return null;
      }

      var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

      event.data = chars;
      accumulateTwoPhaseDispatches(event);
      return event;
    }

    /**
     * Create an `onBeforeInput` event to match
     * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
     *
     * This event plugin is based on the native `textInput` event
     * available in Chrome, Safari, Opera, and IE. This event fires after
     * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
     *
     * `beforeInput` is spec'd but not implemented in any browsers, and
     * the `input` event does not provide any useful information about what has
     * actually been added, contrary to the spec. Thus, `textInput` is the best
     * available event to identify the characters that have actually been inserted
     * into the target node.
     *
     * This plugin is also responsible for emitting `composition` events, thus
     * allowing us to share composition fallback code for both `beforeInput` and
     * `composition` event types.
     */
    var BeforeInputEventPlugin = {
      eventTypes: eventTypes,

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var composition = extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);

        var beforeInput = extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);

        if (composition === null) {
          return beforeInput;
        }

        if (beforeInput === null) {
          return composition;
        }

        return [composition, beforeInput];
      }
    };

    // Use to restore controlled state after a change event has fired.

    var fiberHostComponent = null;

    var ReactControlledComponentInjection = {
      injectFiberControlledHostComponent: function (hostComponentImpl) {
        // The fiber implementation doesn't use dynamic dispatch so we need to
        // inject the implementation.
        fiberHostComponent = hostComponentImpl;
      }
    };

    var restoreTarget = null;
    var restoreQueue = null;

    function restoreStateOfTarget(target) {
      // We perform this translation at the end of the event loop so that we
      // always receive the correct fiber here
      var internalInstance = getInstanceFromNode(target);
      if (!internalInstance) {
        // Unmounted
        return;
      }
      !(fiberHostComponent && typeof fiberHostComponent.restoreControlledState === 'function') ? invariant(false, 'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      var props = getFiberCurrentPropsFromNode(internalInstance.stateNode);
      fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
    }

    var injection$2 = ReactControlledComponentInjection;

    function enqueueStateRestore(target) {
      if (restoreTarget) {
        if (restoreQueue) {
          restoreQueue.push(target);
        } else {
          restoreQueue = [target];
        }
      } else {
        restoreTarget = target;
      }
    }

    function needsStateRestore() {
      return restoreTarget !== null || restoreQueue !== null;
    }

    function restoreStateIfNeeded() {
      if (!restoreTarget) {
        return;
      }
      var target = restoreTarget;
      var queuedTargets = restoreQueue;
      restoreTarget = null;
      restoreQueue = null;

      restoreStateOfTarget(target);
      if (queuedTargets) {
        for (var i = 0; i < queuedTargets.length; i++) {
          restoreStateOfTarget(queuedTargets[i]);
        }
      }
    }

    var ReactControlledComponent = Object.freeze({
      injection: injection$2,
      enqueueStateRestore: enqueueStateRestore,
      needsStateRestore: needsStateRestore,
      restoreStateIfNeeded: restoreStateIfNeeded
    });

    // Used as a way to call batchedUpdates when we don't have a reference to
    // the renderer. Such as when we're dispatching events or if third party
    // libraries need to call batchedUpdates. Eventually, this API will go away when
    // everything is batched by default. We'll then have a similar API to opt-out of
    // scheduled work and instead do synchronous work.

    // Defaults
    var _batchedUpdates = function (fn, bookkeeping) {
      return fn(bookkeeping);
    };
    var _interactiveUpdates = function (fn, a, b) {
      return fn(a, b);
    };
    var _flushInteractiveUpdates = function () {};

    var isBatching = false;
    function batchedUpdates(fn, bookkeeping) {
      if (isBatching) {
        // If we are currently inside another batch, we need to wait until it
        // fully completes before restoring state.
        return fn(bookkeeping);
      }
      isBatching = true;
      try {
        return _batchedUpdates(fn, bookkeeping);
      } finally {
        // Here we wait until all updates have propagated, which is important
        // when using controlled components within layers:
        // https://github.com/facebook/react/issues/1698
        // Then we restore state of any controlled component.
        isBatching = false;
        var controlledComponentsHavePendingUpdates = needsStateRestore();
        if (controlledComponentsHavePendingUpdates) {
          // If a controlled event was fired, we may need to restore the state of
          // the DOM node back to the controlled value. This is necessary when React
          // bails out of the update without touching the DOM.
          _flushInteractiveUpdates();
          restoreStateIfNeeded();
        }
      }
    }

    function interactiveUpdates(fn, a, b) {
      return _interactiveUpdates(fn, a, b);
    }

    var injection$3 = {
      injectRenderer: function (renderer) {
        _batchedUpdates = renderer.batchedUpdates;
        _interactiveUpdates = renderer.interactiveUpdates;
        _flushInteractiveUpdates = renderer.flushInteractiveUpdates;
      }
    };

    /**
     * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
     */
    var supportedInputTypes = {
      color: true,
      date: true,
      datetime: true,
      'datetime-local': true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };

    function isTextInputElement(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

      if (nodeName === 'input') {
        return !!supportedInputTypes[elem.type];
      }

      if (nodeName === 'textarea') {
        return true;
      }

      return false;
    }

    /**
     * HTML nodeType values that represent the type of the node
     */

    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var DOCUMENT_NODE = 9;
    var DOCUMENT_FRAGMENT_NODE = 11;

    /**
     * Gets the target node from a native browser event by accounting for
     * inconsistencies in browser DOM APIs.
     *
     * @param {object} nativeEvent Native browser event.
     * @return {DOMEventTarget} Target node.
     */
    function getEventTarget(nativeEvent) {
      // Fallback to nativeEvent.srcElement for IE9
      // https://github.com/facebook/react/issues/12506
      var target = nativeEvent.target || nativeEvent.srcElement || window;

      // Normalize SVG <use> element events #4963
      if (target.correspondingUseElement) {
        target = target.correspondingUseElement;
      }

      // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
      // @see http://www.quirksmode.org/js/events_properties.html
      return target.nodeType === TEXT_NODE ? target.parentNode : target;
    }

    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @param {?boolean} capture Check if the capture phase is supported.
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function isEventSupported(eventNameSuffix, capture) {
      if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
        return false;
      }

      var eventName = 'on' + eventNameSuffix;
      var isSupported = eventName in document;

      if (!isSupported) {
        var element = document.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
      }

      return isSupported;
    }

    function isCheckable(elem) {
      var type = elem.type;
      var nodeName = elem.nodeName;
      return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
    }

    function getTracker(node) {
      return node._valueTracker;
    }

    function detachTracker(node) {
      node._valueTracker = null;
    }

    function getValueFromNode(node) {
      var value = '';
      if (!node) {
        return value;
      }

      if (isCheckable(node)) {
        value = node.checked ? 'true' : 'false';
      } else {
        value = node.value;
      }

      return value;
    }

    function trackValueOnNode(node) {
      var valueField = isCheckable(node) ? 'checked' : 'value';
      var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);

      var currentValue = '' + node[valueField];

      // if someone has already defined a value or Safari, then bail
      // and don't track value will cause over reporting of changes,
      // but it's better then a hard failure
      // (needed for certain tests that spyOn input values and Safari)
      if (node.hasOwnProperty(valueField) || typeof descriptor === 'undefined' || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
        return;
      }
      var get = descriptor.get,
          set = descriptor.set;

      Object.defineProperty(node, valueField, {
        configurable: true,
        get: function () {
          return get.call(this);
        },
        set: function (value) {
          currentValue = '' + value;
          set.call(this, value);
        }
      });
      // We could've passed this the first time
      // but it triggers a bug in IE11 and Edge 14/15.
      // Calling defineProperty() again should be equivalent.
      // https://github.com/facebook/react/issues/11768
      Object.defineProperty(node, valueField, {
        enumerable: descriptor.enumerable
      });

      var tracker = {
        getValue: function () {
          return currentValue;
        },
        setValue: function (value) {
          currentValue = '' + value;
        },
        stopTracking: function () {
          detachTracker(node);
          delete node[valueField];
        }
      };
      return tracker;
    }

    function track(node) {
      if (getTracker(node)) {
        return;
      }

      // TODO: Once it's just Fiber we can move this to node._wrapperState
      node._valueTracker = trackValueOnNode(node);
    }

    function updateValueIfChanged(node) {
      if (!node) {
        return false;
      }

      var tracker = getTracker(node);
      // if there is no tracker at this point it's unlikely
      // that trying again will succeed
      if (!tracker) {
        return true;
      }

      var lastValue = tracker.getValue();
      var nextValue = getValueFromNode(node);
      if (nextValue !== lastValue) {
        tracker.setValue(nextValue);
        return true;
      }
      return false;
    }

    var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    var ReactCurrentOwner = ReactInternals.ReactCurrentOwner;
    var ReactDebugCurrentFrame = ReactInternals.ReactDebugCurrentFrame;

    var describeComponentFrame = function (name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      if (typeof type === 'string') {
        return type;
      }
      switch (type) {
        case REACT_ASYNC_MODE_TYPE:
          return 'AsyncMode';
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';
        case REACT_FRAGMENT_TYPE:
          return 'ReactFragment';
        case REACT_PORTAL_TYPE:
          return 'ReactPortal';
        case REACT_PROFILER_TYPE:
          return 'Profiler(' + fiber.pendingProps.id + ')';
        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';
        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';
        case REACT_TIMEOUT_TYPE:
          return 'Timeout';
      }
      if (typeof type === 'object' && type !== null) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            var functionName = type.render.displayName || type.render.name || '';
            return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        }
      }
      return null;
    }

    function describeFiber(fiber) {
      switch (fiber.tag) {
        case IndeterminateComponent:
        case FunctionalComponent:
        case ClassComponent:
        case HostComponent:
          var owner = fiber._debugOwner;
          var source = fiber._debugSource;
          var name = getComponentName(fiber);
          var ownerName = null;
          if (owner) {
            ownerName = getComponentName(owner);
          }
          return describeComponentFrame(name, source, ownerName);
        default:
          return '';
      }
    }

    // This function can only be called with a work-in-progress fiber and
    // only during begin or complete phase. Do not call it under any other
    // circumstances.
    function getStackAddendumByWorkInProgressFiber(workInProgress) {
      var info = '';
      var node = workInProgress;
      do {
        info += describeFiber(node);
        // Otherwise this return pointer might point to the wrong tree:
        node = node.return;
      } while (node);
      return info;
    }

    function getCurrentFiberOwnerName$1() {
      {
        var fiber = ReactDebugCurrentFiber.current;
        if (fiber === null) {
          return null;
        }
        var owner = fiber._debugOwner;
        if (owner !== null && typeof owner !== 'undefined') {
          return getComponentName(owner);
        }
      }
      return null;
    }

    function getCurrentFiberStackAddendum$1() {
      {
        var fiber = ReactDebugCurrentFiber.current;
        if (fiber === null) {
          return null;
        }
        // Safe because if current fiber exists, we are reconciling,
        // and it is guaranteed to be the work-in-progress version.
        return getStackAddendumByWorkInProgressFiber(fiber);
      }
      return null;
    }

    function resetCurrentFiber() {
      ReactDebugCurrentFrame.getCurrentStack = null;
      ReactDebugCurrentFiber.current = null;
      ReactDebugCurrentFiber.phase = null;
    }

    function setCurrentFiber(fiber) {
      ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum$1;
      ReactDebugCurrentFiber.current = fiber;
      ReactDebugCurrentFiber.phase = null;
    }

    function setCurrentPhase(phase) {
      ReactDebugCurrentFiber.phase = phase;
    }

    var ReactDebugCurrentFiber = {
      current: null,
      phase: null,
      resetCurrentFiber: resetCurrentFiber,
      setCurrentFiber: setCurrentFiber,
      setCurrentPhase: setCurrentPhase,
      getCurrentFiberOwnerName: getCurrentFiberOwnerName$1,
      getCurrentFiberStackAddendum: getCurrentFiberStackAddendum$1
    };

    // A reserved attribute.
    // It is handled by React separately and shouldn't be written to the DOM.
    var RESERVED = 0;

    // A simple string attribute.
    // Attributes that aren't in the whitelist are presumed to have this type.
    var STRING = 1;

    // A string attribute that accepts booleans in React. In HTML, these are called
    // "enumerated" attributes with "true" and "false" as possible values.
    // When true, it should be set to a "true" string.
    // When false, it should be set to a "false" string.
    var BOOLEANISH_STRING = 2;

    // A real boolean attribute.
    // When true, it should be present (set either to an empty string or its name).
    // When false, it should be omitted.
    var BOOLEAN = 3;

    // An attribute that can be used as a flag as well as with a value.
    // When true, it should be present (set either to an empty string or its name).
    // When false, it should be omitted.
    // For any other value, should be present with that value.
    var OVERLOADED_BOOLEAN = 4;

    // An attribute that must be numeric or parse as a numeric.
    // When falsy, it should be removed.
    var NUMERIC = 5;

    // An attribute that must be positive numeric or parse as a positive numeric.
    // When falsy, it should be removed.
    var POSITIVE_NUMERIC = 6;

    /* eslint-disable max-len */
    var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    /* eslint-enable max-len */
    var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';

    var ROOT_ATTRIBUTE_NAME = 'data-reactroot';
    var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');

    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};

    function isAttributeNameSafe(attributeName) {
      if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
        return true;
      }
      if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
        return false;
      }
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
        validatedAttributeNameCache[attributeName] = true;
        return true;
      }
      illegalAttributeNameCache[attributeName] = true;
      {
        warning(false, 'Invalid attribute name: `%s`', attributeName);
      }
      return false;
    }

    function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
      if (propertyInfo !== null) {
        return propertyInfo.type === RESERVED;
      }
      if (isCustomComponentTag) {
        return false;
      }
      if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
        return true;
      }
      return false;
    }

    function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
      if (propertyInfo !== null && propertyInfo.type === RESERVED) {
        return false;
      }
      switch (typeof value) {
        case 'function':
        // $FlowIssue symbol is perfectly valid here
        case 'symbol':
          // eslint-disable-line
          return true;
        case 'boolean':
          {
            if (isCustomComponentTag) {
              return false;
            }
            if (propertyInfo !== null) {
              return !propertyInfo.acceptsBooleans;
            } else {
              var prefix = name.toLowerCase().slice(0, 5);
              return prefix !== 'data-' && prefix !== 'aria-';
            }
          }
        default:
          return false;
      }
    }

    function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
      if (value === null || typeof value === 'undefined') {
        return true;
      }
      if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
        return true;
      }
      if (isCustomComponentTag) {
        return false;
      }
      if (propertyInfo !== null) {
        switch (propertyInfo.type) {
          case BOOLEAN:
            return !value;
          case OVERLOADED_BOOLEAN:
            return value === false;
          case NUMERIC:
            return isNaN(value);
          case POSITIVE_NUMERIC:
            return isNaN(value) || value < 1;
        }
      }
      return false;
    }

    function getPropertyInfo(name) {
      return properties.hasOwnProperty(name) ? properties[name] : null;
    }

    function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace) {
      this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
      this.attributeName = attributeName;
      this.attributeNamespace = attributeNamespace;
      this.mustUseProperty = mustUseProperty;
      this.propertyName = name;
      this.type = type;
    }

    // When adding attributes to this list, be sure to also add them to
    // the `possibleStandardNames` module to ensure casing and incorrect
    // name warnings.
    var properties = {};

    // These props are reserved by React. They shouldn't be written to the DOM.
    ['children', 'dangerouslySetInnerHTML',
    // TODO: This prevents the assignment of defaultValue to regular
    // elements (not just inputs). Now that ReactDOMInput assigns to the
    // defaultValue property -- do we need this?
    'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
      name, // attributeName
      null);
    } // attributeNamespace
    );

    // A few React string attributes have a different name.
    // This is a mapping from React prop names to the attribute names.
    [['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
      var name = _ref[0],
          attributeName = _ref[1];

      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, // attributeName
      null);
    } // attributeNamespace
    );

    // These are "enumerated" HTML attributes that accept "true" and "false".
    // In React, we let users pass `true` and `false` even though technically
    // these aren't boolean attributes (they are coerced to strings).
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are "enumerated" SVG attributes that accept "true" and "false".
    // In React, we let users pass `true` and `false` even though technically
    // these aren't boolean attributes (they are coerced to strings).
    // Since these are SVG attributes, their attribute names are case-sensitive.
    ['autoReverse', 'externalResourcesRequired', 'preserveAlpha'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
      name, // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML boolean attributes.
    ['allowFullScreen', 'async',
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless',
    // Microdata
    'itemScope'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are the few React props that we set as DOM properties
    // rather than attributes. These are all booleans.
    ['checked',
    // Note: `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`. We have special logic for handling this.
    'multiple', 'muted', 'selected'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML attributes that are "overloaded booleans": they behave like
    // booleans, but can also accept a string value.
    ['capture', 'download'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML attributes that must be positive numbers.
    ['cols', 'rows', 'size', 'span'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML attributes that must be numbers.
    ['rowSpan', 'start'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    var CAMELIZE = /[\-\:]([a-z])/g;
    var capitalize = function (token) {
      return token[1].toUpperCase();
    };

    // This is a list of all SVG attributes that need special casing, namespacing,
    // or boolean value assignment. Regular attributes that just accept strings
    // and have the same names are omitted, just like in the HTML whitelist.
    // Some of these attributes can be hard to find. This list was created by
    // scrapping the MDN documentation.
    ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height'].forEach(function (attributeName) {
      var name = attributeName.replace(CAMELIZE, capitalize);
      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, null);
    } // attributeNamespace
    );

    // String SVG attributes with the xlink namespace.
    ['xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type'].forEach(function (attributeName) {
      var name = attributeName.replace(CAMELIZE, capitalize);
      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, 'http://www.w3.org/1999/xlink');
    });

    // String SVG attributes with the xml namespace.
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (attributeName) {
      var name = attributeName.replace(CAMELIZE, capitalize);
      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, 'http://www.w3.org/XML/1998/namespace');
    });

    // Special case: this attribute exists both in HTML and SVG.
    // Its "tabindex" attribute name is case-sensitive in SVG so we can't just use
    // its React `tabIndex` name, like we do for attributes that exist only in HTML.
    properties.tabIndex = new PropertyInfoRecord('tabIndex', STRING, false, // mustUseProperty
    'tabindex', // attributeName
    null);

    /**
     * Get the value for a property on a node. Only used in DEV for SSR validation.
     * The "expected" argument is used as a hint of what the expected value is.
     * Some properties have multiple equivalent values.
     */
    function getValueForProperty(node, name, expected, propertyInfo) {
      {
        if (propertyInfo.mustUseProperty) {
          var propertyName = propertyInfo.propertyName;

          return node[propertyName];
        } else {
          var attributeName = propertyInfo.attributeName;

          var stringValue = null;

          if (propertyInfo.type === OVERLOADED_BOOLEAN) {
            if (node.hasAttribute(attributeName)) {
              var value = node.getAttribute(attributeName);
              if (value === '') {
                return true;
              }
              if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
                return value;
              }
              if (value === '' + expected) {
                return expected;
              }
              return value;
            }
          } else if (node.hasAttribute(attributeName)) {
            if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
              // We had an attribute but shouldn't have had one, so read it
              // for the error message.
              return node.getAttribute(attributeName);
            }
            if (propertyInfo.type === BOOLEAN) {
              // If this was a boolean, it doesn't matter what the value is
              // the fact that we have it is the same as the expected.
              return expected;
            }
            // Even if this property uses a namespace we use getAttribute
            // because we assume its namespaced name is the same as our config.
            // To use getAttributeNS we need the local name which we don't have
            // in our config atm.
            stringValue = node.getAttribute(attributeName);
          }

          if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
            return stringValue === null ? expected : stringValue;
          } else if (stringValue === '' + expected) {
            return expected;
          } else {
            return stringValue;
          }
        }
      }
    }

    /**
     * Get the value for a attribute on a node. Only used in DEV for SSR validation.
     * The third argument is used as a hint of what the expected value is. Some
     * attributes have multiple equivalent values.
     */
    function getValueForAttribute(node, name, expected) {
      {
        if (!isAttributeNameSafe(name)) {
          return;
        }
        if (!node.hasAttribute(name)) {
          return expected === undefined ? undefined : null;
        }
        var value = node.getAttribute(name);
        if (value === '' + expected) {
          return expected;
        }
        return value;
      }
    }

    /**
     * Sets the value for a property on a node.
     *
     * @param {DOMElement} node
     * @param {string} name
     * @param {*} value
     */
    function setValueForProperty(node, name, value, isCustomComponentTag) {
      var propertyInfo = getPropertyInfo(name);
      if (shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) {
        return;
      }
      if (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag)) {
        value = null;
      }
      // If the prop isn't in the special list, treat it as a simple attribute.
      if (isCustomComponentTag || propertyInfo === null) {
        if (isAttributeNameSafe(name)) {
          var _attributeName = name;
          if (value === null) {
            node.removeAttribute(_attributeName);
          } else {
            node.setAttribute(_attributeName, '' + value);
          }
        }
        return;
      }
      var mustUseProperty = propertyInfo.mustUseProperty;

      if (mustUseProperty) {
        var propertyName = propertyInfo.propertyName;

        if (value === null) {
          var type = propertyInfo.type;

          node[propertyName] = type === BOOLEAN ? false : '';
        } else {
          // Contrary to `setAttribute`, object properties are properly
          // `toString`ed by IE8/9.
          node[propertyName] = value;
        }
        return;
      }
      // The rest are treated as attributes with special cases.
      var attributeName = propertyInfo.attributeName,
          attributeNamespace = propertyInfo.attributeNamespace;

      if (value === null) {
        node.removeAttribute(attributeName);
      } else {
        var _type = propertyInfo.type;

        var attributeValue = void 0;
        if (_type === BOOLEAN || _type === OVERLOADED_BOOLEAN && value === true) {
          attributeValue = '';
        } else {
          // `setAttribute` with objects becomes only `[object]` in IE8/9,
          // ('' + value) makes it output the correct toString()-value.
          attributeValue = '' + value;
        }
        if (attributeNamespace) {
          node.setAttributeNS(attributeNamespace, attributeName, attributeValue);
        } else {
          node.setAttribute(attributeName, attributeValue);
        }
      }
    }

    var ReactControlledValuePropTypes = {
      checkPropTypes: null
    };

    {
      var hasReadOnlyValue = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
      };

      var propTypes = {
        value: function (props, propName, componentName) {
          if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
            return null;
          }
          return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
        },
        checked: function (props, propName, componentName) {
          if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
            return null;
          }
          return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
        }
      };

      /**
       * Provide a linked `value` attribute for controlled forms. You should not use
       * this outside of the ReactDOM controlled form components.
       */
      ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
        checkPropTypes(propTypes, props, 'prop', tagName, getStack);
      };
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberOwnerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
    var getCurrentFiberStackAddendum = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnValueDefaultValue = false;
    var didWarnCheckedDefaultChecked = false;
    var didWarnControlledToUncontrolled = false;
    var didWarnUncontrolledToControlled = false;

    function isControlled(props) {
      var usesChecked = props.type === 'checkbox' || props.type === 'radio';
      return usesChecked ? props.checked != null : props.value != null;
    }

    /**
     * Implements an <input> host component that allows setting these optional
     * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
     *
     * If `checked` or `value` are not supplied (or null/undefined), user actions
     * that affect the checked state or value will trigger updates to the element.
     *
     * If they are supplied (and not null/undefined), the rendered element will not
     * trigger updates to the element. Instead, the props must change in order for
     * the rendered element to be updated.
     *
     * The rendered element will be initialized as unchecked (or `defaultChecked`)
     * with an empty value (or `defaultValue`).
     *
     * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
     */

    function getHostProps(element, props) {
      var node = element;
      var checked = props.checked;

      var hostProps = _assign({}, props, {
        defaultChecked: undefined,
        defaultValue: undefined,
        value: undefined,
        checked: checked != null ? checked : node._wrapperState.initialChecked
      });

      return hostProps;
    }

    function initWrapperState(element, props) {
      {
        ReactControlledValuePropTypes.checkPropTypes('input', props, getCurrentFiberStackAddendum);

        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
          warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName() || 'A component', props.type);
          didWarnCheckedDefaultChecked = true;
        }
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
          warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName() || 'A component', props.type);
          didWarnValueDefaultValue = true;
        }
      }

      var node = element;
      var defaultValue = props.defaultValue == null ? '' : props.defaultValue;

      node._wrapperState = {
        initialChecked: props.checked != null ? props.checked : props.defaultChecked,
        initialValue: getSafeValue(props.value != null ? props.value : defaultValue),
        controlled: isControlled(props)
      };
    }

    function updateChecked(element, props) {
      var node = element;
      var checked = props.checked;
      if (checked != null) {
        setValueForProperty(node, 'checked', checked, false);
      }
    }

    function updateWrapper(element, props) {
      var node = element;
      {
        var _controlled = isControlled(props);

        if (!node._wrapperState.controlled && _controlled && !didWarnUncontrolledToControlled) {
          warning(false, 'A component is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum());
          didWarnUncontrolledToControlled = true;
        }
        if (node._wrapperState.controlled && !_controlled && !didWarnControlledToUncontrolled) {
          warning(false, 'A component is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum());
          didWarnControlledToUncontrolled = true;
        }
      }

      updateChecked(element, props);

      var value = getSafeValue(props.value);

      if (value != null) {
        if (props.type === 'number') {
          if (value === 0 && node.value === '' ||
          // eslint-disable-next-line
          node.value != value) {
            node.value = '' + value;
          }
        } else if (node.value !== '' + value) {
          node.value = '' + value;
        }
      }

      if (props.hasOwnProperty('value')) {
        setDefaultValue(node, props.type, value);
      } else if (props.hasOwnProperty('defaultValue')) {
        setDefaultValue(node, props.type, getSafeValue(props.defaultValue));
      }

      if (props.checked == null && props.defaultChecked != null) {
        node.defaultChecked = !!props.defaultChecked;
      }
    }

    function postMountWrapper(element, props, isHydrating) {
      var node = element;

      if (props.hasOwnProperty('value') || props.hasOwnProperty('defaultValue')) {
        var _initialValue = '' + node._wrapperState.initialValue;
        var currentValue = node.value;

        // Do not assign value if it is already set. This prevents user text input
        // from being lost during SSR hydration.
        if (!isHydrating) {
          // Do not re-assign the value property if there is no change. This
          // potentially avoids a DOM write and prevents Firefox (~60.0.1) from
          // prematurely marking required inputs as invalid
          if (_initialValue !== currentValue) {
            node.value = _initialValue;
          }
        }

        // value must be assigned before defaultValue. This fixes an issue where the
        // visually displayed value of date inputs disappears on mobile Safari and Chrome:
        // https://github.com/facebook/react/issues/7233
        node.defaultValue = _initialValue;
      }

      // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
      // this is needed to work around a chrome bug where setting defaultChecked
      // will sometimes influence the value of checked (even after detachment).
      // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
      // We need to temporarily unset name to avoid disrupting radio button groups.
      var name = node.name;
      if (name !== '') {
        node.name = '';
      }
      node.defaultChecked = !node.defaultChecked;
      node.defaultChecked = !node.defaultChecked;
      if (name !== '') {
        node.name = name;
      }
    }

    function restoreControlledState(element, props) {
      var node = element;
      updateWrapper(node, props);
      updateNamedCousins(node, props);
    }

    function updateNamedCousins(rootNode, props) {
      var name = props.name;
      if (props.type === 'radio' && name != null) {
        var queryRoot = rootNode;

        while (queryRoot.parentNode) {
          queryRoot = queryRoot.parentNode;
        }

        // If `rootNode.form` was non-null, then we could try `form.elements`,
        // but that sometimes behaves strangely in IE8. We could also try using
        // `form.getElementsByName`, but that will only return direct children
        // and won't include inputs that use the HTML5 `form=` attribute. Since
        // the input might not even be in a form. It might not even be in the
        // document. Let's just use the local `querySelectorAll` to ensure we don't
        // miss anything.
        var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

        for (var i = 0; i < group.length; i++) {
          var otherNode = group[i];
          if (otherNode === rootNode || otherNode.form !== rootNode.form) {
            continue;
          }
          // This will throw if radio buttons rendered by different copies of React
          // and the same name are rendered into the same form (same as #1939).
          // That's probably okay; we don't support it just as we don't support
          // mixing React radio buttons with non-React ones.
          var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
          !otherProps ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : void 0;

          // We need update the tracked value on the named cousin since the value
          // was changed but the input saw no event or value set
          updateValueIfChanged(otherNode);

          // If this is a controlled radio button group, forcing the input that
          // was previously checked to update will cause it to be come re-checked
          // as appropriate.
          updateWrapper(otherNode, otherProps);
        }
      }
    }

    // In Chrome, assigning defaultValue to certain input types triggers input validation.
    // For number inputs, the display value loses trailing decimal points. For email inputs,
    // Chrome raises "The specified value <x> is not a valid email address".
    //
    // Here we check to see if the defaultValue has actually changed, avoiding these problems
    // when the user is inputting text
    //
    // https://github.com/facebook/react/issues/7253
    function setDefaultValue(node, type, value) {
      if (
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      type !== 'number' || node.ownerDocument.activeElement !== node) {
        if (value == null) {
          node.defaultValue = '' + node._wrapperState.initialValue;
        } else if (node.defaultValue !== '' + value) {
          node.defaultValue = '' + value;
        }
      }
    }

    function getSafeValue(value) {
      switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
        case 'undefined':
          return value;
        default:
          // function, symbol are assigned as empty strings
          return '';
      }
    }

    var eventTypes$1 = {
      change: {
        phasedRegistrationNames: {
          bubbled: 'onChange',
          captured: 'onChangeCapture'
        },
        dependencies: [TOP_BLUR, TOP_CHANGE, TOP_CLICK, TOP_FOCUS, TOP_INPUT, TOP_KEY_DOWN, TOP_KEY_UP, TOP_SELECTION_CHANGE]
      }
    };

    function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
      var event = SyntheticEvent$1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
      event.type = 'change';
      // Flag this event loop as needing state restore.
      enqueueStateRestore(target);
      accumulateTwoPhaseDispatches(event);
      return event;
    }
    /**
     * For IE shims
     */
    var activeElement = null;
    var activeElementInst = null;

    /**
     * SECTION: handle `change` event
     */
    function shouldUseChangeEvent(elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
    }

    function manualDispatchChangeEvent(nativeEvent) {
      var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));

      // If change and propertychange bubbled, we'd just bind to it like all the
      // other events and have it go through ReactBrowserEventEmitter. Since it
      // doesn't, we manually listen for the events and so we have to enqueue and
      // process the abstract event manually.
      //
      // Batching is necessary here in order to ensure that all event handlers run
      // before the next rerender (including event handlers attached to ancestor
      // elements instead of directly on the input). Without this, controlled
      // components don't work properly in conjunction with event bubbling because
      // the component is rerendered and the value reverted before all the event
      // handlers can run. See https://github.com/facebook/react/issues/708.
      batchedUpdates(runEventInBatch, event);
    }

    function runEventInBatch(event) {
      runEventsInBatch(event, false);
    }

    function getInstIfValueChanged(targetInst) {
      var targetNode = getNodeFromInstance$1(targetInst);
      if (updateValueIfChanged(targetNode)) {
        return targetInst;
      }
    }

    function getTargetInstForChangeEvent(topLevelType, targetInst) {
      if (topLevelType === TOP_CHANGE) {
        return targetInst;
      }
    }

    /**
     * SECTION: handle `input` event
     */
    var isInputEventSupported = false;
    if (ExecutionEnvironment.canUseDOM) {
      // IE9 claims to support the input event but fails to trigger it when
      // deleting text, so we ignore its input events.
      isInputEventSupported = isEventSupported('input') && (!document.documentMode || document.documentMode > 9);
    }

    /**
     * (For IE <=9) Starts tracking propertychange events on the passed-in element
     * and override the value property so that we can distinguish user events from
     * value changes in JS.
     */
    function startWatchingForValueChange(target, targetInst) {
      activeElement = target;
      activeElementInst = targetInst;
      activeElement.attachEvent('onpropertychange', handlePropertyChange);
    }

    /**
     * (For IE <=9) Removes the event listeners from the currently-tracked element,
     * if any exists.
     */
    function stopWatchingForValueChange() {
      if (!activeElement) {
        return;
      }
      activeElement.detachEvent('onpropertychange', handlePropertyChange);
      activeElement = null;
      activeElementInst = null;
    }

    /**
     * (For IE <=9) Handles a propertychange event, sending a `change` event if
     * the value of the active element has changed.
     */
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName !== 'value') {
        return;
      }
      if (getInstIfValueChanged(activeElementInst)) {
        manualDispatchChangeEvent(nativeEvent);
      }
    }

    function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
      if (topLevelType === TOP_FOCUS) {
        // In IE9, propertychange fires for most input events but is buggy and
        // doesn't fire when text is deleted, but conveniently, selectionchange
        // appears to fire in all of the remaining cases so we catch those and
        // forward the event if the value has changed
        // In either case, we don't want to call the event handler if the value
        // is changed from JS so we redefine a setter for `.value` that updates
        // our activeElementValue variable, allowing us to ignore those changes
        //
        // stopWatching() should be a noop here but we call it just in case we
        // missed a blur event somehow.
        stopWatchingForValueChange();
        startWatchingForValueChange(target, targetInst);
      } else if (topLevelType === TOP_BLUR) {
        stopWatchingForValueChange();
      }
    }

    // For IE8 and IE9.
    function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
      if (topLevelType === TOP_SELECTION_CHANGE || topLevelType === TOP_KEY_UP || topLevelType === TOP_KEY_DOWN) {
        // On the selectionchange event, the target is just document which isn't
        // helpful for us so just check activeElement instead.
        //
        // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
        // propertychange on the first input event after setting `value` from a
        // script and fires only keydown, keypress, keyup. Catching keyup usually
        // gets it and catching keydown lets us fire an event for the first
        // keystroke if user does a key repeat (it'll be a little delayed: right
        // before the second keystroke). Other input methods (e.g., paste) seem to
        // fire selectionchange normally.
        return getInstIfValueChanged(activeElementInst);
      }
    }

    /**
     * SECTION: handle `click` event
     */
    function shouldUseClickEvent(elem) {
      // Use the `click` event to detect changes to checkbox and radio inputs.
      // This approach works across all browsers, whereas `change` does not fire
      // until `blur` in IE8.
      var nodeName = elem.nodeName;
      return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
    }

    function getTargetInstForClickEvent(topLevelType, targetInst) {
      if (topLevelType === TOP_CLICK) {
        return getInstIfValueChanged(targetInst);
      }
    }

    function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
      if (topLevelType === TOP_INPUT || topLevelType === TOP_CHANGE) {
        return getInstIfValueChanged(targetInst);
      }
    }

    function handleControlledInputBlur(node) {
      var state = node._wrapperState;

      if (!state || !state.controlled || node.type !== 'number') {
        return;
      }

      // If controlled, assign the value attribute to the current value on blur
      setDefaultValue(node, 'number', node.value);
    }

    /**
     * This plugin creates an `onChange` event that normalizes change events
     * across form elements. This event fires at a time when it's possible to
     * change the element's value without seeing a flicker.
     *
     * Supported elements are:
     * - input (see `isTextInputElement`)
     * - textarea
     * - select
     */
    var ChangeEventPlugin = {
      eventTypes: eventTypes$1,

      _isInputEventSupported: isInputEventSupported,

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

        var getTargetInstFunc = void 0,
            handleEventFunc = void 0;
        if (shouldUseChangeEvent(targetNode)) {
          getTargetInstFunc = getTargetInstForChangeEvent;
        } else if (isTextInputElement(targetNode)) {
          if (isInputEventSupported) {
            getTargetInstFunc = getTargetInstForInputOrChangeEvent;
          } else {
            getTargetInstFunc = getTargetInstForInputEventPolyfill;
            handleEventFunc = handleEventsForInputEventPolyfill;
          }
        } else if (shouldUseClickEvent(targetNode)) {
          getTargetInstFunc = getTargetInstForClickEvent;
        }

        if (getTargetInstFunc) {
          var inst = getTargetInstFunc(topLevelType, targetInst);
          if (inst) {
            var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
            return event;
          }
        }

        if (handleEventFunc) {
          handleEventFunc(topLevelType, targetNode, targetInst);
        }

        // When blurring, set the value attribute for number inputs
        if (topLevelType === TOP_BLUR) {
          handleControlledInputBlur(targetNode);
        }
      }
    };

    /**
     * Module that is injectable into `EventPluginHub`, that specifies a
     * deterministic ordering of `EventPlugin`s. A convenient way to reason about
     * plugins, without having to package every one of them. This is better than
     * having plugins be ordered in the same order that they are injected because
     * that ordering would be influenced by the packaging order.
     * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
     * preventing default on events is convenient in `SimpleEventPlugin` handlers.
     */
    var DOMEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];

    var SyntheticUIEvent = SyntheticEvent$1.extend({
      view: null,
      detail: null
    });

    /**
     * Translation from modifier key to the associated property in the event.
     * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
     */

    var modifierKeyToProp = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey'
    };

    // IE8 does not implement getModifierState so we simply map it to the only
    // modifier keys exposed by the event itself, does not support Lock-keys.
    // Currently, all major browsers except Chrome seems to support Lock-keys.
    function modifierStateGetter(keyArg) {
      var syntheticEvent = this;
      var nativeEvent = syntheticEvent.nativeEvent;
      if (nativeEvent.getModifierState) {
        return nativeEvent.getModifierState(keyArg);
      }
      var keyProp = modifierKeyToProp[keyArg];
      return keyProp ? !!nativeEvent[keyProp] : false;
    }

    function getEventModifierState(nativeEvent) {
      return modifierStateGetter;
    }

    /**
     * @interface MouseEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticMouseEvent = SyntheticUIEvent.extend({
      screenX: null,
      screenY: null,
      clientX: null,
      clientY: null,
      pageX: null,
      pageY: null,
      ctrlKey: null,
      shiftKey: null,
      altKey: null,
      metaKey: null,
      getModifierState: getEventModifierState,
      button: null,
      buttons: null,
      relatedTarget: function (event) {
        return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
      }
    });

    /**
     * @interface PointerEvent
     * @see http://www.w3.org/TR/pointerevents/
     */
    var SyntheticPointerEvent = SyntheticMouseEvent.extend({
      pointerId: null,
      width: null,
      height: null,
      pressure: null,
      tiltX: null,
      tiltY: null,
      pointerType: null,
      isPrimary: null
    });

    var eventTypes$2 = {
      mouseEnter: {
        registrationName: 'onMouseEnter',
        dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
      },
      mouseLeave: {
        registrationName: 'onMouseLeave',
        dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
      },
      pointerEnter: {
        registrationName: 'onPointerEnter',
        dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
      },
      pointerLeave: {
        registrationName: 'onPointerLeave',
        dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
      }
    };

    var EnterLeaveEventPlugin = {
      eventTypes: eventTypes$2,

      /**
       * For almost every interaction we care about, there will be both a top-level
       * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
       * we do not extract duplicate events. However, moving the mouse into the
       * browser from outside will not fire a `mouseout` event. In this case, we use
       * the `mouseover` top-level event.
       */
      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var isOverEvent = topLevelType === TOP_MOUSE_OVER || topLevelType === TOP_POINTER_OVER;
        var isOutEvent = topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_POINTER_OUT;

        if (isOverEvent && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
          return null;
        }

        if (!isOutEvent && !isOverEvent) {
          // Must not be a mouse or pointer in or out - ignoring.
          return null;
        }

        var win = void 0;
        if (nativeEventTarget.window === nativeEventTarget) {
          // `nativeEventTarget` is probably a window object.
          win = nativeEventTarget;
        } else {
          // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
          var doc = nativeEventTarget.ownerDocument;
          if (doc) {
            win = doc.defaultView || doc.parentWindow;
          } else {
            win = window;
          }
        }

        var from = void 0;
        var to = void 0;
        if (isOutEvent) {
          from = targetInst;
          var related = nativeEvent.relatedTarget || nativeEvent.toElement;
          to = related ? getClosestInstanceFromNode(related) : null;
        } else {
          // Moving to a node from outside the window.
          from = null;
          to = targetInst;
        }

        if (from === to) {
          // Nothing pertains to our managed components.
          return null;
        }

        var eventInterface = void 0,
            leaveEventType = void 0,
            enterEventType = void 0,
            eventTypePrefix = void 0;

        if (topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_MOUSE_OVER) {
          eventInterface = SyntheticMouseEvent;
          leaveEventType = eventTypes$2.mouseLeave;
          enterEventType = eventTypes$2.mouseEnter;
          eventTypePrefix = 'mouse';
        } else if (topLevelType === TOP_POINTER_OUT || topLevelType === TOP_POINTER_OVER) {
          eventInterface = SyntheticPointerEvent;
          leaveEventType = eventTypes$2.pointerLeave;
          enterEventType = eventTypes$2.pointerEnter;
          eventTypePrefix = 'pointer';
        }

        var fromNode = from == null ? win : getNodeFromInstance$1(from);
        var toNode = to == null ? win : getNodeFromInstance$1(to);

        var leave = eventInterface.getPooled(leaveEventType, from, nativeEvent, nativeEventTarget);
        leave.type = eventTypePrefix + 'leave';
        leave.target = fromNode;
        leave.relatedTarget = toNode;

        var enter = eventInterface.getPooled(enterEventType, to, nativeEvent, nativeEventTarget);
        enter.type = eventTypePrefix + 'enter';
        enter.target = toNode;
        enter.relatedTarget = fromNode;

        accumulateEnterLeaveDispatches(leave, enter, from, to);

        return [leave, enter];
      }
    };

    /**
     * `ReactInstanceMap` maintains a mapping from a public facing stateful
     * instance (key) and the internal representation (value). This allows public
     * methods to accept the user facing instance as an argument and map them back
     * to internal methods.
     *
     * Note that this module is currently shared and assumed to be stateless.
     * If this becomes an actual Map, that will break.
     */

    /**
     * This API should be called `delete` but we'd have to make sure to always
     * transform these to strings for IE support. When this transform is fully
     * supported we can rename it.
     */

    function get(key) {
      return key._reactInternalFiber;
    }

    function has(key) {
      return key._reactInternalFiber !== undefined;
    }

    function set(key, value) {
      key._reactInternalFiber = value;
    }

    // Don't change these two values. They're used by React Dev Tools.
    var NoEffect = /*              */0;
    var PerformedWork = /*         */1;

    // You can change the rest (and add more).
    var Placement = /*             */2;
    var Update = /*                */4;
    var PlacementAndUpdate = /*    */6;
    var Deletion = /*              */8;
    var ContentReset = /*          */16;
    var Callback = /*              */32;
    var DidCapture = /*            */64;
    var Ref = /*                   */128;
    var Snapshot = /*              */256;

    // Union of all host effects
    var HostEffectMask = /*        */511;

    var Incomplete = /*            */512;
    var ShouldCapture = /*         */1024;

    var MOUNTING = 1;
    var MOUNTED = 2;
    var UNMOUNTED = 3;

    function isFiberMountedImpl(fiber) {
      var node = fiber;
      if (!fiber.alternate) {
        // If there is no alternate, this might be a new tree that isn't inserted
        // yet. If it is, then it will have a pending insertion effect on it.
        if ((node.effectTag & Placement) !== NoEffect) {
          return MOUNTING;
        }
        while (node.return) {
          node = node.return;
          if ((node.effectTag & Placement) !== NoEffect) {
            return MOUNTING;
          }
        }
      } else {
        while (node.return) {
          node = node.return;
        }
      }
      if (node.tag === HostRoot) {
        // TODO: Check if this was a nested HostRoot when used with
        // renderContainerIntoSubtree.
        return MOUNTED;
      }
      // If we didn't hit the root, that means that we're in an disconnected tree
      // that has been unmounted.
      return UNMOUNTED;
    }

    function isFiberMounted(fiber) {
      return isFiberMountedImpl(fiber) === MOUNTED;
    }

    function isMounted(component) {
      {
        var owner = ReactCurrentOwner.current;
        if (owner !== null && owner.tag === ClassComponent) {
          var ownerFiber = owner;
          var instance = ownerFiber.stateNode;
          !instance._warnedAboutRefsInRender ? warning(false, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber) || 'A component') : void 0;
          instance._warnedAboutRefsInRender = true;
        }
      }

      var fiber = get(component);
      if (!fiber) {
        return false;
      }
      return isFiberMountedImpl(fiber) === MOUNTED;
    }

    function assertIsMounted(fiber) {
      !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
    }

    function findCurrentFiberUsingSlowPath(fiber) {
      var alternate = fiber.alternate;
      if (!alternate) {
        // If there is no alternate, then we only need to check if it is mounted.
        var state = isFiberMountedImpl(fiber);
        !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
        if (state === MOUNTING) {
          return null;
        }
        return fiber;
      }
      // If we have two possible branches, we'll walk backwards up to the root
      // to see what path the root points to. On the way we may hit one of the
      // special cases and we'll deal with them.
      var a = fiber;
      var b = alternate;
      while (true) {
        var parentA = a.return;
        var parentB = parentA ? parentA.alternate : null;
        if (!parentA || !parentB) {
          // We're at the root.
          break;
        }

        // If both copies of the parent fiber point to the same child, we can
        // assume that the child is current. This happens when we bailout on low
        // priority: the bailed out fiber's child reuses the current child.
        if (parentA.child === parentB.child) {
          var child = parentA.child;
          while (child) {
            if (child === a) {
              // We've determined that A is the current branch.
              assertIsMounted(parentA);
              return fiber;
            }
            if (child === b) {
              // We've determined that B is the current branch.
              assertIsMounted(parentA);
              return alternate;
            }
            child = child.sibling;
          }
          // We should never have an alternate for any mounting node. So the only
          // way this could possibly happen is if this was unmounted, if at all.
          invariant(false, 'Unable to find node on an unmounted component.');
        }

        if (a.return !== b.return) {
          // The return pointer of A and the return pointer of B point to different
          // fibers. We assume that return pointers never criss-cross, so A must
          // belong to the child set of A.return, and B must belong to the child
          // set of B.return.
          a = parentA;
          b = parentB;
        } else {
          // The return pointers point to the same fiber. We'll have to use the
          // default, slow path: scan the child sets of each parent alternate to see
          // which child belongs to which set.
          //
          // Search parent A's child set
          var didFindChild = false;
          var _child = parentA.child;
          while (_child) {
            if (_child === a) {
              didFindChild = true;
              a = parentA;
              b = parentB;
              break;
            }
            if (_child === b) {
              didFindChild = true;
              b = parentA;
              a = parentB;
              break;
            }
            _child = _child.sibling;
          }
          if (!didFindChild) {
            // Search parent B's child set
            _child = parentB.child;
            while (_child) {
              if (_child === a) {
                didFindChild = true;
                a = parentB;
                b = parentA;
                break;
              }
              if (_child === b) {
                didFindChild = true;
                b = parentB;
                a = parentA;
                break;
              }
              _child = _child.sibling;
            }
            !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
          }
        }

        !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
      // If the root is not a host container, we're in a disconnected tree. I.e.
      // unmounted.
      !(a.tag === HostRoot) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
      if (a.stateNode.current === a) {
        // We've determined that A is the current branch.
        return fiber;
      }
      // Otherwise B has to be current branch.
      return alternate;
    }

    function findCurrentHostFiber(parent) {
      var currentParent = findCurrentFiberUsingSlowPath(parent);
      if (!currentParent) {
        return null;
      }

      // Next we'll drill down this component to find the first HostComponent/Text.
      var node = currentParent;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          return node;
        } else if (node.child) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === currentParent) {
          return null;
        }
        while (!node.sibling) {
          if (!node.return || node.return === currentParent) {
            return null;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      // Flow needs the return null here, but ESLint complains about it.
      // eslint-disable-next-line no-unreachable
      return null;
    }

    function findCurrentHostFiberWithNoPortals(parent) {
      var currentParent = findCurrentFiberUsingSlowPath(parent);
      if (!currentParent) {
        return null;
      }

      // Next we'll drill down this component to find the first HostComponent/Text.
      var node = currentParent;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          return node;
        } else if (node.child && node.tag !== HostPortal) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === currentParent) {
          return null;
        }
        while (!node.sibling) {
          if (!node.return || node.return === currentParent) {
            return null;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      // Flow needs the return null here, but ESLint complains about it.
      // eslint-disable-next-line no-unreachable
      return null;
    }

    function addEventBubbleListener(element, eventType, listener) {
      element.addEventListener(eventType, listener, false);
    }

    function addEventCaptureListener(element, eventType, listener) {
      element.addEventListener(eventType, listener, true);
    }

    /**
     * @interface Event
     * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
     */
    var SyntheticAnimationEvent = SyntheticEvent$1.extend({
      animationName: null,
      elapsedTime: null,
      pseudoElement: null
    });

    /**
     * @interface Event
     * @see http://www.w3.org/TR/clipboard-apis/
     */
    var SyntheticClipboardEvent = SyntheticEvent$1.extend({
      clipboardData: function (event) {
        return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
      }
    });

    /**
     * @interface FocusEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticFocusEvent = SyntheticUIEvent.extend({
      relatedTarget: null
    });

    /**
     * `charCode` represents the actual "character code" and is safe to use with
     * `String.fromCharCode`. As such, only keys that correspond to printable
     * characters produce a valid `charCode`, the only exception to this is Enter.
     * The Tab-key is considered non-printable and does not have a `charCode`,
     * presumably because it does not produce a tab-character in browsers.
     *
     * @param {object} nativeEvent Native browser event.
     * @return {number} Normalized `charCode` property.
     */
    function getEventCharCode(nativeEvent) {
      var charCode = void 0;
      var keyCode = nativeEvent.keyCode;

      if ('charCode' in nativeEvent) {
        charCode = nativeEvent.charCode;

        // FF does not set `charCode` for the Enter-key, check against `keyCode`.
        if (charCode === 0 && keyCode === 13) {
          charCode = 13;
        }
      } else {
        // IE8 does not implement `charCode`, but `keyCode` has the correct value.
        charCode = keyCode;
      }

      // IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
      // report Enter as charCode 10 when ctrl is pressed.
      if (charCode === 10) {
        charCode = 13;
      }

      // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
      // Must not discard the (non-)printable Enter-key.
      if (charCode >= 32 || charCode === 13) {
        return charCode;
      }

      return 0;
    }

    /**
     * Normalization of deprecated HTML5 `key` values
     * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
     */
    var normalizeKey = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified'
    };

    /**
     * Translation from legacy `keyCode` to HTML5 `key`
     * Only special keys supported, all others depend on keyboard layout or browser
     * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
     */
    var translateToKey = {
      '8': 'Backspace',
      '9': 'Tab',
      '12': 'Clear',
      '13': 'Enter',
      '16': 'Shift',
      '17': 'Control',
      '18': 'Alt',
      '19': 'Pause',
      '20': 'CapsLock',
      '27': 'Escape',
      '32': ' ',
      '33': 'PageUp',
      '34': 'PageDown',
      '35': 'End',
      '36': 'Home',
      '37': 'ArrowLeft',
      '38': 'ArrowUp',
      '39': 'ArrowRight',
      '40': 'ArrowDown',
      '45': 'Insert',
      '46': 'Delete',
      '112': 'F1',
      '113': 'F2',
      '114': 'F3',
      '115': 'F4',
      '116': 'F5',
      '117': 'F6',
      '118': 'F7',
      '119': 'F8',
      '120': 'F9',
      '121': 'F10',
      '122': 'F11',
      '123': 'F12',
      '144': 'NumLock',
      '145': 'ScrollLock',
      '224': 'Meta'
    };

    /**
     * @param {object} nativeEvent Native browser event.
     * @return {string} Normalized `key` property.
     */
    function getEventKey(nativeEvent) {
      if (nativeEvent.key) {
        // Normalize inconsistent values reported by browsers due to
        // implementations of a working draft specification.

        // FireFox implements `key` but returns `MozPrintableKey` for all
        // printable characters (normalized to `Unidentified`), ignore it.
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if (key !== 'Unidentified') {
          return key;
        }
      }

      // Browser does not implement `key`, polyfill as much of it as we can.
      if (nativeEvent.type === 'keypress') {
        var charCode = getEventCharCode(nativeEvent);

        // The enter-key is technically both printable and non-printable and can
        // thus be captured by `keypress`, no other non-printable key should.
        return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
      }
      if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
        // While user keyboard layout determines the actual meaning of each
        // `keyCode` value, almost all function keys have a universal value.
        return translateToKey[nativeEvent.keyCode] || 'Unidentified';
      }
      return '';
    }

    /**
     * @interface KeyboardEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticKeyboardEvent = SyntheticUIEvent.extend({
      key: getEventKey,
      location: null,
      ctrlKey: null,
      shiftKey: null,
      altKey: null,
      metaKey: null,
      repeat: null,
      locale: null,
      getModifierState: getEventModifierState,
      // Legacy Interface
      charCode: function (event) {
        // `charCode` is the result of a KeyPress event and represents the value of
        // the actual printable character.

        // KeyPress is deprecated, but its replacement is not yet final and not
        // implemented in any major browser. Only KeyPress has charCode.
        if (event.type === 'keypress') {
          return getEventCharCode(event);
        }
        return 0;
      },
      keyCode: function (event) {
        // `keyCode` is the result of a KeyDown/Up event and represents the value of
        // physical keyboard key.

        // The actual meaning of the value depends on the users' keyboard layout
        // which cannot be detected. Assuming that it is a US keyboard layout
        // provides a surprisingly accurate mapping for US and European users.
        // Due to this, it is left to the user to implement at this time.
        if (event.type === 'keydown' || event.type === 'keyup') {
          return event.keyCode;
        }
        return 0;
      },
      which: function (event) {
        // `which` is an alias for either `keyCode` or `charCode` depending on the
        // type of the event.
        if (event.type === 'keypress') {
          return getEventCharCode(event);
        }
        if (event.type === 'keydown' || event.type === 'keyup') {
          return event.keyCode;
        }
        return 0;
      }
    });

    /**
     * @interface DragEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticDragEvent = SyntheticMouseEvent.extend({
      dataTransfer: null
    });

    /**
     * @interface TouchEvent
     * @see http://www.w3.org/TR/touch-events/
     */
    var SyntheticTouchEvent = SyntheticUIEvent.extend({
      touches: null,
      targetTouches: null,
      changedTouches: null,
      altKey: null,
      metaKey: null,
      ctrlKey: null,
      shiftKey: null,
      getModifierState: getEventModifierState
    });

    /**
     * @interface Event
     * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
     */
    var SyntheticTransitionEvent = SyntheticEvent$1.extend({
      propertyName: null,
      elapsedTime: null,
      pseudoElement: null
    });

    /**
     * @interface WheelEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticWheelEvent = SyntheticMouseEvent.extend({
      deltaX: function (event) {
        return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
        'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
      },
      deltaY: function (event) {
        return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
        'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
        'wheelDelta' in event ? -event.wheelDelta : 0;
      },

      deltaZ: null,

      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: null
    });

    /**
     * Turns
     * ['abort', ...]
     * into
     * eventTypes = {
     *   'abort': {
     *     phasedRegistrationNames: {
     *       bubbled: 'onAbort',
     *       captured: 'onAbortCapture',
     *     },
     *     dependencies: [TOP_ABORT],
     *   },
     *   ...
     * };
     * topLevelEventsToDispatchConfig = new Map([
     *   [TOP_ABORT, { sameConfig }],
     * ]);
     */

    var interactiveEventTypeNames = [[TOP_BLUR, 'blur'], [TOP_CANCEL, 'cancel'], [TOP_CLICK, 'click'], [TOP_CLOSE, 'close'], [TOP_CONTEXT_MENU, 'contextMenu'], [TOP_COPY, 'copy'], [TOP_CUT, 'cut'], [TOP_DOUBLE_CLICK, 'doubleClick'], [TOP_DRAG_END, 'dragEnd'], [TOP_DRAG_START, 'dragStart'], [TOP_DROP, 'drop'], [TOP_FOCUS, 'focus'], [TOP_INPUT, 'input'], [TOP_INVALID, 'invalid'], [TOP_KEY_DOWN, 'keyDown'], [TOP_KEY_PRESS, 'keyPress'], [TOP_KEY_UP, 'keyUp'], [TOP_MOUSE_DOWN, 'mouseDown'], [TOP_MOUSE_UP, 'mouseUp'], [TOP_PASTE, 'paste'], [TOP_PAUSE, 'pause'], [TOP_PLAY, 'play'], [TOP_POINTER_CANCEL, 'pointerCancel'], [TOP_POINTER_DOWN, 'pointerDown'], [TOP_POINTER_UP, 'pointerUp'], [TOP_RATE_CHANGE, 'rateChange'], [TOP_RESET, 'reset'], [TOP_SEEKED, 'seeked'], [TOP_SUBMIT, 'submit'], [TOP_TOUCH_CANCEL, 'touchCancel'], [TOP_TOUCH_END, 'touchEnd'], [TOP_TOUCH_START, 'touchStart'], [TOP_VOLUME_CHANGE, 'volumeChange']];
    var nonInteractiveEventTypeNames = [[TOP_ABORT, 'abort'], [TOP_ANIMATION_END, 'animationEnd'], [TOP_ANIMATION_ITERATION, 'animationIteration'], [TOP_ANIMATION_START, 'animationStart'], [TOP_CAN_PLAY, 'canPlay'], [TOP_CAN_PLAY_THROUGH, 'canPlayThrough'], [TOP_DRAG, 'drag'], [TOP_DRAG_ENTER, 'dragEnter'], [TOP_DRAG_EXIT, 'dragExit'], [TOP_DRAG_LEAVE, 'dragLeave'], [TOP_DRAG_OVER, 'dragOver'], [TOP_DURATION_CHANGE, 'durationChange'], [TOP_EMPTIED, 'emptied'], [TOP_ENCRYPTED, 'encrypted'], [TOP_ENDED, 'ended'], [TOP_ERROR, 'error'], [TOP_GOT_POINTER_CAPTURE, 'gotPointerCapture'], [TOP_LOAD, 'load'], [TOP_LOADED_DATA, 'loadedData'], [TOP_LOADED_METADATA, 'loadedMetadata'], [TOP_LOAD_START, 'loadStart'], [TOP_LOST_POINTER_CAPTURE, 'lostPointerCapture'], [TOP_MOUSE_MOVE, 'mouseMove'], [TOP_MOUSE_OUT, 'mouseOut'], [TOP_MOUSE_OVER, 'mouseOver'], [TOP_PLAYING, 'playing'], [TOP_POINTER_MOVE, 'pointerMove'], [TOP_POINTER_OUT, 'pointerOut'], [TOP_POINTER_OVER, 'pointerOver'], [TOP_PROGRESS, 'progress'], [TOP_SCROLL, 'scroll'], [TOP_SEEKING, 'seeking'], [TOP_STALLED, 'stalled'], [TOP_SUSPEND, 'suspend'], [TOP_TIME_UPDATE, 'timeUpdate'], [TOP_TOGGLE, 'toggle'], [TOP_TOUCH_MOVE, 'touchMove'], [TOP_TRANSITION_END, 'transitionEnd'], [TOP_WAITING, 'waiting'], [TOP_WHEEL, 'wheel']];

    var eventTypes$4 = {};
    var topLevelEventsToDispatchConfig = {};

    function addEventTypeNameToConfig(_ref, isInteractive) {
      var topEvent = _ref[0],
          event = _ref[1];

      var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
      var onEvent = 'on' + capitalizedEvent;

      var type = {
        phasedRegistrationNames: {
          bubbled: onEvent,
          captured: onEvent + 'Capture'
        },
        dependencies: [topEvent],
        isInteractive: isInteractive
      };
      eventTypes$4[event] = type;
      topLevelEventsToDispatchConfig[topEvent] = type;
    }

    interactiveEventTypeNames.forEach(function (eventTuple) {
      addEventTypeNameToConfig(eventTuple, true);
    });
    nonInteractiveEventTypeNames.forEach(function (eventTuple) {
      addEventTypeNameToConfig(eventTuple, false);
    });

    // Only used in DEV for exhaustiveness validation.
    var knownHTMLTopLevelTypes = [TOP_ABORT, TOP_CANCEL, TOP_CAN_PLAY, TOP_CAN_PLAY_THROUGH, TOP_CLOSE, TOP_DURATION_CHANGE, TOP_EMPTIED, TOP_ENCRYPTED, TOP_ENDED, TOP_ERROR, TOP_INPUT, TOP_INVALID, TOP_LOAD, TOP_LOADED_DATA, TOP_LOADED_METADATA, TOP_LOAD_START, TOP_PAUSE, TOP_PLAY, TOP_PLAYING, TOP_PROGRESS, TOP_RATE_CHANGE, TOP_RESET, TOP_SEEKED, TOP_SEEKING, TOP_STALLED, TOP_SUBMIT, TOP_SUSPEND, TOP_TIME_UPDATE, TOP_TOGGLE, TOP_VOLUME_CHANGE, TOP_WAITING];

    var SimpleEventPlugin = {
      eventTypes: eventTypes$4,

      isInteractiveTopLevelEventType: function (topLevelType) {
        var config = topLevelEventsToDispatchConfig[topLevelType];
        return config !== undefined && config.isInteractive === true;
      },

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        if (!dispatchConfig) {
          return null;
        }
        var EventConstructor = void 0;
        switch (topLevelType) {
          case TOP_KEY_PRESS:
            // Firefox creates a keypress event for function keys too. This removes
            // the unwanted keypress events. Enter is however both printable and
            // non-printable. One would expect Tab to be as well (but it isn't).
            if (getEventCharCode(nativeEvent) === 0) {
              return null;
            }
          /* falls through */
          case TOP_KEY_DOWN:
          case TOP_KEY_UP:
            EventConstructor = SyntheticKeyboardEvent;
            break;
          case TOP_BLUR:
          case TOP_FOCUS:
            EventConstructor = SyntheticFocusEvent;
            break;
          case TOP_CLICK:
            // Firefox creates a click event on right mouse clicks. This removes the
            // unwanted click events.
            if (nativeEvent.button === 2) {
              return null;
            }
          /* falls through */
          case TOP_DOUBLE_CLICK:
          case TOP_MOUSE_DOWN:
          case TOP_MOUSE_MOVE:
          case TOP_MOUSE_UP:
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
          case TOP_MOUSE_OUT:
          case TOP_MOUSE_OVER:
          case TOP_CONTEXT_MENU:
            EventConstructor = SyntheticMouseEvent;
            break;
          case TOP_DRAG:
          case TOP_DRAG_END:
          case TOP_DRAG_ENTER:
          case TOP_DRAG_EXIT:
          case TOP_DRAG_LEAVE:
          case TOP_DRAG_OVER:
          case TOP_DRAG_START:
          case TOP_DROP:
            EventConstructor = SyntheticDragEvent;
            break;
          case TOP_TOUCH_CANCEL:
          case TOP_TOUCH_END:
          case TOP_TOUCH_MOVE:
          case TOP_TOUCH_START:
            EventConstructor = SyntheticTouchEvent;
            break;
          case TOP_ANIMATION_END:
          case TOP_ANIMATION_ITERATION:
          case TOP_ANIMATION_START:
            EventConstructor = SyntheticAnimationEvent;
            break;
          case TOP_TRANSITION_END:
            EventConstructor = SyntheticTransitionEvent;
            break;
          case TOP_SCROLL:
            EventConstructor = SyntheticUIEvent;
            break;
          case TOP_WHEEL:
            EventConstructor = SyntheticWheelEvent;
            break;
          case TOP_COPY:
          case TOP_CUT:
          case TOP_PASTE:
            EventConstructor = SyntheticClipboardEvent;
            break;
          case TOP_GOT_POINTER_CAPTURE:
          case TOP_LOST_POINTER_CAPTURE:
          case TOP_POINTER_CANCEL:
          case TOP_POINTER_DOWN:
          case TOP_POINTER_MOVE:
          case TOP_POINTER_OUT:
          case TOP_POINTER_OVER:
          case TOP_POINTER_UP:
            EventConstructor = SyntheticPointerEvent;
            break;
          default:
            {
              if (knownHTMLTopLevelTypes.indexOf(topLevelType) === -1) {
                warning(false, 'SimpleEventPlugin: Unhandled event type, `%s`. This warning ' + 'is likely caused by a bug in React. Please file an issue.', topLevelType);
              }
            }
            // HTML Events
            // @see http://www.w3.org/TR/html5/index.html#events-0
            EventConstructor = SyntheticEvent$1;
            break;
        }
        var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
        accumulateTwoPhaseDispatches(event);
        return event;
      }
    };

    var isInteractiveTopLevelEventType = SimpleEventPlugin.isInteractiveTopLevelEventType;

    var CALLBACK_BOOKKEEPING_POOL_SIZE = 10;
    var callbackBookkeepingPool = [];

    /**
     * Find the deepest React component completely containing the root of the
     * passed-in instance (for use when entire React trees are nested within each
     * other). If React trees are not nested, returns null.
     */
    function findRootContainerNode(inst) {
      // TODO: It may be a good idea to cache this to prevent unnecessary DOM
      // traversal, but caching is difficult to do correctly without using a
      // mutation observer to listen for all DOM changes.
      while (inst.return) {
        inst = inst.return;
      }
      if (inst.tag !== HostRoot) {
        // This can happen if we're in a detached tree.
        return null;
      }
      return inst.stateNode.containerInfo;
    }

    // Used to store ancestor hierarchy in top level callback
    function getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst) {
      if (callbackBookkeepingPool.length) {
        var instance = callbackBookkeepingPool.pop();
        instance.topLevelType = topLevelType;
        instance.nativeEvent = nativeEvent;
        instance.targetInst = targetInst;
        return instance;
      }
      return {
        topLevelType: topLevelType,
        nativeEvent: nativeEvent,
        targetInst: targetInst,
        ancestors: []
      };
    }

    function releaseTopLevelCallbackBookKeeping(instance) {
      instance.topLevelType = null;
      instance.nativeEvent = null;
      instance.targetInst = null;
      instance.ancestors.length = 0;
      if (callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE) {
        callbackBookkeepingPool.push(instance);
      }
    }

    function handleTopLevel(bookKeeping) {
      var targetInst = bookKeeping.targetInst;

      // Loop through the hierarchy, in case there's any nested components.
      // It's important that we build the array of ancestors before calling any
      // event handlers, because event handlers can modify the DOM, leading to
      // inconsistencies with ReactMount's node cache. See #1105.
      var ancestor = targetInst;
      do {
        if (!ancestor) {
          bookKeeping.ancestors.push(ancestor);
          break;
        }
        var root = findRootContainerNode(ancestor);
        if (!root) {
          break;
        }
        bookKeeping.ancestors.push(ancestor);
        ancestor = getClosestInstanceFromNode(root);
      } while (ancestor);

      for (var i = 0; i < bookKeeping.ancestors.length; i++) {
        targetInst = bookKeeping.ancestors[i];
        runExtractedEventsInBatch(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
      }
    }

    // TODO: can we stop exporting these?
    var _enabled = true;

    function setEnabled(enabled) {
      _enabled = !!enabled;
    }

    function isEnabled() {
      return _enabled;
    }

    /**
     * Traps top-level events by using event bubbling.
     *
     * @param {number} topLevelType Number from `TopLevelEventTypes`.
     * @param {object} element Element on which to attach listener.
     * @return {?object} An object with a remove function which will forcefully
     *                  remove the listener.
     * @internal
     */
    function trapBubbledEvent(topLevelType, element) {
      if (!element) {
        return null;
      }
      var dispatch = isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent;

      addEventBubbleListener(element, getRawEventName(topLevelType),
      // Check if interactive and wrap in interactiveUpdates
      dispatch.bind(null, topLevelType));
    }

    /**
     * Traps a top-level event by using event capturing.
     *
     * @param {number} topLevelType Number from `TopLevelEventTypes`.
     * @param {object} element Element on which to attach listener.
     * @return {?object} An object with a remove function which will forcefully
     *                  remove the listener.
     * @internal
     */
    function trapCapturedEvent(topLevelType, element) {
      if (!element) {
        return null;
      }
      var dispatch = isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent;

      addEventCaptureListener(element, getRawEventName(topLevelType),
      // Check if interactive and wrap in interactiveUpdates
      dispatch.bind(null, topLevelType));
    }

    function dispatchInteractiveEvent(topLevelType, nativeEvent) {
      interactiveUpdates(dispatchEvent, topLevelType, nativeEvent);
    }

    function dispatchEvent(topLevelType, nativeEvent) {
      if (!_enabled) {
        return;
      }

      var nativeEventTarget = getEventTarget(nativeEvent);
      var targetInst = getClosestInstanceFromNode(nativeEventTarget);
      if (targetInst !== null && typeof targetInst.tag === 'number' && !isFiberMounted(targetInst)) {
        // If we get an event (ex: img onload) before committing that
        // component's mount, ignore it for now (that is, treat it as if it was an
        // event on a non-React tree). We might also consider queueing events and
        // dispatching them after the mount.
        targetInst = null;
      }

      var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst);

      try {
        // Event queue being processed in the same cycle allows
        // `preventDefault`.
        batchedUpdates(handleTopLevel, bookKeeping);
      } finally {
        releaseTopLevelCallbackBookKeeping(bookKeeping);
      }
    }

    var ReactDOMEventListener = Object.freeze({
      get _enabled() {
        return _enabled;
      },
      setEnabled: setEnabled,
      isEnabled: isEnabled,
      trapBubbledEvent: trapBubbledEvent,
      trapCapturedEvent: trapCapturedEvent,
      dispatchEvent: dispatchEvent
    });

    /**
     * Summary of `ReactBrowserEventEmitter` event handling:
     *
     *  - Top-level delegation is used to trap most native browser events. This
     *    may only occur in the main thread and is the responsibility of
     *    ReactDOMEventListener, which is injected and can therefore support
     *    pluggable event sources. This is the only work that occurs in the main
     *    thread.
     *
     *  - We normalize and de-duplicate events to account for browser quirks. This
     *    may be done in the worker thread.
     *
     *  - Forward these native events (with the associated top-level type used to
     *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
     *    to extract any synthetic events.
     *
     *  - The `EventPluginHub` will then process each event by annotating them with
     *    "dispatches", a sequence of listeners and IDs that care about that event.
     *
     *  - The `EventPluginHub` then dispatches the events.
     *
     * Overview of React and the event system:
     *
     * +------------+    .
     * |    DOM     |    .
     * +------------+    .
     *       |           .
     *       v           .
     * +------------+    .
     * | ReactEvent |    .
     * |  Listener  |    .
     * +------------+    .                         +-----------+
     *       |           .               +--------+|SimpleEvent|
     *       |           .               |         |Plugin     |
     * +-----|------+    .               v         +-----------+
     * |     |      |    .    +--------------+                    +------------+
     * |     +-----------.--->|EventPluginHub|                    |    Event   |
     * |            |    .    |              |     +-----------+  | Propagators|
     * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
     * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
     * |            |    .    |              |     +-----------+  |  utilities |
     * |     +-----------.--->|              |                    +------------+
     * |     |      |    .    +--------------+
     * +-----|------+    .                ^        +-----------+
     *       |           .                |        |Enter/Leave|
     *       +           .                +-------+|Plugin     |
     * +-------------+   .                         +-----------+
     * | application |   .
     * |-------------|   .
     * |             |   .
     * |             |   .
     * +-------------+   .
     *                   .
     *    React Core     .  General Purpose Event Plugin System
     */

    var alreadyListeningTo = {};
    var reactTopListenersCounter = 0;

    /**
     * To ensure no conflicts with other potential React instances on the page
     */
    var topListenersIDKey = '_reactListenersID' + ('' + Math.random()).slice(2);

    function getListeningForDocument(mountAt) {
      // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
      // directly.
      if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
        mountAt[topListenersIDKey] = reactTopListenersCounter++;
        alreadyListeningTo[mountAt[topListenersIDKey]] = {};
      }
      return alreadyListeningTo[mountAt[topListenersIDKey]];
    }

    /**
     * We listen for bubbled touch events on the document object.
     *
     * Firefox v8.01 (and possibly others) exhibited strange behavior when
     * mounting `onmousemove` events at some node that was not the document
     * element. The symptoms were that if your mouse is not moving over something
     * contained within that mount point (for example on the background) the
     * top-level listeners for `onmousemove` won't be called. However, if you
     * register the `mousemove` on the document object, then it will of course
     * catch all `mousemove`s. This along with iOS quirks, justifies restricting
     * top-level listeners to the document object only, at least for these
     * movement types of events and possibly all events.
     *
     * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
     *
     * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
     * they bubble to document.
     *
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     * @param {object} mountAt Container where to mount the listener
     */
    function listenTo(registrationName, mountAt) {
      var isListening = getListeningForDocument(mountAt);
      var dependencies = registrationNameDependencies[registrationName];

      for (var i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
          switch (dependency) {
            case TOP_SCROLL:
              trapCapturedEvent(TOP_SCROLL, mountAt);
              break;
            case TOP_FOCUS:
            case TOP_BLUR:
              trapCapturedEvent(TOP_FOCUS, mountAt);
              trapCapturedEvent(TOP_BLUR, mountAt);
              // We set the flag for a single dependency later in this function,
              // but this ensures we mark both as attached rather than just one.
              isListening[TOP_BLUR] = true;
              isListening[TOP_FOCUS] = true;
              break;
            case TOP_CANCEL:
            case TOP_CLOSE:
              if (isEventSupported(getRawEventName(dependency), true)) {
                trapCapturedEvent(dependency, mountAt);
              }
              break;
            case TOP_INVALID:
            case TOP_SUBMIT:
            case TOP_RESET:
              // We listen to them on the target DOM elements.
              // Some of them bubble so we don't want them to fire twice.
              break;
            default:
              // By default, listen on the top level to all non-media events.
              // Media events don't bubble so adding the listener wouldn't do anything.
              var isMediaEvent = mediaEventTypes.indexOf(dependency) !== -1;
              if (!isMediaEvent) {
                trapBubbledEvent(dependency, mountAt);
              }
              break;
          }
          isListening[dependency] = true;
        }
      }
    }

    function isListeningToAllDependencies(registrationName, mountAt) {
      var isListening = getListeningForDocument(mountAt);
      var dependencies = registrationNameDependencies[registrationName];
      for (var i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
          return false;
        }
      }
      return true;
    }

    /**
     * Given any node return the first leaf node without children.
     *
     * @param {DOMElement|DOMTextNode} node
     * @return {DOMElement|DOMTextNode}
     */
    function getLeafNode(node) {
      while (node && node.firstChild) {
        node = node.firstChild;
      }
      return node;
    }

    /**
     * Get the next sibling within a container. This will walk up the
     * DOM if a node's siblings have been exhausted.
     *
     * @param {DOMElement|DOMTextNode} node
     * @return {?DOMElement|DOMTextNode}
     */
    function getSiblingNode(node) {
      while (node) {
        if (node.nextSibling) {
          return node.nextSibling;
        }
        node = node.parentNode;
      }
    }

    /**
     * Get object describing the nodes which contain characters at offset.
     *
     * @param {DOMElement|DOMTextNode} root
     * @param {number} offset
     * @return {?object}
     */
    function getNodeForCharacterOffset(root, offset) {
      var node = getLeafNode(root);
      var nodeStart = 0;
      var nodeEnd = 0;

      while (node) {
        if (node.nodeType === TEXT_NODE) {
          nodeEnd = nodeStart + node.textContent.length;

          if (nodeStart <= offset && nodeEnd >= offset) {
            return {
              node: node,
              offset: offset - nodeStart
            };
          }

          nodeStart = nodeEnd;
        }

        node = getLeafNode(getSiblingNode(node));
      }
    }

    /**
     * @param {DOMElement} outerNode
     * @return {?object}
     */
    function getOffsets(outerNode) {
      var selection = window.getSelection && window.getSelection();

      if (!selection || selection.rangeCount === 0) {
        return null;
      }

      var anchorNode = selection.anchorNode,
          anchorOffset = selection.anchorOffset,
          focusNode = selection.focusNode,
          focusOffset = selection.focusOffset;

      // In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
      // up/down buttons on an <input type="number">. Anonymous divs do not seem to
      // expose properties, triggering a "Permission denied error" if any of its
      // properties are accessed. The only seemingly possible way to avoid erroring
      // is to access a property that typically works for non-anonymous divs and
      // catch any error that may otherwise arise. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=208427

      try {
        /* eslint-disable no-unused-expressions */
        anchorNode.nodeType;
        focusNode.nodeType;
        /* eslint-enable no-unused-expressions */
      } catch (e) {
        return null;
      }

      return getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset);
    }

    /**
     * Returns {start, end} where `start` is the character/codepoint index of
     * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
     * `end` is the index of (focusNode, focusOffset).
     *
     * Returns null if you pass in garbage input but we should probably just crash.
     *
     * Exported only for testing.
     */
    function getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset) {
      var length = 0;
      var start = -1;
      var end = -1;
      var indexWithinAnchor = 0;
      var indexWithinFocus = 0;
      var node = outerNode;
      var parentNode = null;

      outer: while (true) {
        var next = null;

        while (true) {
          if (node === anchorNode && (anchorOffset === 0 || node.nodeType === TEXT_NODE)) {
            start = length + anchorOffset;
          }
          if (node === focusNode && (focusOffset === 0 || node.nodeType === TEXT_NODE)) {
            end = length + focusOffset;
          }

          if (node.nodeType === TEXT_NODE) {
            length += node.nodeValue.length;
          }

          if ((next = node.firstChild) === null) {
            break;
          }
          // Moving from `node` to its first child `next`.
          parentNode = node;
          node = next;
        }

        while (true) {
          if (node === outerNode) {
            // If `outerNode` has children, this is always the second time visiting
            // it. If it has no children, this is still the first loop, and the only
            // valid selection is anchorNode and focusNode both equal to this node
            // and both offsets 0, in which case we will have handled above.
            break outer;
          }
          if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset) {
            start = length;
          }
          if (parentNode === focusNode && ++indexWithinFocus === focusOffset) {
            end = length;
          }
          if ((next = node.nextSibling) !== null) {
            break;
          }
          node = parentNode;
          parentNode = node.parentNode;
        }

        // Moving from `node` to its next sibling `next`.
        node = next;
      }

      if (start === -1 || end === -1) {
        // This should never happen. (Would happen if the anchor/focus nodes aren't
        // actually inside the passed-in node.)
        return null;
      }

      return {
        start: start,
        end: end
      };
    }

    /**
     * In modern non-IE browsers, we can support both forward and backward
     * selections.
     *
     * Note: IE10+ supports the Selection object, but it does not support
     * the `extend` method, which means that even in modern IE, it's not possible
     * to programmatically create a backward selection. Thus, for all IE
     * versions, we use the old IE API to create our selections.
     *
     * @param {DOMElement|DOMTextNode} node
     * @param {object} offsets
     */
    function setOffsets(node, offsets) {
      if (!window.getSelection) {
        return;
      }

      var selection = window.getSelection();
      var length = node[getTextContentAccessor()].length;
      var start = Math.min(offsets.start, length);
      var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

      // IE 11 uses modern selection, but doesn't support the extend method.
      // Flip backward selections, so we can set with a single range.
      if (!selection.extend && start > end) {
        var temp = end;
        end = start;
        start = temp;
      }

      var startMarker = getNodeForCharacterOffset(node, start);
      var endMarker = getNodeForCharacterOffset(node, end);

      if (startMarker && endMarker) {
        if (selection.rangeCount === 1 && selection.anchorNode === startMarker.node && selection.anchorOffset === startMarker.offset && selection.focusNode === endMarker.node && selection.focusOffset === endMarker.offset) {
          return;
        }
        var range = document.createRange();
        range.setStart(startMarker.node, startMarker.offset);
        selection.removeAllRanges();

        if (start > end) {
          selection.addRange(range);
          selection.extend(endMarker.node, endMarker.offset);
        } else {
          range.setEnd(endMarker.node, endMarker.offset);
          selection.addRange(range);
        }
      }
    }

    function isInDocument(node) {
      return containsNode(document.documentElement, node);
    }

    /**
     * @ReactInputSelection: React input selection module. Based on Selection.js,
     * but modified to be suitable for react and has a couple of bug fixes (doesn't
     * assume buttons have range selections allowed).
     * Input selection module for React.
     */

    /**
     * @hasSelectionCapabilities: we get the element types that support selection
     * from https://html.spec.whatwg.org/#do-not-apply, looking at `selectionStart`
     * and `selectionEnd` rows.
     */
    function hasSelectionCapabilities(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName && (nodeName === 'input' && (elem.type === 'text' || elem.type === 'search' || elem.type === 'tel' || elem.type === 'url' || elem.type === 'password') || nodeName === 'textarea' || elem.contentEditable === 'true');
    }

    function getSelectionInformation() {
      var focusedElem = getActiveElement();
      return {
        focusedElem: focusedElem,
        selectionRange: hasSelectionCapabilities(focusedElem) ? getSelection$1(focusedElem) : null
      };
    }

    /**
     * @restoreSelection: If any selection information was potentially lost,
     * restore it. This is useful when performing operations that could remove dom
     * nodes and place them back in, resulting in focus being lost.
     */
    function restoreSelection(priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
        if (priorSelectionRange !== null && hasSelectionCapabilities(priorFocusedElem)) {
          setSelection(priorFocusedElem, priorSelectionRange);
        }

        // Focusing a node can change the scroll position, which is undesirable
        var ancestors = [];
        var ancestor = priorFocusedElem;
        while (ancestor = ancestor.parentNode) {
          if (ancestor.nodeType === ELEMENT_NODE) {
            ancestors.push({
              element: ancestor,
              left: ancestor.scrollLeft,
              top: ancestor.scrollTop
            });
          }
        }

        if (typeof priorFocusedElem.focus === 'function') {
          priorFocusedElem.focus();
        }

        for (var i = 0; i < ancestors.length; i++) {
          var info = ancestors[i];
          info.element.scrollLeft = info.left;
          info.element.scrollTop = info.top;
        }
      }
    }

    /**
     * @getSelection: Gets the selection bounds of a focused textarea, input or
     * contentEditable node.
     * -@input: Look up selection bounds of this input
     * -@return {start: selectionStart, end: selectionEnd}
     */
    function getSelection$1(input) {
      var selection = void 0;

      if ('selectionStart' in input) {
        // Modern browser with input or textarea.
        selection = {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else {
        // Content editable or old IE textarea.
        selection = getOffsets(input);
      }

      return selection || { start: 0, end: 0 };
    }

    /**
     * @setSelection: Sets the selection bounds of a textarea or input and focuses
     * the input.
     * -@input     Set selection bounds of this input or textarea
     * -@offsets   Object of same form that is returned from get*
     */
    function setSelection(input, offsets) {
      var start = offsets.start,
          end = offsets.end;

      if (end === undefined) {
        end = start;
      }

      if ('selectionStart' in input) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      } else {
        setOffsets(input, offsets);
      }
    }

    var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

    var eventTypes$3 = {
      select: {
        phasedRegistrationNames: {
          bubbled: 'onSelect',
          captured: 'onSelectCapture'
        },
        dependencies: [TOP_BLUR, TOP_CONTEXT_MENU, TOP_FOCUS, TOP_KEY_DOWN, TOP_KEY_UP, TOP_MOUSE_DOWN, TOP_MOUSE_UP, TOP_SELECTION_CHANGE]
      }
    };

    var activeElement$1 = null;
    var activeElementInst$1 = null;
    var lastSelection = null;
    var mouseDown = false;

    /**
     * Get an object which is a unique representation of the current selection.
     *
     * The return value will not be consistent across nodes or browsers, but
     * two identical selections on the same node will return identical objects.
     *
     * @param {DOMElement} node
     * @return {object}
     */
    function getSelection(node) {
      if ('selectionStart' in node && hasSelectionCapabilities(node)) {
        return {
          start: node.selectionStart,
          end: node.selectionEnd
        };
      } else if (window.getSelection) {
        var selection = window.getSelection();
        return {
          anchorNode: selection.anchorNode,
          anchorOffset: selection.anchorOffset,
          focusNode: selection.focusNode,
          focusOffset: selection.focusOffset
        };
      }
    }

    /**
     * Poll selection to see whether it's changed.
     *
     * @param {object} nativeEvent
     * @return {?SyntheticEvent}
     */
    function constructSelectEvent(nativeEvent, nativeEventTarget) {
      // Ensure we have the right element, and that the user is not dragging a
      // selection (this matches native `select` event behavior). In HTML5, select
      // fires only on input and textarea thus if there's no focused element we
      // won't dispatch.
      if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement()) {
        return null;
      }

      // Only fire when selection has actually changed.
      var currentSelection = getSelection(activeElement$1);
      if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
        lastSelection = currentSelection;

        var syntheticEvent = SyntheticEvent$1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

        syntheticEvent.type = 'select';
        syntheticEvent.target = activeElement$1;

        accumulateTwoPhaseDispatches(syntheticEvent);

        return syntheticEvent;
      }

      return null;
    }

    /**
     * This plugin creates an `onSelect` event that normalizes select events
     * across form elements.
     *
     * Supported elements are:
     * - input (see `isTextInputElement`)
     * - textarea
     * - contentEditable
     *
     * This differs from native browser implementations in the following ways:
     * - Fires on contentEditable fields as well as inputs.
     * - Fires for collapsed selection.
     * - Fires after user input.
     */
    var SelectEventPlugin = {
      eventTypes: eventTypes$3,

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === DOCUMENT_NODE ? nativeEventTarget : nativeEventTarget.ownerDocument;
        // Track whether all listeners exists for this plugin. If none exist, we do
        // not extract events. See #3639.
        if (!doc || !isListeningToAllDependencies('onSelect', doc)) {
          return null;
        }

        var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

        switch (topLevelType) {
          // Track the input node that has focus.
          case TOP_FOCUS:
            if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
              activeElement$1 = targetNode;
              activeElementInst$1 = targetInst;
              lastSelection = null;
            }
            break;
          case TOP_BLUR:
            activeElement$1 = null;
            activeElementInst$1 = null;
            lastSelection = null;
            break;
          // Don't fire the event while the user is dragging. This matches the
          // semantics of the native select event.
          case TOP_MOUSE_DOWN:
            mouseDown = true;
            break;
          case TOP_CONTEXT_MENU:
          case TOP_MOUSE_UP:
            mouseDown = false;
            return constructSelectEvent(nativeEvent, nativeEventTarget);
          // Chrome and IE fire non-standard event when selection is changed (and
          // sometimes when it hasn't). IE's event fires out of order with respect
          // to key and input events on deletion, so we discard it.
          //
          // Firefox doesn't support selectionchange, so check selection status
          // after each key entry. The selection changes after keydown and before
          // keyup, but we check on keydown as well in the case of holding down a
          // key, when multiple keydown events are fired but only one keyup is.
          // This is also our approach for IE handling, for the reason above.
          case TOP_SELECTION_CHANGE:
            if (skipSelectionChangeEvent) {
              break;
            }
          // falls through
          case TOP_KEY_DOWN:
          case TOP_KEY_UP:
            return constructSelectEvent(nativeEvent, nativeEventTarget);
        }

        return null;
      }
    };

    /**
     * Inject modules for resolving DOM hierarchy and plugin ordering.
     */
    injection.injectEventPluginOrder(DOMEventPluginOrder);
    injection$1.injectComponentTree(ReactDOMComponentTree);

    /**
     * Some important event plugins included by default (without having to require
     * them).
     */
    injection.injectEventPluginsByName({
      SimpleEventPlugin: SimpleEventPlugin,
      EnterLeaveEventPlugin: EnterLeaveEventPlugin,
      ChangeEventPlugin: ChangeEventPlugin,
      SelectEventPlugin: SelectEventPlugin,
      BeforeInputEventPlugin: BeforeInputEventPlugin
    });

    // We capture a local reference to any global, in case it gets polyfilled after
    // this module is initially evaluated.
    // We want to be using a consistent implementation.

    var localRequestAnimationFrame$1 = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;

    /**
     * A scheduling library to allow scheduling work with more granular priority and
     * control than requestAnimationFrame and requestIdleCallback.
     * Current TODO items:
     * X- Pull out the scheduleWork polyfill built into React
     * X- Initial test coverage
     * X- Support for multiple callbacks
     * - Support for two priorities; serial and deferred
     * - Better test coverage
     * - Better docblock
     * - Polish documentation, API
     */

    // This is a built-in polyfill for requestIdleCallback. It works by scheduling
    // a requestAnimationFrame, storing the time for the start of the frame, then
    // scheduling a postMessage which gets scheduled after paint. Within the
    // postMessage handler do as much work as possible until time + frame rate.
    // By separating the idle call into a separate event tick we ensure that
    // layout, paint and other browser work is counted against the available time.
    // The frame rate is dynamically adjusted.

    // We capture a local reference to any global, in case it gets polyfilled after
    // this module is initially evaluated.
    // We want to be using a consistent implementation.
    var localDate = Date;
    var localSetTimeout = setTimeout;
    var localClearTimeout = clearTimeout;

    var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

    var now$1 = void 0;
    if (hasNativePerformanceNow) {
      var Performance = performance;
      now$1 = function () {
        return Performance.now();
      };
    } else {
      now$1 = function () {
        return localDate.now();
      };
    }

    var scheduleWork = void 0;
    var cancelScheduledWork = void 0;

    if (!ExecutionEnvironment.canUseDOM) {
      var timeoutIds = new Map();

      scheduleWork = function (callback, options) {
        // keeping return type consistent
        var callbackConfig = {
          scheduledCallback: callback,
          timeoutTime: 0,
          next: null,
          prev: null
        };
        var timeoutId = localSetTimeout(function () {
          callback({
            timeRemaining: function () {
              return Infinity;
            },

            didTimeout: false
          });
        });
        timeoutIds.set(callback, timeoutId);
        return callbackConfig;
      };
      cancelScheduledWork = function (callbackId) {
        var callback = callbackId.scheduledCallback;
        var timeoutId = timeoutIds.get(callback);
        timeoutIds.delete(callbackId);
        localClearTimeout(timeoutId);
      };
    } else {
      {
        if (typeof localRequestAnimationFrame$1 !== 'function') {
          warning(false, 'React depends on requestAnimationFrame. Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
        }
      }

      var localRequestAnimationFrame = typeof localRequestAnimationFrame$1 === 'function' ? localRequestAnimationFrame$1 : function (callback) {
        invariant(false, 'React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills');
      };

      var headOfPendingCallbacksLinkedList = null;
      var tailOfPendingCallbacksLinkedList = null;

      // We track what the next soonest timeoutTime is, to be able to quickly tell
      // if none of the scheduled callbacks have timed out.
      var nextSoonestTimeoutTime = -1;

      var isIdleScheduled = false;
      var isAnimationFrameScheduled = false;

      var frameDeadline = 0;
      // We start out assuming that we run at 30fps but then the heuristic tracking
      // will adjust this value to a faster fps if we get more frequent animation
      // frames.
      var previousFrameTime = 33;
      var activeFrameTime = 33;

      var frameDeadlineObject = {
        didTimeout: false,
        timeRemaining: function () {
          var remaining = frameDeadline - now$1();
          return remaining > 0 ? remaining : 0;
        }
      };

      /**
       * Handles the case where a callback errors:
       * - don't catch the error, because this changes debugging behavior
       * - do start a new postMessage callback, to call any remaining callbacks,
       * - but only if there is an error, so there is not extra overhead.
       */
      var callUnsafely = function (callbackConfig, arg) {
        var callback = callbackConfig.scheduledCallback;
        var finishedCalling = false;
        try {
          callback(arg);
          finishedCalling = true;
        } finally {
          // always remove it from linked list
          cancelScheduledWork(callbackConfig);

          if (!finishedCalling) {
            // an error must have been thrown
            isIdleScheduled = true;
            window.postMessage(messageKey, '*');
          }
        }
      };

      /**
       * Checks for timed out callbacks, runs them, and then checks again to see if
       * any more have timed out.
       * Keeps doing this until there are none which have currently timed out.
       */
      var callTimedOutCallbacks = function () {
        if (headOfPendingCallbacksLinkedList === null) {
          return;
        }

        var currentTime = now$1();
        // TODO: this would be more efficient if deferred callbacks are stored in
        // min heap.
        // Or in a linked list with links for both timeoutTime order and insertion
        // order.
        // For now an easy compromise is the current approach:
        // Keep a pointer to the soonest timeoutTime, and check that first.
        // If it has not expired, we can skip traversing the whole list.
        // If it has expired, then we step through all the callbacks.
        if (nextSoonestTimeoutTime === -1 || nextSoonestTimeoutTime > currentTime) {
          // We know that none of them have timed out yet.
          return;
        }
        // NOTE: we intentionally wait to update the nextSoonestTimeoutTime until
        // after successfully calling any timed out callbacks.
        // If a timed out callback throws an error, we could get stuck in a state
        // where the nextSoonestTimeoutTime was set wrong.
        var updatedNextSoonestTimeoutTime = -1; // we will update nextSoonestTimeoutTime below
        var timedOutCallbacks = [];

        // iterate once to find timed out callbacks and find nextSoonestTimeoutTime
        var currentCallbackConfig = headOfPendingCallbacksLinkedList;
        while (currentCallbackConfig !== null) {
          var _timeoutTime = currentCallbackConfig.timeoutTime;
          if (_timeoutTime !== -1 && _timeoutTime <= currentTime) {
            // it has timed out!
            timedOutCallbacks.push(currentCallbackConfig);
          } else {
            if (_timeoutTime !== -1 && (updatedNextSoonestTimeoutTime === -1 || _timeoutTime < updatedNextSoonestTimeoutTime)) {
              updatedNextSoonestTimeoutTime = _timeoutTime;
            }
          }
          currentCallbackConfig = currentCallbackConfig.next;
        }

        if (timedOutCallbacks.length > 0) {
          frameDeadlineObject.didTimeout = true;
          for (var i = 0, len = timedOutCallbacks.length; i < len; i++) {
            callUnsafely(timedOutCallbacks[i], frameDeadlineObject);
          }
        }

        // NOTE: we intentionally wait to update the nextSoonestTimeoutTime until
        // after successfully calling any timed out callbacks.
        nextSoonestTimeoutTime = updatedNextSoonestTimeoutTime;
      };

      // We use the postMessage trick to defer idle work until after the repaint.
      var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);
      var idleTick = function (event) {
        if (event.source !== window || event.data !== messageKey) {
          return;
        }
        isIdleScheduled = false;

        if (headOfPendingCallbacksLinkedList === null) {
          return;
        }

        // First call anything which has timed out, until we have caught up.
        callTimedOutCallbacks();

        var currentTime = now$1();
        // Next, as long as we have idle time, try calling more callbacks.
        while (frameDeadline - currentTime > 0 && headOfPendingCallbacksLinkedList !== null) {
          var latestCallbackConfig = headOfPendingCallbacksLinkedList;
          frameDeadlineObject.didTimeout = false;
          // callUnsafely will remove it from the head of the linked list
          callUnsafely(latestCallbackConfig, frameDeadlineObject);
          currentTime = now$1();
        }
        if (headOfPendingCallbacksLinkedList !== null) {
          if (!isAnimationFrameScheduled) {
            // Schedule another animation callback so we retry later.
            isAnimationFrameScheduled = true;
            localRequestAnimationFrame(animationTick);
          }
        }
      };
      // Assumes that we have addEventListener in this environment. Might need
      // something better for old IE.
      window.addEventListener('message', idleTick, false);

      var animationTick = function (rafTime) {
        isAnimationFrameScheduled = false;
        var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
        if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
          if (nextFrameTime < 8) {
            // Defensive coding. We don't support higher frame rates than 120hz.
            // If we get lower than that, it is probably a bug.
            nextFrameTime = 8;
          }
          // If one frame goes long, then the next one can be short to catch up.
          // If two frames are short in a row, then that's an indication that we
          // actually have a higher frame rate than what we're currently optimizing.
          // We adjust our heuristic dynamically accordingly. For example, if we're
          // running on 120hz display or 90hz VR display.
          // Take the max of the two in case one of them was an anomaly due to
          // missed frame deadlines.
          activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
        } else {
          previousFrameTime = nextFrameTime;
        }
        frameDeadline = rafTime + activeFrameTime;
        if (!isIdleScheduled) {
          isIdleScheduled = true;
          window.postMessage(messageKey, '*');
        }
      };

      scheduleWork = function (callback, options) /* CallbackConfigType */{
        var timeoutTime = -1;
        if (options != null && typeof options.timeout === 'number') {
          timeoutTime = now$1() + options.timeout;
        }
        if (nextSoonestTimeoutTime === -1 || timeoutTime !== -1 && timeoutTime < nextSoonestTimeoutTime) {
          nextSoonestTimeoutTime = timeoutTime;
        }

        var scheduledCallbackConfig = {
          scheduledCallback: callback,
          timeoutTime: timeoutTime,
          prev: null,
          next: null
        };
        if (headOfPendingCallbacksLinkedList === null) {
          // Make this callback the head and tail of our list
          headOfPendingCallbacksLinkedList = scheduledCallbackConfig;
          tailOfPendingCallbacksLinkedList = scheduledCallbackConfig;
        } else {
          // Add latest callback as the new tail of the list
          scheduledCallbackConfig.prev = tailOfPendingCallbacksLinkedList;
          // renaming for clarity
          var oldTailOfPendingCallbacksLinkedList = tailOfPendingCallbacksLinkedList;
          if (oldTailOfPendingCallbacksLinkedList !== null) {
            oldTailOfPendingCallbacksLinkedList.next = scheduledCallbackConfig;
          }
          tailOfPendingCallbacksLinkedList = scheduledCallbackConfig;
        }

        if (!isAnimationFrameScheduled) {
          // If rAF didn't already schedule one, we need to schedule a frame.
          // TODO: If this rAF doesn't materialize because the browser throttles, we
          // might want to still have setTimeout trigger scheduleWork as a backup to ensure
          // that we keep performing work.
          isAnimationFrameScheduled = true;
          localRequestAnimationFrame(animationTick);
        }
        return scheduledCallbackConfig;
      };

      cancelScheduledWork = function (callbackConfig /* CallbackConfigType */
      ) {
        if (callbackConfig.prev === null && headOfPendingCallbacksLinkedList !== callbackConfig) {
          // this callbackConfig has already been cancelled.
          // cancelScheduledWork should be idempotent, a no-op after first call.
          return;
        }

        /**
         * There are four possible cases:
         * - Head/nodeToRemove/Tail -> null
         *   In this case we set Head and Tail to null.
         * - Head -> ... middle nodes... -> Tail/nodeToRemove
         *   In this case we point the middle.next to null and put middle as the new
         *   Tail.
         * - Head/nodeToRemove -> ...middle nodes... -> Tail
         *   In this case we point the middle.prev at null and move the Head to
         *   middle.
         * - Head -> ... ?some nodes ... -> nodeToRemove -> ... ?some nodes ... -> Tail
         *   In this case we point the Head.next to the Tail and the Tail.prev to
         *   the Head.
         */
        var next = callbackConfig.next;
        var prev = callbackConfig.prev;
        callbackConfig.next = null;
        callbackConfig.prev = null;
        if (next !== null) {
          // we have a next

          if (prev !== null) {
            // we have a prev

            // callbackConfig is somewhere in the middle of a list of 3 or more nodes.
            prev.next = next;
            next.prev = prev;
            return;
          } else {
            // there is a next but not a previous one;
            // callbackConfig is the head of a list of 2 or more other nodes.
            next.prev = null;
            headOfPendingCallbacksLinkedList = next;
            return;
          }
        } else {
          // there is no next callback config; this must the tail of the list

          if (prev !== null) {
            // we have a prev

            // callbackConfig is the tail of a list of 2 or more other nodes.
            prev.next = null;
            tailOfPendingCallbacksLinkedList = prev;
            return;
          } else {
            // there is no previous callback config;
            // callbackConfig is the only thing in the linked list,
            // so both head and tail point to it.
            headOfPendingCallbacksLinkedList = null;
            tailOfPendingCallbacksLinkedList = null;
            return;
          }
        }
      };
    }

    var didWarnSelectedSetOnOption = false;

    function flattenChildren(children) {
      var content = '';

      // Flatten children and warn if they aren't strings or numbers;
      // invalid types are ignored.
      // We can silently skip them because invalid DOM nesting warning
      // catches these cases in Fiber.
      React.Children.forEach(children, function (child) {
        if (child == null) {
          return;
        }
        if (typeof child === 'string' || typeof child === 'number') {
          content += child;
        }
      });

      return content;
    }

    /**
     * Implements an <option> host component that warns when `selected` is set.
     */

    function validateProps(element, props) {
      // TODO (yungsters): Remove support for `selected` in <option>.
      {
        if (props.selected != null && !didWarnSelectedSetOnOption) {
          warning(false, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');
          didWarnSelectedSetOnOption = true;
        }
      }
    }

    function postMountWrapper$1(element, props) {
      // value="" should make a value attribute (#6219)
      if (props.value != null) {
        element.setAttribute('value', props.value);
      }
    }

    function getHostProps$1(element, props) {
      var hostProps = _assign({ children: undefined }, props);
      var content = flattenChildren(props.children);

      if (content) {
        hostProps.children = content;
      }

      return hostProps;
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberOwnerName$3 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
    var getCurrentFiberStackAddendum$3 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnValueDefaultValue$1 = void 0;

    {
      didWarnValueDefaultValue$1 = false;
    }

    function getDeclarationErrorAddendum() {
      var ownerName = getCurrentFiberOwnerName$3();
      if (ownerName) {
        return '\n\nCheck the render method of `' + ownerName + '`.';
      }
      return '';
    }

    var valuePropNames = ['value', 'defaultValue'];

    /**
     * Validation function for `value` and `defaultValue`.
     */
    function checkSelectPropTypes(props) {
      ReactControlledValuePropTypes.checkPropTypes('select', props, getCurrentFiberStackAddendum$3);

      for (var i = 0; i < valuePropNames.length; i++) {
        var propName = valuePropNames[i];
        if (props[propName] == null) {
          continue;
        }
        var isArray = Array.isArray(props[propName]);
        if (props.multiple && !isArray) {
          warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum());
        } else if (!props.multiple && isArray) {
          warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum());
        }
      }
    }

    function updateOptions(node, multiple, propValue, setDefaultSelected) {
      var options = node.options;

      if (multiple) {
        var selectedValues = propValue;
        var selectedValue = {};
        for (var i = 0; i < selectedValues.length; i++) {
          // Prefix to avoid chaos with special keys.
          selectedValue['$' + selectedValues[i]] = true;
        }
        for (var _i = 0; _i < options.length; _i++) {
          var selected = selectedValue.hasOwnProperty('$' + options[_i].value);
          if (options[_i].selected !== selected) {
            options[_i].selected = selected;
          }
          if (selected && setDefaultSelected) {
            options[_i].defaultSelected = true;
          }
        }
      } else {
        // Do not set `select.value` as exact behavior isn't consistent across all
        // browsers for all cases.
        var _selectedValue = '' + propValue;
        var defaultSelected = null;
        for (var _i2 = 0; _i2 < options.length; _i2++) {
          if (options[_i2].value === _selectedValue) {
            options[_i2].selected = true;
            if (setDefaultSelected) {
              options[_i2].defaultSelected = true;
            }
            return;
          }
          if (defaultSelected === null && !options[_i2].disabled) {
            defaultSelected = options[_i2];
          }
        }
        if (defaultSelected !== null) {
          defaultSelected.selected = true;
        }
      }
    }

    /**
     * Implements a <select> host component that allows optionally setting the
     * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
     * stringable. If `multiple` is true, the prop must be an array of stringables.
     *
     * If `value` is not supplied (or null/undefined), user actions that change the
     * selected option will trigger updates to the rendered options.
     *
     * If it is supplied (and not null/undefined), the rendered options will not
     * update in response to user actions. Instead, the `value` prop must change in
     * order for the rendered options to update.
     *
     * If `defaultValue` is provided, any options with the supplied values will be
     * selected.
     */

    function getHostProps$2(element, props) {
      return _assign({}, props, {
        value: undefined
      });
    }

    function initWrapperState$1(element, props) {
      var node = element;
      {
        checkSelectPropTypes(props);
      }

      var value = props.value;
      node._wrapperState = {
        initialValue: value != null ? value : props.defaultValue,
        wasMultiple: !!props.multiple
      };

      {
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
          warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnValueDefaultValue$1 = true;
        }
      }
    }

    function postMountWrapper$2(element, props) {
      var node = element;
      node.multiple = !!props.multiple;
      var value = props.value;
      if (value != null) {
        updateOptions(node, !!props.multiple, value, false);
      } else if (props.defaultValue != null) {
        updateOptions(node, !!props.multiple, props.defaultValue, true);
      }
    }

    function postUpdateWrapper(element, props) {
      var node = element;
      // After the initial mount, we control selected-ness manually so don't pass
      // this value down
      node._wrapperState.initialValue = undefined;

      var wasMultiple = node._wrapperState.wasMultiple;
      node._wrapperState.wasMultiple = !!props.multiple;

      var value = props.value;
      if (value != null) {
        updateOptions(node, !!props.multiple, value, false);
      } else if (wasMultiple !== !!props.multiple) {
        // For simplicity, reapply `defaultValue` if `multiple` is toggled.
        if (props.defaultValue != null) {
          updateOptions(node, !!props.multiple, props.defaultValue, true);
        } else {
          // Revert the select back to its default unselected state.
          updateOptions(node, !!props.multiple, props.multiple ? [] : '', false);
        }
      }
    }

    function restoreControlledState$2(element, props) {
      var node = element;
      var value = props.value;

      if (value != null) {
        updateOptions(node, !!props.multiple, value, false);
      }
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberStackAddendum$4 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnValDefaultVal = false;

    /**
     * Implements a <textarea> host component that allows setting `value`, and
     * `defaultValue`. This differs from the traditional DOM API because value is
     * usually set as PCDATA children.
     *
     * If `value` is not supplied (or null/undefined), user actions that affect the
     * value will trigger updates to the element.
     *
     * If `value` is supplied (and not null/undefined), the rendered element will
     * not trigger updates to the element. Instead, the `value` prop must change in
     * order for the rendered element to be updated.
     *
     * The rendered element will be initialized with an empty value, the prop
     * `defaultValue` if specified, or the children content (deprecated).
     */

    function getHostProps$3(element, props) {
      var node = element;
      !(props.dangerouslySetInnerHTML == null) ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : void 0;

      // Always set children to the same thing. In IE9, the selection range will
      // get reset if `textContent` is mutated.  We could add a check in setTextContent
      // to only set the value if/when the value differs from the node value (which would
      // completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
      // solution. The value can be a boolean or object so that's why it's forced
      // to be a string.
      var hostProps = _assign({}, props, {
        value: undefined,
        defaultValue: undefined,
        children: '' + node._wrapperState.initialValue
      });

      return hostProps;
    }

    function initWrapperState$2(element, props) {
      var node = element;
      {
        ReactControlledValuePropTypes.checkPropTypes('textarea', props, getCurrentFiberStackAddendum$4);
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
          warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnValDefaultVal = true;
        }
      }

      var initialValue = props.value;

      // Only bother fetching default value if we're going to use it
      if (initialValue == null) {
        var defaultValue = props.defaultValue;
        // TODO (yungsters): Remove support for children content in <textarea>.
        var children = props.children;
        if (children != null) {
          {
            warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
          }
          !(defaultValue == null) ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
          if (Array.isArray(children)) {
            !(children.length <= 1) ? invariant(false, '<textarea> can only have at most one child.') : void 0;
            children = children[0];
          }

          defaultValue = '' + children;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        initialValue = defaultValue;
      }

      node._wrapperState = {
        initialValue: '' + initialValue
      };
    }

    function updateWrapper$1(element, props) {
      var node = element;
      var value = props.value;
      if (value != null) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        var newValue = '' + value;

        // To avoid side effects (such as losing text selection), only set value if changed
        if (newValue !== node.value) {
          node.value = newValue;
        }
        if (props.defaultValue == null) {
          node.defaultValue = newValue;
        }
      }
      if (props.defaultValue != null) {
        node.defaultValue = props.defaultValue;
      }
    }

    function postMountWrapper$3(element, props) {
      var node = element;
      // This is in postMount because we need access to the DOM node, which is not
      // available until after the component has mounted.
      var textContent = node.textContent;

      // Only set node.value if textContent is equal to the expected
      // initial value. In IE10/IE11 there is a bug where the placeholder attribute
      // will populate textContent as well.
      // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
      if (textContent === node._wrapperState.initialValue) {
        node.value = textContent;
      }
    }

    function restoreControlledState$3(element, props) {
      // DOM component is still mounted; update
      updateWrapper$1(element, props);
    }

    var HTML_NAMESPACE$1 = 'http://www.w3.org/1999/xhtml';
    var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

    var Namespaces = {
      html: HTML_NAMESPACE$1,
      mathml: MATH_NAMESPACE,
      svg: SVG_NAMESPACE
    };

    // Assumes there is no parent namespace.
    function getIntrinsicNamespace(type) {
      switch (type) {
        case 'svg':
          return SVG_NAMESPACE;
        case 'math':
          return MATH_NAMESPACE;
        default:
          return HTML_NAMESPACE$1;
      }
    }

    function getChildNamespace(parentNamespace, type) {
      if (parentNamespace == null || parentNamespace === HTML_NAMESPACE$1) {
        // No (or default) parent namespace: potential entry point.
        return getIntrinsicNamespace(type);
      }
      if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
        // We're leaving SVG.
        return HTML_NAMESPACE$1;
      }
      // By default, pass namespace below.
      return parentNamespace;
    }

    /* globals MSApp */

    /**
     * Create a function which has 'unsafe' privileges (required by windows8 apps)
     */
    var createMicrosoftUnsafeLocalFunction = function (func) {
      if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
        return function (arg0, arg1, arg2, arg3) {
          MSApp.execUnsafeLocalFunction(function () {
            return func(arg0, arg1, arg2, arg3);
          });
        };
      } else {
        return func;
      }
    };

    // SVG temp container for IE lacking innerHTML
    var reusableSVGContainer = void 0;

    /**
     * Set the innerHTML property of a node
     *
     * @param {DOMElement} node
     * @param {string} html
     * @internal
     */
    var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
      // IE does not have innerHTML for SVG nodes, so instead we inject the
      // new markup in a temp node and then move the child nodes across into
      // the target node

      if (node.namespaceURI === Namespaces.svg && !('innerHTML' in node)) {
        reusableSVGContainer = reusableSVGContainer || document.createElement('div');
        reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
        var svgNode = reusableSVGContainer.firstChild;
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        while (svgNode.firstChild) {
          node.appendChild(svgNode.firstChild);
        }
      } else {
        node.innerHTML = html;
      }
    });

    /**
     * Set the textContent property of a node. For text updates, it's faster
     * to set the `nodeValue` of the Text node directly instead of using
     * `.textContent` which will remove the existing node and create a new one.
     *
     * @param {DOMElement} node
     * @param {string} text
     * @internal
     */
    var setTextContent = function (node, text) {
      if (text) {
        var firstChild = node.firstChild;

        if (firstChild && firstChild === node.lastChild && firstChild.nodeType === TEXT_NODE) {
          firstChild.nodeValue = text;
          return;
        }
      }
      node.textContent = text;
    };

    /**
     * CSS properties which accept numbers but are not in units of "px".
     */
    var isUnitlessNumber = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,

      // SVG-related properties
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };

    /**
     * @param {string} prefix vendor-specific prefix, eg: Webkit
     * @param {string} key style name, eg: transitionDuration
     * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
     * WebkitTransitionDuration
     */
    function prefixKey(prefix, key) {
      return prefix + key.charAt(0).toUpperCase() + key.substring(1);
    }

    /**
     * Support style names that may come passed in prefixed by adding permutations
     * of vendor prefixes.
     */
    var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

    // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
    // infinite loop, because it iterates over the newly added props too.
    Object.keys(isUnitlessNumber).forEach(function (prop) {
      prefixes.forEach(function (prefix) {
        isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
      });
    });

    /**
     * Convert a value into the proper css writable value. The style name `name`
     * should be logical (no hyphens), as specified
     * in `CSSProperty.isUnitlessNumber`.
     *
     * @param {string} name CSS property name such as `topMargin`.
     * @param {*} value CSS property value such as `10px`.
     * @return {string} Normalized style value with dimensions applied.
     */
    function dangerousStyleValue(name, value, isCustomProperty) {
      // Note that we've removed escapeTextForBrowser() calls here since the
      // whole string will be escaped when the attribute is injected into
      // the markup. If you provide unsafe user data here they can inject
      // arbitrary CSS which may be problematic (I couldn't repro this):
      // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
      // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
      // This is not an XSS hole but instead a potential CSS injection issue
      // which has lead to a greater discussion about how we're going to
      // trust URLs moving forward. See #2115901

      var isEmpty = value == null || typeof value === 'boolean' || value === '';
      if (isEmpty) {
        return '';
      }

      if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
        return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
      }

      return ('' + value).trim();
    }

    var warnValidStyle = emptyFunction;

    {
      // 'msTransform' is correct, but the other prefixes should be capitalized
      var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

      // style values shouldn't contain a semicolon
      var badStyleValueWithSemicolonPattern = /;\s*$/;

      var warnedStyleNames = {};
      var warnedStyleValues = {};
      var warnedForNaNValue = false;
      var warnedForInfinityValue = false;

      var warnHyphenatedStyleName = function (name, getStack) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }

        warnedStyleNames[name] = true;
        warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), getStack());
      };

      var warnBadVendoredStyleName = function (name, getStack) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }

        warnedStyleNames[name] = true;
        warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), getStack());
      };

      var warnStyleValueWithSemicolon = function (name, value, getStack) {
        if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
          return;
        }

        warnedStyleValues[value] = true;
        warning(false, "Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.%s', name, value.replace(badStyleValueWithSemicolonPattern, ''), getStack());
      };

      var warnStyleValueIsNaN = function (name, value, getStack) {
        if (warnedForNaNValue) {
          return;
        }

        warnedForNaNValue = true;
        warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, getStack());
      };

      var warnStyleValueIsInfinity = function (name, value, getStack) {
        if (warnedForInfinityValue) {
          return;
        }

        warnedForInfinityValue = true;
        warning(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, getStack());
      };

      warnValidStyle = function (name, value, getStack) {
        if (name.indexOf('-') > -1) {
          warnHyphenatedStyleName(name, getStack);
        } else if (badVendoredStyleNamePattern.test(name)) {
          warnBadVendoredStyleName(name, getStack);
        } else if (badStyleValueWithSemicolonPattern.test(value)) {
          warnStyleValueWithSemicolon(name, value, getStack);
        }

        if (typeof value === 'number') {
          if (isNaN(value)) {
            warnStyleValueIsNaN(name, value, getStack);
          } else if (!isFinite(value)) {
            warnStyleValueIsInfinity(name, value, getStack);
          }
        }
      };
    }

    var warnValidStyle$1 = warnValidStyle;

    /**
     * Operations for dealing with CSS properties.
     */

    /**
     * This creates a string that is expected to be equivalent to the style
     * attribute generated by server-side rendering. It by-passes warnings and
     * security checks so it's not safe to use this value for anything other than
     * comparison. It is only used in DEV for SSR validation.
     */
    function createDangerousStringForStyles(styles) {
      {
        var serialized = '';
        var delimiter = '';
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          var styleValue = styles[styleName];
          if (styleValue != null) {
            var isCustomProperty = styleName.indexOf('--') === 0;
            serialized += delimiter + hyphenateStyleName(styleName) + ':';
            serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);

            delimiter = ';';
          }
        }
        return serialized || null;
      }
    }

    /**
     * Sets the value for multiple styles on a node.  If a value is specified as
     * '' (empty string), the corresponding style property will be unset.
     *
     * @param {DOMElement} node
     * @param {object} styles
     */
    function setValueForStyles(node, styles, getStack) {
      var style = node.style;
      for (var styleName in styles) {
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }
        var isCustomProperty = styleName.indexOf('--') === 0;
        {
          if (!isCustomProperty) {
            warnValidStyle$1(styleName, styles[styleName], getStack);
          }
        }
        var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
        if (styleName === 'float') {
          styleName = 'cssFloat';
        }
        if (isCustomProperty) {
          style.setProperty(styleName, styleValue);
        } else {
          style[styleName] = styleValue;
        }
      }
    }

    // For HTML, certain tags should omit their close tag. We keep a whitelist for
    // those special-case tags.

    var omittedCloseTags = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    };

    // For HTML, certain tags cannot have children. This has the same purpose as
    // `omittedCloseTags` except that `menuitem` should still have its closing tag.

    var voidElementTags = _assign({
      menuitem: true
    }, omittedCloseTags);

    var HTML$1 = '__html';

    function assertValidProps(tag, props, getStack) {
      if (!props) {
        return;
      }
      // Note the use of `==` which checks for null or undefined.
      if (voidElementTags[tag]) {
        !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getStack()) : void 0;
      }
      if (props.dangerouslySetInnerHTML != null) {
        !(props.children == null) ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
        !(typeof props.dangerouslySetInnerHTML === 'object' && HTML$1 in props.dangerouslySetInnerHTML) ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
      }
      {
        !(props.suppressContentEditableWarning || !props.contentEditable || props.children == null) ? warning(false, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.%s', getStack()) : void 0;
      }
      !(props.style == null || typeof props.style === 'object') ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getStack()) : void 0;
    }

    function isCustomComponent(tagName, props) {
      if (tagName.indexOf('-') === -1) {
        return typeof props.is === 'string';
      }
      switch (tagName) {
        // These are reserved SVG and MathML elements.
        // We don't mind this whitelist too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return false;
        default:
          return true;
      }
    }

    // When adding attributes to the HTML or SVG whitelist, be sure to
    // also add them to this module to ensure casing and incorrect name
    // warnings.
    var possibleStandardNames = {
      // HTML
      accept: 'accept',
      acceptcharset: 'acceptCharset',
      'accept-charset': 'acceptCharset',
      accesskey: 'accessKey',
      action: 'action',
      allowfullscreen: 'allowFullScreen',
      alt: 'alt',
      as: 'as',
      async: 'async',
      autocapitalize: 'autoCapitalize',
      autocomplete: 'autoComplete',
      autocorrect: 'autoCorrect',
      autofocus: 'autoFocus',
      autoplay: 'autoPlay',
      autosave: 'autoSave',
      capture: 'capture',
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing',
      challenge: 'challenge',
      charset: 'charSet',
      checked: 'checked',
      children: 'children',
      cite: 'cite',
      class: 'className',
      classid: 'classID',
      classname: 'className',
      cols: 'cols',
      colspan: 'colSpan',
      content: 'content',
      contenteditable: 'contentEditable',
      contextmenu: 'contextMenu',
      controls: 'controls',
      controlslist: 'controlsList',
      coords: 'coords',
      crossorigin: 'crossOrigin',
      dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
      data: 'data',
      datetime: 'dateTime',
      default: 'default',
      defaultchecked: 'defaultChecked',
      defaultvalue: 'defaultValue',
      defer: 'defer',
      dir: 'dir',
      disabled: 'disabled',
      download: 'download',
      draggable: 'draggable',
      enctype: 'encType',
      for: 'htmlFor',
      form: 'form',
      formmethod: 'formMethod',
      formaction: 'formAction',
      formenctype: 'formEncType',
      formnovalidate: 'formNoValidate',
      formtarget: 'formTarget',
      frameborder: 'frameBorder',
      headers: 'headers',
      height: 'height',
      hidden: 'hidden',
      high: 'high',
      href: 'href',
      hreflang: 'hrefLang',
      htmlfor: 'htmlFor',
      httpequiv: 'httpEquiv',
      'http-equiv': 'httpEquiv',
      icon: 'icon',
      id: 'id',
      innerhtml: 'innerHTML',
      inputmode: 'inputMode',
      integrity: 'integrity',
      is: 'is',
      itemid: 'itemID',
      itemprop: 'itemProp',
      itemref: 'itemRef',
      itemscope: 'itemScope',
      itemtype: 'itemType',
      keyparams: 'keyParams',
      keytype: 'keyType',
      kind: 'kind',
      label: 'label',
      lang: 'lang',
      list: 'list',
      loop: 'loop',
      low: 'low',
      manifest: 'manifest',
      marginwidth: 'marginWidth',
      marginheight: 'marginHeight',
      max: 'max',
      maxlength: 'maxLength',
      media: 'media',
      mediagroup: 'mediaGroup',
      method: 'method',
      min: 'min',
      minlength: 'minLength',
      multiple: 'multiple',
      muted: 'muted',
      name: 'name',
      nomodule: 'noModule',
      nonce: 'nonce',
      novalidate: 'noValidate',
      open: 'open',
      optimum: 'optimum',
      pattern: 'pattern',
      placeholder: 'placeholder',
      playsinline: 'playsInline',
      poster: 'poster',
      preload: 'preload',
      profile: 'profile',
      radiogroup: 'radioGroup',
      readonly: 'readOnly',
      referrerpolicy: 'referrerPolicy',
      rel: 'rel',
      required: 'required',
      reversed: 'reversed',
      role: 'role',
      rows: 'rows',
      rowspan: 'rowSpan',
      sandbox: 'sandbox',
      scope: 'scope',
      scoped: 'scoped',
      scrolling: 'scrolling',
      seamless: 'seamless',
      selected: 'selected',
      shape: 'shape',
      size: 'size',
      sizes: 'sizes',
      span: 'span',
      spellcheck: 'spellCheck',
      src: 'src',
      srcdoc: 'srcDoc',
      srclang: 'srcLang',
      srcset: 'srcSet',
      start: 'start',
      step: 'step',
      style: 'style',
      summary: 'summary',
      tabindex: 'tabIndex',
      target: 'target',
      title: 'title',
      type: 'type',
      usemap: 'useMap',
      value: 'value',
      width: 'width',
      wmode: 'wmode',
      wrap: 'wrap',

      // SVG
      about: 'about',
      accentheight: 'accentHeight',
      'accent-height': 'accentHeight',
      accumulate: 'accumulate',
      additive: 'additive',
      alignmentbaseline: 'alignmentBaseline',
      'alignment-baseline': 'alignmentBaseline',
      allowreorder: 'allowReorder',
      alphabetic: 'alphabetic',
      amplitude: 'amplitude',
      arabicform: 'arabicForm',
      'arabic-form': 'arabicForm',
      ascent: 'ascent',
      attributename: 'attributeName',
      attributetype: 'attributeType',
      autoreverse: 'autoReverse',
      azimuth: 'azimuth',
      basefrequency: 'baseFrequency',
      baselineshift: 'baselineShift',
      'baseline-shift': 'baselineShift',
      baseprofile: 'baseProfile',
      bbox: 'bbox',
      begin: 'begin',
      bias: 'bias',
      by: 'by',
      calcmode: 'calcMode',
      capheight: 'capHeight',
      'cap-height': 'capHeight',
      clip: 'clip',
      clippath: 'clipPath',
      'clip-path': 'clipPath',
      clippathunits: 'clipPathUnits',
      cliprule: 'clipRule',
      'clip-rule': 'clipRule',
      color: 'color',
      colorinterpolation: 'colorInterpolation',
      'color-interpolation': 'colorInterpolation',
      colorinterpolationfilters: 'colorInterpolationFilters',
      'color-interpolation-filters': 'colorInterpolationFilters',
      colorprofile: 'colorProfile',
      'color-profile': 'colorProfile',
      colorrendering: 'colorRendering',
      'color-rendering': 'colorRendering',
      contentscripttype: 'contentScriptType',
      contentstyletype: 'contentStyleType',
      cursor: 'cursor',
      cx: 'cx',
      cy: 'cy',
      d: 'd',
      datatype: 'datatype',
      decelerate: 'decelerate',
      descent: 'descent',
      diffuseconstant: 'diffuseConstant',
      direction: 'direction',
      display: 'display',
      divisor: 'divisor',
      dominantbaseline: 'dominantBaseline',
      'dominant-baseline': 'dominantBaseline',
      dur: 'dur',
      dx: 'dx',
      dy: 'dy',
      edgemode: 'edgeMode',
      elevation: 'elevation',
      enablebackground: 'enableBackground',
      'enable-background': 'enableBackground',
      end: 'end',
      exponent: 'exponent',
      externalresourcesrequired: 'externalResourcesRequired',
      fill: 'fill',
      fillopacity: 'fillOpacity',
      'fill-opacity': 'fillOpacity',
      fillrule: 'fillRule',
      'fill-rule': 'fillRule',
      filter: 'filter',
      filterres: 'filterRes',
      filterunits: 'filterUnits',
      floodopacity: 'floodOpacity',
      'flood-opacity': 'floodOpacity',
      floodcolor: 'floodColor',
      'flood-color': 'floodColor',
      focusable: 'focusable',
      fontfamily: 'fontFamily',
      'font-family': 'fontFamily',
      fontsize: 'fontSize',
      'font-size': 'fontSize',
      fontsizeadjust: 'fontSizeAdjust',
      'font-size-adjust': 'fontSizeAdjust',
      fontstretch: 'fontStretch',
      'font-stretch': 'fontStretch',
      fontstyle: 'fontStyle',
      'font-style': 'fontStyle',
      fontvariant: 'fontVariant',
      'font-variant': 'fontVariant',
      fontweight: 'fontWeight',
      'font-weight': 'fontWeight',
      format: 'format',
      from: 'from',
      fx: 'fx',
      fy: 'fy',
      g1: 'g1',
      g2: 'g2',
      glyphname: 'glyphName',
      'glyph-name': 'glyphName',
      glyphorientationhorizontal: 'glyphOrientationHorizontal',
      'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
      glyphorientationvertical: 'glyphOrientationVertical',
      'glyph-orientation-vertical': 'glyphOrientationVertical',
      glyphref: 'glyphRef',
      gradienttransform: 'gradientTransform',
      gradientunits: 'gradientUnits',
      hanging: 'hanging',
      horizadvx: 'horizAdvX',
      'horiz-adv-x': 'horizAdvX',
      horizoriginx: 'horizOriginX',
      'horiz-origin-x': 'horizOriginX',
      ideographic: 'ideographic',
      imagerendering: 'imageRendering',
      'image-rendering': 'imageRendering',
      in2: 'in2',
      in: 'in',
      inlist: 'inlist',
      intercept: 'intercept',
      k1: 'k1',
      k2: 'k2',
      k3: 'k3',
      k4: 'k4',
      k: 'k',
      kernelmatrix: 'kernelMatrix',
      kernelunitlength: 'kernelUnitLength',
      kerning: 'kerning',
      keypoints: 'keyPoints',
      keysplines: 'keySplines',
      keytimes: 'keyTimes',
      lengthadjust: 'lengthAdjust',
      letterspacing: 'letterSpacing',
      'letter-spacing': 'letterSpacing',
      lightingcolor: 'lightingColor',
      'lighting-color': 'lightingColor',
      limitingconeangle: 'limitingConeAngle',
      local: 'local',
      markerend: 'markerEnd',
      'marker-end': 'markerEnd',
      markerheight: 'markerHeight',
      markermid: 'markerMid',
      'marker-mid': 'markerMid',
      markerstart: 'markerStart',
      'marker-start': 'markerStart',
      markerunits: 'markerUnits',
      markerwidth: 'markerWidth',
      mask: 'mask',
      maskcontentunits: 'maskContentUnits',
      maskunits: 'maskUnits',
      mathematical: 'mathematical',
      mode: 'mode',
      numoctaves: 'numOctaves',
      offset: 'offset',
      opacity: 'opacity',
      operator: 'operator',
      order: 'order',
      orient: 'orient',
      orientation: 'orientation',
      origin: 'origin',
      overflow: 'overflow',
      overlineposition: 'overlinePosition',
      'overline-position': 'overlinePosition',
      overlinethickness: 'overlineThickness',
      'overline-thickness': 'overlineThickness',
      paintorder: 'paintOrder',
      'paint-order': 'paintOrder',
      panose1: 'panose1',
      'panose-1': 'panose1',
      pathlength: 'pathLength',
      patterncontentunits: 'patternContentUnits',
      patterntransform: 'patternTransform',
      patternunits: 'patternUnits',
      pointerevents: 'pointerEvents',
      'pointer-events': 'pointerEvents',
      points: 'points',
      pointsatx: 'pointsAtX',
      pointsaty: 'pointsAtY',
      pointsatz: 'pointsAtZ',
      prefix: 'prefix',
      preservealpha: 'preserveAlpha',
      preserveaspectratio: 'preserveAspectRatio',
      primitiveunits: 'primitiveUnits',
      property: 'property',
      r: 'r',
      radius: 'radius',
      refx: 'refX',
      refy: 'refY',
      renderingintent: 'renderingIntent',
      'rendering-intent': 'renderingIntent',
      repeatcount: 'repeatCount',
      repeatdur: 'repeatDur',
      requiredextensions: 'requiredExtensions',
      requiredfeatures: 'requiredFeatures',
      resource: 'resource',
      restart: 'restart',
      result: 'result',
      results: 'results',
      rotate: 'rotate',
      rx: 'rx',
      ry: 'ry',
      scale: 'scale',
      security: 'security',
      seed: 'seed',
      shaperendering: 'shapeRendering',
      'shape-rendering': 'shapeRendering',
      slope: 'slope',
      spacing: 'spacing',
      specularconstant: 'specularConstant',
      specularexponent: 'specularExponent',
      speed: 'speed',
      spreadmethod: 'spreadMethod',
      startoffset: 'startOffset',
      stddeviation: 'stdDeviation',
      stemh: 'stemh',
      stemv: 'stemv',
      stitchtiles: 'stitchTiles',
      stopcolor: 'stopColor',
      'stop-color': 'stopColor',
      stopopacity: 'stopOpacity',
      'stop-opacity': 'stopOpacity',
      strikethroughposition: 'strikethroughPosition',
      'strikethrough-position': 'strikethroughPosition',
      strikethroughthickness: 'strikethroughThickness',
      'strikethrough-thickness': 'strikethroughThickness',
      string: 'string',
      stroke: 'stroke',
      strokedasharray: 'strokeDasharray',
      'stroke-dasharray': 'strokeDasharray',
      strokedashoffset: 'strokeDashoffset',
      'stroke-dashoffset': 'strokeDashoffset',
      strokelinecap: 'strokeLinecap',
      'stroke-linecap': 'strokeLinecap',
      strokelinejoin: 'strokeLinejoin',
      'stroke-linejoin': 'strokeLinejoin',
      strokemiterlimit: 'strokeMiterlimit',
      'stroke-miterlimit': 'strokeMiterlimit',
      strokewidth: 'strokeWidth',
      'stroke-width': 'strokeWidth',
      strokeopacity: 'strokeOpacity',
      'stroke-opacity': 'strokeOpacity',
      suppresscontenteditablewarning: 'suppressContentEditableWarning',
      suppresshydrationwarning: 'suppressHydrationWarning',
      surfacescale: 'surfaceScale',
      systemlanguage: 'systemLanguage',
      tablevalues: 'tableValues',
      targetx: 'targetX',
      targety: 'targetY',
      textanchor: 'textAnchor',
      'text-anchor': 'textAnchor',
      textdecoration: 'textDecoration',
      'text-decoration': 'textDecoration',
      textlength: 'textLength',
      textrendering: 'textRendering',
      'text-rendering': 'textRendering',
      to: 'to',
      transform: 'transform',
      typeof: 'typeof',
      u1: 'u1',
      u2: 'u2',
      underlineposition: 'underlinePosition',
      'underline-position': 'underlinePosition',
      underlinethickness: 'underlineThickness',
      'underline-thickness': 'underlineThickness',
      unicode: 'unicode',
      unicodebidi: 'unicodeBidi',
      'unicode-bidi': 'unicodeBidi',
      unicoderange: 'unicodeRange',
      'unicode-range': 'unicodeRange',
      unitsperem: 'unitsPerEm',
      'units-per-em': 'unitsPerEm',
      unselectable: 'unselectable',
      valphabetic: 'vAlphabetic',
      'v-alphabetic': 'vAlphabetic',
      values: 'values',
      vectoreffect: 'vectorEffect',
      'vector-effect': 'vectorEffect',
      version: 'version',
      vertadvy: 'vertAdvY',
      'vert-adv-y': 'vertAdvY',
      vertoriginx: 'vertOriginX',
      'vert-origin-x': 'vertOriginX',
      vertoriginy: 'vertOriginY',
      'vert-origin-y': 'vertOriginY',
      vhanging: 'vHanging',
      'v-hanging': 'vHanging',
      videographic: 'vIdeographic',
      'v-ideographic': 'vIdeographic',
      viewbox: 'viewBox',
      viewtarget: 'viewTarget',
      visibility: 'visibility',
      vmathematical: 'vMathematical',
      'v-mathematical': 'vMathematical',
      vocab: 'vocab',
      widths: 'widths',
      wordspacing: 'wordSpacing',
      'word-spacing': 'wordSpacing',
      writingmode: 'writingMode',
      'writing-mode': 'writingMode',
      x1: 'x1',
      x2: 'x2',
      x: 'x',
      xchannelselector: 'xChannelSelector',
      xheight: 'xHeight',
      'x-height': 'xHeight',
      xlinkactuate: 'xlinkActuate',
      'xlink:actuate': 'xlinkActuate',
      xlinkarcrole: 'xlinkArcrole',
      'xlink:arcrole': 'xlinkArcrole',
      xlinkhref: 'xlinkHref',
      'xlink:href': 'xlinkHref',
      xlinkrole: 'xlinkRole',
      'xlink:role': 'xlinkRole',
      xlinkshow: 'xlinkShow',
      'xlink:show': 'xlinkShow',
      xlinktitle: 'xlinkTitle',
      'xlink:title': 'xlinkTitle',
      xlinktype: 'xlinkType',
      'xlink:type': 'xlinkType',
      xmlbase: 'xmlBase',
      'xml:base': 'xmlBase',
      xmllang: 'xmlLang',
      'xml:lang': 'xmlLang',
      xmlns: 'xmlns',
      'xml:space': 'xmlSpace',
      xmlnsxlink: 'xmlnsXlink',
      'xmlns:xlink': 'xmlnsXlink',
      xmlspace: 'xmlSpace',
      y1: 'y1',
      y2: 'y2',
      y: 'y',
      ychannelselector: 'yChannelSelector',
      z: 'z',
      zoomandpan: 'zoomAndPan'
    };

    var ariaProperties = {
      'aria-current': 0, // state
      'aria-details': 0,
      'aria-disabled': 0, // state
      'aria-hidden': 0, // state
      'aria-invalid': 0, // state
      'aria-keyshortcuts': 0,
      'aria-label': 0,
      'aria-roledescription': 0,
      // Widget Attributes
      'aria-autocomplete': 0,
      'aria-checked': 0,
      'aria-expanded': 0,
      'aria-haspopup': 0,
      'aria-level': 0,
      'aria-modal': 0,
      'aria-multiline': 0,
      'aria-multiselectable': 0,
      'aria-orientation': 0,
      'aria-placeholder': 0,
      'aria-pressed': 0,
      'aria-readonly': 0,
      'aria-required': 0,
      'aria-selected': 0,
      'aria-sort': 0,
      'aria-valuemax': 0,
      'aria-valuemin': 0,
      'aria-valuenow': 0,
      'aria-valuetext': 0,
      // Live Region Attributes
      'aria-atomic': 0,
      'aria-busy': 0,
      'aria-live': 0,
      'aria-relevant': 0,
      // Drag-and-Drop Attributes
      'aria-dropeffect': 0,
      'aria-grabbed': 0,
      // Relationship Attributes
      'aria-activedescendant': 0,
      'aria-colcount': 0,
      'aria-colindex': 0,
      'aria-colspan': 0,
      'aria-controls': 0,
      'aria-describedby': 0,
      'aria-errormessage': 0,
      'aria-flowto': 0,
      'aria-labelledby': 0,
      'aria-owns': 0,
      'aria-posinset': 0,
      'aria-rowcount': 0,
      'aria-rowindex': 0,
      'aria-rowspan': 0,
      'aria-setsize': 0
    };

    var warnedProperties = {};
    var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
    var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function getStackAddendum() {
      var stack = ReactDebugCurrentFrame.getStackAddendum();
      return stack != null ? stack : '';
    }

    function validateProperty(tagName, name) {
      if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
        return true;
      }

      if (rARIACamel.test(name)) {
        var ariaName = 'aria-' + name.slice(4).toLowerCase();
        var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;

        // If this is an aria-* attribute, but is not listed in the known DOM
        // DOM properties, then it is an invalid aria-* attribute.
        if (correctName == null) {
          warning(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum());
          warnedProperties[name] = true;
          return true;
        }
        // aria-* attributes should be lowercase; suggest the lowercase version.
        if (name !== correctName) {
          warning(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum());
          warnedProperties[name] = true;
          return true;
        }
      }

      if (rARIA.test(name)) {
        var lowerCasedName = name.toLowerCase();
        var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

        // If this is an aria-* attribute, but is not listed in the known DOM
        // DOM properties, then it is an invalid aria-* attribute.
        if (standardName == null) {
          warnedProperties[name] = true;
          return false;
        }
        // aria-* attributes should be lowercase; suggest the lowercase version.
        if (name !== standardName) {
          warning(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum());
          warnedProperties[name] = true;
          return true;
        }
      }

      return true;
    }

    function warnInvalidARIAProps(type, props) {
      var invalidProps = [];

      for (var key in props) {
        var isValid = validateProperty(type, key);
        if (!isValid) {
          invalidProps.push(key);
        }
      }

      var unknownPropString = invalidProps.map(function (prop) {
        return '`' + prop + '`';
      }).join(', ');

      if (invalidProps.length === 1) {
        warning(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
      } else if (invalidProps.length > 1) {
        warning(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
      }
    }

    function validateProperties(type, props) {
      if (isCustomComponent(type, props)) {
        return;
      }
      warnInvalidARIAProps(type, props);
    }

    var didWarnValueNull = false;

    function getStackAddendum$1() {
      var stack = ReactDebugCurrentFrame.getStackAddendum();
      return stack != null ? stack : '';
    }

    function validateProperties$1(type, props) {
      if (type !== 'input' && type !== 'textarea' && type !== 'select') {
        return;
      }

      if (props != null && props.value === null && !didWarnValueNull) {
        didWarnValueNull = true;
        if (type === 'select' && props.multiple) {
          warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.%s', type, getStackAddendum$1());
        } else {
          warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$1());
        }
      }
    }

    function getStackAddendum$2() {
      var stack = ReactDebugCurrentFrame.getStackAddendum();
      return stack != null ? stack : '';
    }

    var validateProperty$1 = function () {};

    {
      var warnedProperties$1 = {};
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      var EVENT_NAME_REGEX = /^on./;
      var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
      var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
      var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

      validateProperty$1 = function (tagName, name, value, canUseEventSystem) {
        if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
          return true;
        }

        var lowerCasedName = name.toLowerCase();
        if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
          warning(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
          warnedProperties$1[name] = true;
          return true;
        }

        // We can't rely on the event system being injected on the server.
        if (canUseEventSystem) {
          if (registrationNameModules.hasOwnProperty(name)) {
            return true;
          }
          var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
          if (registrationName != null) {
            warning(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$2());
            warnedProperties$1[name] = true;
            return true;
          }
          if (EVENT_NAME_REGEX.test(name)) {
            warning(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$2());
            warnedProperties$1[name] = true;
            return true;
          }
        } else if (EVENT_NAME_REGEX.test(name)) {
          // If no event plugins have been injected, we are in a server environment.
          // So we can't tell if the event name is correct for sure, but we can filter
          // out known bad ones like `onclick`. We can't suggest a specific replacement though.
          if (INVALID_EVENT_NAME_REGEX.test(name)) {
            warning(false, 'Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.%s', name, getStackAddendum$2());
          }
          warnedProperties$1[name] = true;
          return true;
        }

        // Let the ARIA attribute hook validate ARIA attributes
        if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
          return true;
        }

        if (lowerCasedName === 'innerhtml') {
          warning(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
          warnedProperties$1[name] = true;
          return true;
        }

        if (lowerCasedName === 'aria') {
          warning(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
          warnedProperties$1[name] = true;
          return true;
        }

        if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
          warning(false, 'Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$2());
          warnedProperties$1[name] = true;
          return true;
        }

        if (typeof value === 'number' && isNaN(value)) {
          warning(false, 'Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$2());
          warnedProperties$1[name] = true;
          return true;
        }

        var propertyInfo = getPropertyInfo(name);
        var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;

        // Known attributes should match the casing specified in the property config.
        if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
          var standardName = possibleStandardNames[lowerCasedName];
          if (standardName !== name) {
            warning(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$2());
            warnedProperties$1[name] = true;
            return true;
          }
        } else if (!isReserved && name !== lowerCasedName) {
          // Unknown attributes should have lowercase casing since that's how they
          // will be cased anyway with server rendering.
          warning(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$2());
          warnedProperties$1[name] = true;
          return true;
        }

        if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
          if (value) {
            warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.%s', value, name, name, value, name, getStackAddendum$2());
          } else {
            warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', value, name, name, value, name, name, name, getStackAddendum$2());
          }
          warnedProperties$1[name] = true;
          return true;
        }

        // Now that we've validated casing, do not validate
        // data types for reserved props
        if (isReserved) {
          return true;
        }

        // Warn when a known attribute is a bad type
        if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
          warnedProperties$1[name] = true;
          return false;
        }

        return true;
      };
    }

    var warnUnknownProperties = function (type, props, canUseEventSystem) {
      var unknownProps = [];
      for (var key in props) {
        var isValid = validateProperty$1(type, key, props[key], canUseEventSystem);
        if (!isValid) {
          unknownProps.push(key);
        }
      }

      var unknownPropString = unknownProps.map(function (prop) {
        return '`' + prop + '`';
      }).join(', ');
      if (unknownProps.length === 1) {
        warning(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
      } else if (unknownProps.length > 1) {
        warning(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
      }
    };

    function validateProperties$2(type, props, canUseEventSystem) {
      if (isCustomComponent(type, props)) {
        return;
      }
      warnUnknownProperties(type, props, canUseEventSystem);
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberOwnerName$2 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
    var getCurrentFiberStackAddendum$2 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnInvalidHydration = false;
    var didWarnShadyDOM = false;

    var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
    var SUPPRESS_CONTENT_EDITABLE_WARNING = 'suppressContentEditableWarning';
    var SUPPRESS_HYDRATION_WARNING$1 = 'suppressHydrationWarning';
    var AUTOFOCUS = 'autoFocus';
    var CHILDREN = 'children';
    var STYLE = 'style';
    var HTML = '__html';

    var HTML_NAMESPACE = Namespaces.html;

    var getStack = emptyFunction.thatReturns('');

    var warnedUnknownTags = void 0;
    var suppressHydrationWarning = void 0;

    var validatePropertiesInDevelopment = void 0;
    var warnForTextDifference = void 0;
    var warnForPropDifference = void 0;
    var warnForExtraAttributes = void 0;
    var warnForInvalidEventListener = void 0;

    var normalizeMarkupForTextOrAttribute = void 0;
    var normalizeHTML = void 0;

    {
      getStack = getCurrentFiberStackAddendum$2;

      warnedUnknownTags = {
        // Chrome is the only major browser not shipping <time>. But as of July
        // 2017 it intends to ship it due to widespread usage. We intentionally
        // *don't* warn for <time> even if it's unrecognized by Chrome because
        // it soon will be, and many apps have been using it anyway.
        time: true,
        // There are working polyfills for <dialog>. Let people use it.
        dialog: true
      };

      validatePropertiesInDevelopment = function (type, props) {
        validateProperties(type, props);
        validateProperties$1(type, props);
        validateProperties$2(type, props, /* canUseEventSystem */true);
      };

      // HTML parsing normalizes CR and CRLF to LF.
      // It also can turn \u0000 into \uFFFD inside attributes.
      // https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
      // If we have a mismatch, it might be caused by that.
      // We will still patch up in this case but not fire the warning.
      var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
      var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;

      normalizeMarkupForTextOrAttribute = function (markup) {
        var markupString = typeof markup === 'string' ? markup : '' + markup;
        return markupString.replace(NORMALIZE_NEWLINES_REGEX, '\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, '');
      };

      warnForTextDifference = function (serverText, clientText) {
        if (didWarnInvalidHydration) {
          return;
        }
        var normalizedClientText = normalizeMarkupForTextOrAttribute(clientText);
        var normalizedServerText = normalizeMarkupForTextOrAttribute(serverText);
        if (normalizedServerText === normalizedClientText) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Text content did not match. Server: "%s" Client: "%s"', normalizedServerText, normalizedClientText);
      };

      warnForPropDifference = function (propName, serverValue, clientValue) {
        if (didWarnInvalidHydration) {
          return;
        }
        var normalizedClientValue = normalizeMarkupForTextOrAttribute(clientValue);
        var normalizedServerValue = normalizeMarkupForTextOrAttribute(serverValue);
        if (normalizedServerValue === normalizedClientValue) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Prop `%s` did not match. Server: %s Client: %s', propName, JSON.stringify(normalizedServerValue), JSON.stringify(normalizedClientValue));
      };

      warnForExtraAttributes = function (attributeNames) {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        var names = [];
        attributeNames.forEach(function (name) {
          names.push(name);
        });
        warning(false, 'Extra attributes from the server: %s', names);
      };

      warnForInvalidEventListener = function (registrationName, listener) {
        if (listener === false) {
          warning(false, 'Expected `%s` listener to be a function, instead got `false`.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', registrationName, registrationName, registrationName, getCurrentFiberStackAddendum$2());
        } else {
          warning(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.%s', registrationName, typeof listener, getCurrentFiberStackAddendum$2());
        }
      };

      // Parse the HTML and read it back to normalize the HTML string so that it
      // can be used for comparison.
      normalizeHTML = function (parent, html) {
        // We could have created a separate document here to avoid
        // re-initializing custom elements if they exist. But this breaks
        // how <noscript> is being handled. So we use the same document.
        // See the discussion in https://github.com/facebook/react/pull/11157.
        var testElement = parent.namespaceURI === HTML_NAMESPACE ? parent.ownerDocument.createElement(parent.tagName) : parent.ownerDocument.createElementNS(parent.namespaceURI, parent.tagName);
        testElement.innerHTML = html;
        return testElement.innerHTML;
      };
    }

    function ensureListeningTo(rootContainerElement, registrationName) {
      var isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
      var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
      listenTo(registrationName, doc);
    }

    function getOwnerDocumentFromRootContainer(rootContainerElement) {
      return rootContainerElement.nodeType === DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;
    }

    function trapClickOnNonInteractiveElement(node) {
      // Mobile Safari does not fire properly bubble click events on
      // non-interactive elements, which means delegated click listeners do not
      // fire. The workaround for this bug involves attaching an empty click
      // listener on the target node.
      // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
      // Just set it using the onclick property so that we don't have to manage any
      // bookkeeping for it. Not sure if we need to clear it when the listener is
      // removed.
      // TODO: Only do this for the relevant Safaris maybe?
      node.onclick = emptyFunction;
    }

    function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
      for (var propKey in nextProps) {
        if (!nextProps.hasOwnProperty(propKey)) {
          continue;
        }
        var nextProp = nextProps[propKey];
        if (propKey === STYLE) {
          {
            if (nextProp) {
              // Freeze the next style object so that we can assume it won't be
              // mutated. We have already warned for this in the past.
              Object.freeze(nextProp);
            }
          }
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          setValueForStyles(domElement, nextProp, getStack);
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          var nextHtml = nextProp ? nextProp[HTML] : undefined;
          if (nextHtml != null) {
            setInnerHTML(domElement, nextHtml);
          }
        } else if (propKey === CHILDREN) {
          if (typeof nextProp === 'string') {
            // Avoid setting initial textContent when the text is empty. In IE11 setting
            // textContent on a <textarea> will cause the placeholder to not
            // show within the <textarea> until it has been focused and blurred again.
            // https://github.com/facebook/react/issues/6731#issuecomment-254874553
            var canSetTextContent = tag !== 'textarea' || nextProp !== '';
            if (canSetTextContent) {
              setTextContent(domElement, nextProp);
            }
          } else if (typeof nextProp === 'number') {
            setTextContent(domElement, '' + nextProp);
          }
        } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
          // Noop
        } else if (propKey === AUTOFOCUS) {
          // We polyfill it separately on the client during commit.
          // We blacklist it here rather than in the property list because we emit it in SSR.
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          if (nextProp != null) {
            if (true && typeof nextProp !== 'function') {
              warnForInvalidEventListener(propKey, nextProp);
            }
            ensureListeningTo(rootContainerElement, propKey);
          }
        } else if (nextProp != null) {
          setValueForProperty(domElement, propKey, nextProp, isCustomComponentTag);
        }
      }
    }

    function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
      // TODO: Handle wasCustomComponentTag
      for (var i = 0; i < updatePayload.length; i += 2) {
        var propKey = updatePayload[i];
        var propValue = updatePayload[i + 1];
        if (propKey === STYLE) {
          setValueForStyles(domElement, propValue, getStack);
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          setInnerHTML(domElement, propValue);
        } else if (propKey === CHILDREN) {
          setTextContent(domElement, propValue);
        } else {
          setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
        }
      }
    }

    function createElement$1(type, props, rootContainerElement, parentNamespace) {
      var isCustomComponentTag = void 0;

      // We create tags in the namespace of their parent container, except HTML
      // tags get no namespace.
      var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
      var domElement = void 0;
      var namespaceURI = parentNamespace;
      if (namespaceURI === HTML_NAMESPACE) {
        namespaceURI = getIntrinsicNamespace(type);
      }
      if (namespaceURI === HTML_NAMESPACE) {
        {
          isCustomComponentTag = isCustomComponent(type, props);
          // Should this check be gated by parent namespace? Not sure we want to
          // allow <SVG> or <mATH>.
          !(isCustomComponentTag || type === type.toLowerCase()) ? warning(false, '<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', type) : void 0;
        }

        if (type === 'script') {
          // Create the script via .innerHTML so its "parser-inserted" flag is
          // set to true and it does not execute
          var div = ownerDocument.createElement('div');
          div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
          // This is guaranteed to yield a script element.
          var firstChild = div.firstChild;
          domElement = div.removeChild(firstChild);
        } else if (typeof props.is === 'string') {
          // $FlowIssue `createElement` should be updated for Web Components
          domElement = ownerDocument.createElement(type, { is: props.is });
        } else {
          // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
          // See discussion in https://github.com/facebook/react/pull/6896
          // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
          domElement = ownerDocument.createElement(type);
        }
      } else {
        domElement = ownerDocument.createElementNS(namespaceURI, type);
      }

      {
        if (namespaceURI === HTML_NAMESPACE) {
          if (!isCustomComponentTag && Object.prototype.toString.call(domElement) === '[object HTMLUnknownElement]' && !Object.prototype.hasOwnProperty.call(warnedUnknownTags, type)) {
            warnedUnknownTags[type] = true;
            warning(false, 'The tag <%s> is unrecognized in this browser. ' + 'If you meant to render a React component, start its name with ' + 'an uppercase letter.', type);
          }
        }
      }

      return domElement;
    }

    function createTextNode$1(text, rootContainerElement) {
      return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
    }

    function setInitialProperties$1(domElement, tag, rawProps, rootContainerElement) {
      var isCustomComponentTag = isCustomComponent(tag, rawProps);
      {
        validatePropertiesInDevelopment(tag, rawProps);
        if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
          warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$2() || 'A component');
          didWarnShadyDOM = true;
        }
      }

      // TODO: Make sure that we check isMounted before firing any of these events.
      var props = void 0;
      switch (tag) {
        case 'iframe':
        case 'object':
          trapBubbledEvent(TOP_LOAD, domElement);
          props = rawProps;
          break;
        case 'video':
        case 'audio':
          // Create listener for each media event
          for (var i = 0; i < mediaEventTypes.length; i++) {
            trapBubbledEvent(mediaEventTypes[i], domElement);
          }
          props = rawProps;
          break;
        case 'source':
          trapBubbledEvent(TOP_ERROR, domElement);
          props = rawProps;
          break;
        case 'img':
        case 'image':
        case 'link':
          trapBubbledEvent(TOP_ERROR, domElement);
          trapBubbledEvent(TOP_LOAD, domElement);
          props = rawProps;
          break;
        case 'form':
          trapBubbledEvent(TOP_RESET, domElement);
          trapBubbledEvent(TOP_SUBMIT, domElement);
          props = rawProps;
          break;
        case 'details':
          trapBubbledEvent(TOP_TOGGLE, domElement);
          props = rawProps;
          break;
        case 'input':
          initWrapperState(domElement, rawProps);
          props = getHostProps(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'option':
          validateProps(domElement, rawProps);
          props = getHostProps$1(domElement, rawProps);
          break;
        case 'select':
          initWrapperState$1(domElement, rawProps);
          props = getHostProps$2(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'textarea':
          initWrapperState$2(domElement, rawProps);
          props = getHostProps$3(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        default:
          props = rawProps;
      }

      assertValidProps(tag, props, getStack);

      setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);

      switch (tag) {
        case 'input':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper(domElement, rawProps, false);
          break;
        case 'textarea':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper$3(domElement, rawProps);
          break;
        case 'option':
          postMountWrapper$1(domElement, rawProps);
          break;
        case 'select':
          postMountWrapper$2(domElement, rawProps);
          break;
        default:
          if (typeof props.onClick === 'function') {
            // TODO: This cast may not be sound for SVG, MathML or custom elements.
            trapClickOnNonInteractiveElement(domElement);
          }
          break;
      }
    }

    // Calculate the diff between the two objects.
    function diffProperties$1(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
      {
        validatePropertiesInDevelopment(tag, nextRawProps);
      }

      var updatePayload = null;

      var lastProps = void 0;
      var nextProps = void 0;
      switch (tag) {
        case 'input':
          lastProps = getHostProps(domElement, lastRawProps);
          nextProps = getHostProps(domElement, nextRawProps);
          updatePayload = [];
          break;
        case 'option':
          lastProps = getHostProps$1(domElement, lastRawProps);
          nextProps = getHostProps$1(domElement, nextRawProps);
          updatePayload = [];
          break;
        case 'select':
          lastProps = getHostProps$2(domElement, lastRawProps);
          nextProps = getHostProps$2(domElement, nextRawProps);
          updatePayload = [];
          break;
        case 'textarea':
          lastProps = getHostProps$3(domElement, lastRawProps);
          nextProps = getHostProps$3(domElement, nextRawProps);
          updatePayload = [];
          break;
        default:
          lastProps = lastRawProps;
          nextProps = nextRawProps;
          if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
            // TODO: This cast may not be sound for SVG, MathML or custom elements.
            trapClickOnNonInteractiveElement(domElement);
          }
          break;
      }

      assertValidProps(tag, nextProps, getStack);

      var propKey = void 0;
      var styleName = void 0;
      var styleUpdates = null;
      for (propKey in lastProps) {
        if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
          continue;
        }
        if (propKey === STYLE) {
          var lastStyle = lastProps[propKey];
          for (styleName in lastStyle) {
            if (lastStyle.hasOwnProperty(styleName)) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = '';
            }
          }
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
          // Noop. This is handled by the clear text mechanism.
        } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
          // Noop
        } else if (propKey === AUTOFOCUS) {
          // Noop. It doesn't work on updates anyway.
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          // This is a special case. If any listener updates we need to ensure
          // that the "current" fiber pointer gets updated so we need a commit
          // to update this element.
          if (!updatePayload) {
            updatePayload = [];
          }
        } else {
          // For all other deleted properties we add it to the queue. We use
          // the whitelist in the commit phase instead.
          (updatePayload = updatePayload || []).push(propKey, null);
        }
      }
      for (propKey in nextProps) {
        var nextProp = nextProps[propKey];
        var lastProp = lastProps != null ? lastProps[propKey] : undefined;
        if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
          continue;
        }
        if (propKey === STYLE) {
          {
            if (nextProp) {
              // Freeze the next style object so that we can assume it won't be
              // mutated. We have already warned for this in the past.
              Object.freeze(nextProp);
            }
          }
          if (lastProp) {
            // Unset styles on `lastProp` but not on `nextProp`.
            for (styleName in lastProp) {
              if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                if (!styleUpdates) {
                  styleUpdates = {};
                }
                styleUpdates[styleName] = '';
              }
            }
            // Update styles that changed since `lastProp`.
            for (styleName in nextProp) {
              if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                if (!styleUpdates) {
                  styleUpdates = {};
                }
                styleUpdates[styleName] = nextProp[styleName];
              }
            }
          } else {
            // Relies on `updateStylesByID` not mutating `styleUpdates`.
            if (!styleUpdates) {
              if (!updatePayload) {
                updatePayload = [];
              }
              updatePayload.push(propKey, styleUpdates);
            }
            styleUpdates = nextProp;
          }
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          var nextHtml = nextProp ? nextProp[HTML] : undefined;
          var lastHtml = lastProp ? lastProp[HTML] : undefined;
          if (nextHtml != null) {
            if (lastHtml !== nextHtml) {
              (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
            }
          } else {
            // TODO: It might be too late to clear this if we have children
            // inserted already.
          }
        } else if (propKey === CHILDREN) {
          if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
            (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
          }
        } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
          // Noop
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          if (nextProp != null) {
            // We eagerly listen to this even though we haven't committed yet.
            if (true && typeof nextProp !== 'function') {
              warnForInvalidEventListener(propKey, nextProp);
            }
            ensureListeningTo(rootContainerElement, propKey);
          }
          if (!updatePayload && lastProp !== nextProp) {
            // This is a special case. If any listener updates we need to ensure
            // that the "current" props pointer gets updated so we need a commit
            // to update this element.
            updatePayload = [];
          }
        } else {
          // For any other property we always add it to the queue and then we
          // filter it out using the whitelist during the commit.
          (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
      }
      if (styleUpdates) {
        (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
      }
      return updatePayload;
    }

    // Apply the diff.
    function updateProperties$1(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
      // Update checked *before* name.
      // In the middle of an update, it is possible to have multiple checked.
      // When a checked radio tries to change name, browser makes another radio's checked false.
      if (tag === 'input' && nextRawProps.type === 'radio' && nextRawProps.name != null) {
        updateChecked(domElement, nextRawProps);
      }

      var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
      var isCustomComponentTag = isCustomComponent(tag, nextRawProps);
      // Apply the diff.
      updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag);

      // TODO: Ensure that an update gets scheduled if any of the special props
      // changed.
      switch (tag) {
        case 'input':
          // Update the wrapper around inputs *after* updating props. This has to
          // happen after `updateDOMProperties`. Otherwise HTML5 input validations
          // raise warnings and prevent the new value from being assigned.
          updateWrapper(domElement, nextRawProps);
          break;
        case 'textarea':
          updateWrapper$1(domElement, nextRawProps);
          break;
        case 'select':
          // <select> value update needs to occur after <option> children
          // reconciliation
          postUpdateWrapper(domElement, nextRawProps);
          break;
      }
    }

    function getPossibleStandardName(propName) {
      {
        var lowerCasedName = propName.toLowerCase();
        if (!possibleStandardNames.hasOwnProperty(lowerCasedName)) {
          return null;
        }
        return possibleStandardNames[lowerCasedName] || null;
      }
      return null;
    }

    function diffHydratedProperties$1(domElement, tag, rawProps, parentNamespace, rootContainerElement) {
      var isCustomComponentTag = void 0;
      var extraAttributeNames = void 0;

      {
        suppressHydrationWarning = rawProps[SUPPRESS_HYDRATION_WARNING$1] === true;
        isCustomComponentTag = isCustomComponent(tag, rawProps);
        validatePropertiesInDevelopment(tag, rawProps);
        if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
          warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$2() || 'A component');
          didWarnShadyDOM = true;
        }
      }

      // TODO: Make sure that we check isMounted before firing any of these events.
      switch (tag) {
        case 'iframe':
        case 'object':
          trapBubbledEvent(TOP_LOAD, domElement);
          break;
        case 'video':
        case 'audio':
          // Create listener for each media event
          for (var i = 0; i < mediaEventTypes.length; i++) {
            trapBubbledEvent(mediaEventTypes[i], domElement);
          }
          break;
        case 'source':
          trapBubbledEvent(TOP_ERROR, domElement);
          break;
        case 'img':
        case 'image':
        case 'link':
          trapBubbledEvent(TOP_ERROR, domElement);
          trapBubbledEvent(TOP_LOAD, domElement);
          break;
        case 'form':
          trapBubbledEvent(TOP_RESET, domElement);
          trapBubbledEvent(TOP_SUBMIT, domElement);
          break;
        case 'details':
          trapBubbledEvent(TOP_TOGGLE, domElement);
          break;
        case 'input':
          initWrapperState(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'option':
          validateProps(domElement, rawProps);
          break;
        case 'select':
          initWrapperState$1(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'textarea':
          initWrapperState$2(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
      }

      assertValidProps(tag, rawProps, getStack);

      {
        extraAttributeNames = new Set();
        var attributes = domElement.attributes;
        for (var _i = 0; _i < attributes.length; _i++) {
          var name = attributes[_i].name.toLowerCase();
          switch (name) {
            // Built-in SSR attribute is whitelisted
            case 'data-reactroot':
              break;
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case 'value':
              break;
            case 'checked':
              break;
            case 'selected':
              break;
            default:
              // Intentionally use the original name.
              // See discussion in https://github.com/facebook/react/pull/10676.
              extraAttributeNames.add(attributes[_i].name);
          }
        }
      }

      var updatePayload = null;
      for (var propKey in rawProps) {
        if (!rawProps.hasOwnProperty(propKey)) {
          continue;
        }
        var nextProp = rawProps[propKey];
        if (propKey === CHILDREN) {
          // For text content children we compare against textContent. This
          // might match additional HTML that is hidden when we read it using
          // textContent. E.g. "foo" will match "f<span>oo</span>" but that still
          // satisfies our requirement. Our requirement is not to produce perfect
          // HTML and attributes. Ideally we should preserve structure but it's
          // ok not to if the visible content is still enough to indicate what
          // even listeners these nodes might be wired up to.
          // TODO: Warn if there is more than a single textNode as a child.
          // TODO: Should we use domElement.firstChild.nodeValue to compare?
          if (typeof nextProp === 'string') {
            if (domElement.textContent !== nextProp) {
              if (true && !suppressHydrationWarning) {
                warnForTextDifference(domElement.textContent, nextProp);
              }
              updatePayload = [CHILDREN, nextProp];
            }
          } else if (typeof nextProp === 'number') {
            if (domElement.textContent !== '' + nextProp) {
              if (true && !suppressHydrationWarning) {
                warnForTextDifference(domElement.textContent, nextProp);
              }
              updatePayload = [CHILDREN, '' + nextProp];
            }
          }
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          if (nextProp != null) {
            if (true && typeof nextProp !== 'function') {
              warnForInvalidEventListener(propKey, nextProp);
            }
            ensureListeningTo(rootContainerElement, propKey);
          }
        } else if (true &&
        // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof isCustomComponentTag === 'boolean') {
          // Validate that the properties correspond to their expected values.
          var serverValue = void 0;
          var propertyInfo = getPropertyInfo(propKey);
          if (suppressHydrationWarning) {
            // Don't bother comparing. We're ignoring all these warnings.
          } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1 ||
          // Controlled attributes are not validated
          // TODO: Only ignore them on controlled tags.
          propKey === 'value' || propKey === 'checked' || propKey === 'selected') {
            // Noop
          } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
            var rawHtml = nextProp ? nextProp[HTML] || '' : '';
            var serverHTML = domElement.innerHTML;
            var expectedHTML = normalizeHTML(domElement, rawHtml);
            if (expectedHTML !== serverHTML) {
              warnForPropDifference(propKey, serverHTML, expectedHTML);
            }
          } else if (propKey === STYLE) {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames.delete(propKey);
            var expectedStyle = createDangerousStringForStyles(nextProp);
            serverValue = domElement.getAttribute('style');
            if (expectedStyle !== serverValue) {
              warnForPropDifference(propKey, serverValue, expectedStyle);
            }
          } else if (isCustomComponentTag) {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames.delete(propKey.toLowerCase());
            serverValue = getValueForAttribute(domElement, propKey, nextProp);

            if (nextProp !== serverValue) {
              warnForPropDifference(propKey, serverValue, nextProp);
            }
          } else if (!shouldIgnoreAttribute(propKey, propertyInfo, isCustomComponentTag) && !shouldRemoveAttribute(propKey, nextProp, propertyInfo, isCustomComponentTag)) {
            var isMismatchDueToBadCasing = false;
            if (propertyInfo !== null) {
              // $FlowFixMe - Should be inferred as not undefined.
              extraAttributeNames.delete(propertyInfo.attributeName);
              serverValue = getValueForProperty(domElement, propKey, nextProp, propertyInfo);
            } else {
              var ownNamespace = parentNamespace;
              if (ownNamespace === HTML_NAMESPACE) {
                ownNamespace = getIntrinsicNamespace(tag);
              }
              if (ownNamespace === HTML_NAMESPACE) {
                // $FlowFixMe - Should be inferred as not undefined.
                extraAttributeNames.delete(propKey.toLowerCase());
              } else {
                var standardName = getPossibleStandardName(propKey);
                if (standardName !== null && standardName !== propKey) {
                  // If an SVG prop is supplied with bad casing, it will
                  // be successfully parsed from HTML, but will produce a mismatch
                  // (and would be incorrectly rendered on the client).
                  // However, we already warn about bad casing elsewhere.
                  // So we'll skip the misleading extra mismatch warning in this case.
                  isMismatchDueToBadCasing = true;
                  // $FlowFixMe - Should be inferred as not undefined.
                  extraAttributeNames.delete(standardName);
                }
                // $FlowFixMe - Should be inferred as not undefined.
                extraAttributeNames.delete(propKey);
              }
              serverValue = getValueForAttribute(domElement, propKey, nextProp);
            }

            if (nextProp !== serverValue && !isMismatchDueToBadCasing) {
              warnForPropDifference(propKey, serverValue, nextProp);
            }
          }
        }
      }

      {
        // $FlowFixMe - Should be inferred as not undefined.
        if (extraAttributeNames.size > 0 && !suppressHydrationWarning) {
          // $FlowFixMe - Should be inferred as not undefined.
          warnForExtraAttributes(extraAttributeNames);
        }
      }

      switch (tag) {
        case 'input':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper(domElement, rawProps, true);
          break;
        case 'textarea':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper$3(domElement, rawProps);
          break;
        case 'select':
        case 'option':
          // For input and textarea we current always set the value property at
          // post mount to force it to diverge from attributes. However, for
          // option and select we don't quite do the same thing and select
          // is not resilient to the DOM state changing so we don't do that here.
          // TODO: Consider not doing this for input and textarea.
          break;
        default:
          if (typeof rawProps.onClick === 'function') {
            // TODO: This cast may not be sound for SVG, MathML or custom elements.
            trapClickOnNonInteractiveElement(domElement);
          }
          break;
      }

      return updatePayload;
    }

    function diffHydratedText$1(textNode, text) {
      var isDifferent = textNode.nodeValue !== text;
      return isDifferent;
    }

    function warnForUnmatchedText$1(textNode, text) {
      {
        warnForTextDifference(textNode.nodeValue, text);
      }
    }

    function warnForDeletedHydratableElement$1(parentNode, child) {
      {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Did not expect server HTML to contain a <%s> in <%s>.', child.nodeName.toLowerCase(), parentNode.nodeName.toLowerCase());
      }
    }

    function warnForDeletedHydratableText$1(parentNode, child) {
      {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Did not expect server HTML to contain the text node "%s" in <%s>.', child.nodeValue, parentNode.nodeName.toLowerCase());
      }
    }

    function warnForInsertedHydratedElement$1(parentNode, tag, props) {
      {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Expected server HTML to contain a matching <%s> in <%s>.', tag, parentNode.nodeName.toLowerCase());
      }
    }

    function warnForInsertedHydratedText$1(parentNode, text) {
      {
        if (text === '') {
          // We expect to insert empty text nodes since they're not represented in
          // the HTML.
          // TODO: Remove this special case if we can just avoid inserting empty
          // text nodes.
          return;
        }
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Expected server HTML to contain a matching text node for "%s" in <%s>.', text, parentNode.nodeName.toLowerCase());
      }
    }

    function restoreControlledState$1(domElement, tag, props) {
      switch (tag) {
        case 'input':
          restoreControlledState(domElement, props);
          return;
        case 'textarea':
          restoreControlledState$3(domElement, props);
          return;
        case 'select':
          restoreControlledState$2(domElement, props);
          return;
      }
    }

    var ReactDOMFiberComponent = Object.freeze({
      createElement: createElement$1,
      createTextNode: createTextNode$1,
      setInitialProperties: setInitialProperties$1,
      diffProperties: diffProperties$1,
      updateProperties: updateProperties$1,
      diffHydratedProperties: diffHydratedProperties$1,
      diffHydratedText: diffHydratedText$1,
      warnForUnmatchedText: warnForUnmatchedText$1,
      warnForDeletedHydratableElement: warnForDeletedHydratableElement$1,
      warnForDeletedHydratableText: warnForDeletedHydratableText$1,
      warnForInsertedHydratedElement: warnForInsertedHydratedElement$1,
      warnForInsertedHydratedText: warnForInsertedHydratedText$1,
      restoreControlledState: restoreControlledState$1
    });

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberStackAddendum$5 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var validateDOMNesting = emptyFunction;

    {
      // This validation code was written based on the HTML5 parsing spec:
      // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
      //
      // Note: this does not catch all invalid nesting, nor does it try to (as it's
      // not clear what practical benefit doing so provides); instead, we warn only
      // for cases where the parser will give a parse tree differing from what React
      // intended. For example, <b><div></div></b> is invalid but we don't warn
      // because it still parses correctly; we do warn for other cases like nested
      // <p> tags where the beginning of the second element implicitly closes the
      // first, causing a confusing mess.

      // https://html.spec.whatwg.org/multipage/syntax.html#special
      var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];

      // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
      var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',

      // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
      // TODO: Distinguish by namespace here -- for <title>, including it here
      // errs on the side of fewer warnings
      'foreignObject', 'desc', 'title'];

      // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
      var buttonScopeTags = inScopeTags.concat(['button']);

      // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
      var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];

      var emptyAncestorInfo = {
        current: null,

        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,

        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };

      var updatedAncestorInfo$1 = function (oldInfo, tag, instance) {
        var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
        var info = { tag: tag, instance: instance };

        if (inScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.aTagInScope = null;
          ancestorInfo.buttonTagInScope = null;
          ancestorInfo.nobrTagInScope = null;
        }
        if (buttonScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.pTagInButtonScope = null;
        }

        // See rules for 'li', 'dd', 'dt' start tags in
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
        if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
          ancestorInfo.listItemTagAutoclosing = null;
          ancestorInfo.dlItemTagAutoclosing = null;
        }

        ancestorInfo.current = info;

        if (tag === 'form') {
          ancestorInfo.formTag = info;
        }
        if (tag === 'a') {
          ancestorInfo.aTagInScope = info;
        }
        if (tag === 'button') {
          ancestorInfo.buttonTagInScope = info;
        }
        if (tag === 'nobr') {
          ancestorInfo.nobrTagInScope = info;
        }
        if (tag === 'p') {
          ancestorInfo.pTagInButtonScope = info;
        }
        if (tag === 'li') {
          ancestorInfo.listItemTagAutoclosing = info;
        }
        if (tag === 'dd' || tag === 'dt') {
          ancestorInfo.dlItemTagAutoclosing = info;
        }

        return ancestorInfo;
      };

      /**
       * Returns whether
       */
      var isTagValidWithParent = function (tag, parentTag) {
        // First, let's check if we're in an unusual parsing mode...
        switch (parentTag) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case 'select':
            return tag === 'option' || tag === 'optgroup' || tag === '#text';
          case 'optgroup':
            return tag === 'option' || tag === '#text';
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case 'option':
            return tag === '#text';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.

          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case 'tr':
            return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case 'tbody':
          case 'thead':
          case 'tfoot':
            return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case 'colgroup':
            return tag === 'col' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case 'table':
            return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case 'head':
            return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
          case 'html':
            return tag === 'head' || tag === 'body';
          case '#document':
            return tag === 'html';
        }

        // Probably in the "in body" parsing mode, so we outlaw only tag combos
        // where the parsing rules cause implicit opens or closes to be added.
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
        switch (tag) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';

          case 'rp':
          case 'rt':
            return impliedEndTags.indexOf(parentTag) === -1;

          case 'body':
          case 'caption':
          case 'col':
          case 'colgroup':
          case 'frame':
          case 'head':
          case 'html':
          case 'tbody':
          case 'td':
          case 'tfoot':
          case 'th':
          case 'thead':
          case 'tr':
            // These tags are only valid with a few parents that have special child
            // parsing rules -- if we're down here, then none of those matched and
            // so we allow it only if we don't know what the parent is, as all other
            // cases are invalid.
            return parentTag == null;
        }

        return true;
      };

      /**
       * Returns whether
       */
      var findInvalidAncestorForTag = function (tag, ancestorInfo) {
        switch (tag) {
          case 'address':
          case 'article':
          case 'aside':
          case 'blockquote':
          case 'center':
          case 'details':
          case 'dialog':
          case 'dir':
          case 'div':
          case 'dl':
          case 'fieldset':
          case 'figcaption':
          case 'figure':
          case 'footer':
          case 'header':
          case 'hgroup':
          case 'main':
          case 'menu':
          case 'nav':
          case 'ol':
          case 'p':
          case 'section':
          case 'summary':
          case 'ul':
          case 'pre':
          case 'listing':
          case 'table':
          case 'hr':
          case 'xmp':
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return ancestorInfo.pTagInButtonScope;

          case 'form':
            return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

          case 'li':
            return ancestorInfo.listItemTagAutoclosing;

          case 'dd':
          case 'dt':
            return ancestorInfo.dlItemTagAutoclosing;

          case 'button':
            return ancestorInfo.buttonTagInScope;

          case 'a':
            // Spec says something about storing a list of markers, but it sounds
            // equivalent to this check.
            return ancestorInfo.aTagInScope;

          case 'nobr':
            return ancestorInfo.nobrTagInScope;
        }

        return null;
      };

      var didWarn = {};

      validateDOMNesting = function (childTag, childText, ancestorInfo) {
        ancestorInfo = ancestorInfo || emptyAncestorInfo;
        var parentInfo = ancestorInfo.current;
        var parentTag = parentInfo && parentInfo.tag;

        if (childText != null) {
          !(childTag == null) ? warning(false, 'validateDOMNesting: when childText is passed, childTag should be null') : void 0;
          childTag = '#text';
        }

        var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
        var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
        var invalidParentOrAncestor = invalidParent || invalidAncestor;
        if (!invalidParentOrAncestor) {
          return;
        }

        var ancestorTag = invalidParentOrAncestor.tag;
        var addendum = getCurrentFiberStackAddendum$5();

        var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + addendum;
        if (didWarn[warnKey]) {
          return;
        }
        didWarn[warnKey] = true;

        var tagDisplayName = childTag;
        var whitespaceInfo = '';
        if (childTag === '#text') {
          if (/\S/.test(childText)) {
            tagDisplayName = 'Text nodes';
          } else {
            tagDisplayName = 'Whitespace text nodes';
            whitespaceInfo = " Make sure you don't have any extra whitespace between tags on " + 'each line of your source code.';
          }
        } else {
          tagDisplayName = '<' + childTag + '>';
        }

        if (invalidParent) {
          var info = '';
          if (ancestorTag === 'table' && childTag === 'tr') {
            info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
          }
          warning(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s', tagDisplayName, ancestorTag, whitespaceInfo, info, addendum);
        } else {
          warning(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>.%s', tagDisplayName, ancestorTag, addendum);
        }
      };

      // TODO: turn this into a named export
      validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo$1;
    }

    var validateDOMNesting$1 = validateDOMNesting;

    // Renderers that don't support persistence
    // can re-export everything from this module.

    function shim() {
      invariant(false, 'The current renderer does not support persistence. This error is likely caused by a bug in React. Please file an issue.');
    }

    // Persistence (when unsupported)
    var supportsPersistence = false;
    var cloneInstance = shim;
    var createContainerChildSet = shim;
    var appendChildToContainerChildSet = shim;
    var finalizeContainerChildren = shim;
    var replaceContainerChildren = shim;

    // Unused

    var createElement = createElement$1;
    var createTextNode = createTextNode$1;
    var setInitialProperties = setInitialProperties$1;
    var diffProperties = diffProperties$1;
    var updateProperties = updateProperties$1;
    var diffHydratedProperties = diffHydratedProperties$1;
    var diffHydratedText = diffHydratedText$1;
    var warnForUnmatchedText = warnForUnmatchedText$1;
    var warnForDeletedHydratableElement = warnForDeletedHydratableElement$1;
    var warnForDeletedHydratableText = warnForDeletedHydratableText$1;
    var warnForInsertedHydratedElement = warnForInsertedHydratedElement$1;
    var warnForInsertedHydratedText = warnForInsertedHydratedText$1;
    var updatedAncestorInfo = validateDOMNesting$1.updatedAncestorInfo;
    var precacheFiberNode$1 = precacheFiberNode;
    var updateFiberProps$1 = updateFiberProps;

    var SUPPRESS_HYDRATION_WARNING = void 0;
    {
      SUPPRESS_HYDRATION_WARNING = 'suppressHydrationWarning';
    }

    var eventsEnabled = null;
    var selectionInformation = null;

    function shouldAutoFocusHostComponent(type, props) {
      switch (type) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          return !!props.autoFocus;
      }
      return false;
    }

    function getRootHostContext(rootContainerInstance) {
      var type = void 0;
      var namespace = void 0;
      var nodeType = rootContainerInstance.nodeType;
      switch (nodeType) {
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          {
            type = nodeType === DOCUMENT_NODE ? '#document' : '#fragment';
            var root = rootContainerInstance.documentElement;
            namespace = root ? root.namespaceURI : getChildNamespace(null, '');
            break;
          }
        default:
          {
            var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance;
            var ownNamespace = container.namespaceURI || null;
            type = container.tagName;
            namespace = getChildNamespace(ownNamespace, type);
            break;
          }
      }
      {
        var validatedTag = type.toLowerCase();
        var _ancestorInfo = updatedAncestorInfo(null, validatedTag, null);
        return { namespace: namespace, ancestorInfo: _ancestorInfo };
      }
      return namespace;
    }

    function getChildHostContext(parentHostContext, type, rootContainerInstance) {
      {
        var parentHostContextDev = parentHostContext;
        var _namespace = getChildNamespace(parentHostContextDev.namespace, type);
        var _ancestorInfo2 = updatedAncestorInfo(parentHostContextDev.ancestorInfo, type, null);
        return { namespace: _namespace, ancestorInfo: _ancestorInfo2 };
      }
      var parentNamespace = parentHostContext;
      return getChildNamespace(parentNamespace, type);
    }

    function getPublicInstance(instance) {
      return instance;
    }

    function prepareForCommit(containerInfo) {
      eventsEnabled = isEnabled();
      selectionInformation = getSelectionInformation();
      setEnabled(false);
    }

    function resetAfterCommit(containerInfo) {
      restoreSelection(selectionInformation);
      selectionInformation = null;
      setEnabled(eventsEnabled);
      eventsEnabled = null;
    }

    function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
      var parentNamespace = void 0;
      {
        // TODO: take namespace into account when validating.
        var hostContextDev = hostContext;
        validateDOMNesting$1(type, null, hostContextDev.ancestorInfo);
        if (typeof props.children === 'string' || typeof props.children === 'number') {
          var string = '' + props.children;
          var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
          validateDOMNesting$1(null, string, ownAncestorInfo);
        }
        parentNamespace = hostContextDev.namespace;
      }
      var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
      precacheFiberNode$1(internalInstanceHandle, domElement);
      updateFiberProps$1(domElement, props);
      return domElement;
    }

    function appendInitialChild(parentInstance, child) {
      parentInstance.appendChild(child);
    }

    function finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
      setInitialProperties(domElement, type, props, rootContainerInstance);
      return shouldAutoFocusHostComponent(type, props);
    }

    function prepareUpdate(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
      {
        var hostContextDev = hostContext;
        if (typeof newProps.children !== typeof oldProps.children && (typeof newProps.children === 'string' || typeof newProps.children === 'number')) {
          var string = '' + newProps.children;
          var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
          validateDOMNesting$1(null, string, ownAncestorInfo);
        }
      }
      return diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
    }

    function shouldSetTextContent(type, props) {
      return type === 'textarea' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && typeof props.dangerouslySetInnerHTML.__html === 'string';
    }

    function shouldDeprioritizeSubtree(type, props) {
      return !!props.hidden;
    }

    function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
      {
        var hostContextDev = hostContext;
        validateDOMNesting$1(null, text, hostContextDev.ancestorInfo);
      }
      var textNode = createTextNode(text, rootContainerInstance);
      precacheFiberNode$1(internalInstanceHandle, textNode);
      return textNode;
    }

    var now = now$1;
    var isPrimaryRenderer = true;
    var scheduleDeferredCallback = scheduleWork;
    var cancelDeferredCallback = cancelScheduledWork;

    // -------------------
    //     Mutation
    // -------------------

    var supportsMutation = true;

    function commitMount(domElement, type, newProps, internalInstanceHandle) {
      // Despite the naming that might imply otherwise, this method only
      // fires if there is an `Update` effect scheduled during mounting.
      // This happens if `finalizeInitialChildren` returns `true` (which it
      // does to implement the `autoFocus` attribute on the client). But
      // there are also other cases when this might happen (such as patching
      // up text content during hydration mismatch). So we'll check this again.
      if (shouldAutoFocusHostComponent(type, newProps)) {
        domElement.focus();
      }
    }

    function commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
      // Update the props handle so that we know which props are the ones with
      // with current event handlers.
      updateFiberProps$1(domElement, newProps);
      // Apply the diff to the DOM node.
      updateProperties(domElement, updatePayload, type, oldProps, newProps);
    }

    function resetTextContent(domElement) {
      setTextContent(domElement, '');
    }

    function commitTextUpdate(textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    }

    function appendChild(parentInstance, child) {
      parentInstance.appendChild(child);
    }

    function appendChildToContainer(container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, container);
      } else {
        container.appendChild(child);
      }
    }

    function insertBefore(parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    }

    function insertInContainerBefore(container, child, beforeChild) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, beforeChild);
      } else {
        container.insertBefore(child, beforeChild);
      }
    }

    function removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    }

    function removeChildFromContainer(container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.removeChild(child);
      } else {
        container.removeChild(child);
      }
    }

    // -------------------
    //     Hydration
    // -------------------

    var supportsHydration = true;

    function canHydrateInstance(instance, type, props) {
      if (instance.nodeType !== ELEMENT_NODE || type.toLowerCase() !== instance.nodeName.toLowerCase()) {
        return null;
      }
      // This has now been refined to an element node.
      return instance;
    }

    function canHydrateTextInstance(instance, text) {
      if (text === '' || instance.nodeType !== TEXT_NODE) {
        // Empty strings are not parsed by HTML so there won't be a correct match here.
        return null;
      }
      // This has now been refined to a text node.
      return instance;
    }

    function getNextHydratableSibling(instance) {
      var node = instance.nextSibling;
      // Skip non-hydratable nodes.
      while (node && node.nodeType !== ELEMENT_NODE && node.nodeType !== TEXT_NODE) {
        node = node.nextSibling;
      }
      return node;
    }

    function getFirstHydratableChild(parentInstance) {
      var next = parentInstance.firstChild;
      // Skip non-hydratable nodes.
      while (next && next.nodeType !== ELEMENT_NODE && next.nodeType !== TEXT_NODE) {
        next = next.nextSibling;
      }
      return next;
    }

    function hydrateInstance(instance, type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
      precacheFiberNode$1(internalInstanceHandle, instance);
      // TODO: Possibly defer this until the commit phase where all the events
      // get attached.
      updateFiberProps$1(instance, props);
      var parentNamespace = void 0;
      {
        var hostContextDev = hostContext;
        parentNamespace = hostContextDev.namespace;
      }
      return diffHydratedProperties(instance, type, props, parentNamespace, rootContainerInstance);
    }

    function hydrateTextInstance(textInstance, text, internalInstanceHandle) {
      precacheFiberNode$1(internalInstanceHandle, textInstance);
      return diffHydratedText(textInstance, text);
    }

    function didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, text) {
      {
        warnForUnmatchedText(textInstance, text);
      }
    }

    function didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForUnmatchedText(textInstance, text);
      }
    }

    function didNotHydrateContainerInstance(parentContainer, instance) {
      {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentContainer, instance);
        } else {
          warnForDeletedHydratableText(parentContainer, instance);
        }
      }
    }

    function didNotHydrateInstance(parentType, parentProps, parentInstance, instance) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentInstance, instance);
        } else {
          warnForDeletedHydratableText(parentInstance, instance);
        }
      }
    }

    function didNotFindHydratableContainerInstance(parentContainer, type, props) {
      {
        warnForInsertedHydratedElement(parentContainer, type, props);
      }
    }

    function didNotFindHydratableContainerTextInstance(parentContainer, text) {
      {
        warnForInsertedHydratedText(parentContainer, text);
      }
    }

    function didNotFindHydratableInstance(parentType, parentProps, parentInstance, type, props) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedElement(parentInstance, type, props);
      }
    }

    function didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedText(parentInstance, text);
      }
    }

    // Exports ReactDOM.createRoot
    var enableUserTimingAPI = true;

    // Experimental error-boundary API that can recover from errors within a single
    // render phase
    var enableGetDerivedStateFromCatch = false;
    // Suspense
    var enableSuspense = false;
    // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
    var debugRenderPhaseSideEffects = false;

    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:
    var debugRenderPhaseSideEffectsForStrictMode = true;

    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.
    var replayFailedUnitOfWorkWithInvokeGuardedCallback = true;

    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
    var warnAboutDeprecatedLifecycles = false;

    // Warn about legacy context API
    var warnAboutLegacyContextAPI = false;

    // Gather advanced timing metrics for Profiler subtrees.
    var enableProfilerTimer = true;

    // Only used in www builds.

    // Prefix measurements so that it's possible to filter them.
    // Longer prefixes are hard to read in DevTools.
    var reactEmoji = '\u269B';
    var warningEmoji = '\u26D4';
    var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

    // Keep track of current fiber so that we know the path to unwind on pause.
    // TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
    var currentFiber = null;
    // If we're in the middle of user code, which fiber and method is it?
    // Reusing `currentFiber` would be confusing for this because user code fiber
    // can change during commit phase too, but we don't need to unwind it (since
    // lifecycles in the commit phase don't resemble a tree).
    var currentPhase = null;
    var currentPhaseFiber = null;
    // Did lifecycle hook schedule an update? This is often a performance problem,
    // so we will keep track of it, and include it in the report.
    // Track commits caused by cascading updates.
    var isCommitting = false;
    var hasScheduledUpdateInCurrentCommit = false;
    var hasScheduledUpdateInCurrentPhase = false;
    var commitCountInCurrentWorkLoop = 0;
    var effectCountInCurrentCommit = 0;
    var isWaitingForCallback = false;
    // During commits, we only show a measurement once per method name
    // to avoid stretch the commit phase with measurement overhead.
    var labelsInCurrentCommit = new Set();

    var formatMarkName = function (markName) {
      return reactEmoji + ' ' + markName;
    };

    var formatLabel = function (label, warning$$1) {
      var prefix = warning$$1 ? warningEmoji + ' ' : reactEmoji + ' ';
      var suffix = warning$$1 ? ' Warning: ' + warning$$1 : '';
      return '' + prefix + label + suffix;
    };

    var beginMark = function (markName) {
      performance.mark(formatMarkName(markName));
    };

    var clearMark = function (markName) {
      performance.clearMarks(formatMarkName(markName));
    };

    var endMark = function (label, markName, warning$$1) {
      var formattedMarkName = formatMarkName(markName);
      var formattedLabel = formatLabel(label, warning$$1);
      try {
        performance.measure(formattedLabel, formattedMarkName);
      } catch (err) {}
      // If previous mark was missing for some reason, this will throw.
      // This could only happen if React crashed in an unexpected place earlier.
      // Don't pile on with more errors.

      // Clear marks immediately to avoid growing buffer.
      performance.clearMarks(formattedMarkName);
      performance.clearMeasures(formattedLabel);
    };

    var getFiberMarkName = function (label, debugID) {
      return label + ' (#' + debugID + ')';
    };

    var getFiberLabel = function (componentName, isMounted, phase) {
      if (phase === null) {
        // These are composite component total time measurements.
        return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
      } else {
        // Composite component methods.
        return componentName + '.' + phase;
      }
    };

    var beginFiberMark = function (fiber, phase) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);

      if (isCommitting && labelsInCurrentCommit.has(label)) {
        // During the commit phase, we don't show duplicate labels because
        // there is a fixed overhead for every measurement, and we don't
        // want to stretch the commit phase beyond necessary.
        return false;
      }
      labelsInCurrentCommit.add(label);

      var markName = getFiberMarkName(label, debugID);
      beginMark(markName);
      return true;
    };

    var clearFiberMark = function (fiber, phase) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);
      var markName = getFiberMarkName(label, debugID);
      clearMark(markName);
    };

    var endFiberMark = function (fiber, phase, warning$$1) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);
      var markName = getFiberMarkName(label, debugID);
      endMark(label, markName, warning$$1);
    };

    var shouldIgnoreFiber = function (fiber) {
      // Host components should be skipped in the timeline.
      // We could check typeof fiber.type, but does this work with RN?
      switch (fiber.tag) {
        case HostRoot:
        case HostComponent:
        case HostText:
        case HostPortal:
        case Fragment:
        case ContextProvider:
        case ContextConsumer:
        case Mode:
          return true;
        default:
          return false;
      }
    };

    var clearPendingPhaseMeasurement = function () {
      if (currentPhase !== null && currentPhaseFiber !== null) {
        clearFiberMark(currentPhaseFiber, currentPhase);
      }
      currentPhaseFiber = null;
      currentPhase = null;
      hasScheduledUpdateInCurrentPhase = false;
    };

    var pauseTimers = function () {
      // Stops all currently active measurements so that they can be resumed
      // if we continue in a later deferred loop from the same unit of work.
      var fiber = currentFiber;
      while (fiber) {
        if (fiber._debugIsCurrentlyTiming) {
          endFiberMark(fiber, null, null);
        }
        fiber = fiber.return;
      }
    };

    var resumeTimersRecursively = function (fiber) {
      if (fiber.return !== null) {
        resumeTimersRecursively(fiber.return);
      }
      if (fiber._debugIsCurrentlyTiming) {
        beginFiberMark(fiber, null);
      }
    };

    var resumeTimers = function () {
      // Resumes all measurements that were active during the last deferred loop.
      if (currentFiber !== null) {
        resumeTimersRecursively(currentFiber);
      }
    };

    function recordEffect() {
      if (enableUserTimingAPI) {
        effectCountInCurrentCommit++;
      }
    }

    function recordScheduleUpdate() {
      if (enableUserTimingAPI) {
        if (isCommitting) {
          hasScheduledUpdateInCurrentCommit = true;
        }
        if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
          hasScheduledUpdateInCurrentPhase = true;
        }
      }
    }

    function startRequestCallbackTimer() {
      if (enableUserTimingAPI) {
        if (supportsUserTiming && !isWaitingForCallback) {
          isWaitingForCallback = true;
          beginMark('(Waiting for async callback...)');
        }
      }
    }

    function stopRequestCallbackTimer(didExpire, expirationTime) {
      if (enableUserTimingAPI) {
        if (supportsUserTiming) {
          isWaitingForCallback = false;
          var warning$$1 = didExpire ? 'React was blocked by main thread' : null;
          endMark('(Waiting for async callback... will force flush in ' + expirationTime + ' ms)', '(Waiting for async callback...)', warning$$1);
        }
      }
    }

    function startWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, this is the fiber to unwind from.
        currentFiber = fiber;
        if (!beginFiberMark(fiber, null)) {
          return;
        }
        fiber._debugIsCurrentlyTiming = true;
      }
    }

    function cancelWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // Remember we shouldn't complete measurement for this fiber.
        // Otherwise flamechart will be deep even for small updates.
        fiber._debugIsCurrentlyTiming = false;
        clearFiberMark(fiber, null);
      }
    }

    function stopWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, its parent is the fiber to unwind from.
        currentFiber = fiber.return;
        if (!fiber._debugIsCurrentlyTiming) {
          return;
        }
        fiber._debugIsCurrentlyTiming = false;
        endFiberMark(fiber, null, null);
      }
    }

    function stopFailedWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, its parent is the fiber to unwind from.
        currentFiber = fiber.return;
        if (!fiber._debugIsCurrentlyTiming) {
          return;
        }
        fiber._debugIsCurrentlyTiming = false;
        var warning$$1 = 'An error was thrown inside this error boundary';
        endFiberMark(fiber, null, warning$$1);
      }
    }

    function startPhaseTimer(fiber, phase) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        clearPendingPhaseMeasurement();
        if (!beginFiberMark(fiber, phase)) {
          return;
        }
        currentPhaseFiber = fiber;
        currentPhase = phase;
      }
    }

    function stopPhaseTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        if (currentPhase !== null && currentPhaseFiber !== null) {
          var warning$$1 = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
          endFiberMark(currentPhaseFiber, currentPhase, warning$$1);
        }
        currentPhase = null;
        currentPhaseFiber = null;
      }
    }

    function startWorkLoopTimer(nextUnitOfWork) {
      if (enableUserTimingAPI) {
        currentFiber = nextUnitOfWork;
        if (!supportsUserTiming) {
          return;
        }
        commitCountInCurrentWorkLoop = 0;
        // This is top level call.
        // Any other measurements are performed within.
        beginMark('(React Tree Reconciliation)');
        // Resume any measurements that were in progress during the last loop.
        resumeTimers();
      }
    }

    function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var warning$$1 = null;
        if (interruptedBy !== null) {
          if (interruptedBy.tag === HostRoot) {
            warning$$1 = 'A top-level update interrupted the previous render';
          } else {
            var componentName = getComponentName(interruptedBy) || 'Unknown';
            warning$$1 = 'An update to ' + componentName + ' interrupted the previous render';
          }
        } else if (commitCountInCurrentWorkLoop > 1) {
          warning$$1 = 'There were cascading updates';
        }
        commitCountInCurrentWorkLoop = 0;
        var label = didCompleteRoot ? '(React Tree Reconciliation: Completed Root)' : '(React Tree Reconciliation: Yielded)';
        // Pause any measurements until the next loop.
        pauseTimers();
        endMark(label, '(React Tree Reconciliation)', warning$$1);
      }
    }

    function startCommitTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        isCommitting = true;
        hasScheduledUpdateInCurrentCommit = false;
        labelsInCurrentCommit.clear();
        beginMark('(Committing Changes)');
      }
    }

    function stopCommitTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }

        var warning$$1 = null;
        if (hasScheduledUpdateInCurrentCommit) {
          warning$$1 = 'Lifecycle hook scheduled a cascading update';
        } else if (commitCountInCurrentWorkLoop > 0) {
          warning$$1 = 'Caused by a cascading update in earlier commit';
        }
        hasScheduledUpdateInCurrentCommit = false;
        commitCountInCurrentWorkLoop++;
        isCommitting = false;
        labelsInCurrentCommit.clear();

        endMark('(Committing Changes)', '(Committing Changes)', warning$$1);
      }
    }

    function startCommitSnapshotEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Committing Snapshot Effects)');
      }
    }

    function stopCommitSnapshotEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Committing Snapshot Effects: ' + count + ' Total)', '(Committing Snapshot Effects)', null);
      }
    }

    function startCommitHostEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Committing Host Effects)');
      }
    }

    function stopCommitHostEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
      }
    }

    function startCommitLifeCyclesTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Calling Lifecycle Methods)');
      }
    }

    function stopCommitLifeCyclesTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
      }
    }

    var valueStack = [];

    var fiberStack = void 0;

    {
      fiberStack = [];
    }

    var index = -1;

    function createCursor(defaultValue) {
      return {
        current: defaultValue
      };
    }

    function pop(cursor, fiber) {
      if (index < 0) {
        {
          warning(false, 'Unexpected pop.');
        }
        return;
      }

      {
        if (fiber !== fiberStack[index]) {
          warning(false, 'Unexpected Fiber popped.');
        }
      }

      cursor.current = valueStack[index];

      valueStack[index] = null;

      {
        fiberStack[index] = null;
      }

      index--;
    }

    function push(cursor, value, fiber) {
      index++;

      valueStack[index] = cursor.current;

      {
        fiberStack[index] = fiber;
      }

      cursor.current = value;
    }

    function checkThatStackIsEmpty() {
      {
        if (index !== -1) {
          warning(false, 'Expected an empty stack. Something was not reset properly.');
        }
      }
    }

    function resetStackAfterFatalErrorInDev() {
      {
        index = -1;
        valueStack.length = 0;
        fiberStack.length = 0;
      }
    }

    var warnedAboutMissingGetChildContext = void 0;

    {
      warnedAboutMissingGetChildContext = {};
    }

    // A cursor to the current merged context object on the stack.
    var contextStackCursor = createCursor(emptyObject);
    // A cursor to a boolean indicating whether the context has changed.
    var didPerformWorkStackCursor = createCursor(false);
    // Keep track of the previous context object that was on the stack.
    // We use this to get access to the parent context after we have already
    // pushed the next context provider, and now need to merge their contexts.
    var previousContext = emptyObject;

    function getUnmaskedContext(workInProgress) {
      var hasOwnContext = isContextProvider(workInProgress);
      if (hasOwnContext) {
        // If the fiber is a context provider itself, when we read its context
        // we have already pushed its own child context on the stack. A context
        // provider should not "see" its own child context. Therefore we read the
        // previous (parent) context instead for a context provider.
        return previousContext;
      }
      return contextStackCursor.current;
    }

    function cacheContext(workInProgress, unmaskedContext, maskedContext) {
      var instance = workInProgress.stateNode;
      instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
      instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
    }

    function getMaskedContext(workInProgress, unmaskedContext) {
      var type = workInProgress.type;
      var contextTypes = type.contextTypes;
      if (!contextTypes) {
        return emptyObject;
      }

      // Avoid recreating masked context unless unmasked context has changed.
      // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
      // This may trigger infinite loops if componentWillReceiveProps calls setState.
      var instance = workInProgress.stateNode;
      if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
        return instance.__reactInternalMemoizedMaskedChildContext;
      }

      var context = {};
      for (var key in contextTypes) {
        context[key] = unmaskedContext[key];
      }

      {
        var name = getComponentName(workInProgress) || 'Unknown';
        checkPropTypes(contextTypes, context, 'context', name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
      }

      // Cache unmasked context so we can avoid recreating masked context unless necessary.
      // Context is created before the class component is instantiated so check for instance.
      if (instance) {
        cacheContext(workInProgress, unmaskedContext, context);
      }

      return context;
    }

    function hasContextChanged() {
      return didPerformWorkStackCursor.current;
    }

    function isContextConsumer(fiber) {
      return fiber.tag === ClassComponent && fiber.type.contextTypes != null;
    }

    function isContextProvider(fiber) {
      return fiber.tag === ClassComponent && fiber.type.childContextTypes != null;
    }

    function popContextProvider(fiber) {
      if (!isContextProvider(fiber)) {
        return;
      }

      pop(didPerformWorkStackCursor, fiber);
      pop(contextStackCursor, fiber);
    }

    function popTopLevelContextObject(fiber) {
      pop(didPerformWorkStackCursor, fiber);
      pop(contextStackCursor, fiber);
    }

    function pushTopLevelContextObject(fiber, context, didChange) {
      !(contextStackCursor.current === emptyObject) ? invariant(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      push(contextStackCursor, context, fiber);
      push(didPerformWorkStackCursor, didChange, fiber);
    }

    function processChildContext(fiber, parentContext) {
      var instance = fiber.stateNode;
      var childContextTypes = fiber.type.childContextTypes;

      // TODO (bvaughn) Replace this behavior with an invariant() in the future.
      // It has only been added in Fiber to match the (unintentional) behavior in Stack.
      if (typeof instance.getChildContext !== 'function') {
        {
          var componentName = getComponentName(fiber) || 'Unknown';

          if (!warnedAboutMissingGetChildContext[componentName]) {
            warnedAboutMissingGetChildContext[componentName] = true;
            warning(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
          }
        }
        return parentContext;
      }

      var childContext = void 0;
      {
        ReactDebugCurrentFiber.setCurrentPhase('getChildContext');
      }
      startPhaseTimer(fiber, 'getChildContext');
      childContext = instance.getChildContext();
      stopPhaseTimer();
      {
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }
      for (var contextKey in childContext) {
        !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(fiber) || 'Unknown', contextKey) : void 0;
      }
      {
        var name = getComponentName(fiber) || 'Unknown';
        checkPropTypes(childContextTypes, childContext, 'child context', name,
        // In practice, there is one case in which we won't get a stack. It's when
        // somebody calls unstable_renderSubtreeIntoContainer() and we process
        // context from the parent component instance. The stack will be missing
        // because it's outside of the reconciliation, and so the pointer has not
        // been set. This is rare and doesn't matter. We'll also remove that API.
        ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
      }

      return _assign({}, parentContext, childContext);
    }

    function pushContextProvider(workInProgress) {
      if (!isContextProvider(workInProgress)) {
        return false;
      }

      var instance = workInProgress.stateNode;
      // We push the context as early as possible to ensure stack integrity.
      // If the instance does not exist yet, we will push null at first,
      // and replace it on the stack later when invalidating the context.
      var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject;

      // Remember the parent context so we can merge with it later.
      // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
      previousContext = contextStackCursor.current;
      push(contextStackCursor, memoizedMergedChildContext, workInProgress);
      push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

      return true;
    }

    function invalidateContextProvider(workInProgress, didChange) {
      var instance = workInProgress.stateNode;
      !instance ? invariant(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      if (didChange) {
        // Merge parent and own context.
        // Skip this if we're not updating due to sCU.
        // This avoids unnecessarily recomputing memoized values.
        var mergedContext = processChildContext(workInProgress, previousContext);
        instance.__reactInternalMemoizedMergedChildContext = mergedContext;

        // Replace the old (or empty) context with the new one.
        // It is important to unwind the context in the reverse order.
        pop(didPerformWorkStackCursor, workInProgress);
        pop(contextStackCursor, workInProgress);
        // Now push the new context and mark that it has changed.
        push(contextStackCursor, mergedContext, workInProgress);
        push(didPerformWorkStackCursor, didChange, workInProgress);
      } else {
        pop(didPerformWorkStackCursor, workInProgress);
        push(didPerformWorkStackCursor, didChange, workInProgress);
      }
    }

    function findCurrentUnmaskedContext(fiber) {
      // Currently this is only used with renderSubtreeIntoContainer; not sure if it
      // makes sense elsewhere
      !(isFiberMounted(fiber) && fiber.tag === ClassComponent) ? invariant(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      var node = fiber;
      while (node.tag !== HostRoot) {
        if (isContextProvider(node)) {
          return node.stateNode.__reactInternalMemoizedMergedChildContext;
        }
        var parent = node.return;
        !parent ? invariant(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        node = parent;
      }
      return node.stateNode.context;
    }

    // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
    // Math.pow(2, 30) - 1
    // 0b111111111111111111111111111111
    var MAX_SIGNED_31_BIT_INT = 1073741823;

    // TODO: Use an opaque type once ESLint et al support the syntax


    var NoWork = 0;
    var Sync = 1;
    var Never = MAX_SIGNED_31_BIT_INT;

    var UNIT_SIZE = 10;
    var MAGIC_NUMBER_OFFSET = 2;

    // 1 unit of expiration time represents 10ms.
    function msToExpirationTime(ms) {
      // Always add an offset so that we don't clash with the magic number for NoWork.
      return (ms / UNIT_SIZE | 0) + MAGIC_NUMBER_OFFSET;
    }

    function expirationTimeToMs(expirationTime) {
      return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
    }

    function ceiling(num, precision) {
      return ((num / precision | 0) + 1) * precision;
    }

    function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
      return MAGIC_NUMBER_OFFSET + ceiling(currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
    }

    var NoContext = 0;
    var AsyncMode = 1;
    var StrictMode = 2;
    var ProfileMode = 4;

    var hasBadMapPolyfill = void 0;

    {
      hasBadMapPolyfill = false;
      try {
        var nonExtensibleObject = Object.preventExtensions({});
        var testMap = new Map([[nonExtensibleObject, null]]);
        var testSet = new Set([nonExtensibleObject]);
        // This is necessary for Rollup to not consider these unused.
        // https://github.com/rollup/rollup/issues/1771
        // TODO: we can remove these if Rollup fixes the bug.
        testMap.set(0, 0);
        testSet.add(0);
      } catch (e) {
        // TODO: Consider warning about bad polyfills
        hasBadMapPolyfill = true;
      }
    }

    // A Fiber is work on a Component that needs to be done or was done. There can
    // be more than one per component.


    var debugCounter = void 0;

    {
      debugCounter = 1;
    }

    function FiberNode(tag, pendingProps, key, mode) {
      // Instance
      this.tag = tag;
      this.key = key;
      this.type = null;
      this.stateNode = null;

      // Fiber
      this.return = null;
      this.child = null;
      this.sibling = null;
      this.index = 0;

      this.ref = null;

      this.pendingProps = pendingProps;
      this.memoizedProps = null;
      this.updateQueue = null;
      this.memoizedState = null;

      this.mode = mode;

      // Effects
      this.effectTag = NoEffect;
      this.nextEffect = null;

      this.firstEffect = null;
      this.lastEffect = null;

      this.expirationTime = NoWork;

      this.alternate = null;

      if (enableProfilerTimer) {
        this.actualDuration = 0;
        this.actualStartTime = 0;
        this.selfBaseTime = 0;
        this.treeBaseTime = 0;
      }

      {
        this._debugID = debugCounter++;
        this._debugSource = null;
        this._debugOwner = null;
        this._debugIsCurrentlyTiming = false;
        if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
          Object.preventExtensions(this);
        }
      }
    }

    // This is a constructor function, rather than a POJO constructor, still
    // please ensure we do the following:
    // 1) Nobody should add any instance methods on this. Instance methods can be
    //    more difficult to predict when they get optimized and they are almost
    //    never inlined properly in static compilers.
    // 2) Nobody should rely on `instanceof Fiber` for type testing. We should
    //    always know when it is a fiber.
    // 3) We might want to experiment with using numeric keys since they are easier
    //    to optimize in a non-JIT environment.
    // 4) We can easily go from a constructor to a createFiber object literal if that
    //    is faster.
    // 5) It should be easy to port this to a C struct and keep a C implementation
    //    compatible.
    var createFiber = function (tag, pendingProps, key, mode) {
      // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
      return new FiberNode(tag, pendingProps, key, mode);
    };

    function shouldConstruct(Component) {
      return !!(Component.prototype && Component.prototype.isReactComponent);
    }

    // This is used to create an alternate fiber to do work on.
    function createWorkInProgress(current, pendingProps, expirationTime) {
      var workInProgress = current.alternate;
      if (workInProgress === null) {
        // We use a double buffering pooling technique because we know that we'll
        // only ever need at most two versions of a tree. We pool the "other" unused
        // node that we're free to reuse. This is lazily created to avoid allocating
        // extra objects for things that are never updated. It also allow us to
        // reclaim the extra memory if needed.
        workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;

        {
          // DEV-only fields
          workInProgress._debugID = current._debugID;
          workInProgress._debugSource = current._debugSource;
          workInProgress._debugOwner = current._debugOwner;
        }

        workInProgress.alternate = current;
        current.alternate = workInProgress;
      } else {
        workInProgress.pendingProps = pendingProps;

        // We already have an alternate.
        // Reset the effect tag.
        workInProgress.effectTag = NoEffect;

        // The effect list is no longer valid.
        workInProgress.nextEffect = null;
        workInProgress.firstEffect = null;
        workInProgress.lastEffect = null;

        if (enableProfilerTimer) {
          // We intentionally reset, rather than copy, actualDuration & actualStartTime.
          // This prevents time from endlessly accumulating in new commits.
          // This has the downside of resetting values for different priority renders,
          // But works for yielding (the common case) and should support resuming.
          workInProgress.actualDuration = 0;
          workInProgress.actualStartTime = 0;
        }
      }

      workInProgress.expirationTime = expirationTime;

      workInProgress.child = current.child;
      workInProgress.memoizedProps = current.memoizedProps;
      workInProgress.memoizedState = current.memoizedState;
      workInProgress.updateQueue = current.updateQueue;

      // These will be overridden during the parent's reconciliation
      workInProgress.sibling = current.sibling;
      workInProgress.index = current.index;
      workInProgress.ref = current.ref;

      if (enableProfilerTimer) {
        workInProgress.selfBaseTime = current.selfBaseTime;
        workInProgress.treeBaseTime = current.treeBaseTime;
      }

      return workInProgress;
    }

    function createHostRootFiber(isAsync) {
      var mode = isAsync ? AsyncMode | StrictMode : NoContext;
      return createFiber(HostRoot, null, null, mode);
    }

    function createFiberFromElement(element, mode, expirationTime) {
      var owner = null;
      {
        owner = element._owner;
      }

      var fiber = void 0;
      var type = element.type;
      var key = element.key;
      var pendingProps = element.props;

      var fiberTag = void 0;
      if (typeof type === 'function') {
        fiberTag = shouldConstruct(type) ? ClassComponent : IndeterminateComponent;
      } else if (typeof type === 'string') {
        fiberTag = HostComponent;
      } else {
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);
          case REACT_ASYNC_MODE_TYPE:
            fiberTag = Mode;
            mode |= AsyncMode | StrictMode;
            break;
          case REACT_STRICT_MODE_TYPE:
            fiberTag = Mode;
            mode |= StrictMode;
            break;
          case REACT_PROFILER_TYPE:
            return createFiberFromProfiler(pendingProps, mode, expirationTime, key);
          case REACT_TIMEOUT_TYPE:
            fiberTag = TimeoutComponent;
            // Suspense does not require async, but its children should be strict
            // mode compatible.
            mode |= StrictMode;
            break;
          default:
            fiberTag = getFiberTagFromObjectType(type, owner);
            break;
        }
      }

      fiber = createFiber(fiberTag, pendingProps, key, mode);
      fiber.type = type;
      fiber.expirationTime = expirationTime;

      {
        fiber._debugSource = element._source;
        fiber._debugOwner = element._owner;
      }

      return fiber;
    }

    function getFiberTagFromObjectType(type, owner) {
      var $$typeof = typeof type === 'object' && type !== null ? type.$$typeof : null;

      switch ($$typeof) {
        case REACT_PROVIDER_TYPE:
          return ContextProvider;
        case REACT_CONTEXT_TYPE:
          // This is a consumer
          return ContextConsumer;
        case REACT_FORWARD_REF_TYPE:
          return ForwardRef;
        default:
          {
            var info = '';
            {
              if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
                info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
              }
              var ownerName = owner ? getComponentName(owner) : null;
              if (ownerName) {
                info += '\n\nCheck the render method of `' + ownerName + '`.';
              }
            }
            invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
          }
      }
    }

    function createFiberFromFragment(elements, mode, expirationTime, key) {
      var fiber = createFiber(Fragment, elements, key, mode);
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromProfiler(pendingProps, mode, expirationTime, key) {
      {
        if (typeof pendingProps.id !== 'string' || typeof pendingProps.onRender !== 'function') {
          invariant(false, 'Profiler must specify an "id" string and "onRender" function as props');
        }
      }

      var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
      fiber.type = REACT_PROFILER_TYPE;
      fiber.expirationTime = expirationTime;

      return fiber;
    }

    function createFiberFromText(content, mode, expirationTime) {
      var fiber = createFiber(HostText, content, null, mode);
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromHostInstanceForDeletion() {
      var fiber = createFiber(HostComponent, null, null, NoContext);
      fiber.type = 'DELETED';
      return fiber;
    }

    function createFiberFromPortal(portal, mode, expirationTime) {
      var pendingProps = portal.children !== null ? portal.children : [];
      var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
      fiber.expirationTime = expirationTime;
      fiber.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: null, // Used by persistent updates
        implementation: portal.implementation
      };
      return fiber;
    }

    // Used for stashing WIP properties to replay failed work in DEV.
    function assignFiberPropertiesInDEV(target, source) {
      if (target === null) {
        // This Fiber's initial properties will always be overwritten.
        // We only use a Fiber to ensure the same hidden class so DEV isn't slow.
        target = createFiber(IndeterminateComponent, null, null, NoContext);
      }

      // This is intentionally written as a list of all properties.
      // We tried to use Object.assign() instead but this is called in
      // the hottest path, and Object.assign() was too slow:
      // https://github.com/facebook/react/issues/12502
      // This code is DEV-only so size is not a concern.

      target.tag = source.tag;
      target.key = source.key;
      target.type = source.type;
      target.stateNode = source.stateNode;
      target.return = source.return;
      target.child = source.child;
      target.sibling = source.sibling;
      target.index = source.index;
      target.ref = source.ref;
      target.pendingProps = source.pendingProps;
      target.memoizedProps = source.memoizedProps;
      target.updateQueue = source.updateQueue;
      target.memoizedState = source.memoizedState;
      target.mode = source.mode;
      target.effectTag = source.effectTag;
      target.nextEffect = source.nextEffect;
      target.firstEffect = source.firstEffect;
      target.lastEffect = source.lastEffect;
      target.expirationTime = source.expirationTime;
      target.alternate = source.alternate;
      if (enableProfilerTimer) {
        target.actualDuration = source.actualDuration;
        target.actualStartTime = source.actualStartTime;
        target.selfBaseTime = source.selfBaseTime;
        target.treeBaseTime = source.treeBaseTime;
      }
      target._debugID = source._debugID;
      target._debugSource = source._debugSource;
      target._debugOwner = source._debugOwner;
      target._debugIsCurrentlyTiming = source._debugIsCurrentlyTiming;
      return target;
    }

    // TODO: This should be lifted into the renderer.


    function createFiberRoot(containerInfo, isAsync, hydrate) {
      // Cyclic construction. This cheats the type system right now because
      // stateNode is any.
      var uninitializedFiber = createHostRootFiber(isAsync);
      var root = {
        current: uninitializedFiber,
        containerInfo: containerInfo,
        pendingChildren: null,

        earliestPendingTime: NoWork,
        latestPendingTime: NoWork,
        earliestSuspendedTime: NoWork,
        latestSuspendedTime: NoWork,
        latestPingedTime: NoWork,

        pendingCommitExpirationTime: NoWork,
        finishedWork: null,
        context: null,
        pendingContext: null,
        hydrate: hydrate,
        remainingExpirationTime: NoWork,
        firstBatch: null,
        nextScheduledRoot: null
      };
      uninitializedFiber.stateNode = root;
      return root;
    }

    var onCommitFiberRoot = null;
    var onCommitFiberUnmount = null;
    var hasLoggedError = false;

    function catchErrors(fn) {
      return function (arg) {
        try {
          return fn(arg);
        } catch (err) {
          if (true && !hasLoggedError) {
            hasLoggedError = true;
            warning(false, 'React DevTools encountered an error: %s', err);
          }
        }
      };
    }

    function injectInternals(internals) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
        // No DevTools
        return false;
      }
      var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook.isDisabled) {
        // This isn't a real property on the hook, but it can be set to opt out
        // of DevTools integration and associated warnings and logs.
        // https://github.com/facebook/react/issues/3877
        return true;
      }
      if (!hook.supportsFiber) {
        {
          warning(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
        }
        // DevTools exists, even though it doesn't support Fiber.
        return true;
      }
      try {
        var rendererID = hook.inject(internals);
        // We have successfully injected, so now it is safe to set up hooks.
        onCommitFiberRoot = catchErrors(function (root) {
          return hook.onCommitFiberRoot(rendererID, root);
        });
        onCommitFiberUnmount = catchErrors(function (fiber) {
          return hook.onCommitFiberUnmount(rendererID, fiber);
        });
      } catch (err) {
        // Catch all errors because it is unsafe to throw during initialization.
        {
          warning(false, 'React DevTools encountered an error: %s.', err);
        }
      }
      // DevTools exists
      return true;
    }

    function onCommitRoot(root) {
      if (typeof onCommitFiberRoot === 'function') {
        onCommitFiberRoot(root);
      }
    }

    function onCommitUnmount(fiber) {
      if (typeof onCommitFiberUnmount === 'function') {
        onCommitFiberUnmount(fiber);
      }
    }

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function () {};

    {
      var printWarning = function (format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function (condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var ReactStrictModeWarnings = {
      discardPendingWarnings: function () {},
      flushPendingDeprecationWarnings: function () {},
      flushPendingUnsafeLifecycleWarnings: function () {},
      recordDeprecationWarnings: function (fiber, instance) {},
      recordUnsafeLifecycleWarnings: function (fiber, instance) {},
      recordLegacyContextWarning: function (fiber, instance) {},
      flushLegacyContextWarning: function () {}
    };

    {
      var LIFECYCLE_SUGGESTIONS = {
        UNSAFE_componentWillMount: 'componentDidMount',
        UNSAFE_componentWillReceiveProps: 'static getDerivedStateFromProps',
        UNSAFE_componentWillUpdate: 'componentDidUpdate'
      };

      var pendingComponentWillMountWarnings = [];
      var pendingComponentWillReceivePropsWarnings = [];
      var pendingComponentWillUpdateWarnings = [];
      var pendingUnsafeLifecycleWarnings = new Map();
      var pendingLegacyContextWarning = new Map();

      // Tracks components we have already warned about.
      var didWarnAboutDeprecatedLifecycles = new Set();
      var didWarnAboutUnsafeLifecycles = new Set();
      var didWarnAboutLegacyContext = new Set();

      var setToSortedString = function (set) {
        var array = [];
        set.forEach(function (value) {
          array.push(value);
        });
        return array.sort().join(', ');
      };

      ReactStrictModeWarnings.discardPendingWarnings = function () {
        pendingComponentWillMountWarnings = [];
        pendingComponentWillReceivePropsWarnings = [];
        pendingComponentWillUpdateWarnings = [];
        pendingUnsafeLifecycleWarnings = new Map();
        pendingLegacyContextWarning = new Map();
      };

      ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function () {
        pendingUnsafeLifecycleWarnings.forEach(function (lifecycleWarningsMap, strictRoot) {
          var lifecyclesWarningMesages = [];

          Object.keys(lifecycleWarningsMap).forEach(function (lifecycle) {
            var lifecycleWarnings = lifecycleWarningsMap[lifecycle];
            if (lifecycleWarnings.length > 0) {
              var componentNames = new Set();
              lifecycleWarnings.forEach(function (fiber) {
                componentNames.add(getComponentName(fiber) || 'Component');
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });

              var formatted = lifecycle.replace('UNSAFE_', '');
              var suggestion = LIFECYCLE_SUGGESTIONS[lifecycle];
              var sortedComponentNames = setToSortedString(componentNames);

              lifecyclesWarningMesages.push(formatted + ': Please update the following components to use ' + (suggestion + ' instead: ' + sortedComponentNames));
            }
          });

          if (lifecyclesWarningMesages.length > 0) {
            var strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);

            warning(false, 'Unsafe lifecycle methods were found within a strict-mode tree:%s' + '\n\n%s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, lifecyclesWarningMesages.join('\n\n'));
          }
        });

        pendingUnsafeLifecycleWarnings = new Map();
      };

      var findStrictRoot = function (fiber) {
        var maybeStrictRoot = null;

        var node = fiber;
        while (node !== null) {
          if (node.mode & StrictMode) {
            maybeStrictRoot = node;
          }
          node = node.return;
        }

        return maybeStrictRoot;
      };

      ReactStrictModeWarnings.flushPendingDeprecationWarnings = function () {
        if (pendingComponentWillMountWarnings.length > 0) {
          var uniqueNames = new Set();
          pendingComponentWillMountWarnings.forEach(function (fiber) {
            uniqueNames.add(getComponentName(fiber) || 'Component');
            didWarnAboutDeprecatedLifecycles.add(fiber.type);
          });

          var sortedNames = setToSortedString(uniqueNames);

          lowPriorityWarning$1(false, 'componentWillMount is deprecated and will be removed in the next major version. ' + 'Use componentDidMount instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillMount.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', sortedNames);

          pendingComponentWillMountWarnings = [];
        }

        if (pendingComponentWillReceivePropsWarnings.length > 0) {
          var _uniqueNames = new Set();
          pendingComponentWillReceivePropsWarnings.forEach(function (fiber) {
            _uniqueNames.add(getComponentName(fiber) || 'Component');
            didWarnAboutDeprecatedLifecycles.add(fiber.type);
          });

          var _sortedNames = setToSortedString(_uniqueNames);

          lowPriorityWarning$1(false, 'componentWillReceiveProps is deprecated and will be removed in the next major version. ' + 'Use static getDerivedStateFromProps instead.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames);

          pendingComponentWillReceivePropsWarnings = [];
        }

        if (pendingComponentWillUpdateWarnings.length > 0) {
          var _uniqueNames2 = new Set();
          pendingComponentWillUpdateWarnings.forEach(function (fiber) {
            _uniqueNames2.add(getComponentName(fiber) || 'Component');
            didWarnAboutDeprecatedLifecycles.add(fiber.type);
          });

          var _sortedNames2 = setToSortedString(_uniqueNames2);

          lowPriorityWarning$1(false, 'componentWillUpdate is deprecated and will be removed in the next major version. ' + 'Use componentDidUpdate instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillUpdate.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames2);

          pendingComponentWillUpdateWarnings = [];
        }
      };

      ReactStrictModeWarnings.recordDeprecationWarnings = function (fiber, instance) {
        // Dedup strategy: Warn once per component.
        if (didWarnAboutDeprecatedLifecycles.has(fiber.type)) {
          return;
        }

        // Don't warn about react-lifecycles-compat polyfilled components.
        if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
          pendingComponentWillMountWarnings.push(fiber);
        }
        if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
          pendingComponentWillReceivePropsWarnings.push(fiber);
        }
        if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
          pendingComponentWillUpdateWarnings.push(fiber);
        }
      };

      ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function (fiber, instance) {
        var strictRoot = findStrictRoot(fiber);
        if (strictRoot === null) {
          warning(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
          return;
        }

        // Dedup strategy: Warn once per component.
        // This is difficult to track any other way since component names
        // are often vague and are likely to collide between 3rd party libraries.
        // An expand property is probably okay to use here since it's DEV-only,
        // and will only be set in the event of serious warnings.
        if (didWarnAboutUnsafeLifecycles.has(fiber.type)) {
          return;
        }

        var warningsForRoot = void 0;
        if (!pendingUnsafeLifecycleWarnings.has(strictRoot)) {
          warningsForRoot = {
            UNSAFE_componentWillMount: [],
            UNSAFE_componentWillReceiveProps: [],
            UNSAFE_componentWillUpdate: []
          };

          pendingUnsafeLifecycleWarnings.set(strictRoot, warningsForRoot);
        } else {
          warningsForRoot = pendingUnsafeLifecycleWarnings.get(strictRoot);
        }

        var unsafeLifecycles = [];
        if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillMount === 'function') {
          unsafeLifecycles.push('UNSAFE_componentWillMount');
        }
        if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
          unsafeLifecycles.push('UNSAFE_componentWillReceiveProps');
        }
        if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillUpdate === 'function') {
          unsafeLifecycles.push('UNSAFE_componentWillUpdate');
        }

        if (unsafeLifecycles.length > 0) {
          unsafeLifecycles.forEach(function (lifecycle) {
            warningsForRoot[lifecycle].push(fiber);
          });
        }
      };

      ReactStrictModeWarnings.recordLegacyContextWarning = function (fiber, instance) {
        var strictRoot = findStrictRoot(fiber);
        if (strictRoot === null) {
          warning(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
          return;
        }

        // Dedup strategy: Warn once per component.
        if (didWarnAboutLegacyContext.has(fiber.type)) {
          return;
        }

        var warningsForRoot = pendingLegacyContextWarning.get(strictRoot);

        if (fiber.type.contextTypes != null || fiber.type.childContextTypes != null || instance !== null && typeof instance.getChildContext === 'function') {
          if (warningsForRoot === undefined) {
            warningsForRoot = [];
            pendingLegacyContextWarning.set(strictRoot, warningsForRoot);
          }
          warningsForRoot.push(fiber);
        }
      };

      ReactStrictModeWarnings.flushLegacyContextWarning = function () {
        pendingLegacyContextWarning.forEach(function (fiberArray, strictRoot) {
          var uniqueNames = new Set();
          fiberArray.forEach(function (fiber) {
            uniqueNames.add(getComponentName(fiber) || 'Component');
            didWarnAboutLegacyContext.add(fiber.type);
          });

          var sortedNames = setToSortedString(uniqueNames);
          var strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);

          warning(false, 'Legacy context API has been detected within a strict-mode tree: %s' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, sortedNames);
        });
      };
    }

    // This lets us hook into Fiber to debug what it's doing.
    // See https://github.com/facebook/react/pull/8033.
    // This is not part of the public API, not even for React DevTools.
    // You may only inject a debugTool if you work on React Fiber itself.
    var ReactFiberInstrumentation = {
      debugTool: null
    };

    var ReactFiberInstrumentation_1 = ReactFiberInstrumentation;

    // TODO: Offscreen updates

    function markPendingPriorityLevel(root, expirationTime) {
      if (enableSuspense) {
        // Update the latest and earliest pending times
        var earliestPendingTime = root.earliestPendingTime;
        if (earliestPendingTime === NoWork) {
          // No other pending updates.
          root.earliestPendingTime = root.latestPendingTime = expirationTime;
        } else {
          if (earliestPendingTime > expirationTime) {
            // This is the earliest pending update.
            root.earliestPendingTime = expirationTime;
          } else {
            var latestPendingTime = root.latestPendingTime;
            if (latestPendingTime < expirationTime) {
              // This is the latest pending update
              root.latestPendingTime = expirationTime;
            }
          }
        }
      }
    }

    function markCommittedPriorityLevels(root, currentTime, earliestRemainingTime) {
      if (enableSuspense) {
        if (earliestRemainingTime === NoWork) {
          // Fast path. There's no remaining work. Clear everything.
          root.earliestPendingTime = NoWork;
          root.latestPendingTime = NoWork;
          root.earliestSuspendedTime = NoWork;
          root.latestSuspendedTime = NoWork;
          root.latestPingedTime = NoWork;
          return;
        }

        // Let's see if the previous latest known pending level was just flushed.
        var latestPendingTime = root.latestPendingTime;
        if (latestPendingTime !== NoWork) {
          if (latestPendingTime < earliestRemainingTime) {
            // We've flushed all the known pending levels.
            root.earliestPendingTime = root.latestPendingTime = NoWork;
          } else {
            var earliestPendingTime = root.earliestPendingTime;
            if (earliestPendingTime < earliestRemainingTime) {
              // We've flushed the earliest known pending level. Set this to the
              // latest pending time.
              root.earliestPendingTime = root.latestPendingTime;
            }
          }
        }

        // Now let's handle the earliest remaining level in the whole tree. We need to
        // decide whether to treat it as a pending level or as suspended. Check
        // it falls within the range of known suspended levels.

        var earliestSuspendedTime = root.earliestSuspendedTime;
        if (earliestSuspendedTime === NoWork) {
          // There's no suspended work. Treat the earliest remaining level as a
          // pending level.
          markPendingPriorityLevel(root, earliestRemainingTime);
          return;
        }

        var latestSuspendedTime = root.latestSuspendedTime;
        if (earliestRemainingTime > latestSuspendedTime) {
          // The earliest remaining level is later than all the suspended work. That
          // means we've flushed all the suspended work.
          root.earliestSuspendedTime = NoWork;
          root.latestSuspendedTime = NoWork;
          root.latestPingedTime = NoWork;

          // There's no suspended work. Treat the earliest remaining level as a
          // pending level.
          markPendingPriorityLevel(root, earliestRemainingTime);
          return;
        }

        if (earliestRemainingTime < earliestSuspendedTime) {
          // The earliest remaining time is earlier than all the suspended work.
          // Treat it as a pending update.
          markPendingPriorityLevel(root, earliestRemainingTime);
          return;
        }

        // The earliest remaining time falls within the range of known suspended
        // levels. We should treat this as suspended work.
      }
    }

    function markSuspendedPriorityLevel(root, suspendedTime) {
      if (enableSuspense) {
        // First, check the known pending levels and update them if needed.
        var earliestPendingTime = root.earliestPendingTime;
        var latestPendingTime = root.latestPendingTime;
        if (earliestPendingTime === suspendedTime) {
          if (latestPendingTime === suspendedTime) {
            // Both known pending levels were suspended. Clear them.
            root.earliestPendingTime = root.latestPendingTime = NoWork;
          } else {
            // The earliest pending level was suspended. Clear by setting it to the
            // latest pending level.
            root.earliestPendingTime = latestPendingTime;
          }
        } else if (latestPendingTime === suspendedTime) {
          // The latest pending level was suspended. Clear by setting it to the
          // latest pending level.
          root.latestPendingTime = earliestPendingTime;
        }

        // Next, if we're working on the lowest known suspended level, clear the ping.
        // TODO: What if a promise suspends and pings before the root completes?
        var latestSuspendedTime = root.latestSuspendedTime;
        if (latestSuspendedTime === suspendedTime) {
          root.latestPingedTime = NoWork;
        }

        // Finally, update the known suspended levels.
        var earliestSuspendedTime = root.earliestSuspendedTime;
        if (earliestSuspendedTime === NoWork) {
          // No other suspended levels.
          root.earliestSuspendedTime = root.latestSuspendedTime = suspendedTime;
        } else {
          if (earliestSuspendedTime > suspendedTime) {
            // This is the earliest suspended level.
            root.earliestSuspendedTime = suspendedTime;
          } else if (latestSuspendedTime < suspendedTime) {
            // This is the latest suspended level
            root.latestSuspendedTime = suspendedTime;
          }
        }
      }
    }

    function markPingedPriorityLevel(root, pingedTime) {
      if (enableSuspense) {
        var latestSuspendedTime = root.latestSuspendedTime;
        if (latestSuspendedTime !== NoWork && latestSuspendedTime <= pingedTime) {
          var latestPingedTime = root.latestPingedTime;
          if (latestPingedTime === NoWork || latestPingedTime < pingedTime) {
            root.latestPingedTime = pingedTime;
          }
        }
      }
    }

    function findNextPendingPriorityLevel(root) {
      if (enableSuspense) {
        var earliestSuspendedTime = root.earliestSuspendedTime;
        var earliestPendingTime = root.earliestPendingTime;
        if (earliestSuspendedTime === NoWork) {
          // Fast path. There's no suspended work.
          return earliestPendingTime;
        }

        // First, check if there's known pending work.
        if (earliestPendingTime !== NoWork) {
          return earliestPendingTime;
        }

        // Finally, if a suspended level was pinged, work on that. Otherwise there's
        // nothing to work on.
        return root.latestPingedTime;
      } else {
        return root.current.expirationTime;
      }
    }

    // UpdateQueue is a linked list of prioritized updates.
    //
    // Like fibers, update queues come in pairs: a current queue, which represents
    // the visible state of the screen, and a work-in-progress queue, which is
    // can be mutated and processed asynchronously before it is committed — a form
    // of double buffering. If a work-in-progress render is discarded before
    // finishing, we create a new work-in-progress by cloning the current queue.
    //
    // Both queues share a persistent, singly-linked list structure. To schedule an
    // update, we append it to the end of both queues. Each queue maintains a
    // pointer to first update in the persistent list that hasn't been processed.
    // The work-in-progress pointer always has a position equal to or greater than
    // the current queue, since we always work on that one. The current queue's
    // pointer is only updated during the commit phase, when we swap in the
    // work-in-progress.
    //
    // For example:
    //
    //   Current pointer:           A - B - C - D - E - F
    //   Work-in-progress pointer:              D - E - F
    //                                          ^
    //                                          The work-in-progress queue has
    //                                          processed more updates than current.
    //
    // The reason we append to both queues is because otherwise we might drop
    // updates without ever processing them. For example, if we only add updates to
    // the work-in-progress queue, some updates could be lost whenever a work-in
    // -progress render restarts by cloning from current. Similarly, if we only add
    // updates to the current queue, the updates will be lost whenever an already
    // in-progress queue commits and swaps with the current queue. However, by
    // adding to both queues, we guarantee that the update will be part of the next
    // work-in-progress. (And because the work-in-progress queue becomes the
    // current queue once it commits, there's no danger of applying the same
    // update twice.)
    //
    // Prioritization
    // --------------
    //
    // Updates are not sorted by priority, but by insertion; new updates are always
    // appended to the end of the list.
    //
    // The priority is still important, though. When processing the update queue
    // during the render phase, only the updates with sufficient priority are
    // included in the result. If we skip an update because it has insufficient
    // priority, it remains in the queue to be processed later, during a lower
    // priority render. Crucially, all updates subsequent to a skipped update also
    // remain in the queue *regardless of their priority*. That means high priority
    // updates are sometimes processed twice, at two separate priorities. We also
    // keep track of a base state, that represents the state before the first
    // update in the queue is applied.
    //
    // For example:
    //
    //   Given a base state of '', and the following queue of updates
    //
    //     A1 - B2 - C1 - D2
    //
    //   where the number indicates the priority, and the update is applied to the
    //   previous state by appending a letter, React will process these updates as
    //   two separate renders, one per distinct priority level:
    //
    //   First render, at priority 1:
    //     Base state: ''
    //     Updates: [A1, C1]
    //     Result state: 'AC'
    //
    //   Second render, at priority 2:
    //     Base state: 'A'            <-  The base state does not include C1,
    //                                    because B2 was skipped.
    //     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
    //     Result state: 'ABCD'
    //
    // Because we process updates in insertion order, and rebase high priority
    // updates when preceding updates are skipped, the final result is deterministic
    // regardless of priority. Intermediate state may vary according to system
    // resources, but the final state is always the same.

    var UpdateState = 0;
    var ReplaceState = 1;
    var ForceUpdate = 2;
    var CaptureUpdate = 3;

    // Global state that is reset at the beginning of calling `processUpdateQueue`.
    // It should only be read right after calling `processUpdateQueue`, via
    // `checkHasForceUpdateAfterProcessing`.
    var hasForceUpdate = false;

    var didWarnUpdateInsideUpdate = void 0;
    var currentlyProcessingQueue = void 0;
    var resetCurrentlyProcessingQueue = void 0;
    {
      didWarnUpdateInsideUpdate = false;
      currentlyProcessingQueue = null;
      resetCurrentlyProcessingQueue = function () {
        currentlyProcessingQueue = null;
      };
    }

    function createUpdateQueue(baseState) {
      var queue = {
        expirationTime: NoWork,
        baseState: baseState,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null
      };
      return queue;
    }

    function cloneUpdateQueue(currentQueue) {
      var queue = {
        expirationTime: currentQueue.expirationTime,
        baseState: currentQueue.baseState,
        firstUpdate: currentQueue.firstUpdate,
        lastUpdate: currentQueue.lastUpdate,

        // TODO: With resuming, if we bail out and resuse the child tree, we should
        // keep these effects.
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,

        firstEffect: null,
        lastEffect: null,

        firstCapturedEffect: null,
        lastCapturedEffect: null
      };
      return queue;
    }

    function createUpdate(expirationTime) {
      return {
        expirationTime: expirationTime,

        tag: UpdateState,
        payload: null,
        callback: null,

        next: null,
        nextEffect: null
      };
    }

    function appendUpdateToQueue(queue, update, expirationTime) {
      // Append the update to the end of the list.
      if (queue.lastUpdate === null) {
        // Queue is empty
        queue.firstUpdate = queue.lastUpdate = update;
      } else {
        queue.lastUpdate.next = update;
        queue.lastUpdate = update;
      }
      if (queue.expirationTime === NoWork || queue.expirationTime > expirationTime) {
        // The incoming update has the earliest expiration of any update in the
        // queue. Update the queue's expiration time.
        queue.expirationTime = expirationTime;
      }
    }

    function enqueueUpdate(fiber, update, expirationTime) {
      // Update queues are created lazily.
      var alternate = fiber.alternate;
      var queue1 = void 0;
      var queue2 = void 0;
      if (alternate === null) {
        // There's only one fiber.
        queue1 = fiber.updateQueue;
        queue2 = null;
        if (queue1 === null) {
          queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        }
      } else {
        // There are two owners.
        queue1 = fiber.updateQueue;
        queue2 = alternate.updateQueue;
        if (queue1 === null) {
          if (queue2 === null) {
            // Neither fiber has an update queue. Create new ones.
            queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
            queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
          } else {
            // Only one fiber has an update queue. Clone to create a new one.
            queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
          }
        } else {
          if (queue2 === null) {
            // Only one fiber has an update queue. Clone to create a new one.
            queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
          } else {
            // Both owners have an update queue.
          }
        }
      }
      if (queue2 === null || queue1 === queue2) {
        // There's only a single queue.
        appendUpdateToQueue(queue1, update, expirationTime);
      } else {
        // There are two queues. We need to append the update to both queues,
        // while accounting for the persistent structure of the list — we don't
        // want the same update to be added multiple times.
        if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
          // One of the queues is not empty. We must add the update to both queues.
          appendUpdateToQueue(queue1, update, expirationTime);
          appendUpdateToQueue(queue2, update, expirationTime);
        } else {
          // Both queues are non-empty. The last update is the same in both lists,
          // because of structural sharing. So, only append to one of the lists.
          appendUpdateToQueue(queue1, update, expirationTime);
          // But we still need to update the `lastUpdate` pointer of queue2.
          queue2.lastUpdate = update;
        }
      }

      {
        if (fiber.tag === ClassComponent && (currentlyProcessingQueue === queue1 || queue2 !== null && currentlyProcessingQueue === queue2) && !didWarnUpdateInsideUpdate) {
          warning(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
          didWarnUpdateInsideUpdate = true;
        }
      }
    }

    function enqueueCapturedUpdate(workInProgress, update, renderExpirationTime) {
      // Captured updates go into a separate list, and only on the work-in-
      // progress queue.
      var workInProgressQueue = workInProgress.updateQueue;
      if (workInProgressQueue === null) {
        workInProgressQueue = workInProgress.updateQueue = createUpdateQueue(workInProgress.memoizedState);
      } else {
        // TODO: I put this here rather than createWorkInProgress so that we don't
        // clone the queue unnecessarily. There's probably a better way to
        // structure this.
        workInProgressQueue = ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
      }

      // Append the update to the end of the list.
      if (workInProgressQueue.lastCapturedUpdate === null) {
        // This is the first render phase update
        workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update;
      } else {
        workInProgressQueue.lastCapturedUpdate.next = update;
        workInProgressQueue.lastCapturedUpdate = update;
      }
      if (workInProgressQueue.expirationTime === NoWork || workInProgressQueue.expirationTime > renderExpirationTime) {
        // The incoming update has the earliest expiration of any update in the
        // queue. Update the queue's expiration time.
        workInProgressQueue.expirationTime = renderExpirationTime;
      }
    }

    function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
      var current = workInProgress.alternate;
      if (current !== null) {
        // If the work-in-progress queue is equal to the current queue,
        // we need to clone it first.
        if (queue === current.updateQueue) {
          queue = workInProgress.updateQueue = cloneUpdateQueue(queue);
        }
      }
      return queue;
    }

    function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
      switch (update.tag) {
        case ReplaceState:
          {
            var _payload = update.payload;
            if (typeof _payload === 'function') {
              // Updater function
              {
                if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
                  _payload.call(instance, prevState, nextProps);
                }
              }
              return _payload.call(instance, prevState, nextProps);
            }
            // State object
            return _payload;
          }
        case CaptureUpdate:
          {
            workInProgress.effectTag = workInProgress.effectTag & ~ShouldCapture | DidCapture;
          }
        // Intentional fallthrough
        case UpdateState:
          {
            var _payload2 = update.payload;
            var partialState = void 0;
            if (typeof _payload2 === 'function') {
              // Updater function
              {
                if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
                  _payload2.call(instance, prevState, nextProps);
                }
              }
              partialState = _payload2.call(instance, prevState, nextProps);
            } else {
              // Partial state object
              partialState = _payload2;
            }
            if (partialState === null || partialState === undefined) {
              // Null and undefined are treated as no-ops.
              return prevState;
            }
            // Merge the partial state and the previous state.
            return _assign({}, prevState, partialState);
          }
        case ForceUpdate:
          {
            hasForceUpdate = true;
            return prevState;
          }
      }
      return prevState;
    }

    function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
      hasForceUpdate = false;

      if (queue.expirationTime === NoWork || queue.expirationTime > renderExpirationTime) {
        // Insufficient priority. Bailout.
        return;
      }

      queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);

      {
        currentlyProcessingQueue = queue;
      }

      // These values may change as we process the queue.
      var newBaseState = queue.baseState;
      var newFirstUpdate = null;
      var newExpirationTime = NoWork;

      // Iterate through the list of updates to compute the result.
      var update = queue.firstUpdate;
      var resultState = newBaseState;
      while (update !== null) {
        var updateExpirationTime = update.expirationTime;
        if (updateExpirationTime > renderExpirationTime) {
          // This update does not have sufficient priority. Skip it.
          if (newFirstUpdate === null) {
            // This is the first skipped update. It will be the first update in
            // the new list.
            newFirstUpdate = update;
            // Since this is the first update that was skipped, the current result
            // is the new base state.
            newBaseState = resultState;
          }
          // Since this update will remain in the list, update the remaining
          // expiration time.
          if (newExpirationTime === NoWork || newExpirationTime > updateExpirationTime) {
            newExpirationTime = updateExpirationTime;
          }
        } else {
          // This update does have sufficient priority. Process it and compute
          // a new result.
          resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
          var _callback = update.callback;
          if (_callback !== null) {
            workInProgress.effectTag |= Callback;
            // Set this to null, in case it was mutated during an aborted render.
            update.nextEffect = null;
            if (queue.lastEffect === null) {
              queue.firstEffect = queue.lastEffect = update;
            } else {
              queue.lastEffect.nextEffect = update;
              queue.lastEffect = update;
            }
          }
        }
        // Continue to the next update.
        update = update.next;
      }

      // Separately, iterate though the list of captured updates.
      var newFirstCapturedUpdate = null;
      update = queue.firstCapturedUpdate;
      while (update !== null) {
        var _updateExpirationTime = update.expirationTime;
        if (_updateExpirationTime > renderExpirationTime) {
          // This update does not have sufficient priority. Skip it.
          if (newFirstCapturedUpdate === null) {
            // This is the first skipped captured update. It will be the first
            // update in the new list.
            newFirstCapturedUpdate = update;
            // If this is the first update that was skipped, the current result is
            // the new base state.
            if (newFirstUpdate === null) {
              newBaseState = resultState;
            }
          }
          // Since this update will remain in the list, update the remaining
          // expiration time.
          if (newExpirationTime === NoWork || newExpirationTime > _updateExpirationTime) {
            newExpirationTime = _updateExpirationTime;
          }
        } else {
          // This update does have sufficient priority. Process it and compute
          // a new result.
          resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
          var _callback2 = update.callback;
          if (_callback2 !== null) {
            workInProgress.effectTag |= Callback;
            // Set this to null, in case it was mutated during an aborted render.
            update.nextEffect = null;
            if (queue.lastCapturedEffect === null) {
              queue.firstCapturedEffect = queue.lastCapturedEffect = update;
            } else {
              queue.lastCapturedEffect.nextEffect = update;
              queue.lastCapturedEffect = update;
            }
          }
        }
        update = update.next;
      }

      if (newFirstUpdate === null) {
        queue.lastUpdate = null;
      }
      if (newFirstCapturedUpdate === null) {
        queue.lastCapturedUpdate = null;
      } else {
        workInProgress.effectTag |= Callback;
      }
      if (newFirstUpdate === null && newFirstCapturedUpdate === null) {
        // We processed every update, without skipping. That means the new base
        // state is the same as the result state.
        newBaseState = resultState;
      }

      queue.baseState = newBaseState;
      queue.firstUpdate = newFirstUpdate;
      queue.firstCapturedUpdate = newFirstCapturedUpdate;
      queue.expirationTime = newExpirationTime;

      workInProgress.memoizedState = resultState;

      {
        currentlyProcessingQueue = null;
      }
    }

    function callCallback(callback, context) {
      !(typeof callback === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', callback) : void 0;
      callback.call(context);
    }

    function resetHasForceUpdateBeforeProcessing() {
      hasForceUpdate = false;
    }

    function checkHasForceUpdateAfterProcessing() {
      return hasForceUpdate;
    }

    function commitUpdateQueue(finishedWork, finishedQueue, instance, renderExpirationTime) {
      // If the finished render included captured updates, and there are still
      // lower priority updates left over, we need to keep the captured updates
      // in the queue so that they are rebased and not dropped once we process the
      // queue again at the lower priority.
      if (finishedQueue.firstCapturedUpdate !== null) {
        // Join the captured update list to the end of the normal list.
        if (finishedQueue.lastUpdate !== null) {
          finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate;
          finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate;
        }
        // Clear the list of captured updates.
        finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null;
      }

      // Commit the effects
      var effect = finishedQueue.firstEffect;
      finishedQueue.firstEffect = finishedQueue.lastEffect = null;
      while (effect !== null) {
        var _callback3 = effect.callback;
        if (_callback3 !== null) {
          effect.callback = null;
          callCallback(_callback3, instance);
        }
        effect = effect.nextEffect;
      }

      effect = finishedQueue.firstCapturedEffect;
      finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
      while (effect !== null) {
        var _callback4 = effect.callback;
        if (_callback4 !== null) {
          effect.callback = null;
          callCallback(_callback4, instance);
        }
        effect = effect.nextEffect;
      }
    }

    function createCapturedValue(value, source) {
      // If the value is an error, call this function immediately after it is thrown
      // so the stack is accurate.
      return {
        value: value,
        source: source,
        stack: getStackAddendumByWorkInProgressFiber(source)
      };
    }

    var providerCursor = createCursor(null);
    var valueCursor = createCursor(null);
    var changedBitsCursor = createCursor(0);

    var rendererSigil = void 0;
    {
      // Use this to detect multiple renderers using the same context
      rendererSigil = {};
    }

    function pushProvider(providerFiber) {
      var context = providerFiber.type._context;

      if (isPrimaryRenderer) {
        push(changedBitsCursor, context._changedBits, providerFiber);
        push(valueCursor, context._currentValue, providerFiber);
        push(providerCursor, providerFiber, providerFiber);

        context._currentValue = providerFiber.pendingProps.value;
        context._changedBits = providerFiber.stateNode;
        {
          !(context._currentRenderer === undefined || context._currentRenderer === null || context._currentRenderer === rendererSigil) ? warning(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
          context._currentRenderer = rendererSigil;
        }
      } else {
        push(changedBitsCursor, context._changedBits2, providerFiber);
        push(valueCursor, context._currentValue2, providerFiber);
        push(providerCursor, providerFiber, providerFiber);

        context._currentValue2 = providerFiber.pendingProps.value;
        context._changedBits2 = providerFiber.stateNode;
        {
          !(context._currentRenderer2 === undefined || context._currentRenderer2 === null || context._currentRenderer2 === rendererSigil) ? warning(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
          context._currentRenderer2 = rendererSigil;
        }
      }
    }

    function popProvider(providerFiber) {
      var changedBits = changedBitsCursor.current;
      var currentValue = valueCursor.current;

      pop(providerCursor, providerFiber);
      pop(valueCursor, providerFiber);
      pop(changedBitsCursor, providerFiber);

      var context = providerFiber.type._context;
      if (isPrimaryRenderer) {
        context._currentValue = currentValue;
        context._changedBits = changedBits;
      } else {
        context._currentValue2 = currentValue;
        context._changedBits2 = changedBits;
      }
    }

    function getContextCurrentValue(context) {
      return isPrimaryRenderer ? context._currentValue : context._currentValue2;
    }

    function getContextChangedBits(context) {
      return isPrimaryRenderer ? context._changedBits : context._changedBits2;
    }

    var NO_CONTEXT = {};

    var contextStackCursor$1 = createCursor(NO_CONTEXT);
    var contextFiberStackCursor = createCursor(NO_CONTEXT);
    var rootInstanceStackCursor = createCursor(NO_CONTEXT);

    function requiredContext(c) {
      !(c !== NO_CONTEXT) ? invariant(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      return c;
    }

    function getRootHostContainer() {
      var rootInstance = requiredContext(rootInstanceStackCursor.current);
      return rootInstance;
    }

    function pushHostContainer(fiber, nextRootInstance) {
      // Push current root instance onto the stack;
      // This allows us to reset root when portals are popped.
      push(rootInstanceStackCursor, nextRootInstance, fiber);
      // Track the context and the Fiber that provided it.
      // This enables us to pop only Fibers that provide unique contexts.
      push(contextFiberStackCursor, fiber, fiber);

      // Finally, we need to push the host context to the stack.
      // However, we can't just call getRootHostContext() and push it because
      // we'd have a different number of entries on the stack depending on
      // whether getRootHostContext() throws somewhere in renderer code or not.
      // So we push an empty value first. This lets us safely unwind on errors.
      push(contextStackCursor$1, NO_CONTEXT, fiber);
      var nextRootContext = getRootHostContext(nextRootInstance);
      // Now that we know this function doesn't throw, replace it.
      pop(contextStackCursor$1, fiber);
      push(contextStackCursor$1, nextRootContext, fiber);
    }

    function popHostContainer(fiber) {
      pop(contextStackCursor$1, fiber);
      pop(contextFiberStackCursor, fiber);
      pop(rootInstanceStackCursor, fiber);
    }

    function getHostContext() {
      var context = requiredContext(contextStackCursor$1.current);
      return context;
    }

    function pushHostContext(fiber) {
      var rootInstance = requiredContext(rootInstanceStackCursor.current);
      var context = requiredContext(contextStackCursor$1.current);
      var nextContext = getChildHostContext(context, fiber.type, rootInstance);

      // Don't push this Fiber's context unless it's unique.
      if (context === nextContext) {
        return;
      }

      // Track the context and the Fiber that provided it.
      // This enables us to pop only Fibers that provide unique contexts.
      push(contextFiberStackCursor, fiber, fiber);
      push(contextStackCursor$1, nextContext, fiber);
    }

    function popHostContext(fiber) {
      // Do not pop unless this Fiber provided the current context.
      // pushHostContext() only pushes Fibers that provide unique contexts.
      if (contextFiberStackCursor.current !== fiber) {
        return;
      }

      pop(contextStackCursor$1, fiber);
      pop(contextFiberStackCursor, fiber);
    }

    var commitTime = 0;

    function getCommitTime() {
      return commitTime;
    }

    function recordCommitTime() {
      if (!enableProfilerTimer) {
        return;
      }
      commitTime = now();
    }

    /**
     * The "actual" render time is total time required to render the descendants of a Profiler component.
     * This time is stored as a stack, since Profilers can be nested.
     * This time is started during the "begin" phase and stopped during the "complete" phase.
     * It is paused (and accumulated) in the event of an interruption or an aborted render.
     */

    var fiberStack$1 = void 0;

    {
      fiberStack$1 = [];
    }

    var timerPausedAt = 0;
    var totalElapsedPauseTime = 0;

    function checkActualRenderTimeStackEmpty() {
      if (!enableProfilerTimer) {
        return;
      }
      {
        !(fiberStack$1.length === 0) ? warning(false, 'Expected an empty stack. Something was not reset properly.') : void 0;
      }
    }

    function markActualRenderTimeStarted(fiber) {
      if (!enableProfilerTimer) {
        return;
      }
      {
        fiberStack$1.push(fiber);
      }

      fiber.actualDuration = now() - fiber.actualDuration - totalElapsedPauseTime;
      fiber.actualStartTime = now();
    }

    function pauseActualRenderTimerIfRunning() {
      if (!enableProfilerTimer) {
        return;
      }
      if (timerPausedAt === 0) {
        timerPausedAt = now();
      }
    }

    function recordElapsedActualRenderTime(fiber) {
      if (!enableProfilerTimer) {
        return;
      }
      {
        !(fiber === fiberStack$1.pop()) ? warning(false, 'Unexpected Fiber (%s) popped.', getComponentName(fiber)) : void 0;
      }

      fiber.actualDuration = now() - totalElapsedPauseTime - fiber.actualDuration;
    }

    function resetActualRenderTimer() {
      if (!enableProfilerTimer) {
        return;
      }
      totalElapsedPauseTime = 0;
    }

    function resumeActualRenderTimerIfPaused() {
      if (!enableProfilerTimer) {
        return;
      }
      if (timerPausedAt > 0) {
        totalElapsedPauseTime += now() - timerPausedAt;
        timerPausedAt = 0;
      }
    }

    /**
     * The "base" render time is the duration of the “begin” phase of work for a particular fiber.
     * This time is measured and stored on each fiber.
     * The time for all sibling fibers are accumulated and stored on their parent during the "complete" phase.
     * If a fiber bails out (sCU false) then its "base" timer is cancelled and the fiber is not updated.
     */

    var baseStartTime = -1;

    function recordElapsedBaseRenderTimeIfRunning(fiber) {
      if (!enableProfilerTimer) {
        return;
      }
      if (baseStartTime !== -1) {
        fiber.selfBaseTime = now() - baseStartTime;
      }
    }

    function startBaseRenderTimer() {
      if (!enableProfilerTimer) {
        return;
      }
      {
        if (baseStartTime !== -1) {
          warning(false, 'Cannot start base timer that is already running. ' + 'This error is likely caused by a bug in React. ' + 'Please file an issue.');
        }
      }
      baseStartTime = now();
    }

    function stopBaseRenderTimerIfRunning() {
      if (!enableProfilerTimer) {
        return;
      }
      baseStartTime = -1;
    }

    var fakeInternalInstance = {};
    var isArray = Array.isArray;

    var didWarnAboutStateAssignmentForComponent = void 0;
    var didWarnAboutUninitializedState = void 0;
    var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = void 0;
    var didWarnAboutLegacyLifecyclesAndDerivedState = void 0;
    var didWarnAboutUndefinedDerivedState = void 0;
    var warnOnUndefinedDerivedState = void 0;
    var warnOnInvalidCallback$1 = void 0;

    {
      didWarnAboutStateAssignmentForComponent = new Set();
      didWarnAboutUninitializedState = new Set();
      didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
      didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
      didWarnAboutUndefinedDerivedState = new Set();

      var didWarnOnInvalidCallback = new Set();

      warnOnInvalidCallback$1 = function (callback, callerName) {
        if (callback === null || typeof callback === 'function') {
          return;
        }
        var key = callerName + '_' + callback;
        if (!didWarnOnInvalidCallback.has(key)) {
          didWarnOnInvalidCallback.add(key);
          warning(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
        }
      };

      warnOnUndefinedDerivedState = function (workInProgress, partialState) {
        if (partialState === undefined) {
          var componentName = getComponentName(workInProgress) || 'Component';
          if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
            didWarnAboutUndefinedDerivedState.add(componentName);
            warning(false, '%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', componentName);
          }
        }
      };

      // This is so gross but it's at least non-critical and can be removed if
      // it causes problems. This is meant to give a nicer error message for
      // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
      // ...)) which otherwise throws a "_processChildContext is not a function"
      // exception.
      Object.defineProperty(fakeInternalInstance, '_processChildContext', {
        enumerable: false,
        value: function () {
          invariant(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
        }
      });
      Object.freeze(fakeInternalInstance);
    }

    function applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, nextProps) {
      var prevState = workInProgress.memoizedState;

      {
        if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
          // Invoke the function an extra time to help detect side-effects.
          getDerivedStateFromProps(nextProps, prevState);
        }
      }

      var partialState = getDerivedStateFromProps(nextProps, prevState);

      {
        warnOnUndefinedDerivedState(workInProgress, partialState);
      }
      // Merge the partial state and the previous state.
      var memoizedState = partialState === null || partialState === undefined ? prevState : _assign({}, prevState, partialState);
      workInProgress.memoizedState = memoizedState;

      // Once the update queue is empty, persist the derived state onto the
      // base state.
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null && updateQueue.expirationTime === NoWork) {
        updateQueue.baseState = memoizedState;
      }
    }

    var classComponentUpdater = {
      isMounted: isMounted,
      enqueueSetState: function (inst, payload, callback) {
        var fiber = get(inst);
        var currentTime = recalculateCurrentTime();
        var expirationTime = computeExpirationForFiber(currentTime, fiber);

        var update = createUpdate(expirationTime);
        update.payload = payload;
        if (callback !== undefined && callback !== null) {
          {
            warnOnInvalidCallback$1(callback, 'setState');
          }
          update.callback = callback;
        }

        enqueueUpdate(fiber, update, expirationTime);
        scheduleWork$1(fiber, expirationTime);
      },
      enqueueReplaceState: function (inst, payload, callback) {
        var fiber = get(inst);
        var currentTime = recalculateCurrentTime();
        var expirationTime = computeExpirationForFiber(currentTime, fiber);

        var update = createUpdate(expirationTime);
        update.tag = ReplaceState;
        update.payload = payload;

        if (callback !== undefined && callback !== null) {
          {
            warnOnInvalidCallback$1(callback, 'replaceState');
          }
          update.callback = callback;
        }

        enqueueUpdate(fiber, update, expirationTime);
        scheduleWork$1(fiber, expirationTime);
      },
      enqueueForceUpdate: function (inst, callback) {
        var fiber = get(inst);
        var currentTime = recalculateCurrentTime();
        var expirationTime = computeExpirationForFiber(currentTime, fiber);

        var update = createUpdate(expirationTime);
        update.tag = ForceUpdate;

        if (callback !== undefined && callback !== null) {
          {
            warnOnInvalidCallback$1(callback, 'forceUpdate');
          }
          update.callback = callback;
        }

        enqueueUpdate(fiber, update, expirationTime);
        scheduleWork$1(fiber, expirationTime);
      }
    };

    function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
      var instance = workInProgress.stateNode;
      var ctor = workInProgress.type;
      if (typeof instance.shouldComponentUpdate === 'function') {
        startPhaseTimer(workInProgress, 'shouldComponentUpdate');
        var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
        stopPhaseTimer();

        {
          !(shouldUpdate !== undefined) ? warning(false, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(workInProgress) || 'Component') : void 0;
        }

        return shouldUpdate;
      }

      if (ctor.prototype && ctor.prototype.isPureReactComponent) {
        return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
      }

      return true;
    }

    function checkClassInstance(workInProgress) {
      var instance = workInProgress.stateNode;
      var type = workInProgress.type;
      {
        var name = getComponentName(workInProgress) || 'Component';
        var renderPresent = instance.render;

        if (!renderPresent) {
          if (type.prototype && typeof type.prototype.render === 'function') {
            warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
          } else {
            warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
          }
        }

        var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
        !noGetInitialStateOnES6 ? warning(false, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name) : void 0;
        var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
        !noGetDefaultPropsOnES6 ? warning(false, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name) : void 0;
        var noInstancePropTypes = !instance.propTypes;
        !noInstancePropTypes ? warning(false, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name) : void 0;
        var noInstanceContextTypes = !instance.contextTypes;
        !noInstanceContextTypes ? warning(false, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name) : void 0;
        var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
        !noComponentShouldUpdate ? warning(false, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name) : void 0;
        if (type.prototype && type.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
          warning(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName(workInProgress) || 'A pure component');
        }
        var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
        !noComponentDidUnmount ? warning(false, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name) : void 0;
        var noComponentDidReceiveProps = typeof instance.componentDidReceiveProps !== 'function';
        !noComponentDidReceiveProps ? warning(false, '%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name) : void 0;
        var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
        !noComponentWillRecieveProps ? warning(false, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name) : void 0;
        var noUnsafeComponentWillRecieveProps = typeof instance.UNSAFE_componentWillRecieveProps !== 'function';
        !noUnsafeComponentWillRecieveProps ? warning(false, '%s has a method called ' + 'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?', name) : void 0;
        var hasMutatedProps = instance.props !== workInProgress.pendingProps;
        !(instance.props === undefined || !hasMutatedProps) ? warning(false, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name) : void 0;
        var noInstanceDefaultProps = !instance.defaultProps;
        !noInstanceDefaultProps ? warning(false, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name) : void 0;

        if (typeof instance.getSnapshotBeforeUpdate === 'function' && typeof instance.componentDidUpdate !== 'function' && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(type)) {
          didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(type);
          warning(false, '%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). ' + 'This component defines getSnapshotBeforeUpdate() only.', getComponentName(workInProgress));
        }

        var noInstanceGetDerivedStateFromProps = typeof instance.getDerivedStateFromProps !== 'function';
        !noInstanceGetDerivedStateFromProps ? warning(false, '%s: getDerivedStateFromProps() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
        var noInstanceGetDerivedStateFromCatch = typeof instance.getDerivedStateFromCatch !== 'function';
        !noInstanceGetDerivedStateFromCatch ? warning(false, '%s: getDerivedStateFromCatch() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
        var noStaticGetSnapshotBeforeUpdate = typeof type.getSnapshotBeforeUpdate !== 'function';
        !noStaticGetSnapshotBeforeUpdate ? warning(false, '%s: getSnapshotBeforeUpdate() is defined as a static method ' + 'and will be ignored. Instead, declare it as an instance method.', name) : void 0;
        var _state = instance.state;
        if (_state && (typeof _state !== 'object' || isArray(_state))) {
          warning(false, '%s.state: must be set to an object or null', name);
        }
        if (typeof instance.getChildContext === 'function') {
          !(typeof type.childContextTypes === 'object') ? warning(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', name) : void 0;
        }
      }
    }

    function adoptClassInstance(workInProgress, instance) {
      instance.updater = classComponentUpdater;
      workInProgress.stateNode = instance;
      // The instance needs access to the fiber so that it can schedule updates
      set(instance, workInProgress);
      {
        instance._reactInternalInstance = fakeInternalInstance;
      }
    }

    function constructClassInstance(workInProgress, props, renderExpirationTime) {
      var ctor = workInProgress.type;
      var unmaskedContext = getUnmaskedContext(workInProgress);
      var needsContext = isContextConsumer(workInProgress);
      var context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject;

      // Instantiate twice to help detect side-effects.
      {
        if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
          new ctor(props, context); // eslint-disable-line no-new
        }
      }

      var instance = new ctor(props, context);
      var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
      adoptClassInstance(workInProgress, instance);

      {
        if (typeof ctor.getDerivedStateFromProps === 'function' && state === null) {
          var componentName = getComponentName(workInProgress) || 'Component';
          if (!didWarnAboutUninitializedState.has(componentName)) {
            didWarnAboutUninitializedState.add(componentName);
            warning(false, '%s: Did not properly initialize state during construction. ' + 'Expected state to be an object, but it was %s.', componentName, instance.state === null ? 'null' : 'undefined');
          }
        }

        // If new component APIs are defined, "unsafe" lifecycles won't be called.
        // Warn about these lifecycles if they are present.
        // Don't warn about react-lifecycles-compat polyfilled methods though.
        if (typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function') {
          var foundWillMountName = null;
          var foundWillReceivePropsName = null;
          var foundWillUpdateName = null;
          if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
            foundWillMountName = 'componentWillMount';
          } else if (typeof instance.UNSAFE_componentWillMount === 'function') {
            foundWillMountName = 'UNSAFE_componentWillMount';
          }
          if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
            foundWillReceivePropsName = 'componentWillReceiveProps';
          } else if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
            foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
          }
          if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
            foundWillUpdateName = 'componentWillUpdate';
          } else if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
            foundWillUpdateName = 'UNSAFE_componentWillUpdate';
          }
          if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
            var _componentName = getComponentName(workInProgress) || 'Component';
            var newApiName = typeof ctor.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
            if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
              didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
              warning(false, 'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + '%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n' + 'The above lifecycles should be removed. Learn more about this warning here:\n' + 'https://fb.me/react-async-component-lifecycle-hooks', _componentName, newApiName, foundWillMountName !== null ? '\n  ' + foundWillMountName : '', foundWillReceivePropsName !== null ? '\n  ' + foundWillReceivePropsName : '', foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '');
            }
          }
        }
      }

      // Cache unmasked context so we can avoid recreating masked context unless necessary.
      // ReactFiberContext usually updates this cache but can't for newly-created instances.
      if (needsContext) {
        cacheContext(workInProgress, unmaskedContext, context);
      }

      return instance;
    }

    function callComponentWillMount(workInProgress, instance) {
      startPhaseTimer(workInProgress, 'componentWillMount');
      var oldState = instance.state;

      if (typeof instance.componentWillMount === 'function') {
        instance.componentWillMount();
      }
      if (typeof instance.UNSAFE_componentWillMount === 'function') {
        instance.UNSAFE_componentWillMount();
      }

      stopPhaseTimer();

      if (oldState !== instance.state) {
        {
          warning(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName(workInProgress) || 'Component');
        }
        classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
    }

    function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
      var oldState = instance.state;
      startPhaseTimer(workInProgress, 'componentWillReceiveProps');
      if (typeof instance.componentWillReceiveProps === 'function') {
        instance.componentWillReceiveProps(newProps, newContext);
      }
      if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
        instance.UNSAFE_componentWillReceiveProps(newProps, newContext);
      }
      stopPhaseTimer();

      if (instance.state !== oldState) {
        {
          var componentName = getComponentName(workInProgress) || 'Component';
          if (!didWarnAboutStateAssignmentForComponent.has(componentName)) {
            didWarnAboutStateAssignmentForComponent.add(componentName);
            warning(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', componentName);
          }
        }
        classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
    }

    // Invokes the mount life-cycles on a previously never rendered instance.
    function mountClassInstance(workInProgress, renderExpirationTime) {
      var ctor = workInProgress.type;

      {
        checkClassInstance(workInProgress);
      }

      var instance = workInProgress.stateNode;
      var props = workInProgress.pendingProps;
      var unmaskedContext = getUnmaskedContext(workInProgress);

      instance.props = props;
      instance.state = workInProgress.memoizedState;
      instance.refs = emptyObject;
      instance.context = getMaskedContext(workInProgress, unmaskedContext);

      {
        if (workInProgress.mode & StrictMode) {
          ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, instance);

          ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, instance);
        }

        if (warnAboutDeprecatedLifecycles) {
          ReactStrictModeWarnings.recordDeprecationWarnings(workInProgress, instance);
        }
      }

      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime);
        instance.state = workInProgress.memoizedState;
      }

      var getDerivedStateFromProps = workInProgress.type.getDerivedStateFromProps;
      if (typeof getDerivedStateFromProps === 'function') {
        applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props);
        instance.state = workInProgress.memoizedState;
      }

      // In order to support react-lifecycles-compat polyfilled components,
      // Unsafe lifecycles should not be invoked for components using the new APIs.
      if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
        callComponentWillMount(workInProgress, instance);
        // If we had additional state updates during this life-cycle, let's
        // process them now.
        updateQueue = workInProgress.updateQueue;
        if (updateQueue !== null) {
          processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime);
          instance.state = workInProgress.memoizedState;
        }
      }

      if (typeof instance.componentDidMount === 'function') {
        workInProgress.effectTag |= Update;
      }
    }

    function resumeMountClassInstance(workInProgress, renderExpirationTime) {
      var ctor = workInProgress.type;
      var instance = workInProgress.stateNode;

      var oldProps = workInProgress.memoizedProps;
      var newProps = workInProgress.pendingProps;
      instance.props = oldProps;

      var oldContext = instance.context;
      var newUnmaskedContext = getUnmaskedContext(workInProgress);
      var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

      var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
      var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

      // Note: During these life-cycles, instance.props/instance.state are what
      // ever the previously attempted to render - not the "current". However,
      // during componentDidUpdate we pass the "current" props.

      // In order to support react-lifecycles-compat polyfilled components,
      // Unsafe lifecycles should not be invoked for components using the new APIs.
      if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
        if (oldProps !== newProps || oldContext !== newContext) {
          callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
        }
      }

      resetHasForceUpdateBeforeProcessing();

      var oldState = workInProgress.memoizedState;
      var newState = instance.state = oldState;
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
        newState = workInProgress.memoizedState;
      }
      if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidMount === 'function') {
          workInProgress.effectTag |= Update;
        }
        return false;
      }

      if (typeof getDerivedStateFromProps === 'function') {
        applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
        newState = workInProgress.memoizedState;
      }

      var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

      if (shouldUpdate) {
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
          startPhaseTimer(workInProgress, 'componentWillMount');
          if (typeof instance.componentWillMount === 'function') {
            instance.componentWillMount();
          }
          if (typeof instance.UNSAFE_componentWillMount === 'function') {
            instance.UNSAFE_componentWillMount();
          }
          stopPhaseTimer();
        }
        if (typeof instance.componentDidMount === 'function') {
          workInProgress.effectTag |= Update;
        }
      } else {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidMount === 'function') {
          workInProgress.effectTag |= Update;
        }

        // If shouldComponentUpdate returned false, we should still update the
        // memoized state to indicate that this work can be reused.
        workInProgress.memoizedProps = newProps;
        workInProgress.memoizedState = newState;
      }

      // Update the existing instance's state, props, and context pointers even
      // if shouldComponentUpdate returns false.
      instance.props = newProps;
      instance.state = newState;
      instance.context = newContext;

      return shouldUpdate;
    }

    // Invokes the update life-cycles and returns false if it shouldn't rerender.
    function updateClassInstance(current, workInProgress, renderExpirationTime) {
      var ctor = workInProgress.type;
      var instance = workInProgress.stateNode;

      var oldProps = workInProgress.memoizedProps;
      var newProps = workInProgress.pendingProps;
      instance.props = oldProps;

      var oldContext = instance.context;
      var newUnmaskedContext = getUnmaskedContext(workInProgress);
      var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

      var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
      var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

      // Note: During these life-cycles, instance.props/instance.state are what
      // ever the previously attempted to render - not the "current". However,
      // during componentDidUpdate we pass the "current" props.

      // In order to support react-lifecycles-compat polyfilled components,
      // Unsafe lifecycles should not be invoked for components using the new APIs.
      if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
        if (oldProps !== newProps || oldContext !== newContext) {
          callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
        }
      }

      resetHasForceUpdateBeforeProcessing();

      var oldState = workInProgress.memoizedState;
      var newState = instance.state = oldState;
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
        newState = workInProgress.memoizedState;
      }

      if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Update;
          }
        }
        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Snapshot;
          }
        }
        return false;
      }

      if (typeof getDerivedStateFromProps === 'function') {
        applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
        newState = workInProgress.memoizedState;
      }

      var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

      if (shouldUpdate) {
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')) {
          startPhaseTimer(workInProgress, 'componentWillUpdate');
          if (typeof instance.componentWillUpdate === 'function') {
            instance.componentWillUpdate(newProps, newState, newContext);
          }
          if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
            instance.UNSAFE_componentWillUpdate(newProps, newState, newContext);
          }
          stopPhaseTimer();
        }
        if (typeof instance.componentDidUpdate === 'function') {
          workInProgress.effectTag |= Update;
        }
        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
          workInProgress.effectTag |= Snapshot;
        }
      } else {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Update;
          }
        }
        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Snapshot;
          }
        }

        // If shouldComponentUpdate returned false, we should still update the
        // memoized props/state to indicate that this work can be reused.
        workInProgress.memoizedProps = newProps;
        workInProgress.memoizedState = newState;
      }

      // Update the existing instance's state, props, and context pointers even
      // if shouldComponentUpdate returns false.
      instance.props = newProps;
      instance.state = newState;
      instance.context = newContext;

      return shouldUpdate;
    }

    var getCurrentFiberStackAddendum$7 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnAboutMaps = void 0;
    var didWarnAboutStringRefInStrictMode = void 0;
    var ownerHasKeyUseWarning = void 0;
    var ownerHasFunctionTypeWarning = void 0;
    var warnForMissingKey = function (child) {};

    {
      didWarnAboutMaps = false;
      didWarnAboutStringRefInStrictMode = {};

      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */
      ownerHasKeyUseWarning = {};
      ownerHasFunctionTypeWarning = {};

      warnForMissingKey = function (child) {
        if (child === null || typeof child !== 'object') {
          return;
        }
        if (!child._store || child._store.validated || child.key != null) {
          return;
        }
        !(typeof child._store === 'object') ? invariant(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        child._store.validated = true;

        var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + (getCurrentFiberStackAddendum$7() || '');
        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }
        ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

        warning(false, 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.%s', getCurrentFiberStackAddendum$7());
      };
    }

    var isArray$1 = Array.isArray;

    function coerceRef(returnFiber, current, element) {
      var mixedRef = element.ref;
      if (mixedRef !== null && typeof mixedRef !== 'function' && typeof mixedRef !== 'object') {
        {
          if (returnFiber.mode & StrictMode) {
            var componentName = getComponentName(returnFiber) || 'Component';
            if (!didWarnAboutStringRefInStrictMode[componentName]) {
              warning(false, 'A string ref, "%s", has been found within a strict mode tree. ' + 'String refs are a source of potential bugs and should be avoided. ' + 'We recommend using createRef() instead.' + '\n%s' + '\n\nLearn more about using refs safely here:' + '\nhttps://fb.me/react-strict-mode-string-ref', mixedRef, getStackAddendumByWorkInProgressFiber(returnFiber));
              didWarnAboutStringRefInStrictMode[componentName] = true;
            }
          }
        }

        if (element._owner) {
          var owner = element._owner;
          var inst = void 0;
          if (owner) {
            var ownerFiber = owner;
            !(ownerFiber.tag === ClassComponent) ? invariant(false, 'Stateless function components cannot have refs.') : void 0;
            inst = ownerFiber.stateNode;
          }
          !inst ? invariant(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
          var stringRef = '' + mixedRef;
          // Check if previous string ref matches new string ref
          if (current !== null && current.ref !== null && typeof current.ref === 'function' && current.ref._stringRef === stringRef) {
            return current.ref;
          }
          var ref = function (value) {
            var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
            if (value === null) {
              delete refs[stringRef];
            } else {
              refs[stringRef] = value;
            }
          };
          ref._stringRef = stringRef;
          return ref;
        } else {
          !(typeof mixedRef === 'string') ? invariant(false, 'Expected ref to be a function or a string.') : void 0;
          !element._owner ? invariant(false, 'Element ref was specified as a string (%s) but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a functional component\n2. You may be adding a ref to a component that was not created inside a component\'s render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.', mixedRef) : void 0;
        }
      }
      return mixedRef;
    }

    function throwOnInvalidObjectType(returnFiber, newChild) {
      if (returnFiber.type !== 'textarea') {
        var addendum = '';
        {
          addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + (getCurrentFiberStackAddendum$7() || '');
        }
        invariant(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
      }
    }

    function warnOnFunctionType() {
      var currentComponentErrorInfo = 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.' + (getCurrentFiberStackAddendum$7() || '');

      if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;

      warning(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.%s', getCurrentFiberStackAddendum$7() || '');
    }

    // This wrapper function exists because I expect to clone the code in each path
    // to be able to optimize each path individually by branching early. This needs
    // a compiler or we can do it manually. Helpers that don't need this branching
    // live outside of this function.
    function ChildReconciler(shouldTrackSideEffects) {
      function deleteChild(returnFiber, childToDelete) {
        if (!shouldTrackSideEffects) {
          // Noop.
          return;
        }
        // Deletions are added in reversed order so we add it to the front.
        // At this point, the return fiber's effect list is empty except for
        // deletions, so we can just append the deletion to the list. The remaining
        // effects aren't added until the complete phase. Once we implement
        // resuming, this may not be true.
        var last = returnFiber.lastEffect;
        if (last !== null) {
          last.nextEffect = childToDelete;
          returnFiber.lastEffect = childToDelete;
        } else {
          returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
        }
        childToDelete.nextEffect = null;
        childToDelete.effectTag = Deletion;
      }

      function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects) {
          // Noop.
          return null;
        }

        // TODO: For the shouldClone case, this could be micro-optimized a bit by
        // assuming that after the first child we've already added everything.
        var childToDelete = currentFirstChild;
        while (childToDelete !== null) {
          deleteChild(returnFiber, childToDelete);
          childToDelete = childToDelete.sibling;
        }
        return null;
      }

      function mapRemainingChildren(returnFiber, currentFirstChild) {
        // Add the remaining children to a temporary map so that we can find them by
        // keys quickly. Implicit (null) keys get added to this set with their index
        var existingChildren = new Map();

        var existingChild = currentFirstChild;
        while (existingChild !== null) {
          if (existingChild.key !== null) {
            existingChildren.set(existingChild.key, existingChild);
          } else {
            existingChildren.set(existingChild.index, existingChild);
          }
          existingChild = existingChild.sibling;
        }
        return existingChildren;
      }

      function useFiber(fiber, pendingProps, expirationTime) {
        // We currently set sibling to null and index to 0 here because it is easy
        // to forget to do before returning it. E.g. for the single child case.
        var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
        clone.index = 0;
        clone.sibling = null;
        return clone;
      }

      function placeChild(newFiber, lastPlacedIndex, newIndex) {
        newFiber.index = newIndex;
        if (!shouldTrackSideEffects) {
          // Noop.
          return lastPlacedIndex;
        }
        var current = newFiber.alternate;
        if (current !== null) {
          var oldIndex = current.index;
          if (oldIndex < lastPlacedIndex) {
            // This is a move.
            newFiber.effectTag = Placement;
            return lastPlacedIndex;
          } else {
            // This item can stay in place.
            return oldIndex;
          }
        } else {
          // This is an insertion.
          newFiber.effectTag = Placement;
          return lastPlacedIndex;
        }
      }

      function placeSingleChild(newFiber) {
        // This is simpler for the single child case. We only need to do a
        // placement for inserting new children.
        if (shouldTrackSideEffects && newFiber.alternate === null) {
          newFiber.effectTag = Placement;
        }
        return newFiber;
      }

      function updateTextNode(returnFiber, current, textContent, expirationTime) {
        if (current === null || current.tag !== HostText) {
          // Insert
          var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
          created.return = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, textContent, expirationTime);
          existing.return = returnFiber;
          return existing;
        }
      }

      function updateElement(returnFiber, current, element, expirationTime) {
        if (current !== null && current.type === element.type) {
          // Move based on index
          var existing = useFiber(current, element.props, expirationTime);
          existing.ref = coerceRef(returnFiber, current, element);
          existing.return = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          // Insert
          var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
          created.ref = coerceRef(returnFiber, current, element);
          created.return = returnFiber;
          return created;
        }
      }

      function updatePortal(returnFiber, current, portal, expirationTime) {
        if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
          // Insert
          var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
          created.return = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, portal.children || [], expirationTime);
          existing.return = returnFiber;
          return existing;
        }
      }

      function updateFragment(returnFiber, current, fragment, expirationTime, key) {
        if (current === null || current.tag !== Fragment) {
          // Insert
          var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
          created.return = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, fragment, expirationTime);
          existing.return = returnFiber;
          return existing;
        }
      }

      function createChild(returnFiber, newChild, expirationTime) {
        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys. If the previous node is implicitly keyed
          // we can continue to replace it without aborting even if it is not a text
          // node.
          var created = createFiberFromText('' + newChild, returnFiber.mode, expirationTime);
          created.return = returnFiber;
          return created;
        }

        if (typeof newChild === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);
                _created.ref = coerceRef(returnFiber, null, newChild);
                _created.return = returnFiber;
                return _created;
              }
            case REACT_PORTAL_TYPE:
              {
                var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
                _created2.return = returnFiber;
                return _created2;
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);
            _created3.return = returnFiber;
            return _created3;
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
        // Update the fiber if the keys match, otherwise return null.

        var key = oldFiber !== null ? oldFiber.key : null;

        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys. If the previous node is implicitly keyed
          // we can continue to replace it without aborting even if it is not a text
          // node.
          if (key !== null) {
            return null;
          }
          return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
        }

        if (typeof newChild === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                if (newChild.key === key) {
                  if (newChild.type === REACT_FRAGMENT_TYPE) {
                    return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
                  }
                  return updateElement(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }
            case REACT_PORTAL_TYPE:
              {
                if (newChild.key === key) {
                  return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            if (key !== null) {
              return null;
            }

            return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys, so we neither have to check the old nor
          // new node for the key. If both are text nodes, they match.
          var matchedFiber = existingChildren.get(newIdx) || null;
          return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
        }

        if (typeof newChild === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                if (newChild.type === REACT_FRAGMENT_TYPE) {
                  return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
                }
                return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
              }
            case REACT_PORTAL_TYPE:
              {
                var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                return updatePortal(returnFiber, _matchedFiber2, newChild, expirationTime);
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            var _matchedFiber3 = existingChildren.get(newIdx) || null;
            return updateFragment(returnFiber, _matchedFiber3, newChild, expirationTime, null);
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      /**
       * Warns if there is a duplicate or missing key
       */
      function warnOnInvalidKey(child, knownKeys) {
        {
          if (typeof child !== 'object' || child === null) {
            return knownKeys;
          }
          switch (child.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              warnForMissingKey(child);
              var key = child.key;
              if (typeof key !== 'string') {
                break;
              }
              if (knownKeys === null) {
                knownKeys = new Set();
                knownKeys.add(key);
                break;
              }
              if (!knownKeys.has(key)) {
                knownKeys.add(key);
                break;
              }
              warning(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.%s', key, getCurrentFiberStackAddendum$7());
              break;
            default:
              break;
          }
        }
        return knownKeys;
      }

      function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
        // This algorithm can't optimize by searching from boths ends since we
        // don't have backpointers on fibers. I'm trying to see how far we can get
        // with that model. If it ends up not being worth the tradeoffs, we can
        // add it later.

        // Even with a two ended optimization, we'd want to optimize for the case
        // where there are few changes and brute force the comparison instead of
        // going for the Map. It'd like to explore hitting that path first in
        // forward-only mode and only go for the Map once we notice that we need
        // lots of look ahead. This doesn't handle reversal as well as two ended
        // search but that's unusual. Besides, for the two ended optimization to
        // work on Iterables, we'd need to copy the whole set.

        // In this first iteration, we'll just live with hitting the bad case
        // (adding everything to a Map) in for every insert/move.

        // If you change this code, also update reconcileChildrenIterator() which
        // uses the same algorithm.

        {
          // First, validate keys.
          var knownKeys = null;
          for (var i = 0; i < newChildren.length; i++) {
            var child = newChildren[i];
            knownKeys = warnOnInvalidKey(child, knownKeys);
          }
        }

        var resultingFirstChild = null;
        var previousNewFiber = null;

        var oldFiber = currentFirstChild;
        var lastPlacedIndex = 0;
        var newIdx = 0;
        var nextOldFiber = null;
        for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
          if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
          } else {
            nextOldFiber = oldFiber.sibling;
          }
          var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
          if (newFiber === null) {
            // TODO: This breaks on empty slots like null children. That's
            // unfortunate because it triggers the slow path all the time. We need
            // a better way to communicate whether this was a miss or null,
            // boolean, undefined, etc.
            if (oldFiber === null) {
              oldFiber = nextOldFiber;
            }
            break;
          }
          if (shouldTrackSideEffects) {
            if (oldFiber && newFiber.alternate === null) {
              // We matched the slot, but we didn't reuse the existing fiber, so we
              // need to delete the existing child.
              deleteChild(returnFiber, oldFiber);
            }
          }
          lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
          if (previousNewFiber === null) {
            // TODO: Move out of the loop. This only happens for the first run.
            resultingFirstChild = newFiber;
          } else {
            // TODO: Defer siblings if we're not at the right index for this slot.
            // I.e. if we had null values before, then we want to defer this
            // for each null value. However, we also don't want to call updateSlot
            // with the previous one.
            previousNewFiber.sibling = newFiber;
          }
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }

        if (newIdx === newChildren.length) {
          // We've reached the end of the new children. We can delete the rest.
          deleteRemainingChildren(returnFiber, oldFiber);
          return resultingFirstChild;
        }

        if (oldFiber === null) {
          // If we don't have any more existing children we can choose a fast path
          // since the rest will all be insertions.
          for (; newIdx < newChildren.length; newIdx++) {
            var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
            if (!_newFiber) {
              continue;
            }
            lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              // TODO: Move out of the loop. This only happens for the first run.
              resultingFirstChild = _newFiber;
            } else {
              previousNewFiber.sibling = _newFiber;
            }
            previousNewFiber = _newFiber;
          }
          return resultingFirstChild;
        }

        // Add all children to a key map for quick lookups.
        var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

        // Keep scanning and use the map to restore deleted items as moves.
        for (; newIdx < newChildren.length; newIdx++) {
          var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
          if (_newFiber2) {
            if (shouldTrackSideEffects) {
              if (_newFiber2.alternate !== null) {
                // The new fiber is a work in progress, but if there exists a
                // current, that means that we reused the fiber. We need to delete
                // it from the child list so that we don't add it to the deletion
                // list.
                existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
              }
            }
            lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              resultingFirstChild = _newFiber2;
            } else {
              previousNewFiber.sibling = _newFiber2;
            }
            previousNewFiber = _newFiber2;
          }
        }

        if (shouldTrackSideEffects) {
          // Any existing children that weren't consumed above were deleted. We need
          // to add them to the deletion list.
          existingChildren.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        }

        return resultingFirstChild;
      }

      function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
        // This is the same implementation as reconcileChildrenArray(),
        // but using the iterator instead.

        var iteratorFn = getIteratorFn(newChildrenIterable);
        !(typeof iteratorFn === 'function') ? invariant(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

        {
          // Warn about using Maps as children
          if (newChildrenIterable.entries === iteratorFn) {
            !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentFiberStackAddendum$7()) : void 0;
            didWarnAboutMaps = true;
          }

          // First, validate keys.
          // We'll get a different iterator later for the main pass.
          var _newChildren = iteratorFn.call(newChildrenIterable);
          if (_newChildren) {
            var knownKeys = null;
            var _step = _newChildren.next();
            for (; !_step.done; _step = _newChildren.next()) {
              var child = _step.value;
              knownKeys = warnOnInvalidKey(child, knownKeys);
            }
          }
        }

        var newChildren = iteratorFn.call(newChildrenIterable);
        !(newChildren != null) ? invariant(false, 'An iterable object provided no iterator.') : void 0;

        var resultingFirstChild = null;
        var previousNewFiber = null;

        var oldFiber = currentFirstChild;
        var lastPlacedIndex = 0;
        var newIdx = 0;
        var nextOldFiber = null;

        var step = newChildren.next();
        for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
          if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
          } else {
            nextOldFiber = oldFiber.sibling;
          }
          var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
          if (newFiber === null) {
            // TODO: This breaks on empty slots like null children. That's
            // unfortunate because it triggers the slow path all the time. We need
            // a better way to communicate whether this was a miss or null,
            // boolean, undefined, etc.
            if (!oldFiber) {
              oldFiber = nextOldFiber;
            }
            break;
          }
          if (shouldTrackSideEffects) {
            if (oldFiber && newFiber.alternate === null) {
              // We matched the slot, but we didn't reuse the existing fiber, so we
              // need to delete the existing child.
              deleteChild(returnFiber, oldFiber);
            }
          }
          lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
          if (previousNewFiber === null) {
            // TODO: Move out of the loop. This only happens for the first run.
            resultingFirstChild = newFiber;
          } else {
            // TODO: Defer siblings if we're not at the right index for this slot.
            // I.e. if we had null values before, then we want to defer this
            // for each null value. However, we also don't want to call updateSlot
            // with the previous one.
            previousNewFiber.sibling = newFiber;
          }
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }

        if (step.done) {
          // We've reached the end of the new children. We can delete the rest.
          deleteRemainingChildren(returnFiber, oldFiber);
          return resultingFirstChild;
        }

        if (oldFiber === null) {
          // If we don't have any more existing children we can choose a fast path
          // since the rest will all be insertions.
          for (; !step.done; newIdx++, step = newChildren.next()) {
            var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
            if (_newFiber3 === null) {
              continue;
            }
            lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              // TODO: Move out of the loop. This only happens for the first run.
              resultingFirstChild = _newFiber3;
            } else {
              previousNewFiber.sibling = _newFiber3;
            }
            previousNewFiber = _newFiber3;
          }
          return resultingFirstChild;
        }

        // Add all children to a key map for quick lookups.
        var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

        // Keep scanning and use the map to restore deleted items as moves.
        for (; !step.done; newIdx++, step = newChildren.next()) {
          var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
          if (_newFiber4 !== null) {
            if (shouldTrackSideEffects) {
              if (_newFiber4.alternate !== null) {
                // The new fiber is a work in progress, but if there exists a
                // current, that means that we reused the fiber. We need to delete
                // it from the child list so that we don't add it to the deletion
                // list.
                existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
              }
            }
            lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              resultingFirstChild = _newFiber4;
            } else {
              previousNewFiber.sibling = _newFiber4;
            }
            previousNewFiber = _newFiber4;
          }
        }

        if (shouldTrackSideEffects) {
          // Any existing children that weren't consumed above were deleted. We need
          // to add them to the deletion list.
          existingChildren.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        }

        return resultingFirstChild;
      }

      function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
        // There's no need to check for keys on text nodes since we don't have a
        // way to define them.
        if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
          // We already have an existing node so let's just update it and delete
          // the rest.
          deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
          var existing = useFiber(currentFirstChild, textContent, expirationTime);
          existing.return = returnFiber;
          return existing;
        }
        // The existing first child is not a text node so we need to create one
        // and delete the existing ones.
        deleteRemainingChildren(returnFiber, currentFirstChild);
        var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
        created.return = returnFiber;
        return created;
      }

      function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
        var key = element.key;
        var child = currentFirstChild;
        while (child !== null) {
          // TODO: If key === null and child.key === null, then this only applies to
          // the first item in the list.
          if (child.key === key) {
            if (child.tag === Fragment ? element.type === REACT_FRAGMENT_TYPE : child.type === element.type) {
              deleteRemainingChildren(returnFiber, child.sibling);
              var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
              existing.ref = coerceRef(returnFiber, child, element);
              existing.return = returnFiber;
              {
                existing._debugSource = element._source;
                existing._debugOwner = element._owner;
              }
              return existing;
            } else {
              deleteRemainingChildren(returnFiber, child);
              break;
            }
          } else {
            deleteChild(returnFiber, child);
          }
          child = child.sibling;
        }

        if (element.type === REACT_FRAGMENT_TYPE) {
          var created = createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key);
          created.return = returnFiber;
          return created;
        } else {
          var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
          _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
          _created4.return = returnFiber;
          return _created4;
        }
      }

      function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
        var key = portal.key;
        var child = currentFirstChild;
        while (child !== null) {
          // TODO: If key === null and child.key === null, then this only applies to
          // the first item in the list.
          if (child.key === key) {
            if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
              deleteRemainingChildren(returnFiber, child.sibling);
              var existing = useFiber(child, portal.children || [], expirationTime);
              existing.return = returnFiber;
              return existing;
            } else {
              deleteRemainingChildren(returnFiber, child);
              break;
            }
          } else {
            deleteChild(returnFiber, child);
          }
          child = child.sibling;
        }

        var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
        created.return = returnFiber;
        return created;
      }

      // This API will tag the children with the side-effect of the reconciliation
      // itself. They will be added to the side-effect list as we pass through the
      // children and the parent.
      function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
        // This function is not recursive.
        // If the top level item is an array, we treat it as a set of children,
        // not as a fragment. Nested arrays on the other hand will be treated as
        // fragment nodes. Recursion happens at the normal flow.

        // Handle top level unkeyed fragments as if they were arrays.
        // This leads to an ambiguity between <>{[...]}</> and <>...</>.
        // We treat the ambiguous cases above the same.
        var isUnkeyedTopLevelFragment = typeof newChild === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;
        if (isUnkeyedTopLevelFragment) {
          newChild = newChild.props.children;
        }

        // Handle object types
        var isObject = typeof newChild === 'object' && newChild !== null;

        if (isObject) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
            case REACT_PORTAL_TYPE:
              return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
          }
        }

        if (typeof newChild === 'string' || typeof newChild === 'number') {
          return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
        }

        if (isArray$1(newChild)) {
          return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
        }

        if (getIteratorFn(newChild)) {
          return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
        }

        if (isObject) {
          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }
        if (typeof newChild === 'undefined' && !isUnkeyedTopLevelFragment) {
          // If the new child is undefined, and the return fiber is a composite
          // component, throw an error. If Fiber return types are disabled,
          // we already threw above.
          switch (returnFiber.tag) {
            case ClassComponent:
              {
                {
                  var instance = returnFiber.stateNode;
                  if (instance.render._isMockFunction) {
                    // We allow auto-mocks to proceed as if they're returning null.
                    break;
                  }
                }
              }
            // Intentionally fall through to the next case, which handles both
            // functions and classes
            // eslint-disable-next-lined no-fallthrough
            case FunctionalComponent:
              {
                var Component = returnFiber.type;
                invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
              }
          }
        }

        // Remaining cases are all treated as empty.
        return deleteRemainingChildren(returnFiber, currentFirstChild);
      }

      return reconcileChildFibers;
    }

    var reconcileChildFibers = ChildReconciler(true);
    var mountChildFibers = ChildReconciler(false);

    function cloneChildFibers(current, workInProgress) {
      !(current === null || workInProgress.child === current.child) ? invariant(false, 'Resuming work not yet implemented.') : void 0;

      if (workInProgress.child === null) {
        return;
      }

      var currentChild = workInProgress.child;
      var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
      workInProgress.child = newChild;

      newChild.return = workInProgress;
      while (currentChild.sibling !== null) {
        currentChild = currentChild.sibling;
        newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
        newChild.return = workInProgress;
      }
      newChild.sibling = null;
    }

    // The deepest Fiber on the stack involved in a hydration context.
    // This may have been an insertion or a hydration.
    var hydrationParentFiber = null;
    var nextHydratableInstance = null;
    var isHydrating = false;

    function enterHydrationState(fiber) {
      if (!supportsHydration) {
        return false;
      }

      var parentInstance = fiber.stateNode.containerInfo;
      nextHydratableInstance = getFirstHydratableChild(parentInstance);
      hydrationParentFiber = fiber;
      isHydrating = true;
      return true;
    }

    function deleteHydratableInstance(returnFiber, instance) {
      {
        switch (returnFiber.tag) {
          case HostRoot:
            didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
            break;
          case HostComponent:
            didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
            break;
        }
      }

      var childToDelete = createFiberFromHostInstanceForDeletion();
      childToDelete.stateNode = instance;
      childToDelete.return = returnFiber;
      childToDelete.effectTag = Deletion;

      // This might seem like it belongs on progressedFirstDeletion. However,
      // these children are not part of the reconciliation list of children.
      // Even if we abort and rereconcile the children, that will try to hydrate
      // again and the nodes are still in the host tree so these will be
      // recreated.
      if (returnFiber.lastEffect !== null) {
        returnFiber.lastEffect.nextEffect = childToDelete;
        returnFiber.lastEffect = childToDelete;
      } else {
        returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      }
    }

    function insertNonHydratedInstance(returnFiber, fiber) {
      fiber.effectTag |= Placement;
      {
        switch (returnFiber.tag) {
          case HostRoot:
            {
              var parentContainer = returnFiber.stateNode.containerInfo;
              switch (fiber.tag) {
                case HostComponent:
                  var type = fiber.type;
                  var props = fiber.pendingProps;
                  didNotFindHydratableContainerInstance(parentContainer, type, props);
                  break;
                case HostText:
                  var text = fiber.pendingProps;
                  didNotFindHydratableContainerTextInstance(parentContainer, text);
                  break;
              }
              break;
            }
          case HostComponent:
            {
              var parentType = returnFiber.type;
              var parentProps = returnFiber.memoizedProps;
              var parentInstance = returnFiber.stateNode;
              switch (fiber.tag) {
                case HostComponent:
                  var _type = fiber.type;
                  var _props = fiber.pendingProps;
                  didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
                  break;
                case HostText:
                  var _text = fiber.pendingProps;
                  didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
                  break;
              }
              break;
            }
          default:
            return;
        }
      }
    }

    function tryHydrate(fiber, nextInstance) {
      switch (fiber.tag) {
        case HostComponent:
          {
            var type = fiber.type;
            var props = fiber.pendingProps;
            var instance = canHydrateInstance(nextInstance, type, props);
            if (instance !== null) {
              fiber.stateNode = instance;
              return true;
            }
            return false;
          }
        case HostText:
          {
            var text = fiber.pendingProps;
            var textInstance = canHydrateTextInstance(nextInstance, text);
            if (textInstance !== null) {
              fiber.stateNode = textInstance;
              return true;
            }
            return false;
          }
        default:
          return false;
      }
    }

    function tryToClaimNextHydratableInstance(fiber) {
      if (!isHydrating) {
        return;
      }
      var nextInstance = nextHydratableInstance;
      if (!nextInstance) {
        // Nothing to hydrate. Make it an insertion.
        insertNonHydratedInstance(hydrationParentFiber, fiber);
        isHydrating = false;
        hydrationParentFiber = fiber;
        return;
      }
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        // If we can't hydrate this instance let's try the next one.
        // We use this as a heuristic. It's based on intuition and not data so it
        // might be flawed or unnecessary.
        nextInstance = getNextHydratableSibling(firstAttemptedInstance);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          // Nothing to hydrate. Make it an insertion.
          insertNonHydratedInstance(hydrationParentFiber, fiber);
          isHydrating = false;
          hydrationParentFiber = fiber;
          return;
        }
        // We matched the next one, we'll now assume that the first one was
        // superfluous and we'll delete it. Since we can't eagerly delete it
        // we'll have to schedule a deletion. To do that, this node needs a dummy
        // fiber associated with it.
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getFirstHydratableChild(nextInstance);
    }

    function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
      if (!supportsHydration) {
        invariant(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      }

      var instance = fiber.stateNode;
      var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
      // TODO: Type this specific to this type of component.
      fiber.updateQueue = updatePayload;
      // If the update payload indicates that there is a change or if there
      // is a new ref we mark this as an update.
      if (updatePayload !== null) {
        return true;
      }
      return false;
    }

    function prepareToHydrateHostTextInstance(fiber) {
      if (!supportsHydration) {
        invariant(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      }

      var textInstance = fiber.stateNode;
      var textContent = fiber.memoizedProps;
      var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
      {
        if (shouldUpdate) {
          // We assume that prepareToHydrateHostTextInstance is called in a context where the
          // hydration parent is the parent host component of this host text.
          var returnFiber = hydrationParentFiber;
          if (returnFiber !== null) {
            switch (returnFiber.tag) {
              case HostRoot:
                {
                  var parentContainer = returnFiber.stateNode.containerInfo;
                  didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
                  break;
                }
              case HostComponent:
                {
                  var parentType = returnFiber.type;
                  var parentProps = returnFiber.memoizedProps;
                  var parentInstance = returnFiber.stateNode;
                  didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
                  break;
                }
            }
          }
        }
      }
      return shouldUpdate;
    }

    function popToNextHostParent(fiber) {
      var parent = fiber.return;
      while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot) {
        parent = parent.return;
      }
      hydrationParentFiber = parent;
    }

    function popHydrationState(fiber) {
      if (!supportsHydration) {
        return false;
      }
      if (fiber !== hydrationParentFiber) {
        // We're deeper than the current hydration context, inside an inserted
        // tree.
        return false;
      }
      if (!isHydrating) {
        // If we're not currently hydrating but we're in a hydration context, then
        // we were an insertion and now need to pop up reenter hydration of our
        // siblings.
        popToNextHostParent(fiber);
        isHydrating = true;
        return false;
      }

      var type = fiber.type;

      // If we have any remaining hydratable nodes, we need to delete them now.
      // We only do this deeper than head and body since they tend to have random
      // other nodes in them. We also ignore components with pure text content in
      // side of them.
      // TODO: Better heuristic.
      if (fiber.tag !== HostComponent || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
        var nextInstance = nextHydratableInstance;
        while (nextInstance) {
          deleteHydratableInstance(fiber, nextInstance);
          nextInstance = getNextHydratableSibling(nextInstance);
        }
      }

      popToNextHostParent(fiber);
      nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
      return true;
    }

    function resetHydrationState() {
      if (!supportsHydration) {
        return;
      }

      hydrationParentFiber = null;
      nextHydratableInstance = null;
      isHydrating = false;
    }

    var getCurrentFiberStackAddendum$6 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnAboutBadClass = void 0;
    var didWarnAboutGetDerivedStateOnFunctionalComponent = void 0;
    var didWarnAboutStatelessRefs = void 0;

    {
      didWarnAboutBadClass = {};
      didWarnAboutGetDerivedStateOnFunctionalComponent = {};
      didWarnAboutStatelessRefs = {};
    }

    // TODO: Remove this and use reconcileChildrenAtExpirationTime directly.
    function reconcileChildren(current, workInProgress, nextChildren) {
      reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, workInProgress.expirationTime);
    }

    function reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime) {
      if (current === null) {
        // If this is a fresh new component that hasn't been rendered yet, we
        // won't update its child set by applying minimal side-effects. Instead,
        // we will add them all to the child before it gets rendered. That means
        // we can optimize this reconciliation pass by not tracking side-effects.
        workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
      } else {
        // If the current child is the same as the work in progress, it means that
        // we haven't yet started any work on these children. Therefore, we use
        // the clone algorithm to create a copy of all the current children.

        // If we had any progressed work already, that is invalid at this point so
        // let's throw it out.
        workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
      }
    }

    function updateForwardRef(current, workInProgress) {
      var render = workInProgress.type.render;
      var nextProps = workInProgress.pendingProps;
      var ref = workInProgress.ref;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (workInProgress.memoizedProps === nextProps) {
        var currentRef = current !== null ? current.ref : null;
        if (ref === currentRef) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
      }

      var nextChildren = void 0;
      {
        ReactCurrentOwner.current = workInProgress;
        ReactDebugCurrentFiber.setCurrentPhase('render');
        nextChildren = render(nextProps, ref);
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }

      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function updateFragment(current, workInProgress) {
      var nextChildren = workInProgress.pendingProps;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (workInProgress.memoizedProps === nextChildren) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextChildren);
      return workInProgress.child;
    }

    function updateMode(current, workInProgress) {
      var nextChildren = workInProgress.pendingProps.children;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextChildren);
      return workInProgress.child;
    }

    function updateProfiler(current, workInProgress) {
      var nextProps = workInProgress.pendingProps;
      if (enableProfilerTimer) {
        workInProgress.effectTag |= Update;
      }
      if (workInProgress.memoizedProps === nextProps) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      var nextChildren = nextProps.children;
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function markRef(current, workInProgress) {
      var ref = workInProgress.ref;
      if (current === null && ref !== null || current !== null && current.ref !== ref) {
        // Schedule a Ref effect
        workInProgress.effectTag |= Ref;
      }
    }

    function updateFunctionalComponent(current, workInProgress) {
      var fn = workInProgress.type;
      var nextProps = workInProgress.pendingProps;

      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else {
        if (workInProgress.memoizedProps === nextProps) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        // TODO: consider bringing fn.shouldComponentUpdate() back.
        // It used to be here.
      }

      var unmaskedContext = getUnmaskedContext(workInProgress);
      var context = getMaskedContext(workInProgress, unmaskedContext);

      var nextChildren = void 0;

      {
        ReactCurrentOwner.current = workInProgress;
        ReactDebugCurrentFiber.setCurrentPhase('render');
        nextChildren = fn(nextProps, context);
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }
      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function updateClassComponent(current, workInProgress, renderExpirationTime) {
      // Push context providers early to prevent context stack mismatches.
      // During mounting we don't know the child context yet as the instance doesn't exist.
      // We will invalidate the child context in finishClassComponent() right after rendering.
      var hasContext = pushContextProvider(workInProgress);
      var shouldUpdate = void 0;
      if (current === null) {
        if (workInProgress.stateNode === null) {
          // In the initial pass we might need to construct the instance.
          constructClassInstance(workInProgress, workInProgress.pendingProps, renderExpirationTime);
          mountClassInstance(workInProgress, renderExpirationTime);

          shouldUpdate = true;
        } else {
          // In a resume, we'll already have an instance we can reuse.
          shouldUpdate = resumeMountClassInstance(workInProgress, renderExpirationTime);
        }
      } else {
        shouldUpdate = updateClassInstance(current, workInProgress, renderExpirationTime);
      }
      return finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime);
    }

    function finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime) {
      // Refs should update even if shouldComponentUpdate returns false
      markRef(current, workInProgress);

      var didCaptureError = (workInProgress.effectTag & DidCapture) !== NoEffect;

      if (!shouldUpdate && !didCaptureError) {
        // Context providers should defer to sCU for rendering
        if (hasContext) {
          invalidateContextProvider(workInProgress, false);
        }

        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }

      var ctor = workInProgress.type;
      var instance = workInProgress.stateNode;

      // Rerender
      ReactCurrentOwner.current = workInProgress;
      var nextChildren = void 0;
      if (didCaptureError && (!enableGetDerivedStateFromCatch || typeof ctor.getDerivedStateFromCatch !== 'function')) {
        // If we captured an error, but getDerivedStateFrom catch is not defined,
        // unmount all the children. componentDidCatch will schedule an update to
        // re-render a fallback. This is temporary until we migrate everyone to
        // the new API.
        // TODO: Warn in a future release.
        nextChildren = null;

        if (enableProfilerTimer) {
          stopBaseRenderTimerIfRunning();
        }
      } else {
        {
          ReactDebugCurrentFiber.setCurrentPhase('render');
          nextChildren = instance.render();
          if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
            instance.render();
          }
          ReactDebugCurrentFiber.setCurrentPhase(null);
        }
      }

      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;
      if (didCaptureError) {
        // If we're recovering from an error, reconcile twice: first to delete
        // all the existing children.
        reconcileChildrenAtExpirationTime(current, workInProgress, null, renderExpirationTime);
        workInProgress.child = null;
        // Now we can continue reconciling like normal. This has the effect of
        // remounting all children regardless of whether their their
        // identity matches.
      }
      reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime);
      // Memoize props and state using the values we just used to render.
      // TODO: Restructure so we never read values from the instance.
      memoizeState(workInProgress, instance.state);
      memoizeProps(workInProgress, instance.props);

      // The context might have changed so we need to recalculate it.
      if (hasContext) {
        invalidateContextProvider(workInProgress, true);
      }

      return workInProgress.child;
    }

    function pushHostRootContext(workInProgress) {
      var root = workInProgress.stateNode;
      if (root.pendingContext) {
        pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
      } else if (root.context) {
        // Should always be set
        pushTopLevelContextObject(workInProgress, root.context, false);
      }
      pushHostContainer(workInProgress, root.containerInfo);
    }

    function updateHostRoot(current, workInProgress, renderExpirationTime) {
      pushHostRootContext(workInProgress);
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        var nextProps = workInProgress.pendingProps;
        var prevState = workInProgress.memoizedState;
        var prevChildren = prevState !== null ? prevState.element : null;
        processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
        var nextState = workInProgress.memoizedState;
        // Caution: React DevTools currently depends on this property
        // being called "element".
        var nextChildren = nextState.element;

        if (nextChildren === prevChildren) {
          // If the state is the same as before, that's a bailout because we had
          // no work that expires at this time.
          resetHydrationState();
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        var root = workInProgress.stateNode;
        if ((current === null || current.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
          // If we don't have any current children this might be the first pass.
          // We always try to hydrate. If this isn't a hydration pass there won't
          // be any children to hydrate which is effectively the same thing as
          // not hydrating.

          // This is a bit of a hack. We track the host root as a placement to
          // know that we're currently in a mounting state. That way isMounted
          // works as expected. We must reset this before committing.
          // TODO: Delete this when we delete isMounted and findDOMNode.
          workInProgress.effectTag |= Placement;

          // Ensure that children mount into this root without tracking
          // side-effects. This ensures that we don't store Placement effects on
          // nodes that will be hydrated.
          workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        } else {
          // Otherwise reset hydration state in case we aborted and resumed another
          // root.
          resetHydrationState();
          reconcileChildren(current, workInProgress, nextChildren);
        }
        return workInProgress.child;
      }
      resetHydrationState();
      // If there is no update queue, that's a bailout because the root has no props.
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    function updateHostComponent(current, workInProgress, renderExpirationTime) {
      pushHostContext(workInProgress);

      if (current === null) {
        tryToClaimNextHydratableInstance(workInProgress);
      }

      var type = workInProgress.type;
      var memoizedProps = workInProgress.memoizedProps;
      var nextProps = workInProgress.pendingProps;
      var prevProps = current !== null ? current.memoizedProps : null;

      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (memoizedProps === nextProps) {
        var isHidden = workInProgress.mode & AsyncMode && shouldDeprioritizeSubtree(type, nextProps);
        if (isHidden) {
          // Before bailing out, make sure we've deprioritized a hidden component.
          workInProgress.expirationTime = Never;
        }
        if (!isHidden || renderExpirationTime !== Never) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        // If we're rendering a hidden node at hidden priority, don't bailout. The
        // parent is complete, but the children may not be.
      }

      var nextChildren = nextProps.children;
      var isDirectTextChild = shouldSetTextContent(type, nextProps);

      if (isDirectTextChild) {
        // We special case a direct text child of a host node. This is a common
        // case. We won't handle it as a reified child. We will instead handle
        // this in the host environment that also have access to this prop. That
        // avoids allocating another HostText fiber and traversing it.
        nextChildren = null;
      } else if (prevProps && shouldSetTextContent(type, prevProps)) {
        // If we're switching from a direct text child to a normal child, or to
        // empty, we need to schedule the text content to be reset.
        workInProgress.effectTag |= ContentReset;
      }

      markRef(current, workInProgress);

      // Check the host config to see if the children are offscreen/hidden.
      if (renderExpirationTime !== Never && workInProgress.mode & AsyncMode && shouldDeprioritizeSubtree(type, nextProps)) {
        // Down-prioritize the children.
        workInProgress.expirationTime = Never;
        // Bailout and come back to this fiber later.
        workInProgress.memoizedProps = nextProps;
        return null;
      }

      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function updateHostText(current, workInProgress) {
      if (current === null) {
        tryToClaimNextHydratableInstance(workInProgress);
      }
      var nextProps = workInProgress.pendingProps;
      memoizeProps(workInProgress, nextProps);
      // Nothing to do here. This is terminal. We'll do the completion step
      // immediately after.
      return null;
    }

    function mountIndeterminateComponent(current, workInProgress, renderExpirationTime) {
      !(current === null) ? invariant(false, 'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      var fn = workInProgress.type;
      var props = workInProgress.pendingProps;
      var unmaskedContext = getUnmaskedContext(workInProgress);
      var context = getMaskedContext(workInProgress, unmaskedContext);

      var value = void 0;

      {
        if (fn.prototype && typeof fn.prototype.render === 'function') {
          var componentName = getComponentName(workInProgress) || 'Unknown';

          if (!didWarnAboutBadClass[componentName]) {
            warning(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
            didWarnAboutBadClass[componentName] = true;
          }
        }

        if (workInProgress.mode & StrictMode) {
          ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, null);
        }

        ReactCurrentOwner.current = workInProgress;
        value = fn(props, context);
      }
      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;

      if (typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
        var Component = workInProgress.type;

        // Proceed under the assumption that this is a class instance
        workInProgress.tag = ClassComponent;

        workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;

        var getDerivedStateFromProps = Component.getDerivedStateFromProps;
        if (typeof getDerivedStateFromProps === 'function') {
          applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props);
        }

        // Push context providers early to prevent context stack mismatches.
        // During mounting we don't know the child context yet as the instance doesn't exist.
        // We will invalidate the child context in finishClassComponent() right after rendering.
        var hasContext = pushContextProvider(workInProgress);
        adoptClassInstance(workInProgress, value);
        mountClassInstance(workInProgress, renderExpirationTime);
        return finishClassComponent(current, workInProgress, true, hasContext, renderExpirationTime);
      } else {
        // Proceed under the assumption that this is a functional component
        workInProgress.tag = FunctionalComponent;
        {
          var _Component = workInProgress.type;

          if (_Component) {
            !!_Component.childContextTypes ? warning(false, '%s(...): childContextTypes cannot be defined on a functional component.', _Component.displayName || _Component.name || 'Component') : void 0;
          }
          if (workInProgress.ref !== null) {
            var info = '';
            var ownerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName();
            if (ownerName) {
              info += '\n\nCheck the render method of `' + ownerName + '`.';
            }

            var warningKey = ownerName || workInProgress._debugID || '';
            var debugSource = workInProgress._debugSource;
            if (debugSource) {
              warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
            }
            if (!didWarnAboutStatelessRefs[warningKey]) {
              didWarnAboutStatelessRefs[warningKey] = true;
              warning(false, 'Stateless function components cannot be given refs. ' + 'Attempts to access this ref will fail.%s%s', info, ReactDebugCurrentFiber.getCurrentFiberStackAddendum());
            }
          }

          if (typeof fn.getDerivedStateFromProps === 'function') {
            var _componentName = getComponentName(workInProgress) || 'Unknown';

            if (!didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName]) {
              warning(false, '%s: Stateless functional components do not support getDerivedStateFromProps.', _componentName);
              didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName] = true;
            }
          }
        }
        reconcileChildren(current, workInProgress, value);
        memoizeProps(workInProgress, props);
        return workInProgress.child;
      }
    }

    function updateTimeoutComponent(current, workInProgress, renderExpirationTime) {
      if (enableSuspense) {
        var nextProps = workInProgress.pendingProps;
        var prevProps = workInProgress.memoizedProps;

        var prevDidTimeout = workInProgress.memoizedState;

        // Check if we already attempted to render the normal state. If we did,
        // and we timed out, render the placeholder state.
        var alreadyCaptured = (workInProgress.effectTag & DidCapture) === NoEffect;
        var nextDidTimeout = !alreadyCaptured;

        if (hasContextChanged()) {
          // Normally we can bail out on props equality but if context has changed
          // we don't do the bailout and we have to reuse existing props instead.
        } else if (nextProps === prevProps && nextDidTimeout === prevDidTimeout) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }

        var render = nextProps.children;
        var nextChildren = render(nextDidTimeout);
        workInProgress.memoizedProps = nextProps;
        workInProgress.memoizedState = nextDidTimeout;
        reconcileChildren(current, workInProgress, nextChildren);
        return workInProgress.child;
      } else {
        return null;
      }
    }

    function updatePortalComponent(current, workInProgress, renderExpirationTime) {
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      var nextChildren = workInProgress.pendingProps;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (workInProgress.memoizedProps === nextChildren) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }

      if (current === null) {
        // Portals are special because we don't append the children during mount
        // but at commit. Therefore we need to track insertions which the normal
        // flow doesn't do during mount. This doesn't happen at the root because
        // the root always starts with a "current" with a null child.
        // TODO: Consider unifying this with how the root works.
        workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        memoizeProps(workInProgress, nextChildren);
      } else {
        reconcileChildren(current, workInProgress, nextChildren);
        memoizeProps(workInProgress, nextChildren);
      }
      return workInProgress.child;
    }

    function propagateContextChange(workInProgress, context, changedBits, renderExpirationTime) {
      var fiber = workInProgress.child;
      if (fiber !== null) {
        // Set the return pointer of the child to the work-in-progress fiber.
        fiber.return = workInProgress;
      }
      while (fiber !== null) {
        var nextFiber = void 0;
        // Visit this fiber.
        switch (fiber.tag) {
          case ContextConsumer:
            // Check if the context matches.
            var observedBits = fiber.stateNode | 0;
            if (fiber.type === context && (observedBits & changedBits) !== 0) {
              // Update the expiration time of all the ancestors, including
              // the alternates.
              var node = fiber;
              while (node !== null) {
                var alternate = node.alternate;
                if (node.expirationTime === NoWork || node.expirationTime > renderExpirationTime) {
                  node.expirationTime = renderExpirationTime;
                  if (alternate !== null && (alternate.expirationTime === NoWork || alternate.expirationTime > renderExpirationTime)) {
                    alternate.expirationTime = renderExpirationTime;
                  }
                } else if (alternate !== null && (alternate.expirationTime === NoWork || alternate.expirationTime > renderExpirationTime)) {
                  alternate.expirationTime = renderExpirationTime;
                } else {
                  // Neither alternate was updated, which means the rest of the
                  // ancestor path already has sufficient priority.
                  break;
                }
                node = node.return;
              }
              // Don't scan deeper than a matching consumer. When we render the
              // consumer, we'll continue scanning from that point. This way the
              // scanning work is time-sliced.
              nextFiber = null;
            } else {
              // Traverse down.
              nextFiber = fiber.child;
            }
            break;
          case ContextProvider:
            // Don't scan deeper if this is a matching provider
            nextFiber = fiber.type === workInProgress.type ? null : fiber.child;
            break;
          default:
            // Traverse down.
            nextFiber = fiber.child;
            break;
        }
        if (nextFiber !== null) {
          // Set the return pointer of the child to the work-in-progress fiber.
          nextFiber.return = fiber;
        } else {
          // No child. Traverse to next sibling.
          nextFiber = fiber;
          while (nextFiber !== null) {
            if (nextFiber === workInProgress) {
              // We're back to the root of this subtree. Exit.
              nextFiber = null;
              break;
            }
            var sibling = nextFiber.sibling;
            if (sibling !== null) {
              // Set the return pointer of the sibling to the work-in-progress fiber.
              sibling.return = nextFiber.return;
              nextFiber = sibling;
              break;
            }
            // No more siblings. Traverse up.
            nextFiber = nextFiber.return;
          }
        }
        fiber = nextFiber;
      }
    }

    function updateContextProvider(current, workInProgress, renderExpirationTime) {
      var providerType = workInProgress.type;
      var context = providerType._context;

      var newProps = workInProgress.pendingProps;
      var oldProps = workInProgress.memoizedProps;
      var canBailOnProps = true;

      if (hasContextChanged()) {
        canBailOnProps = false;
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (oldProps === newProps) {
        workInProgress.stateNode = 0;
        pushProvider(workInProgress);
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }

      var newValue = newProps.value;
      workInProgress.memoizedProps = newProps;

      {
        var providerPropTypes = workInProgress.type.propTypes;

        if (providerPropTypes) {
          checkPropTypes(providerPropTypes, newProps, 'prop', 'Context.Provider', getCurrentFiberStackAddendum$6);
        }
      }

      var changedBits = void 0;
      if (oldProps === null) {
        // Initial render
        changedBits = MAX_SIGNED_31_BIT_INT;
      } else {
        if (oldProps.value === newProps.value) {
          // No change. Bailout early if children are the same.
          if (oldProps.children === newProps.children && canBailOnProps) {
            workInProgress.stateNode = 0;
            pushProvider(workInProgress);
            return bailoutOnAlreadyFinishedWork(current, workInProgress);
          }
          changedBits = 0;
        } else {
          var oldValue = oldProps.value;
          // Use Object.is to compare the new context value to the old value.
          // Inlined Object.is polyfill.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
          if (oldValue === newValue && (oldValue !== 0 || 1 / oldValue === 1 / newValue) || oldValue !== oldValue && newValue !== newValue // eslint-disable-line no-self-compare
          ) {
              // No change. Bailout early if children are the same.
              if (oldProps.children === newProps.children && canBailOnProps) {
                workInProgress.stateNode = 0;
                pushProvider(workInProgress);
                return bailoutOnAlreadyFinishedWork(current, workInProgress);
              }
              changedBits = 0;
            } else {
            changedBits = typeof context._calculateChangedBits === 'function' ? context._calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
            {
              !((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits) ? warning(false, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits) : void 0;
            }
            changedBits |= 0;

            if (changedBits === 0) {
              // No change. Bailout early if children are the same.
              if (oldProps.children === newProps.children && canBailOnProps) {
                workInProgress.stateNode = 0;
                pushProvider(workInProgress);
                return bailoutOnAlreadyFinishedWork(current, workInProgress);
              }
            } else {
              propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
            }
          }
        }
      }

      workInProgress.stateNode = changedBits;
      pushProvider(workInProgress);

      var newChildren = newProps.children;
      reconcileChildren(current, workInProgress, newChildren);
      return workInProgress.child;
    }

    function updateContextConsumer(current, workInProgress, renderExpirationTime) {
      var context = workInProgress.type;
      var newProps = workInProgress.pendingProps;
      var oldProps = workInProgress.memoizedProps;

      var newValue = getContextCurrentValue(context);
      var changedBits = getContextChangedBits(context);

      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (changedBits === 0 && oldProps === newProps) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      workInProgress.memoizedProps = newProps;

      var observedBits = newProps.unstable_observedBits;
      if (observedBits === undefined || observedBits === null) {
        // Subscribe to all changes by default
        observedBits = MAX_SIGNED_31_BIT_INT;
      }
      // Store the observedBits on the fiber's stateNode for quick access.
      workInProgress.stateNode = observedBits;

      if ((changedBits & observedBits) !== 0) {
        // Context change propagation stops at matching consumers, for time-
        // slicing. Continue the propagation here.
        propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
      } else if (oldProps === newProps) {
        // Skip over a memoized parent with a bitmask bailout even
        // if we began working on it because of a deeper matching child.
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      // There is no bailout on `children` equality because we expect people
      // to often pass a bound method as a child, but it may reference
      // `this.state` or `this.props` (and thus needs to re-render on `setState`).

      var render = newProps.children;

      {
        !(typeof render === 'function') ? warning(false, 'A context consumer was rendered with multiple children, or a child ' + "that isn't a function. A context consumer expects a single child " + 'that is a function. If you did pass a function, make sure there ' + 'is no trailing or leading whitespace around it.') : void 0;
      }

      var newChildren = void 0;
      {
        ReactCurrentOwner.current = workInProgress;
        ReactDebugCurrentFiber.setCurrentPhase('render');
        newChildren = render(newValue);
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }

      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;
      reconcileChildren(current, workInProgress, newChildren);
      return workInProgress.child;
    }

    /*
      function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
        let child = firstChild;
        do {
          // Ensure that the first and last effect of the parent corresponds
          // to the children's first and last effect.
          if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = child.firstEffect;
          }
          if (child.lastEffect) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = child.firstEffect;
            }
            returnFiber.lastEffect = child.lastEffect;
          }
        } while (child = child.sibling);
      }
      */

    function bailoutOnAlreadyFinishedWork(current, workInProgress) {
      cancelWorkTimer(workInProgress);

      if (enableProfilerTimer) {
        // Don't update "base" render times for bailouts.
        stopBaseRenderTimerIfRunning();
      }

      // TODO: We should ideally be able to bail out early if the children have no
      // more work to do. However, since we don't have a separation of this
      // Fiber's priority and its children yet - we don't know without doing lots
      // of the same work we do anyway. Once we have that separation we can just
      // bail out here if the children has no more work at this priority level.
      // if (workInProgress.priorityOfChildren <= priorityLevel) {
      //   // If there are side-effects in these children that have not yet been
      //   // committed we need to ensure that they get properly transferred up.
      //   if (current && current.child !== workInProgress.child) {
      //     reuseChildrenEffects(workInProgress, child);
      //   }
      //   return null;
      // }

      cloneChildFibers(current, workInProgress);
      return workInProgress.child;
    }

    function bailoutOnLowPriority(current, workInProgress) {
      cancelWorkTimer(workInProgress);

      if (enableProfilerTimer) {
        // Don't update "base" render times for bailouts.
        stopBaseRenderTimerIfRunning();
      }

      // TODO: Handle HostComponent tags here as well and call pushHostContext()?
      // See PR 8590 discussion for context
      switch (workInProgress.tag) {
        case HostRoot:
          pushHostRootContext(workInProgress);
          break;
        case ClassComponent:
          pushContextProvider(workInProgress);
          break;
        case HostPortal:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case ContextProvider:
          pushProvider(workInProgress);
          break;
      }
      // TODO: What if this is currently in progress?
      // How can that happen? How is this not being cloned?
      return null;
    }

    // TODO: Delete memoizeProps/State and move to reconcile/bailout instead
    function memoizeProps(workInProgress, nextProps) {
      workInProgress.memoizedProps = nextProps;
    }

    function memoizeState(workInProgress, nextState) {
      workInProgress.memoizedState = nextState;
      // Don't reset the updateQueue, in case there are pending updates. Resetting
      // is handled by processUpdateQueue.
    }

    function beginWork(current, workInProgress, renderExpirationTime) {
      if (enableProfilerTimer) {
        if (workInProgress.mode & ProfileMode) {
          markActualRenderTimeStarted(workInProgress);
        }
      }

      if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
        return bailoutOnLowPriority(current, workInProgress);
      }

      switch (workInProgress.tag) {
        case IndeterminateComponent:
          return mountIndeterminateComponent(current, workInProgress, renderExpirationTime);
        case FunctionalComponent:
          return updateFunctionalComponent(current, workInProgress);
        case ClassComponent:
          return updateClassComponent(current, workInProgress, renderExpirationTime);
        case HostRoot:
          return updateHostRoot(current, workInProgress, renderExpirationTime);
        case HostComponent:
          return updateHostComponent(current, workInProgress, renderExpirationTime);
        case HostText:
          return updateHostText(current, workInProgress);
        case TimeoutComponent:
          return updateTimeoutComponent(current, workInProgress, renderExpirationTime);
        case HostPortal:
          return updatePortalComponent(current, workInProgress, renderExpirationTime);
        case ForwardRef:
          return updateForwardRef(current, workInProgress);
        case Fragment:
          return updateFragment(current, workInProgress);
        case Mode:
          return updateMode(current, workInProgress);
        case Profiler:
          return updateProfiler(current, workInProgress);
        case ContextProvider:
          return updateContextProvider(current, workInProgress, renderExpirationTime);
        case ContextConsumer:
          return updateContextConsumer(current, workInProgress, renderExpirationTime);
        default:
          invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
      }
    }

    function markUpdate(workInProgress) {
      // Tag the fiber with an update effect. This turns a Placement into
      // a PlacementAndUpdate.
      workInProgress.effectTag |= Update;
    }

    function markRef$1(workInProgress) {
      workInProgress.effectTag |= Ref;
    }

    function appendAllChildren(parent, workInProgress) {
      // We only have the top Fiber that was created but we need recurse down its
      // children to find all the terminal nodes.
      var node = workInProgress.child;
      while (node !== null) {
        if (node.tag === HostComponent || node.tag === HostText) {
          appendInitialChild(parent, node.stateNode);
        } else if (node.tag === HostPortal) {
          // If we have a portal child, then we don't want to traverse
          // down its children. Instead, we'll get insertions from each child in
          // the portal directly.
        } else if (node.child !== null) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === workInProgress) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === workInProgress) {
            return;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    var updateHostContainer = void 0;
    var updateHostComponent$1 = void 0;
    var updateHostText$1 = void 0;
    if (supportsMutation) {
      // Mutation mode

      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
        // TODO: Type this specific to this type of component.
        workInProgress.updateQueue = updatePayload;
        // If the update payload indicates that there is a change or if there
        // is a new ref we mark this as an update. All the work is done in commitWork.
        if (updatePayload) {
          markUpdate(workInProgress);
        }
      };
      updateHostText$1 = function (current, workInProgress, oldText, newText) {
        // If the text differs, mark it as an update. All the work in done in commitWork.
        if (oldText !== newText) {
          markUpdate(workInProgress);
        }
      };
    } else if (supportsPersistence) {
      // Persistent host tree mode

      // An unfortunate fork of appendAllChildren because we have two different parent types.
      var appendAllChildrenToContainer = function (containerChildSet, workInProgress) {
        // We only have the top Fiber that was created but we need recurse down its
        // children to find all the terminal nodes.
        var node = workInProgress.child;
        while (node !== null) {
          if (node.tag === HostComponent || node.tag === HostText) {
            appendChildToContainerChildSet(containerChildSet, node.stateNode);
          } else if (node.tag === HostPortal) {
            // If we have a portal child, then we don't want to traverse
            // down its children. Instead, we'll get insertions from each child in
            // the portal directly.
          } else if (node.child !== null) {
            node.child.return = node;
            node = node.child;
            continue;
          }
          if (node === workInProgress) {
            return;
          }
          while (node.sibling === null) {
            if (node.return === null || node.return === workInProgress) {
              return;
            }
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
      };
      updateHostContainer = function (workInProgress) {
        var portalOrRoot = workInProgress.stateNode;
        var childrenUnchanged = workInProgress.firstEffect === null;
        if (childrenUnchanged) {
          // No changes, just reuse the existing instance.
        } else {
          var container = portalOrRoot.containerInfo;
          var newChildSet = createContainerChildSet(container);
          // If children might have changed, we have to add them all to the set.
          appendAllChildrenToContainer(newChildSet, workInProgress);
          portalOrRoot.pendingChildren = newChildSet;
          // Schedule an update on the container to swap out the container.
          markUpdate(workInProgress);
          finalizeContainerChildren(container, newChildSet);
        }
      };
      updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
        // If there are no effects associated with this node, then none of our children had any updates.
        // This guarantees that we can reuse all of them.
        var childrenUnchanged = workInProgress.firstEffect === null;
        var currentInstance = current.stateNode;
        if (childrenUnchanged && updatePayload === null) {
          // No changes, just reuse the existing instance.
          // Note that this might release a previous clone.
          workInProgress.stateNode = currentInstance;
        } else {
          var recyclableInstance = workInProgress.stateNode;
          var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);
          if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext)) {
            markUpdate(workInProgress);
          }
          workInProgress.stateNode = newInstance;
          if (childrenUnchanged) {
            // If there are no other effects in this tree, we need to flag this node as having one.
            // Even though we're not going to use it for anything.
            // Otherwise parents won't know that there are new children to propagate upwards.
            markUpdate(workInProgress);
          } else {
            // If children might have changed, we have to add them all to the set.
            appendAllChildren(newInstance, workInProgress);
          }
        }
      };
      updateHostText$1 = function (current, workInProgress, oldText, newText) {
        if (oldText !== newText) {
          // If the text content differs, we'll create a new text instance for it.
          var rootContainerInstance = getRootHostContainer();
          var currentHostContext = getHostContext();
          workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress);
          // We'll have to mark it as having an effect, even though we won't use the effect for anything.
          // This lets the parents know that at least one of their children has changed.
          markUpdate(workInProgress);
        }
      };
    } else {
      // No host operations
      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
        // Noop
      };
      updateHostText$1 = function (current, workInProgress, oldText, newText) {
        // Noop
      };
    }

    function completeWork(current, workInProgress, renderExpirationTime) {
      var newProps = workInProgress.pendingProps;

      if (enableProfilerTimer) {
        if (workInProgress.mode & ProfileMode) {
          recordElapsedActualRenderTime(workInProgress);
        }
      }

      switch (workInProgress.tag) {
        case FunctionalComponent:
          return null;
        case ClassComponent:
          {
            // We are leaving this subtree, so pop context if any.
            popContextProvider(workInProgress);
            return null;
          }
        case HostRoot:
          {
            popHostContainer(workInProgress);
            popTopLevelContextObject(workInProgress);
            var fiberRoot = workInProgress.stateNode;
            if (fiberRoot.pendingContext) {
              fiberRoot.context = fiberRoot.pendingContext;
              fiberRoot.pendingContext = null;
            }
            if (current === null || current.child === null) {
              // If we hydrated, pop so that we can delete any remaining children
              // that weren't hydrated.
              popHydrationState(workInProgress);
              // This resets the hacky state to fix isMounted before committing.
              // TODO: Delete this when we delete isMounted and findDOMNode.
              workInProgress.effectTag &= ~Placement;
            }
            updateHostContainer(workInProgress);
            return null;
          }
        case HostComponent:
          {
            popHostContext(workInProgress);
            var rootContainerInstance = getRootHostContainer();
            var type = workInProgress.type;
            if (current !== null && workInProgress.stateNode != null) {
              // If we have an alternate, that means this is an update and we need to
              // schedule a side-effect to do the updates.
              var oldProps = current.memoizedProps;
              // If we get updated because one of our children updated, we don't
              // have newProps so we'll have to reuse them.
              // TODO: Split the update API as separate for the props vs. children.
              // Even better would be if children weren't special cased at all tho.
              var instance = workInProgress.stateNode;
              var currentHostContext = getHostContext();
              // TODO: Experiencing an error where oldProps is null. Suggests a host
              // component is hitting the resume path. Figure out why. Possibly
              // related to `hidden`.
              var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);

              updateHostComponent$1(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext);

              if (current.ref !== workInProgress.ref) {
                markRef$1(workInProgress);
              }
            } else {
              if (!newProps) {
                !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
                // This can happen when we abort work.
                return null;
              }

              var _currentHostContext = getHostContext();
              // TODO: Move createInstance to beginWork and keep it on a context
              // "stack" as the parent. Then append children as we go in beginWork
              // or completeWork depending on we want to add then top->down or
              // bottom->up. Top->down is faster in IE11.
              var wasHydrated = popHydrationState(workInProgress);
              if (wasHydrated) {
                // TODO: Move this and createInstance step into the beginPhase
                // to consolidate.
                if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext)) {
                  // If changes to the hydrated node needs to be applied at the
                  // commit-phase we mark this as such.
                  markUpdate(workInProgress);
                }
              } else {
                var _instance = createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);

                appendAllChildren(_instance, workInProgress);

                // Certain renderers require commit-time effects for initial mount.
                // (eg DOM renderer supports auto-focus for certain elements).
                // Make sure such renderers get scheduled for later work.
                if (finalizeInitialChildren(_instance, type, newProps, rootContainerInstance, _currentHostContext)) {
                  markUpdate(workInProgress);
                }
                workInProgress.stateNode = _instance;
              }

              if (workInProgress.ref !== null) {
                // If there is a ref on a host node we need to schedule a callback
                markRef$1(workInProgress);
              }
            }
            return null;
          }
        case HostText:
          {
            var newText = newProps;
            if (current && workInProgress.stateNode != null) {
              var oldText = current.memoizedProps;
              // If we have an alternate, that means this is an update and we need
              // to schedule a side-effect to do the updates.
              updateHostText$1(current, workInProgress, oldText, newText);
            } else {
              if (typeof newText !== 'string') {
                !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
                // This can happen when we abort work.
                return null;
              }
              var _rootContainerInstance = getRootHostContainer();
              var _currentHostContext2 = getHostContext();
              var _wasHydrated = popHydrationState(workInProgress);
              if (_wasHydrated) {
                if (prepareToHydrateHostTextInstance(workInProgress)) {
                  markUpdate(workInProgress);
                }
              } else {
                workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
              }
            }
            return null;
          }
        case ForwardRef:
          return null;
        case TimeoutComponent:
          return null;
        case Fragment:
          return null;
        case Mode:
          return null;
        case Profiler:
          return null;
        case HostPortal:
          popHostContainer(workInProgress);
          updateHostContainer(workInProgress);
          return null;
        case ContextProvider:
          // Pop provider fiber
          popProvider(workInProgress);
          return null;
        case ContextConsumer:
          return null;
        // Error cases
        case IndeterminateComponent:
          invariant(false, 'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');
        // eslint-disable-next-line no-fallthrough
        default:
          invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
      }
    }

    // This module is forked in different environments.
    // By default, return `true` to log errors to the console.
    // Forks can return `false` if this isn't desirable.
    function showErrorDialog(capturedError) {
      return true;
    }

    function logCapturedError(capturedError) {
      var logError = showErrorDialog(capturedError);

      // Allow injected showErrorDialog() to prevent default console.error logging.
      // This enables renderers like ReactNative to better manage redbox behavior.
      if (logError === false) {
        return;
      }

      var error = capturedError.error;
      var suppressLogging = error && error.suppressReactErrorLogging;
      if (suppressLogging) {
        return;
      }

      {
        var componentName = capturedError.componentName,
            componentStack = capturedError.componentStack,
            errorBoundaryName = capturedError.errorBoundaryName,
            errorBoundaryFound = capturedError.errorBoundaryFound,
            willRetry = capturedError.willRetry;

        var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

        var errorBoundaryMessage = void 0;
        // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
        if (errorBoundaryFound && errorBoundaryName) {
          if (willRetry) {
            errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
          } else {
            errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
          }
        } else {
          errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';
        }
        var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

        // In development, we provide our own message with just the component stack.
        // We don't include the original error message and JS stack because the browser
        // has already printed it. Even if the application swallows the error, it is still
        // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
        console.error(combinedMessage);
      }
    }

    var invokeGuardedCallback$3 = ReactErrorUtils.invokeGuardedCallback;
    var hasCaughtError$1 = ReactErrorUtils.hasCaughtError;
    var clearCaughtError$1 = ReactErrorUtils.clearCaughtError;

    var didWarnAboutUndefinedSnapshotBeforeUpdate = null;
    {
      didWarnAboutUndefinedSnapshotBeforeUpdate = new Set();
    }

    function logError(boundary, errorInfo) {
      var source = errorInfo.source;
      var stack = errorInfo.stack;
      if (stack === null && source !== null) {
        stack = getStackAddendumByWorkInProgressFiber(source);
      }

      var capturedError = {
        componentName: source !== null ? getComponentName(source) : null,
        componentStack: stack !== null ? stack : '',
        error: errorInfo.value,
        errorBoundary: null,
        errorBoundaryName: null,
        errorBoundaryFound: false,
        willRetry: false
      };

      if (boundary !== null && boundary.tag === ClassComponent) {
        capturedError.errorBoundary = boundary.stateNode;
        capturedError.errorBoundaryName = getComponentName(boundary);
        capturedError.errorBoundaryFound = true;
        capturedError.willRetry = true;
      }

      try {
        logCapturedError(capturedError);
      } catch (e) {
        // Prevent cycle if logCapturedError() throws.
        // A cycle may still occur if logCapturedError renders a component that throws.
        var suppressLogging = e && e.suppressReactErrorLogging;
        if (!suppressLogging) {
          console.error(e);
        }
      }
    }

    var callComponentWillUnmountWithTimer = function (current, instance) {
      startPhaseTimer(current, 'componentWillUnmount');
      instance.props = current.memoizedProps;
      instance.state = current.memoizedState;
      instance.componentWillUnmount();
      stopPhaseTimer();
    };

    // Capture errors so they don't interrupt unmounting.
    function safelyCallComponentWillUnmount(current, instance) {
      {
        invokeGuardedCallback$3(null, callComponentWillUnmountWithTimer, null, current, instance);
        if (hasCaughtError$1()) {
          var unmountError = clearCaughtError$1();
          captureCommitPhaseError(current, unmountError);
        }
      }
    }

    function safelyDetachRef(current) {
      var ref = current.ref;
      if (ref !== null) {
        if (typeof ref === 'function') {
          {
            invokeGuardedCallback$3(null, ref, null, null);
            if (hasCaughtError$1()) {
              var refError = clearCaughtError$1();
              captureCommitPhaseError(current, refError);
            }
          }
        } else {
          ref.current = null;
        }
      }
    }

    function commitBeforeMutationLifeCycles(current, finishedWork) {
      switch (finishedWork.tag) {
        case ClassComponent:
          {
            if (finishedWork.effectTag & Snapshot) {
              if (current !== null) {
                var prevProps = current.memoizedProps;
                var prevState = current.memoizedState;
                startPhaseTimer(finishedWork, 'getSnapshotBeforeUpdate');
                var instance = finishedWork.stateNode;
                instance.props = finishedWork.memoizedProps;
                instance.state = finishedWork.memoizedState;
                var snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState);
                {
                  var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
                  if (snapshot === undefined && !didWarnSet.has(finishedWork.type)) {
                    didWarnSet.add(finishedWork.type);
                    warning(false, '%s.getSnapshotBeforeUpdate(): A snapshot value (or null) ' + 'must be returned. You have returned undefined.', getComponentName(finishedWork));
                  }
                }
                instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                stopPhaseTimer();
              }
            }
            return;
          }
        case HostRoot:
        case HostComponent:
        case HostText:
        case HostPortal:
          // Nothing to do for these component types
          return;
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function commitLifeCycles(finishedRoot, current, finishedWork, currentTime, committedExpirationTime) {
      switch (finishedWork.tag) {
        case ClassComponent:
          {
            var instance = finishedWork.stateNode;
            if (finishedWork.effectTag & Update) {
              if (current === null) {
                startPhaseTimer(finishedWork, 'componentDidMount');
                instance.props = finishedWork.memoizedProps;
                instance.state = finishedWork.memoizedState;
                instance.componentDidMount();
                stopPhaseTimer();
              } else {
                var prevProps = current.memoizedProps;
                var prevState = current.memoizedState;
                startPhaseTimer(finishedWork, 'componentDidUpdate');
                instance.props = finishedWork.memoizedProps;
                instance.state = finishedWork.memoizedState;
                instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
                stopPhaseTimer();
              }
            }
            var updateQueue = finishedWork.updateQueue;
            if (updateQueue !== null) {
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              commitUpdateQueue(finishedWork, updateQueue, instance, committedExpirationTime);
            }
            return;
          }
        case HostRoot:
          {
            var _updateQueue = finishedWork.updateQueue;
            if (_updateQueue !== null) {
              var _instance = null;
              if (finishedWork.child !== null) {
                switch (finishedWork.child.tag) {
                  case HostComponent:
                    _instance = getPublicInstance(finishedWork.child.stateNode);
                    break;
                  case ClassComponent:
                    _instance = finishedWork.child.stateNode;
                    break;
                }
              }
              commitUpdateQueue(finishedWork, _updateQueue, _instance, committedExpirationTime);
            }
            return;
          }
        case HostComponent:
          {
            var _instance2 = finishedWork.stateNode;

            // Renderers may schedule work to be done after host components are mounted
            // (eg DOM renderer may schedule auto-focus for inputs and form controls).
            // These effects should only be committed when components are first mounted,
            // aka when there is no current/alternate.
            if (current === null && finishedWork.effectTag & Update) {
              var type = finishedWork.type;
              var props = finishedWork.memoizedProps;
              commitMount(_instance2, type, props, finishedWork);
            }

            return;
          }
        case HostText:
          {
            // We have no life-cycles associated with text.
            return;
          }
        case HostPortal:
          {
            // We have no life-cycles associated with portals.
            return;
          }
        case Profiler:
          {
            // We have no life-cycles associated with Profiler.
            return;
          }
        case TimeoutComponent:
          {
            // We have no life-cycles associated with Timeouts.
            return;
          }
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function commitAttachRef(finishedWork) {
      var ref = finishedWork.ref;
      if (ref !== null) {
        var instance = finishedWork.stateNode;
        var instanceToUse = void 0;
        switch (finishedWork.tag) {
          case HostComponent:
            instanceToUse = getPublicInstance(instance);
            break;
          default:
            instanceToUse = instance;
        }
        if (typeof ref === 'function') {
          ref(instanceToUse);
        } else {
          {
            if (!ref.hasOwnProperty('current')) {
              warning(false, 'Unexpected ref object provided for %s. ' + 'Use either a ref-setter function or React.createRef().%s', getComponentName(finishedWork), getStackAddendumByWorkInProgressFiber(finishedWork));
            }
          }

          ref.current = instanceToUse;
        }
      }
    }

    function commitDetachRef(current) {
      var currentRef = current.ref;
      if (currentRef !== null) {
        if (typeof currentRef === 'function') {
          currentRef(null);
        } else {
          currentRef.current = null;
        }
      }
    }

    // User-originating errors (lifecycles and refs) should not interrupt
    // deletion, so don't let them throw. Host-originating errors should
    // interrupt deletion, so it's okay
    function commitUnmount(current) {
      if (typeof onCommitUnmount === 'function') {
        onCommitUnmount(current);
      }

      switch (current.tag) {
        case ClassComponent:
          {
            safelyDetachRef(current);
            var instance = current.stateNode;
            if (typeof instance.componentWillUnmount === 'function') {
              safelyCallComponentWillUnmount(current, instance);
            }
            return;
          }
        case HostComponent:
          {
            safelyDetachRef(current);
            return;
          }
        case HostPortal:
          {
            // TODO: this is recursive.
            // We are also not using this parent because
            // the portal will get pushed immediately.
            if (supportsMutation) {
              unmountHostComponents(current);
            } else if (supportsPersistence) {
              emptyPortalContainer(current);
            }
            return;
          }
      }
    }

    function commitNestedUnmounts(root) {
      // While we're inside a removed host node we don't want to call
      // removeChild on the inner nodes because they're removed by the top
      // call anyway. We also want to call componentWillUnmount on all
      // composites before this host node is removed from the tree. Therefore
      var node = root;
      while (true) {
        commitUnmount(node);
        // Visit children because they may contain more composite or host nodes.
        // Skip portals because commitUnmount() currently visits them recursively.
        if (node.child !== null && (
        // If we use mutation we drill down into portals using commitUnmount above.
        // If we don't use mutation we drill down into portals here instead.
        !supportsMutation || node.tag !== HostPortal)) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === root) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === root) {
            return;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    function detachFiber(current) {
      // Cut off the return pointers to disconnect it from the tree. Ideally, we
      // should clear the child pointer of the parent alternate to let this
      // get GC:ed but we don't know which for sure which parent is the current
      // one so we'll settle for GC:ing the subtree of this child. This child
      // itself will be GC:ed when the parent updates the next time.
      current.return = null;
      current.child = null;
      if (current.alternate) {
        current.alternate.child = null;
        current.alternate.return = null;
      }
    }

    function emptyPortalContainer(current) {
      if (!supportsPersistence) {
        return;
      }

      var portal = current.stateNode;
      var containerInfo = portal.containerInfo;

      var emptyChildSet = createContainerChildSet(containerInfo);
      replaceContainerChildren(containerInfo, emptyChildSet);
    }

    function commitContainer(finishedWork) {
      if (!supportsPersistence) {
        return;
      }

      switch (finishedWork.tag) {
        case ClassComponent:
          {
            return;
          }
        case HostComponent:
          {
            return;
          }
        case HostText:
          {
            return;
          }
        case HostRoot:
        case HostPortal:
          {
            var portalOrRoot = finishedWork.stateNode;
            var containerInfo = portalOrRoot.containerInfo,
                _pendingChildren = portalOrRoot.pendingChildren;

            replaceContainerChildren(containerInfo, _pendingChildren);
            return;
          }
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function getHostParentFiber(fiber) {
      var parent = fiber.return;
      while (parent !== null) {
        if (isHostParent(parent)) {
          return parent;
        }
        parent = parent.return;
      }
      invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
    }

    function isHostParent(fiber) {
      return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
    }

    function getHostSibling(fiber) {
      // We're going to search forward into the tree until we find a sibling host
      // node. Unfortunately, if multiple insertions are done in a row we have to
      // search past them. This leads to exponential search for the next sibling.
      var node = fiber;
      siblings: while (true) {
        // If we didn't find anything, let's try the next sibling.
        while (node.sibling === null) {
          if (node.return === null || isHostParent(node.return)) {
            // If we pop out of the root or hit the parent the fiber we are the
            // last sibling.
            return null;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
        while (node.tag !== HostComponent && node.tag !== HostText) {
          // If it is not host node and, we might have a host node inside it.
          // Try to search down until we find one.
          if (node.effectTag & Placement) {
            // If we don't have a child, try the siblings instead.
            continue siblings;
          }
          // If we don't have a child, try the siblings instead.
          // We also skip portals because they are not part of this host tree.
          if (node.child === null || node.tag === HostPortal) {
            continue siblings;
          } else {
            node.child.return = node;
            node = node.child;
          }
        }
        // Check if this host node is stable or about to be placed.
        if (!(node.effectTag & Placement)) {
          // Found it!
          return node.stateNode;
        }
      }
    }

    function commitPlacement(finishedWork) {
      if (!supportsMutation) {
        return;
      }

      // Recursively insert all host nodes into the parent.
      var parentFiber = getHostParentFiber(finishedWork);
      var parent = void 0;
      var isContainer = void 0;
      switch (parentFiber.tag) {
        case HostComponent:
          parent = parentFiber.stateNode;
          isContainer = false;
          break;
        case HostRoot:
          parent = parentFiber.stateNode.containerInfo;
          isContainer = true;
          break;
        case HostPortal:
          parent = parentFiber.stateNode.containerInfo;
          isContainer = true;
          break;
        default:
          invariant(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
      }
      if (parentFiber.effectTag & ContentReset) {
        // Reset the text content of the parent before doing any insertions
        resetTextContent(parent);
        // Clear ContentReset from the effect tag
        parentFiber.effectTag &= ~ContentReset;
      }

      var before = getHostSibling(finishedWork);
      // We only have the top Fiber that was inserted but we need recurse down its
      // children to find all the terminal nodes.
      var node = finishedWork;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          if (before) {
            if (isContainer) {
              insertInContainerBefore(parent, node.stateNode, before);
            } else {
              insertBefore(parent, node.stateNode, before);
            }
          } else {
            if (isContainer) {
              appendChildToContainer(parent, node.stateNode);
            } else {
              appendChild(parent, node.stateNode);
            }
          }
        } else if (node.tag === HostPortal) {
          // If the insertion itself is a portal, then we don't want to traverse
          // down its children. Instead, we'll get insertions from each child in
          // the portal directly.
        } else if (node.child !== null) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === finishedWork) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === finishedWork) {
            return;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    function unmountHostComponents(current) {
      // We only have the top Fiber that was inserted but we need recurse down its
      var node = current;

      // Each iteration, currentParent is populated with node's host parent if not
      // currentParentIsValid.
      var currentParentIsValid = false;
      var currentParent = void 0;
      var currentParentIsContainer = void 0;

      while (true) {
        if (!currentParentIsValid) {
          var parent = node.return;
          findParent: while (true) {
            !(parent !== null) ? invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            switch (parent.tag) {
              case HostComponent:
                currentParent = parent.stateNode;
                currentParentIsContainer = false;
                break findParent;
              case HostRoot:
                currentParent = parent.stateNode.containerInfo;
                currentParentIsContainer = true;
                break findParent;
              case HostPortal:
                currentParent = parent.stateNode.containerInfo;
                currentParentIsContainer = true;
                break findParent;
            }
            parent = parent.return;
          }
          currentParentIsValid = true;
        }

        if (node.tag === HostComponent || node.tag === HostText) {
          commitNestedUnmounts(node);
          // After all the children have unmounted, it is now safe to remove the
          // node from the tree.
          if (currentParentIsContainer) {
            removeChildFromContainer(currentParent, node.stateNode);
          } else {
            removeChild(currentParent, node.stateNode);
          }
          // Don't visit children because we already visited them.
        } else if (node.tag === HostPortal) {
          // When we go into a portal, it becomes the parent to remove from.
          // We will reassign it back when we pop the portal on the way up.
          currentParent = node.stateNode.containerInfo;
          // Visit children because portals might contain host components.
          if (node.child !== null) {
            node.child.return = node;
            node = node.child;
            continue;
          }
        } else {
          commitUnmount(node);
          // Visit children because we may find more host components below.
          if (node.child !== null) {
            node.child.return = node;
            node = node.child;
            continue;
          }
        }
        if (node === current) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === current) {
            return;
          }
          node = node.return;
          if (node.tag === HostPortal) {
            // When we go out of the portal, we need to restore the parent.
            // Since we don't keep a stack of them, we will search for it.
            currentParentIsValid = false;
          }
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    function commitDeletion(current) {
      if (supportsMutation) {
        // Recursively delete all host nodes from the parent.
        // Detach refs and call componentWillUnmount() on the whole subtree.
        unmountHostComponents(current);
      } else {
        // Detach refs and call componentWillUnmount() on the whole subtree.
        commitNestedUnmounts(current);
      }
      detachFiber(current);
    }

    function commitWork(current, finishedWork) {
      if (!supportsMutation) {
        commitContainer(finishedWork);
        return;
      }

      switch (finishedWork.tag) {
        case ClassComponent:
          {
            return;
          }
        case HostComponent:
          {
            var instance = finishedWork.stateNode;
            if (instance != null) {
              // Commit the work prepared earlier.
              var newProps = finishedWork.memoizedProps;
              // For hydration we reuse the update path but we treat the oldProps
              // as the newProps. The updatePayload will contain the real change in
              // this case.
              var oldProps = current !== null ? current.memoizedProps : newProps;
              var type = finishedWork.type;
              // TODO: Type the updateQueue to be specific to host components.
              var updatePayload = finishedWork.updateQueue;
              finishedWork.updateQueue = null;
              if (updatePayload !== null) {
                commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
              }
            }
            return;
          }
        case HostText:
          {
            !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            var textInstance = finishedWork.stateNode;
            var newText = finishedWork.memoizedProps;
            // For hydration we reuse the update path but we treat the oldProps
            // as the newProps. The updatePayload will contain the real change in
            // this case.
            var oldText = current !== null ? current.memoizedProps : newText;
            commitTextUpdate(textInstance, oldText, newText);
            return;
          }
        case HostRoot:
          {
            return;
          }
        case Profiler:
          {
            if (enableProfilerTimer) {
              var onRender = finishedWork.memoizedProps.onRender;
              onRender(finishedWork.memoizedProps.id, current === null ? 'mount' : 'update', finishedWork.actualDuration, finishedWork.treeBaseTime, finishedWork.actualStartTime, getCommitTime());
            }
            return;
          }
        case TimeoutComponent:
          {
            return;
          }
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function commitResetTextContent(current) {
      if (!supportsMutation) {
        return;
      }
      resetTextContent(current.stateNode);
    }

    function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
      var update = createUpdate(expirationTime);
      // Unmount the root by rendering null.
      update.tag = CaptureUpdate;
      // Caution: React DevTools currently depends on this property
      // being called "element".
      update.payload = { element: null };
      var error = errorInfo.value;
      update.callback = function () {
        onUncaughtError(error);
        logError(fiber, errorInfo);
      };
      return update;
    }

    function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
      var update = createUpdate(expirationTime);
      update.tag = CaptureUpdate;
      var getDerivedStateFromCatch = fiber.type.getDerivedStateFromCatch;
      if (enableGetDerivedStateFromCatch && typeof getDerivedStateFromCatch === 'function') {
        var error = errorInfo.value;
        update.payload = function () {
          return getDerivedStateFromCatch(error);
        };
      }

      var inst = fiber.stateNode;
      if (inst !== null && typeof inst.componentDidCatch === 'function') {
        update.callback = function callback() {
          if (!enableGetDerivedStateFromCatch || getDerivedStateFromCatch !== 'function') {
            // To preserve the preexisting retry behavior of error boundaries,
            // we keep track of which ones already failed during this batch.
            // This gets reset before we yield back to the browser.
            // TODO: Warn in strict mode if getDerivedStateFromCatch is
            // not defined.
            markLegacyErrorBoundaryAsFailed(this);
          }
          var error = errorInfo.value;
          var stack = errorInfo.stack;
          logError(fiber, errorInfo);
          this.componentDidCatch(error, {
            componentStack: stack !== null ? stack : ''
          });
        };
      }
      return update;
    }

    function schedulePing(finishedWork) {
      // Once the promise resolves, we should try rendering the non-
      // placeholder state again.
      var currentTime = recalculateCurrentTime();
      var expirationTime = computeExpirationForFiber(currentTime, finishedWork);
      var recoveryUpdate = createUpdate(expirationTime);
      enqueueUpdate(finishedWork, recoveryUpdate, expirationTime);
      scheduleWork$1(finishedWork, expirationTime);
    }

    function throwException(root, returnFiber, sourceFiber, value, renderIsExpired, renderExpirationTime, currentTimeMs) {
      // The source fiber did not complete.
      sourceFiber.effectTag |= Incomplete;
      // Its effect list is no longer valid.
      sourceFiber.firstEffect = sourceFiber.lastEffect = null;

      if (enableSuspense && value !== null && typeof value === 'object' && typeof value.then === 'function') {
        // This is a thenable.
        var thenable = value;

        var expirationTimeMs = expirationTimeToMs(renderExpirationTime);
        var startTimeMs = expirationTimeMs - 5000;
        var elapsedMs = currentTimeMs - startTimeMs;
        if (elapsedMs < 0) {
          elapsedMs = 0;
        }
        var remainingTimeMs = expirationTimeMs - currentTimeMs;

        // Find the earliest timeout of all the timeouts in the ancestor path.
        // TODO: Alternatively, we could store the earliest timeout on the context
        // stack, rather than searching on every suspend.
        var _workInProgress = returnFiber;
        var earliestTimeoutMs = -1;
        searchForEarliestTimeout: do {
          if (_workInProgress.tag === TimeoutComponent) {
            var current = _workInProgress.alternate;
            if (current !== null && current.memoizedState === true) {
              // A parent Timeout already committed in a placeholder state. We
              // need to handle this promise immediately. In other words, we
              // should never suspend inside a tree that already expired.
              earliestTimeoutMs = 0;
              break searchForEarliestTimeout;
            }
            var timeoutPropMs = _workInProgress.pendingProps.ms;
            if (typeof timeoutPropMs === 'number') {
              if (timeoutPropMs <= 0) {
                earliestTimeoutMs = 0;
                break searchForEarliestTimeout;
              } else if (earliestTimeoutMs === -1 || timeoutPropMs < earliestTimeoutMs) {
                earliestTimeoutMs = timeoutPropMs;
              }
            } else if (earliestTimeoutMs === -1) {
              earliestTimeoutMs = remainingTimeMs;
            }
          }
          _workInProgress = _workInProgress.return;
        } while (_workInProgress !== null);

        // Compute the remaining time until the timeout.
        var msUntilTimeout = earliestTimeoutMs - elapsedMs;

        if (renderExpirationTime === Never || msUntilTimeout > 0) {
          // There's still time remaining.
          suspendRoot(root, thenable, msUntilTimeout, renderExpirationTime);
          var onResolveOrReject = function () {
            retrySuspendedRoot(root, renderExpirationTime);
          };
          thenable.then(onResolveOrReject, onResolveOrReject);
          return;
        } else {
          // No time remaining. Need to fallback to placeholder.
          // Find the nearest timeout that can be retried.
          _workInProgress = returnFiber;
          do {
            switch (_workInProgress.tag) {
              case HostRoot:
                {
                  // The root expired, but no fallback was provided. Throw a
                  // helpful error.
                  var message = renderExpirationTime === Sync ? 'A synchronous update was suspended, but no fallback UI ' + 'was provided.' : 'An update was suspended for longer than the timeout, ' + 'but no fallback UI was provided.';
                  value = new Error(message);
                  break;
                }
              case TimeoutComponent:
                {
                  if ((_workInProgress.effectTag & DidCapture) === NoEffect) {
                    _workInProgress.effectTag |= ShouldCapture;
                    var _onResolveOrReject = schedulePing.bind(null, _workInProgress);
                    thenable.then(_onResolveOrReject, _onResolveOrReject);
                    return;
                  }
                  // Already captured during this render. Continue to the next
                  // Timeout ancestor.
                  break;
                }
            }
            _workInProgress = _workInProgress.return;
          } while (_workInProgress !== null);
        }
      }

      // We didn't find a boundary that could handle this type of exception. Start
      // over and traverse parent path again, this time treating the exception
      // as an error.
      value = createCapturedValue(value, sourceFiber);
      var workInProgress = returnFiber;
      do {
        switch (workInProgress.tag) {
          case HostRoot:
            {
              var _errorInfo = value;
              workInProgress.effectTag |= ShouldCapture;
              var update = createRootErrorUpdate(workInProgress, _errorInfo, renderExpirationTime);
              enqueueCapturedUpdate(workInProgress, update, renderExpirationTime);
              return;
            }
          case ClassComponent:
            // Capture and retry
            var errorInfo = value;
            var ctor = workInProgress.type;
            var instance = workInProgress.stateNode;
            if ((workInProgress.effectTag & DidCapture) === NoEffect && (typeof ctor.getDerivedStateFromCatch === 'function' && enableGetDerivedStateFromCatch || instance !== null && typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance))) {
              workInProgress.effectTag |= ShouldCapture;
              // Schedule the error boundary to re-render using updated state
              var _update = createClassErrorUpdate(workInProgress, errorInfo, renderExpirationTime);
              enqueueCapturedUpdate(workInProgress, _update, renderExpirationTime);
              return;
            }
            break;
          default:
            break;
        }
        workInProgress = workInProgress.return;
      } while (workInProgress !== null);
    }

    function unwindWork(workInProgress, renderIsExpired, renderExpirationTime) {
      if (enableProfilerTimer) {
        if (workInProgress.mode & ProfileMode) {
          recordElapsedActualRenderTime(workInProgress);
        }
      }

      switch (workInProgress.tag) {
        case ClassComponent:
          {
            popContextProvider(workInProgress);
            var effectTag = workInProgress.effectTag;
            if (effectTag & ShouldCapture) {
              workInProgress.effectTag = effectTag & ~ShouldCapture | DidCapture;
              return workInProgress;
            }
            return null;
          }
        case HostRoot:
          {
            popHostContainer(workInProgress);
            popTopLevelContextObject(workInProgress);
            var _effectTag = workInProgress.effectTag;
            if (_effectTag & ShouldCapture) {
              workInProgress.effectTag = _effectTag & ~ShouldCapture | DidCapture;
              return workInProgress;
            }
            return null;
          }
        case HostComponent:
          {
            popHostContext(workInProgress);
            return null;
          }
        case TimeoutComponent:
          {
            var _effectTag2 = workInProgress.effectTag;
            if (_effectTag2 & ShouldCapture) {
              workInProgress.effectTag = _effectTag2 & ~ShouldCapture | DidCapture;
              return workInProgress;
            }
            return null;
          }
        case HostPortal:
          popHostContainer(workInProgress);
          return null;
        case ContextProvider:
          popProvider(workInProgress);
          return null;
        default:
          return null;
      }
    }

    function unwindInterruptedWork(interruptedWork) {
      if (enableProfilerTimer) {
        if (interruptedWork.mode & ProfileMode) {
          // Resume in case we're picking up on work that was paused.
          resumeActualRenderTimerIfPaused();
          recordElapsedActualRenderTime(interruptedWork);
        }
      }

      switch (interruptedWork.tag) {
        case ClassComponent:
          {
            popContextProvider(interruptedWork);
            break;
          }
        case HostRoot:
          {
            popHostContainer(interruptedWork);
            popTopLevelContextObject(interruptedWork);
            break;
          }
        case HostComponent:
          {
            popHostContext(interruptedWork);
            break;
          }
        case HostPortal:
          popHostContainer(interruptedWork);
          break;
        case ContextProvider:
          popProvider(interruptedWork);
          break;
        default:
          break;
      }
    }

    var invokeGuardedCallback$2 = ReactErrorUtils.invokeGuardedCallback;
    var hasCaughtError = ReactErrorUtils.hasCaughtError;
    var clearCaughtError = ReactErrorUtils.clearCaughtError;

    var didWarnAboutStateTransition = void 0;
    var didWarnSetStateChildContext = void 0;
    var warnAboutUpdateOnUnmounted = void 0;
    var warnAboutInvalidUpdates = void 0;

    {
      didWarnAboutStateTransition = false;
      didWarnSetStateChildContext = false;
      var didWarnStateUpdateForUnmountedComponent = {};

      warnAboutUpdateOnUnmounted = function (fiber) {
        // We show the whole stack but dedupe on the top component's name because
        // the problematic code almost always lies inside that component.
        var componentName = getComponentName(fiber) || 'ReactClass';
        if (didWarnStateUpdateForUnmountedComponent[componentName]) {
          return;
        }
        warning(false, "Can't call setState (or forceUpdate) on an unmounted component. This " + 'is a no-op, but it indicates a memory leak in your application. To ' + 'fix, cancel all subscriptions and asynchronous tasks in the ' + 'componentWillUnmount method.%s', getStackAddendumByWorkInProgressFiber(fiber));
        didWarnStateUpdateForUnmountedComponent[componentName] = true;
      };

      warnAboutInvalidUpdates = function (instance) {
        switch (ReactDebugCurrentFiber.phase) {
          case 'getChildContext':
            if (didWarnSetStateChildContext) {
              return;
            }
            warning(false, 'setState(...): Cannot call setState() inside getChildContext()');
            didWarnSetStateChildContext = true;
            break;
          case 'render':
            if (didWarnAboutStateTransition) {
              return;
            }
            warning(false, 'Cannot update during an existing state transition (such as within ' + "`render` or another component's constructor). Render methods should " + 'be a pure function of props and state; constructor side-effects are ' + 'an anti-pattern, but can be moved to `componentWillMount`.');
            didWarnAboutStateTransition = true;
            break;
        }
      };
    }

    // Represents the current time in ms.
    var originalStartTimeMs = now();
    var mostRecentCurrentTime = msToExpirationTime(0);
    var mostRecentCurrentTimeMs = originalStartTimeMs;

    // Used to ensure computeUniqueAsyncExpiration is monotonically increases.
    var lastUniqueAsyncExpiration = 0;

    // Represents the expiration time that incoming updates should use. (If this
    // is NoWork, use the default strategy: async updates in async mode, sync
    // updates in sync mode.)
    var expirationContext = NoWork;

    var isWorking = false;

    // The next work in progress fiber that we're currently working on.
    var nextUnitOfWork = null;
    var nextRoot = null;
    // The time at which we're currently rendering work.
    var nextRenderExpirationTime = NoWork;
    var nextLatestTimeoutMs = -1;
    var nextRenderIsExpired = false;

    // The next fiber with an effect that we're currently committing.
    var nextEffect = null;

    var isCommitting$1 = false;

    var isRootReadyForCommit = false;

    var legacyErrorBoundariesThatAlreadyFailed = null;

    // Used for performance tracking.
    var interruptedBy = null;

    var stashedWorkInProgressProperties = void 0;
    var replayUnitOfWork = void 0;
    var isReplayingFailedUnitOfWork = void 0;
    var originalReplayError = void 0;
    var rethrowOriginalError = void 0;
    if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
      stashedWorkInProgressProperties = null;
      isReplayingFailedUnitOfWork = false;
      originalReplayError = null;
      replayUnitOfWork = function (failedUnitOfWork, thrownValue, isAsync) {
        if (thrownValue !== null && typeof thrownValue === 'object' && typeof thrownValue.then === 'function') {
          // Don't replay promises. Treat everything else like an error.
          // TODO: Need to figure out a different strategy if/when we add
          // support for catching other types.
          return;
        }

        // Restore the original state of the work-in-progress
        if (stashedWorkInProgressProperties === null) {
          // This should never happen. Don't throw because this code is DEV-only.
          warning(false, 'Could not replay rendering after an error. This is likely a bug in React. ' + 'Please file an issue.');
          return;
        }
        assignFiberPropertiesInDEV(failedUnitOfWork, stashedWorkInProgressProperties);

        switch (failedUnitOfWork.tag) {
          case HostRoot:
            popHostContainer(failedUnitOfWork);
            popTopLevelContextObject(failedUnitOfWork);
            break;
          case HostComponent:
            popHostContext(failedUnitOfWork);
            break;
          case ClassComponent:
            popContextProvider(failedUnitOfWork);
            break;
          case HostPortal:
            popHostContainer(failedUnitOfWork);
            break;
          case ContextProvider:
            popProvider(failedUnitOfWork);
            break;
        }
        // Replay the begin phase.
        isReplayingFailedUnitOfWork = true;
        originalReplayError = thrownValue;
        invokeGuardedCallback$2(null, workLoop, null, isAsync);
        isReplayingFailedUnitOfWork = false;
        originalReplayError = null;
        if (hasCaughtError()) {
          clearCaughtError();

          if (enableProfilerTimer) {
            if (failedUnitOfWork.mode & ProfileMode) {
              recordElapsedActualRenderTime(failedUnitOfWork);
            }

            // Stop "base" render timer again (after the re-thrown error).
            stopBaseRenderTimerIfRunning();
          }
        } else {
          // If the begin phase did not fail the second time, set this pointer
          // back to the original value.
          nextUnitOfWork = failedUnitOfWork;
        }
      };
      rethrowOriginalError = function () {
        throw originalReplayError;
      };
    }

    function resetStack() {
      if (nextUnitOfWork !== null) {
        var interruptedWork = nextUnitOfWork.return;
        while (interruptedWork !== null) {
          unwindInterruptedWork(interruptedWork);
          interruptedWork = interruptedWork.return;
        }
      }

      {
        ReactStrictModeWarnings.discardPendingWarnings();
        checkThatStackIsEmpty();
      }

      nextRoot = null;
      nextRenderExpirationTime = NoWork;
      nextLatestTimeoutMs = -1;
      nextRenderIsExpired = false;
      nextUnitOfWork = null;

      isRootReadyForCommit = false;
    }

    function commitAllHostEffects() {
      while (nextEffect !== null) {
        {
          ReactDebugCurrentFiber.setCurrentFiber(nextEffect);
        }
        recordEffect();

        var effectTag = nextEffect.effectTag;

        if (effectTag & ContentReset) {
          commitResetTextContent(nextEffect);
        }

        if (effectTag & Ref) {
          var current = nextEffect.alternate;
          if (current !== null) {
            commitDetachRef(current);
          }
        }

        // The following switch statement is only concerned about placement,
        // updates, and deletions. To avoid needing to add a case for every
        // possible bitmap value, we remove the secondary effects from the
        // effect tag and switch on that value.
        var primaryEffectTag = effectTag & (Placement | Update | Deletion);
        switch (primaryEffectTag) {
          case Placement:
            {
              commitPlacement(nextEffect);
              // Clear the "placement" from effect tag so that we know that this is inserted, before
              // any life-cycles like componentDidMount gets called.
              // TODO: findDOMNode doesn't rely on this any more but isMounted
              // does and isMounted is deprecated anyway so we should be able
              // to kill this.
              nextEffect.effectTag &= ~Placement;
              break;
            }
          case PlacementAndUpdate:
            {
              // Placement
              commitPlacement(nextEffect);
              // Clear the "placement" from effect tag so that we know that this is inserted, before
              // any life-cycles like componentDidMount gets called.
              nextEffect.effectTag &= ~Placement;

              // Update
              var _current = nextEffect.alternate;
              commitWork(_current, nextEffect);
              break;
            }
          case Update:
            {
              var _current2 = nextEffect.alternate;
              commitWork(_current2, nextEffect);
              break;
            }
          case Deletion:
            {
              commitDeletion(nextEffect);
              break;
            }
        }
        nextEffect = nextEffect.nextEffect;
      }

      {
        ReactDebugCurrentFiber.resetCurrentFiber();
      }
    }

    function commitBeforeMutationLifecycles() {
      while (nextEffect !== null) {
        var effectTag = nextEffect.effectTag;

        if (effectTag & Snapshot) {
          recordEffect();
          var current = nextEffect.alternate;
          commitBeforeMutationLifeCycles(current, nextEffect);
        }

        // Don't cleanup effects yet;
        // This will be done by commitAllLifeCycles()
        nextEffect = nextEffect.nextEffect;
      }
    }

    function commitAllLifeCycles(finishedRoot, currentTime, committedExpirationTime) {
      {
        ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();

        if (warnAboutDeprecatedLifecycles) {
          ReactStrictModeWarnings.flushPendingDeprecationWarnings();
        }

        if (warnAboutLegacyContextAPI) {
          ReactStrictModeWarnings.flushLegacyContextWarning();
        }
      }
      while (nextEffect !== null) {
        var effectTag = nextEffect.effectTag;

        if (effectTag & (Update | Callback)) {
          recordEffect();
          var current = nextEffect.alternate;
          commitLifeCycles(finishedRoot, current, nextEffect, currentTime, committedExpirationTime);
        }

        if (effectTag & Ref) {
          recordEffect();
          commitAttachRef(nextEffect);
        }

        var next = nextEffect.nextEffect;
        // Ensure that we clean these up so that we don't accidentally keep them.
        // I'm not actually sure this matters because we can't reset firstEffect
        // and lastEffect since they're on every node, not just the effectful
        // ones. So we have to clean everything as we reuse nodes anyway.
        nextEffect.nextEffect = null;
        // Ensure that we reset the effectTag here so that we can rely on effect
        // tags to reason about the current life-cycle.
        nextEffect = next;
      }
    }

    function isAlreadyFailedLegacyErrorBoundary(instance) {
      return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
    }

    function markLegacyErrorBoundaryAsFailed(instance) {
      if (legacyErrorBoundariesThatAlreadyFailed === null) {
        legacyErrorBoundariesThatAlreadyFailed = new Set([instance]);
      } else {
        legacyErrorBoundariesThatAlreadyFailed.add(instance);
      }
    }

    function commitRoot(finishedWork) {
      isWorking = true;
      isCommitting$1 = true;
      startCommitTimer();

      var root = finishedWork.stateNode;
      !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      var committedExpirationTime = root.pendingCommitExpirationTime;
      !(committedExpirationTime !== NoWork) ? invariant(false, 'Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      root.pendingCommitExpirationTime = NoWork;

      var currentTime = recalculateCurrentTime();

      // Reset this to null before calling lifecycles
      ReactCurrentOwner.current = null;

      var firstEffect = void 0;
      if (finishedWork.effectTag > PerformedWork) {
        // A fiber's effect list consists only of its children, not itself. So if
        // the root has an effect, we need to add it to the end of the list. The
        // resulting list is the set that would belong to the root's parent, if
        // it had one; that is, all the effects in the tree including the root.
        if (finishedWork.lastEffect !== null) {
          finishedWork.lastEffect.nextEffect = finishedWork;
          firstEffect = finishedWork.firstEffect;
        } else {
          firstEffect = finishedWork;
        }
      } else {
        // There is no effect on the root.
        firstEffect = finishedWork.firstEffect;
      }

      prepareForCommit(root.containerInfo);

      // Invoke instances of getSnapshotBeforeUpdate before mutation.
      nextEffect = firstEffect;
      startCommitSnapshotEffectsTimer();
      while (nextEffect !== null) {
        var didError = false;
        var error = void 0;
        {
          invokeGuardedCallback$2(null, commitBeforeMutationLifecycles, null);
          if (hasCaughtError()) {
            didError = true;
            error = clearCaughtError();
          }
        }
        if (didError) {
          !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          captureCommitPhaseError(nextEffect, error);
          // Clean-up
          if (nextEffect !== null) {
            nextEffect = nextEffect.nextEffect;
          }
        }
      }
      stopCommitSnapshotEffectsTimer();

      if (enableProfilerTimer) {
        // Mark the current commit time to be shared by all Profilers in this batch.
        // This enables them to be grouped later.
        recordCommitTime();
      }

      // Commit all the side-effects within a tree. We'll do this in two passes.
      // The first pass performs all the host insertions, updates, deletions and
      // ref unmounts.
      nextEffect = firstEffect;
      startCommitHostEffectsTimer();
      while (nextEffect !== null) {
        var _didError = false;
        var _error = void 0;
        {
          invokeGuardedCallback$2(null, commitAllHostEffects, null);
          if (hasCaughtError()) {
            _didError = true;
            _error = clearCaughtError();
          }
        }
        if (_didError) {
          !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          captureCommitPhaseError(nextEffect, _error);
          // Clean-up
          if (nextEffect !== null) {
            nextEffect = nextEffect.nextEffect;
          }
        }
      }
      stopCommitHostEffectsTimer();

      resetAfterCommit(root.containerInfo);

      // The work-in-progress tree is now the current tree. This must come after
      // the first pass of the commit phase, so that the previous tree is still
      // current during componentWillUnmount, but before the second pass, so that
      // the finished work is current during componentDidMount/Update.
      root.current = finishedWork;

      // In the second pass we'll perform all life-cycles and ref callbacks.
      // Life-cycles happen as a separate pass so that all placements, updates,
      // and deletions in the entire tree have already been invoked.
      // This pass also triggers any renderer-specific initial effects.
      nextEffect = firstEffect;
      startCommitLifeCyclesTimer();
      while (nextEffect !== null) {
        var _didError2 = false;
        var _error2 = void 0;
        {
          invokeGuardedCallback$2(null, commitAllLifeCycles, null, root, currentTime, committedExpirationTime);
          if (hasCaughtError()) {
            _didError2 = true;
            _error2 = clearCaughtError();
          }
        }
        if (_didError2) {
          !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          captureCommitPhaseError(nextEffect, _error2);
          if (nextEffect !== null) {
            nextEffect = nextEffect.nextEffect;
          }
        }
      }

      if (enableProfilerTimer) {
        {
          checkActualRenderTimeStackEmpty();
        }
        resetActualRenderTimer();
      }

      isCommitting$1 = false;
      isWorking = false;
      stopCommitLifeCyclesTimer();
      stopCommitTimer();
      if (typeof onCommitRoot === 'function') {
        onCommitRoot(finishedWork.stateNode);
      }
      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
      }

      markCommittedPriorityLevels(root, currentTime, root.current.expirationTime);
      var remainingTime = findNextPendingPriorityLevel(root);
      if (remainingTime === NoWork) {
        // If there's no remaining work, we can clear the set of already failed
        // error boundaries.
        legacyErrorBoundariesThatAlreadyFailed = null;
      }
      return remainingTime;
    }

    function resetExpirationTime(workInProgress, renderTime) {
      if (renderTime !== Never && workInProgress.expirationTime === Never) {
        // The children of this component are hidden. Don't bubble their
        // expiration times.
        return;
      }

      // Check for pending updates.
      var newExpirationTime = NoWork;
      switch (workInProgress.tag) {
        case HostRoot:
        case ClassComponent:
          {
            var updateQueue = workInProgress.updateQueue;
            if (updateQueue !== null) {
              newExpirationTime = updateQueue.expirationTime;
            }
          }
      }

      // TODO: Calls need to visit stateNode

      // Bubble up the earliest expiration time.
      // (And "base" render timers if that feature flag is enabled)
      if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
        var treeBaseTime = workInProgress.selfBaseTime;
        var child = workInProgress.child;
        while (child !== null) {
          treeBaseTime += child.treeBaseTime;
          if (child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > child.expirationTime)) {
            newExpirationTime = child.expirationTime;
          }
          child = child.sibling;
        }
        workInProgress.treeBaseTime = treeBaseTime;
      } else {
        var _child = workInProgress.child;
        while (_child !== null) {
          if (_child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > _child.expirationTime)) {
            newExpirationTime = _child.expirationTime;
          }
          _child = _child.sibling;
        }
      }

      workInProgress.expirationTime = newExpirationTime;
    }

    function completeUnitOfWork(workInProgress) {
      // Attempt to complete the current unit of work, then move to the
      // next sibling. If there are no more siblings, return to the
      // parent fiber.
      while (true) {
        // The current, flushed, state of this fiber is the alternate.
        // Ideally nothing should rely on this, but relying on it here
        // means that we don't need an additional field on the work in
        // progress.
        var current = workInProgress.alternate;
        {
          ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
        }

        var returnFiber = workInProgress.return;
        var siblingFiber = workInProgress.sibling;

        if ((workInProgress.effectTag & Incomplete) === NoEffect) {
          // This fiber completed.
          var next = completeWork(current, workInProgress, nextRenderExpirationTime);
          stopWorkTimer(workInProgress);
          resetExpirationTime(workInProgress, nextRenderExpirationTime);
          {
            ReactDebugCurrentFiber.resetCurrentFiber();
          }

          if (next !== null) {
            stopWorkTimer(workInProgress);
            if (true && ReactFiberInstrumentation_1.debugTool) {
              ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
            }
            // If completing this work spawned new work, do that next. We'll come
            // back here again.
            return next;
          }

          if (returnFiber !== null &&
          // Do not append effects to parents if a sibling failed to complete
          (returnFiber.effectTag & Incomplete) === NoEffect) {
            // Append all the effects of the subtree and this fiber onto the effect
            // list of the parent. The completion order of the children affects the
            // side-effect order.
            if (returnFiber.firstEffect === null) {
              returnFiber.firstEffect = workInProgress.firstEffect;
            }
            if (workInProgress.lastEffect !== null) {
              if (returnFiber.lastEffect !== null) {
                returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
              }
              returnFiber.lastEffect = workInProgress.lastEffect;
            }

            // If this fiber had side-effects, we append it AFTER the children's
            // side-effects. We can perform certain side-effects earlier if
            // needed, by doing multiple passes over the effect list. We don't want
            // to schedule our own side-effect on our own list because if end up
            // reusing children we'll schedule this effect onto itself since we're
            // at the end.
            var effectTag = workInProgress.effectTag;
            // Skip both NoWork and PerformedWork tags when creating the effect list.
            // PerformedWork effect is read by React DevTools but shouldn't be committed.
            if (effectTag > PerformedWork) {
              if (returnFiber.lastEffect !== null) {
                returnFiber.lastEffect.nextEffect = workInProgress;
              } else {
                returnFiber.firstEffect = workInProgress;
              }
              returnFiber.lastEffect = workInProgress;
            }
          }

          if (true && ReactFiberInstrumentation_1.debugTool) {
            ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
          }

          if (siblingFiber !== null) {
            // If there is more work to do in this returnFiber, do that next.
            return siblingFiber;
          } else if (returnFiber !== null) {
            // If there's no more work in this returnFiber. Complete the returnFiber.
            workInProgress = returnFiber;
            continue;
          } else {
            // We've reached the root.
            isRootReadyForCommit = true;
            return null;
          }
        } else {
          // This fiber did not complete because something threw. Pop values off
          // the stack without entering the complete phase. If this is a boundary,
          // capture values if possible.
          var _next = unwindWork(workInProgress, nextRenderIsExpired, nextRenderExpirationTime);
          // Because this fiber did not complete, don't reset its expiration time.
          if (workInProgress.effectTag & DidCapture) {
            // Restarting an error boundary
            stopFailedWorkTimer(workInProgress);
          } else {
            stopWorkTimer(workInProgress);
          }

          {
            ReactDebugCurrentFiber.resetCurrentFiber();
          }

          if (_next !== null) {
            stopWorkTimer(workInProgress);
            if (true && ReactFiberInstrumentation_1.debugTool) {
              ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
            }
            // If completing this work spawned new work, do that next. We'll come
            // back here again.
            // Since we're restarting, remove anything that is not a host effect
            // from the effect tag.
            _next.effectTag &= HostEffectMask;
            return _next;
          }

          if (returnFiber !== null) {
            // Mark the parent fiber as incomplete and clear its effect list.
            returnFiber.firstEffect = returnFiber.lastEffect = null;
            returnFiber.effectTag |= Incomplete;
          }

          if (true && ReactFiberInstrumentation_1.debugTool) {
            ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
          }

          if (siblingFiber !== null) {
            // If there is more work to do in this returnFiber, do that next.
            return siblingFiber;
          } else if (returnFiber !== null) {
            // If there's no more work in this returnFiber. Complete the returnFiber.
            workInProgress = returnFiber;
            continue;
          } else {
            return null;
          }
        }
      }

      // Without this explicit null return Flow complains of invalid return type
      // TODO Remove the above while(true) loop
      // eslint-disable-next-line no-unreachable
      return null;
    }

    function performUnitOfWork(workInProgress) {
      // The current, flushed, state of this fiber is the alternate.
      // Ideally nothing should rely on this, but relying on it here
      // means that we don't need an additional field on the work in
      // progress.
      var current = workInProgress.alternate;

      // See if beginning this work spawns more work.
      startWorkTimer(workInProgress);
      {
        ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
      }

      if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
        stashedWorkInProgressProperties = assignFiberPropertiesInDEV(stashedWorkInProgressProperties, workInProgress);
      }

      var next = void 0;
      if (enableProfilerTimer) {
        if (workInProgress.mode & ProfileMode) {
          startBaseRenderTimer();
        }

        next = beginWork(current, workInProgress, nextRenderExpirationTime);

        if (workInProgress.mode & ProfileMode) {
          // Update "base" time if the render wasn't bailed out on.
          recordElapsedBaseRenderTimeIfRunning(workInProgress);
          stopBaseRenderTimerIfRunning();
        }
      } else {
        next = beginWork(current, workInProgress, nextRenderExpirationTime);
      }

      {
        ReactDebugCurrentFiber.resetCurrentFiber();
        if (isReplayingFailedUnitOfWork) {
          // Currently replaying a failed unit of work. This should be unreachable,
          // because the render phase is meant to be idempotent, and it should
          // have thrown again. Since it didn't, rethrow the original error, so
          // React's internal stack is not misaligned.
          rethrowOriginalError();
        }
      }
      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
      }

      if (next === null) {
        // If this doesn't spawn new work, complete the current work.
        next = completeUnitOfWork(workInProgress);
      }

      ReactCurrentOwner.current = null;

      return next;
    }

    function workLoop(isAsync) {
      if (!isAsync) {
        // Flush all expired work.
        while (nextUnitOfWork !== null) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
      } else {
        // Flush asynchronous work until the deadline runs out of time.
        while (nextUnitOfWork !== null && !shouldYield()) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }

        if (enableProfilerTimer) {
          // If we didn't finish, pause the "actual" render timer.
          // We'll restart it when we resume work.
          pauseActualRenderTimerIfRunning();
        }
      }
    }

    function renderRoot(root, expirationTime, isAsync) {
      !!isWorking ? invariant(false, 'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      isWorking = true;

      // Check if we're starting from a fresh stack, or if we're resuming from
      // previously yielded work.
      if (expirationTime !== nextRenderExpirationTime || root !== nextRoot || nextUnitOfWork === null) {
        // Reset the stack and start working from the root.
        resetStack();
        nextRoot = root;
        nextRenderExpirationTime = expirationTime;
        nextLatestTimeoutMs = -1;
        nextUnitOfWork = createWorkInProgress(nextRoot.current, null, nextRenderExpirationTime);
        root.pendingCommitExpirationTime = NoWork;
      }

      var didFatal = false;

      nextRenderIsExpired = !isAsync || nextRenderExpirationTime <= mostRecentCurrentTime;

      startWorkLoopTimer(nextUnitOfWork);

      do {
        try {
          workLoop(isAsync);
        } catch (thrownValue) {
          if (enableProfilerTimer) {
            // Stop "base" render timer in the event of an error.
            stopBaseRenderTimerIfRunning();
          }

          if (nextUnitOfWork === null) {
            // This is a fatal error.
            didFatal = true;
            onUncaughtError(thrownValue);
          } else {
            {
              // Reset global debug state
              // We assume this is defined in DEV
              resetCurrentlyProcessingQueue();
            }

            var failedUnitOfWork = nextUnitOfWork;
            if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
              replayUnitOfWork(failedUnitOfWork, thrownValue, isAsync);
            }

            // TODO: we already know this isn't true in some cases.
            // At least this shows a nicer error message until we figure out the cause.
            // https://github.com/facebook/react/issues/12449#issuecomment-386727431
            !(nextUnitOfWork !== null) ? invariant(false, 'Failed to replay rendering after an error. This is likely caused by a bug in React. Please file an issue with a reproducing case to help us find it.') : void 0;

            var sourceFiber = nextUnitOfWork;
            var returnFiber = sourceFiber.return;
            if (returnFiber === null) {
              // This is the root. The root could capture its own errors. However,
              // we don't know if it errors before or after we pushed the host
              // context. This information is needed to avoid a stack mismatch.
              // Because we're not sure, treat this as a fatal error. We could track
              // which phase it fails in, but doesn't seem worth it. At least
              // for now.
              didFatal = true;
              onUncaughtError(thrownValue);
              break;
            }
            throwException(root, returnFiber, sourceFiber, thrownValue, nextRenderIsExpired, nextRenderExpirationTime, mostRecentCurrentTimeMs);
            nextUnitOfWork = completeUnitOfWork(sourceFiber);
          }
        }
        break;
      } while (true);

      // We're done performing work. Time to clean up.
      var didCompleteRoot = false;
      isWorking = false;

      // Yield back to main thread.
      if (didFatal) {
        stopWorkLoopTimer(interruptedBy, didCompleteRoot);
        interruptedBy = null;
        // There was a fatal error.
        {
          resetStackAfterFatalErrorInDev();
        }
        return null;
      } else if (nextUnitOfWork === null) {
        // We reached the root.
        if (isRootReadyForCommit) {
          didCompleteRoot = true;
          stopWorkLoopTimer(interruptedBy, didCompleteRoot);
          interruptedBy = null;
          // The root successfully completed. It's ready for commit.
          root.pendingCommitExpirationTime = expirationTime;
          var finishedWork = root.current.alternate;
          return finishedWork;
        } else {
          // The root did not complete.
          stopWorkLoopTimer(interruptedBy, didCompleteRoot);
          interruptedBy = null;
          !!nextRenderIsExpired ? invariant(false, 'Expired work should have completed. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          markSuspendedPriorityLevel(root, expirationTime);
          if (nextLatestTimeoutMs >= 0) {
            setTimeout(function () {
              retrySuspendedRoot(root, expirationTime);
            }, nextLatestTimeoutMs);
          }
          var firstUnblockedExpirationTime = findNextPendingPriorityLevel(root);
          onBlock(firstUnblockedExpirationTime);
          return null;
        }
      } else {
        stopWorkLoopTimer(interruptedBy, didCompleteRoot);
        interruptedBy = null;
        // There's more work to do, but we ran out of time. Yield back to
        // the renderer.
        return null;
      }
    }

    function dispatch(sourceFiber, value, expirationTime) {
      !(!isWorking || isCommitting$1) ? invariant(false, 'dispatch: Cannot dispatch during the render phase.') : void 0;

      var fiber = sourceFiber.return;
      while (fiber !== null) {
        switch (fiber.tag) {
          case ClassComponent:
            var ctor = fiber.type;
            var instance = fiber.stateNode;
            if (typeof ctor.getDerivedStateFromCatch === 'function' || typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance)) {
              var errorInfo = createCapturedValue(value, sourceFiber);
              var update = createClassErrorUpdate(fiber, errorInfo, expirationTime);
              enqueueUpdate(fiber, update, expirationTime);
              scheduleWork$1(fiber, expirationTime);
              return;
            }
            break;
          case HostRoot:
            {
              var _errorInfo = createCapturedValue(value, sourceFiber);
              var _update = createRootErrorUpdate(fiber, _errorInfo, expirationTime);
              enqueueUpdate(fiber, _update, expirationTime);
              scheduleWork$1(fiber, expirationTime);
              return;
            }
        }
        fiber = fiber.return;
      }

      if (sourceFiber.tag === HostRoot) {
        // Error was thrown at the root. There is no parent, so the root
        // itself should capture it.
        var rootFiber = sourceFiber;
        var _errorInfo2 = createCapturedValue(value, rootFiber);
        var _update2 = createRootErrorUpdate(rootFiber, _errorInfo2, expirationTime);
        enqueueUpdate(rootFiber, _update2, expirationTime);
        scheduleWork$1(rootFiber, expirationTime);
      }
    }

    function captureCommitPhaseError(fiber, error) {
      return dispatch(fiber, error, Sync);
    }

    function computeAsyncExpiration(currentTime) {
      // Given the current clock time, returns an expiration time. We use rounding
      // to batch like updates together.
      // Should complete within ~5000ms. 5250ms max.
      var expirationMs = 5000;
      var bucketSizeMs = 250;
      return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
    }

    function computeInteractiveExpiration(currentTime) {
      var expirationMs = void 0;
      // We intentionally set a higher expiration time for interactive updates in
      // dev than in production.
      // If the main thread is being blocked so long that you hit the expiration,
      // it's a problem that could be solved with better scheduling.
      // People will be more likely to notice this and fix it with the long
      // expiration time in development.
      // In production we opt for better UX at the risk of masking scheduling
      // problems, by expiring fast.
      {
        // Should complete within ~500ms. 600ms max.
        expirationMs = 500;
      }
      var bucketSizeMs = 100;
      return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
    }

    // Creates a unique async expiration time.
    function computeUniqueAsyncExpiration() {
      var currentTime = recalculateCurrentTime();
      var result = computeAsyncExpiration(currentTime);
      if (result <= lastUniqueAsyncExpiration) {
        // Since we assume the current time monotonically increases, we only hit
        // this branch when computeUniqueAsyncExpiration is fired multiple times
        // within a 200ms window (or whatever the async bucket size is).
        result = lastUniqueAsyncExpiration + 1;
      }
      lastUniqueAsyncExpiration = result;
      return lastUniqueAsyncExpiration;
    }

    function computeExpirationForFiber(currentTime, fiber) {
      var expirationTime = void 0;
      if (expirationContext !== NoWork) {
        // An explicit expiration context was set;
        expirationTime = expirationContext;
      } else if (isWorking) {
        if (isCommitting$1) {
          // Updates that occur during the commit phase should have sync priority
          // by default.
          expirationTime = Sync;
        } else {
          // Updates during the render phase should expire at the same time as
          // the work that is being rendered.
          expirationTime = nextRenderExpirationTime;
        }
      } else {
        // No explicit expiration context was set, and we're not currently
        // performing work. Calculate a new expiration time.
        if (fiber.mode & AsyncMode) {
          if (isBatchingInteractiveUpdates) {
            // This is an interactive update
            expirationTime = computeInteractiveExpiration(currentTime);
          } else {
            // This is an async update
            expirationTime = computeAsyncExpiration(currentTime);
          }
        } else {
          // This is a sync update
          expirationTime = Sync;
        }
      }
      if (isBatchingInteractiveUpdates) {
        // This is an interactive update. Keep track of the lowest pending
        // interactive expiration time. This allows us to synchronously flush
        // all interactive updates when needed.
        if (lowestPendingInteractiveExpirationTime === NoWork || expirationTime > lowestPendingInteractiveExpirationTime) {
          lowestPendingInteractiveExpirationTime = expirationTime;
        }
      }
      return expirationTime;
    }

    // TODO: Rename this to scheduleTimeout or something
    function suspendRoot(root, thenable, timeoutMs, suspendedTime) {
      // Schedule the timeout.
      if (timeoutMs >= 0 && nextLatestTimeoutMs < timeoutMs) {
        nextLatestTimeoutMs = timeoutMs;
      }
    }

    function retrySuspendedRoot(root, suspendedTime) {
      markPingedPriorityLevel(root, suspendedTime);
      var retryTime = findNextPendingPriorityLevel(root);
      if (retryTime !== NoWork) {
        requestRetry(root, retryTime);
      }
    }

    function scheduleWork$1(fiber, expirationTime) {
      recordScheduleUpdate();

      {
        if (fiber.tag === ClassComponent) {
          var instance = fiber.stateNode;
          warnAboutInvalidUpdates(instance);
        }
      }

      var node = fiber;
      while (node !== null) {
        // Walk the parent path to the root and update each node's
        // expiration time.
        if (node.expirationTime === NoWork || node.expirationTime > expirationTime) {
          node.expirationTime = expirationTime;
        }
        if (node.alternate !== null) {
          if (node.alternate.expirationTime === NoWork || node.alternate.expirationTime > expirationTime) {
            node.alternate.expirationTime = expirationTime;
          }
        }
        if (node.return === null) {
          if (node.tag === HostRoot) {
            var root = node.stateNode;
            if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime < nextRenderExpirationTime) {
              // This is an interruption. (Used for performance tracking.)
              interruptedBy = fiber;
              resetStack();
            }
            markPendingPriorityLevel(root, expirationTime);
            var nextExpirationTimeToWorkOn = findNextPendingPriorityLevel(root);
            if (
            // If we're in the render phase, we don't need to schedule this root
            // for an update, because we'll do it before we exit...
            !isWorking || isCommitting$1 ||
            // ...unless this is a different root than the one we're rendering.
            nextRoot !== root) {
              requestWork(root, nextExpirationTimeToWorkOn);
            }
            if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
              invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
            }
          } else {
            {
              if (fiber.tag === ClassComponent) {
                warnAboutUpdateOnUnmounted(fiber);
              }
            }
            return;
          }
        }
        node = node.return;
      }
    }

    function recalculateCurrentTime() {
      // Subtract initial time so it fits inside 32bits
      mostRecentCurrentTimeMs = now() - originalStartTimeMs;
      mostRecentCurrentTime = msToExpirationTime(mostRecentCurrentTimeMs);
      return mostRecentCurrentTime;
    }

    function deferredUpdates(fn) {
      var previousExpirationContext = expirationContext;
      var currentTime = recalculateCurrentTime();
      expirationContext = computeAsyncExpiration(currentTime);
      try {
        return fn();
      } finally {
        expirationContext = previousExpirationContext;
      }
    }
    function syncUpdates(fn, a, b, c, d) {
      var previousExpirationContext = expirationContext;
      expirationContext = Sync;
      try {
        return fn(a, b, c, d);
      } finally {
        expirationContext = previousExpirationContext;
      }
    }

    // TODO: Everything below this is written as if it has been lifted to the
    // renderers. I'll do this in a follow-up.

    // Linked-list of roots
    var firstScheduledRoot = null;
    var lastScheduledRoot = null;

    var callbackExpirationTime = NoWork;
    var callbackID = void 0;
    var isRendering = false;
    var nextFlushedRoot = null;
    var nextFlushedExpirationTime = NoWork;
    var lowestPendingInteractiveExpirationTime = NoWork;
    var deadlineDidExpire = false;
    var hasUnhandledError = false;
    var unhandledError = null;
    var deadline = null;

    var isBatchingUpdates = false;
    var isUnbatchingUpdates = false;
    var isBatchingInteractiveUpdates = false;

    var completedBatches = null;

    // Use these to prevent an infinite loop of nested updates
    var NESTED_UPDATE_LIMIT = 1000;
    var nestedUpdateCount = 0;

    var timeHeuristicForUnitOfWork = 1;

    function scheduleCallbackWithExpiration(expirationTime) {
      if (callbackExpirationTime !== NoWork) {
        // A callback is already scheduled. Check its expiration time (timeout).
        if (expirationTime > callbackExpirationTime) {
          // Existing callback has sufficient timeout. Exit.
          return;
        } else {
          if (callbackID !== null) {
            // Existing callback has insufficient timeout. Cancel and schedule a
            // new one.
            cancelDeferredCallback(callbackID);
          }
        }
        // The request callback timer is already running. Don't start a new one.
      } else {
        startRequestCallbackTimer();
      }

      // Compute a timeout for the given expiration time.
      var currentMs = now() - originalStartTimeMs;
      var expirationMs = expirationTimeToMs(expirationTime);
      var timeout = expirationMs - currentMs;

      callbackExpirationTime = expirationTime;
      callbackID = scheduleDeferredCallback(performAsyncWork, { timeout: timeout });
    }

    function requestRetry(root, expirationTime) {
      if (root.remainingExpirationTime === NoWork || root.remainingExpirationTime < expirationTime) {
        // For a retry, only update the remaining expiration time if it has a
        // *lower priority* than the existing value. This is because, on a retry,
        // we should attempt to coalesce as much as possible.
        requestWork(root, expirationTime);
      }
    }

    // requestWork is called by the scheduler whenever a root receives an update.
    // It's up to the renderer to call renderRoot at some point in the future.
    function requestWork(root, expirationTime) {
      addRootToSchedule(root, expirationTime);

      if (isRendering) {
        // Prevent reentrancy. Remaining work will be scheduled at the end of
        // the currently rendering batch.
        return;
      }

      if (isBatchingUpdates) {
        // Flush work at the end of the batch.
        if (isUnbatchingUpdates) {
          // ...unless we're inside unbatchedUpdates, in which case we should
          // flush it now.
          nextFlushedRoot = root;
          nextFlushedExpirationTime = Sync;
          performWorkOnRoot(root, Sync, false);
        }
        return;
      }

      // TODO: Get rid of Sync and use current time?
      if (expirationTime === Sync) {
        performSyncWork();
      } else {
        scheduleCallbackWithExpiration(expirationTime);
      }
    }

    function addRootToSchedule(root, expirationTime) {
      // Add the root to the schedule.
      // Check if this root is already part of the schedule.
      if (root.nextScheduledRoot === null) {
        // This root is not already scheduled. Add it.
        root.remainingExpirationTime = expirationTime;
        if (lastScheduledRoot === null) {
          firstScheduledRoot = lastScheduledRoot = root;
          root.nextScheduledRoot = root;
        } else {
          lastScheduledRoot.nextScheduledRoot = root;
          lastScheduledRoot = root;
          lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
        }
      } else {
        // This root is already scheduled, but its priority may have increased.
        var remainingExpirationTime = root.remainingExpirationTime;
        if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
          // Update the priority.
          root.remainingExpirationTime = expirationTime;
        }
      }
    }

    function findHighestPriorityRoot() {
      var highestPriorityWork = NoWork;
      var highestPriorityRoot = null;
      if (lastScheduledRoot !== null) {
        var previousScheduledRoot = lastScheduledRoot;
        var root = firstScheduledRoot;
        while (root !== null) {
          var remainingExpirationTime = root.remainingExpirationTime;
          if (remainingExpirationTime === NoWork) {
            // This root no longer has work. Remove it from the scheduler.

            // TODO: This check is redudant, but Flow is confused by the branch
            // below where we set lastScheduledRoot to null, even though we break
            // from the loop right after.
            !(previousScheduledRoot !== null && lastScheduledRoot !== null) ? invariant(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            if (root === root.nextScheduledRoot) {
              // This is the only root in the list.
              root.nextScheduledRoot = null;
              firstScheduledRoot = lastScheduledRoot = null;
              break;
            } else if (root === firstScheduledRoot) {
              // This is the first root in the list.
              var next = root.nextScheduledRoot;
              firstScheduledRoot = next;
              lastScheduledRoot.nextScheduledRoot = next;
              root.nextScheduledRoot = null;
            } else if (root === lastScheduledRoot) {
              // This is the last root in the list.
              lastScheduledRoot = previousScheduledRoot;
              lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
              root.nextScheduledRoot = null;
              break;
            } else {
              previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
              root.nextScheduledRoot = null;
            }
            root = previousScheduledRoot.nextScheduledRoot;
          } else {
            if (highestPriorityWork === NoWork || remainingExpirationTime < highestPriorityWork) {
              // Update the priority, if it's higher
              highestPriorityWork = remainingExpirationTime;
              highestPriorityRoot = root;
            }
            if (root === lastScheduledRoot) {
              break;
            }
            previousScheduledRoot = root;
            root = root.nextScheduledRoot;
          }
        }
      }

      // If the next root is the same as the previous root, this is a nested
      // update. To prevent an infinite loop, increment the nested update count.
      var previousFlushedRoot = nextFlushedRoot;
      if (previousFlushedRoot !== null && previousFlushedRoot === highestPriorityRoot && highestPriorityWork === Sync) {
        nestedUpdateCount++;
      } else {
        // Reset whenever we switch roots.
        nestedUpdateCount = 0;
      }
      nextFlushedRoot = highestPriorityRoot;
      nextFlushedExpirationTime = highestPriorityWork;
    }

    function performAsyncWork(dl) {
      performWork(NoWork, true, dl);
    }

    function performSyncWork() {
      performWork(Sync, false, null);
    }

    function performWork(minExpirationTime, isAsync, dl) {
      deadline = dl;

      // Keep working on roots until there's no more work, or until the we reach
      // the deadline.
      findHighestPriorityRoot();

      if (enableProfilerTimer) {
        resumeActualRenderTimerIfPaused();
      }

      if (enableUserTimingAPI && deadline !== null) {
        var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
        var timeout = expirationTimeToMs(nextFlushedExpirationTime);
        stopRequestCallbackTimer(didExpire, timeout);
      }

      if (isAsync) {
        while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || minExpirationTime >= nextFlushedExpirationTime) && (!deadlineDidExpire || recalculateCurrentTime() >= nextFlushedExpirationTime)) {
          recalculateCurrentTime();
          performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !deadlineDidExpire);
          findHighestPriorityRoot();
        }
      } else {
        while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || minExpirationTime >= nextFlushedExpirationTime)) {
          performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
          findHighestPriorityRoot();
        }
      }

      // We're done flushing work. Either we ran out of time in this callback,
      // or there's no more work left with sufficient priority.

      // If we're inside a callback, set this to false since we just completed it.
      if (deadline !== null) {
        callbackExpirationTime = NoWork;
        callbackID = null;
      }
      // If there's work left over, schedule a new callback.
      if (nextFlushedExpirationTime !== NoWork) {
        scheduleCallbackWithExpiration(nextFlushedExpirationTime);
      }

      // Clean-up.
      deadline = null;
      deadlineDidExpire = false;

      finishRendering();
    }

    function flushRoot(root, expirationTime) {
      !!isRendering ? invariant(false, 'work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method.') : void 0;
      // Perform work on root as if the given expiration time is the current time.
      // This has the effect of synchronously flushing all work up to and
      // including the given time.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = expirationTime;
      performWorkOnRoot(root, expirationTime, false);
      // Flush any sync work that was scheduled by lifecycles
      performSyncWork();
      finishRendering();
    }

    function finishRendering() {
      nestedUpdateCount = 0;

      if (completedBatches !== null) {
        var batches = completedBatches;
        completedBatches = null;
        for (var i = 0; i < batches.length; i++) {
          var batch = batches[i];
          try {
            batch._onComplete();
          } catch (error) {
            if (!hasUnhandledError) {
              hasUnhandledError = true;
              unhandledError = error;
            }
          }
        }
      }

      if (hasUnhandledError) {
        var error = unhandledError;
        unhandledError = null;
        hasUnhandledError = false;
        throw error;
      }
    }

    function performWorkOnRoot(root, expirationTime, isAsync) {
      !!isRendering ? invariant(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      isRendering = true;

      // Check if this is async work or sync/expired work.
      if (!isAsync) {
        // Flush sync work.
        var finishedWork = root.finishedWork;
        if (finishedWork !== null) {
          // This root is already complete. We can commit it.
          completeRoot(root, finishedWork, expirationTime);
        } else {
          finishedWork = renderRoot(root, expirationTime, false);
          if (finishedWork !== null) {
            // We've completed the root. Commit it.
            completeRoot(root, finishedWork, expirationTime);
          }
        }
      } else {
        // Flush async work.
        var _finishedWork = root.finishedWork;
        if (_finishedWork !== null) {
          // This root is already complete. We can commit it.
          completeRoot(root, _finishedWork, expirationTime);
        } else {
          _finishedWork = renderRoot(root, expirationTime, true);
          if (_finishedWork !== null) {
            // We've completed the root. Check the deadline one more time
            // before committing.
            if (!shouldYield()) {
              // Still time left. Commit the root.
              completeRoot(root, _finishedWork, expirationTime);
            } else {
              // There's no time left. Mark this root as complete. We'll come
              // back and commit it later.
              root.finishedWork = _finishedWork;

              if (enableProfilerTimer) {
                // If we didn't finish, pause the "actual" render timer.
                // We'll restart it when we resume work.
                pauseActualRenderTimerIfRunning();
              }
            }
          }
        }
      }

      isRendering = false;
    }

    function completeRoot(root, finishedWork, expirationTime) {
      // Check if there's a batch that matches this expiration time.
      var firstBatch = root.firstBatch;
      if (firstBatch !== null && firstBatch._expirationTime <= expirationTime) {
        if (completedBatches === null) {
          completedBatches = [firstBatch];
        } else {
          completedBatches.push(firstBatch);
        }
        if (firstBatch._defer) {
          // This root is blocked from committing by a batch. Unschedule it until
          // we receive another update.
          root.finishedWork = finishedWork;
          root.remainingExpirationTime = NoWork;
          return;
        }
      }

      // Commit the root.
      root.finishedWork = null;
      root.remainingExpirationTime = commitRoot(finishedWork);
    }

    // When working on async work, the reconciler asks the renderer if it should
    // yield execution. For DOM, we implement this with requestIdleCallback.
    function shouldYield() {
      if (deadline === null) {
        return false;
      }
      if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
        // Disregard deadline.didTimeout. Only expired work should be flushed
        // during a timeout. This path is only hit for non-expired work.
        return false;
      }
      deadlineDidExpire = true;
      return true;
    }

    function onUncaughtError(error) {
      !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      // Unschedule this root so we don't work on it again until there's
      // another update.
      nextFlushedRoot.remainingExpirationTime = NoWork;
      if (!hasUnhandledError) {
        hasUnhandledError = true;
        unhandledError = error;
      }
    }

    function onBlock(remainingExpirationTime) {
      !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      // This root was blocked. Unschedule it until there's another update.
      nextFlushedRoot.remainingExpirationTime = remainingExpirationTime;
    }

    // TODO: Batching should be implemented at the renderer level, not inside
    // the reconciler.
    function batchedUpdates$1(fn, a) {
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingUpdates = true;
      try {
        return fn(a);
      } finally {
        isBatchingUpdates = previousIsBatchingUpdates;
        if (!isBatchingUpdates && !isRendering) {
          performSyncWork();
        }
      }
    }

    // TODO: Batching should be implemented at the renderer level, not inside
    // the reconciler.
    function unbatchedUpdates(fn, a) {
      if (isBatchingUpdates && !isUnbatchingUpdates) {
        isUnbatchingUpdates = true;
        try {
          return fn(a);
        } finally {
          isUnbatchingUpdates = false;
        }
      }
      return fn(a);
    }

    // TODO: Batching should be implemented at the renderer level, not within
    // the reconciler.
    function flushSync(fn, a) {
      !!isRendering ? invariant(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingUpdates = true;
      try {
        return syncUpdates(fn, a);
      } finally {
        isBatchingUpdates = previousIsBatchingUpdates;
        performSyncWork();
      }
    }

    function interactiveUpdates$1(fn, a, b) {
      if (isBatchingInteractiveUpdates) {
        return fn(a, b);
      }
      // If there are any pending interactive updates, synchronously flush them.
      // This needs to happen before we read any handlers, because the effect of
      // the previous event may influence which handlers are called during
      // this event.
      if (!isBatchingUpdates && !isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
        // Synchronously flush pending interactive updates.
        performWork(lowestPendingInteractiveExpirationTime, false, null);
        lowestPendingInteractiveExpirationTime = NoWork;
      }
      var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingInteractiveUpdates = true;
      isBatchingUpdates = true;
      try {
        return fn(a, b);
      } finally {
        isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
        isBatchingUpdates = previousIsBatchingUpdates;
        if (!isBatchingUpdates && !isRendering) {
          performSyncWork();
        }
      }
    }

    function flushInteractiveUpdates$1() {
      if (!isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
        // Synchronously flush pending interactive updates.
        performWork(lowestPendingInteractiveExpirationTime, false, null);
        lowestPendingInteractiveExpirationTime = NoWork;
      }
    }

    function flushControlled(fn) {
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingUpdates = true;
      try {
        syncUpdates(fn);
      } finally {
        isBatchingUpdates = previousIsBatchingUpdates;
        if (!isBatchingUpdates && !isRendering) {
          performWork(Sync, false, null);
        }
      }
    }

    // 0 is PROD, 1 is DEV.
    // Might add PROFILE later.


    var didWarnAboutNestedUpdates = void 0;

    {
      didWarnAboutNestedUpdates = false;
    }

    function getContextForSubtree(parentComponent) {
      if (!parentComponent) {
        return emptyObject;
      }

      var fiber = get(parentComponent);
      var parentContext = findCurrentUnmaskedContext(fiber);
      return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
    }

    function scheduleRootUpdate(current, element, expirationTime, callback) {
      {
        if (ReactDebugCurrentFiber.phase === 'render' && ReactDebugCurrentFiber.current !== null && !didWarnAboutNestedUpdates) {
          didWarnAboutNestedUpdates = true;
          warning(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(ReactDebugCurrentFiber.current) || 'Unknown');
        }
      }

      var update = createUpdate(expirationTime);
      // Caution: React DevTools currently depends on this property
      // being called "element".
      update.payload = { element: element };

      callback = callback === undefined ? null : callback;
      if (callback !== null) {
        !(typeof callback === 'function') ? warning(false, 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback) : void 0;
        update.callback = callback;
      }
      enqueueUpdate(current, update, expirationTime);

      scheduleWork$1(current, expirationTime);
      return expirationTime;
    }

    function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
      // TODO: If this is a nested container, this won't be the root.
      var current = container.current;

      {
        if (ReactFiberInstrumentation_1.debugTool) {
          if (current.alternate === null) {
            ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
          } else if (element === null) {
            ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
          } else {
            ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
          }
        }
      }

      var context = getContextForSubtree(parentComponent);
      if (container.context === null) {
        container.context = context;
      } else {
        container.pendingContext = context;
      }

      return scheduleRootUpdate(current, element, expirationTime, callback);
    }

    function findHostInstance(component) {
      var fiber = get(component);
      if (fiber === undefined) {
        if (typeof component.render === 'function') {
          invariant(false, 'Unable to find node on an unmounted component.');
        } else {
          invariant(false, 'Argument appears to not be a ReactComponent. Keys: %s', Object.keys(component));
        }
      }
      var hostFiber = findCurrentHostFiber(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    }

    function createContainer(containerInfo, isAsync, hydrate) {
      return createFiberRoot(containerInfo, isAsync, hydrate);
    }

    function updateContainer(element, container, parentComponent, callback) {
      var current = container.current;
      var currentTime = recalculateCurrentTime();
      var expirationTime = computeExpirationForFiber(currentTime, current);
      return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
    }

    function getPublicRootInstance(container) {
      var containerFiber = container.current;
      if (!containerFiber.child) {
        return null;
      }
      switch (containerFiber.child.tag) {
        case HostComponent:
          return getPublicInstance(containerFiber.child.stateNode);
        default:
          return containerFiber.child.stateNode;
      }
    }

    function findHostInstanceWithNoPortals(fiber) {
      var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    }

    function injectIntoDevTools(devToolsConfig) {
      var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;

      return injectInternals(_assign({}, devToolsConfig, {
        findHostInstanceByFiber: function (fiber) {
          var hostFiber = findCurrentHostFiber(fiber);
          if (hostFiber === null) {
            return null;
          }
          return hostFiber.stateNode;
        },
        findFiberByHostInstance: function (instance) {
          if (!findFiberByHostInstance) {
            // Might not be implemented by the renderer.
            return null;
          }
          return findFiberByHostInstance(instance);
        }
      }));
    }

    // This file intentionally does *not* have the Flow annotation.
    // Don't add it. See `./inline-typed.js` for an explanation.


    var DOMRenderer = Object.freeze({
      updateContainerAtExpirationTime: updateContainerAtExpirationTime,
      createContainer: createContainer,
      updateContainer: updateContainer,
      flushRoot: flushRoot,
      requestWork: requestWork,
      computeUniqueAsyncExpiration: computeUniqueAsyncExpiration,
      batchedUpdates: batchedUpdates$1,
      unbatchedUpdates: unbatchedUpdates,
      deferredUpdates: deferredUpdates,
      syncUpdates: syncUpdates,
      interactiveUpdates: interactiveUpdates$1,
      flushInteractiveUpdates: flushInteractiveUpdates$1,
      flushControlled: flushControlled,
      flushSync: flushSync,
      getPublicRootInstance: getPublicRootInstance,
      findHostInstance: findHostInstance,
      findHostInstanceWithNoPortals: findHostInstanceWithNoPortals,
      injectIntoDevTools: injectIntoDevTools
    });

    function createPortal$1(children, containerInfo,
    // TODO: figure out the API for cross-renderer implementation.
    implementation) {
      var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      return {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: REACT_PORTAL_TYPE,
        key: key == null ? null : '' + key,
        children: children,
        containerInfo: containerInfo,
        implementation: implementation
      };
    }

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.4.1';

    // TODO: This type is shared between the reconciler and ReactDOM, but will
    // eventually be lifted out to the renderer.
    var topLevelUpdateWarnings = void 0;
    var warnOnInvalidCallback = void 0;
    var didWarnAboutUnstableCreatePortal = false;

    {
      if (typeof Map !== 'function' ||
      // $FlowIssue Flow incorrectly thinks Map has no prototype
      Map.prototype == null || typeof Map.prototype.forEach !== 'function' || typeof Set !== 'function' ||
      // $FlowIssue Flow incorrectly thinks Set has no prototype
      Set.prototype == null || typeof Set.prototype.clear !== 'function' || typeof Set.prototype.forEach !== 'function') {
        warning(false, 'React depends on Map and Set built-in types. Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
      }

      topLevelUpdateWarnings = function (container) {
        if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
          var hostInstance = findHostInstanceWithNoPortals(container._reactRootContainer._internalRoot.current);
          if (hostInstance) {
            !(hostInstance.parentNode === container) ? warning(false, 'render(...): It looks like the React-rendered content of this ' + 'container was removed without using React. This is not ' + 'supported and will cause errors. Instead, call ' + 'ReactDOM.unmountComponentAtNode to empty a container.') : void 0;
          }
        }

        var isRootRenderedBySomeReact = !!container._reactRootContainer;
        var rootEl = getReactRootElementInContainer(container);
        var hasNonRootReactChild = !!(rootEl && getInstanceFromNode$1(rootEl));

        !(!hasNonRootReactChild || isRootRenderedBySomeReact) ? warning(false, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;

        !(container.nodeType !== ELEMENT_NODE || !container.tagName || container.tagName.toUpperCase() !== 'BODY') ? warning(false, 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : void 0;
      };

      warnOnInvalidCallback = function (callback, callerName) {
        !(callback === null || typeof callback === 'function') ? warning(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback) : void 0;
      };
    }

    injection$2.injectFiberControlledHostComponent(ReactDOMFiberComponent);

    function ReactBatch(root) {
      var expirationTime = computeUniqueAsyncExpiration();
      this._expirationTime = expirationTime;
      this._root = root;
      this._next = null;
      this._callbacks = null;
      this._didComplete = false;
      this._hasChildren = false;
      this._children = null;
      this._defer = true;
    }
    ReactBatch.prototype.render = function (children) {
      !this._defer ? invariant(false, 'batch.render: Cannot render a batch that already committed.') : void 0;
      this._hasChildren = true;
      this._children = children;
      var internalRoot = this._root._internalRoot;
      var expirationTime = this._expirationTime;
      var work = new ReactWork();
      updateContainerAtExpirationTime(children, internalRoot, null, expirationTime, work._onCommit);
      return work;
    };
    ReactBatch.prototype.then = function (onComplete) {
      if (this._didComplete) {
        onComplete();
        return;
      }
      var callbacks = this._callbacks;
      if (callbacks === null) {
        callbacks = this._callbacks = [];
      }
      callbacks.push(onComplete);
    };
    ReactBatch.prototype.commit = function () {
      var internalRoot = this._root._internalRoot;
      var firstBatch = internalRoot.firstBatch;
      !(this._defer && firstBatch !== null) ? invariant(false, 'batch.commit: Cannot commit a batch multiple times.') : void 0;

      if (!this._hasChildren) {
        // This batch is empty. Return.
        this._next = null;
        this._defer = false;
        return;
      }

      var expirationTime = this._expirationTime;

      // Ensure this is the first batch in the list.
      if (firstBatch !== this) {
        // This batch is not the earliest batch. We need to move it to the front.
        // Update its expiration time to be the expiration time of the earliest
        // batch, so that we can flush it without flushing the other batches.
        if (this._hasChildren) {
          expirationTime = this._expirationTime = firstBatch._expirationTime;
          // Rendering this batch again ensures its children will be the final state
          // when we flush (updates are processed in insertion order: last
          // update wins).
          // TODO: This forces a restart. Should we print a warning?
          this.render(this._children);
        }

        // Remove the batch from the list.
        var previous = null;
        var batch = firstBatch;
        while (batch !== this) {
          previous = batch;
          batch = batch._next;
        }
        !(previous !== null) ? invariant(false, 'batch.commit: Cannot commit a batch multiple times.') : void 0;
        previous._next = batch._next;

        // Add it to the front.
        this._next = firstBatch;
        firstBatch = internalRoot.firstBatch = this;
      }

      // Synchronously flush all the work up to this batch's expiration time.
      this._defer = false;
      flushRoot(internalRoot, expirationTime);

      // Pop the batch from the list.
      var next = this._next;
      this._next = null;
      firstBatch = internalRoot.firstBatch = next;

      // Append the next earliest batch's children to the update queue.
      if (firstBatch !== null && firstBatch._hasChildren) {
        firstBatch.render(firstBatch._children);
      }
    };
    ReactBatch.prototype._onComplete = function () {
      if (this._didComplete) {
        return;
      }
      this._didComplete = true;
      var callbacks = this._callbacks;
      if (callbacks === null) {
        return;
      }
      // TODO: Error handling.
      for (var i = 0; i < callbacks.length; i++) {
        var _callback = callbacks[i];
        _callback();
      }
    };

    function ReactWork() {
      this._callbacks = null;
      this._didCommit = false;
      // TODO: Avoid need to bind by replacing callbacks in the update queue with
      // list of Work objects.
      this._onCommit = this._onCommit.bind(this);
    }
    ReactWork.prototype.then = function (onCommit) {
      if (this._didCommit) {
        onCommit();
        return;
      }
      var callbacks = this._callbacks;
      if (callbacks === null) {
        callbacks = this._callbacks = [];
      }
      callbacks.push(onCommit);
    };
    ReactWork.prototype._onCommit = function () {
      if (this._didCommit) {
        return;
      }
      this._didCommit = true;
      var callbacks = this._callbacks;
      if (callbacks === null) {
        return;
      }
      // TODO: Error handling.
      for (var i = 0; i < callbacks.length; i++) {
        var _callback2 = callbacks[i];
        !(typeof _callback2 === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback2) : void 0;
        _callback2();
      }
    };

    function ReactRoot(container, isAsync, hydrate) {
      var root = createContainer(container, isAsync, hydrate);
      this._internalRoot = root;
    }
    ReactRoot.prototype.render = function (children, callback) {
      var root = this._internalRoot;
      var work = new ReactWork();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'render');
      }
      if (callback !== null) {
        work.then(callback);
      }
      updateContainer(children, root, null, work._onCommit);
      return work;
    };
    ReactRoot.prototype.unmount = function (callback) {
      var root = this._internalRoot;
      var work = new ReactWork();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'render');
      }
      if (callback !== null) {
        work.then(callback);
      }
      updateContainer(null, root, null, work._onCommit);
      return work;
    };
    ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function (parentComponent, children, callback) {
      var root = this._internalRoot;
      var work = new ReactWork();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'render');
      }
      if (callback !== null) {
        work.then(callback);
      }
      updateContainer(children, root, parentComponent, work._onCommit);
      return work;
    };
    ReactRoot.prototype.createBatch = function () {
      var batch = new ReactBatch(this);
      var expirationTime = batch._expirationTime;

      var internalRoot = this._internalRoot;
      var firstBatch = internalRoot.firstBatch;
      if (firstBatch === null) {
        internalRoot.firstBatch = batch;
        batch._next = null;
      } else {
        // Insert sorted by expiration time then insertion order
        var insertAfter = null;
        var insertBefore = firstBatch;
        while (insertBefore !== null && insertBefore._expirationTime <= expirationTime) {
          insertAfter = insertBefore;
          insertBefore = insertBefore._next;
        }
        batch._next = insertBefore;
        if (insertAfter !== null) {
          insertAfter._next = batch;
        }
      }

      return batch;
    };

    /**
     * True if the supplied DOM node is a valid node element.
     *
     * @param {?DOMElement} node The candidate DOM node.
     * @return {boolean} True if the DOM is a valid DOM node.
     * @internal
     */
    function isValidContainer(node) {
      return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || node.nodeType === COMMENT_NODE && node.nodeValue === ' react-mount-point-unstable '));
    }

    function getReactRootElementInContainer(container) {
      if (!container) {
        return null;
      }

      if (container.nodeType === DOCUMENT_NODE) {
        return container.documentElement;
      } else {
        return container.firstChild;
      }
    }

    function shouldHydrateDueToLegacyHeuristic(container) {
      var rootElement = getReactRootElementInContainer(container);
      return !!(rootElement && rootElement.nodeType === ELEMENT_NODE && rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));
    }

    injection$3.injectRenderer(DOMRenderer);

    var warnedAboutHydrateAPI = false;

    function legacyCreateRootFromDOMContainer(container, forceHydrate) {
      var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
      // First clear any existing content.
      if (!shouldHydrate) {
        var warned = false;
        var rootSibling = void 0;
        while (rootSibling = container.lastChild) {
          {
            if (!warned && rootSibling.nodeType === ELEMENT_NODE && rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
              warned = true;
              warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
            }
          }
          container.removeChild(rootSibling);
        }
      }
      {
        if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
          warnedAboutHydrateAPI = true;
          lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
        }
      }
      // Legacy roots are not async by default.
      var isAsync = false;
      return new ReactRoot(container, isAsync, shouldHydrate);
    }

    function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
      // TODO: Ensure all entry points contain this check
      !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;

      {
        topLevelUpdateWarnings(container);
      }

      // TODO: Without `any` type, Flow says "Property cannot be accessed on any
      // member of intersection type." Whyyyyyy.
      var root = container._reactRootContainer;
      if (!root) {
        // Initial mount
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
        if (typeof callback === 'function') {
          var originalCallback = callback;
          callback = function () {
            var instance = getPublicRootInstance(root._internalRoot);
            originalCallback.call(instance);
          };
        }
        // Initial mount should not be batched.
        unbatchedUpdates(function () {
          if (parentComponent != null) {
            root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
          } else {
            root.render(children, callback);
          }
        });
      } else {
        if (typeof callback === 'function') {
          var _originalCallback = callback;
          callback = function () {
            var instance = getPublicRootInstance(root._internalRoot);
            _originalCallback.call(instance);
          };
        }
        // Update
        if (parentComponent != null) {
          root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
        } else {
          root.render(children, callback);
        }
      }
      return getPublicRootInstance(root._internalRoot);
    }

    function createPortal(children, container) {
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;
      // TODO: pass ReactDOM portal implementation as third argument
      return createPortal$1(children, container, null, key);
    }

    var ReactDOM = {
      createPortal: createPortal,

      findDOMNode: function (componentOrElement) {
        {
          var owner = ReactCurrentOwner.current;
          if (owner !== null && owner.stateNode !== null) {
            var warnedAboutRefsInRender = owner.stateNode._warnedAboutRefsInRender;
            !warnedAboutRefsInRender ? warning(false, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(owner) || 'A component') : void 0;
            owner.stateNode._warnedAboutRefsInRender = true;
          }
        }
        if (componentOrElement == null) {
          return null;
        }
        if (componentOrElement.nodeType === ELEMENT_NODE) {
          return componentOrElement;
        }

        return findHostInstance(componentOrElement);
      },
      hydrate: function (element, container, callback) {
        // TODO: throw or warn if we couldn't hydrate?
        return legacyRenderSubtreeIntoContainer(null, element, container, true, callback);
      },
      render: function (element, container, callback) {
        return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
      },
      unstable_renderSubtreeIntoContainer: function (parentComponent, element, containerNode, callback) {
        !(parentComponent != null && has(parentComponent)) ? invariant(false, 'parentComponent must be a valid React Component') : void 0;
        return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
      },
      unmountComponentAtNode: function (container) {
        !isValidContainer(container) ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : void 0;

        if (container._reactRootContainer) {
          {
            var rootEl = getReactRootElementInContainer(container);
            var renderedByDifferentReact = rootEl && !getInstanceFromNode$1(rootEl);
            !!renderedByDifferentReact ? warning(false, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by another copy of React.') : void 0;
          }

          // Unmount should not be batched.
          unbatchedUpdates(function () {
            legacyRenderSubtreeIntoContainer(null, null, container, false, function () {
              container._reactRootContainer = null;
            });
          });
          // If you call unmountComponentAtNode twice in quick succession, you'll
          // get `true` twice. That's probably fine?
          return true;
        } else {
          {
            var _rootEl = getReactRootElementInContainer(container);
            var hasNonRootReactChild = !!(_rootEl && getInstanceFromNode$1(_rootEl));

            // Check if the container itself is a React root node.
            var isContainerReactRoot = container.nodeType === 1 && isValidContainer(container.parentNode) && !!container.parentNode._reactRootContainer;

            !!hasNonRootReactChild ? warning(false, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : void 0;
          }

          return false;
        }
      },

      // Temporary alias since we already shipped React 16 RC with it.
      // TODO: remove in React 17.
      unstable_createPortal: function () {
        if (!didWarnAboutUnstableCreatePortal) {
          didWarnAboutUnstableCreatePortal = true;
          lowPriorityWarning$1(false, 'The ReactDOM.unstable_createPortal() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactDOM.createPortal() instead. It has the exact same API, ' + 'but without the "unstable_" prefix.');
        }
        return createPortal.apply(undefined, arguments);
      },

      unstable_batchedUpdates: batchedUpdates$1,

      unstable_deferredUpdates: deferredUpdates,

      unstable_interactiveUpdates: interactiveUpdates$1,

      flushSync: flushSync,

      unstable_flushControlled: flushControlled,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        // For TapEventPlugin which is popular in open source
        EventPluginHub: EventPluginHub,
        // Used by test-utils
        EventPluginRegistry: EventPluginRegistry,
        EventPropagators: EventPropagators,
        ReactControlledComponent: ReactControlledComponent,
        ReactDOMComponentTree: ReactDOMComponentTree,
        ReactDOMEventListener: ReactDOMEventListener
      }
    };

    ReactDOM.unstable_createRoot = function createRoot(container, options) {
      var hydrate = options != null && options.hydrate === true;
      return new ReactRoot(container, true, hydrate);
    };

    var foundDevTools = injectIntoDevTools({
      findFiberByHostInstance: getClosestInstanceFromNode,
      bundleType: 1,
      version: ReactVersion,
      rendererPackageName: 'react-dom'
    });

    {
      if (!foundDevTools && ExecutionEnvironment.canUseDOM && window.top === window.self) {
        // If we're in Chrome or Firefox, provide a download link if not installed.
        if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
          var protocol = window.location.protocol;
          // Don't warn in exotic cases like chrome-extension://.
          if (/^(https?|file):$/.test(protocol)) {
            console.info('%cDownload the React DevTools ' + 'for a better development experience: ' + 'https://fb.me/react-devtools' + (protocol === 'file:' ? '\nYou might need to use a local HTTP server (instead of file://): ' + 'https://fb.me/react-devtools-faq' : ''), 'font-weight:bold');
          }
        }
      }
    }

    var ReactDOM$2 = Object.freeze({
      default: ReactDOM
    });

    var ReactDOM$3 = ReactDOM$2 && ReactDOM || ReactDOM$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var reactDom = ReactDOM$3.default ? ReactDOM$3.default : ReactDOM$3;

    module.exports = reactDom;
  })();
}
},{"fbjs/lib/invariant":"../node_modules/fbjs/lib/invariant.js","react":"../node_modules/react/index.js","fbjs/lib/warning":"../node_modules/fbjs/lib/warning.js","fbjs/lib/ExecutionEnvironment":"../node_modules/fbjs/lib/ExecutionEnvironment.js","object-assign":"../node_modules/object-assign/index.js","fbjs/lib/emptyFunction":"../node_modules/fbjs/lib/emptyFunction.js","prop-types/checkPropTypes":"../node_modules/prop-types/checkPropTypes.js","fbjs/lib/getActiveElement":"../node_modules/fbjs/lib/getActiveElement.js","fbjs/lib/shallowEqual":"../node_modules/fbjs/lib/shallowEqual.js","fbjs/lib/containsNode":"../node_modules/fbjs/lib/containsNode.js","fbjs/lib/emptyObject":"../node_modules/fbjs/lib/emptyObject.js","fbjs/lib/hyphenateStyleName":"../node_modules/fbjs/lib/hyphenateStyleName.js","fbjs/lib/camelizeStyleName":"../node_modules/fbjs/lib/camelizeStyleName.js"}],"../node_modules/react-dom/index.js":[function(require,module,exports) {
'use strict';

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if ('development' !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if ('development' === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = require('./cjs/react-dom.development.js');
}
},{"./cjs/react-dom.development.js":"../node_modules/react-dom/cjs/react-dom.development.js"}],"../node_modules/parseuri/index.js":[function(require,module,exports) {
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],"../node_modules/ms/index.js":[function(require,module,exports) {
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],"../node_modules/debug/src/debug.js":[function(require,module,exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":"../node_modules/ms/index.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],"../node_modules/debug/src/browser.js":[function(require,module,exports) {
var process = require("process");
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = undefined;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
},{"./debug":"../node_modules/debug/src/debug.js","process":"../node_modules/process/browser.js"}],"../node_modules/socket.io-client/lib/url.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * Module dependencies.
 */

var parseuri = require('parseuri');
var debug = require('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}

},{"parseuri":"../node_modules/parseuri/index.js","debug":"../node_modules/debug/src/browser.js"}],"../node_modules/component-emitter/index.js":[function(require,module,exports) {

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],"../node_modules/socket.io-parser/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/socket.io-parser/is-buffer.js":[function(require,module,exports) {
var global = arguments[3];

module.exports = isBuf;

var withNativeBuffer = typeof global.Buffer === 'function' && typeof global.Buffer.isBuffer === 'function';
var withNativeArrayBuffer = typeof global.ArrayBuffer === 'function';

var isView = (function () {
  if (withNativeArrayBuffer && typeof global.ArrayBuffer.isView === 'function') {
    return global.ArrayBuffer.isView;
  } else {
    return function (obj) { return obj.buffer instanceof global.ArrayBuffer; };
  }
})();

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (withNativeBuffer && global.Buffer.isBuffer(obj)) ||
          (withNativeArrayBuffer && (obj instanceof global.ArrayBuffer || isView(obj)));
}

},{}],"../node_modules/socket.io-parser/binary.js":[function(require,module,exports) {
var global = arguments[3];
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = require('isarray');
var isBuf = require('./is-buffer');
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

},{"isarray":"../node_modules/socket.io-parser/node_modules/isarray/index.js","./is-buffer":"../node_modules/socket.io-parser/is-buffer.js"}],"../node_modules/socket.io-parser/index.js":[function(require,module,exports) {

/**
 * Module dependencies.
 */

var debug = require('debug')('socket.io-parser');
var Emitter = require('component-emitter');
var binary = require('./binary');
var isArray = require('isarray');
var isBuf = require('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch(e){
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}

},{"debug":"../node_modules/debug/src/browser.js","component-emitter":"../node_modules/component-emitter/index.js","./binary":"../node_modules/socket.io-parser/binary.js","isarray":"../node_modules/socket.io-parser/node_modules/isarray/index.js","./is-buffer":"../node_modules/socket.io-parser/is-buffer.js"}],"../node_modules/has-cors/index.js":[function(require,module,exports) {

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{}],"../node_modules/engine.io-client/lib/xmlhttprequest.js":[function(require,module,exports) {
var global = arguments[3];
// browser shim for xmlhttprequest module

var hasCORS = require('has-cors');

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) { }
  }
};

},{"has-cors":"../node_modules/has-cors/index.js"}],"../node_modules/engine.io-parser/lib/keys.js":[function(require,module,exports) {

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],"../node_modules/has-binary2/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../node_modules/base64-js/index.js","ieee754":"../node_modules/ieee754/index.js","isarray":"../node_modules/isarray/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/has-binary2/index.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
/* global Blob File */

/*
 * Module requirements.
 */

var isArray = require('isarray');

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

},{"isarray":"../node_modules/has-binary2/node_modules/isarray/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/arraybuffer.slice/index.js":[function(require,module,exports) {
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],"../node_modules/after/index.js":[function(require,module,exports) {
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],"../node_modules/engine.io-parser/lib/utf8.js":[function(require,module,exports) {
var global = arguments[3];
var define;
/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

},{}],"../node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":[function(require,module,exports) {
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function () {
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function (arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
        i,
        len = bytes.length,
        base64 = "";

    for (i = 0; i < len; i += 3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
      base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
      base64 += chars[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode = function (base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];

      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return arraybuffer;
  };
})();
},{}],"../node_modules/blob/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

},{}],"../node_modules/engine.io-parser/lib/browser.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Module dependencies.
 */

var keys = require('./keys');
var hasBinary = require('has-binary2');
var sliceBuffer = require('arraybuffer.slice');
var after = require('after');
var utf8 = require('./utf8');

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = require('base64-arraybuffer');
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = require('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

},{"./keys":"../node_modules/engine.io-parser/lib/keys.js","has-binary2":"../node_modules/has-binary2/index.js","arraybuffer.slice":"../node_modules/arraybuffer.slice/index.js","after":"../node_modules/after/index.js","./utf8":"../node_modules/engine.io-parser/lib/utf8.js","base64-arraybuffer":"../node_modules/base64-arraybuffer/lib/base64-arraybuffer.js","blob":"../node_modules/blob/index.js"}],"../node_modules/engine.io-client/lib/transport.js":[function(require,module,exports) {
/**
 * Module dependencies.
 */

var parser = require('engine.io-parser');
var Emitter = require('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"engine.io-parser":"../node_modules/engine.io-parser/lib/browser.js","component-emitter":"../node_modules/component-emitter/index.js"}],"../node_modules/parseqs/index.js":[function(require,module,exports) {
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],"../node_modules/component-inherit/index.js":[function(require,module,exports) {

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],"../node_modules/yeast/index.js":[function(require,module,exports) {
'use strict';

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

},{}],"../node_modules/engine.io-client/lib/transports/polling.js":[function(require,module,exports) {
/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parseqs = require('parseqs');
var parser = require('engine.io-parser');
var inherit = require('component-inherit');
var yeast = require('yeast');
var debug = require('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = require('xmlhttprequest-ssl');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

},{"../transport":"../node_modules/engine.io-client/lib/transport.js","parseqs":"../node_modules/parseqs/index.js","engine.io-parser":"../node_modules/engine.io-parser/lib/browser.js","component-inherit":"../node_modules/component-inherit/index.js","yeast":"../node_modules/yeast/index.js","debug":"../node_modules/debug/src/browser.js","xmlhttprequest-ssl":"../node_modules/engine.io-client/lib/xmlhttprequest.js"}],"../node_modules/engine.io-client/lib/transports/polling-xhr.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Module requirements.
 */

var XMLHttpRequest = require('xmlhttprequest-ssl');
var Polling = require('./polling');
var Emitter = require('component-emitter');
var inherit = require('component-inherit');
var debug = require('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (self.supportsBinary && contentType === 'application/octet-stream') {
              xhr.responseType = 'arraybuffer';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

},{"xmlhttprequest-ssl":"../node_modules/engine.io-client/lib/xmlhttprequest.js","./polling":"../node_modules/engine.io-client/lib/transports/polling.js","component-emitter":"../node_modules/component-emitter/index.js","component-inherit":"../node_modules/component-inherit/index.js","debug":"../node_modules/debug/src/browser.js"}],"../node_modules/engine.io-client/lib/transports/polling-jsonp.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * Module requirements.
 */

var Polling = require('./polling');
var inherit = require('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

},{"./polling":"../node_modules/engine.io-client/lib/transports/polling.js","component-inherit":"../node_modules/component-inherit/index.js"}],"../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/engine.io-client/lib/transports/websocket.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parser = require('engine.io-parser');
var parseqs = require('parseqs');
var inherit = require('component-inherit');
var yeast = require('yeast');
var debug = require('debug')('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = require('ws');
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? (protocols ? new WebSocket(uri, protocols) : new WebSocket(uri)) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

},{"../transport":"../node_modules/engine.io-client/lib/transport.js","engine.io-parser":"../node_modules/engine.io-parser/lib/browser.js","parseqs":"../node_modules/parseqs/index.js","component-inherit":"../node_modules/component-inherit/index.js","yeast":"../node_modules/yeast/index.js","debug":"../node_modules/debug/src/browser.js","ws":"../node_modules/parcel-bundler/src/builtins/_empty.js"}],"../node_modules/engine.io-client/lib/transports/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Module dependencies
 */

var XMLHttpRequest = require('xmlhttprequest-ssl');
var XHR = require('./polling-xhr');
var JSONP = require('./polling-jsonp');
var websocket = require('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

},{"xmlhttprequest-ssl":"../node_modules/engine.io-client/lib/xmlhttprequest.js","./polling-xhr":"../node_modules/engine.io-client/lib/transports/polling-xhr.js","./polling-jsonp":"../node_modules/engine.io-client/lib/transports/polling-jsonp.js","./websocket":"../node_modules/engine.io-client/lib/transports/websocket.js"}],"../node_modules/indexof/index.js":[function(require,module,exports) {

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],"../node_modules/engine.io-client/lib/socket.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Module dependencies.
 */

var transports = require('./transports/index');
var Emitter = require('component-emitter');
var debug = require('debug')('engine.io-client:socket');
var index = require('indexof');
var parser = require('engine.io-parser');
var parseuri = require('parseuri');
var parseqs = require('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (global.location && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = require('./transport');
Socket.transports = require('./transports/index');
Socket.parser = require('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0)
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

},{"./transports/index":"../node_modules/engine.io-client/lib/transports/index.js","component-emitter":"../node_modules/component-emitter/index.js","debug":"../node_modules/debug/src/browser.js","indexof":"../node_modules/indexof/index.js","engine.io-parser":"../node_modules/engine.io-parser/lib/browser.js","parseuri":"../node_modules/parseuri/index.js","parseqs":"../node_modules/parseqs/index.js","./transport":"../node_modules/engine.io-client/lib/transport.js"}],"../node_modules/engine.io-client/lib/index.js":[function(require,module,exports) {

module.exports = require('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = require('engine.io-parser');

},{"./socket":"../node_modules/engine.io-client/lib/socket.js","engine.io-parser":"../node_modules/engine.io-parser/lib/browser.js"}],"../node_modules/to-array/index.js":[function(require,module,exports) {
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],"../node_modules/socket.io-client/lib/on.js":[function(require,module,exports) {

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}

},{}],"../node_modules/component-bind/index.js":[function(require,module,exports) {
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],"../node_modules/socket.io-client/lib/socket.js":[function(require,module,exports) {

/**
 * Module dependencies.
 */

var parser = require('socket.io-parser');
var Emitter = require('component-emitter');
var toArray = require('to-array');
var on = require('./on');
var bind = require('component-bind');
var debug = require('debug')('socket.io-client:socket');
var parseqs = require('parseqs');
var hasBin = require('has-binary2');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};

},{"socket.io-parser":"../node_modules/socket.io-parser/index.js","component-emitter":"../node_modules/component-emitter/index.js","to-array":"../node_modules/to-array/index.js","./on":"../node_modules/socket.io-client/lib/on.js","component-bind":"../node_modules/component-bind/index.js","debug":"../node_modules/debug/src/browser.js","parseqs":"../node_modules/parseqs/index.js","has-binary2":"../node_modules/has-binary2/index.js"}],"../node_modules/backo2/index.js":[function(require,module,exports) {

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],"../node_modules/socket.io-client/lib/manager.js":[function(require,module,exports) {

/**
 * Module dependencies.
 */

var eio = require('engine.io-client');
var Socket = require('./socket');
var Emitter = require('component-emitter');
var parser = require('socket.io-parser');
var on = require('./on');
var bind = require('component-bind');
var debug = require('debug')('socket.io-client:manager');
var indexOf = require('indexof');
var Backoff = require('backo2');

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"engine.io-client":"../node_modules/engine.io-client/lib/index.js","./socket":"../node_modules/socket.io-client/lib/socket.js","component-emitter":"../node_modules/component-emitter/index.js","socket.io-parser":"../node_modules/socket.io-parser/index.js","./on":"../node_modules/socket.io-client/lib/on.js","component-bind":"../node_modules/component-bind/index.js","debug":"../node_modules/debug/src/browser.js","indexof":"../node_modules/indexof/index.js","backo2":"../node_modules/backo2/index.js"}],"../node_modules/socket.io-client/lib/index.js":[function(require,module,exports) {

/**
 * Module dependencies.
 */

var url = require('./url');
var parser = require('socket.io-parser');
var Manager = require('./manager');
var debug = require('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = require('./manager');
exports.Socket = require('./socket');

},{"./url":"../node_modules/socket.io-client/lib/url.js","socket.io-parser":"../node_modules/socket.io-parser/index.js","./manager":"../node_modules/socket.io-client/lib/manager.js","debug":"../node_modules/debug/src/browser.js","./socket":"../node_modules/socket.io-client/lib/socket.js"}],"ts/app/Gamepad.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Gamepad = /** @class */function (_super) {
    __extends(Gamepad, _super);
    function Gamepad(props) {
        var _this = _super.call(this, props) || this;
        _this.updateDimensions = function () {
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var screenSize = Math.min(width, height);
            var gamepadSize = screenSize * 0.8;
            _this.setState({
                arrowDownStyle: {
                    left: gamepadSize * 0.1 + 'px',
                    top: gamepadSize * 0.1 + 'px'
                },
                arrowLeftStyle: {
                    right: gamepadSize * 0.1 + 'px',
                    top: gamepadSize * 0.1 + 'px'
                },
                arrowRightStyle: {
                    bottom: gamepadSize * 0.1 + 'px',
                    left: gamepadSize * 0.1 + 'px'
                },
                arrowStyle: {
                    borderRightWidth: gamepadSize / 5 + 'px',
                    borderTopWidth: gamepadSize / 5 + 'px'
                },
                arrowUpStyle: {
                    bottom: gamepadSize * 0.1 + 'px',
                    right: gamepadSize * 0.1 + 'px'
                },
                gamepadStyle: {
                    borderRadius: gamepadSize / 2 + 'px',
                    height: gamepadSize + 'px',
                    left: (width - gamepadSize) / 2 + 'px',
                    top: (height - gamepadSize) / 2 + 'px',
                    width: gamepadSize + 'px'
                }
            });
        };
        _this.handleDownPress = function () {
            _this.props.socket.emit('d');
        };
        _this.handleLeftPress = function () {
            _this.props.socket.emit('l');
        };
        _this.handleRightPress = function () {
            _this.props.socket.emit('r');
        };
        _this.handleUpPress = function () {
            _this.props.socket.emit('u');
        };
        _this.state = {
            arrowDownStyle: {},
            arrowLeftStyle: {},
            arrowRightStyle: {},
            arrowStyle: {},
            arrowUpStyle: {},
            gamepadStyle: {}
        };
        return _this;
    }
    Gamepad.prototype.componentDidMount = function () {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    };
    Gamepad.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.updateDimensions);
    };
    Gamepad.prototype.render = function () {
        return React.createElement("div", { id: "gamepad", style: this.state.gamepadStyle }, React.createElement("div", { className: "quadrant", id: "u", onClick: this.handleUpPress, onTouchStart: this.handleUpPress }, React.createElement("div", { className: "arrow", id: "ua", style: __assign({}, this.state.arrowStyle, this.state.arrowUpStyle) })), React.createElement("div", { className: "quadrant", id: "r", onClick: this.handleRightPress, onTouchStart: this.handleRightPress }, React.createElement("div", { className: "arrow", id: "ra", style: __assign({}, this.state.arrowStyle, this.state.arrowRightStyle) })), React.createElement("div", { className: "quadrant", id: "l", onClick: this.handleLeftPress, onTouchStart: this.handleLeftPress }, React.createElement("div", { className: "arrow", id: "la", style: __assign({}, this.state.arrowStyle, this.state.arrowLeftStyle) })), React.createElement("div", { className: "quadrant", id: "d", onClick: this.handleDownPress, onTouchStart: this.handleDownPress }, React.createElement("div", { className: "arrow", id: "da", style: __assign({}, this.state.arrowStyle, this.state.arrowDownStyle) })));
    };
    return Gamepad;
}(React.Component);
exports.Gamepad = Gamepad;
},{"react":"../node_modules/react/index.js"}],"ts/app/PasscodeInput.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var PasscodeInput = /** @class */function (_super) {
    __extends(PasscodeInput, _super);
    function PasscodeInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkInput = function (e) {
            var pin = e.currentTarget.value;
            if (pin.length === 4) {
                _this.props.socket.emit(pin);
            }
        };
        return _this;
    }
    PasscodeInput.prototype.render = function () {
        return React.createElement("div", { id: "passcode-input" }, React.createElement("h1", null, "Enter PIN:"), React.createElement("input", { onChange: this.checkInput, type: "number" }), React.createElement("p", null, "If no passcode is visible on the display, wait for the next game to begin."));
    };
    return PasscodeInput;
}(React.Component);
exports.PasscodeInput = PasscodeInput;
},{"react":"../node_modules/react/index.js"}],"ts/serverSettings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SERVER_ENDPOINT = 'https://watt-center-snake.herokuapp.com'; // 'localhost:3000'
exports.default = SERVER_ENDPOINT;
},{}],"ts/app/AppContainer.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }result["default"] = mod;
    return result;
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var io = __importStar(require("socket.io-client"));
var Gamepad_1 = require("./Gamepad");
var PasscodeInput_1 = require("./PasscodeInput");
var serverSettings_1 = __importDefault(require("../serverSettings"));
var socket = io.connect(serverSettings_1.default + '/app');
var AppContainer = /** @class */function (_super) {
    __extends(AppContainer, _super);
    function AppContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            playing: false
        };
        return _this;
    }
    AppContainer.prototype.componentWillMount = function () {
        var _this = this;
        socket.on('message', function (type) {
            if (type === 'playing') {
                _this.setState({ playing: true });
            }
            if (type === 'stop-playing') {
                _this.setState({ playing: false });
            }
        });
    };
    AppContainer.prototype.render = function () {
        return this.state.playing ? React.createElement(Gamepad_1.Gamepad, { socket: socket }) : React.createElement(PasscodeInput_1.PasscodeInput, { socket: socket });
    };
    return AppContainer;
}(React.Component);
exports.AppContainer = AppContainer;
},{"react":"../node_modules/react/index.js","socket.io-client":"../node_modules/socket.io-client/lib/index.js","./Gamepad":"ts/app/Gamepad.tsx","./PasscodeInput":"ts/app/PasscodeInput.tsx","../serverSettings":"ts/serverSettings.ts"}],"ts/app.tsx":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var AppContainer_1 = require("./app/AppContainer");
ReactDOM.render(React.createElement(AppContainer_1.AppContainer, null), document.body);
},{"react":"../node_modules/react/index.js","react-dom":"../node_modules/react-dom/index.js","./app/AppContainer":"ts/app/AppContainer.tsx"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49637' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/app.tsx"], null)
//# sourceMappingURL=/app.6a095061.map