(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~user"],{

/***/ "./node_modules/autobind-decorator/lib/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/autobind-decorator/lib/esm/index.js ***!
  \**********************************************************/
/*! exports provided: boundMethod, boundClass, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export boundMethod */
/* unused harmony export boundClass */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return autobind; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(_typeof(fn)));
  } // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.


  var definingProperty = false;
  return {
    configurable: true,
    get: function get() {
      // eslint-disable-next-line no-prototype-builtins
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}
/**
 * Use boundMethod to bind all methods on the target.prototype
 */

function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys; // Use Reflect if exists

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype); // Use symbols if support is provided

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key); // Only methods need binding

    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}
function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(void 0, arguments);
  }

  return boundMethod.apply(void 0, arguments);
}

/***/ }),

/***/ "./node_modules/class-validator/esm5/container.js":
/*!********************************************************!*\
  !*** ./node_modules/class-validator/esm5/container.js ***!
  \********************************************************/
/*! exports provided: useContainer, getFromContainer */
/*! exports used: getFromContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export useContainer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getFromContainer; });
/**
 * Container to be used by this library for inversion control. If container was not implicitly set then by default
 * container simply creates a new instance of the given class.
 */
var defaultContainer = new (/** @class */ (function () {
    function class_1() {
        this.instances = [];
    }
    class_1.prototype.get = function (someClass) {
        var instance = this.instances.find(function (instance) { return instance.type === someClass; });
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }
        return instance.object;
    };
    return class_1;
}()))();
var userContainer;
var userContainerOptions;
/**
 * Sets container to be used by this library.
 */
function useContainer(iocContainer, options) {
    userContainer = iocContainer;
    userContainerOptions = options;
}
/**
 * Gets the IOC container used by this library.
 */
function getFromContainer(someClass) {
    if (userContainer) {
        try {
            var instance = userContainer.get(someClass);
            if (instance)
                return instance;
            if (!userContainerOptions || !userContainerOptions.fallback)
                return instance;
        }
        catch (error) {
            if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
                throw error;
        }
    }
    return defaultContainer.get(someClass);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/ValidationOptions.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/ValidationOptions.js ***!
  \**************************************************************************/
/*! exports provided: isValidationOptions */
/*! exports used: isValidationOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isValidationOptions; });
function isValidationOptions(val) {
    if (!val) {
        return false;
    }
    return 'each' in val || 'message' in val || 'groups' in val || 'always' in val || 'context' in val;
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/array/ArrayContains.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/array/ArrayContains.js ***!
  \****************************************************************************/
/*! exports provided: ARRAY_CONTAINS, arrayContains, ArrayContains */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ARRAY_CONTAINS */
/* unused harmony export arrayContains */
/* unused harmony export ArrayContains */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var ARRAY_CONTAINS = 'arrayContains';
/**
 * Checks if array contains all values from the given array of values.
 * If null or undefined is given then this function returns false.
 */
function arrayContains(array, values) {
    if (!(array instanceof Array))
        return false;
    return values.every(function (value) { return array.indexOf(value) !== -1; });
}
/**
 * Checks if array contains all values from the given array of values.
 * If null or undefined is given then this function returns false.
 */
function ArrayContains(values, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: ARRAY_CONTAINS,
        constraints: [values],
        validator: {
            validate: function (value, args) { return arrayContains(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain $constraint1 values'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/array/ArrayMaxSize.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/array/ArrayMaxSize.js ***!
  \***************************************************************************/
/*! exports provided: ARRAY_MAX_SIZE, arrayMaxSize, ArrayMaxSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ARRAY_MAX_SIZE */
/* unused harmony export arrayMaxSize */
/* unused harmony export ArrayMaxSize */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var ARRAY_MAX_SIZE = 'arrayMaxSize';
/**
 * Checks if the array's length is less or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
function arrayMaxSize(array, max) {
    return array instanceof Array && array.length <= max;
}
/**
 * Checks if the array's length is less or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
function ArrayMaxSize(max, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: ARRAY_MAX_SIZE,
        constraints: [max],
        validator: {
            validate: function (value, args) { return arrayMaxSize(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain not more than $constraint1 elements'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/array/ArrayMinSize.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/array/ArrayMinSize.js ***!
  \***************************************************************************/
/*! exports provided: ARRAY_MIN_SIZE, arrayMinSize, ArrayMinSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ARRAY_MIN_SIZE */
/* unused harmony export arrayMinSize */
/* unused harmony export ArrayMinSize */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var ARRAY_MIN_SIZE = 'arrayMinSize';
/**
 * Checks if the array's length is greater than or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
function arrayMinSize(array, min) {
    return array instanceof Array && array.length >= min;
}
/**
 * Checks if the array's length is greater than or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
function ArrayMinSize(min, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: ARRAY_MIN_SIZE,
        constraints: [min],
        validator: {
            validate: function (value, args) { return arrayMinSize(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain at least $constraint1 elements'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/array/ArrayNotContains.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/array/ArrayNotContains.js ***!
  \*******************************************************************************/
/*! exports provided: ARRAY_NOT_CONTAINS, arrayNotContains, ArrayNotContains */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ARRAY_NOT_CONTAINS */
/* unused harmony export arrayNotContains */
/* unused harmony export ArrayNotContains */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var ARRAY_NOT_CONTAINS = 'arrayNotContains';
/**
 * Checks if array does not contain any of the given values.
 * If null or undefined is given then this function returns false.
 */
function arrayNotContains(array, values) {
    if (!(array instanceof Array))
        return false;
    return values.every(function (value) { return array.indexOf(value) === -1; });
}
/**
 * Checks if array does not contain any of the given values.
 * If null or undefined is given then this function returns false.
 */
function ArrayNotContains(values, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: ARRAY_NOT_CONTAINS,
        constraints: [values],
        validator: {
            validate: function (value, args) { return arrayNotContains(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property should not contain $constraint1 values'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/array/ArrayNotEmpty.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/array/ArrayNotEmpty.js ***!
  \****************************************************************************/
/*! exports provided: ARRAY_NOT_EMPTY, arrayNotEmpty, ArrayNotEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ARRAY_NOT_EMPTY */
/* unused harmony export arrayNotEmpty */
/* unused harmony export ArrayNotEmpty */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var ARRAY_NOT_EMPTY = 'arrayNotEmpty';
/**
 * Checks if given array is not empty.
 * If null or undefined is given then this function returns false.
 */
function arrayNotEmpty(array) {
    return array instanceof Array && array.length > 0;
}
/**
 * Checks if given array is not empty.
 * If null or undefined is given then this function returns false.
 */
function ArrayNotEmpty(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: ARRAY_NOT_EMPTY,
        validator: {
            validate: function (value, args) { return arrayNotEmpty(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property should not be empty'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/array/ArrayUnique.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/array/ArrayUnique.js ***!
  \**************************************************************************/
/*! exports provided: ARRAY_UNIQUE, arrayUnique, ArrayUnique */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ARRAY_UNIQUE */
/* unused harmony export arrayUnique */
/* unused harmony export ArrayUnique */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var ARRAY_UNIQUE = 'arrayUnique';
/**
 * Checks if all array's values are unique. Comparison for objects is reference-based.
 * If null or undefined is given then this function returns false.
 */
function arrayUnique(array, identifier) {
    if (!(array instanceof Array))
        return false;
    if (identifier) {
        array = array.map(function (o) { return (o != null ? identifier(o) : o); });
    }
    var uniqueItems = array.filter(function (a, b, c) { return c.indexOf(a) === b; });
    return array.length === uniqueItems.length;
}
/**
 * Checks if all array's values are unique. Comparison for objects is reference-based.
 * If null or undefined is given then this function returns false.
 */
function ArrayUnique(identifierOrOptions, validationOptions) {
    var identifier = typeof identifierOrOptions === 'function' ? identifierOrOptions : undefined;
    var options = typeof identifierOrOptions !== 'function' ? identifierOrOptions : validationOptions;
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: ARRAY_UNIQUE,
        validator: {
            validate: function (value, args) { return arrayUnique(value, identifier); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + "All $property's elements must be unique"; }, options),
        },
    }, options);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/Allow.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/Allow.js ***!
  \*********************************************************************/
/*! exports provided: Allow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Allow */
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");



/**
 * If object has both allowed and not allowed properties a validation error will be thrown.
 */
function Allow(validationOptions) {
    return function (object, propertyName) {
        var args = {
            type: _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__[/* ValidationTypes */ "a"].WHITELIST,
            target: object.constructor,
            propertyName: propertyName,
            validationOptions: validationOptions,
        };
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__[/* getMetadataStorage */ "b"])().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__[/* ValidationMetadata */ "a"](args));
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/Equals.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/Equals.js ***!
  \**********************************************************************/
/*! exports provided: EQUALS, equals, Equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EQUALS */
/* unused harmony export equals */
/* unused harmony export Equals */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var EQUALS = 'equals';
/**
 * Checks if value matches ("===") the comparison.
 */
function equals(value, comparison) {
    return value === comparison;
}
/**
 * Checks if value matches ("===") the comparison.
 */
function Equals(comparison, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: EQUALS,
        constraints: [comparison],
        validator: {
            validate: function (value, args) { return equals(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be equal to $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsDefined.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsDefined.js ***!
  \*************************************************************************/
/*! exports provided: IS_DEFINED, isDefined, IsDefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_DEFINED */
/* unused harmony export isDefined */
/* unused harmony export IsDefined */
/* harmony import */ var _ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");


// isDefined is (yet) a special case
var IS_DEFINED = _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].IS_DEFINED;
/**
 * Checks if value is defined (!== undefined, !== null).
 */
function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * Checks if value is defined (!== undefined, !== null).
 */
function IsDefined(validationOptions) {
    return Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_DEFINED,
        validator: {
            validate: function (value) { return isDefined(value); },
            defaultMessage: Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property should not be null or undefined'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsEmpty.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsEmpty.js ***!
  \***********************************************************************/
/*! exports provided: IS_EMPTY, isEmpty, IsEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_EMPTY */
/* unused harmony export isEmpty */
/* unused harmony export IsEmpty */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_EMPTY = 'isEmpty';
/**
 * Checks if given value is empty (=== '', === null, === undefined).
 */
function isEmpty(value) {
    return value === '' || value === null || value === undefined;
}
/**
 * Checks if given value is empty (=== '', === null, === undefined).
 */
function IsEmpty(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_EMPTY,
        validator: {
            validate: function (value, args) { return isEmpty(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be empty'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsIn.js":
/*!********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsIn.js ***!
  \********************************************************************/
/*! exports provided: IS_IN, isIn, IsIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_IN */
/* unused harmony export isIn */
/* unused harmony export IsIn */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_IN = 'isIn';
/**
 * Checks if given value is in a array of allowed values.
 */
function isIn(value, possibleValues) {
    return !(possibleValues instanceof Array) || possibleValues.some(function (possibleValue) { return possibleValue === value; });
}
/**
 * Checks if given value is in a array of allowed values.
 */
function IsIn(values, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_IN,
        constraints: [values],
        validator: {
            validate: function (value, args) { return isIn(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be one of the following values: $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsLatLong.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsLatLong.js ***!
  \*************************************************************************/
/*! exports provided: IS_LATLONG, isLatLong, IsLatLong */
/*! exports used: isLatLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_LATLONG */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isLatLong; });
/* unused harmony export IsLatLong */
/* harmony import */ var _ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isLatLong__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isLatLong */ "./node_modules/validator/lib/isLatLong.js");
/* harmony import */ var validator_lib_isLatLong__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isLatLong__WEBPACK_IMPORTED_MODULE_1__);


var IS_LATLONG = 'isLatLong';
/**
 * Checks if a value is string in format a "latitude,longitude".
 */
function isLatLong(value) {
    return typeof value === 'string' && validator_lib_isLatLong__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if a value is string in format a "latitude,longitude".
 */
function IsLatLong(validationOptions) {
    return Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_LATLONG,
        validator: {
            validate: function (value, args) { return isLatLong(value); },
            defaultMessage: Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a latitude,longitude string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsLatitude.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsLatitude.js ***!
  \**************************************************************************/
/*! exports provided: IS_LATITUDE, isLatitude, IsLatitude */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_LATITUDE */
/* unused harmony export isLatitude */
/* unused harmony export IsLatitude */
/* harmony import */ var _ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var _IsLatLong__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsLatLong */ "./node_modules/class-validator/esm5/decorator/common/IsLatLong.js");


var IS_LATITUDE = 'isLatitude';
/**
 * Checks if a given value is a latitude.
 */
function isLatitude(value) {
    return (typeof value === 'number' || typeof value === 'string') && Object(_IsLatLong__WEBPACK_IMPORTED_MODULE_1__[/* isLatLong */ "a"])(value + ",0");
}
/**
 * Checks if a given value is a latitude.
 */
function IsLatitude(validationOptions) {
    return Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_LATITUDE,
        validator: {
            validate: function (value, args) { return isLatitude(value); },
            defaultMessage: Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a latitude string or number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsLongitude.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsLongitude.js ***!
  \***************************************************************************/
/*! exports provided: IS_LONGITUDE, isLongitude, IsLongitude */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_LONGITUDE */
/* unused harmony export isLongitude */
/* unused harmony export IsLongitude */
/* harmony import */ var _ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var _IsLatLong__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsLatLong */ "./node_modules/class-validator/esm5/decorator/common/IsLatLong.js");


var IS_LONGITUDE = 'isLongitude';
/**
 * Checks if a given value is a longitude.
 */
function isLongitude(value) {
    return (typeof value === 'number' || typeof value === 'string') && Object(_IsLatLong__WEBPACK_IMPORTED_MODULE_1__[/* isLatLong */ "a"])("0," + value);
}
/**
 * Checks if a given value is a longitude.
 */
function IsLongitude(validationOptions) {
    return Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_LONGITUDE,
        validator: {
            validate: function (value, args) { return isLongitude(value); },
            defaultMessage: Object(_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a longitude string or number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js ***!
  \**************************************************************************/
/*! exports provided: IS_NOT_EMPTY, isNotEmpty, IsNotEmpty */
/*! exports used: IsNotEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_NOT_EMPTY */
/* unused harmony export isNotEmpty */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsNotEmpty; });
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_NOT_EMPTY = 'isNotEmpty';
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function isNotEmpty(value) {
    return value !== '' && value !== null && value !== undefined;
}
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function IsNotEmpty(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_NOT_EMPTY,
        validator: {
            validate: function (value, args) { return isNotEmpty(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property should not be empty'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsNotIn.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsNotIn.js ***!
  \***********************************************************************/
/*! exports provided: IS_NOT_IN, isNotIn, IsNotIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_NOT_IN */
/* unused harmony export isNotIn */
/* unused harmony export IsNotIn */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_NOT_IN = 'isNotIn';
/**
 * Checks if given value not in a array of allowed values.
 */
function isNotIn(value, possibleValues) {
    return !(possibleValues instanceof Array) || !possibleValues.some(function (possibleValue) { return possibleValue === value; });
}
/**
 * Checks if given value not in a array of allowed values.
 */
function IsNotIn(values, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_NOT_IN,
        constraints: [values],
        validator: {
            validate: function (value, args) { return isNotIn(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property should not be one of the following values: $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsOptional.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsOptional.js ***!
  \**************************************************************************/
/*! exports provided: IsOptional */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IsOptional */
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");



/**
 * Checks if value is missing and if so, ignores all validators.
 */
function IsOptional(validationOptions) {
    return function (object, propertyName) {
        var args = {
            type: _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__[/* ValidationTypes */ "a"].CONDITIONAL_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [
                function (object, value) {
                    return object[propertyName] !== null && object[propertyName] !== undefined;
                },
            ],
            validationOptions: validationOptions,
        };
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__[/* getMetadataStorage */ "b"])().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__[/* ValidationMetadata */ "a"](args));
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/NotEquals.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/NotEquals.js ***!
  \*************************************************************************/
/*! exports provided: NOT_EQUALS, notEquals, NotEquals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NOT_EQUALS */
/* unused harmony export notEquals */
/* unused harmony export NotEquals */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var NOT_EQUALS = 'notEquals';
/**
 * Checks if value does not match ("!==") the comparison.
 */
function notEquals(value, comparison) {
    return value !== comparison;
}
/**
 * Checks if value does not match ("!==") the comparison.
 */
function NotEquals(comparison, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: NOT_EQUALS,
        constraints: [comparison],
        validator: {
            validate: function (value, args) { return notEquals(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property should not be equal to $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/Validate.js":
/*!************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/Validate.js ***!
  \************************************************************************/
/*! exports provided: ValidatorConstraint, Validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ValidatorConstraint */
/* unused harmony export Validate */
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _metadata_ConstraintMetadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../metadata/ConstraintMetadata */ "./node_modules/class-validator/esm5/metadata/ConstraintMetadata.js");




/**
 * Registers custom validator class.
 */
function ValidatorConstraint(options) {
    return function (target) {
        var isAsync = options && options.async;
        var name = options && options.name ? options.name : '';
        if (!name) {
            name = target.name;
            if (!name)
                // generate name if it was not given
                name = name.replace(/\.?([A-Z]+)/g, function (x, y) { return '_' + y.toLowerCase(); }).replace(/^_/, '');
        }
        var metadata = new _metadata_ConstraintMetadata__WEBPACK_IMPORTED_MODULE_3__[/* ConstraintMetadata */ "a"](target, name, isAsync);
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_1__[/* getMetadataStorage */ "b"])().addConstraintMetadata(metadata);
    };
}
function Validate(constraintClass, constraintsOrValidationOptions, maybeValidationOptions) {
    return function (object, propertyName) {
        var args = {
            type: _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_2__[/* ValidationTypes */ "a"].CUSTOM_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            constraintCls: constraintClass,
            constraints: constraintsOrValidationOptions instanceof Array ? constraintsOrValidationOptions : undefined,
            validationOptions: !(constraintsOrValidationOptions instanceof Array)
                ? constraintsOrValidationOptions
                : maybeValidationOptions,
        };
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_1__[/* getMetadataStorage */ "b"])().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_0__[/* ValidationMetadata */ "a"](args));
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/ValidateBy.js ***!
  \**************************************************************************/
/*! exports provided: buildMessage, ValidateBy */
/*! exports used: ValidateBy, buildMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return buildMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateBy; });
/* harmony import */ var _register_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../register-decorator */ "./node_modules/class-validator/esm5/register-decorator.js");

function buildMessage(impl, validationOptions) {
    return function (validationArguments) {
        var eachPrefix = validationOptions && validationOptions.each ? 'each value in ' : '';
        return impl(eachPrefix, validationArguments);
    };
}
function ValidateBy(options, validationOptions) {
    return function (object, propertyName) {
        Object(_register_decorator__WEBPACK_IMPORTED_MODULE_0__[/* registerDecorator */ "a"])({
            name: options.name,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: options.constraints,
            validator: options.validator,
        });
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/ValidateIf.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/ValidateIf.js ***!
  \**************************************************************************/
/*! exports provided: ValidateIf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ValidateIf */
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");



/**
 * Ignores the other validators on a property when the provided condition function returns false.
 */
function ValidateIf(condition, validationOptions) {
    return function (object, propertyName) {
        var args = {
            type: _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__[/* ValidationTypes */ "a"].CONDITIONAL_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [condition],
            validationOptions: validationOptions,
        };
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__[/* getMetadataStorage */ "b"])().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__[/* ValidationMetadata */ "a"](args));
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/ValidateNested.js":
/*!******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/ValidateNested.js ***!
  \******************************************************************************/
/*! exports provided: ValidateNested */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ValidateNested */
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



/**
 * Objects / object arrays marked with this decorator will also be validated.
 */
function ValidateNested(validationOptions) {
    var opts = __assign({}, validationOptions);
    var eachPrefix = opts.each ? 'each value in ' : '';
    opts.message = opts.message || eachPrefix + 'nested property $property must be either object or array';
    return function (object, propertyName) {
        var args = {
            type: _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__[/* ValidationTypes */ "a"].NESTED_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            validationOptions: opts,
        };
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__[/* getMetadataStorage */ "b"])().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__[/* ValidationMetadata */ "a"](args));
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/ValidatePromise.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/ValidatePromise.js ***!
  \*******************************************************************************/
/*! exports provided: ValidatePromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ValidatePromise */
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");



/**
 * Resolve promise before validation
 */
function ValidatePromise(validationOptions) {
    return function (object, propertyName) {
        var args = {
            type: _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_0__[/* ValidationTypes */ "a"].PROMISE_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            validationOptions: validationOptions,
        };
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__[/* getMetadataStorage */ "b"])().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__[/* ValidationMetadata */ "a"](args));
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/date/MaxDate.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/date/MaxDate.js ***!
  \*********************************************************************/
/*! exports provided: MAX_DATE, maxDate, MaxDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MAX_DATE */
/* unused harmony export maxDate */
/* unused harmony export MaxDate */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var MAX_DATE = 'maxDate';
/**
 * Checks if the value is a date that's before the specified date.
 */
function maxDate(date, maxDate) {
    return date instanceof Date && date.getTime() <= maxDate.getTime();
}
/**
 * Checks if the value is a date that's after the specified date.
 */
function MaxDate(date, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: MAX_DATE,
        constraints: [date],
        validator: {
            validate: function (value, args) { return maxDate(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return 'maximal allowed date for ' + eachPrefix + '$property is $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/date/MinDate.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/date/MinDate.js ***!
  \*********************************************************************/
/*! exports provided: MIN_DATE, minDate, MinDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MIN_DATE */
/* unused harmony export minDate */
/* unused harmony export MinDate */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var MIN_DATE = 'minDate';
/**
 * Checks if the value is a date that's after the specified date.
 */
function minDate(date, minDate) {
    return date instanceof Date && date.getTime() >= minDate.getTime();
}
/**
 * Checks if the value is a date that's after the specified date.
 */
function MinDate(date, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: MIN_DATE,
        constraints: [date],
        validator: {
            validate: function (value, args) { return minDate(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return 'minimal allowed date for ' + eachPrefix + '$property is $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/decorators.js":
/*!*******************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/decorators.js ***!
  \*******************************************************************/
/*! exports provided: Allow, IS_DEFINED, isDefined, IsDefined, IsOptional, ValidatorConstraint, Validate, buildMessage, ValidateBy, ValidateIf, ValidateNested, ValidatePromise, IS_LATLONG, isLatLong, IsLatLong, IS_LATITUDE, isLatitude, IsLatitude, IS_LONGITUDE, isLongitude, IsLongitude, EQUALS, equals, Equals, NOT_EQUALS, notEquals, NotEquals, IS_EMPTY, isEmpty, IsEmpty, IS_NOT_EMPTY, isNotEmpty, IsNotEmpty, IS_IN, isIn, IsIn, IS_NOT_IN, isNotIn, IsNotIn, IS_DIVISIBLE_BY, isDivisibleBy, IsDivisibleBy, IS_POSITIVE, isPositive, IsPositive, IS_NEGATIVE, isNegative, IsNegative, MAX, max, Max, MIN, min, Min, MIN_DATE, minDate, MinDate, MAX_DATE, maxDate, MaxDate, CONTAINS, contains, Contains, NOT_CONTAINS, notContains, NotContains, IS_ALPHA, isAlpha, IsAlpha, IS_ALPHANUMERIC, isAlphanumeric, IsAlphanumeric, IS_DECIMAL, isDecimal, IsDecimal, IS_ASCII, isAscii, IsAscii, IS_BASE64, isBase64, IsBase64, IS_BYTE_LENGTH, isByteLength, IsByteLength, IS_CREDIT_CARD, isCreditCard, IsCreditCard, IS_CURRENCY, isCurrency, IsCurrency, IS_EMAIL, isEmail, IsEmail, IS_FQDN, isFQDN, IsFQDN, IS_FULL_WIDTH, isFullWidth, IsFullWidth, IS_HALF_WIDTH, isHalfWidth, IsHalfWidth, IS_VARIABLE_WIDTH, isVariableWidth, IsVariableWidth, IS_HEX_COLOR, isHexColor, IsHexColor, IS_HEXADECIMAL, isHexadecimal, IsHexadecimal, IS_MAC_ADDRESS, isMACAddress, IsMACAddress, IS_IP, isIP, IsIP, IS_PORT, isPort, IsPort, IS_ISBN, isISBN, IsISBN, IS_ISIN, isISIN, IsISIN, IS_ISO8601, isISO8601, IsISO8601, IS_JSON, isJSON, IsJSON, IS_JWT, isJWT, IsJWT, IS_LOWERCASE, isLowercase, IsLowercase, IS_MOBILE_PHONE, isMobilePhone, IsMobilePhone, IS_ISO31661_ALPHA_2, isISO31661Alpha2, IsISO31661Alpha2, IS_ISO31661_ALPHA_3, isISO31661Alpha3, IsISO31661Alpha3, IS_MONGO_ID, isMongoId, IsMongoId, IS_MULTIBYTE, isMultibyte, IsMultibyte, IS_SURROGATE_PAIR, isSurrogatePair, IsSurrogatePair, IS_URL, isURL, IsUrl, IS_UUID, isUUID, IsUUID, IS_FIREBASE_PUSH_ID, isFirebasePushId, IsFirebasePushId, IS_UPPERCASE, isUppercase, IsUppercase, IS_LENGTH, length, Length, MAX_LENGTH, maxLength, MaxLength, MIN_LENGTH, minLength, MinLength, MATCHES, matches, Matches, IS_PHONE_NUMBER, isPhoneNumber, IsPhoneNumber, IS_MILITARY_TIME, isMilitaryTime, IsMilitaryTime, IS_HASH, isHash, IsHash, IS_ISSN, isISSN, IsISSN, IS_DATE_STRING, isDateString, IsDateString, IS_BOOLEAN_STRING, isBooleanString, IsBooleanString, IS_NUMBER_STRING, isNumberString, IsNumberString, IS_BASE32, isBase32, IsBase32, IS_BIC, isBIC, IsBIC, IS_BTC_ADDRESS, isBtcAddress, IsBtcAddress, IS_DATA_URI, isDataURI, IsDataURI, IS_EAN, isEAN, IsEAN, IS_ETHEREUM_ADDRESS, isEthereumAddress, IsEthereumAddress, IS_HSL, isHSL, IsHSL, IS_IBAN, isIBAN, IsIBAN, IS_IDENTITY_CARD, isIdentityCard, IsIdentityCard, IS_ISRC, isISRC, IsISRC, IS_LOCALE, isLocale, IsLocale, IS_MAGNET_URI, isMagnetURI, IsMagnetURI, IS_MIME_TYPE, isMimeType, IsMimeType, IS_OCTAL, isOctal, IsOctal, IS_PASSPORT_NUMBER, isPassportNumber, IsPassportNumber, IS_POSTAL_CODE, isPostalCode, IsPostalCode, IS_RFC_3339, isRFC3339, IsRFC3339, IS_RGB_COLOR, isRgbColor, IsRgbColor, IS_SEM_VER, isSemVer, IsSemVer, IS_BOOLEAN, isBoolean, IsBoolean, IS_DATE, isDate, IsDate, IS_NUMBER, isNumber, IsNumber, IS_ENUM, isEnum, IsEnum, IS_INT, isInt, IsInt, IS_STRING, isString, IsString, IS_ARRAY, isArray, IsArray, IS_OBJECT, isObject, IsObject, ARRAY_CONTAINS, arrayContains, ArrayContains, ARRAY_NOT_CONTAINS, arrayNotContains, ArrayNotContains, ARRAY_NOT_EMPTY, arrayNotEmpty, ArrayNotEmpty, ARRAY_MIN_SIZE, arrayMinSize, ArrayMinSize, ARRAY_MAX_SIZE, arrayMaxSize, ArrayMaxSize, ARRAY_UNIQUE, arrayUnique, ArrayUnique, IS_NOT_EMPTY_OBJECT, isNotEmptyObject, IsNotEmptyObject, IS_INSTANCE, isInstance, IsInstance */
/*! exports used: IsNotEmpty, Length */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _common_Allow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/Allow */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var _common_IsDefined__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/IsDefined */ "./node_modules/class-validator/esm5/decorator/common/IsDefined.js");
/* harmony import */ var _common_IsOptional__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/IsOptional */ "./node_modules/class-validator/esm5/decorator/common/IsOptional.js");
/* harmony import */ var _common_Validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/Validate */ "./node_modules/class-validator/esm5/decorator/common/Validate.js");
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var _common_ValidateIf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/ValidateIf */ "./node_modules/class-validator/esm5/decorator/common/ValidateIf.js");
/* harmony import */ var _common_ValidateNested__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/ValidateNested */ "./node_modules/class-validator/esm5/decorator/common/ValidateNested.js");
/* harmony import */ var _common_ValidatePromise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/ValidatePromise */ "./node_modules/class-validator/esm5/decorator/common/ValidatePromise.js");
/* harmony import */ var _common_IsLatLong__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/IsLatLong */ "./node_modules/class-validator/esm5/decorator/common/IsLatLong.js");
/* harmony import */ var _common_IsLatitude__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/IsLatitude */ "./node_modules/class-validator/esm5/decorator/common/IsLatitude.js");
/* harmony import */ var _common_IsLongitude__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common/IsLongitude */ "./node_modules/class-validator/esm5/decorator/common/IsLongitude.js");
/* harmony import */ var _common_Equals__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common/Equals */ "./node_modules/class-validator/esm5/decorator/common/Equals.js");
/* harmony import */ var _common_NotEquals__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/NotEquals */ "./node_modules/class-validator/esm5/decorator/common/NotEquals.js");
/* harmony import */ var _common_IsEmpty__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./common/IsEmpty */ "./node_modules/class-validator/esm5/decorator/common/IsEmpty.js");
/* harmony import */ var _common_IsNotEmpty__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./common/IsNotEmpty */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _common_IsNotEmpty__WEBPACK_IMPORTED_MODULE_14__["a"]; });

/* harmony import */ var _common_IsIn__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./common/IsIn */ "./node_modules/class-validator/esm5/decorator/common/IsIn.js");
/* harmony import */ var _common_IsNotIn__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./common/IsNotIn */ "./node_modules/class-validator/esm5/decorator/common/IsNotIn.js");
/* harmony import */ var _number_IsDivisibleBy__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./number/IsDivisibleBy */ "./node_modules/class-validator/esm5/decorator/number/IsDivisibleBy.js");
/* harmony import */ var _number_IsPositive__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./number/IsPositive */ "./node_modules/class-validator/esm5/decorator/number/IsPositive.js");
/* harmony import */ var _number_IsNegative__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./number/IsNegative */ "./node_modules/class-validator/esm5/decorator/number/IsNegative.js");
/* harmony import */ var _number_Max__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./number/Max */ "./node_modules/class-validator/esm5/decorator/number/Max.js");
/* harmony import */ var _number_Min__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./number/Min */ "./node_modules/class-validator/esm5/decorator/number/Min.js");
/* harmony import */ var _date_MinDate__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./date/MinDate */ "./node_modules/class-validator/esm5/decorator/date/MinDate.js");
/* harmony import */ var _date_MaxDate__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./date/MaxDate */ "./node_modules/class-validator/esm5/decorator/date/MaxDate.js");
/* harmony import */ var _string_Contains__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./string/Contains */ "./node_modules/class-validator/esm5/decorator/string/Contains.js");
/* harmony import */ var _string_NotContains__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./string/NotContains */ "./node_modules/class-validator/esm5/decorator/string/NotContains.js");
/* harmony import */ var _string_IsAlpha__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./string/IsAlpha */ "./node_modules/class-validator/esm5/decorator/string/IsAlpha.js");
/* harmony import */ var _string_IsAlphanumeric__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./string/IsAlphanumeric */ "./node_modules/class-validator/esm5/decorator/string/IsAlphanumeric.js");
/* harmony import */ var _string_IsDecimal__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./string/IsDecimal */ "./node_modules/class-validator/esm5/decorator/string/IsDecimal.js");
/* harmony import */ var _string_IsAscii__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./string/IsAscii */ "./node_modules/class-validator/esm5/decorator/string/IsAscii.js");
/* harmony import */ var _string_IsBase64__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./string/IsBase64 */ "./node_modules/class-validator/esm5/decorator/string/IsBase64.js");
/* harmony import */ var _string_IsByteLength__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./string/IsByteLength */ "./node_modules/class-validator/esm5/decorator/string/IsByteLength.js");
/* harmony import */ var _string_IsCreditCard__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./string/IsCreditCard */ "./node_modules/class-validator/esm5/decorator/string/IsCreditCard.js");
/* harmony import */ var _string_IsCurrency__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./string/IsCurrency */ "./node_modules/class-validator/esm5/decorator/string/IsCurrency.js");
/* harmony import */ var _string_IsEmail__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./string/IsEmail */ "./node_modules/class-validator/esm5/decorator/string/IsEmail.js");
/* harmony import */ var _string_IsFQDN__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./string/IsFQDN */ "./node_modules/class-validator/esm5/decorator/string/IsFQDN.js");
/* harmony import */ var _string_IsFullWidth__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./string/IsFullWidth */ "./node_modules/class-validator/esm5/decorator/string/IsFullWidth.js");
/* harmony import */ var _string_IsHalfWidth__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./string/IsHalfWidth */ "./node_modules/class-validator/esm5/decorator/string/IsHalfWidth.js");
/* harmony import */ var _string_IsVariableWidth__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./string/IsVariableWidth */ "./node_modules/class-validator/esm5/decorator/string/IsVariableWidth.js");
/* harmony import */ var _string_IsHexColor__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./string/IsHexColor */ "./node_modules/class-validator/esm5/decorator/string/IsHexColor.js");
/* harmony import */ var _string_IsHexadecimal__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./string/IsHexadecimal */ "./node_modules/class-validator/esm5/decorator/string/IsHexadecimal.js");
/* harmony import */ var _string_IsMacAddress__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./string/IsMacAddress */ "./node_modules/class-validator/esm5/decorator/string/IsMacAddress.js");
/* harmony import */ var _string_IsIP__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./string/IsIP */ "./node_modules/class-validator/esm5/decorator/string/IsIP.js");
/* harmony import */ var _string_IsPort__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./string/IsPort */ "./node_modules/class-validator/esm5/decorator/string/IsPort.js");
/* harmony import */ var _string_IsISBN__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./string/IsISBN */ "./node_modules/class-validator/esm5/decorator/string/IsISBN.js");
/* harmony import */ var _string_IsISIN__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./string/IsISIN */ "./node_modules/class-validator/esm5/decorator/string/IsISIN.js");
/* harmony import */ var _string_IsISO8601__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./string/IsISO8601 */ "./node_modules/class-validator/esm5/decorator/string/IsISO8601.js");
/* harmony import */ var _string_IsJSON__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./string/IsJSON */ "./node_modules/class-validator/esm5/decorator/string/IsJSON.js");
/* harmony import */ var _string_IsJWT__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./string/IsJWT */ "./node_modules/class-validator/esm5/decorator/string/IsJWT.js");
/* harmony import */ var _string_IsLowercase__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./string/IsLowercase */ "./node_modules/class-validator/esm5/decorator/string/IsLowercase.js");
/* harmony import */ var _string_IsMobilePhone__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./string/IsMobilePhone */ "./node_modules/class-validator/esm5/decorator/string/IsMobilePhone.js");
/* harmony import */ var _string_IsISO31661Alpha2__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./string/IsISO31661Alpha2 */ "./node_modules/class-validator/esm5/decorator/string/IsISO31661Alpha2.js");
/* harmony import */ var _string_IsISO31661Alpha3__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./string/IsISO31661Alpha3 */ "./node_modules/class-validator/esm5/decorator/string/IsISO31661Alpha3.js");
/* harmony import */ var _string_IsMongoId__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./string/IsMongoId */ "./node_modules/class-validator/esm5/decorator/string/IsMongoId.js");
/* harmony import */ var _string_IsMultibyte__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./string/IsMultibyte */ "./node_modules/class-validator/esm5/decorator/string/IsMultibyte.js");
/* harmony import */ var _string_IsSurrogatePair__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./string/IsSurrogatePair */ "./node_modules/class-validator/esm5/decorator/string/IsSurrogatePair.js");
/* harmony import */ var _string_IsUrl__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./string/IsUrl */ "./node_modules/class-validator/esm5/decorator/string/IsUrl.js");
/* harmony import */ var _string_IsUUID__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./string/IsUUID */ "./node_modules/class-validator/esm5/decorator/string/IsUUID.js");
/* harmony import */ var _string_IsFirebasePushId__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./string/IsFirebasePushId */ "./node_modules/class-validator/esm5/decorator/string/IsFirebasePushId.js");
/* harmony import */ var _string_IsUppercase__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./string/IsUppercase */ "./node_modules/class-validator/esm5/decorator/string/IsUppercase.js");
/* harmony import */ var _string_Length__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./string/Length */ "./node_modules/class-validator/esm5/decorator/string/Length.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _string_Length__WEBPACK_IMPORTED_MODULE_60__["a"]; });

/* harmony import */ var _string_MaxLength__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./string/MaxLength */ "./node_modules/class-validator/esm5/decorator/string/MaxLength.js");
/* harmony import */ var _string_MinLength__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./string/MinLength */ "./node_modules/class-validator/esm5/decorator/string/MinLength.js");
/* harmony import */ var _string_Matches__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./string/Matches */ "./node_modules/class-validator/esm5/decorator/string/Matches.js");
/* harmony import */ var _string_IsPhoneNumber__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./string/IsPhoneNumber */ "./node_modules/class-validator/esm5/decorator/string/IsPhoneNumber.js");
/* harmony import */ var _string_IsMilitaryTime__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./string/IsMilitaryTime */ "./node_modules/class-validator/esm5/decorator/string/IsMilitaryTime.js");
/* harmony import */ var _string_IsHash__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./string/IsHash */ "./node_modules/class-validator/esm5/decorator/string/IsHash.js");
/* harmony import */ var _string_IsISSN__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./string/IsISSN */ "./node_modules/class-validator/esm5/decorator/string/IsISSN.js");
/* harmony import */ var _string_IsDateString__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./string/IsDateString */ "./node_modules/class-validator/esm5/decorator/string/IsDateString.js");
/* harmony import */ var _string_IsBooleanString__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./string/IsBooleanString */ "./node_modules/class-validator/esm5/decorator/string/IsBooleanString.js");
/* harmony import */ var _string_IsNumberString__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./string/IsNumberString */ "./node_modules/class-validator/esm5/decorator/string/IsNumberString.js");
/* harmony import */ var _string_IsBase32__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./string/IsBase32 */ "./node_modules/class-validator/esm5/decorator/string/IsBase32.js");
/* harmony import */ var _string_IsBIC__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./string/IsBIC */ "./node_modules/class-validator/esm5/decorator/string/IsBIC.js");
/* harmony import */ var _string_IsBtcAddress__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./string/IsBtcAddress */ "./node_modules/class-validator/esm5/decorator/string/IsBtcAddress.js");
/* harmony import */ var _string_IsDataURI__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./string/IsDataURI */ "./node_modules/class-validator/esm5/decorator/string/IsDataURI.js");
/* harmony import */ var _string_IsEAN__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./string/IsEAN */ "./node_modules/class-validator/esm5/decorator/string/IsEAN.js");
/* harmony import */ var _string_IsEthereumAddress__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./string/IsEthereumAddress */ "./node_modules/class-validator/esm5/decorator/string/IsEthereumAddress.js");
/* harmony import */ var _string_IsHSL__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./string/IsHSL */ "./node_modules/class-validator/esm5/decorator/string/IsHSL.js");
/* harmony import */ var _string_IsIBAN__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./string/IsIBAN */ "./node_modules/class-validator/esm5/decorator/string/IsIBAN.js");
/* harmony import */ var _string_IsIdentityCard__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./string/IsIdentityCard */ "./node_modules/class-validator/esm5/decorator/string/IsIdentityCard.js");
/* harmony import */ var _string_IsISRC__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./string/IsISRC */ "./node_modules/class-validator/esm5/decorator/string/IsISRC.js");
/* harmony import */ var _string_IsLocale__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./string/IsLocale */ "./node_modules/class-validator/esm5/decorator/string/IsLocale.js");
/* harmony import */ var _string_IsMagnetURI__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./string/IsMagnetURI */ "./node_modules/class-validator/esm5/decorator/string/IsMagnetURI.js");
/* harmony import */ var _string_IsMimeType__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./string/IsMimeType */ "./node_modules/class-validator/esm5/decorator/string/IsMimeType.js");
/* harmony import */ var _string_IsOctal__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./string/IsOctal */ "./node_modules/class-validator/esm5/decorator/string/IsOctal.js");
/* harmony import */ var _string_IsPassportNumber__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./string/IsPassportNumber */ "./node_modules/class-validator/esm5/decorator/string/IsPassportNumber.js");
/* harmony import */ var _string_IsPostalCode__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./string/IsPostalCode */ "./node_modules/class-validator/esm5/decorator/string/IsPostalCode.js");
/* harmony import */ var _string_IsRFC3339__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./string/IsRFC3339 */ "./node_modules/class-validator/esm5/decorator/string/IsRFC3339.js");
/* harmony import */ var _string_IsRgbColor__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./string/IsRgbColor */ "./node_modules/class-validator/esm5/decorator/string/IsRgbColor.js");
/* harmony import */ var _string_IsSemVer__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./string/IsSemVer */ "./node_modules/class-validator/esm5/decorator/string/IsSemVer.js");
/* harmony import */ var _typechecker_IsBoolean__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./typechecker/IsBoolean */ "./node_modules/class-validator/esm5/decorator/typechecker/IsBoolean.js");
/* harmony import */ var _typechecker_IsDate__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./typechecker/IsDate */ "./node_modules/class-validator/esm5/decorator/typechecker/IsDate.js");
/* harmony import */ var _typechecker_IsNumber__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./typechecker/IsNumber */ "./node_modules/class-validator/esm5/decorator/typechecker/IsNumber.js");
/* harmony import */ var _typechecker_IsEnum__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./typechecker/IsEnum */ "./node_modules/class-validator/esm5/decorator/typechecker/IsEnum.js");
/* harmony import */ var _typechecker_IsInt__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./typechecker/IsInt */ "./node_modules/class-validator/esm5/decorator/typechecker/IsInt.js");
/* harmony import */ var _typechecker_IsString__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./typechecker/IsString */ "./node_modules/class-validator/esm5/decorator/typechecker/IsString.js");
/* harmony import */ var _typechecker_IsArray__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./typechecker/IsArray */ "./node_modules/class-validator/esm5/decorator/typechecker/IsArray.js");
/* harmony import */ var _typechecker_IsObject__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./typechecker/IsObject */ "./node_modules/class-validator/esm5/decorator/typechecker/IsObject.js");
/* harmony import */ var _array_ArrayContains__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./array/ArrayContains */ "./node_modules/class-validator/esm5/decorator/array/ArrayContains.js");
/* harmony import */ var _array_ArrayNotContains__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./array/ArrayNotContains */ "./node_modules/class-validator/esm5/decorator/array/ArrayNotContains.js");
/* harmony import */ var _array_ArrayNotEmpty__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./array/ArrayNotEmpty */ "./node_modules/class-validator/esm5/decorator/array/ArrayNotEmpty.js");
/* harmony import */ var _array_ArrayMinSize__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./array/ArrayMinSize */ "./node_modules/class-validator/esm5/decorator/array/ArrayMinSize.js");
/* harmony import */ var _array_ArrayMaxSize__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./array/ArrayMaxSize */ "./node_modules/class-validator/esm5/decorator/array/ArrayMaxSize.js");
/* harmony import */ var _array_ArrayUnique__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./array/ArrayUnique */ "./node_modules/class-validator/esm5/decorator/array/ArrayUnique.js");
/* harmony import */ var _object_IsNotEmptyObject__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./object/IsNotEmptyObject */ "./node_modules/class-validator/esm5/decorator/object/IsNotEmptyObject.js");
/* harmony import */ var _object_IsInstance__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./object/IsInstance */ "./node_modules/class-validator/esm5/decorator/object/IsInstance.js");
// -------------------------------------------------------------------------
// System
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Common checkers
// -------------------------------------------------------------------------

















// -------------------------------------------------------------------------
// Number checkers
// -------------------------------------------------------------------------





// -------------------------------------------------------------------------
// Date checkers
// -------------------------------------------------------------------------


// -------------------------------------------------------------------------
// String checkers
// -------------------------------------------------------------------------


































































// -------------------------------------------------------------------------
// Type checkers
// -------------------------------------------------------------------------








// -------------------------------------------------------------------------
// Array checkers
// -------------------------------------------------------------------------






// -------------------------------------------------------------------------
// Object checkers
// -------------------------------------------------------------------------




/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/number/IsDivisibleBy.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/number/IsDivisibleBy.js ***!
  \*****************************************************************************/
/*! exports provided: IS_DIVISIBLE_BY, isDivisibleBy, IsDivisibleBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_DIVISIBLE_BY */
/* unused harmony export isDivisibleBy */
/* unused harmony export IsDivisibleBy */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isDivisibleBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isDivisibleBy */ "./node_modules/validator/lib/isDivisibleBy.js");
/* harmony import */ var validator_lib_isDivisibleBy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isDivisibleBy__WEBPACK_IMPORTED_MODULE_1__);


var IS_DIVISIBLE_BY = 'isDivisibleBy';
/**
 * Checks if value is a number that's divisible by another.
 */
function isDivisibleBy(value, num) {
    return typeof value === 'number' && typeof num === 'number' && validator_lib_isDivisibleBy__WEBPACK_IMPORTED_MODULE_1___default()(String(value), num);
}
/**
 * Checks if value is a number that's divisible by another.
 */
function IsDivisibleBy(num, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_DIVISIBLE_BY,
        constraints: [num],
        validator: {
            validate: function (value, args) { return isDivisibleBy(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be divisible by $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/number/IsNegative.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/number/IsNegative.js ***!
  \**************************************************************************/
/*! exports provided: IS_NEGATIVE, isNegative, IsNegative */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_NEGATIVE */
/* unused harmony export isNegative */
/* unused harmony export IsNegative */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_NEGATIVE = 'isNegative';
/**
 * Checks if the value is a negative number smaller than zero.
 */
function isNegative(value) {
    return typeof value === 'number' && value < 0;
}
/**
 * Checks if the value is a negative number smaller than zero.
 */
function IsNegative(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_NEGATIVE,
        validator: {
            validate: function (value, args) { return isNegative(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a negative number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/number/IsPositive.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/number/IsPositive.js ***!
  \**************************************************************************/
/*! exports provided: IS_POSITIVE, isPositive, IsPositive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_POSITIVE */
/* unused harmony export isPositive */
/* unused harmony export IsPositive */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_POSITIVE = 'isPositive';
/**
 * Checks if the value is a positive number greater than zero.
 */
function isPositive(value) {
    return typeof value === 'number' && value > 0;
}
/**
 * Checks if the value is a positive number greater than zero.
 */
function IsPositive(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_POSITIVE,
        validator: {
            validate: function (value, args) { return isPositive(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a positive number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/number/Max.js":
/*!*******************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/number/Max.js ***!
  \*******************************************************************/
/*! exports provided: MAX, max, Max */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MAX */
/* unused harmony export max */
/* unused harmony export Max */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var MAX = 'max';
/**
 * Checks if the first number is less than or equal to the second.
 */
function max(num, max) {
    return typeof num === 'number' && typeof max === 'number' && num <= max;
}
/**
 * Checks if the first number is less than or equal to the second.
 */
function Max(maxValue, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: MAX,
        constraints: [maxValue],
        validator: {
            validate: function (value, args) { return max(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must not be greater than $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/number/Min.js":
/*!*******************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/number/Min.js ***!
  \*******************************************************************/
/*! exports provided: MIN, min, Min */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MIN */
/* unused harmony export min */
/* unused harmony export Min */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var MIN = 'min';
/**
 * Checks if the first number is greater than or equal to the second.
 */
function min(num, min) {
    return typeof num === 'number' && typeof min === 'number' && num >= min;
}
/**
 * Checks if the first number is greater than or equal to the second.
 */
function Min(minValue, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: MIN,
        constraints: [minValue],
        validator: {
            validate: function (value, args) { return min(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must not be less than $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/object/IsInstance.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/object/IsInstance.js ***!
  \**************************************************************************/
/*! exports provided: IS_INSTANCE, isInstance, IsInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_INSTANCE */
/* unused harmony export isInstance */
/* unused harmony export IsInstance */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_INSTANCE = 'isInstance';
/**
 * Checks if the value is an instance of the specified object.
 */
function isInstance(object, targetTypeConstructor) {
    return (targetTypeConstructor && typeof targetTypeConstructor === 'function' && object instanceof targetTypeConstructor);
}
/**
 * Checks if the value is an instance of the specified object.
 */
function IsInstance(targetType, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_INSTANCE,
        constraints: [targetType],
        validator: {
            validate: function (value, args) { return isInstance(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix, args) {
                if (args.constraints[0]) {
                    return eachPrefix + ("$property must be an instance of " + args.constraints[0].name);
                }
                else {
                    return eachPrefix + (IS_INSTANCE + " decorator expects and object as value, but got falsy value.");
                }
            }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/object/IsNotEmptyObject.js":
/*!********************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/object/IsNotEmptyObject.js ***!
  \********************************************************************************/
/*! exports provided: IS_NOT_EMPTY_OBJECT, isNotEmptyObject, IsNotEmptyObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_NOT_EMPTY_OBJECT */
/* unused harmony export isNotEmptyObject */
/* unused harmony export IsNotEmptyObject */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var _typechecker_IsObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typechecker/IsObject */ "./node_modules/class-validator/esm5/decorator/typechecker/IsObject.js");


var IS_NOT_EMPTY_OBJECT = 'isNotEmptyObject';
/**
 * Checks if the value is valid Object & not empty.
 * Returns false if the value is not an object or an empty valid object.
 */
function isNotEmptyObject(value, options) {
    if (!Object(_typechecker_IsObject__WEBPACK_IMPORTED_MODULE_1__[/* isObject */ "a"])(value)) {
        return false;
    }
    if ((options === null || options === void 0 ? void 0 : options.nullable) === true) {
        return !Object.values(value).every(function (propertyValue) { return propertyValue === null || propertyValue === undefined; });
    }
    for (var key in value) {
        if (value.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}
/**
 * Checks if the value is valid Object & not empty.
 * Returns false if the value is not an object or an empty valid object.
 */
function IsNotEmptyObject(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_NOT_EMPTY_OBJECT,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isNotEmptyObject(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a non-empty object'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/Contains.js":
/*!************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/Contains.js ***!
  \************************************************************************/
/*! exports provided: CONTAINS, contains, Contains */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CONTAINS */
/* unused harmony export contains */
/* unused harmony export Contains */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_contains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/contains */ "./node_modules/validator/lib/contains.js");
/* harmony import */ var validator_lib_contains__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_contains__WEBPACK_IMPORTED_MODULE_1__);


var CONTAINS = 'contains';
/**
 * Checks if the string contains the seed.
 * If given value is not a string, then it returns false.
 */
function contains(value, seed) {
    return typeof value === 'string' && validator_lib_contains__WEBPACK_IMPORTED_MODULE_1___default()(value, seed);
}
/**
 * Checks if the string contains the seed.
 * If given value is not a string, then it returns false.
 */
function Contains(seed, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: CONTAINS,
        constraints: [seed],
        validator: {
            validate: function (value, args) { return contains(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain a $constraint1 string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsAlpha.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsAlpha.js ***!
  \***********************************************************************/
/*! exports provided: IS_ALPHA, isAlpha, IsAlpha */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ALPHA */
/* unused harmony export isAlpha */
/* unused harmony export IsAlpha */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isAlpha__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isAlpha */ "./node_modules/validator/lib/isAlpha.js");
/* harmony import */ var validator_lib_isAlpha__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isAlpha__WEBPACK_IMPORTED_MODULE_1__);


var IS_ALPHA = 'isAlpha';
/**
 * Checks if the string contains only letters (a-zA-Z).
 * If given value is not a string, then it returns false.
 */
function isAlpha(value, locale) {
    return typeof value === 'string' && validator_lib_isAlpha__WEBPACK_IMPORTED_MODULE_1___default()(value, locale);
}
/**
 * Checks if the string contains only letters (a-zA-Z).
 * If given value is not a string, then it returns false.
 */
function IsAlpha(locale, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ALPHA,
        constraints: [locale],
        validator: {
            validate: function (value, args) { return isAlpha(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain only letters (a-zA-Z)'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsAlphanumeric.js":
/*!******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsAlphanumeric.js ***!
  \******************************************************************************/
/*! exports provided: IS_ALPHANUMERIC, isAlphanumeric, IsAlphanumeric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ALPHANUMERIC */
/* unused harmony export isAlphanumeric */
/* unused harmony export IsAlphanumeric */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isAlphanumeric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isAlphanumeric */ "./node_modules/validator/lib/isAlphanumeric.js");
/* harmony import */ var validator_lib_isAlphanumeric__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isAlphanumeric__WEBPACK_IMPORTED_MODULE_1__);


var IS_ALPHANUMERIC = 'isAlphanumeric';
/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
function isAlphanumeric(value, locale) {
    return typeof value === 'string' && validator_lib_isAlphanumeric__WEBPACK_IMPORTED_MODULE_1___default()(value, locale);
}
/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
function IsAlphanumeric(locale, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ALPHANUMERIC,
        constraints: [locale],
        validator: {
            validate: function (value, args) { return isAlphanumeric(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain only letters and numbers'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsAscii.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsAscii.js ***!
  \***********************************************************************/
/*! exports provided: IS_ASCII, isAscii, IsAscii */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ASCII */
/* unused harmony export isAscii */
/* unused harmony export IsAscii */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isAscii__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isAscii */ "./node_modules/validator/lib/isAscii.js");
/* harmony import */ var validator_lib_isAscii__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isAscii__WEBPACK_IMPORTED_MODULE_1__);


var IS_ASCII = 'isAscii';
/**
 * Checks if the string contains ASCII chars only.
 * If given value is not a string, then it returns false.
 */
function isAscii(value) {
    return typeof value === 'string' && validator_lib_isAscii__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string contains ASCII chars only.
 * If given value is not a string, then it returns false.
 */
function IsAscii(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ASCII,
        validator: {
            validate: function (value, args) { return isAscii(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain only ASCII characters'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsBIC.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsBIC.js ***!
  \*********************************************************************/
/*! exports provided: IS_BIC, isBIC, IsBIC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BIC */
/* unused harmony export isBIC */
/* unused harmony export IsBIC */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isBIC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isBIC */ "./node_modules/validator/lib/isBIC.js");
/* harmony import */ var validator_lib_isBIC__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isBIC__WEBPACK_IMPORTED_MODULE_1__);


var IS_BIC = 'isBIC';
/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 * If given value is not a string, then it returns false.
 */
function isBIC(value) {
    return typeof value === 'string' && validator_lib_isBIC__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 * If given value is not a string, then it returns false.
 */
function IsBIC(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_BIC,
        validator: {
            validate: function (value, args) { return isBIC(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a BIC or SWIFT code'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsBase32.js":
/*!************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsBase32.js ***!
  \************************************************************************/
/*! exports provided: IS_BASE32, isBase32, IsBase32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BASE32 */
/* unused harmony export isBase32 */
/* unused harmony export IsBase32 */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isBase32__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isBase32 */ "./node_modules/validator/lib/isBase32.js");
/* harmony import */ var validator_lib_isBase32__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isBase32__WEBPACK_IMPORTED_MODULE_1__);


var IS_BASE32 = 'isBase32';
/**
 * Checks if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
function isBase32(value) {
    return typeof value === 'string' && validator_lib_isBase32__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
function IsBase32(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_BASE32,
        validator: {
            validate: function (value, args) { return isBase32(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be base32 encoded'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsBase64.js":
/*!************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsBase64.js ***!
  \************************************************************************/
/*! exports provided: IS_BASE64, isBase64, IsBase64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BASE64 */
/* unused harmony export isBase64 */
/* unused harmony export IsBase64 */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isBase64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isBase64 */ "./node_modules/validator/lib/isBase64.js");
/* harmony import */ var validator_lib_isBase64__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isBase64__WEBPACK_IMPORTED_MODULE_1__);


var IS_BASE64 = 'isBase64';
/**
 * Checks if a string is base64 encoded.
 * If given value is not a string, then it returns false.
 */
function isBase64(value) {
    return typeof value === 'string' && validator_lib_isBase64__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if a string is base64 encoded.
 * If given value is not a string, then it returns false.
 */
function IsBase64(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_BASE64,
        validator: {
            validate: function (value, args) { return isBase64(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be base64 encoded'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsBooleanString.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsBooleanString.js ***!
  \*******************************************************************************/
/*! exports provided: IS_BOOLEAN_STRING, isBooleanString, IsBooleanString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BOOLEAN_STRING */
/* unused harmony export isBooleanString */
/* unused harmony export IsBooleanString */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isBoolean__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isBoolean */ "./node_modules/validator/lib/isBoolean.js");
/* harmony import */ var validator_lib_isBoolean__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isBoolean__WEBPACK_IMPORTED_MODULE_1__);


var IS_BOOLEAN_STRING = 'isBooleanString';
/**
 * Checks if a string is a boolean.
 * If given value is not a string, then it returns false.
 */
function isBooleanString(value) {
    return typeof value === 'string' && validator_lib_isBoolean__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if a string is a boolean.
 * If given value is not a string, then it returns false.
 */
function IsBooleanString(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_BOOLEAN_STRING,
        validator: {
            validate: function (value, args) { return isBooleanString(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a boolean string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsBtcAddress.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsBtcAddress.js ***!
  \****************************************************************************/
/*! exports provided: IS_BTC_ADDRESS, isBtcAddress, IsBtcAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BTC_ADDRESS */
/* unused harmony export isBtcAddress */
/* unused harmony export IsBtcAddress */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isBtcAddress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isBtcAddress */ "./node_modules/validator/lib/isBtcAddress.js");
/* harmony import */ var validator_lib_isBtcAddress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isBtcAddress__WEBPACK_IMPORTED_MODULE_1__);


var IS_BTC_ADDRESS = 'isBtcAddress';
/**
 * Check if the string is a valid BTC address.
 * If given value is not a string, then it returns false.
 */
function isBtcAddress(value) {
    return typeof value === 'string' && validator_lib_isBtcAddress__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a valid BTC address.
 * If given value is not a string, then it returns false.
 */
function IsBtcAddress(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_BTC_ADDRESS,
        validator: {
            validate: function (value, args) { return isBtcAddress(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a BTC address'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsByteLength.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsByteLength.js ***!
  \****************************************************************************/
/*! exports provided: IS_BYTE_LENGTH, isByteLength, IsByteLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BYTE_LENGTH */
/* unused harmony export isByteLength */
/* unused harmony export IsByteLength */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isByteLength__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isByteLength */ "./node_modules/validator/lib/isByteLength.js");
/* harmony import */ var validator_lib_isByteLength__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isByteLength__WEBPACK_IMPORTED_MODULE_1__);


var IS_BYTE_LENGTH = 'isByteLength';
/**
 * Checks if the string's length (in bytes) falls in a range.
 * If given value is not a string, then it returns false.
 */
function isByteLength(value, min, max) {
    return typeof value === 'string' && validator_lib_isByteLength__WEBPACK_IMPORTED_MODULE_1___default()(value, { min: min, max: max });
}
/**
 * Checks if the string's length (in bytes) falls in a range.
 * If given value is not a string, then it returns false.
 */
function IsByteLength(min, max, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_BYTE_LENGTH,
        constraints: [min, max],
        validator: {
            validate: function (value, args) { return isByteLength(value, args.constraints[0], args.constraints[1]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + "$property's byte length must fall into ($constraint1, $constraint2) range"; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsCreditCard.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsCreditCard.js ***!
  \****************************************************************************/
/*! exports provided: IS_CREDIT_CARD, isCreditCard, IsCreditCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_CREDIT_CARD */
/* unused harmony export isCreditCard */
/* unused harmony export IsCreditCard */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isCreditCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isCreditCard */ "./node_modules/validator/lib/isCreditCard.js");
/* harmony import */ var validator_lib_isCreditCard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isCreditCard__WEBPACK_IMPORTED_MODULE_1__);


var IS_CREDIT_CARD = 'isCreditCard';
/**
 * Checks if the string is a credit card.
 * If given value is not a string, then it returns false.
 */
function isCreditCard(value) {
    return typeof value === 'string' && validator_lib_isCreditCard__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is a credit card.
 * If given value is not a string, then it returns false.
 */
function IsCreditCard(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_CREDIT_CARD,
        validator: {
            validate: function (value, args) { return isCreditCard(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a credit card'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsCurrency.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsCurrency.js ***!
  \**************************************************************************/
/*! exports provided: IS_CURRENCY, isCurrency, IsCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_CURRENCY */
/* unused harmony export isCurrency */
/* unused harmony export IsCurrency */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isCurrency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isCurrency */ "./node_modules/validator/lib/isCurrency.js");
/* harmony import */ var validator_lib_isCurrency__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isCurrency__WEBPACK_IMPORTED_MODULE_1__);


var IS_CURRENCY = 'isCurrency';
/**
 * Checks if the string is a valid currency amount.
 * If given value is not a string, then it returns false.
 */
function isCurrency(value, options) {
    return typeof value === 'string' && validator_lib_isCurrency__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string is a valid currency amount.
 * If given value is not a string, then it returns false.
 */
function IsCurrency(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_CURRENCY,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isCurrency(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a currency'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsDataURI.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsDataURI.js ***!
  \*************************************************************************/
/*! exports provided: IS_DATA_URI, isDataURI, IsDataURI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_DATA_URI */
/* unused harmony export isDataURI */
/* unused harmony export IsDataURI */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isDataURI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isDataURI */ "./node_modules/validator/lib/isDataURI.js");
/* harmony import */ var validator_lib_isDataURI__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isDataURI__WEBPACK_IMPORTED_MODULE_1__);


var IS_DATA_URI = 'isDataURI';
/**
 * Check if the string is a data uri format.
 * If given value is not a string, then it returns false.
 */
function isDataURI(value) {
    return typeof value === 'string' && validator_lib_isDataURI__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a data uri format.
 * If given value is not a string, then it returns false.
 */
function IsDataURI(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_DATA_URI,
        validator: {
            validate: function (value, args) { return isDataURI(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a data uri format'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsDateString.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsDateString.js ***!
  \****************************************************************************/
/*! exports provided: IS_DATE_STRING, isDateString, IsDateString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_DATE_STRING */
/* unused harmony export isDateString */
/* unused harmony export IsDateString */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var _IsISO8601__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsISO8601 */ "./node_modules/class-validator/esm5/decorator/string/IsISO8601.js");


var IS_DATE_STRING = 'isDateString';
/**
 * Alias for IsISO8601 validator
 */
function isDateString(value, options) {
    return Object(_IsISO8601__WEBPACK_IMPORTED_MODULE_1__[/* isISO8601 */ "a"])(value, options);
}
/**
 * Alias for IsISO8601 validator
 */
function IsDateString(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_DATE_STRING,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isDateString(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid ISO 8601 date string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsDecimal.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsDecimal.js ***!
  \*************************************************************************/
/*! exports provided: IS_DECIMAL, isDecimal, IsDecimal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_DECIMAL */
/* unused harmony export isDecimal */
/* unused harmony export IsDecimal */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isDecimal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isDecimal */ "./node_modules/validator/lib/isDecimal.js");
/* harmony import */ var validator_lib_isDecimal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isDecimal__WEBPACK_IMPORTED_MODULE_1__);


var IS_DECIMAL = 'isDecimal';
/**
 * Checks if the string is a valid decimal.
 * If given value is not a string, then it returns false.
 */
function isDecimal(value, options) {
    return typeof value === 'string' && validator_lib_isDecimal__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
function IsDecimal(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_DECIMAL,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isDecimal(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property is not a valid decimal number.'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsEAN.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsEAN.js ***!
  \*********************************************************************/
/*! exports provided: IS_EAN, isEAN, IsEAN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_EAN */
/* unused harmony export isEAN */
/* unused harmony export IsEAN */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isEAN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isEAN */ "./node_modules/validator/lib/isEAN.js");
/* harmony import */ var validator_lib_isEAN__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isEAN__WEBPACK_IMPORTED_MODULE_1__);


var IS_EAN = 'isEAN';
/**
 * Check if the string is an EAN (European Article Number).
 * If given value is not a string, then it returns false.
 */
function isEAN(value) {
    return typeof value === 'string' && validator_lib_isEAN__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is an EAN (European Article Number).
 * If given value is not a string, then it returns false.
 */
function IsEAN(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_EAN,
        validator: {
            validate: function (value, args) { return isEAN(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an EAN (European Article Number)'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsEmail.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsEmail.js ***!
  \***********************************************************************/
/*! exports provided: IS_EMAIL, isEmail, IsEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_EMAIL */
/* unused harmony export isEmail */
/* unused harmony export IsEmail */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isEmail */ "./node_modules/validator/lib/isEmail.js");
/* harmony import */ var validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_1__);


var IS_EMAIL = 'isEmail';
/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
function isEmail(value, options) {
    return typeof value === 'string' && validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
function IsEmail(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_EMAIL,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isEmail(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an email'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsEthereumAddress.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsEthereumAddress.js ***!
  \*********************************************************************************/
/*! exports provided: IS_ETHEREUM_ADDRESS, isEthereumAddress, IsEthereumAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ETHEREUM_ADDRESS */
/* unused harmony export isEthereumAddress */
/* unused harmony export IsEthereumAddress */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isEthereumAddress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isEthereumAddress */ "./node_modules/validator/lib/isEthereumAddress.js");
/* harmony import */ var validator_lib_isEthereumAddress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isEthereumAddress__WEBPACK_IMPORTED_MODULE_1__);


var IS_ETHEREUM_ADDRESS = 'isEthereumAddress';
/**
 * Check if the string is an Ethereum address using basic regex. Does not validate address checksums.
 * If given value is not a string, then it returns false.
 */
function isEthereumAddress(value) {
    return typeof value === 'string' && validator_lib_isEthereumAddress__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is an Ethereum address using basic regex. Does not validate address checksums.
 * If given value is not a string, then it returns false.
 */
function IsEthereumAddress(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ETHEREUM_ADDRESS,
        validator: {
            validate: function (value, args) { return isEthereumAddress(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an Ethereum address'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsFQDN.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsFQDN.js ***!
  \**********************************************************************/
/*! exports provided: IS_FQDN, isFQDN, IsFQDN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_FQDN */
/* unused harmony export isFQDN */
/* unused harmony export IsFQDN */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isFQDN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isFQDN */ "./node_modules/validator/lib/isFQDN.js");
/* harmony import */ var validator_lib_isFQDN__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isFQDN__WEBPACK_IMPORTED_MODULE_1__);


var IS_FQDN = 'isFqdn';
/**
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * If given value is not a string, then it returns false.
 */
function isFQDN(value, options) {
    return typeof value === 'string' && validator_lib_isFQDN__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * If given value is not a string, then it returns false.
 */
function IsFQDN(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_FQDN,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isFQDN(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid domain name'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsFirebasePushId.js":
/*!********************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsFirebasePushId.js ***!
  \********************************************************************************/
/*! exports provided: IS_FIREBASE_PUSH_ID, isFirebasePushId, IsFirebasePushId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_FIREBASE_PUSH_ID */
/* unused harmony export isFirebasePushId */
/* unused harmony export IsFirebasePushId */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_FIREBASE_PUSH_ID = 'IsFirebasePushId';
/**
 * Checks if the string is a Firebase Push Id
 * If given value is not a Firebase Push Id, it returns false
 */
function isFirebasePushId(value) {
    var webSafeRegex = /^[a-zA-Z0-9_-]*$/;
    return typeof value === 'string' && value.length === 20 && webSafeRegex.test(value);
}
/**
 * Checks if the string is a Firebase Push Id
 * If given value is not a Firebase Push Id, it returns false
 */
function IsFirebasePushId(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_FIREBASE_PUSH_ID,
        validator: {
            validate: function (value, args) { return isFirebasePushId(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a Firebase Push Id'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsFullWidth.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsFullWidth.js ***!
  \***************************************************************************/
/*! exports provided: IS_FULL_WIDTH, isFullWidth, IsFullWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_FULL_WIDTH */
/* unused harmony export isFullWidth */
/* unused harmony export IsFullWidth */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isFullWidth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isFullWidth */ "./node_modules/validator/lib/isFullWidth.js");
/* harmony import */ var validator_lib_isFullWidth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isFullWidth__WEBPACK_IMPORTED_MODULE_1__);


var IS_FULL_WIDTH = 'isFullWidth';
/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
function isFullWidth(value) {
    return typeof value === 'string' && validator_lib_isFullWidth__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
function IsFullWidth(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_FULL_WIDTH,
        validator: {
            validate: function (value, args) { return isFullWidth(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain a full-width characters'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsHSL.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsHSL.js ***!
  \*********************************************************************/
/*! exports provided: IS_HSL, isHSL, IsHSL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_HSL */
/* unused harmony export isHSL */
/* unused harmony export IsHSL */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isHSL__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isHSL */ "./node_modules/validator/lib/isHSL.js");
/* harmony import */ var validator_lib_isHSL__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isHSL__WEBPACK_IMPORTED_MODULE_1__);


var IS_HSL = 'isHSL';
/**
 * Check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 * If given value is not a string, then it returns false.
 */
function isHSL(value) {
    return typeof value === 'string' && validator_lib_isHSL__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 * If given value is not a string, then it returns false.
 */
function IsHSL(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_HSL,
        validator: {
            validate: function (value, args) { return isHSL(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a HSL color'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsHalfWidth.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsHalfWidth.js ***!
  \***************************************************************************/
/*! exports provided: IS_HALF_WIDTH, isHalfWidth, IsHalfWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_HALF_WIDTH */
/* unused harmony export isHalfWidth */
/* unused harmony export IsHalfWidth */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isHalfWidth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isHalfWidth */ "./node_modules/validator/lib/isHalfWidth.js");
/* harmony import */ var validator_lib_isHalfWidth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isHalfWidth__WEBPACK_IMPORTED_MODULE_1__);


var IS_HALF_WIDTH = 'isHalfWidth';
/**
 * Checks if the string contains any half-width chars.
 * If given value is not a string, then it returns false.
 */
function isHalfWidth(value) {
    return typeof value === 'string' && validator_lib_isHalfWidth__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
function IsHalfWidth(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_HALF_WIDTH,
        validator: {
            validate: function (value, args) { return isHalfWidth(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain a half-width characters'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsHash.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsHash.js ***!
  \**********************************************************************/
/*! exports provided: IS_HASH, isHash, IsHash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_HASH */
/* unused harmony export isHash */
/* unused harmony export IsHash */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isHash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isHash */ "./node_modules/validator/lib/isHash.js");
/* harmony import */ var validator_lib_isHash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isHash__WEBPACK_IMPORTED_MODULE_1__);


var IS_HASH = 'isHash';
/**
 * Check if the string is a hash of type algorithm.
 * Algorithm is one of ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128',
 * 'tiger160', 'tiger192', 'crc32', 'crc32b']
 */
function isHash(value, algorithm) {
    return typeof value === 'string' && validator_lib_isHash__WEBPACK_IMPORTED_MODULE_1___default()(value, algorithm);
}
/**
 * Check if the string is a hash of type algorithm.
 * Algorithm is one of ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128',
 * 'tiger160', 'tiger192', 'crc32', 'crc32b']
 */
function IsHash(algorithm, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_HASH,
        constraints: [algorithm],
        validator: {
            validate: function (value, args) { return isHash(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a hash of type $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsHexColor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsHexColor.js ***!
  \**************************************************************************/
/*! exports provided: IS_HEX_COLOR, isHexColor, IsHexColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_HEX_COLOR */
/* unused harmony export isHexColor */
/* unused harmony export IsHexColor */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isHexColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isHexColor */ "./node_modules/validator/lib/isHexColor.js");
/* harmony import */ var validator_lib_isHexColor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isHexColor__WEBPACK_IMPORTED_MODULE_1__);


var IS_HEX_COLOR = 'isHexColor';
/**
 * Checks if the string is a hexadecimal color.
 * If given value is not a string, then it returns false.
 */
function isHexColor(value) {
    return typeof value === 'string' && validator_lib_isHexColor__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is a hexadecimal color.
 * If given value is not a string, then it returns false.
 */
function IsHexColor(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_HEX_COLOR,
        validator: {
            validate: function (value, args) { return isHexColor(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a hexadecimal color'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsHexadecimal.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsHexadecimal.js ***!
  \*****************************************************************************/
/*! exports provided: IS_HEXADECIMAL, isHexadecimal, IsHexadecimal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_HEXADECIMAL */
/* unused harmony export isHexadecimal */
/* unused harmony export IsHexadecimal */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isHexadecimal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isHexadecimal */ "./node_modules/validator/lib/isHexadecimal.js");
/* harmony import */ var validator_lib_isHexadecimal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isHexadecimal__WEBPACK_IMPORTED_MODULE_1__);


var IS_HEXADECIMAL = 'isHexadecimal';
/**
 * Checks if the string is a hexadecimal number.
 * If given value is not a string, then it returns false.
 */
function isHexadecimal(value) {
    return typeof value === 'string' && validator_lib_isHexadecimal__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is a hexadecimal number.
 * If given value is not a string, then it returns false.
 */
function IsHexadecimal(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_HEXADECIMAL,
        validator: {
            validate: function (value, args) { return isHexadecimal(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a hexadecimal number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsIBAN.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsIBAN.js ***!
  \**********************************************************************/
/*! exports provided: IS_IBAN, isIBAN, IsIBAN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_IBAN */
/* unused harmony export isIBAN */
/* unused harmony export IsIBAN */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isIBAN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isIBAN */ "./node_modules/validator/lib/isIBAN.js");
/* harmony import */ var validator_lib_isIBAN__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isIBAN__WEBPACK_IMPORTED_MODULE_1__);


var IS_IBAN = 'isIBAN';
/**
 * Check if a string is a IBAN (International Bank Account Number).
 * If given value is not a string, then it returns false.
 */
function isIBAN(value) {
    return typeof value === 'string' && validator_lib_isIBAN__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if a string is a IBAN (International Bank Account Number).
 * If given value is not a string, then it returns false.
 */
function IsIBAN(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_IBAN,
        validator: {
            validate: function (value, args) { return isIBAN(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an IBAN'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsIP.js":
/*!********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsIP.js ***!
  \********************************************************************/
/*! exports provided: IS_IP, isIP, IsIP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_IP */
/* unused harmony export isIP */
/* unused harmony export IsIP */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isIP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isIP */ "./node_modules/validator/lib/isIP.js");
/* harmony import */ var validator_lib_isIP__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isIP__WEBPACK_IMPORTED_MODULE_1__);


var IS_IP = 'isIp';
/**
 * Checks if the string is an IP (version 4 or 6).
 * If given value is not a string, then it returns false.
 */
function isIP(value, version) {
    var versionStr = version ? "" + version : undefined;
    return typeof value === 'string' && validator_lib_isIP__WEBPACK_IMPORTED_MODULE_1___default()(value, versionStr);
}
/**
 * Checks if the string is an IP (version 4 or 6).
 * If given value is not a string, then it returns false.
 */
function IsIP(version, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_IP,
        constraints: [version],
        validator: {
            validate: function (value, args) { return isIP(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an ip address'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsISBN.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsISBN.js ***!
  \**********************************************************************/
/*! exports provided: IS_ISBN, isISBN, IsISBN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ISBN */
/* unused harmony export isISBN */
/* unused harmony export IsISBN */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isISBN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isISBN */ "./node_modules/validator/lib/isISBN.js");
/* harmony import */ var validator_lib_isISBN__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isISBN__WEBPACK_IMPORTED_MODULE_1__);


var IS_ISBN = 'isIsbn';
/**
 * Checks if the string is an ISBN (version 10 or 13).
 * If given value is not a string, then it returns false.
 */
function isISBN(value, version) {
    var versionStr = version ? "" + version : undefined;
    return typeof value === 'string' && validator_lib_isISBN__WEBPACK_IMPORTED_MODULE_1___default()(value, versionStr);
}
/**
 * Checks if the string is an ISBN (version 10 or 13).
 * If given value is not a string, then it returns false.
 */
function IsISBN(version, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ISBN,
        constraints: [version],
        validator: {
            validate: function (value, args) { return isISBN(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an ISBN'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsISIN.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsISIN.js ***!
  \**********************************************************************/
/*! exports provided: IS_ISIN, isISIN, IsISIN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ISIN */
/* unused harmony export isISIN */
/* unused harmony export IsISIN */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isISIN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isISIN */ "./node_modules/validator/lib/isISIN.js");
/* harmony import */ var validator_lib_isISIN__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isISIN__WEBPACK_IMPORTED_MODULE_1__);


var IS_ISIN = 'isIsin';
/**
 * Checks if the string is an ISIN (stock/security identifier).
 * If given value is not a string, then it returns false.
 */
function isISIN(value) {
    return typeof value === 'string' && validator_lib_isISIN__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is an ISIN (stock/security identifier).
 * If given value is not a string, then it returns false.
 */
function IsISIN(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ISIN,
        validator: {
            validate: function (value, args) { return isISIN(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an ISIN (stock/security identifier)'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsISO31661Alpha2.js":
/*!********************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsISO31661Alpha2.js ***!
  \********************************************************************************/
/*! exports provided: IS_ISO31661_ALPHA_2, isISO31661Alpha2, IsISO31661Alpha2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ISO31661_ALPHA_2 */
/* unused harmony export isISO31661Alpha2 */
/* unused harmony export IsISO31661Alpha2 */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isISO31661Alpha2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isISO31661Alpha2 */ "./node_modules/validator/lib/isISO31661Alpha2.js");
/* harmony import */ var validator_lib_isISO31661Alpha2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isISO31661Alpha2__WEBPACK_IMPORTED_MODULE_1__);


var IS_ISO31661_ALPHA_2 = 'isISO31661Alpha2';
/**
 * Check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
 */
function isISO31661Alpha2(value) {
    return typeof value === 'string' && validator_lib_isISO31661Alpha2__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
 */
function IsISO31661Alpha2(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ISO31661_ALPHA_2,
        validator: {
            validate: function (value, args) { return isISO31661Alpha2(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid ISO31661 Alpha2 code'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsISO31661Alpha3.js":
/*!********************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsISO31661Alpha3.js ***!
  \********************************************************************************/
/*! exports provided: IS_ISO31661_ALPHA_3, isISO31661Alpha3, IsISO31661Alpha3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ISO31661_ALPHA_3 */
/* unused harmony export isISO31661Alpha3 */
/* unused harmony export IsISO31661Alpha3 */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isISO31661Alpha3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isISO31661Alpha3 */ "./node_modules/validator/lib/isISO31661Alpha3.js");
/* harmony import */ var validator_lib_isISO31661Alpha3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isISO31661Alpha3__WEBPACK_IMPORTED_MODULE_1__);


var IS_ISO31661_ALPHA_3 = 'isISO31661Alpha3';
/**
 * Check if the string is a valid [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned country code.
 */
function isISO31661Alpha3(value) {
    return typeof value === 'string' && validator_lib_isISO31661Alpha3__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a valid [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned country code.
 */
function IsISO31661Alpha3(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ISO31661_ALPHA_3,
        validator: {
            validate: function (value, args) { return isISO31661Alpha3(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid ISO31661 Alpha3 code'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsISO8601.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsISO8601.js ***!
  \*************************************************************************/
/*! exports provided: IS_ISO8601, isISO8601, IsISO8601 */
/*! exports used: isISO8601 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ISO8601 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isISO8601; });
/* unused harmony export IsISO8601 */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isISO8601__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isISO8601 */ "./node_modules/validator/lib/isISO8601.js");
/* harmony import */ var validator_lib_isISO8601__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isISO8601__WEBPACK_IMPORTED_MODULE_1__);


var IS_ISO8601 = 'isIso8601';
/**
 * Checks if the string is a valid ISO 8601 date.
 * If given value is not a string, then it returns false.
 * Use the option strict = true for additional checks for a valid date, e.g. invalidates dates like 2019-02-29.
 */
function isISO8601(value, options) {
    return typeof value === 'string' && validator_lib_isISO8601__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string is a valid ISO 8601 date.
 * If given value is not a string, then it returns false.
 * Use the option strict = true for additional checks for a valid date, e.g. invalidates dates like 2019-02-29.
 */
function IsISO8601(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ISO8601,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isISO8601(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid ISO 8601 date string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsISRC.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsISRC.js ***!
  \**********************************************************************/
/*! exports provided: IS_ISRC, isISRC, IsISRC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ISRC */
/* unused harmony export isISRC */
/* unused harmony export IsISRC */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isISRC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isISRC */ "./node_modules/validator/lib/isISRC.js");
/* harmony import */ var validator_lib_isISRC__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isISRC__WEBPACK_IMPORTED_MODULE_1__);


var IS_ISRC = 'isISRC';
/**
 * Check if the string is a ISRC.
 * If given value is not a string, then it returns false.
 */
function isISRC(value) {
    return typeof value === 'string' && validator_lib_isISRC__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a ISRC.
 * If given value is not a string, then it returns false.
 */
function IsISRC(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ISRC,
        validator: {
            validate: function (value, args) { return isISRC(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an ISRC'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsISSN.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsISSN.js ***!
  \**********************************************************************/
/*! exports provided: IS_ISSN, isISSN, IsISSN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ISSN */
/* unused harmony export isISSN */
/* unused harmony export IsISSN */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isISSN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isISSN */ "./node_modules/validator/lib/isISSN.js");
/* harmony import */ var validator_lib_isISSN__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isISSN__WEBPACK_IMPORTED_MODULE_1__);


var IS_ISSN = 'isISSN';
/**
 * Checks if the string is a ISSN.
 * If given value is not a string, then it returns false.
 */
function isISSN(value, options) {
    return typeof value === 'string' && validator_lib_isISSN__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string is a ISSN.
 * If given value is not a string, then it returns false.
 */
function IsISSN(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ISSN,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isISSN(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a ISSN'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsIdentityCard.js":
/*!******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsIdentityCard.js ***!
  \******************************************************************************/
/*! exports provided: IS_IDENTITY_CARD, isIdentityCard, IsIdentityCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_IDENTITY_CARD */
/* unused harmony export isIdentityCard */
/* unused harmony export IsIdentityCard */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isIdentityCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isIdentityCard */ "./node_modules/validator/lib/isIdentityCard.js");
/* harmony import */ var validator_lib_isIdentityCard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isIdentityCard__WEBPACK_IMPORTED_MODULE_1__);


var IS_IDENTITY_CARD = 'isIdentityCard';
/**
 * Check if the string is a valid identity card code.
 * locale is one of ['ES', 'zh-TW', 'he-IL', 'ar-TN'] OR 'any'. If 'any' is used, function will check if any of the locals match.
 * Defaults to 'any'.
 * If given value is not a string, then it returns false.
 */
function isIdentityCard(value, locale) {
    return typeof value === 'string' && validator_lib_isIdentityCard__WEBPACK_IMPORTED_MODULE_1___default()(value, locale);
}
/**
 * Check if the string is a valid identity card code.
 * locale is one of ['ES', 'zh-TW', 'he-IL', 'ar-TN'] OR 'any'. If 'any' is used, function will check if any of the locals match.
 * Defaults to 'any'.
 * If given value is not a string, then it returns false.
 */
function IsIdentityCard(locale, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_IDENTITY_CARD,
        constraints: [locale],
        validator: {
            validate: function (value, args) { return isIdentityCard(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a identity card number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsJSON.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsJSON.js ***!
  \**********************************************************************/
/*! exports provided: IS_JSON, isJSON, IsJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_JSON */
/* unused harmony export isJSON */
/* unused harmony export IsJSON */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isJSON__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isJSON */ "./node_modules/validator/lib/isJSON.js");
/* harmony import */ var validator_lib_isJSON__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isJSON__WEBPACK_IMPORTED_MODULE_1__);


var IS_JSON = 'isJson';
/**
 * Checks if the string is valid JSON (note: uses JSON.parse).
 * If given value is not a string, then it returns false.
 */
function isJSON(value) {
    return typeof value === 'string' && validator_lib_isJSON__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is valid JSON (note: uses JSON.parse).
 * If given value is not a string, then it returns false.
 */
function IsJSON(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_JSON,
        validator: {
            validate: function (value, args) { return isJSON(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a json string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsJWT.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsJWT.js ***!
  \*********************************************************************/
/*! exports provided: IS_JWT, isJWT, IsJWT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_JWT */
/* unused harmony export isJWT */
/* unused harmony export IsJWT */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isJWT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isJWT */ "./node_modules/validator/lib/isJWT.js");
/* harmony import */ var validator_lib_isJWT__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isJWT__WEBPACK_IMPORTED_MODULE_1__);


var IS_JWT = 'isJwt';
/**
 * Checks if the string is valid JWT token.
 * If given value is not a string, then it returns false.
 */
function isJWT(value) {
    return typeof value === 'string' && validator_lib_isJWT__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is valid JWT token.
 * If given value is not a string, then it returns false.
 */
function IsJWT(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_JWT,
        validator: {
            validate: function (value, args) { return isJWT(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a jwt string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsLocale.js":
/*!************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsLocale.js ***!
  \************************************************************************/
/*! exports provided: IS_LOCALE, isLocale, IsLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_LOCALE */
/* unused harmony export isLocale */
/* unused harmony export IsLocale */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isLocale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isLocale */ "./node_modules/validator/lib/isLocale.js");
/* harmony import */ var validator_lib_isLocale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isLocale__WEBPACK_IMPORTED_MODULE_1__);


var IS_LOCALE = 'isLocale';
/**
 * Check if the string is a locale.
 * If given value is not a string, then it returns false.
 */
function isLocale(value) {
    return typeof value === 'string' && validator_lib_isLocale__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a locale.
 * If given value is not a string, then it returns false.
 */
function IsLocale(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_LOCALE,
        validator: {
            validate: function (value, args) { return isLocale(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be locale'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsLowercase.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsLowercase.js ***!
  \***************************************************************************/
/*! exports provided: IS_LOWERCASE, isLowercase, IsLowercase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_LOWERCASE */
/* unused harmony export isLowercase */
/* unused harmony export IsLowercase */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isLowercase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isLowercase */ "./node_modules/validator/lib/isLowercase.js");
/* harmony import */ var validator_lib_isLowercase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isLowercase__WEBPACK_IMPORTED_MODULE_1__);


var IS_LOWERCASE = 'isLowercase';
/**
 * Checks if the string is lowercase.
 * If given value is not a string, then it returns false.
 */
function isLowercase(value) {
    return typeof value === 'string' && validator_lib_isLowercase__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is lowercase.
 * If given value is not a string, then it returns false.
 */
function IsLowercase(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_LOWERCASE,
        validator: {
            validate: function (value, args) { return isLowercase(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a lowercase string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsMacAddress.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsMacAddress.js ***!
  \****************************************************************************/
/*! exports provided: IS_MAC_ADDRESS, isMACAddress, IsMACAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_MAC_ADDRESS */
/* unused harmony export isMACAddress */
/* unused harmony export IsMACAddress */
/* harmony import */ var _ValidationOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ValidationOptions */ "./node_modules/class-validator/esm5/decorator/ValidationOptions.js");
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isMACAddress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! validator/lib/isMACAddress */ "./node_modules/validator/lib/isMACAddress.js");
/* harmony import */ var validator_lib_isMACAddress__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isMACAddress__WEBPACK_IMPORTED_MODULE_2__);



var IS_MAC_ADDRESS = 'isMacAddress';
/**
 * Check if the string is a MAC address.
 * If given value is not a string, then it returns false.
 */
function isMACAddress(value, options) {
    return typeof value === 'string' && validator_lib_isMACAddress__WEBPACK_IMPORTED_MODULE_2___default()(value, options);
}
function IsMACAddress(optionsOrValidationOptionsArg, validationOptionsArg) {
    var options = !Object(_ValidationOptions__WEBPACK_IMPORTED_MODULE_0__[/* isValidationOptions */ "a"])(optionsOrValidationOptionsArg) ? optionsOrValidationOptionsArg : undefined;
    var validationOptions = Object(_ValidationOptions__WEBPACK_IMPORTED_MODULE_0__[/* isValidationOptions */ "a"])(optionsOrValidationOptionsArg)
        ? optionsOrValidationOptionsArg
        : validationOptionsArg;
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_1__[/* ValidateBy */ "a"])({
        name: IS_MAC_ADDRESS,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isMACAddress(value, options); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_1__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a MAC Address'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsMagnetURI.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsMagnetURI.js ***!
  \***************************************************************************/
/*! exports provided: IS_MAGNET_URI, isMagnetURI, IsMagnetURI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_MAGNET_URI */
/* unused harmony export isMagnetURI */
/* unused harmony export IsMagnetURI */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isMagnetURI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isMagnetURI */ "./node_modules/validator/lib/isMagnetURI.js");
/* harmony import */ var validator_lib_isMagnetURI__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isMagnetURI__WEBPACK_IMPORTED_MODULE_1__);


var IS_MAGNET_URI = 'isMagnetURI';
/**
 * Check if the string is a magnet uri format.
 * If given value is not a string, then it returns false.
 */
function isMagnetURI(value) {
    return typeof value === 'string' && validator_lib_isMagnetURI__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a magnet uri format.
 * If given value is not a string, then it returns false.
 */
function IsMagnetURI(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_MAGNET_URI,
        validator: {
            validate: function (value, args) { return isMagnetURI(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be magnet uri format'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsMilitaryTime.js":
/*!******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsMilitaryTime.js ***!
  \******************************************************************************/
/*! exports provided: IS_MILITARY_TIME, isMilitaryTime, IsMilitaryTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_MILITARY_TIME */
/* unused harmony export isMilitaryTime */
/* unused harmony export IsMilitaryTime */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_matches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/matches */ "./node_modules/validator/lib/matches.js");
/* harmony import */ var validator_lib_matches__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_matches__WEBPACK_IMPORTED_MODULE_1__);


var IS_MILITARY_TIME = 'isMilitaryTime';
/**
 * Checks if the string represents a time without a given timezone in the format HH:MM (military)
 * If the given value does not match the pattern HH:MM, then it returns false.
 */
function isMilitaryTime(value) {
    var militaryTimeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    return typeof value === 'string' && validator_lib_matches__WEBPACK_IMPORTED_MODULE_1___default()(value, militaryTimeRegex);
}
/**
 * Checks if the string represents a time without a given timezone in the format HH:MM (military)
 * If the given value does not match the pattern HH:MM, then it returns false.
 */
function IsMilitaryTime(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_MILITARY_TIME,
        validator: {
            validate: function (value, args) { return isMilitaryTime(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid representation of military time in the format HH:MM'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsMimeType.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsMimeType.js ***!
  \**************************************************************************/
/*! exports provided: IS_MIME_TYPE, isMimeType, IsMimeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_MIME_TYPE */
/* unused harmony export isMimeType */
/* unused harmony export IsMimeType */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isMimeType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isMimeType */ "./node_modules/validator/lib/isMimeType.js");
/* harmony import */ var validator_lib_isMimeType__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isMimeType__WEBPACK_IMPORTED_MODULE_1__);


var IS_MIME_TYPE = 'isMimeType';
/**
 * Check if the string matches to a valid MIME type format
 * If given value is not a string, then it returns false.
 */
function isMimeType(value) {
    return typeof value === 'string' && validator_lib_isMimeType__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string matches to a valid MIME type format
 * If given value is not a string, then it returns false.
 */
function IsMimeType(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_MIME_TYPE,
        validator: {
            validate: function (value, args) { return isMimeType(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be MIME type format'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsMobilePhone.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsMobilePhone.js ***!
  \*****************************************************************************/
/*! exports provided: IS_MOBILE_PHONE, isMobilePhone, IsMobilePhone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_MOBILE_PHONE */
/* unused harmony export isMobilePhone */
/* unused harmony export IsMobilePhone */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isMobilePhone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isMobilePhone */ "./node_modules/validator/lib/isMobilePhone.js");
/* harmony import */ var validator_lib_isMobilePhone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isMobilePhone__WEBPACK_IMPORTED_MODULE_1__);


var IS_MOBILE_PHONE = 'isMobilePhone';
/**
 * Checks if the string is a mobile phone number (locale is either an array of locales (e.g ['sk-SK', 'sr-RS'])
 * OR one of ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY',
 * 'bg-BG', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK',
 * 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-UG',
 * 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'es-CL', 'es-CR', 'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-UY', 'et-EE',
 * 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-RE', 'he-IL', 'hu-HU', 'id-ID',
 * 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL',
 * 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN',
 * 'zh-HK', 'zh-MO', 'zh-TW']
 * If given value is not a string, then it returns false.
 */
function isMobilePhone(value, locale, options) {
    return typeof value === 'string' && validator_lib_isMobilePhone__WEBPACK_IMPORTED_MODULE_1___default()(value, locale, options);
}
/**
 * Checks if the string is a mobile phone number (locale is either an array of locales (e.g ['sk-SK', 'sr-RS'])
 * OR one of ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY',
 * 'bg-BG', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK',
 * 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-UG',
 * 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'es-CL', 'es-CR', 'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-UY', 'et-EE',
 * 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-RE', 'he-IL', 'hu-HU', 'id-ID',
 * 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL',
 * 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN',
 * 'zh-HK', 'zh-MO', 'zh-TW']
 * If given value is not a string, then it returns false.
 */
function IsMobilePhone(locale, options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_MOBILE_PHONE,
        constraints: [locale, options],
        validator: {
            validate: function (value, args) { return isMobilePhone(value, args.constraints[0], args.constraints[1]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a phone number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsMongoId.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsMongoId.js ***!
  \*************************************************************************/
/*! exports provided: IS_MONGO_ID, isMongoId, IsMongoId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_MONGO_ID */
/* unused harmony export isMongoId */
/* unused harmony export IsMongoId */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isMongoId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isMongoId */ "./node_modules/validator/lib/isMongoId.js");
/* harmony import */ var validator_lib_isMongoId__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isMongoId__WEBPACK_IMPORTED_MODULE_1__);


var IS_MONGO_ID = 'isMongoId';
/**
 * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * If given value is not a string, then it returns false.
 */
function isMongoId(value) {
    return typeof value === 'string' && validator_lib_isMongoId__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * If given value is not a string, then it returns false.
 */
function IsMongoId(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_MONGO_ID,
        validator: {
            validate: function (value, args) { return isMongoId(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a mongodb id'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsMultibyte.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsMultibyte.js ***!
  \***************************************************************************/
/*! exports provided: IS_MULTIBYTE, isMultibyte, IsMultibyte */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_MULTIBYTE */
/* unused harmony export isMultibyte */
/* unused harmony export IsMultibyte */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isMultibyte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isMultibyte */ "./node_modules/validator/lib/isMultibyte.js");
/* harmony import */ var validator_lib_isMultibyte__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isMultibyte__WEBPACK_IMPORTED_MODULE_1__);


var IS_MULTIBYTE = 'isMultibyte';
/**
 * Checks if the string contains one or more multibyte chars.
 * If given value is not a string, then it returns false.
 */
function isMultibyte(value) {
    return typeof value === 'string' && validator_lib_isMultibyte__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string contains one or more multibyte chars.
 * If given value is not a string, then it returns false.
 */
function IsMultibyte(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_MULTIBYTE,
        validator: {
            validate: function (value, args) { return isMultibyte(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain one or more multibyte chars'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsNumberString.js":
/*!******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsNumberString.js ***!
  \******************************************************************************/
/*! exports provided: IS_NUMBER_STRING, isNumberString, IsNumberString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_NUMBER_STRING */
/* unused harmony export isNumberString */
/* unused harmony export IsNumberString */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isNumeric */ "./node_modules/validator/lib/isNumeric.js");
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1__);


var IS_NUMBER_STRING = 'isNumberString';
/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
function isNumberString(value, options) {
    return typeof value === 'string' && validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
function IsNumberString(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_NUMBER_STRING,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isNumberString(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a number string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsOctal.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsOctal.js ***!
  \***********************************************************************/
/*! exports provided: IS_OCTAL, isOctal, IsOctal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_OCTAL */
/* unused harmony export isOctal */
/* unused harmony export IsOctal */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isOctal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isOctal */ "./node_modules/validator/lib/isOctal.js");
/* harmony import */ var validator_lib_isOctal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isOctal__WEBPACK_IMPORTED_MODULE_1__);


var IS_OCTAL = 'isOctal';
/**
 * Check if the string is a valid octal number.
 * If given value is not a string, then it returns false.
 */
function isOctal(value) {
    return typeof value === 'string' && validator_lib_isOctal__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a valid octal number.
 * If given value is not a string, then it returns false.
 */
function IsOctal(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_OCTAL,
        validator: {
            validate: function (value, args) { return isOctal(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be valid octal number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsPassportNumber.js":
/*!********************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsPassportNumber.js ***!
  \********************************************************************************/
/*! exports provided: IS_PASSPORT_NUMBER, isPassportNumber, IsPassportNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_PASSPORT_NUMBER */
/* unused harmony export isPassportNumber */
/* unused harmony export IsPassportNumber */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isPassportNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isPassportNumber */ "./node_modules/validator/lib/isPassportNumber.js");
/* harmony import */ var validator_lib_isPassportNumber__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isPassportNumber__WEBPACK_IMPORTED_MODULE_1__);


var IS_PASSPORT_NUMBER = 'isPassportNumber';
/**
 * Check if the string is a valid passport number relative to a specific country code.
 * If given value is not a string, then it returns false.
 */
function isPassportNumber(value, countryCode) {
    return typeof value === 'string' && validator_lib_isPassportNumber__WEBPACK_IMPORTED_MODULE_1___default()(value, countryCode);
}
/**
 * Check if the string is a valid passport number relative to a specific country code.
 * If given value is not a string, then it returns false.
 */
function IsPassportNumber(countryCode, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_PASSPORT_NUMBER,
        constraints: [countryCode],
        validator: {
            validate: function (value, args) { return isPassportNumber(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be valid passport number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsPhoneNumber.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsPhoneNumber.js ***!
  \*****************************************************************************/
/*! exports provided: IS_PHONE_NUMBER, isPhoneNumber, IsPhoneNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_PHONE_NUMBER */
/* unused harmony export isPhoneNumber */
/* unused harmony export IsPhoneNumber */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var libphonenumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libphonenumber-js */ "./node_modules/libphonenumber-js/index.es6.js");


var IS_PHONE_NUMBER = 'isPhoneNumber';
/**
 * Checks if the string is a valid phone number. To successfully validate any phone number the text must include
 * the intl. calling code, if the calling code wont be provided then the region must be set.
 *
 * @param value the potential phone number string to test
 * @param region 2 characters uppercase country code (e.g. DE, US, CH) for country specific validation.
 * If text doesn't start with the international calling code (e.g. +41), then you must set this parameter.
 */
function isPhoneNumber(value, region) {
    try {
        var phoneNum = Object(libphonenumber_js__WEBPACK_IMPORTED_MODULE_1__[/* parsePhoneNumberFromString */ "a"])(value, region);
        var result = phoneNum === null || phoneNum === void 0 ? void 0 : phoneNum.isValid();
        return !!result;
    }
    catch (error) {
        // logging?
        return false;
    }
}
/**
 * Checks if the string is a valid phone number. To successfully validate any phone number the text must include
 * the intl. calling code, if the calling code wont be provided then the region must be set.
 *
 * @param region 2 characters uppercase country code (e.g. DE, US, CH) for country specific validation.
 * If text doesn't start with the international calling code (e.g. +41), then you must set this parameter.
 */
function IsPhoneNumber(region, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_PHONE_NUMBER,
        constraints: [region],
        validator: {
            validate: function (value, args) { return isPhoneNumber(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid phone number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsPort.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsPort.js ***!
  \**********************************************************************/
/*! exports provided: IS_PORT, isPort, IsPort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_PORT */
/* unused harmony export isPort */
/* unused harmony export IsPort */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isPort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isPort */ "./node_modules/validator/lib/isPort.js");
/* harmony import */ var validator_lib_isPort__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isPort__WEBPACK_IMPORTED_MODULE_1__);


var IS_PORT = 'isPort';
/**
 * Check if the string is a valid port number.
 */
function isPort(value) {
    return typeof value === 'string' && validator_lib_isPort__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a valid port number.
 */
function IsPort(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_PORT,
        validator: {
            validate: function (value, args) { return isPort(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a port'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsPostalCode.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsPostalCode.js ***!
  \****************************************************************************/
/*! exports provided: IS_POSTAL_CODE, isPostalCode, IsPostalCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_POSTAL_CODE */
/* unused harmony export isPostalCode */
/* unused harmony export IsPostalCode */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isPostalCode */ "./node_modules/validator/lib/isPostalCode.js");
/* harmony import */ var validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_1__);


var IS_POSTAL_CODE = 'isPostalCode';
/**
 * Check if the string is a postal code,
 * (locale is one of [ 'AD', 'AT', 'AU', 'BE', 'BG', 'BR', 'CA', 'CH', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'ID', 'IE' 'IL', 'IN', 'IR', 'IS', 'IT', 'JP', 'KE', 'LI', 'LT', 'LU', 'LV', 'MT', 'MX', 'NL', 'NO', 'NZ', 'PL', 'PR', 'PT', 'RO', 'RU', 'SA', 'SE', 'SI', 'TN', 'TW', 'UA', 'US', 'ZA', 'ZM' ] OR 'any'. If 'any' is used, function will check if any of the locals match. Locale list is validator.isPostalCodeLocales.).
 * If given value is not a string, then it returns false.
 */
function isPostalCode(value, locale) {
    return typeof value === 'string' && validator_lib_isPostalCode__WEBPACK_IMPORTED_MODULE_1___default()(value, locale);
}
/**
 * Check if the string is a postal code,
 * (locale is one of [ 'AD', 'AT', 'AU', 'BE', 'BG', 'BR', 'CA', 'CH', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'ID', 'IE' 'IL', 'IN', 'IR', 'IS', 'IT', 'JP', 'KE', 'LI', 'LT', 'LU', 'LV', 'MT', 'MX', 'NL', 'NO', 'NZ', 'PL', 'PR', 'PT', 'RO', 'RU', 'SA', 'SE', 'SI', 'TN', 'TW', 'UA', 'US', 'ZA', 'ZM' ] OR 'any'. If 'any' is used, function will check if any of the locals match. Locale list is validator.isPostalCodeLocales.).
 * If given value is not a string, then it returns false.
 */
function IsPostalCode(locale, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_POSTAL_CODE,
        constraints: [locale],
        validator: {
            validate: function (value, args) { return isPostalCode(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a postal code'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsRFC3339.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsRFC3339.js ***!
  \*************************************************************************/
/*! exports provided: IS_RFC_3339, isRFC3339, IsRFC3339 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_RFC_3339 */
/* unused harmony export isRFC3339 */
/* unused harmony export IsRFC3339 */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isRFC3339__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isRFC3339 */ "./node_modules/validator/lib/isRFC3339.js");
/* harmony import */ var validator_lib_isRFC3339__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isRFC3339__WEBPACK_IMPORTED_MODULE_1__);


var IS_RFC_3339 = 'isRFC3339';
/**
 * Check if the string is a valid RFC 3339 date.
 * If given value is not a string, then it returns false.
 */
function isRFC3339(value) {
    return typeof value === 'string' && validator_lib_isRFC3339__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a valid RFC 3339 date.
 * If given value is not a string, then it returns false.
 */
function IsRFC3339(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_RFC_3339,
        validator: {
            validate: function (value, args) { return isRFC3339(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be RFC 3339 date'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsRgbColor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsRgbColor.js ***!
  \**************************************************************************/
/*! exports provided: IS_RGB_COLOR, isRgbColor, IsRgbColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_RGB_COLOR */
/* unused harmony export isRgbColor */
/* unused harmony export IsRgbColor */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isRgbColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isRgbColor */ "./node_modules/validator/lib/isRgbColor.js");
/* harmony import */ var validator_lib_isRgbColor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isRgbColor__WEBPACK_IMPORTED_MODULE_1__);


var IS_RGB_COLOR = 'isRgbColor';
/**
 * Check if the string is a rgb or rgba color.
 * `includePercentValues` defaults to true. If you don't want to allow to set rgb or rgba values with percents, like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false.
 * If given value is not a string, then it returns false.
 */
function isRgbColor(value, includePercentValues) {
    return typeof value === 'string' && validator_lib_isRgbColor__WEBPACK_IMPORTED_MODULE_1___default()(value, includePercentValues);
}
/**
 * Check if the string is a rgb or rgba color.
 * `includePercentValues` defaults to true. If you don't want to allow to set rgb or rgba values with percents, like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false.
 * If given value is not a string, then it returns false.
 */
function IsRgbColor(includePercentValues, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_RGB_COLOR,
        constraints: [includePercentValues],
        validator: {
            validate: function (value, args) { return isRgbColor(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be RGB color'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsSemVer.js":
/*!************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsSemVer.js ***!
  \************************************************************************/
/*! exports provided: IS_SEM_VER, isSemVer, IsSemVer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_SEM_VER */
/* unused harmony export isSemVer */
/* unused harmony export IsSemVer */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isSemVer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isSemVer */ "./node_modules/validator/lib/isSemVer.js");
/* harmony import */ var validator_lib_isSemVer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isSemVer__WEBPACK_IMPORTED_MODULE_1__);


var IS_SEM_VER = 'isSemVer';
/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 * If given value is not a string, then it returns false.
 */
function isSemVer(value) {
    return typeof value === 'string' && validator_lib_isSemVer__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 * If given value is not a string, then it returns false.
 */
function IsSemVer(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_SEM_VER,
        validator: {
            validate: function (value, args) { return isSemVer(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a Semantic Versioning Specification'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsSurrogatePair.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsSurrogatePair.js ***!
  \*******************************************************************************/
/*! exports provided: IS_SURROGATE_PAIR, isSurrogatePair, IsSurrogatePair */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_SURROGATE_PAIR */
/* unused harmony export isSurrogatePair */
/* unused harmony export IsSurrogatePair */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isSurrogatePair__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isSurrogatePair */ "./node_modules/validator/lib/isSurrogatePair.js");
/* harmony import */ var validator_lib_isSurrogatePair__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isSurrogatePair__WEBPACK_IMPORTED_MODULE_1__);


var IS_SURROGATE_PAIR = 'isSurrogatePair';
/**
 * Checks if the string contains any surrogate pairs chars.
 * If given value is not a string, then it returns false.
 */
function isSurrogatePair(value) {
    return typeof value === 'string' && validator_lib_isSurrogatePair__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string contains any surrogate pairs chars.
 * If given value is not a string, then it returns false.
 */
function IsSurrogatePair(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_SURROGATE_PAIR,
        validator: {
            validate: function (value, args) { return isSurrogatePair(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain any surrogate pairs chars'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsUUID.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsUUID.js ***!
  \**********************************************************************/
/*! exports provided: IS_UUID, isUUID, IsUUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_UUID */
/* unused harmony export isUUID */
/* unused harmony export IsUUID */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isUUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isUUID */ "./node_modules/validator/lib/isUUID.js");
/* harmony import */ var validator_lib_isUUID__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isUUID__WEBPACK_IMPORTED_MODULE_1__);


var IS_UUID = 'isUuid';
/**
 * Checks if the string is a UUID (version 3, 4 or 5).
 * If given value is not a string, then it returns false.
 */
function isUUID(value, version) {
    return typeof value === 'string' && validator_lib_isUUID__WEBPACK_IMPORTED_MODULE_1___default()(value, version);
}
/**
 * Checks if the string is a UUID (version 3, 4 or 5).
 * If given value is not a string, then it returns false.
 */
function IsUUID(version, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_UUID,
        constraints: [version],
        validator: {
            validate: function (value, args) { return isUUID(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a UUID'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsUppercase.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsUppercase.js ***!
  \***************************************************************************/
/*! exports provided: IS_UPPERCASE, isUppercase, IsUppercase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_UPPERCASE */
/* unused harmony export isUppercase */
/* unused harmony export IsUppercase */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isUppercase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isUppercase */ "./node_modules/validator/lib/isUppercase.js");
/* harmony import */ var validator_lib_isUppercase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isUppercase__WEBPACK_IMPORTED_MODULE_1__);


var IS_UPPERCASE = 'isUppercase';
/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
function isUppercase(value) {
    return typeof value === 'string' && validator_lib_isUppercase__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
function IsUppercase(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_UPPERCASE,
        validator: {
            validate: function (value, args) { return isUppercase(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be uppercase'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsUrl.js":
/*!*********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsUrl.js ***!
  \*********************************************************************/
/*! exports provided: IS_URL, isURL, IsUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_URL */
/* unused harmony export isURL */
/* unused harmony export IsUrl */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isURL__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isURL */ "./node_modules/validator/lib/isURL.js");
/* harmony import */ var validator_lib_isURL__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isURL__WEBPACK_IMPORTED_MODULE_1__);


var IS_URL = 'isUrl';
/**
 * Checks if the string is an url.
 * If given value is not a string, then it returns false.
 */
function isURL(value, options) {
    return typeof value === 'string' && validator_lib_isURL__WEBPACK_IMPORTED_MODULE_1___default()(value, options);
}
/**
 * Checks if the string is an url.
 * If given value is not a string, then it returns false.
 */
function IsUrl(options, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_URL,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isURL(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an URL address'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/IsVariableWidth.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/IsVariableWidth.js ***!
  \*******************************************************************************/
/*! exports provided: IS_VARIABLE_WIDTH, isVariableWidth, IsVariableWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_VARIABLE_WIDTH */
/* unused harmony export isVariableWidth */
/* unused harmony export IsVariableWidth */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isVariableWidth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isVariableWidth */ "./node_modules/validator/lib/isVariableWidth.js");
/* harmony import */ var validator_lib_isVariableWidth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isVariableWidth__WEBPACK_IMPORTED_MODULE_1__);


var IS_VARIABLE_WIDTH = 'isVariableWidth';
/**
 * Checks if the string contains variable-width chars.
 * If given value is not a string, then it returns false.
 */
function isVariableWidth(value) {
    return typeof value === 'string' && validator_lib_isVariableWidth__WEBPACK_IMPORTED_MODULE_1___default()(value);
}
/**
 * Checks if the string contains variable-width chars.
 * If given value is not a string, then it returns false.
 */
function IsVariableWidth(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_VARIABLE_WIDTH,
        validator: {
            validate: function (value, args) { return isVariableWidth(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must contain a full-width and half-width characters'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/Length.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/Length.js ***!
  \**********************************************************************/
/*! exports provided: IS_LENGTH, length, Length */
/*! exports used: Length */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_LENGTH */
/* unused harmony export length */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Length; });
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isLength */ "./node_modules/validator/lib/isLength.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1__);


var IS_LENGTH = 'isLength';
/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function length(value, min, max) {
    return typeof value === 'string' && validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1___default()(value, { min: min, max: max });
}
/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function Length(min, max, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_LENGTH,
        constraints: [min, max],
        validator: {
            validate: function (value, args) { return length(value, args.constraints[0], args.constraints[1]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix, args) {
                var isMinLength = args.constraints[0] !== null && args.constraints[0] !== undefined;
                var isMaxLength = args.constraints[1] !== null && args.constraints[1] !== undefined;
                if (isMinLength && (!args.value || args.value.length < args.constraints[0])) {
                    return eachPrefix + '$property must be longer than or equal to $constraint1 characters';
                }
                else if (isMaxLength && args.value.length > args.constraints[1]) {
                    return eachPrefix + '$property must be shorter than or equal to $constraint2 characters';
                }
                return (eachPrefix +
                    '$property must be longer than or equal to $constraint1 and shorter than or equal to $constraint2 characters');
            }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/Matches.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/Matches.js ***!
  \***********************************************************************/
/*! exports provided: MATCHES, matches, Matches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MATCHES */
/* unused harmony export matches */
/* unused harmony export Matches */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_matches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/matches */ "./node_modules/validator/lib/matches.js");
/* harmony import */ var validator_lib_matches__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_matches__WEBPACK_IMPORTED_MODULE_1__);


var MATCHES = 'matches';
function matches(value, pattern, modifiers) {
    return typeof value === 'string' && validator_lib_matches__WEBPACK_IMPORTED_MODULE_1___default()(value, pattern, modifiers);
}
function Matches(pattern, modifiersOrAnnotationOptions, validationOptions) {
    var modifiers;
    if (modifiersOrAnnotationOptions && modifiersOrAnnotationOptions instanceof Object && !validationOptions) {
        validationOptions = modifiersOrAnnotationOptions;
    }
    else {
        modifiers = modifiersOrAnnotationOptions;
    }
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: MATCHES,
        constraints: [pattern, modifiers],
        validator: {
            validate: function (value, args) { return matches(value, args.constraints[0], args.constraints[1]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix, args) { return eachPrefix + '$property must match $constraint1 regular expression'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/MaxLength.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/MaxLength.js ***!
  \*************************************************************************/
/*! exports provided: MAX_LENGTH, maxLength, MaxLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MAX_LENGTH */
/* unused harmony export maxLength */
/* unused harmony export MaxLength */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isLength */ "./node_modules/validator/lib/isLength.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1__);


var MAX_LENGTH = 'maxLength';
/**
 * Checks if the string's length is not more than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function maxLength(value, max) {
    return typeof value === 'string' && validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1___default()(value, { min: 0, max: max });
}
/**
 * Checks if the string's length is not more than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function MaxLength(max, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: MAX_LENGTH,
        constraints: [max],
        validator: {
            validate: function (value, args) { return maxLength(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be shorter than or equal to $constraint1 characters'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/MinLength.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/MinLength.js ***!
  \*************************************************************************/
/*! exports provided: MIN_LENGTH, minLength, MinLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MIN_LENGTH */
/* unused harmony export minLength */
/* unused harmony export MinLength */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isLength */ "./node_modules/validator/lib/isLength.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1__);


var MIN_LENGTH = 'minLength';
/**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function minLength(value, min) {
    return typeof value === 'string' && validator_lib_isLength__WEBPACK_IMPORTED_MODULE_1___default()(value, { min: min });
}
/**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function MinLength(min, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: MIN_LENGTH,
        constraints: [min],
        validator: {
            validate: function (value, args) { return minLength(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be longer than or equal to $constraint1 characters'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/NotContains.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/NotContains.js ***!
  \***************************************************************************/
/*! exports provided: NOT_CONTAINS, notContains, NotContains */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NOT_CONTAINS */
/* unused harmony export notContains */
/* unused harmony export NotContains */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_contains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/contains */ "./node_modules/validator/lib/contains.js");
/* harmony import */ var validator_lib_contains__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_contains__WEBPACK_IMPORTED_MODULE_1__);


var NOT_CONTAINS = 'notContains';
/**
 * Checks if the string does not contain the seed.
 * If given value is not a string, then it returns false.
 */
function notContains(value, seed) {
    return typeof value === 'string' && !validator_lib_contains__WEBPACK_IMPORTED_MODULE_1___default()(value, seed);
}
/**
 * Checks if the string does not contain the seed.
 * If given value is not a string, then it returns false.
 */
function NotContains(seed, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: NOT_CONTAINS,
        constraints: [seed],
        validator: {
            validate: function (value, args) { return notContains(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property should not contain a $constraint1 string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsArray.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsArray.js ***!
  \****************************************************************************/
/*! exports provided: IS_ARRAY, isArray, IsArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ARRAY */
/* unused harmony export isArray */
/* unused harmony export IsArray */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_ARRAY = 'isArray';
/**
 * Checks if a given value is an array
 */
function isArray(value) {
    return value instanceof Array;
}
/**
 * Checks if a given value is an array
 */
function IsArray(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ARRAY,
        validator: {
            validate: function (value, args) { return isArray(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an array'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsBoolean.js":
/*!******************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsBoolean.js ***!
  \******************************************************************************/
/*! exports provided: IS_BOOLEAN, isBoolean, IsBoolean */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BOOLEAN */
/* unused harmony export isBoolean */
/* unused harmony export IsBoolean */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_BOOLEAN = 'isBoolean';
/**
 * Checks if a given value is a boolean.
 */
function isBoolean(value) {
    return value instanceof Boolean || typeof value === 'boolean';
}
/**
 * Checks if a value is a boolean.
 */
function IsBoolean(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_BOOLEAN,
        validator: {
            validate: function (value, args) { return isBoolean(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a boolean value'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsDate.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsDate.js ***!
  \***************************************************************************/
/*! exports provided: IS_DATE, isDate, IsDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_DATE */
/* unused harmony export isDate */
/* unused harmony export IsDate */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_DATE = 'isDate';
/**
 * Checks if a given value is a date.
 */
function isDate(value) {
    return value instanceof Date && !isNaN(value.getTime());
}
/**
 * Checks if a value is a date.
 */
function IsDate(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_DATE,
        validator: {
            validate: function (value, args) { return isDate(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a Date instance'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsEnum.js":
/*!***************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsEnum.js ***!
  \***************************************************************************/
/*! exports provided: IS_ENUM, isEnum, IsEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_ENUM */
/* unused harmony export isEnum */
/* unused harmony export IsEnum */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_ENUM = 'isEnum';
/**
 * Checks if a given value is an enum
 */
function isEnum(value, entity) {
    var enumValues = Object.keys(entity).map(function (k) { return entity[k]; });
    return enumValues.indexOf(value) >= 0;
}
/**
 * Checks if a given value is an enum
 */
function IsEnum(entity, validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_ENUM,
        constraints: [entity],
        validator: {
            validate: function (value, args) { return isEnum(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a valid enum value'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsInt.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsInt.js ***!
  \**************************************************************************/
/*! exports provided: IS_INT, isInt, IsInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_INT */
/* unused harmony export isInt */
/* unused harmony export IsInt */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_INT = 'isInt';
/**
 * Checks if value is an integer.
 */
function isInt(val) {
    return typeof val === 'number' && Number.isInteger(val);
}
/**
 * Checks if value is an integer.
 */
function IsInt(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_INT,
        validator: {
            validate: function (value, args) { return isInt(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an integer number'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsNumber.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsNumber.js ***!
  \*****************************************************************************/
/*! exports provided: IS_NUMBER, isNumber, IsNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_NUMBER */
/* unused harmony export isNumber */
/* unused harmony export IsNumber */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_NUMBER = 'isNumber';
/**
 * Checks if a given value is a number.
 */
function isNumber(value, options) {
    if (options === void 0) { options = {}; }
    if (typeof value !== 'number') {
        return false;
    }
    if (value === Infinity || value === -Infinity) {
        return options.allowInfinity;
    }
    if (Number.isNaN(value)) {
        return options.allowNaN;
    }
    if (options.maxDecimalPlaces !== undefined) {
        var decimalPlaces = 0;
        if (value % 1 !== 0) {
            decimalPlaces = value.toString().split('.')[1].length;
        }
        if (decimalPlaces > options.maxDecimalPlaces) {
            return false;
        }
    }
    return Number.isFinite(value);
}
/**
 * Checks if a value is a number.
 */
function IsNumber(options, validationOptions) {
    if (options === void 0) { options = {}; }
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_NUMBER,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isNumber(value, args.constraints[0]); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a number conforming to the specified constraints'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsObject.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsObject.js ***!
  \*****************************************************************************/
/*! exports provided: IS_OBJECT, isObject, IsObject */
/*! exports used: isObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_OBJECT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isObject; });
/* unused harmony export IsObject */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_OBJECT = 'isObject';
/**
 * Checks if the value is valid Object.
 * Returns false if the value is not an object.
 */
function isObject(value) {
    return value != null && (typeof value === 'object' || typeof value === 'function') && !Array.isArray(value);
}
/**
 * Checks if the value is valid Object.
 * Returns false if the value is not an object.
 */
function IsObject(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_OBJECT,
        validator: {
            validate: function (value, args) { return isObject(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be an object'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/typechecker/IsString.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/typechecker/IsString.js ***!
  \*****************************************************************************/
/*! exports provided: IS_STRING, isString, IsString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_STRING */
/* unused harmony export isString */
/* unused harmony export IsString */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_STRING = 'isString';
/**
 * Checks if a given value is a real string.
 */
function isString(value) {
    return value instanceof String || typeof value === 'string';
}
/**
 * Checks if a given value is a real string.
 */
function IsString(validationOptions) {
    return Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* ValidateBy */ "a"])({
        name: IS_STRING,
        validator: {
            validate: function (value, args) { return isString(value); },
            defaultMessage: Object(_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__[/* buildMessage */ "b"])(function (eachPrefix) { return eachPrefix + '$property must be a string'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/index.js":
/*!****************************************************!*\
  !*** ./node_modules/class-validator/esm5/index.js ***!
  \****************************************************/
/*! exports provided: useContainer, getFromContainer, Allow, IS_DEFINED, isDefined, IsDefined, IsOptional, ValidatorConstraint, Validate, buildMessage, ValidateBy, ValidateIf, ValidateNested, ValidatePromise, IS_LATLONG, isLatLong, IsLatLong, IS_LATITUDE, isLatitude, IsLatitude, IS_LONGITUDE, isLongitude, IsLongitude, EQUALS, equals, Equals, NOT_EQUALS, notEquals, NotEquals, IS_EMPTY, isEmpty, IsEmpty, IS_NOT_EMPTY, isNotEmpty, IsNotEmpty, IS_IN, isIn, IsIn, IS_NOT_IN, isNotIn, IsNotIn, IS_DIVISIBLE_BY, isDivisibleBy, IsDivisibleBy, IS_POSITIVE, isPositive, IsPositive, IS_NEGATIVE, isNegative, IsNegative, MAX, max, Max, MIN, min, Min, MIN_DATE, minDate, MinDate, MAX_DATE, maxDate, MaxDate, CONTAINS, contains, Contains, NOT_CONTAINS, notContains, NotContains, IS_ALPHA, isAlpha, IsAlpha, IS_ALPHANUMERIC, isAlphanumeric, IsAlphanumeric, IS_DECIMAL, isDecimal, IsDecimal, IS_ASCII, isAscii, IsAscii, IS_BASE64, isBase64, IsBase64, IS_BYTE_LENGTH, isByteLength, IsByteLength, IS_CREDIT_CARD, isCreditCard, IsCreditCard, IS_CURRENCY, isCurrency, IsCurrency, IS_EMAIL, isEmail, IsEmail, IS_FQDN, isFQDN, IsFQDN, IS_FULL_WIDTH, isFullWidth, IsFullWidth, IS_HALF_WIDTH, isHalfWidth, IsHalfWidth, IS_VARIABLE_WIDTH, isVariableWidth, IsVariableWidth, IS_HEX_COLOR, isHexColor, IsHexColor, IS_HEXADECIMAL, isHexadecimal, IsHexadecimal, IS_MAC_ADDRESS, isMACAddress, IsMACAddress, IS_IP, isIP, IsIP, IS_PORT, isPort, IsPort, IS_ISBN, isISBN, IsISBN, IS_ISIN, isISIN, IsISIN, IS_ISO8601, isISO8601, IsISO8601, IS_JSON, isJSON, IsJSON, IS_JWT, isJWT, IsJWT, IS_LOWERCASE, isLowercase, IsLowercase, IS_MOBILE_PHONE, isMobilePhone, IsMobilePhone, IS_ISO31661_ALPHA_2, isISO31661Alpha2, IsISO31661Alpha2, IS_ISO31661_ALPHA_3, isISO31661Alpha3, IsISO31661Alpha3, IS_MONGO_ID, isMongoId, IsMongoId, IS_MULTIBYTE, isMultibyte, IsMultibyte, IS_SURROGATE_PAIR, isSurrogatePair, IsSurrogatePair, IS_URL, isURL, IsUrl, IS_UUID, isUUID, IsUUID, IS_FIREBASE_PUSH_ID, isFirebasePushId, IsFirebasePushId, IS_UPPERCASE, isUppercase, IsUppercase, IS_LENGTH, length, Length, MAX_LENGTH, maxLength, MaxLength, MIN_LENGTH, minLength, MinLength, MATCHES, matches, Matches, IS_PHONE_NUMBER, isPhoneNumber, IsPhoneNumber, IS_MILITARY_TIME, isMilitaryTime, IsMilitaryTime, IS_HASH, isHash, IsHash, IS_ISSN, isISSN, IsISSN, IS_DATE_STRING, isDateString, IsDateString, IS_BOOLEAN_STRING, isBooleanString, IsBooleanString, IS_NUMBER_STRING, isNumberString, IsNumberString, IS_BASE32, isBase32, IsBase32, IS_BIC, isBIC, IsBIC, IS_BTC_ADDRESS, isBtcAddress, IsBtcAddress, IS_DATA_URI, isDataURI, IsDataURI, IS_EAN, isEAN, IsEAN, IS_ETHEREUM_ADDRESS, isEthereumAddress, IsEthereumAddress, IS_HSL, isHSL, IsHSL, IS_IBAN, isIBAN, IsIBAN, IS_IDENTITY_CARD, isIdentityCard, IsIdentityCard, IS_ISRC, isISRC, IsISRC, IS_LOCALE, isLocale, IsLocale, IS_MAGNET_URI, isMagnetURI, IsMagnetURI, IS_MIME_TYPE, isMimeType, IsMimeType, IS_OCTAL, isOctal, IsOctal, IS_PASSPORT_NUMBER, isPassportNumber, IsPassportNumber, IS_POSTAL_CODE, isPostalCode, IsPostalCode, IS_RFC_3339, isRFC3339, IsRFC3339, IS_RGB_COLOR, isRgbColor, IsRgbColor, IS_SEM_VER, isSemVer, IsSemVer, IS_BOOLEAN, isBoolean, IsBoolean, IS_DATE, isDate, IsDate, IS_NUMBER, isNumber, IsNumber, IS_ENUM, isEnum, IsEnum, IS_INT, isInt, IsInt, IS_STRING, isString, IsString, IS_ARRAY, isArray, IsArray, IS_OBJECT, isObject, IsObject, ARRAY_CONTAINS, arrayContains, ArrayContains, ARRAY_NOT_CONTAINS, arrayNotContains, ArrayNotContains, ARRAY_NOT_EMPTY, arrayNotEmpty, ArrayNotEmpty, ARRAY_MIN_SIZE, arrayMinSize, ArrayMinSize, ARRAY_MAX_SIZE, arrayMaxSize, ArrayMaxSize, ARRAY_UNIQUE, arrayUnique, ArrayUnique, IS_NOT_EMPTY_OBJECT, isNotEmptyObject, IsNotEmptyObject, IS_INSTANCE, isInstance, IsInstance, isValidationOptions, ValidationError, ValidationTypes, Validator, registerDecorator, MetadataStorage, getMetadataStorage, validate, validateOrReject, validateSync, registerSchema */
/*! exports used: IsNotEmpty, Length, validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return validate; });
/* unused harmony export validateOrReject */
/* unused harmony export validateSync */
/* unused harmony export registerSchema */
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");
/* harmony import */ var _validation_Validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation/Validator */ "./node_modules/class-validator/esm5/validation/Validator.js");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container */ "./node_modules/class-validator/esm5/container.js");
/* harmony import */ var _decorator_decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decorator/decorators */ "./node_modules/class-validator/esm5/decorator/decorators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _decorator_decorators__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _decorator_decorators__WEBPACK_IMPORTED_MODULE_3__["b"]; });

/* harmony import */ var _decorator_ValidationOptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./decorator/ValidationOptions */ "./node_modules/class-validator/esm5/decorator/ValidationOptions.js");
/* harmony import */ var _validation_ValidatorConstraintInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation/ValidatorConstraintInterface */ "./node_modules/class-validator/esm5/validation/ValidatorConstraintInterface.js");
/* harmony import */ var _validation_ValidationError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation/ValidationError */ "./node_modules/class-validator/esm5/validation/ValidationError.js");
/* harmony import */ var _validation_ValidatorOptions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./validation/ValidatorOptions */ "./node_modules/class-validator/esm5/validation/ValidatorOptions.js");
/* harmony import */ var _validation_ValidationArguments__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./validation/ValidationArguments */ "./node_modules/class-validator/esm5/validation/ValidationArguments.js");
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _validation_schema_ValidationSchema__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./validation-schema/ValidationSchema */ "./node_modules/class-validator/esm5/validation-schema/ValidationSchema.js");
/* harmony import */ var _register_decorator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./register-decorator */ "./node_modules/class-validator/esm5/register-decorator.js");



// -------------------------------------------------------------------------
// Export everything api users needs
// -------------------------------------------------------------------------












/**
 * Validates given object by object's decorators or given validation schema.
 */
function validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return Object(_container__WEBPACK_IMPORTED_MODULE_2__[/* getFromContainer */ "a"])(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__[/* Validator */ "a"]).validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return Object(_container__WEBPACK_IMPORTED_MODULE_2__[/* getFromContainer */ "a"])(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__[/* Validator */ "a"]).validate(schemaNameOrObject, objectOrValidationOptions);
    }
}
/**
 * Validates given object by object's decorators or given validation schema and reject on error.
 */
function validateOrReject(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return Object(_container__WEBPACK_IMPORTED_MODULE_2__[/* getFromContainer */ "a"])(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__[/* Validator */ "a"]).validateOrReject(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return Object(_container__WEBPACK_IMPORTED_MODULE_2__[/* getFromContainer */ "a"])(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__[/* Validator */ "a"]).validateOrReject(schemaNameOrObject, objectOrValidationOptions);
    }
}
/**
 * Validates given object by object's decorators or given validation schema.
 * Note that this method completely ignores async validations.
 * If you want to properly perform validation you need to call validate method instead.
 */
function validateSync(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return Object(_container__WEBPACK_IMPORTED_MODULE_2__[/* getFromContainer */ "a"])(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__[/* Validator */ "a"]).validateSync(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return Object(_container__WEBPACK_IMPORTED_MODULE_2__[/* getFromContainer */ "a"])(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__[/* Validator */ "a"]).validateSync(schemaNameOrObject, objectOrValidationOptions);
    }
}
/**
 * Registers a new validation schema.
 */
function registerSchema(schema) {
    Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_0__[/* getMetadataStorage */ "b"])().addValidationSchema(schema);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/metadata/ConstraintMetadata.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/metadata/ConstraintMetadata.js ***!
  \**************************************************************************/
/*! exports provided: ConstraintMetadata */
/*! exports used: ConstraintMetadata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstraintMetadata; });
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container */ "./node_modules/class-validator/esm5/container.js");

/**
 * This metadata interface contains information for custom validators.
 */
var ConstraintMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ConstraintMetadata(target, name, async) {
        if (async === void 0) { async = false; }
        this.target = target;
        this.name = name;
        this.async = async;
    }
    Object.defineProperty(ConstraintMetadata.prototype, "instance", {
        // -------------------------------------------------------------------------
        // Accessors
        // -------------------------------------------------------------------------
        /**
         * Instance of the target custom validation class which performs validation.
         */
        get: function () {
            return Object(_container__WEBPACK_IMPORTED_MODULE_0__[/* getFromContainer */ "a"])(this.target);
        },
        enumerable: false,
        configurable: true
    });
    return ConstraintMetadata;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/metadata/MetadataStorage.js ***!
  \***********************************************************************/
/*! exports provided: MetadataStorage, getMetadataStorage */
/*! exports used: MetadataStorage, getMetadataStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetadataStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMetadataStorage; });
/* harmony import */ var _validation_schema_ValidationSchemaToMetadataTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation-schema/ValidationSchemaToMetadataTransformer */ "./node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./node_modules/class-validator/esm5/utils/index.js");


/**
 * Storage all metadatas.
 */
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        // -------------------------------------------------------------------------
        // Private properties
        // -------------------------------------------------------------------------
        this.validationMetadatas = [];
        this.constraintMetadatas = [];
    }
    Object.defineProperty(MetadataStorage.prototype, "hasValidationMetaData", {
        get: function () {
            return !!this.validationMetadatas.length;
        },
        enumerable: false,
        configurable: true
    });
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationSchema = function (schema) {
        var _this = this;
        var validationMetadatas = new _validation_schema_ValidationSchemaToMetadataTransformer__WEBPACK_IMPORTED_MODULE_0__[/* ValidationSchemaToMetadataTransformer */ "a"]().transform(schema);
        validationMetadatas.forEach(function (validationMetadata) { return _this.addValidationMetadata(validationMetadata); });
    };
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationMetadata = function (metadata) {
        this.validationMetadatas.push(metadata);
    };
    /**
     * Adds a new constraint metadata.
     */
    MetadataStorage.prototype.addConstraintMetadata = function (metadata) {
        this.constraintMetadatas.push(metadata);
    };
    /**
     * Groups metadata by their property names.
     */
    MetadataStorage.prototype.groupByPropertyName = function (metadata) {
        var grouped = {};
        metadata.forEach(function (metadata) {
            if (!grouped[metadata.propertyName])
                grouped[metadata.propertyName] = [];
            grouped[metadata.propertyName].push(metadata);
        });
        return grouped;
    };
    /**
     * Gets all validation metadatas for the given object with the given groups.
     */
    MetadataStorage.prototype.getTargetValidationMetadatas = function (targetConstructor, targetSchema, always, strictGroups, groups) {
        var includeMetadataBecauseOfAlwaysOption = function (metadata) {
            // `metadata.always` overrides global default.
            if (typeof metadata.always !== 'undefined')
                return metadata.always;
            // `metadata.groups` overrides global default.
            if (metadata.groups && metadata.groups.length)
                return false;
            // Use global default.
            return always;
        };
        var excludeMetadataBecauseOfStrictGroupsOption = function (metadata) {
            if (strictGroups) {
                // Validation is not using groups.
                if (!groups || !groups.length) {
                    // `metadata.groups` has at least one group.
                    if (metadata.groups && metadata.groups.length)
                        return true;
                }
            }
            return false;
        };
        // get directly related to a target metadatas
        var originalMetadatas = this.validationMetadatas.filter(function (metadata) {
            if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // get metadatas for inherited classes
        var inheritedMetadatas = this.validationMetadatas.filter(function (metadata) {
            // if target is a string it's means we validate against a schema, and there is no inheritance support for schemas
            if (typeof metadata.target === 'string')
                return false;
            if (metadata.target === targetConstructor)
                return false;
            if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // filter out duplicate metadatas, prefer original metadatas instead of inherited metadatas
        var uniqueInheritedMetadatas = inheritedMetadatas.filter(function (inheritedMetadata) {
            return !originalMetadatas.find(function (originalMetadata) {
                return (originalMetadata.propertyName === inheritedMetadata.propertyName &&
                    originalMetadata.type === inheritedMetadata.type);
            });
        });
        return originalMetadatas.concat(uniqueInheritedMetadatas);
    };
    /**
     * Gets all validator constraints for the given object.
     */
    MetadataStorage.prototype.getTargetValidatorConstraints = function (target) {
        return this.constraintMetadatas.filter(function (metadata) { return metadata.target === target; });
    };
    return MetadataStorage;
}());

/**
 * Gets metadata storage.
 * Metadata storage follows the best practices and stores metadata in a global variable.
 */
function getMetadataStorage() {
    var global = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[/* getGlobal */ "b"])();
    if (!global.classValidatorMetadataStorage) {
        global.classValidatorMetadataStorage = new MetadataStorage();
    }
    return global.classValidatorMetadataStorage;
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/metadata/ValidationMetadata.js ***!
  \**************************************************************************/
/*! exports provided: ValidationMetadata */
/*! exports used: ValidationMetadata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationMetadata; });
/**
 * This metadata contains validation rules.
 */
var ValidationMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationMetadata(args) {
        /**
         * Validation groups used for this validation.
         */
        this.groups = [];
        /**
         * Specifies if validated value is an array and each of its item must be validated.
         */
        this.each = false;
        /*
         * A transient set of data passed through to the validation result for response mapping
         */
        this.context = undefined;
        this.type = args.type;
        this.target = args.target;
        this.propertyName = args.propertyName;
        this.constraints = args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
            this.message = args.validationOptions.message;
            this.groups = args.validationOptions.groups;
            this.always = args.validationOptions.always;
            this.each = args.validationOptions.each;
            this.context = args.validationOptions.context;
        }
    }
    return ValidationMetadata;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/register-decorator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/class-validator/esm5/register-decorator.js ***!
  \*****************************************************************/
/*! exports provided: registerDecorator */
/*! exports used: registerDecorator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return registerDecorator; });
/* harmony import */ var _metadata_ConstraintMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata/ConstraintMetadata */ "./node_modules/class-validator/esm5/metadata/ConstraintMetadata.js");
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container */ "./node_modules/class-validator/esm5/container.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");





/**
 * Registers a custom validation decorator.
 */
function registerDecorator(options) {
    var constraintCls;
    if (options.validator instanceof Function) {
        constraintCls = options.validator;
        var constraintClasses = Object(_container__WEBPACK_IMPORTED_MODULE_3__[/* getFromContainer */ "a"])(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_4__[/* MetadataStorage */ "a"]).getTargetValidatorConstraints(options.validator);
        if (constraintClasses.length > 1) {
            throw "More than one implementation of ValidatorConstraintInterface found for validator on: " + options.target.name + ":" + options.propertyName;
        }
    }
    else {
        var validator_1 = options.validator;
        constraintCls = /** @class */ (function () {
            function CustomConstraint() {
            }
            CustomConstraint.prototype.validate = function (value, validationArguments) {
                return validator_1.validate(value, validationArguments);
            };
            CustomConstraint.prototype.defaultMessage = function (validationArguments) {
                if (validator_1.defaultMessage) {
                    return validator_1.defaultMessage(validationArguments);
                }
                return '';
            };
            return CustomConstraint;
        }());
        Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_4__[/* getMetadataStorage */ "b"])().addConstraintMetadata(new _metadata_ConstraintMetadata__WEBPACK_IMPORTED_MODULE_0__[/* ConstraintMetadata */ "a"](constraintCls, options.name, options.async));
    }
    var validationMetadataArgs = {
        type: options.name && _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_2__[/* ValidationTypes */ "a"].isValid(options.name) ? options.name : _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_2__[/* ValidationTypes */ "a"].CUSTOM_VALIDATION,
        target: options.target,
        propertyName: options.propertyName,
        validationOptions: options.options,
        constraintCls: constraintCls,
        constraints: options.constraints,
    };
    Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_4__[/* getMetadataStorage */ "b"])().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_1__[/* ValidationMetadata */ "a"](validationMetadataArgs));
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/utils/convert-to-array.util.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/utils/convert-to-array.util.js ***!
  \**************************************************************************/
/*! exports provided: convertToArray */
/*! exports used: convertToArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return convertToArray; });
/**
 * Convert Map, Set to Array
 */
function convertToArray(val) {
    if (val instanceof Map) {
        return Array.from(val.values());
    }
    return Array.isArray(val) ? val : Array.from(val);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/utils/get-global.util.js":
/*!********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/utils/get-global.util.js ***!
  \********************************************************************/
/*! exports provided: getGlobal */
/*! exports used: getGlobal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getGlobal; });
/**
 * This function returns the global object across Node and browsers.
 *
 * Note: `globalThis` is the standardized approach however it has been added to
 * Node.js in version 12. We need to include this snippet until Node 12 EOL.
 */
function getGlobal() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'window'.
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'window'.
        return window;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'self'.
    if (typeof self !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'self'.
        return self;
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/class-validator/esm5/utils/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/class-validator/esm5/utils/index.js ***!
  \**********************************************************/
/*! exports provided: convertToArray, getGlobal, isPromise */
/*! exports used: convertToArray, getGlobal, isPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _convert_to_array_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert-to-array.util */ "./node_modules/class-validator/esm5/utils/convert-to-array.util.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _convert_to_array_util__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _get_global_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-global.util */ "./node_modules/class-validator/esm5/utils/get-global.util.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _get_global_util__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _is_promise_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-promise.util */ "./node_modules/class-validator/esm5/utils/is-promise.util.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _is_promise_util__WEBPACK_IMPORTED_MODULE_2__["a"]; });






/***/ }),

/***/ "./node_modules/class-validator/esm5/utils/is-promise.util.js":
/*!********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/utils/is-promise.util.js ***!
  \********************************************************************/
/*! exports provided: isPromise */
/*! exports used: isPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPromise; });
// https://github.com/TylorS/typed-is-promise/blob/abf1514e1b6961adfc75765476b0debb96b2c3ae/src/index.ts
function isPromise(p) {
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/validation-schema/ValidationSchema.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation-schema/ValidationSchema.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js ***!
  \******************************************************************************************************/
/*! exports provided: ValidationSchemaToMetadataTransformer */
/*! exports used: ValidationSchemaToMetadataTransformer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationSchemaToMetadataTransformer; });
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");

/**
 * Used to transform validation schemas to validation metadatas.
 */
var ValidationSchemaToMetadataTransformer = /** @class */ (function () {
    function ValidationSchemaToMetadataTransformer() {
    }
    ValidationSchemaToMetadataTransformer.prototype.transform = function (schema) {
        var metadatas = [];
        Object.keys(schema.properties).forEach(function (property) {
            schema.properties[property].forEach(function (validation) {
                var validationOptions = {
                    message: validation.message,
                    groups: validation.groups,
                    always: validation.always,
                    each: validation.each,
                };
                var args = {
                    type: validation.type,
                    target: schema.name,
                    propertyName: property,
                    constraints: validation.constraints,
                    validationTypeOptions: validation.options,
                    validationOptions: validationOptions,
                };
                metadatas.push(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_0__[/* ValidationMetadata */ "a"](args));
            });
        });
        return metadatas;
    };
    return ValidationSchemaToMetadataTransformer;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationArguments.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationArguments.js ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationError.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationError.js ***!
  \*************************************************************************/
/*! exports provided: ValidationError */
/*! exports used: ValidationError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationError; });
/**
 * Validation error description.
 */
var ValidationError = /** @class */ (function () {
    function ValidationError() {
    }
    /**
     *
     * @param shouldDecorate decorate the message with ANSI formatter escape codes for better readability
     * @param hasParent true when the error is a child of an another one
     * @param parentPath path as string to the parent of this property
     */
    ValidationError.prototype.toString = function (shouldDecorate, hasParent, parentPath) {
        var _this = this;
        if (shouldDecorate === void 0) { shouldDecorate = false; }
        if (hasParent === void 0) { hasParent = false; }
        if (parentPath === void 0) { parentPath = ""; }
        var boldStart = shouldDecorate ? "\u001B[1m" : "";
        var boldEnd = shouldDecorate ? "\u001B[22m" : "";
        var propConstraintFailed = function (propertyName) {
            return " - property " + boldStart + parentPath + propertyName + boldEnd + " has failed the following constraints: " + boldStart + Object.keys(_this.constraints).join(", ") + boldEnd + " \n";
        };
        if (!hasParent) {
            return ("An instance of " + boldStart + (this.target ? this.target.constructor.name : 'an object') + boldEnd + " has failed the validation:\n" +
                (this.constraints ? propConstraintFailed(this.property) : "") +
                (this.children
                    ? this.children.map(function (childError) { return childError.toString(shouldDecorate, true, _this.property); }).join("")
                    : ""));
        }
        else {
            // we format numbers as array indexes for better readability.
            var formattedProperty_1 = Number.isInteger(+this.property)
                ? "[" + this.property + "]"
                : "" + (parentPath ? "." : "") + this.property;
            if (this.constraints) {
                return propConstraintFailed(formattedProperty_1);
            }
            else {
                return this.children
                    ? this.children
                        .map(function (childError) { return childError.toString(shouldDecorate, true, "" + parentPath + formattedProperty_1); })
                        .join("")
                    : "";
            }
        }
    };
    return ValidationError;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationExecutor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationExecutor.js ***!
  \****************************************************************************/
/*! exports provided: ValidationExecutor */
/*! exports used: ValidationExecutor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationExecutor; });
/* harmony import */ var _ValidationError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationError */ "./node_modules/class-validator/esm5/validation/ValidationError.js");
/* harmony import */ var _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _ValidationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ValidationUtils */ "./node_modules/class-validator/esm5/validation/ValidationUtils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./node_modules/class-validator/esm5/utils/index.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");





/**
 * Executes validation over given object.
 */
var ValidationExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationExecutor(validator, validatorOptions) {
        this.validator = validator;
        this.validatorOptions = validatorOptions;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.awaitingPromises = [];
        this.ignoreAsyncValidations = false;
        // -------------------------------------------------------------------------
        // Private Properties
        // -------------------------------------------------------------------------
        this.metadataStorage = Object(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_4__[/* getMetadataStorage */ "b"])();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.execute = function (object, targetSchema, validationErrors) {
        var _this = this;
        var _a;
        /**
         * If there is no metadata registered it means possibly the dependencies are not flatterned and
         * more than one instance is used.
         *
         * TODO: This needs proper handling, forcing to use the same container or some other proper solution.
         */
        if (!this.metadataStorage.hasValidationMetaData && ((_a = this.validatorOptions) === null || _a === void 0 ? void 0 : _a.enableDebugMessages) === true) {
            console.warn("No metadata found. There is more than once class-validator version installed probably. You need to flatten your dependencies.");
        }
        var groups = this.validatorOptions ? this.validatorOptions.groups : undefined;
        var strictGroups = (this.validatorOptions && this.validatorOptions.strictGroups) || false;
        var always = (this.validatorOptions && this.validatorOptions.always) || false;
        var targetMetadatas = this.metadataStorage.getTargetValidationMetadatas(object.constructor, targetSchema, always, strictGroups, groups);
        var groupedMetadatas = this.metadataStorage.groupByPropertyName(targetMetadatas);
        if (this.validatorOptions && this.validatorOptions.forbidUnknownValues && !targetMetadatas.length) {
            var validationError = new _ValidationError__WEBPACK_IMPORTED_MODULE_0__[/* ValidationError */ "a"]();
            if (!this.validatorOptions ||
                !this.validatorOptions.validationError ||
                this.validatorOptions.validationError.target === undefined ||
                this.validatorOptions.validationError.target === true)
                validationError.target = object;
            validationError.value = undefined;
            validationError.property = undefined;
            validationError.children = [];
            validationError.constraints = { unknownValue: 'an unknown value was passed to the validate function' };
            validationErrors.push(validationError);
            return;
        }
        if (this.validatorOptions && this.validatorOptions.whitelist)
            this.whitelist(object, groupedMetadatas, validationErrors);
        // General validation
        Object.keys(groupedMetadatas).forEach(function (propertyName) {
            var value = object[propertyName];
            var definedMetadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].IS_DEFINED; });
            var metadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].IS_DEFINED && metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].WHITELIST; });
            if (value instanceof Promise &&
                metadatas.find(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].PROMISE_VALIDATION; })) {
                _this.awaitingPromises.push(value.then(function (resolvedValue) {
                    _this.performValidations(object, resolvedValue, propertyName, definedMetadatas, metadatas, validationErrors);
                }));
            }
            else {
                _this.performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors);
            }
        });
    };
    ValidationExecutor.prototype.whitelist = function (object, groupedMetadatas, validationErrors) {
        var _this = this;
        var notAllowedProperties = [];
        Object.keys(object).forEach(function (propertyName) {
            // does this property have no metadata?
            if (!groupedMetadatas[propertyName] || groupedMetadatas[propertyName].length === 0)
                notAllowedProperties.push(propertyName);
        });
        if (notAllowedProperties.length > 0) {
            if (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted) {
                // throw errors
                notAllowedProperties.forEach(function (property) {
                    var _a;
                    var validationError = _this.generateValidationError(object, object[property], property);
                    validationError.constraints = (_a = {}, _a[_ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].WHITELIST] = "property " + property + " should not exist", _a);
                    validationError.children = undefined;
                    validationErrors.push(validationError);
                });
            }
            else {
                // strip non allowed properties
                notAllowedProperties.forEach(function (property) { return delete object[property]; });
            }
        }
    };
    ValidationExecutor.prototype.stripEmptyErrors = function (errors) {
        var _this = this;
        return errors.filter(function (error) {
            if (error.children) {
                error.children = _this.stripEmptyErrors(error.children);
            }
            if (Object.keys(error.constraints).length === 0) {
                if (error.children.length === 0) {
                    return false;
                }
                else {
                    delete error.constraints;
                }
            }
            return true;
        });
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.performValidations = function (object, value, propertyName, definedMetadatas, metadatas, validationErrors) {
        var customValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].CUSTOM_VALIDATION; });
        var nestedValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].NESTED_VALIDATION; });
        var conditionalValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].CONDITIONAL_VALIDATION; });
        var validationError = this.generateValidationError(object, value, propertyName);
        validationErrors.push(validationError);
        var canValidate = this.conditionalValidations(object, value, conditionalValidationMetadatas);
        if (!canValidate) {
            return;
        }
        // handle IS_DEFINED validation type the special way - it should work no matter skipUndefinedProperties/skipMissingProperties is set or not
        this.customValidations(object, value, definedMetadatas, validationError);
        this.mapContexts(object, value, definedMetadatas, validationError);
        if (value === undefined && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === true) {
            return;
        }
        if (value === null && this.validatorOptions && this.validatorOptions.skipNullProperties === true) {
            return;
        }
        if ((value === null || value === undefined) &&
            this.validatorOptions &&
            this.validatorOptions.skipMissingProperties === true) {
            return;
        }
        this.customValidations(object, value, customValidationMetadatas, validationError);
        this.nestedValidations(value, nestedValidationMetadatas, validationError.children);
        this.mapContexts(object, value, metadatas, validationError);
        this.mapContexts(object, value, customValidationMetadatas, validationError);
    };
    ValidationExecutor.prototype.generateValidationError = function (object, value, propertyName) {
        var validationError = new _ValidationError__WEBPACK_IMPORTED_MODULE_0__[/* ValidationError */ "a"]();
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.target === undefined ||
            this.validatorOptions.validationError.target === true)
            validationError.target = object;
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.value === undefined ||
            this.validatorOptions.validationError.value === true)
            validationError.value = value;
        validationError.property = propertyName;
        validationError.children = [];
        validationError.constraints = {};
        return validationError;
    };
    ValidationExecutor.prototype.conditionalValidations = function (object, value, metadatas) {
        return metadatas
            .map(function (metadata) { return metadata.constraints[0](object, value); })
            .reduce(function (resultA, resultB) { return resultA && resultB; }, true);
    };
    ValidationExecutor.prototype.customValidations = function (object, value, metadatas, error) {
        var _this = this;
        metadatas.forEach(function (metadata) {
            _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls).forEach(function (customConstraintMetadata) {
                if (customConstraintMetadata.async && _this.ignoreAsyncValidations)
                    return;
                if (_this.validatorOptions &&
                    _this.validatorOptions.stopAtFirstError &&
                    Object.keys(error.constraints || {}).length > 0)
                    return;
                var validationArguments = {
                    targetName: object.constructor ? object.constructor.name : undefined,
                    property: metadata.propertyName,
                    object: object,
                    value: value,
                    constraints: metadata.constraints,
                };
                if (!metadata.each || !(value instanceof Array || value instanceof Set || value instanceof Map)) {
                    var validatedValue = customConstraintMetadata.instance.validate(value, validationArguments);
                    if (Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* isPromise */ "c"])(validatedValue)) {
                        var promise = validatedValue.then(function (isValid) {
                            if (!isValid) {
                                var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                                error.constraints[type] = message;
                                if (metadata.context) {
                                    if (!error.contexts) {
                                        error.contexts = {};
                                    }
                                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                                }
                            }
                        });
                        _this.awaitingPromises.push(promise);
                    }
                    else {
                        if (!validatedValue) {
                            var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                        }
                    }
                    return;
                }
                // convert set and map into array
                var arrayValue = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* convertToArray */ "a"])(value);
                // Validation needs to be applied to each array item
                var validatedSubValues = arrayValue.map(function (subValue) {
                    return customConstraintMetadata.instance.validate(subValue, validationArguments);
                });
                var validationIsAsync = validatedSubValues.some(function (validatedSubValue) {
                    return Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* isPromise */ "c"])(validatedSubValue);
                });
                if (validationIsAsync) {
                    // Wrap plain values (if any) in promises, so that all are async
                    var asyncValidatedSubValues = validatedSubValues.map(function (validatedSubValue) {
                        return Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* isPromise */ "c"])(validatedSubValue) ? validatedSubValue : Promise.resolve(validatedSubValue);
                    });
                    var asyncValidationIsFinishedPromise = Promise.all(asyncValidatedSubValues).then(function (flatValidatedValues) {
                        var validationResult = flatValidatedValues.every(function (isValid) { return isValid; });
                        if (!validationResult) {
                            var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                            if (metadata.context) {
                                if (!error.contexts) {
                                    error.contexts = {};
                                }
                                error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                            }
                        }
                    });
                    _this.awaitingPromises.push(asyncValidationIsFinishedPromise);
                    return;
                }
                var validationResult = validatedSubValues.every(function (isValid) { return isValid; });
                if (!validationResult) {
                    var _b = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _b[0], message = _b[1];
                    error.constraints[type] = message;
                }
            });
        });
    };
    ValidationExecutor.prototype.nestedValidations = function (value, metadatas, errors) {
        var _this = this;
        if (value === void 0) {
            return;
        }
        metadatas.forEach(function (metadata) {
            var _a;
            if (metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].NESTED_VALIDATION && metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].PROMISE_VALIDATION) {
                return;
            }
            if (value instanceof Array || value instanceof Set || value instanceof Map) {
                // Treats Set as an array - as index of Set value is value itself and it is common case to have Object as value
                var arrayLikeValue = value instanceof Set ? Array.from(value) : value;
                arrayLikeValue.forEach(function (subValue, index) {
                    _this.performValidations(value, subValue, index.toString(), [], metadatas, errors);
                });
            }
            else if (value instanceof Object) {
                var targetSchema = typeof metadata.target === 'string' ? metadata.target : metadata.target.name;
                _this.execute(value, targetSchema, errors);
            }
            else {
                var error = new _ValidationError__WEBPACK_IMPORTED_MODULE_0__[/* ValidationError */ "a"]();
                error.value = value;
                error.property = metadata.propertyName;
                error.target = metadata.target;
                var _b = _this.createValidationError(metadata.target, value, metadata), type = _b[0], message = _b[1];
                error.constraints = (_a = {},
                    _a[type] = message,
                    _a);
                errors.push(error);
            }
        });
    };
    ValidationExecutor.prototype.mapContexts = function (object, value, metadatas, error) {
        var _this = this;
        return metadatas.forEach(function (metadata) {
            if (metadata.context) {
                var customConstraint = void 0;
                if (metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_1__[/* ValidationTypes */ "a"].CUSTOM_VALIDATION) {
                    var customConstraints = _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls);
                    customConstraint = customConstraints[0];
                }
                var type = _this.getConstraintType(metadata, customConstraint);
                if (error.constraints[type]) {
                    if (!error.contexts) {
                        error.contexts = {};
                    }
                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                }
            }
        });
    };
    ValidationExecutor.prototype.createValidationError = function (object, value, metadata, customValidatorMetadata) {
        var targetName = object.constructor ? object.constructor.name : undefined;
        var type = this.getConstraintType(metadata, customValidatorMetadata);
        var validationArguments = {
            targetName: targetName,
            property: metadata.propertyName,
            object: object,
            value: value,
            constraints: metadata.constraints,
        };
        var message = metadata.message || '';
        if (!metadata.message &&
            (!this.validatorOptions || (this.validatorOptions && !this.validatorOptions.dismissDefaultMessages))) {
            if (customValidatorMetadata && customValidatorMetadata.instance.defaultMessage instanceof Function) {
                message = customValidatorMetadata.instance.defaultMessage(validationArguments);
            }
        }
        var messageString = _ValidationUtils__WEBPACK_IMPORTED_MODULE_2__[/* ValidationUtils */ "a"].replaceMessageSpecialTokens(message, validationArguments);
        return [type, messageString];
    };
    ValidationExecutor.prototype.getConstraintType = function (metadata, customValidatorMetadata) {
        var type = customValidatorMetadata && customValidatorMetadata.name ? customValidatorMetadata.name : metadata.type;
        return type;
    };
    return ValidationExecutor;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationTypes.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationTypes.js ***!
  \*************************************************************************/
/*! exports provided: ValidationTypes */
/*! exports used: ValidationTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationTypes; });
/**
 * Validation types.
 */
var ValidationTypes = /** @class */ (function () {
    function ValidationTypes() {
    }
    /**
     * Checks if validation type is valid.
     */
    ValidationTypes.isValid = function (type) {
        var _this = this;
        return (type !== 'isValid' &&
            type !== 'getMessage' &&
            Object.keys(this)
                .map(function (key) { return _this[key]; })
                .indexOf(type) !== -1);
    };
    /* system */
    ValidationTypes.CUSTOM_VALIDATION = 'customValidation'; // done
    ValidationTypes.NESTED_VALIDATION = 'nestedValidation'; // done
    ValidationTypes.PROMISE_VALIDATION = 'promiseValidation'; // done
    ValidationTypes.CONDITIONAL_VALIDATION = 'conditionalValidation'; // done
    ValidationTypes.WHITELIST = 'whitelistValidation'; // done
    ValidationTypes.IS_DEFINED = 'isDefined'; // done
    return ValidationTypes;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationUtils.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationUtils.js ***!
  \*************************************************************************/
/*! exports provided: constraintToString, ValidationUtils */
/*! exports used: ValidationUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export constraintToString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationUtils; });
/**
 * Convert the constraint to a string to be shown in an error
 */
function constraintToString(constraint) {
    if (Array.isArray(constraint)) {
        return constraint.join(', ');
    }
    return "" + constraint;
}
var ValidationUtils = /** @class */ (function () {
    function ValidationUtils() {
    }
    ValidationUtils.replaceMessageSpecialTokens = function (message, validationArguments) {
        var messageString;
        if (message instanceof Function) {
            messageString = message(validationArguments);
        }
        else if (typeof message === 'string') {
            messageString = message;
        }
        if (messageString && validationArguments.constraints instanceof Array) {
            validationArguments.constraints.forEach(function (constraint, index) {
                messageString = messageString.replace(new RegExp("\\$constraint" + (index + 1), 'g'), constraintToString(constraint));
            });
        }
        if (messageString &&
            validationArguments.value !== undefined &&
            validationArguments.value !== null &&
            typeof validationArguments.value === 'string')
            messageString = messageString.replace(/\$value/g, validationArguments.value);
        if (messageString)
            messageString = messageString.replace(/\$property/g, validationArguments.property);
        if (messageString)
            messageString = messageString.replace(/\$target/g, validationArguments.targetName);
        return messageString;
    };
    return ValidationUtils;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/Validator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/Validator.js ***!
  \*******************************************************************/
/*! exports provided: Validator */
/*! exports used: Validator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Validator; });
/* harmony import */ var _ValidationExecutor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationExecutor */ "./node_modules/class-validator/esm5/validation/ValidationExecutor.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/**
 * Validator performs validation of the given object based on its metadata.
 */
var Validator = /** @class */ (function () {
    function Validator() {
    }
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
    };
    /**
     * Performs validation of the given object based on decorators or validation schema and reject on error.
     */
    Validator.prototype.validateOrReject = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length)
                            return [2 /*return*/, Promise.reject(errors)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validateSync = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new _ValidationExecutor__WEBPACK_IMPORTED_MODULE_0__[/* ValidationExecutor */ "a"](this, options);
        executor.ignoreAsyncValidations = true;
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return executor.stripEmptyErrors(validationErrors);
    };
    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------
    /**
     * Performs validation of the given object based on decorators or validation schema.
     * Common method for `validateOrReject` and `validate` methods.
     */
    Validator.prototype.coreValidate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new _ValidationExecutor__WEBPACK_IMPORTED_MODULE_0__[/* ValidationExecutor */ "a"](this, options);
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return Promise.all(executor.awaitingPromises).then(function () {
            return executor.stripEmptyErrors(validationErrors);
        });
    };
    return Validator;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidatorConstraintInterface.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidatorConstraintInterface.js ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidatorOptions.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidatorOptions.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/***/ }),

/***/ "./node_modules/libphonenumber-js/core/index.js":
/*!******************************************************!*\
  !*** ./node_modules/libphonenumber-js/core/index.js ***!
  \******************************************************/
/*! exports provided: ParseError, parsePhoneNumberWithError, parsePhoneNumber, default, parsePhoneNumberFromString, isValidPhoneNumber, isPossiblePhoneNumber, findNumbers, searchNumbers, findPhoneNumbersInText, searchPhoneNumbersInText, PhoneNumberMatcher, AsYouType, DIGIT_PLACEHOLDER, getCountries, Metadata, isSupportedCountry, getCountryCallingCode, getExtPrefix, getExampleNumber, formatIncompletePhoneNumber, parseIncompletePhoneNumber, parsePhoneNumberCharacter, parseDigits, parseRFC3966, formatRFC3966 */
/*! exports used: AsYouType, Metadata, PhoneNumberMatcher, findNumbers, findPhoneNumbersInText, formatIncompletePhoneNumber, getCountries, getCountryCallingCode, getExampleNumber, getExtPrefix, isPossiblePhoneNumber, isSupportedCountry, isValidPhoneNumber, parsePhoneNumberFromString, parsePhoneNumberWithError, searchNumbers, searchPhoneNumbersInText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _es6_ParseError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../es6/ParseError */ "./node_modules/libphonenumber-js/es6/ParseError.js");
/* harmony import */ var _es6_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "o", function() { return _es6_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _es6_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../es6/parsePhoneNumberFromString */ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "n", function() { return _es6_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _es6_isValidPhoneNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../es6/isValidPhoneNumber */ "./node_modules/libphonenumber-js/es6/isValidPhoneNumber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "m", function() { return _es6_isValidPhoneNumber__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _es6_isPossiblePhoneNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../es6/isPossiblePhoneNumber */ "./node_modules/libphonenumber-js/es6/isPossiblePhoneNumber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "k", function() { return _es6_isPossiblePhoneNumber__WEBPACK_IMPORTED_MODULE_4__["a"]; });

/* harmony import */ var _es6_findNumbers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../es6/findNumbers */ "./node_modules/libphonenumber-js/es6/findNumbers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _es6_findNumbers__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony import */ var _es6_searchNumbers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../es6/searchNumbers */ "./node_modules/libphonenumber-js/es6/searchNumbers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "p", function() { return _es6_searchNumbers__WEBPACK_IMPORTED_MODULE_6__["a"]; });

/* harmony import */ var _es6_findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../es6/findPhoneNumbersInText */ "./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _es6_findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_7__["a"]; });

/* harmony import */ var _es6_searchPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../es6/searchPhoneNumbersInText */ "./node_modules/libphonenumber-js/es6/searchPhoneNumbersInText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "q", function() { return _es6_searchPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_8__["a"]; });

/* harmony import */ var _es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../es6/PhoneNumberMatcher */ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_9__["a"]; });

/* harmony import */ var _es6_AsYouType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../es6/AsYouType */ "./node_modules/libphonenumber-js/es6/AsYouType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _es6_AsYouType__WEBPACK_IMPORTED_MODULE_10__["a"]; });

/* harmony import */ var _es6_AsYouTypeFormatter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../es6/AsYouTypeFormatter */ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.js");
/* harmony import */ var _es6_getCountries__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../es6/getCountries */ "./node_modules/libphonenumber-js/es6/getCountries.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _es6_getCountries__WEBPACK_IMPORTED_MODULE_12__["a"]; });

/* harmony import */ var _es6_metadata__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../es6/metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _es6_metadata__WEBPACK_IMPORTED_MODULE_13__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "l", function() { return _es6_metadata__WEBPACK_IMPORTED_MODULE_13__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _es6_metadata__WEBPACK_IMPORTED_MODULE_13__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "j", function() { return _es6_metadata__WEBPACK_IMPORTED_MODULE_13__["c"]; });

/* harmony import */ var _es6_getExampleNumber__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../es6/getExampleNumber */ "./node_modules/libphonenumber-js/es6/getExampleNumber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i", function() { return _es6_getExampleNumber__WEBPACK_IMPORTED_MODULE_14__["a"]; });

/* harmony import */ var _es6_formatIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../es6/formatIncompletePhoneNumber */ "./node_modules/libphonenumber-js/es6/formatIncompletePhoneNumber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _es6_formatIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_15__["a"]; });

/* harmony import */ var _es6_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../es6/parseIncompletePhoneNumber */ "./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js");
/* harmony import */ var _es6_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../es6/helpers/parseDigits */ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js");
/* harmony import */ var _es6_helpers_RFC3966__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../es6/helpers/RFC3966 */ "./node_modules/libphonenumber-js/es6/helpers/RFC3966.js");

// `parsePhoneNumber()` named export has been renamed to `parsePhoneNumberWithError()`.


// `parsePhoneNumberFromString()` named export is now considered legacy:
// it has been promoted to a default export due to being too verbose.





// Deprecated.

// Deprecated.





















/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/AsYouType.js":
/*!*********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/AsYouType.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsYouType; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");
/* harmony import */ var _AsYouTypeState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AsYouTypeState */ "./node_modules/libphonenumber-js/es6/AsYouTypeState.js");
/* harmony import */ var _AsYouTypeFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AsYouTypeFormatter */ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.js");
/* harmony import */ var _AsYouTypeParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AsYouTypeParser */ "./node_modules/libphonenumber-js/es6/AsYouTypeParser.js");
/* harmony import */ var _helpers_getCountryByCallingCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/getCountryByCallingCode */ "./node_modules/libphonenumber-js/es6/helpers/getCountryByCallingCode.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;

var AsYouType =
/*#__PURE__*/
function () {
  /**
   * @param {(string|object)?} [optionsOrDefaultCountry] - The default country used for parsing non-international phone numbers. Can also be an `options` object.
   * @param {Object} metadata
   */
  function AsYouType(optionsOrDefaultCountry, metadata) {
    _classCallCheck(this, AsYouType);

    this.metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata);

    var _this$getCountryAndCa = this.getCountryAndCallingCode(optionsOrDefaultCountry),
        _this$getCountryAndCa2 = _slicedToArray(_this$getCountryAndCa, 2),
        defaultCountry = _this$getCountryAndCa2[0],
        defaultCallingCode = _this$getCountryAndCa2[1];

    this.defaultCountry = defaultCountry;
    this.defaultCallingCode = defaultCallingCode;
    this.reset();
  }

  _createClass(AsYouType, [{
    key: "getCountryAndCallingCode",
    value: function getCountryAndCallingCode(optionsOrDefaultCountry) {
      // Set `defaultCountry` and `defaultCallingCode` options.
      var defaultCountry;
      var defaultCallingCode; // Turns out `null` also has type "object". Weird.

      if (optionsOrDefaultCountry) {
        if (_typeof(optionsOrDefaultCountry) === 'object') {
          defaultCountry = optionsOrDefaultCountry.defaultCountry;
          defaultCallingCode = optionsOrDefaultCountry.defaultCallingCode;
        } else {
          defaultCountry = optionsOrDefaultCountry;
        }
      }

      if (defaultCountry && !this.metadata.hasCountry(defaultCountry)) {
        defaultCountry = undefined;
      }

      if (defaultCallingCode) {
        /* istanbul ignore if */
        if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
          if (this.metadata.isNonGeographicCallingCode(defaultCallingCode)) {
            defaultCountry = '001';
          }
        }
      }

      return [defaultCountry, defaultCallingCode];
    }
    /**
     * Inputs "next" phone number characters.
     * @param  {string} text
     * @return {string} Formatted phone number characters that have been input so far.
     */

  }, {
    key: "input",
    value: function input(text) {
      var _this$parser$input = this.parser.input(text, this.state),
          digits = _this$parser$input.digits,
          justLeadingPlus = _this$parser$input.justLeadingPlus;

      if (justLeadingPlus) {
        this.formattedOutput = '+';
      } else if (digits) {
        this.determineTheCountryIfNeeded(); // Match the available formats by the currently available leading digits.

        if (this.state.nationalSignificantNumber) {
          this.formatter.narrowDownMatchingFormats(this.state);
        }

        var formattedNationalNumber;

        if (this.metadata.hasSelectedNumberingPlan()) {
          formattedNationalNumber = this.formatter.format(digits, this.state);
        }

        if (formattedNationalNumber === undefined) {
          // See if another national (significant) number could be re-extracted.
          if (this.parser.reExtractNationalSignificantNumber(this.state)) {
            this.determineTheCountryIfNeeded(); // If it could, then re-try formatting the new national (significant) number.

            var nationalDigits = this.state.getNationalDigits();

            if (nationalDigits) {
              formattedNationalNumber = this.formatter.format(nationalDigits, this.state);
            }
          }
        }

        this.formattedOutput = formattedNationalNumber ? this.getFullNumber(formattedNationalNumber) : this.getNonFormattedNumber();
      }

      return this.formattedOutput;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this = this;

      this.state = new _AsYouTypeState__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]({
        onCountryChange: function onCountryChange(country) {
          // Before version `1.6.0`, the official `AsYouType` formatter API
          // included the `.country` property of an `AsYouType` instance.
          // Since that property (along with the others) have been moved to
          // `this.state`, `this.country` property is emulated for compatibility
          // with the old versions.
          _this.country = country;
        },
        onCallingCodeChange: function onCallingCodeChange(country, callingCode) {
          _this.metadata.selectNumberingPlan(country, callingCode);

          _this.formatter.reset(_this.metadata.numberingPlan, _this.state);

          _this.parser.reset(_this.metadata.numberingPlan);
        }
      });
      this.formatter = new _AsYouTypeFormatter__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"]({
        state: this.state,
        metadata: this.metadata
      });
      this.parser = new _AsYouTypeParser__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]({
        defaultCountry: this.defaultCountry,
        defaultCallingCode: this.defaultCallingCode,
        metadata: this.metadata,
        state: this.state,
        onNationalSignificantNumberChange: function onNationalSignificantNumberChange() {
          _this.determineTheCountryIfNeeded();

          _this.formatter.reset(_this.metadata.numberingPlan, _this.state);
        }
      });
      this.state.reset(this.defaultCountry, this.defaultCallingCode);
      this.formattedOutput = '';
      return this;
    }
    /**
     * Returns `true` if the phone number is being input in international format.
     * In other words, returns `true` if and only if the parsed phone number starts with a `"+"`.
     * @return {boolean}
     */

  }, {
    key: "isInternational",
    value: function isInternational() {
      return this.state.international;
    }
    /**
     * Returns the "country calling code" part of the phone number.
     * Returns `undefined` if the number is not being input in international format.
     * Returns "country calling code" for "non-geographic" phone numbering plans too.
     * @return {string} [callingCode]
     */

  }, {
    key: "getCallingCode",
    value: function getCallingCode() {
      return this.state.callingCode;
    } // A legacy alias.

  }, {
    key: "getCountryCallingCode",
    value: function getCountryCallingCode() {
      return this.getCallingCode();
    }
    /**
     * Returns a two-letter country code of the phone number.
     * Returns `undefined` for "non-geographic" phone numbering plans.
     * Returns `undefined` if no phone number has been input yet.
     * @return {string} [country]
     */

  }, {
    key: "getCountry",
    value: function getCountry() {
      var _this$state = this.state,
          digits = _this$state.digits,
          country = _this$state.country; // If no digits have been input yet,
      // then `this.country` is the `defaultCountry`.
      // Won't return the `defaultCountry` in such case.

      if (!digits) {
        return;
      }

      var countryCode = country;
      /* istanbul ignore if */

      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
        // `AsYouType.getCountry()` returns `undefined`
        // for "non-geographic" phone numbering plans.
        if (countryCode === '001') {
          countryCode = undefined;
        }
      }

      return countryCode;
    }
  }, {
    key: "determineTheCountryIfNeeded",
    value: function determineTheCountryIfNeeded() {
      // Suppose a user enters a phone number in international format,
      // and there're several countries corresponding to that country calling code,
      // and a country has been derived from the number, and then
      // a user enters one more digit and the number is no longer
      // valid for the derived country, so the country should be re-derived
      // on every new digit in those cases.
      //
      // If the phone number is being input in national format,
      // then it could be a case when `defaultCountry` wasn't specified
      // when creating `AsYouType` instance, and just `defaultCallingCode` was specified,
      // and that "calling code" could correspond to a "non-geographic entity",
      // or there could be several countries corresponding to that country calling code.
      // In those cases, `this.country` is `undefined` and should be derived
      // from the number. Again, if country calling code is ambiguous, then
      // `this.country` should be re-derived with each new digit.
      //
      if (!this.state.country || this.isCountryCallingCodeAmbiguous()) {
        this.determineTheCountry();
      }
    } // Prepends `+CountryCode ` in case of an international phone number

  }, {
    key: "getFullNumber",
    value: function getFullNumber(formattedNationalNumber) {
      var _this2 = this;

      if (this.isInternational()) {
        var prefix = function prefix(text) {
          return _this2.formatter.getInternationalPrefixBeforeCountryCallingCode(_this2.state, {
            spacing: text ? true : false
          }) + text;
        };

        var callingCode = this.state.callingCode;

        if (!callingCode) {
          return prefix("".concat(this.state.getDigitsWithoutInternationalPrefix()));
        }

        if (!formattedNationalNumber) {
          return prefix(callingCode);
        }

        return prefix("".concat(callingCode, " ").concat(formattedNationalNumber));
      }

      return formattedNationalNumber;
    }
  }, {
    key: "getNonFormattedNationalNumberWithPrefix",
    value: function getNonFormattedNationalNumberWithPrefix() {
      var _this$state2 = this.state,
          nationalSignificantNumber = _this$state2.nationalSignificantNumber,
          complexPrefixBeforeNationalSignificantNumber = _this$state2.complexPrefixBeforeNationalSignificantNumber,
          nationalPrefix = _this$state2.nationalPrefix;
      var number = nationalSignificantNumber;
      var prefix = complexPrefixBeforeNationalSignificantNumber || nationalPrefix;

      if (prefix) {
        number = prefix + number;
      }

      return number;
    }
  }, {
    key: "getNonFormattedNumber",
    value: function getNonFormattedNumber() {
      var nationalSignificantNumberMatchesInput = this.state.nationalSignificantNumberMatchesInput;
      return this.getFullNumber(nationalSignificantNumberMatchesInput ? this.getNonFormattedNationalNumberWithPrefix() : this.state.getNationalDigits());
    }
  }, {
    key: "getNonFormattedTemplate",
    value: function getNonFormattedTemplate() {
      var number = this.getNonFormattedNumber();

      if (number) {
        return number.replace(/[\+\d]/g, _AsYouTypeFormatter__WEBPACK_IMPORTED_MODULE_3__[/* DIGIT_PLACEHOLDER */ "a"]);
      }
    }
  }, {
    key: "isCountryCallingCodeAmbiguous",
    value: function isCountryCallingCodeAmbiguous() {
      var callingCode = this.state.callingCode;
      var countryCodes = this.metadata.getCountryCodesForCallingCode(callingCode);
      return countryCodes && countryCodes.length > 1;
    } // Determines the country of the phone number
    // entered so far based on the country phone code
    // and the national phone number.

  }, {
    key: "determineTheCountry",
    value: function determineTheCountry() {
      this.state.setCountry(Object(_helpers_getCountryByCallingCode__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(this.isInternational() ? this.state.callingCode : this.defaultCallingCode, this.state.nationalSignificantNumber, this.metadata));
    }
    /**
     * Returns an instance of `PhoneNumber` class.
     * Will return `undefined` if no national (significant) number
     * digits have been entered so far, or if no `defaultCountry` has been
     * set and the user enters a phone number not in international format.
     */

  }, {
    key: "getNumber",
    value: function getNumber() {
      var _this$state3 = this.state,
          nationalSignificantNumber = _this$state3.nationalSignificantNumber,
          carrierCode = _this$state3.carrierCode;

      if (this.isInternational()) {
        if (!this.state.callingCode) {
          return;
        }
      } else {
        if (!this.state.country && !this.defaultCallingCode) {
          return;
        }
      }

      if (!nationalSignificantNumber) {
        return;
      }

      var countryCode = this.getCountry();
      var callingCode = this.getCountryCallingCode() || this.defaultCallingCode;
      var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"](countryCode || callingCode, nationalSignificantNumber, this.metadata.metadata);

      if (carrierCode) {
        phoneNumber.carrierCode = carrierCode;
      } // Phone number extensions are not supported by "As You Type" formatter.


      return phoneNumber;
    }
    /**
     * Returns `true` if the phone number is "possible".
     * Is just a shortcut for `PhoneNumber.isPossible()`.
     * @return {boolean}
     */

  }, {
    key: "isPossible",
    value: function isPossible() {
      var phoneNumber = this.getNumber();

      if (!phoneNumber) {
        return false;
      }

      return phoneNumber.isPossible();
    }
    /**
     * Returns `true` if the phone number is "valid".
     * Is just a shortcut for `PhoneNumber.isValid()`.
     * @return {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid() {
      var phoneNumber = this.getNumber();

      if (!phoneNumber) {
        return false;
      }

      return phoneNumber.isValid();
    }
    /**
     * @deprecated
     * This method is used in `react-phone-number-input/source/input-control.js`
     * in versions before `3.0.16`.
     */

  }, {
    key: "getNationalNumber",
    value: function getNationalNumber() {
      return this.state.nationalSignificantNumber;
    }
    /**
     * Returns the phone number characters entered by the user.
     * @return {string}
     */

  }, {
    key: "getChars",
    value: function getChars() {
      return (this.state.international ? '+' : '') + this.state.digits;
    }
    /**
     * Returns the template for the formatted phone number.
     * @return {string}
     */

  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return this.formatter.getTemplate(this.state) || this.getNonFormattedTemplate() || '';
    }
  }]);

  return AsYouType;
}();




/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.complete.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.complete.js ***!
  \***************************************************************************/
/*! exports provided: default, canFormatCompleteNumber */
/*! exports used: canFormatCompleteNumber, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formatCompleteNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return canFormatCompleteNumber; });
/* harmony import */ var _helpers_checkNumberLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/checkNumberLength */ "./node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js");
/* harmony import */ var _helpers_parseDigits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/parseDigits */ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js");
/* harmony import */ var _helpers_formatNationalNumberUsingFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/formatNationalNumberUsingFormat */ "./node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js");



function formatCompleteNumber(state, format, _ref) {
  var metadata = _ref.metadata,
      shouldTryNationalPrefixFormattingRule = _ref.shouldTryNationalPrefixFormattingRule,
      getSeparatorAfterNationalPrefix = _ref.getSeparatorAfterNationalPrefix;
  var matcher = new RegExp("^(?:".concat(format.pattern(), ")$"));

  if (matcher.test(state.nationalSignificantNumber)) {
    return formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format, {
      metadata: metadata,
      shouldTryNationalPrefixFormattingRule: shouldTryNationalPrefixFormattingRule,
      getSeparatorAfterNationalPrefix: getSeparatorAfterNationalPrefix
    });
  }
}
function canFormatCompleteNumber(nationalSignificantNumber, metadata) {
  return Object(_helpers_checkNumberLength__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(nationalSignificantNumber, metadata) === 'IS_POSSIBLE';
}

function formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format, _ref2) {
  var metadata = _ref2.metadata,
      shouldTryNationalPrefixFormattingRule = _ref2.shouldTryNationalPrefixFormattingRule,
      getSeparatorAfterNationalPrefix = _ref2.getSeparatorAfterNationalPrefix;
  // `format` has already been checked for `nationalPrefix` requirement.
  var nationalSignificantNumber = state.nationalSignificantNumber,
      international = state.international,
      nationalPrefix = state.nationalPrefix,
      carrierCode = state.carrierCode; // Format the number with using `national_prefix_formatting_rule`.
  // If the resulting formatted number is a valid formatted number, then return it.
  //
  // Google's AsYouType formatter is different in a way that it doesn't try
  // to format using the "national prefix formatting rule", and instead it
  // simply prepends a national prefix followed by a " " character.
  // This code does that too, but as a fallback.
  // The reason is that "national prefix formatting rule" may use parentheses,
  // which wouldn't be included has it used the simpler Google's way.
  //

  if (shouldTryNationalPrefixFormattingRule(format)) {
    var formattedNumber = formatNationalNumber(state, format, {
      useNationalPrefixFormattingRule: true,
      getSeparatorAfterNationalPrefix: getSeparatorAfterNationalPrefix,
      metadata: metadata
    });

    if (formattedNumber) {
      return formattedNumber;
    }
  } // Format the number without using `national_prefix_formatting_rule`.


  return formatNationalNumber(state, format, {
    useNationalPrefixFormattingRule: false,
    getSeparatorAfterNationalPrefix: getSeparatorAfterNationalPrefix,
    metadata: metadata
  });
}

function formatNationalNumber(state, format, _ref3) {
  var metadata = _ref3.metadata,
      useNationalPrefixFormattingRule = _ref3.useNationalPrefixFormattingRule,
      getSeparatorAfterNationalPrefix = _ref3.getSeparatorAfterNationalPrefix;
  var formattedNationalNumber = Object(_helpers_formatNationalNumberUsingFormat__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"])(state.nationalSignificantNumber, format, {
    carrierCode: state.carrierCode,
    useInternationalFormat: state.international,
    withNationalPrefix: useNationalPrefixFormattingRule,
    metadata: metadata
  });

  if (!useNationalPrefixFormattingRule) {
    if (state.nationalPrefix) {
      // If a national prefix was extracted, then just prepend it,
      // followed by a " " character.
      formattedNationalNumber = state.nationalPrefix + getSeparatorAfterNationalPrefix(format) + formattedNationalNumber;
    } else if (state.complexPrefixBeforeNationalSignificantNumber) {
      formattedNationalNumber = state.complexPrefixBeforeNationalSignificantNumber + ' ' + formattedNationalNumber;
    }
  }

  if (isValidFormattedNationalNumber(formattedNationalNumber, state)) {
    return formattedNationalNumber;
  }
} // Check that the formatted phone number contains exactly
// the same digits that have been input by the user.
// For example, when "0111523456789" is input for `AR` country,
// the extracted `this.nationalSignificantNumber` is "91123456789",
// which means that the national part of `this.digits` isn't simply equal to
// `this.nationalPrefix` + `this.nationalSignificantNumber`.
//
// Also, a `format` can add extra digits to the `this.nationalSignificantNumber`
// being formatted via `metadata[country].national_prefix_transform_rule`.
// For example, for `VI` country, it prepends `340` to the national number,
// and if this check hasn't been implemented, then there would be a bug
// when `340` "area coude" is "duplicated" during input for `VI` country:
// https://github.com/catamphetamine/libphonenumber-js/issues/318
//
// So, all these "gotchas" are filtered out.
//
// In the original Google's code, the comments say:
// "Check that we didn't remove nor add any extra digits when we matched
// this formatting pattern. This usually happens after we entered the last
// digit during AYTF. Eg: In case of MX, we swallow mobile token (1) when
// formatted but AYTF should retain all the number entered and not change
// in order to match a format (of same leading digits and length) display
// in that way."
// "If it's the same (i.e entered number and format is same), then it's
// safe to return this in formatted number as nothing is lost / added."
// Otherwise, don't use this format.
// https://github.com/google/libphonenumber/commit/3e7c1f04f5e7200f87fb131e6f85c6e99d60f510#diff-9149457fa9f5d608a11bb975c6ef4bc5
// https://github.com/google/libphonenumber/commit/3ac88c7106e7dcb553bcc794b15f19185928a1c6#diff-2dcb77e833422ee304da348b905cde0b
//


function isValidFormattedNationalNumber(formattedNationalNumber, state) {
  return Object(_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(formattedNationalNumber) === state.getNationalDigits();
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.js":
/*!******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.js ***!
  \******************************************************************/
/*! exports provided: DIGIT_PLACEHOLDER, default */
/*! exports used: DIGIT_PLACEHOLDER, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AsYouTypeFormatter; });
/* harmony import */ var _AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsYouTypeFormatter.util */ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.util.js");
/* harmony import */ var _AsYouTypeFormatter_complete__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsYouTypeFormatter.complete */ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.complete.js");
/* harmony import */ var _helpers_parseDigits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/parseDigits */ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _helpers_formatNationalNumberUsingFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/formatNationalNumberUsingFormat */ "./node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _helpers_applyInternationalSeparatorStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/applyInternationalSeparatorStyle */ "./node_modules/libphonenumber-js/es6/helpers/applyInternationalSeparatorStyle.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // Used in phone number format template creation.
// Could be any digit, I guess.

var DUMMY_DIGIT = '9'; // I don't know why is it exactly `15`

var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15; // Create a phone number consisting only of the digit 9 that matches the
// `number_pattern` by applying the pattern to the "longest phone number" string.

var LONGEST_DUMMY_PHONE_NUMBER = Object(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* repeat */ "d"])(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH); // A set of characters that, if found in a national prefix formatting rules, are an indicator to
// us that we should separate the national prefix from the number when formatting.

var NATIONAL_PREFIX_SEPARATORS_PATTERN = /[- ]/; // Deprecated: Google has removed some formatting pattern related code from their repo.
// https://github.com/googlei18n/libphonenumber/commit/a395b4fef3caf57c4bc5f082e1152a4d2bd0ba4c
// "We no longer have numbers in formatting matching patterns, only \d."
// Because this library supports generating custom metadata
// some users may still be using old metadata so the relevant
// code seems to stay until some next major version update.

var SUPPORT_LEGACY_FORMATTING_PATTERNS = true; // A pattern that is used to match character classes in regular expressions.
// An example of a character class is "[1-4]".

var CREATE_CHARACTER_CLASS_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function () {
  return /\[([^\[\]])*\]/g;
}; // Any digit in a regular expression that actually denotes a digit. For
// example, in the regular expression "80[0-2]\d{6,10}", the first 2 digits
// (8 and 0) are standalone digits, but the rest are not.
// Two look-aheads are needed because the number following \\d could be a
// two-digit number, since the phone number can be as long as 15 digits.


var CREATE_STANDALONE_DIGIT_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function () {
  return /\d(?=[^,}][^,}])/g;
}; // A regular expression that is used to determine if a `format` is
// suitable to be used in the "as you type formatter".
// A `format` is suitable when the resulting formatted number has
// the same digits as the user has entered.
//
// In the simplest case, that would mean that the format
// doesn't add any additional digits when formatting a number.
// Google says that it also shouldn't add "star" (`*`) characters,
// like it does in some Israeli formats.
// Such basic format would only contain "valid punctuation"
// and "captured group" identifiers ($1, $2, etc).
//
// An example of a format that adds additional digits:
//
// Country: `AR` (Argentina).
// Format:
// {
//    "pattern": "(\\d)(\\d{2})(\\d{4})(\\d{4})",
//    "leading_digits_patterns": ["91"],
//    "national_prefix_formatting_rule": "0$1",
//    "format": "$2 15-$3-$4",
//    "international_format": "$1 $2 $3-$4"
// }
//
// In the format above, the `format` adds `15` to the digits when formatting a number.
// A sidenote: this format actually is suitable because `national_prefix_for_parsing`
// has previously removed `15` from a national number, so re-adding `15` in `format`
// doesn't actually result in any extra digits added to user's input.
// But verifying that would be a complex procedure, so the code chooses a simpler path:
// it simply filters out all `format`s that contain anything but "captured group" ids.
//
// This regular expression is called `ELIGIBLE_FORMAT_PATTERN` in Google's
// `libphonenumber` code.
//


var NON_ALTERING_FORMAT_REG_EXP = new RegExp('^' + '[' + _constants__WEBPACK_IMPORTED_MODULE_4__[/* VALID_PUNCTUATION */ "f"] + ']*' + '(\\$\\d[' + _constants__WEBPACK_IMPORTED_MODULE_4__[/* VALID_PUNCTUATION */ "f"] + ']*)+' + '$'); // This is the minimum length of the leading digits of a phone number
// to guarantee the first "leading digits pattern" for a phone number format
// to be preemptive.

var MIN_LEADING_DIGITS_LENGTH = 3;

var AsYouTypeFormatter =
/*#__PURE__*/
function () {
  function AsYouTypeFormatter(_ref) {
    var _this = this;

    var state = _ref.state,
        metadata = _ref.metadata;

    _classCallCheck(this, AsYouTypeFormatter);

    _defineProperty(this, "getSeparatorAfterNationalPrefix", function (format) {
      // `US` metadata doesn't have a `national_prefix_formatting_rule`,
      // so the `if` condition below doesn't apply to `US`,
      // but in reality there shoudl be a separator
      // between a national prefix and a national (significant) number.
      // So `US` national prefix separator is a "special" "hardcoded" case.
      if (_this.isNANP) {
        return ' ';
      } // If a `format` has a `national_prefix_formatting_rule`
      // and that rule has a separator after a national prefix,
      // then it means that there should be a separator
      // between a national prefix and a national (significant) number.


      if (format && format.nationalPrefixFormattingRule() && NATIONAL_PREFIX_SEPARATORS_PATTERN.test(format.nationalPrefixFormattingRule())) {
        return ' ';
      } // At this point, there seems to be no clear evidence that
      // there should be a separator between a national prefix
      // and a national (significant) number. So don't insert one.


      return '';
    });

    _defineProperty(this, "shouldTryNationalPrefixFormattingRule", function (format, _ref2) {
      var international = _ref2.international,
          nationalPrefix = _ref2.nationalPrefix;

      if (format.nationalPrefixFormattingRule()) {
        // In some countries, `national_prefix_formatting_rule` is `($1)`,
        // so it applies even if the user hasn't input a national prefix.
        // `format.usesNationalPrefix()` detects such cases.
        var usesNationalPrefix = format.usesNationalPrefix();

        if (usesNationalPrefix && nationalPrefix || !usesNationalPrefix && !international) {
          return true;
        }
      }
    });

    this.metadata = metadata;
    this.resetFormat();
  }

  _createClass(AsYouTypeFormatter, [{
    key: "resetFormat",
    value: function resetFormat() {
      this.chosenFormat = undefined;
      this.template = undefined;
      this.nationalNumberTemplate = undefined;
      this.populatedNationalNumberTemplate = undefined;
      this.populatedNationalNumberTemplatePosition = -1;
    }
  }, {
    key: "reset",
    value: function reset(numberingPlan, state) {
      this.resetFormat();

      if (numberingPlan) {
        this.isNANP = numberingPlan.callingCode() === '1';
        this.matchingFormats = numberingPlan.formats();

        if (state.nationalSignificantNumber) {
          this.narrowDownMatchingFormats(state);
        }
      } else {
        this.isNANP = undefined;
        this.matchingFormats = [];
      }
    }
  }, {
    key: "format",
    value: function format(nextDigits, state) {
      var _this2 = this;

      // See if the phone number digits can be formatted as a complete phone number.
      // If not, use the results from `formatNationalNumberWithNextDigits()`,
      // which formats based on the chosen formatting pattern.
      //
      // Attempting to format complete phone number first is how it's done
      // in Google's `libphonenumber`, so this library just follows it.
      // Google's `libphonenumber` code doesn't explain in detail why does it
      // attempt to format digits as a complete phone number
      // instead of just going with a previoulsy (or newly) chosen `format`:
      //
      // "Checks to see if there is an exact pattern match for these digits.
      //  If so, we should use this instead of any other formatting template
      //  whose leadingDigitsPattern also matches the input."
      //
      if (Object(_AsYouTypeFormatter_complete__WEBPACK_IMPORTED_MODULE_1__[/* canFormatCompleteNumber */ "a"])(state.nationalSignificantNumber, this.metadata)) {
        for (var _iterator = this.matchingFormats, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref3 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref3 = _i.value;
          }

          var format = _ref3;
          var formattedCompleteNumber = Object(_AsYouTypeFormatter_complete__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"])(state, format, {
            metadata: this.metadata,
            shouldTryNationalPrefixFormattingRule: function shouldTryNationalPrefixFormattingRule(format) {
              return _this2.shouldTryNationalPrefixFormattingRule(format, {
                international: state.international,
                nationalPrefix: state.nationalPrefix
              });
            },
            getSeparatorAfterNationalPrefix: this.getSeparatorAfterNationalPrefix
          });

          if (formattedCompleteNumber) {
            this.resetFormat();
            this.chosenFormat = format;
            this.setNationalNumberTemplate(formattedCompleteNumber.replace(/\d/g, _AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"]), state);
            this.populatedNationalNumberTemplate = formattedCompleteNumber; // With a new formatting template, the matched position
            // using the old template needs to be reset.

            this.populatedNationalNumberTemplatePosition = this.template.lastIndexOf(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"]);
            return formattedCompleteNumber;
          }
        }
      } // Format the digits as a partial (incomplete) phone number
      // using the previously chosen formatting pattern (or a newly chosen one).


      return this.formatNationalNumberWithNextDigits(nextDigits, state);
    } // Formats the next phone number digits.

  }, {
    key: "formatNationalNumberWithNextDigits",
    value: function formatNationalNumberWithNextDigits(nextDigits, state) {
      var previouslyChosenFormat = this.chosenFormat; // Choose a format from the list of matching ones.

      var newlyChosenFormat = this.chooseFormat(state);

      if (newlyChosenFormat) {
        if (newlyChosenFormat === previouslyChosenFormat) {
          // If it can format the next (current) digits
          // using the previously chosen phone number format
          // then return the updated formatted number.
          return this.formatNextNationalNumberDigits(nextDigits);
        } else {
          // If a more appropriate phone number format
          // has been chosen for these "leading digits",
          // then re-format the national phone number part
          // using the newly selected format.
          return this.formatNextNationalNumberDigits(state.getNationalDigits());
        }
      }
    }
  }, {
    key: "narrowDownMatchingFormats",
    value: function narrowDownMatchingFormats(_ref4) {
      var _this3 = this;

      var nationalSignificantNumber = _ref4.nationalSignificantNumber,
          nationalPrefix = _ref4.nationalPrefix,
          international = _ref4.international;
      var leadingDigits = nationalSignificantNumber; // "leading digits" pattern list starts with a
      // "leading digits" pattern fitting a maximum of 3 leading digits.
      // So, after a user inputs 3 digits of a national (significant) phone number
      // this national (significant) number can already be formatted.
      // The next "leading digits" pattern is for 4 leading digits max,
      // and the "leading digits" pattern after it is for 5 leading digits max, etc.
      // This implementation is different from Google's
      // in that it searches for a fitting format
      // even if the user has entered less than
      // `MIN_LEADING_DIGITS_LENGTH` digits of a national number.
      // Because some leading digit patterns already match for a single first digit.

      var leadingDigitsPatternIndex = leadingDigits.length - MIN_LEADING_DIGITS_LENGTH;

      if (leadingDigitsPatternIndex < 0) {
        leadingDigitsPatternIndex = 0;
      }

      this.matchingFormats = this.matchingFormats.filter(function (format) {
        return _this3.formatSuits(format, international, nationalPrefix) && _this3.formatMatches(format, leadingDigits, leadingDigitsPatternIndex);
      }); // If there was a phone number format chosen
      // and it no longer holds given the new leading digits then reset it.
      // The test for this `if` condition is marked as:
      // "Reset a chosen format when it no longer holds given the new leading digits".
      // To construct a valid test case for this one can find a country
      // in `PhoneNumberMetadata.xml` yielding one format for 3 `<leadingDigits>`
      // and yielding another format for 4 `<leadingDigits>` (Australia in this case).

      if (this.chosenFormat && this.matchingFormats.indexOf(this.chosenFormat) === -1) {
        this.resetFormat();
      }
    }
  }, {
    key: "formatSuits",
    value: function formatSuits(format, international, nationalPrefix) {
      // When a prefix before a national (significant) number is
      // simply a national prefix, then it's parsed as `this.nationalPrefix`.
      // In more complex cases, a prefix before national (significant) number
      // could include a national prefix as well as some "capturing groups",
      // and in that case there's no info whether a national prefix has been parsed.
      // If national prefix is not used when formatting a phone number
      // using this format, but a national prefix has been entered by the user,
      // and was extracted, then discard such phone number format.
      // In Google's "AsYouType" formatter code, the equivalent would be this part:
      // https://github.com/google/libphonenumber/blob/0a45cfd96e71cad8edb0e162a70fcc8bd9728933/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L175-L184
      if (nationalPrefix && !format.usesNationalPrefix() && // !format.domesticCarrierCodeFormattingRule() &&
      !format.nationalPrefixIsOptionalWhenFormattingInNationalFormat()) {
        return false;
      } // If national prefix is mandatory for this phone number format
      // and there're no guarantees that a national prefix is present in user input
      // then discard this phone number format as not suitable.
      // In Google's "AsYouType" formatter code, the equivalent would be this part:
      // https://github.com/google/libphonenumber/blob/0a45cfd96e71cad8edb0e162a70fcc8bd9728933/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L185-L193


      if (!international && !nationalPrefix && format.nationalPrefixIsMandatoryWhenFormattingInNationalFormat()) {
        return false;
      }

      return true;
    }
  }, {
    key: "formatMatches",
    value: function formatMatches(format, leadingDigits, leadingDigitsPatternIndex) {
      var leadingDigitsPatternsCount = format.leadingDigitsPatterns().length; // If this format is not restricted to a certain
      // leading digits pattern then it fits.

      if (leadingDigitsPatternsCount === 0) {
        return true;
      } // Start excluding any non-matching formats only when the
      // national number entered so far is at least 3 digits long,
      // otherwise format matching would give false negatives.
      // For example, when the digits entered so far are `2`
      // and the leading digits pattern is `21` –
      // it's quite obvious in this case that the format could be the one
      // but due to the absence of further digits it would give false negative.


      if (leadingDigits.length < MIN_LEADING_DIGITS_LENGTH) {
        return true;
      } // If at least `MIN_LEADING_DIGITS_LENGTH` digits of a national number are available
      // then format matching starts narrowing down the list of possible formats
      // (only previously matched formats are considered for next digits).


      leadingDigitsPatternIndex = Math.min(leadingDigitsPatternIndex, leadingDigitsPatternsCount - 1);
      var leadingDigitsPattern = format.leadingDigitsPatterns()[leadingDigitsPatternIndex]; // Brackets are required for `^` to be applied to
      // all or-ed (`|`) parts, not just the first one.

      return new RegExp("^(".concat(leadingDigitsPattern, ")")).test(leadingDigits);
    }
  }, {
    key: "getFormatFormat",
    value: function getFormatFormat(format, international) {
      return international ? format.internationalFormat() : format.format();
    }
  }, {
    key: "chooseFormat",
    value: function chooseFormat(state) {
      var _this4 = this;

      var _loop2 = function _loop2() {
        if (_isArray2) {
          if (_i2 >= _iterator2.length) return "break";
          _ref5 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) return "break";
          _ref5 = _i2.value;
        }

        var format = _ref5;

        // If this format is currently being used
        // and is still suitable, then stick to it.
        if (_this4.chosenFormat === format) {
          return "break";
        } // Sometimes, a formatting rule inserts additional digits in a phone number,
        // and "as you type" formatter can't do that: it should only use the digits
        // that the user has input.
        //
        // For example, in Argentina, there's a format for mobile phone numbers:
        //
        // {
        //    "pattern": "(\\d)(\\d{2})(\\d{4})(\\d{4})",
        //    "leading_digits_patterns": ["91"],
        //    "national_prefix_formatting_rule": "0$1",
        //    "format": "$2 15-$3-$4",
        //    "international_format": "$1 $2 $3-$4"
        // }
        //
        // In that format, `international_format` is used instead of `format`
        // because `format` inserts `15` in the formatted number,
        // and `AsYouType` formatter should only use the digits
        // the user has actually input, without adding any extra digits.
        // In this case, it wouldn't make a difference, because the `15`
        // is first stripped when applying `national_prefix_for_parsing`
        // and then re-added when using `format`, so in reality it doesn't
        // add any new digits to the number, but to detect that, the code
        // would have to be more complex: it would have to try formatting
        // the digits using the format and then see if any digits have
        // actually been added or removed, and then, every time a new digit
        // is input, it should re-check whether the chosen format doesn't
        // alter the digits.
        //
        // Google's code doesn't go that far, and so does this library:
        // it simply requires that a `format` doesn't add any additonal
        // digits to user's input.
        //
        // Also, people in general should move from inputting phone numbers
        // in national format (possibly with national prefixes)
        // and use international phone number format instead:
        // it's a logical thing in the modern age of mobile phones,
        // globalization and the internet.
        //

        /* istanbul ignore if */


        if (!NON_ALTERING_FORMAT_REG_EXP.test(_this4.getFormatFormat(format, state.international))) {
          return "continue";
        }

        if (!_this4.createTemplateForFormat(format, state)) {
          // Remove the format if it can't generate a template.
          _this4.matchingFormats = _this4.matchingFormats.filter(function (_) {
            return _ !== format;
          });
          return "continue";
        }

        _this4.chosenFormat = format;
        return "break";
      };

      // When there are multiple available formats, the formatter uses the first
      // format where a formatting template could be created.
      _loop: for (var _iterator2 = this.matchingFormats.slice(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref5;

        var _ret = _loop2();

        switch (_ret) {
          case "break":
            break _loop;

          case "continue":
            continue;
        }
      }

      if (!this.chosenFormat) {
        // No format matches the national (significant) phone number.
        this.resetFormat();
      }

      return this.chosenFormat;
    }
  }, {
    key: "createTemplateForFormat",
    value: function createTemplateForFormat(format, state) {
      // The formatter doesn't format numbers when numberPattern contains '|', e.g.
      // (20|3)\d{4}. In those cases we quickly return.
      // (Though there's no such format in current metadata)

      /* istanbul ignore if */
      if (SUPPORT_LEGACY_FORMATTING_PATTERNS && format.pattern().indexOf('|') >= 0) {
        return;
      } // Get formatting template for this phone number format


      var template = this.getTemplateForFormat(format, state); // If the national number entered is too long
      // for any phone number format, then abort.

      if (template) {
        this.setNationalNumberTemplate(template, state);
        return true;
      }
    }
  }, {
    key: "getInternationalPrefixBeforeCountryCallingCode",
    value: function getInternationalPrefixBeforeCountryCallingCode(_ref6, options) {
      var IDDPrefix = _ref6.IDDPrefix,
          missingPlus = _ref6.missingPlus;

      if (IDDPrefix) {
        return options && options.spacing === false ? IDDPrefix : IDDPrefix + ' ';
      }

      if (missingPlus) {
        return '';
      }

      return '+';
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(state) {
      if (!this.template) {
        return;
      } // `this.template` holds the template for a "complete" phone number.
      // The currently entered phone number is most likely not "complete",
      // so trim all non-populated digits.


      var index = -1;
      var i = 0;
      var internationalPrefix = state.international ? this.getInternationalPrefixBeforeCountryCallingCode(state, {
        spacing: false
      }) : '';

      while (i < internationalPrefix.length + state.getDigitsWithoutInternationalPrefix().length) {
        index = this.template.indexOf(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"], index + 1);
        i++;
      }

      return Object(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* cutAndStripNonPairedParens */ "b"])(this.template, index + 1);
    }
  }, {
    key: "setNationalNumberTemplate",
    value: function setNationalNumberTemplate(template, state) {
      this.nationalNumberTemplate = template;
      this.populatedNationalNumberTemplate = template; // With a new formatting template, the matched position
      // using the old template needs to be reset.

      this.populatedNationalNumberTemplatePosition = -1; // For convenience, the public `.template` property
      // contains the whole international number
      // if the phone number being input is international:
      // 'x' for the '+' sign, 'x'es for the country phone code,
      // a spacebar and then the template for the formatted national number.

      if (state.international) {
        this.template = this.getInternationalPrefixBeforeCountryCallingCode(state).replace(/[\d\+]/g, _AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"]) + Object(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* repeat */ "d"])(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"], state.callingCode.length) + ' ' + template;
      } else {
        this.template = template;
      }
    }
    /**
     * Generates formatting template for a national phone number,
     * optionally containing a national prefix, for a format.
     * @param  {Format} format
     * @param  {string} nationalPrefix
     * @return {string}
     */

  }, {
    key: "getTemplateForFormat",
    value: function getTemplateForFormat(format, _ref7) {
      var nationalSignificantNumber = _ref7.nationalSignificantNumber,
          international = _ref7.international,
          nationalPrefix = _ref7.nationalPrefix,
          complexPrefixBeforeNationalSignificantNumber = _ref7.complexPrefixBeforeNationalSignificantNumber;
      var pattern = format.pattern();
      /* istanbul ignore else */

      if (SUPPORT_LEGACY_FORMATTING_PATTERNS) {
        pattern = pattern // Replace anything in the form of [..] with \d
        .replace(CREATE_CHARACTER_CLASS_PATTERN(), '\\d') // Replace any standalone digit (not the one in `{}`) with \d
        .replace(CREATE_STANDALONE_DIGIT_PATTERN(), '\\d');
      } // Generate a dummy national number (consisting of `9`s)
      // that fits this format's `pattern`.
      //
      // This match will always succeed,
      // because the "longest dummy phone number"
      // has enough length to accomodate any possible
      // national phone number format pattern.
      //


      var digits = LONGEST_DUMMY_PHONE_NUMBER.match(pattern)[0]; // If the national number entered is too long
      // for any phone number format, then abort.

      if (nationalSignificantNumber.length > digits.length) {
        return;
      } // Get a formatting template which can be used to efficiently format
      // a partial number where digits are added one by one.
      // Below `strictPattern` is used for the
      // regular expression (with `^` and `$`).
      // This wasn't originally in Google's `libphonenumber`
      // and I guess they don't really need it
      // because they're not using "templates" to format phone numbers
      // but I added `strictPattern` after encountering
      // South Korean phone number formatting bug.
      //
      // Non-strict regular expression bug demonstration:
      //
      // this.nationalSignificantNumber : `111111111` (9 digits)
      //
      // pattern : (\d{2})(\d{3,4})(\d{4})
      // format : `$1 $2 $3`
      // digits : `9999999999` (10 digits)
      //
      // '9999999999'.replace(new RegExp(/(\d{2})(\d{3,4})(\d{4})/g), '$1 $2 $3') = "99 9999 9999"
      //
      // template : xx xxxx xxxx
      //
      // But the correct template in this case is `xx xxx xxxx`.
      // The template was generated incorrectly because of the
      // `{3,4}` variability in the `pattern`.
      //
      // The fix is, if `this.nationalSignificantNumber` has already sufficient length
      // to satisfy the `pattern` completely then `this.nationalSignificantNumber`
      // is used instead of `digits`.


      var strictPattern = new RegExp('^' + pattern + '$');
      var nationalNumberDummyDigits = nationalSignificantNumber.replace(/\d/g, DUMMY_DIGIT); // If `this.nationalSignificantNumber` has already sufficient length
      // to satisfy the `pattern` completely then use it
      // instead of `digits`.

      if (strictPattern.test(nationalNumberDummyDigits)) {
        digits = nationalNumberDummyDigits;
      }

      var numberFormat = this.getFormatFormat(format, international);
      var nationalPrefixIncludedInTemplate; // If a user did input a national prefix (and that's guaranteed),
      // and if a `format` does have a national prefix formatting rule,
      // then see if that national prefix formatting rule
      // prepends exactly the same national prefix the user has input.
      // If that's the case, then use the `format` with the national prefix formatting rule.
      // Otherwise, use  the `format` without the national prefix formatting rule,
      // and prepend a national prefix manually to it.

      if (this.shouldTryNationalPrefixFormattingRule(format, {
        international: international,
        nationalPrefix: nationalPrefix
      })) {
        var numberFormatWithNationalPrefix = numberFormat.replace(_helpers_formatNationalNumberUsingFormat__WEBPACK_IMPORTED_MODULE_3__[/* FIRST_GROUP_PATTERN */ "a"], format.nationalPrefixFormattingRule()); // If `national_prefix_formatting_rule` of a `format` simply prepends
        // national prefix at the start of a national (significant) number,
        // then such formatting can be used with `AsYouType` formatter.
        // There seems to be no `else` case: everywhere in metadata,
        // national prefix formatting rule is national prefix + $1,
        // or `($1)`, in which case such format isn't even considered
        // when the user has input a national prefix.

        /* istanbul ignore else */

        if (Object(_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(format.nationalPrefixFormattingRule()) === (nationalPrefix || '') + Object(_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])('$1')) {
          numberFormat = numberFormatWithNationalPrefix;
          nationalPrefixIncludedInTemplate = true; // Replace all digits of the national prefix in the formatting template
          // with `DIGIT_PLACEHOLDER`s.

          if (nationalPrefix) {
            var i = nationalPrefix.length;

            while (i > 0) {
              numberFormat = numberFormat.replace(/\d/, _AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"]);
              i--;
            }
          }
        }
      } // Generate formatting template for this phone number format.


      var template = digits // Format the dummy phone number according to the format.
      .replace(new RegExp(pattern), numberFormat) // Replace each dummy digit with a DIGIT_PLACEHOLDER.
      .replace(new RegExp(DUMMY_DIGIT, 'g'), _AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"]); // If a prefix of a national (significant) number is not as simple
      // as just a basic national prefix, then just prepend such prefix
      // before the national (significant) number, optionally spacing
      // the two with a whitespace.

      if (!nationalPrefixIncludedInTemplate) {
        if (complexPrefixBeforeNationalSignificantNumber) {
          // Prepend the prefix to the template manually.
          template = Object(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* repeat */ "d"])(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"], complexPrefixBeforeNationalSignificantNumber.length) + ' ' + template;
        } else if (nationalPrefix) {
          // Prepend national prefix to the template manually.
          template = Object(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* repeat */ "d"])(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* DIGIT_PLACEHOLDER */ "a"], nationalPrefix.length) + this.getSeparatorAfterNationalPrefix(format) + template;
        }
      }

      if (international) {
        template = Object(_helpers_applyInternationalSeparatorStyle__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(template);
      }

      return template;
    }
  }, {
    key: "formatNextNationalNumberDigits",
    value: function formatNextNationalNumberDigits(digits) {
      var result = Object(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* populateTemplateWithDigits */ "c"])(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition, digits);

      if (!result) {
        // Reset the format.
        this.resetFormat();
        return;
      }

      this.populatedNationalNumberTemplate = result[0];
      this.populatedNationalNumberTemplatePosition = result[1]; // Return the formatted phone number so far.

      return Object(_AsYouTypeFormatter_util__WEBPACK_IMPORTED_MODULE_0__[/* cutAndStripNonPairedParens */ "b"])(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1); // The old way which was good for `input-format` but is not so good
      // for `react-phone-number-input`'s default input (`InputBasic`).
      // return closeNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1)
      // 	.replace(new RegExp(DIGIT_PLACEHOLDER, 'g'), ' ')
    }
  }]);

  return AsYouTypeFormatter;
}();




/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.util.js":
/*!***********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.util.js ***!
  \***********************************************************************/
/*! exports provided: DIGIT_PLACEHOLDER, countOccurences, repeat, cutAndStripNonPairedParens, closeNonPairedParens, stripNonPairedParens, populateTemplateWithDigits */
/*! exports used: DIGIT_PLACEHOLDER, cutAndStripNonPairedParens, populateTemplateWithDigits, repeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DIGIT_PLACEHOLDER; });
/* unused harmony export countOccurences */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return repeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cutAndStripNonPairedParens; });
/* unused harmony export closeNonPairedParens */
/* unused harmony export stripNonPairedParens */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return populateTemplateWithDigits; });
// Should be the same as `DIGIT_PLACEHOLDER` in `libphonenumber-metadata-generator`.
var DIGIT_PLACEHOLDER = 'x'; // '\u2008' (punctuation space)

var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER); // Counts all occurences of a symbol in a string.
// Unicode-unsafe (because using `.split()`).

function countOccurences(symbol, string) {
  var count = 0; // Using `.split('')` to iterate through a string here
  // to avoid requiring `Symbol.iterator` polyfill.
  // `.split('')` is generally not safe for Unicode,
  // but in this particular case for counting brackets it is safe.
  // for (const character of string)

  for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var character = _ref;

    if (character === symbol) {
      count++;
    }
  }

  return count;
} // Repeats a string (or a symbol) N times.
// http://stackoverflow.com/questions/202605/repeat-string-javascript

function repeat(string, times) {
  if (times < 1) {
    return '';
  }

  var result = '';

  while (times > 1) {
    if (times & 1) {
      result += string;
    }

    times >>= 1;
    string += string;
  }

  return result + string;
}
function cutAndStripNonPairedParens(string, cutBeforeIndex) {
  if (string[cutBeforeIndex] === ')') {
    cutBeforeIndex++;
  }

  return stripNonPairedParens(string.slice(0, cutBeforeIndex));
}
function closeNonPairedParens(template, cut_before) {
  var retained_template = template.slice(0, cut_before);
  var opening_braces = countOccurences('(', retained_template);
  var closing_braces = countOccurences(')', retained_template);
  var dangling_braces = opening_braces - closing_braces;

  while (dangling_braces > 0 && cut_before < template.length) {
    if (template[cut_before] === ')') {
      dangling_braces--;
    }

    cut_before++;
  }

  return template.slice(0, cut_before);
}
function stripNonPairedParens(string) {
  var dangling_braces = [];
  var i = 0;

  while (i < string.length) {
    if (string[i] === '(') {
      dangling_braces.push(i);
    } else if (string[i] === ')') {
      dangling_braces.pop();
    }

    i++;
  }

  var start = 0;
  var cleared_string = '';
  dangling_braces.push(string.length);

  for (var _i2 = 0, _dangling_braces = dangling_braces; _i2 < _dangling_braces.length; _i2++) {
    var index = _dangling_braces[_i2];
    cleared_string += string.slice(start, index);
    start = index + 1;
  }

  return cleared_string;
}
function populateTemplateWithDigits(template, position, digits) {
  // Using `.split('')` to iterate through a string here
  // to avoid requiring `Symbol.iterator` polyfill.
  // `.split('')` is generally not safe for Unicode,
  // but in this particular case for `digits` it is safe.
  // for (const digit of digits)
  for (var _iterator2 = digits.split(''), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i3 >= _iterator2.length) break;
      _ref2 = _iterator2[_i3++];
    } else {
      _i3 = _iterator2.next();
      if (_i3.done) break;
      _ref2 = _i3.value;
    }

    var digit = _ref2;

    // If there is room for more digits in current `template`,
    // then set the next digit in the `template`,
    // and return the formatted digits so far.
    // If more digits are entered than the current format could handle.
    if (template.slice(position + 1).search(DIGIT_PLACEHOLDER_MATCHER) < 0) {
      return;
    }

    position = template.search(DIGIT_PLACEHOLDER_MATCHER);
    template = template.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
  }

  return [template, position];
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/AsYouTypeParser.js":
/*!***************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/AsYouTypeParser.js ***!
  \***************************************************************/
/*! exports provided: default, extractFormattedDigitsAndPlus */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsYouTypeParser; });
/* unused harmony export extractFormattedDigitsAndPlus */
/* harmony import */ var _helpers_extractCountryCallingCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/extractCountryCallingCode */ "./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCode.js");
/* harmony import */ var _helpers_extractCountryCallingCodeFromInternationalNumberWithoutPlusSign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign */ "./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js");
/* harmony import */ var _helpers_extractNationalNumberFromPossiblyIncompleteNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/extractNationalNumberFromPossiblyIncompleteNumber */ "./node_modules/libphonenumber-js/es6/helpers/extractNationalNumberFromPossiblyIncompleteNumber.js");
/* harmony import */ var _helpers_stripIddPrefix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/stripIddPrefix */ "./node_modules/libphonenumber-js/es6/helpers/stripIddPrefix.js");
/* harmony import */ var _helpers_parseDigits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/parseDigits */ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART = '[' + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_PUNCTUATION */ "f"] + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_DIGITS */ "e"] + ']+';
var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN = new RegExp('^' + VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART + '$', 'i');
var VALID_FORMATTED_PHONE_NUMBER_PART = '(?:' + '[' + _constants__WEBPACK_IMPORTED_MODULE_5__[/* PLUS_CHARS */ "d"] + ']' + '[' + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_PUNCTUATION */ "f"] + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_DIGITS */ "e"] + ']*' + '|' + '[' + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_PUNCTUATION */ "f"] + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_DIGITS */ "e"] + ']+' + ')';
var AFTER_PHONE_NUMBER_DIGITS_END_PATTERN = new RegExp('[^' + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_PUNCTUATION */ "f"] + _constants__WEBPACK_IMPORTED_MODULE_5__[/* VALID_DIGITS */ "e"] + ']+' + '.*' + '$'); // Tests whether `national_prefix_for_parsing` could match
// different national prefixes.
// Matches anything that's not a digit or a square bracket.

var COMPLEX_NATIONAL_PREFIX = /[^\d\[\]]/;

var AsYouTypeParser =
/*#__PURE__*/
function () {
  function AsYouTypeParser(_ref) {
    var defaultCountry = _ref.defaultCountry,
        defaultCallingCode = _ref.defaultCallingCode,
        metadata = _ref.metadata,
        onNationalSignificantNumberChange = _ref.onNationalSignificantNumberChange;

    _classCallCheck(this, AsYouTypeParser);

    this.defaultCountry = defaultCountry;
    this.defaultCallingCode = defaultCallingCode;
    this.metadata = metadata;
    this.onNationalSignificantNumberChange = onNationalSignificantNumberChange;
  }

  _createClass(AsYouTypeParser, [{
    key: "input",
    value: function input(text, state) {
      var _extractFormattedDigi = extractFormattedDigitsAndPlus(text),
          _extractFormattedDigi2 = _slicedToArray(_extractFormattedDigi, 2),
          formattedDigits = _extractFormattedDigi2[0],
          hasPlus = _extractFormattedDigi2[1];

      var digits = Object(_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(formattedDigits); // Checks for a special case: just a leading `+` has been entered.

      var justLeadingPlus;

      if (hasPlus) {
        if (!state.digits) {
          state.startInternationalNumber();

          if (!digits) {
            justLeadingPlus = true;
          }
        }
      }

      if (digits) {
        this.inputDigits(digits, state);
      }

      return {
        digits: digits,
        justLeadingPlus: justLeadingPlus
      };
    }
    /**
     * Inputs "next" phone number digits.
     * @param  {string} digits
     * @return {string} [formattedNumber] Formatted national phone number (if it can be formatted at this stage). Returning `undefined` means "don't format the national phone number at this stage".
     */

  }, {
    key: "inputDigits",
    value: function inputDigits(nextDigits, state) {
      var digits = state.digits;
      var hasReceivedThreeLeadingDigits = digits.length < 3 && digits.length + nextDigits.length >= 3; // Append phone number digits.

      state.appendDigits(nextDigits); // Attempt to extract IDD prefix:
      // Some users input their phone number in international format,
      // but in an "out-of-country" dialing format instead of using the leading `+`.
      // https://github.com/catamphetamine/libphonenumber-js/issues/185
      // Detect such numbers as soon as there're at least 3 digits.
      // Google's library attempts to extract IDD prefix at 3 digits,
      // so this library just copies that behavior.
      // I guess that's because the most commot IDD prefixes are
      // `00` (Europe) and `011` (US).
      // There exist really long IDD prefixes too:
      // for example, in Australia the default IDD prefix is `0011`,
      // and it could even be as long as `14880011`.
      // An IDD prefix is extracted here, and then every time when
      // there's a new digit and the number couldn't be formatted.

      if (hasReceivedThreeLeadingDigits) {
        this.extractIddPrefix(state);
      }

      if (this.isWaitingForCountryCallingCode(state)) {
        if (!this.extractCountryCallingCode(state)) {
          return;
        }
      } else {
        state.appendNationalSignificantNumberDigits(nextDigits);
      } // If a phone number is being input in international format,
      // then it's not valid for it to have a national prefix.
      // Still, some people incorrectly input such numbers with a national prefix.
      // In such cases, only attempt to strip a national prefix if the number becomes too long.
      // (but that is done later, not here)


      if (!state.international) {
        if (!this.hasExtractedNationalSignificantNumber) {
          this.extractNationalSignificantNumber(state.getNationalDigits(), state.update);
        }
      }
    }
  }, {
    key: "isWaitingForCountryCallingCode",
    value: function isWaitingForCountryCallingCode(_ref2) {
      var international = _ref2.international,
          callingCode = _ref2.callingCode;
      return international && !callingCode;
    } // Extracts a country calling code from a number
    // being entered in internatonal format.

  }, {
    key: "extractCountryCallingCode",
    value: function extractCountryCallingCode(state) {
      var _extractCountryCallin = Object(_helpers_extractCountryCallingCode__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('+' + state.getDigitsWithoutInternationalPrefix(), this.defaultCountry, this.defaultCallingCode, this.metadata.metadata),
          countryCallingCode = _extractCountryCallin.countryCallingCode,
          number = _extractCountryCallin.number;

      if (countryCallingCode) {
        state.setCallingCode(countryCallingCode);
        state.update({
          nationalSignificantNumber: number
        });
        return true;
      }
    }
  }, {
    key: "reset",
    value: function reset(numberingPlan) {
      if (numberingPlan) {
        this.hasSelectedNumberingPlan = true;

        var nationalPrefixForParsing = numberingPlan._nationalPrefixForParsing();

        this.couldPossiblyExtractAnotherNationalSignificantNumber = nationalPrefixForParsing && COMPLEX_NATIONAL_PREFIX.test(nationalPrefixForParsing);
      } else {
        this.hasSelectedNumberingPlan = undefined;
        this.couldPossiblyExtractAnotherNationalSignificantNumber = undefined;
      }
    }
    /**
     * Extracts a national (significant) number from user input.
     * Google's library is different in that it only applies `national_prefix_for_parsing`
     * and doesn't apply `national_prefix_transform_rule` after that.
     * https://github.com/google/libphonenumber/blob/a3d70b0487875475e6ad659af404943211d26456/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L539
     * @return {boolean} [extracted]
     */

  }, {
    key: "extractNationalSignificantNumber",
    value: function extractNationalSignificantNumber(nationalDigits, setState) {
      if (!this.hasSelectedNumberingPlan) {
        return;
      }

      var _extractNationalNumbe = Object(_helpers_extractNationalNumberFromPossiblyIncompleteNumber__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(nationalDigits, this.metadata),
          nationalPrefix = _extractNationalNumbe.nationalPrefix,
          nationalNumber = _extractNationalNumbe.nationalNumber,
          carrierCode = _extractNationalNumbe.carrierCode;

      if (nationalNumber === nationalDigits) {
        return;
      }

      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber, nationalDigits, setState);
      return true;
    }
    /**
     * In Google's code this function is called "attempt to extract longer NDD".
     * "Some national prefixes are a substring of others", they say.
     * @return {boolean} [result] — Returns `true` if extracting a national prefix produced different results from what they were.
     */

  }, {
    key: "extractAnotherNationalSignificantNumber",
    value: function extractAnotherNationalSignificantNumber(nationalDigits, prevNationalSignificantNumber, setState) {
      if (!this.hasExtractedNationalSignificantNumber) {
        return this.extractNationalSignificantNumber(nationalDigits, setState);
      }

      if (!this.couldPossiblyExtractAnotherNationalSignificantNumber) {
        return;
      }

      var _extractNationalNumbe2 = Object(_helpers_extractNationalNumberFromPossiblyIncompleteNumber__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(nationalDigits, this.metadata),
          nationalPrefix = _extractNationalNumbe2.nationalPrefix,
          nationalNumber = _extractNationalNumbe2.nationalNumber,
          carrierCode = _extractNationalNumbe2.carrierCode; // If a national prefix has been extracted previously,
      // then it's always extracted as additional digits are added.
      // That's assuming `extractNationalNumberFromPossiblyIncompleteNumber()`
      // doesn't do anything different from what it currently does.
      // So, just in case, here's this check, though it doesn't occur.

      /* istanbul ignore if */


      if (nationalNumber === prevNationalSignificantNumber) {
        return;
      }

      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber, nationalDigits, setState);
      return true;
    }
  }, {
    key: "onExtractedNationalNumber",
    value: function onExtractedNationalNumber(nationalPrefix, carrierCode, nationalSignificantNumber, nationalDigits, setState) {
      var complexPrefixBeforeNationalSignificantNumber;
      var nationalSignificantNumberMatchesInput; // This check also works with empty `this.nationalSignificantNumber`.

      var nationalSignificantNumberIndex = nationalDigits.lastIndexOf(nationalSignificantNumber); // If the extracted national (significant) number is the
      // last substring of the `digits`, then it means that it hasn't been altered:
      // no digits have been removed from the national (significant) number
      // while applying `national_prefix_transform_rule`.
      // https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/METADATA.md#national_prefix_for_parsing--national_prefix_transform_rule

      if (nationalSignificantNumberIndex >= 0 && nationalSignificantNumberIndex === nationalDigits.length - nationalSignificantNumber.length) {
        nationalSignificantNumberMatchesInput = true; // If a prefix of a national (significant) number is not as simple
        // as just a basic national prefix, then such prefix is stored in
        // `this.complexPrefixBeforeNationalSignificantNumber` property and will be
        // prepended "as is" to the national (significant) number to produce
        // a formatted result.

        var prefixBeforeNationalNumber = nationalDigits.slice(0, nationalSignificantNumberIndex); // `prefixBeforeNationalNumber` is always non-empty,
        // because `onExtractedNationalNumber()` isn't called
        // when a national (significant) number hasn't been actually "extracted":
        // when a national (significant) number is equal to the national part of `digits`,
        // then `onExtractedNationalNumber()` doesn't get called.

        if (prefixBeforeNationalNumber !== nationalPrefix) {
          complexPrefixBeforeNationalSignificantNumber = prefixBeforeNationalNumber;
        }
      }

      setState({
        nationalPrefix: nationalPrefix,
        carrierCode: carrierCode,
        nationalSignificantNumber: nationalSignificantNumber,
        nationalSignificantNumberMatchesInput: nationalSignificantNumberMatchesInput,
        complexPrefixBeforeNationalSignificantNumber: complexPrefixBeforeNationalSignificantNumber
      }); // `onExtractedNationalNumber()` is only called when
      // the national (significant) number actually did change.

      this.hasExtractedNationalSignificantNumber = true;
      this.onNationalSignificantNumberChange();
    }
  }, {
    key: "reExtractNationalSignificantNumber",
    value: function reExtractNationalSignificantNumber(state) {
      // Attempt to extract a national prefix.
      //
      // Some people incorrectly input national prefix
      // in an international phone number.
      // For example, some people write British phone numbers as `+44(0)...`.
      //
      // Also, in some rare cases, it is valid for a national prefix
      // to be a part of an international phone number.
      // For example, mobile phone numbers in Mexico are supposed to be
      // dialled internationally using a `1` national prefix,
      // so the national prefix will be part of an international number.
      //
      // Quote from:
      // https://www.mexperience.com/dialing-cell-phones-in-mexico/
      //
      // "Dialing a Mexican cell phone from abroad
      // When you are calling a cell phone number in Mexico from outside Mexico,
      // it’s necessary to dial an additional “1” after Mexico’s country code
      // (which is “52”) and before the area code.
      // You also ignore the 045, and simply dial the area code and the
      // cell phone’s number.
      //
      // If you don’t add the “1”, you’ll receive a recorded announcement
      // asking you to redial using it.
      //
      // For example, if you are calling from the USA to a cell phone
      // in Mexico City, you would dial +52 – 1 – 55 – 1234 5678.
      // (Note that this is different to calling a land line in Mexico City
      // from abroad, where the number dialed would be +52 – 55 – 1234 5678)".
      //
      // Google's demo output:
      // https://libphonenumber.appspot.com/phonenumberparser?number=%2b5215512345678&country=MX
      //
      if (this.extractAnotherNationalSignificantNumber(state.getNationalDigits(), state.nationalSignificantNumber, state.update)) {
        return true;
      } // If no format matches the phone number, then it could be
      // "a really long IDD" (quote from a comment in Google's library).
      // An IDD prefix is first extracted when the user has entered at least 3 digits,
      // and then here — every time when there's a new digit and the number
      // couldn't be formatted.
      // For example, in Australia the default IDD prefix is `0011`,
      // and it could even be as long as `14880011`.
      //
      // Could also check `!hasReceivedThreeLeadingDigits` here
      // to filter out the case when this check duplicates the one
      // already performed when there're 3 leading digits,
      // but it's not a big deal, and in most cases there
      // will be a suitable `format` when there're 3 leading digits.
      //


      if (this.extractIddPrefix(state)) {
        this.extractCallingCodeAndNationalSignificantNumber(state);
        return true;
      } // Google's AsYouType formatter supports sort of an "autocorrection" feature
      // when it "autocorrects" numbers that have been input for a country
      // with that country's calling code.
      // Such "autocorrection" feature looks weird, but different people have been requesting it:
      // https://github.com/catamphetamine/libphonenumber-js/issues/376
      // https://github.com/catamphetamine/libphonenumber-js/issues/375
      // https://github.com/catamphetamine/libphonenumber-js/issues/316


      if (this.fixMissingPlus(state)) {
        this.extractCallingCodeAndNationalSignificantNumber(state);
        return true;
      }
    }
  }, {
    key: "extractIddPrefix",
    value: function extractIddPrefix(state) {
      // An IDD prefix can't be present in a number written with a `+`.
      // Also, don't re-extract an IDD prefix if has already been extracted.
      var international = state.international,
          IDDPrefix = state.IDDPrefix,
          digits = state.digits,
          nationalSignificantNumber = state.nationalSignificantNumber;

      if (international || IDDPrefix) {
        return;
      } // Some users input their phone number in "out-of-country"
      // dialing format instead of using the leading `+`.
      // https://github.com/catamphetamine/libphonenumber-js/issues/185
      // Detect such numbers.


      var numberWithoutIDD = Object(_helpers_stripIddPrefix__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(digits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata);

      if (numberWithoutIDD !== undefined && numberWithoutIDD !== digits) {
        // If an IDD prefix was stripped then convert the IDD-prefixed number
        // to international number for subsequent parsing.
        state.update({
          IDDPrefix: digits.slice(0, digits.length - numberWithoutIDD.length)
        });
        this.startInternationalNumber(state);
        return true;
      }
    }
  }, {
    key: "fixMissingPlus",
    value: function fixMissingPlus(state) {
      if (!state.international) {
        var _extractCountryCallin2 = Object(_helpers_extractCountryCallingCodeFromInternationalNumberWithoutPlusSign__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(state.digits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata),
            newCallingCode = _extractCountryCallin2.countryCallingCode,
            number = _extractCountryCallin2.number;

        if (newCallingCode) {
          state.update({
            missingPlus: true
          });
          this.startInternationalNumber(state);
          return true;
        }
      }
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber(state) {
      state.startInternationalNumber(); // If a national (significant) number has been extracted before, reset it.

      if (state.nationalSignificantNumber) {
        state.resetNationalSignificantNumber();
        this.onNationalSignificantNumberChange();
        this.hasExtractedNationalSignificantNumber = undefined;
      }
    }
  }, {
    key: "extractCallingCodeAndNationalSignificantNumber",
    value: function extractCallingCodeAndNationalSignificantNumber(state) {
      if (this.extractCountryCallingCode(state)) {
        // `this.extractCallingCode()` is currently called when the number
        // couldn't be formatted during the standard procedure.
        // Normally, the national prefix would be re-extracted
        // for an international number if such number couldn't be formatted,
        // but since it's already not able to be formatted,
        // there won't be yet another retry, so also extract national prefix here.
        this.extractNationalSignificantNumber(state.getNationalDigits(), state.update);
      }
    }
  }]);

  return AsYouTypeParser;
}();
/**
 * Extracts formatted phone number from text (if there's any).
 * @param  {string} text
 * @return {string} [formattedPhoneNumber]
 */




function extractFormattedPhoneNumber(text) {
  // Attempt to extract a possible number from the string passed in.
  var startsAt = text.search(VALID_FORMATTED_PHONE_NUMBER_PART);

  if (startsAt < 0) {
    return;
  } // Trim everything to the left of the phone number.


  text = text.slice(startsAt); // Trim the `+`.

  var hasPlus;

  if (text[0] === '+') {
    hasPlus = true;
    text = text.slice('+'.length);
  } // Trim everything to the right of the phone number.


  text = text.replace(AFTER_PHONE_NUMBER_DIGITS_END_PATTERN, ''); // Re-add the previously trimmed `+`.

  if (hasPlus) {
    text = '+' + text;
  }

  return text;
}
/**
 * Extracts formatted phone number digits (and a `+`) from text (if there're any).
 * @param  {string} text
 * @return {any[]}
 */


function _extractFormattedDigitsAndPlus(text) {
  // Extract a formatted phone number part from text.
  var extractedNumber = extractFormattedPhoneNumber(text) || ''; // Trim a `+`.

  if (extractedNumber[0] === '+') {
    return [extractedNumber.slice('+'.length), true];
  }

  return [extractedNumber];
}
/**
 * Extracts formatted phone number digits (and a `+`) from text (if there're any).
 * @param  {string} text
 * @return {any[]}
 */


function extractFormattedDigitsAndPlus(text) {
  var _extractFormattedDigi3 = _extractFormattedDigitsAndPlus(text),
      _extractFormattedDigi4 = _slicedToArray(_extractFormattedDigi3, 2),
      formattedDigits = _extractFormattedDigi4[0],
      hasPlus = _extractFormattedDigi4[1]; // If the extracted phone number part
  // can possibly be a part of some valid phone number
  // then parse phone number characters from a formatted phone number.


  if (!VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN.test(formattedDigits)) {
    formattedDigits = '';
  }

  return [formattedDigits, hasPlus];
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/AsYouTypeState.js":
/*!**************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/AsYouTypeState.js ***!
  \**************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsYouTypeState; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AsYouTypeState =
/*#__PURE__*/
function () {
  function AsYouTypeState(_ref) {
    var _this = this;

    var onCountryChange = _ref.onCountryChange,
        onCallingCodeChange = _ref.onCallingCodeChange;

    _classCallCheck(this, AsYouTypeState);

    _defineProperty(this, "update", function (properties) {
      for (var _i = 0, _Object$keys = Object.keys(properties); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        _this[key] = properties[key];
      }
    });

    this.onCountryChange = onCountryChange;
    this.onCallingCodeChange = onCallingCodeChange;
  }

  _createClass(AsYouTypeState, [{
    key: "reset",
    value: function reset(defaultCountry, defaultCallingCode) {
      this.international = false;
      this.IDDPrefix = undefined;
      this.missingPlus = undefined;
      this.callingCode = undefined;
      this.digits = '';
      this.resetNationalSignificantNumber();
      this.initCountryAndCallingCode(defaultCountry, defaultCallingCode);
    }
  }, {
    key: "resetNationalSignificantNumber",
    value: function resetNationalSignificantNumber() {
      this.nationalSignificantNumber = this.getNationalDigits();
      this.nationalSignificantNumberMatchesInput = true;
      this.nationalPrefix = undefined;
      this.carrierCode = undefined;
      this.complexPrefixBeforeNationalSignificantNumber = undefined;
    }
  }, {
    key: "initCountryAndCallingCode",
    value: function initCountryAndCallingCode(country, callingCode) {
      this.setCountry(country);
      this.setCallingCode(callingCode);
    }
  }, {
    key: "setCountry",
    value: function setCountry(country) {
      this.country = country;
      this.onCountryChange(country);
    }
  }, {
    key: "setCallingCode",
    value: function setCallingCode(callingCode) {
      this.callingCode = callingCode;
      return this.onCallingCodeChange(this.country, callingCode);
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber() {
      // Prepend the `+` to parsed input.
      this.international = true; // If a default country was set then reset it
      // because an explicitly international phone
      // number is being entered.

      this.initCountryAndCallingCode();
    }
  }, {
    key: "appendDigits",
    value: function appendDigits(nextDigits) {
      this.digits += nextDigits;
    }
  }, {
    key: "appendNationalSignificantNumberDigits",
    value: function appendNationalSignificantNumberDigits(nextDigits) {
      this.nationalSignificantNumber += nextDigits;
    }
    /**
     * Returns the part of `this.digits` that corresponds to the national number.
     * Basically, all digits that have been input by the user, except for the
     * international prefix and the country calling code part
     * (if the number is an international one).
     * @return {string}
     */

  }, {
    key: "getNationalDigits",
    value: function getNationalDigits() {
      if (this.international) {
        return this.digits.slice((this.IDDPrefix ? this.IDDPrefix.length : 0) + (this.callingCode ? this.callingCode.length : 0));
      }

      return this.digits;
    }
  }, {
    key: "getDigitsWithoutInternationalPrefix",
    value: function getDigitsWithoutInternationalPrefix() {
      if (this.international) {
        if (this.IDDPrefix) {
          return this.digits.slice(this.IDDPrefix.length);
        }
      }

      return this.digits;
    }
  }]);

  return AsYouTypeState;
}();




/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/ParseError.js":
/*!**********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/ParseError.js ***!
  \**********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParseError; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://stackoverflow.com/a/46971044/970769
var ParseError = function ParseError(code) {
  _classCallCheck(this, ParseError);

  this.name = this.constructor.name;
  this.message = code;
  this.stack = new Error(code).stack;
};


ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/PhoneNumber.js":
/*!***********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/PhoneNumber.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNumber; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isPossibleNumber_ */ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js");
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");
/* harmony import */ var _isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isValidNumberForRegion_ */ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js");
/* harmony import */ var _helpers_getNumberType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/getNumberType */ "./node_modules/libphonenumber-js/es6/helpers/getNumberType.js");
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./format_ */ "./node_modules/libphonenumber-js/es6/format_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;

var PhoneNumber =
/*#__PURE__*/
function () {
  function PhoneNumber(countryCallingCode, nationalNumber, metadata) {
    _classCallCheck(this, PhoneNumber);

    if (!countryCallingCode) {
      throw new TypeError('`country` or `countryCallingCode` not passed');
    }

    if (!nationalNumber) {
      throw new TypeError('`nationalNumber` not passed');
    }

    var _metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata); // If country code is passed then derive `countryCallingCode` from it.
    // Also store the country code as `.country`.


    if (isCountryCode(countryCallingCode)) {
      this.country = countryCallingCode;

      _metadata.country(countryCallingCode);

      countryCallingCode = _metadata.countryCallingCode();
    } else {
      /* istanbul ignore if */
      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
        if (_metadata.isNonGeographicCallingCode(countryCallingCode)) {
          this.country = '001';
        }
      }
    }

    this.countryCallingCode = countryCallingCode;
    this.nationalNumber = nationalNumber;
    this.number = '+' + this.countryCallingCode + this.nationalNumber;
    this.metadata = metadata;
  }

  _createClass(PhoneNumber, [{
    key: "isPossible",
    value: function isPossible() {
      return Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return Object(_validate___WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isNonGeographic",
    value: function isNonGeographic() {
      var metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](this.metadata);
      return metadata.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function isEqual(phoneNumber) {
      return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
    } // // Is just an alias for `this.isValid() && this.country === country`.
    // // https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
    // isValidForRegion(country) {
    // 	return isValidNumberForRegion(this, country, { v2: true }, this.metadata)
    // }

  }, {
    key: "getType",
    value: function getType() {
      return Object(_helpers_getNumberType__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "format",
    value: function format(_format, options) {
      return Object(_format___WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(this, _format, options ? _objectSpread({}, options, {
        v2: true
      }) : {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "formatNational",
    value: function formatNational(options) {
      return this.format('NATIONAL', options);
    }
  }, {
    key: "formatInternational",
    value: function formatInternational(options) {
      return this.format('INTERNATIONAL', options);
    }
  }, {
    key: "getURI",
    value: function getURI(options) {
      return this.format('RFC3966', options);
    }
  }]);

  return PhoneNumber;
}();



var isCountryCode = function isCountryCode(value) {
  return /^[A-Z]{2}$/.test(value);
};


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js":
/*!******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js ***!
  \******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNumberMatcher; });
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _helpers_extension_createExtensionPattern__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/extension/createExtensionPattern */ "./node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js");
/* harmony import */ var _findNumbers_RegExpCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./findNumbers/RegExpCache */ "./node_modules/libphonenumber-js/es6/findNumbers/RegExpCache.js");
/* harmony import */ var _findNumbers_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findNumbers/util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");
/* harmony import */ var _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./findNumbers/utf-8 */ "./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js");
/* harmony import */ var _findNumbers_Leniency__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./findNumbers/Leniency */ "./node_modules/libphonenumber-js/es6/findNumbers/Leniency.js");
/* harmony import */ var _findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./findNumbers/parsePreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js");
/* harmony import */ var _findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./findNumbers/isValidPreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js");
/* harmony import */ var _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./findNumbers/isValidCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A port of Google's `PhoneNumberMatcher.java`.
 * https://github.com/googlei18n/libphonenumber/blob/master/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberMatcher.java
 * Date: 08.03.2018.
 */












var EXTN_PATTERNS_FOR_MATCHING = Object(_helpers_extension_createExtensionPattern__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])('matching');
/**
 * Patterns used to extract phone numbers from a larger phone-number-like pattern. These are
 * ordered according to specificity. For example, white-space is last since that is frequently
 * used in numbers, not just to separate two numbers. We have separate patterns since we don't
 * want to break up the phone-number-like text on more than one different kind of symbol at one
 * time, although symbols of the same type (e.g. space) can be safely grouped together.
 *
 * Note that if there is a match, we will always check any text found up to the first match as
 * well.
 */

var INNER_MATCHES = [// Breaks on the slash - e.g. "651-234-2345/332-445-1234"
'\\/+(.*)/', // Note that the bracket here is inside the capturing group, since we consider it part of the
// phone number. Will match a pattern like "(650) 223 3345 (754) 223 3321".
'(\\([^(]*)', // Breaks on a hyphen - e.g. "12345 - 332-445-1234 is my number."
// We require a space on either side of the hyphen for it to be considered a separator.
"(?:".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* pZ */ "g"], "-|-").concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* pZ */ "g"], ")").concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* pZ */ "g"], "*(.+)"), // Various types of wide hyphens. Note we have decided not to enforce a space here, since it's
// possible that it's supposed to be used to break two numbers without spaces, and we haven't
// seen many instances of it used within a number.
"[\u2012-\u2015\uFF0D]".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* pZ */ "g"], "*(.+)"), // Breaks on a full stop - e.g. "12345. 332-445-1234 is my number."
"\\.+".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* pZ */ "g"], "*([^.]+)"), // Breaks on space - e.g. "3324451234 8002341234"
"".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* pZ */ "g"], "+(").concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* PZ */ "a"], "+)")]; // Limit on the number of leading (plus) characters.

var leadLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__[/* limit */ "b"])(0, 2); // Limit on the number of consecutive punctuation characters.

var punctuationLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__[/* limit */ "b"])(0, 4);
/* The maximum number of digits allowed in a digit-separated block. As we allow all digits in a
 * single block, set high enough to accommodate the entire national number and the international
 * country code. */

var digitBlockLimit = _constants__WEBPACK_IMPORTED_MODULE_1__[/* MAX_LENGTH_FOR_NSN */ "b"] + _constants__WEBPACK_IMPORTED_MODULE_1__[/* MAX_LENGTH_COUNTRY_CODE */ "a"]; // Limit on the number of blocks separated by punctuation.
// Uses digitBlockLimit since some formats use spaces to separate each digit.

var blockLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__[/* limit */ "b"])(0, digitBlockLimit);
/* A punctuation sequence allowing white space. */

var punctuation = "[".concat(_constants__WEBPACK_IMPORTED_MODULE_1__[/* VALID_PUNCTUATION */ "f"], "]") + punctuationLimit; // A digits block without punctuation.

var digitSequence = _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* pNd */ "f"] + Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__[/* limit */ "b"])(1, digitBlockLimit);
/**
 * Phone number pattern allowing optional punctuation.
 * The phone number pattern used by `find()`, similar to
 * VALID_PHONE_NUMBER, but with the following differences:
 * <ul>
 *   <li>All captures are limited in order to place an upper bound to the text matched by the
 *       pattern.
 * <ul>
 *   <li>Leading punctuation / plus signs are limited.
 *   <li>Consecutive occurrences of punctuation are limited.
 *   <li>Number of digits is limited.
 * </ul>
 *   <li>No whitespace is allowed at the start or end.
 *   <li>No alpha digits (vanity numbers such as 1-800-SIX-FLAGS) are currently supported.
 * </ul>
 */

var PATTERN = '(?:' + _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_9__[/* LEAD_CLASS */ "a"] + punctuation + ')' + leadLimit + digitSequence + '(?:' + punctuation + digitSequence + ')' + blockLimit + '(?:' + EXTN_PATTERNS_FOR_MATCHING + ')?'; // Regular expression of trailing characters that we want to remove.
// We remove all characters that are not alpha or numerical characters.
// The hash character is retained here, as it may signify
// the previous block was an extension.
//
// // Don't know what does '&&' mean here.
// const UNWANTED_END_CHAR_PATTERN = new RegExp(`[[\\P{N}&&\\P{L}]&&[^#]]+$`)
//

var UNWANTED_END_CHAR_PATTERN = new RegExp("[^".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* _pN */ "c"]).concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__[/* _pL */ "b"], "#]+$"));
var NON_DIGITS_PATTERN = /(\D+)/;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
/**
 * A stateful class that finds and extracts telephone numbers from {@linkplain CharSequence text}.
 * Instances can be created using the {@linkplain PhoneNumberUtil#findNumbers factory methods} in
 * {@link PhoneNumberUtil}.
 *
 * <p>Vanity numbers (phone numbers using alphabetic digits such as <tt>1-800-SIX-FLAGS</tt> are
 * not found.
 *
 * <p>This class is not thread-safe.
 */

var PhoneNumberMatcher =
/*#__PURE__*/
function () {
  /** The iteration tristate. */

  /** The next index to start searching at. Undefined in {@link State#DONE}. */
  // A cache for frequently used country-specific regular expressions. Set to 32 to cover ~2-3
  // countries being used for the same doc with ~10 patterns for each country. Some pages will have
  // a lot more countries in use, but typically fewer numbers for each so expanding the cache for
  // that use-case won't have a lot of benefit.

  /**
   * Creates a new instance. See the factory methods in {@link PhoneNumberUtil} on how to obtain a
   * new instance.
   *
   * @param util  the phone number util to use
   * @param text  the character sequence that we will search, null for no text
   * @param country  the country to assume for phone numbers not written in international format
   *     (with a leading plus, or with the international dialing prefix of the specified region).
   *     May be null or "ZZ" if only numbers with a leading plus should be
   *     considered.
   * @param leniency  the leniency to use when evaluating candidate phone numbers
   * @param maxTries  the maximum number of invalid numbers to try before giving up on the text.
   *     This is to cover degenerate cases where the text has a lot of false positives in it. Must
   *     be {@code >= 0}.
   */
  function PhoneNumberMatcher() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metadata = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, PhoneNumberMatcher);

    _defineProperty(this, "state", 'NOT_READY');

    _defineProperty(this, "searchIndex", 0);

    _defineProperty(this, "regExpCache", new _findNumbers_RegExpCache__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](32));

    options = _objectSpread({}, options, {
      defaultCallingCode: options.defaultCallingCode,
      defaultCountry: options.defaultCountry && Object(_metadata__WEBPACK_IMPORTED_MODULE_10__[/* isSupportedCountry */ "d"])(options.defaultCountry, metadata) ? options.defaultCountry : undefined,
      leniency: options.leniency || options.extended ? 'POSSIBLE' : 'VALID',
      maxTries: options.maxTries || MAX_SAFE_INTEGER
    });

    if (!options.leniency) {
      throw new TypeError('`Leniency` not supplied');
    }

    if (options.maxTries < 0) {
      throw new TypeError('`maxTries` not supplied');
    }

    this.text = text;
    this.options = options;
    this.metadata = metadata;
    /** The degree of validation requested. */

    this.leniency = _findNumbers_Leniency__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"][options.leniency];

    if (!this.leniency) {
      throw new TypeError("Unknown leniency: ".concat(options.leniency, "."));
    }
    /** The maximum number of retries after matching an invalid number. */


    this.maxTries = options.maxTries;
    this.PATTERN = new RegExp(PATTERN, 'ig');
  }
  /**
   * Attempts to find the next subsequence in the searched sequence on or after {@code searchIndex}
   * that represents a phone number. Returns the next match, null if none was found.
   *
   * @param index  the search index to start searching at
   * @return  the phone number match found, null if none can be found
   */


  _createClass(PhoneNumberMatcher, [{
    key: "find",
    value: function find() {
      // // Reset the regular expression.
      // this.PATTERN.lastIndex = index
      var matches;

      while (this.maxTries > 0 && (matches = this.PATTERN.exec(this.text)) !== null) {
        var candidate = matches[0];
        var offset = matches.index;
        candidate = Object(_findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(candidate);

        if (Object(_findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(candidate, offset, this.text)) {
          var match = // Try to come up with a valid match given the entire candidate.
          this.parseAndVerify(candidate, offset, this.text) // If that failed, try to find an "inner match" -
          // there might be a phone number within this candidate.
          || this.extractInnerMatch(candidate, offset, this.text);

          if (match) {
            if (this.options.v2) {
              var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](match.country || match.countryCallingCode, match.phone, this.metadata);

              if (match.ext) {
                phoneNumber.ext = match.ext;
              }

              return {
                startsAt: match.startsAt,
                endsAt: match.endsAt,
                number: phoneNumber
              };
            }

            return match;
          }
        }

        this.maxTries--;
      }
    }
    /**
     * Attempts to extract a match from `substring`
     * if the substring itself does not qualify as a match.
     */

  }, {
    key: "extractInnerMatch",
    value: function extractInnerMatch(substring, offset, text) {
      for (var _i = 0, _INNER_MATCHES = INNER_MATCHES; _i < _INNER_MATCHES.length; _i++) {
        var innerMatchPattern = _INNER_MATCHES[_i];
        var isFirstMatch = true;
        var candidateMatch = void 0;
        var innerMatchRegExp = new RegExp(innerMatchPattern, 'g');

        while (this.maxTries > 0 && (candidateMatch = innerMatchRegExp.exec(substring)) !== null) {
          if (isFirstMatch) {
            // We should handle any group before this one too.
            var _candidate = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__[/* trimAfterFirstMatch */ "d"])(UNWANTED_END_CHAR_PATTERN, substring.slice(0, candidateMatch.index));

            var _match = this.parseAndVerify(_candidate, offset, text);

            if (_match) {
              return _match;
            }

            this.maxTries--;
            isFirstMatch = false;
          }

          var candidate = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__[/* trimAfterFirstMatch */ "d"])(UNWANTED_END_CHAR_PATTERN, candidateMatch[1]); // Java code does `groupMatcher.start(1)` here,
          // but there's no way in javascript to get a `candidate` start index,
          // therefore resort to using this kind of an approximation.
          // (`groupMatcher` is called `candidateInSubstringMatch` in this javascript port)
          // https://stackoverflow.com/questions/15934353/get-index-of-each-capture-in-a-javascript-regex

          var candidateIndexGuess = substring.indexOf(candidate, candidateMatch.index);
          var match = this.parseAndVerify(candidate, offset + candidateIndexGuess, text);

          if (match) {
            return match;
          }

          this.maxTries--;
        }
      }
    }
    /**
     * Parses a phone number from the `candidate` using `parseNumber` and
     * verifies it matches the requested `leniency`. If parsing and verification succeed,
     * a corresponding `PhoneNumberMatch` is returned, otherwise this method returns `null`.
     *
     * @param candidate  the candidate match
     * @param offset  the offset of {@code candidate} within {@link #text}
     * @return  the parsed and validated phone number match, or null
     */

  }, {
    key: "parseAndVerify",
    value: function parseAndVerify(candidate, offset, text) {
      if (!Object(_findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_9__[/* default */ "b"])(candidate, offset, text, this.options.leniency)) {
        return;
      }

      var number = Object(_parse___WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"])(candidate, {
        extended: true,
        defaultCountry: this.options.defaultCountry,
        defaultCallingCode: this.options.defaultCallingCode
      }, this.metadata);

      if (!number.possible) {
        return;
      }

      if (this.leniency(number, candidate, this.metadata, this.regExpCache)) {
        // // We used parseAndKeepRawInput to create this number,
        // // but for now we don't return the extra values parsed.
        // // TODO: stop clearing all values here and switch all users over
        // // to using rawInput() rather than the rawString() of PhoneNumberMatch.
        // number.clearCountryCodeSource()
        // number.clearRawInput()
        // number.clearPreferredDomesticCarrierCode()
        var result = {
          startsAt: offset,
          endsAt: offset + candidate.length,
          phone: number.phone
        };

        if (number.country && number.country !== '001') {
          result.country = number.country;
        } else {
          result.countryCallingCode = number.countryCallingCode;
        }

        if (number.ext) {
          result.ext = number.ext;
        }

        return result;
      }
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      if (this.state === 'NOT_READY') {
        this.lastMatch = this.find(); // (this.searchIndex)

        if (this.lastMatch) {
          // this.searchIndex = this.lastMatch.endsAt
          this.state = 'READY';
        } else {
          this.state = 'DONE';
        }
      }

      return this.state === 'READY';
    }
  }, {
    key: "next",
    value: function next() {
      // Check the state and find the next match as a side-effect if necessary.
      if (!this.hasNext()) {
        throw new Error('No next element');
      } // Don't retain that memory any longer than necessary.


      var result = this.lastMatch;
      this.lastMatch = null;
      this.state = 'NOT_READY';
      return result;
    }
  }]);

  return PhoneNumberMatcher;
}();




/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/constants.js ***!
  \*********************************************************/
/*! exports provided: MIN_LENGTH_FOR_NSN, MAX_LENGTH_FOR_NSN, MAX_LENGTH_COUNTRY_CODE, VALID_DIGITS, WHITESPACE, VALID_PUNCTUATION, PLUS_CHARS */
/*! exports used: MAX_LENGTH_COUNTRY_CODE, MAX_LENGTH_FOR_NSN, MIN_LENGTH_FOR_NSN, PLUS_CHARS, VALID_DIGITS, VALID_PUNCTUATION, WHITESPACE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MIN_LENGTH_FOR_NSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MAX_LENGTH_FOR_NSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MAX_LENGTH_COUNTRY_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VALID_DIGITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WHITESPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return VALID_PUNCTUATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PLUS_CHARS; });
// The minimum length of the national significant number.
var MIN_LENGTH_FOR_NSN = 2; // The ITU says the maximum length should be 15,
// but one can find longer numbers in Germany.

var MAX_LENGTH_FOR_NSN = 17; // The maximum length of the country calling code.

var MAX_LENGTH_COUNTRY_CODE = 3; // Digits accepted in phone numbers
// (ascii, fullwidth, arabic-indic, and eastern arabic digits).

var VALID_DIGITS = "0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9"; // `DASHES` will be right after the opening square bracket of the "character class"

var DASHES = "-\u2010-\u2015\u2212\u30FC\uFF0D";
var SLASHES = "\uFF0F/";
var DOTS = "\uFF0E.";
var WHITESPACE = " \xA0\xAD\u200B\u2060\u3000";
var BRACKETS = "()\uFF08\uFF09\uFF3B\uFF3D\\[\\]"; // export const OPENING_BRACKETS = '(\uFF08\uFF3B\\\['

var TILDES = "~\u2053\u223C\uFF5E"; // Regular expression of acceptable punctuation found in phone numbers. This
// excludes punctuation found as a leading character only. This consists of dash
// characters, white space characters, full stops, slashes, square brackets,
// parentheses and tildes. Full-width variants are also present.

var VALID_PUNCTUATION = "".concat(DASHES).concat(SLASHES).concat(DOTS).concat(WHITESPACE).concat(BRACKETS).concat(TILDES);
var PLUS_CHARS = "+\uFF0B"; // const LEADING_PLUS_CHARS_PATTERN = new RegExp('^[' + PLUS_CHARS + ']+')


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers.js":
/*!***********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return findNumbers; });
/* harmony import */ var _findNumbers___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findNumbers_ */ "./node_modules/libphonenumber-js/es6/findNumbers_.js");
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");


function findNumbers() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_findNumbers___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(text, options, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/LRUCache.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/LRUCache.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LRUCache; });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
var Node = function Node(key, value) {
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var prev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, Node);

  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
};

var LRUCache =
/*#__PURE__*/
function () {
  //set default limit of 10 if limit is not passed.
  function LRUCache() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, LRUCache);

    this.size = 0;
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.cache = {};
  } // Write Node to head of LinkedList
  // update cache with Node key and Node reference


  _createClass(LRUCache, [{
    key: "put",
    value: function put(key, value) {
      this.ensureLimit();

      if (!this.head) {
        this.head = this.tail = new Node(key, value);
      } else {
        var node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      } //Update the cache map


      this.cache[key] = this.head;
      this.size++;
    } // Read from cache map and make that node as new Head of LinkedList

  }, {
    key: "get",
    value: function get(key) {
      if (this.cache[key]) {
        var value = this.cache[key].value; // node removed from it's position and cache

        this.remove(key); // write node again to the head of LinkedList to make it most recently used

        this.put(key, value);
        return value;
      }

      console.log("Item not available in cache for key ".concat(key));
    }
  }, {
    key: "ensureLimit",
    value: function ensureLimit() {
      if (this.size === this.limit) {
        this.remove(this.tail.key);
      }
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var node = this.cache[key];

      if (node.prev !== null) {
        node.prev.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next !== null) {
        node.next.prev = node.prev;
      } else {
        this.tail = node.prev;
      }

      delete this.cache[key];
      this.size--;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = null;
      this.tail = null;
      this.size = 0;
      this.cache = {};
    } // // Invokes the callback function with every node of the chain and the index of the node.
    // forEach(fn) {
    //   let node = this.head;
    //   let counter = 0;
    //   while (node) {
    //     fn(node, counter);
    //     node = node.next;
    //     counter++;
    //   }
    // }
    // // To iterate over LRU with a 'for...of' loop
    // *[Symbol.iterator]() {
    //   let node = this.head;
    //   while (node) {
    //     yield node;
    //     node = node.next;
    //   }
    // }

  }]);

  return LRUCache;
}();




/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/Leniency.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/Leniency.js ***!
  \********************************************************************/
/*! exports provided: default, containsMoreThanOneSlashInNationalNumber */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export containsMoreThanOneSlashInNationalNumber */
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");
/* harmony import */ var _helpers_parseDigits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseDigits */ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");



/**
 * Leniency when finding potential phone numbers in text segments
 * The levels here are ordered in increasing strictness.
 */

/* harmony default export */ __webpack_exports__["a"] = ({
  /**
   * Phone numbers accepted are "possible", but not necessarily "valid".
   */
  POSSIBLE: function POSSIBLE(number, candidate, metadata) {
    return true;
  },

  /**
   * Phone numbers accepted are "possible" and "valid".
   * Numbers written in national format must have their national-prefix
   * present if it is usually written for a number of this type.
   */
  VALID: function VALID(number, candidate, metadata) {
    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidate.toString(), metadata)) {
      return false;
    } // Skipped for simplicity.
    // return isNationalPrefixPresentIfRequired(number, metadata)


    return true;
  },

  /**
   * Phone numbers accepted are "valid" and
   * are grouped in a possible way for this locale. For example, a US number written as
   * "65 02 53 00 00" and "650253 0000" are not accepted at this leniency level, whereas
   * "650 253 0000", "650 2530000" or "6502530000" are.
   * Numbers with more than one '/' symbol in the national significant number
   * are also dropped at this level.
   *
   * Warning: This level might result in lower coverage especially for regions outside of
   * country code "+1". If you are not sure about which level to use,
   * email the discussion group libphonenumber-discuss@googlegroups.com.
   */
  STRICT_GROUPING: function STRICT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsRemainGrouped, regExpCache);
  },

  /**
   * Phone numbers accepted are {@linkplain PhoneNumberUtil#isValidNumber(PhoneNumber) valid} and
   * are grouped in the same way that we would have formatted it, or as a single block. For
   * example, a US number written as "650 2530000" is not accepted at this leniency level, whereas
   * "650 253 0000" or "6502530000" are.
   * Numbers with more than one '/' symbol are also dropped at this level.
   * <p>
   * Warning: This level might result in lower coverage especially for regions outside of country
   * code "+1". If you are not sure about which level to use, email the discussion group
   * libphonenumber-discuss@googlegroups.com.
   */
  EXACT_GROUPING: function EXACT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsAreExactlyPresent, regExpCache);
  }
});

function containsOnlyValidXChars(number, candidate, metadata) {
  // The characters 'x' and 'X' can be (1) a carrier code, in which case they always precede the
  // national significant number or (2) an extension sign, in which case they always precede the
  // extension number. We assume a carrier code is more than 1 digit, so the first case has to
  // have more than 1 consecutive 'x' or 'X', whereas the second case can only have exactly 1 'x'
  // or 'X'. We ignore the character if it appears as the last character of the string.
  for (var index = 0; index < candidate.length - 1; index++) {
    var charAtIndex = candidate.charAt(index);

    if (charAtIndex === 'x' || charAtIndex === 'X') {
      var charAtNextIndex = candidate.charAt(index + 1);

      if (charAtNextIndex === 'x' || charAtNextIndex === 'X') {
        // This is the carrier code case, in which the 'X's always precede the national
        // significant number.
        index++;

        if (util.isNumberMatch(number, candidate.substring(index)) != MatchType.NSN_MATCH) {
          return false;
        } // This is the extension sign case, in which the 'x' or 'X' should always precede the
        // extension number.

      } else if (Object(_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(candidate.substring(index)) !== number.ext) {
        return false;
      }
    }
  }

  return true;
}

function isNationalPrefixPresentIfRequired(number, _metadata) {
  // First, check how we deduced the country code. If it was written in international format, then
  // the national prefix is not required.
  if (number.getCountryCodeSource() != 'FROM_DEFAULT_COUNTRY') {
    return true;
  }

  var phoneNumberRegion = util.getRegionCodeForCountryCode(number.getCountryCode());
  var metadata = util.getMetadataForRegion(phoneNumberRegion);

  if (metadata == null) {
    return true;
  } // Check if a national prefix should be present when formatting this number.


  var nationalNumber = util.getNationalSignificantNumber(number);
  var formatRule = util.chooseFormattingPatternForNumber(metadata.numberFormats(), nationalNumber); // To do this, we check that a national prefix formatting rule was present
  // and that it wasn't just the first-group symbol ($1) with punctuation.

  if (formatRule && formatRule.getNationalPrefixFormattingRule().length > 0) {
    if (formatRule.getNationalPrefixOptionalWhenFormatting()) {
      // The national-prefix is optional in these cases, so we don't need to check if it was
      // present.
      return true;
    }

    if (PhoneNumberUtil.formattingRuleHasFirstGroupOnly(formatRule.getNationalPrefixFormattingRule())) {
      // National Prefix not needed for this number.
      return true;
    } // Normalize the remainder.


    var rawInputCopy = PhoneNumberUtil.normalizeDigitsOnly(number.getRawInput()); // Check if we found a national prefix and/or carrier code at the start of the raw input, and
    // return the result.

    return util.maybeStripNationalPrefixAndCarrierCode(rawInputCopy, metadata, null);
  }

  return true;
}

function containsMoreThanOneSlashInNationalNumber(number, candidate) {
  var firstSlashInBodyIndex = candidate.indexOf('/');

  if (firstSlashInBodyIndex < 0) {
    // No slashes, this is okay.
    return false;
  } // Now look for a second one.


  var secondSlashInBodyIndex = candidate.indexOf('/', firstSlashInBodyIndex + 1);

  if (secondSlashInBodyIndex < 0) {
    // Only one slash, this is okay.
    return false;
  } // If the first slash is after the country calling code, this is permitted.


  var candidateHasCountryCode = number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN || number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN;

  if (candidateHasCountryCode && PhoneNumberUtil.normalizeDigitsOnly(candidate.substring(0, firstSlashInBodyIndex)) === String(number.getCountryCode())) {
    // Any more slashes and this is illegal.
    return candidate.slice(secondSlashInBodyIndex + 1).indexOf('/') >= 0;
  }

  return true;
}

function checkNumberGroupingIsValid(number, candidate, metadata, checkGroups, regExpCache) {
  var normalizedCandidate = normalizeDigits(candidate, true
  /* keep non-digits */
  );
  var formattedNumberGroups = getNationalNumberGroups(metadata, number, null);

  if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
    return true;
  } // If this didn't pass, see if there are any alternate formats that match, and try them instead.


  var alternateFormats = MetadataManager.getAlternateFormatsForCountry(number.getCountryCode());
  var nationalSignificantNumber = util.getNationalSignificantNumber(number);

  if (alternateFormats) {
    for (var _iterator = alternateFormats.numberFormats(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var alternateFormat = _ref;

      if (alternateFormat.leadingDigitsPatterns().length > 0) {
        // There is only one leading digits pattern for alternate formats.
        var leadingDigitsRegExp = regExpCache.getPatternForRegExp('^' + alternateFormat.leadingDigitsPatterns()[0]);

        if (!leadingDigitsRegExp.test(nationalSignificantNumber)) {
          // Leading digits don't match; try another one.
          continue;
        }
      }

      formattedNumberGroups = getNationalNumberGroups(metadata, number, alternateFormat);

      if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
        return true;
      }
    }
  }

  return false;
}
/**
 * Helper method to get the national-number part of a number, formatted without any national
 * prefix, and return it as a set of digit blocks that would be formatted together following
 * standard formatting rules.
 */


function getNationalNumberGroups(metadata, number, formattingPattern) {
  if (formattingPattern) {
    // We format the NSN only, and split that according to the separator.
    var nationalSignificantNumber = util.getNationalSignificantNumber(number);
    return util.formatNsnUsingPattern(nationalSignificantNumber, formattingPattern, 'RFC3966', metadata).split('-');
  } // This will be in the format +CC-DG1-DG2-DGX;ext=EXT where DG1..DGX represents groups of digits.


  var rfc3966Format = formatNumber(number, 'RFC3966', metadata); // We remove the extension part from the formatted string before splitting it into different
  // groups.

  var endIndex = rfc3966Format.indexOf(';');

  if (endIndex < 0) {
    endIndex = rfc3966Format.length;
  } // The country-code will have a '-' following it.


  var startIndex = rfc3966Format.indexOf('-') + 1;
  return rfc3966Format.slice(startIndex, endIndex).split('-');
}

function allNumberGroupsAreExactlyPresent(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var candidateGroups = normalizedCandidate.split(NON_DIGITS_PATTERN); // Set this to the last group, skipping it if the number has an extension.

  var candidateNumberGroupIndex = number.hasExtension() ? candidateGroups.length - 2 : candidateGroups.length - 1; // First we check if the national significant number is formatted as a block.
  // We use contains and not equals, since the national significant number may be present with
  // a prefix such as a national number prefix, or the country code itself.

  if (candidateGroups.length == 1 || candidateGroups[candidateNumberGroupIndex].contains(util.getNationalSignificantNumber(number))) {
    return true;
  } // Starting from the end, go through in reverse, excluding the first group, and check the
  // candidate and number groups are the same.


  var formattedNumberGroupIndex = formattedNumberGroups.length - 1;

  while (formattedNumberGroupIndex > 0 && candidateNumberGroupIndex >= 0) {
    if (candidateGroups[candidateNumberGroupIndex] !== formattedNumberGroups[formattedNumberGroupIndex]) {
      return false;
    }

    formattedNumberGroupIndex--;
    candidateNumberGroupIndex--;
  } // Now check the first group. There may be a national prefix at the start, so we only check
  // that the candidate group ends with the formatted number group.


  return candidateNumberGroupIndex >= 0 && Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* endsWith */ "a"])(candidateGroups[candidateNumberGroupIndex], formattedNumberGroups[0]);
}

function allNumberGroupsRemainGrouped(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var fromIndex = 0;

  if (number.getCountryCodeSource() !== CountryCodeSource.FROM_DEFAULT_COUNTRY) {
    // First skip the country code if the normalized candidate contained it.
    var countryCode = String(number.getCountryCode());
    fromIndex = normalizedCandidate.indexOf(countryCode) + countryCode.length();
  } // Check each group of consecutive digits are not broken into separate groupings in the
  // {@code normalizedCandidate} string.


  for (var i = 0; i < formattedNumberGroups.length; i++) {
    // Fails if the substring of {@code normalizedCandidate} starting from {@code fromIndex}
    // doesn't contain the consecutive digits in formattedNumberGroups[i].
    fromIndex = normalizedCandidate.indexOf(formattedNumberGroups[i], fromIndex);

    if (fromIndex < 0) {
      return false;
    } // Moves {@code fromIndex} forward.


    fromIndex += formattedNumberGroups[i].length();

    if (i == 0 && fromIndex < normalizedCandidate.length()) {
      // We are at the position right after the NDC. We get the region used for formatting
      // information based on the country code in the phone number, rather than the number itself,
      // as we do not need to distinguish between different countries with the same country
      // calling code and this is faster.
      var region = util.getRegionCodeForCountryCode(number.getCountryCode());

      if (util.getNddPrefixForRegion(region, true) != null && Character.isDigit(normalizedCandidate.charAt(fromIndex))) {
        // This means there is no formatting symbol after the NDC. In this case, we only
        // accept the number if there is no formatting symbol at all in the number, except
        // for extensions. This is only important for countries with national prefixes.
        var nationalSignificantNumber = util.getNationalSignificantNumber(number);
        return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* startsWith */ "c"])(normalizedCandidate.slice(fromIndex - formattedNumberGroups[i].length), nationalSignificantNumber);
      }
    }
  } // The check here makes sure that we haven't mistakenly already used the extension to
  // match the last group of the subscriber number. Note the extension cannot have
  // formatting in-between digits.


  return normalizedCandidate.slice(fromIndex).contains(number.getExtension());
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/RegExpCache.js":
/*!***********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/RegExpCache.js ***!
  \***********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegExpCache; });
/* harmony import */ var _LRUCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LRUCache */ "./node_modules/libphonenumber-js/es6/findNumbers/LRUCache.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // A cache for frequently used country-specific regular expressions. Set to 32 to cover ~2-3
// countries being used for the same doc with ~10 patterns for each country. Some pages will have
// a lot more countries in use, but typically fewer numbers for each so expanding the cache for
// that use-case won't have a lot of benefit.

var RegExpCache =
/*#__PURE__*/
function () {
  function RegExpCache(size) {
    _classCallCheck(this, RegExpCache);

    this.cache = new _LRUCache__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](size);
  }

  _createClass(RegExpCache, [{
    key: "getPatternForRegExp",
    value: function getPatternForRegExp(pattern) {
      var regExp = this.cache.get(pattern);

      if (!regExp) {
        regExp = new RegExp('^' + pattern);
        this.cache.put(pattern, regExp);
      }

      return regExp;
    }
  }]);

  return RegExpCache;
}();




/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js":
/*!****************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js ***!
  \****************************************************************************/
/*! exports provided: LEAD_CLASS, default */
/*! exports used: LEAD_CLASS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LEAD_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isValidCandidate; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");
/* harmony import */ var _utf_8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utf-8 */ "./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js");
// Copy-pasted from `PhoneNumberMatcher.js`.



var OPENING_PARENS = "(\\[\uFF08\uFF3B";
var CLOSING_PARENS = ")\\]\uFF09\uFF3D";
var NON_PARENS = "[^".concat(OPENING_PARENS).concat(CLOSING_PARENS, "]");
var LEAD_CLASS = "[".concat(OPENING_PARENS).concat(_constants__WEBPACK_IMPORTED_MODULE_0__[/* PLUS_CHARS */ "d"], "]"); // Punctuation that may be at the start of a phone number - brackets and plus signs.

var LEAD_CLASS_LEADING = new RegExp('^' + LEAD_CLASS); // Limit on the number of pairs of brackets in a phone number.

var BRACKET_PAIR_LIMIT = Object(_util__WEBPACK_IMPORTED_MODULE_1__[/* limit */ "b"])(0, 3);
/**
 * Pattern to check that brackets match. Opening brackets should be closed within a phone number.
 * This also checks that there is something inside the brackets. Having no brackets at all is also
 * fine.
 *
 * An opening bracket at the beginning may not be closed, but subsequent ones should be.  It's
 * also possible that the leading bracket was dropped, so we shouldn't be surprised if we see a
 * closing bracket first. We limit the sets of brackets in a phone number to four.
 */

var MATCHING_BRACKETS_ENTIRE = new RegExp('^' + "(?:[" + OPENING_PARENS + "])?" + "(?:" + NON_PARENS + "+" + "[" + CLOSING_PARENS + "])?" + NON_PARENS + "+" + "(?:[" + OPENING_PARENS + "]" + NON_PARENS + "+[" + CLOSING_PARENS + "])" + BRACKET_PAIR_LIMIT + NON_PARENS + "*" + '$');
/**
 * Matches strings that look like publication pages. Example:
 * <pre>Computing Complete Answers to Queries in the Presence of Limited Access Patterns.
 * Chen Li. VLDB J. 12(3): 211-227 (2003).</pre>
 *
 * The string "211-227 (2003)" is not a telephone number.
 */

var PUB_PAGES = /\d{1,5}-+\d{1,5}\s{0,4}\(\d{1,4}/;
function isValidCandidate(candidate, offset, text, leniency) {
  // Check the candidate doesn't contain any formatting
  // which would indicate that it really isn't a phone number.
  if (!MATCHING_BRACKETS_ENTIRE.test(candidate) || PUB_PAGES.test(candidate)) {
    return;
  } // If leniency is set to VALID or stricter, we also want to skip numbers that are surrounded
  // by Latin alphabetic characters, to skip cases like abc8005001234 or 8005001234def.


  if (leniency !== 'POSSIBLE') {
    // If the candidate is not at the start of the text,
    // and does not start with phone-number punctuation,
    // check the previous character.
    if (offset > 0 && !LEAD_CLASS_LEADING.test(candidate)) {
      var previousChar = text[offset - 1]; // We return null if it is a latin letter or an invalid punctuation symbol.

      if (Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__[/* isInvalidPunctuationSymbol */ "d"])(previousChar) || Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__[/* isLatinLetter */ "e"])(previousChar)) {
        return false;
      }
    }

    var lastCharIndex = offset + candidate.length;

    if (lastCharIndex < text.length) {
      var nextChar = text[lastCharIndex];

      if (Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__[/* isInvalidPunctuationSymbol */ "d"])(nextChar) || Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__[/* isLatinLetter */ "e"])(nextChar)) {
        return false;
      }
    }
  }

  return true;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isValidPreCandidate; });
// Matches strings that look like dates using "/" as a separator.
// Examples: 3/10/2011, 31/10/96 or 08/31/95.
var SLASH_SEPARATED_DATES = /(?:(?:[0-3]?\d\/[01]?\d)|(?:[01]?\d\/[0-3]?\d))\/(?:[12]\d)?\d{2}/; // Matches timestamps.
// Examples: "2012-01-02 08:00".
// Note that the reg-ex does not include the
// trailing ":\d\d" -- that is covered by TIME_STAMPS_SUFFIX.

var TIME_STAMPS = /[12]\d{3}[-/]?[01]\d[-/]?[0-3]\d +[0-2]\d$/;
var TIME_STAMPS_SUFFIX_LEADING = /^:[0-5]\d/;
function isValidPreCandidate(candidate, offset, text) {
  // Skip a match that is more likely to be a date.
  if (SLASH_SEPARATED_DATES.test(candidate)) {
    return false;
  } // Skip potential time-stamps.


  if (TIME_STAMPS.test(candidate)) {
    var followingText = text.slice(offset + candidate.length);

    if (TIME_STAMPS_SUFFIX_LEADING.test(followingText)) {
      return false;
    }
  }

  return true;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parsePreCandidate; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");
 // Regular expression of characters typically used to start a second phone number for the purposes
// of parsing. This allows us to strip off parts of the number that are actually the start of
// another number, such as for: (530) 583-6985 x302/x2303 -> the second extension here makes this
// actually two phone numbers, (530) 583-6985 x302 and (530) 583-6985 x2303. We remove the second
// extension so that the first number is parsed correctly.
//
// Matches a slash (\ or /) followed by a space followed by an `x`.
//

var SECOND_NUMBER_START_PATTERN = /[\\/] *x/;
function parsePreCandidate(candidate) {
  // Check for extra numbers at the end.
  // TODO: This is the place to start when trying to support extraction of multiple phone number
  // from split notations (+41 79 123 45 67 / 68).
  return Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* trimAfterFirstMatch */ "d"])(SECOND_NUMBER_START_PATTERN, candidate);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js ***!
  \*****************************************************************/
/*! exports provided: pZ, PZ, _pN, pNd, _pL, isLatinLetter, isInvalidPunctuationSymbol */
/*! exports used: PZ, _pL, _pN, isInvalidPunctuationSymbol, isLatinLetter, pNd, pZ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return pZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _pN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return pNd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _pL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isLatinLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isInvalidPunctuationSymbol; });
// Javascript doesn't support UTF-8 regular expressions.
// So mimicking them here.
// Copy-pasted from `PhoneNumberMatcher.js`.

/**
 * "\p{Z}" is any kind of whitespace or invisible separator ("Separator").
 * http://www.regular-expressions.info/unicode.html
 * "\P{Z}" is the reverse of "\p{Z}".
 * "\p{N}" is any kind of numeric character in any script ("Number").
 * "\p{Nd}" is a digit zero through nine in any script except "ideographic scripts" ("Decimal_Digit_Number").
 * "\p{Sc}" is a currency symbol ("Currency_Symbol").
 * "\p{L}" is any kind of letter from any language ("Letter").
 * "\p{Mn}" is "non-spacing mark".
 *
 * Javascript doesn't support Unicode Regular Expressions
 * so substituting it with this explicit set of characters.
 *
 * https://stackoverflow.com/questions/13210194/javascript-regex-equivalent-of-a-za-z-using-pl
 * https://github.com/danielberndt/babel-plugin-utf-8-regex/blob/master/src/transformer.js
 */
var _pZ = " \xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000";
var pZ = "[".concat(_pZ, "]");
var PZ = "[^".concat(_pZ, "]");
var _pN = "0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19"; // const pN = `[${_pN}]`

var _pNd = "0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19";
var pNd = "[".concat(_pNd, "]");
var _pL = "A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var pL = "[".concat(_pL, "]");
var pL_regexp = new RegExp(pL);
var _pSc = "$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20B9\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6";
var pSc = "[".concat(_pSc, "]");
var pSc_regexp = new RegExp(pSc);
var _pMn = "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u08FE\u0900-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1DC0-\u1DE6\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26";
var pMn = "[".concat(_pMn, "]");
var pMn_regexp = new RegExp(pMn);
var _InBasic_Latin = "\0-\x7F";
var _InLatin_1_Supplement = "\x80-\xFF";
var _InLatin_Extended_A = "\u0100-\u017F";
var _InLatin_Extended_Additional = "\u1E00-\u1EFF";
var _InLatin_Extended_B = "\u0180-\u024F";
var _InCombining_Diacritical_Marks = "\u0300-\u036F";
var latinLetterRegexp = new RegExp('[' + _InBasic_Latin + _InLatin_1_Supplement + _InLatin_Extended_A + _InLatin_Extended_Additional + _InLatin_Extended_B + _InCombining_Diacritical_Marks + ']');
/**
 * Helper method to determine if a character is a Latin-script letter or not.
 * For our purposes, combining marks should also return true since we assume
 * they have been added to a preceding Latin character.
 */

function isLatinLetter(letter) {
  // Combining marks are a subset of non-spacing-mark.
  if (!pL_regexp.test(letter) && !pMn_regexp.test(letter)) {
    return false;
  }

  return latinLetterRegexp.test(letter);
}
function isInvalidPunctuationSymbol(character) {
  return character === '%' || pSc_regexp.test(character);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/util.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/util.js ***!
  \****************************************************************/
/*! exports provided: limit, trimAfterFirstMatch, startsWith, endsWith */
/*! exports used: endsWith, limit, startsWith, trimAfterFirstMatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return limit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return trimAfterFirstMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return startsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return endsWith; });
/** Returns a regular expression quantifier with an upper and lower limit. */
function limit(lower, upper) {
  if (lower < 0 || upper <= 0 || upper < lower) {
    throw new TypeError();
  }

  return "{".concat(lower, ",").concat(upper, "}");
}
/**
 * Trims away any characters after the first match of {@code pattern} in {@code candidate},
 * returning the trimmed version.
 */

function trimAfterFirstMatch(regexp, string) {
  var index = string.search(regexp);

  if (index >= 0) {
    return string.slice(0, index);
  }

  return string;
}
function startsWith(string, substring) {
  return string.indexOf(substring) === 0;
}
function endsWith(string, substring) {
  return string.indexOf(substring, string.length - substring.length) === string.length - substring.length;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers_.js":
/*!************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers_.js ***!
  \************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return findNumbers; });
/* harmony import */ var _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumberMatcher */ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js");

function findNumbers(text, options, metadata) {
  var matcher = new _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](text, options, metadata);
  var results = [];

  while (matcher.hasNext()) {
    results.push(matcher.next());
  }

  return results;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findPhoneNumbers.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findPhoneNumbers.js ***!
  \****************************************************************/
/*! exports provided: default, searchPhoneNumbers */
/*! exports used: default, searchPhoneNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return searchPhoneNumbers; });
/* harmony import */ var _findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findPhoneNumbers_ */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js");
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
// This is a legacy function.
// Use `findNumbers()` instead.


function findPhoneNumbers() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"])(text, options, metadata);
}
/**
 * @return ES6 `for ... of` iterator.
 */

function searchPhoneNumbers() {
  var _normalizeArguments2 = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments2.text,
      options = _normalizeArguments2.options,
      metadata = _normalizeArguments2.metadata;

  return Object(_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__[/* searchPhoneNumbers */ "c"])(text, options, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js":
/*!**********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js ***!
  \**********************************************************************/
/*! exports provided: default, getArguments */
/*! exports used: default, getArguments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return findPhoneNumbersInText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getArguments; });
/* harmony import */ var _findNumbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findNumbers */ "./node_modules/libphonenumber-js/es6/findNumbers.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function findPhoneNumbersInText(text, defaultCountry, options, metadata) {
  var args = getArguments(defaultCountry, options, metadata);
  return Object(_findNumbers__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(text, args.options, args.metadata);
}
function getArguments(defaultCountry, options, metadata) {
  if (metadata) {
    if (defaultCountry) {
      options = _objectSpread({}, options, {
        defaultCountry: defaultCountry
      });
    }
  } else {
    if (options) {
      metadata = options;

      if (defaultCountry) {
        if (is_object(defaultCountry)) {
          options = defaultCountry;
        } else {
          options = {
            defaultCountry: defaultCountry
          };
        }
      } else {
        options = undefined;
      }
    } else {
      metadata = defaultCountry;
      options = undefined;
    }
  }

  return {
    options: _objectSpread({}, options, {
      v2: true
    }),
    metadata: metadata
  };
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
  return _typeof(_) === 'object';
};


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js ***!
  \*****************************************************************/
/*! exports provided: EXTN_PATTERNS_FOR_PARSING, default, searchPhoneNumbers, PhoneNumberSearch */
/*! exports used: PhoneNumberSearch, default, searchPhoneNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EXTN_PATTERNS_FOR_PARSING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return searchPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNumberSearch; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
/* harmony import */ var _helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js");
/* harmony import */ var _helpers_extension_createExtensionPattern__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/extension/createExtensionPattern */ "./node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js");
/* harmony import */ var _findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findNumbers/parsePreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js");
/* harmony import */ var _findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./findNumbers/isValidPreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js");
/* harmony import */ var _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./findNumbers/isValidCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is a legacy function.
// Use `findNumbers()` instead.







/**
 * Regexp of all possible ways to write extensions, for use when parsing. This
 * will be run as a case-insensitive regexp match. Wide character versions are
 * also provided after each ASCII version. There are three regular expressions
 * here. The first covers RFC 3966 format, where the extension is added using
 * ';ext='. The second more generic one starts with optional white space and
 * ends with an optional full stop (.), followed by zero or more spaces/tabs
 * /commas and then the numbers themselves. The other one covers the special
 * case of American numbers where the extension is written with a hash at the
 * end, such as '- 503#'. Note that the only capturing groups should be around
 * the digits that you want to capture as part of the extension, or else parsing
 * will fail! We allow two options for representing the accented o - the
 * character itself, and one in the unicode decomposed form with the combining
 * acute accent.
 */

var EXTN_PATTERNS_FOR_PARSING = Object(_helpers_extension_createExtensionPattern__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])('parsing');
var WHITESPACE_IN_THE_BEGINNING_PATTERN = new RegExp('^[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* WHITESPACE */ "g"] + ']+');
var PUNCTUATION_IN_THE_END_PATTERN = new RegExp('[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_PUNCTUATION */ "f"] + ']+$'); // // Regular expression for getting opening brackets for a valid number
// // found using `PHONE_NUMBER_START_PATTERN` for prepending those brackets to the number.
// const BEFORE_NUMBER_DIGITS_PUNCTUATION = new RegExp('[' + OPENING_BRACKETS + ']+' + '[' + WHITESPACE + ']*' + '$')

var VALID_PRECEDING_CHARACTER_PATTERN = /[^a-zA-Z0-9]/;
function findPhoneNumbers(text, options, metadata) {
  /* istanbul ignore if */
  if (options === undefined) {
    options = {};
  }

  var search = new PhoneNumberSearch(text, options, metadata);
  var phones = [];

  while (search.hasNext()) {
    phones.push(search.next());
  }

  return phones;
}
/**
 * @return ES6 `for ... of` iterator.
 */

function searchPhoneNumbers(text, options, metadata) {
  /* istanbul ignore if */
  if (options === undefined) {
    options = {};
  }

  var search = new PhoneNumberSearch(text, options, metadata);
  return _defineProperty({}, Symbol.iterator, function () {
    return {
      next: function next() {
        if (search.hasNext()) {
          return {
            done: false,
            value: search.next()
          };
        }

        return {
          done: true
        };
      }
    };
  });
}
/**
 * Extracts a parseable phone number including any opening brackets, etc.
 * @param  {string} text - Input.
 * @return {object} `{ ?number, ?startsAt, ?endsAt }`.
 */

var PhoneNumberSearch =
/*#__PURE__*/
function () {
  // Iteration tristate.
  function PhoneNumberSearch(text, options, metadata) {
    _classCallCheck(this, PhoneNumberSearch);

    _defineProperty(this, "state", 'NOT_READY');

    this.text = text; // If assigning the `{}` default value is moved to the arguments above,
    // code coverage would decrease for some weird reason.

    this.options = options || {};
    this.metadata = metadata;
    this.regexp = new RegExp(_helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_2__[/* VALID_PHONE_NUMBER_WITH_EXTENSION */ "a"], 'ig');
  }

  _createClass(PhoneNumberSearch, [{
    key: "find",
    value: function find() {
      var matches = this.regexp.exec(this.text);

      if (!matches) {
        return;
      }

      var number = matches[0];
      var startsAt = matches.index;
      number = number.replace(WHITESPACE_IN_THE_BEGINNING_PATTERN, '');
      startsAt += matches[0].length - number.length; // Fixes not parsing numbers with whitespace in the end.
      // Also fixes not parsing numbers with opening parentheses in the end.
      // https://github.com/catamphetamine/libphonenumber-js/issues/252

      number = number.replace(PUNCTUATION_IN_THE_END_PATTERN, '');
      number = Object(_findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(number);
      var result = this.parseCandidate(number, startsAt);

      if (result) {
        return result;
      } // Tail recursion.
      // Try the next one if this one is not a valid phone number.


      return this.find();
    }
  }, {
    key: "parseCandidate",
    value: function parseCandidate(number, startsAt) {
      if (!Object(_findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(number, startsAt, this.text)) {
        return;
      } // Don't parse phone numbers which are non-phone numbers
      // due to being part of something else (e.g. a UUID).
      // https://github.com/catamphetamine/libphonenumber-js/issues/213
      // Copy-pasted from Google's `PhoneNumberMatcher.js` (`.parseAndValidate()`).


      if (!Object(_findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"])(number, startsAt, this.text, this.options.extended ? 'POSSIBLE' : 'VALID')) {
        return;
      } // // Prepend any opening brackets left behind by the
      // // `PHONE_NUMBER_START_PATTERN` regexp.
      // const text_before_number = text.slice(this.searching_from, startsAt)
      // const full_number_starts_at = text_before_number.search(BEFORE_NUMBER_DIGITS_PUNCTUATION)
      // if (full_number_starts_at >= 0)
      // {
      // 	number   = text_before_number.slice(full_number_starts_at) + number
      // 	startsAt = full_number_starts_at
      // }
      //
      // this.searching_from = matches.lastIndex


      var result = Object(_parse___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(number, this.options, this.metadata);

      if (!result.phone) {
        return;
      }

      result.startsAt = startsAt;
      result.endsAt = startsAt + number.length;
      return result;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      if (this.state === 'NOT_READY') {
        this.last_match = this.find();

        if (this.last_match) {
          this.state = 'READY';
        } else {
          this.state = 'DONE';
        }
      }

      return this.state === 'READY';
    }
  }, {
    key: "next",
    value: function next() {
      // Check the state and find the next match as a side-effect if necessary.
      if (!this.hasNext()) {
        throw new Error('No next element');
      } // Don't retain that memory any longer than necessary.


      var result = this.last_match;
      this.last_match = null;
      this.state = 'NOT_READY';
      return result;
    }
  }]);

  return PhoneNumberSearch;
}();


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/format.js":
/*!******************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/format.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatNumber; });
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format_ */ "./node_modules/libphonenumber-js/es6/format_.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function formatNumber() {
  var _normalizeArguments = normalizeArguments(arguments),
      input = _normalizeArguments.input,
      format = _normalizeArguments.format,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_format___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(input, format, options, metadata);
} // Sort out arguments

function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args),
      _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 5),
      arg_1 = _Array$prototype$slic2[0],
      arg_2 = _Array$prototype$slic2[1],
      arg_3 = _Array$prototype$slic2[2],
      arg_4 = _Array$prototype$slic2[3],
      arg_5 = _Array$prototype$slic2[4];

  var input;
  var format;
  var options;
  var metadata; // Sort out arguments.
  // If the phone number is passed as a string.
  // `format('8005553535', ...)`.

  if (typeof arg_1 === 'string') {
    // If country code is supplied.
    // `format('8005553535', 'RU', 'NATIONAL', [options], metadata)`.
    if (typeof arg_3 === 'string') {
      format = arg_3;

      if (arg_5) {
        options = arg_4;
        metadata = arg_5;
      } else {
        metadata = arg_4;
      }

      input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(arg_1, {
        defaultCountry: arg_2,
        extended: true
      }, metadata);
    } // Just an international phone number is supplied
    // `format('+78005553535', 'NATIONAL', [options], metadata)`.
    else {
        if (typeof arg_2 !== 'string') {
          throw new Error('`format` argument not passed to `formatNumber(number, format)`');
        }

        format = arg_2;

        if (arg_4) {
          options = arg_3;
          metadata = arg_4;
        } else {
          metadata = arg_3;
        }

        input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(arg_1, {
          extended: true
        }, metadata);
      }
  } // If the phone number is passed as a parsed number object.
  // `format({ phone: '8005553535', country: 'RU' }, 'NATIONAL', [options], metadata)`.
  else if (is_object(arg_1)) {
      input = arg_1;
      format = arg_2;

      if (arg_4) {
        options = arg_3;
        metadata = arg_4;
      } else {
        metadata = arg_3;
      }
    } else throw new TypeError('A phone number must either be a string or an object of shape { phone, [country] }.'); // Legacy lowercase formats.


  if (format === 'International') {
    format = 'INTERNATIONAL';
  } else if (format === 'National') {
    format = 'NATIONAL';
  }

  return {
    input: input,
    format: format,
    options: options,
    metadata: metadata
  };
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */


var is_object = function is_object(_) {
  return _typeof(_) === 'object';
};


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/formatIncompletePhoneNumber.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/formatIncompletePhoneNumber.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatIncompletePhoneNumber; });
/* harmony import */ var _AsYouType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsYouType */ "./node_modules/libphonenumber-js/es6/AsYouType.js");

/**
 * Formats a (possibly incomplete) phone number.
 * The phone number can be either in E.164 format
 * or in a form of national number digits.
 * @param {string} value - A possibly incomplete phone number. Either in E.164 format or in a form of national number digits.
 * @param {string?} country - Two-letter ("ISO 3166-1 alpha-2") country code.
 * @return {string} Formatted (possibly incomplete) phone number.
 */

function formatIncompletePhoneNumber(value, country, metadata) {
  if (!metadata) {
    metadata = country;
    country = undefined;
  }

  return new _AsYouType__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](country, metadata).input(value);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/format_.js":
/*!*******************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/format_.js ***!
  \*******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatNumber; });
/* harmony import */ var _helpers_matchesEntirely__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/matchesEntirely */ "./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js");
/* harmony import */ var _helpers_formatNationalNumberUsingFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/formatNationalNumberUsingFormat */ "./node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _helpers_getIddPrefix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/getIddPrefix */ "./node_modules/libphonenumber-js/es6/helpers/getIddPrefix.js");
/* harmony import */ var _helpers_RFC3966__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/RFC3966 */ "./node_modules/libphonenumber-js/es6/helpers/RFC3966.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js





var DEFAULT_OPTIONS = {
  formatExtension: function formatExtension(formattedNumber, extension, metadata) {
    return "".concat(formattedNumber).concat(metadata.ext()).concat(extension);
  } // Formats a phone number
  //
  // Example use cases:
  //
  // ```js
  // formatNumber('8005553535', 'RU', 'INTERNATIONAL')
  // formatNumber('8005553535', 'RU', 'INTERNATIONAL', metadata)
  // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL')
  // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL', metadata)
  // formatNumber('+78005553535', 'NATIONAL')
  // formatNumber('+78005553535', 'NATIONAL', metadata)
  // ```
  //

};
function formatNumber(input, format, options, metadata) {
  // Apply default options.
  if (options) {
    options = _objectSpread({}, DEFAULT_OPTIONS, options);
  } else {
    options = DEFAULT_OPTIONS;
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](metadata);

  if (input.country && input.country !== '001') {
    // Validate `input.country`.
    if (!metadata.hasCountry(input.country)) {
      throw new Error("Unknown country: ".concat(input.country));
    }

    metadata.country(input.country);
  } else if (input.countryCallingCode) {
    metadata.selectNumberingPlan(input.countryCallingCode);
  } else return input.phone || '';

  var countryCallingCode = metadata.countryCallingCode();
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // This variable should have been declared inside `case`s
  // but Babel has a bug and it says "duplicate variable declaration".

  var number;

  switch (format) {
    case 'NATIONAL':
      // Legacy argument support.
      // (`{ country: ..., phone: '' }`)
      if (!nationalNumber) {
        return '';
      }

      number = formatNationalNumber(nationalNumber, input.carrierCode, 'NATIONAL', metadata, options);
      return addExtension(number, input.ext, metadata, options.formatExtension);

    case 'INTERNATIONAL':
      // Legacy argument support.
      // (`{ country: ..., phone: '' }`)
      if (!nationalNumber) {
        return "+".concat(countryCallingCode);
      }

      number = formatNationalNumber(nationalNumber, null, 'INTERNATIONAL', metadata, options);
      number = "+".concat(countryCallingCode, " ").concat(number);
      return addExtension(number, input.ext, metadata, options.formatExtension);

    case 'E.164':
      // `E.164` doesn't define "phone number extensions".
      return "+".concat(countryCallingCode).concat(nationalNumber);

    case 'RFC3966':
      return Object(_helpers_RFC3966__WEBPACK_IMPORTED_MODULE_4__[/* formatRFC3966 */ "a"])({
        number: "+".concat(countryCallingCode).concat(nationalNumber),
        ext: input.ext
      });
    // For reference, here's Google's IDD formatter:
    // https://github.com/google/libphonenumber/blob/32719cf74e68796788d1ca45abc85dcdc63ba5b9/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L1546
    // Not saying that this IDD formatter replicates it 1:1, but it seems to work.
    // Who would even need to format phone numbers in IDD format anyway?

    case 'IDD':
      if (!options.fromCountry) {
        return; // throw new Error('`fromCountry` option not passed for IDD-prefixed formatting.')
      }

      var formattedNumber = formatIDD(nationalNumber, input.carrierCode, countryCallingCode, options.fromCountry, metadata);
      return addExtension(formattedNumber, input.ext, metadata, options.formatExtension);

    default:
      throw new Error("Unknown \"format\" argument passed to \"formatNumber()\": \"".concat(format, "\""));
  }
}

function formatNationalNumber(number, carrierCode, formatAs, metadata, options) {
  var format = chooseFormatForNumber(metadata.formats(), number);

  if (!format) {
    return number;
  }

  return Object(_helpers_formatNationalNumberUsingFormat__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"])(number, format, {
    useInternationalFormat: formatAs === 'INTERNATIONAL',
    withNationalPrefix: format.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && options && options.nationalPrefix === false ? false : true,
    carrierCode: carrierCode,
    metadata: metadata
  });
}

function chooseFormatForNumber(availableFormats, nationalNnumber) {
  for (var _iterator = availableFormats, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var format = _ref;

    // Validate leading digits
    if (format.leadingDigitsPatterns().length > 0) {
      // The last leading_digits_pattern is used here, as it is the most detailed
      var lastLeadingDigitsPattern = format.leadingDigitsPatterns()[format.leadingDigitsPatterns().length - 1]; // If leading digits don't match then move on to the next phone number format

      if (nationalNnumber.search(lastLeadingDigitsPattern) !== 0) {
        continue;
      }
    } // Check that the national number matches the phone number format regular expression


    if (Object(_helpers_matchesEntirely__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(nationalNnumber, format.pattern())) {
      return format;
    }
  }
}

function addExtension(formattedNumber, ext, metadata, formatExtension) {
  return ext ? formatExtension(formattedNumber, ext, metadata) : formattedNumber;
}

function formatIDD(nationalNumber, carrierCode, countryCallingCode, fromCountry, metadata) {
  var fromCountryCallingCode = Object(_metadata__WEBPACK_IMPORTED_MODULE_2__[/* getCountryCallingCode */ "b"])(fromCountry, metadata.metadata); // When calling within the same country calling code.

  if (fromCountryCallingCode === countryCallingCode) {
    var formattedNumber = formatNationalNumber(nationalNumber, carrierCode, 'NATIONAL', metadata); // For NANPA regions, return the national format for these regions
    // but prefix it with the country calling code.

    if (countryCallingCode === '1') {
      return countryCallingCode + ' ' + formattedNumber;
    } // If regions share a country calling code, the country calling code need
    // not be dialled. This also applies when dialling within a region, so this
    // if clause covers both these cases. Technically this is the case for
    // dialling from La Reunion to other overseas departments of France (French
    // Guiana, Martinique, Guadeloupe), but not vice versa - so we don't cover
    // this edge case for now and for those cases return the version including
    // country calling code. Details here:
    // http://www.petitfute.com/voyage/225-info-pratiques-reunion
    //


    return formattedNumber;
  }

  var iddPrefix = Object(_helpers_getIddPrefix__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(fromCountry, undefined, metadata.metadata);

  if (iddPrefix) {
    return "".concat(iddPrefix, " ").concat(countryCallingCode, " ").concat(formatNationalNumber(nationalNumber, null, 'INTERNATIONAL', metadata));
  }
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getCountries.js":
/*!************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getCountries.js ***!
  \************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCountries; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");

function getCountries(metadata) {
  return new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata).getCountries();
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getCountryCallingCode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getCountryCallingCode.js ***!
  \*********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _metadata__WEBPACK_IMPORTED_MODULE_0__["b"]; });

// Deprecated. Import from 'metadata.js' directly instead.



/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getExampleNumber.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getExampleNumber.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getExampleNumber; });
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");

function getExampleNumber(country, examples, metadata) {
  if (examples[country]) {
    return new _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](country, examples[country], metadata);
  }
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getNumberType.js":
/*!*************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getNumberType.js ***!
  \*************************************************************/
/*! exports provided: default, normalizeArguments */
/*! exports used: default, normalizeArguments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNumberType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return normalizeArguments; });
/* harmony import */ var _helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js");
/* harmony import */ var _helpers_getNumberType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/getNumberType */ "./node_modules/libphonenumber-js/es6/helpers/getNumberType.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // Finds out national phone number type (fixed line, mobile, etc)

function getNumberType() {
  var _normalizeArguments = normalizeArguments(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_helpers_getNumberType__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(input, options, metadata);
} // Sort out arguments

function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args),
      _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4),
      arg_1 = _Array$prototype$slic2[0],
      arg_2 = _Array$prototype$slic2[1],
      arg_3 = _Array$prototype$slic2[2],
      arg_4 = _Array$prototype$slic2[3];

  var input;
  var options = {};
  var metadata; // If the phone number is passed as a string.
  // `getNumberType('88005553535', ...)`.

  if (typeof arg_1 === 'string') {
    // If "default country" argument is being passed
    // then convert it to an `options` object.
    // `getNumberType('88005553535', 'RU', metadata)`.
    if (_typeof(arg_2) !== 'object') {
      if (arg_4) {
        options = arg_3;
        metadata = arg_4;
      } else {
        metadata = arg_3;
      } // `parse` extracts phone numbers from raw text,
      // therefore it will cut off all "garbage" characters,
      // while this `validate` function needs to verify
      // that the phone number contains no "garbage"
      // therefore the explicit `isViablePhoneNumber` check.


      if (Object(_helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"])(arg_1)) {
        input = Object(_parse___WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(arg_1, {
          defaultCountry: arg_2
        }, metadata);
      } else {
        input = {};
      }
    } // No "resrict country" argument is being passed.
    // International phone number is passed.
    // `getNumberType('+78005553535', metadata)`.
    else {
        if (arg_3) {
          options = arg_2;
          metadata = arg_3;
        } else {
          metadata = arg_2;
        } // `parse` extracts phone numbers from raw text,
        // therefore it will cut off all "garbage" characters,
        // while this `validate` function needs to verify
        // that the phone number contains no "garbage"
        // therefore the explicit `isViablePhoneNumber` check.


        if (Object(_helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"])(arg_1)) {
          input = Object(_parse___WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(arg_1, undefined, metadata);
        } else {
          input = {};
        }
      }
  } // If the phone number is passed as a parsed phone number.
  // `getNumberType({ phone: '88005553535', country: 'RU' }, ...)`.
  else if (is_object(arg_1)) {
      input = arg_1;

      if (arg_3) {
        options = arg_2;
        metadata = arg_3;
      } else {
        metadata = arg_2;
      }
    } else throw new TypeError('A phone number must either be a string or an object of shape { phone, [country] }.');

  return {
    input: input,
    options: options,
    metadata: metadata
  };
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
  return _typeof(_) === 'object';
};


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/RFC3966.js":
/*!***************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/RFC3966.js ***!
  \***************************************************************/
/*! exports provided: parseRFC3966, formatRFC3966 */
/*! exports used: formatRFC3966, parseRFC3966 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parseRFC3966; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatRFC3966; });
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

 // https://www.ietf.org/rfc/rfc3966.txt

/**
 * @param  {string} text - Phone URI (RFC 3966).
 * @return {object} `{ ?number, ?ext }`.
 */

function parseRFC3966(text) {
  var number;
  var ext; // Replace "tel:" with "tel=" for parsing convenience.

  text = text.replace(/^tel:/, 'tel=');

  for (var _iterator = text.split(';'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var part = _ref;

    var _part$split = part.split('='),
        _part$split2 = _slicedToArray(_part$split, 2),
        name = _part$split2[0],
        value = _part$split2[1];

    switch (name) {
      case 'tel':
        number = value;
        break;

      case 'ext':
        ext = value;
        break;

      case 'phone-context':
        // Only "country contexts" are supported.
        // "Domain contexts" are ignored.
        if (value[0] === '+') {
          number = value + number;
        }

        break;
    }
  } // If the phone number is not viable, then abort.


  if (!Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"])(number)) {
    return {};
  }

  var result = {
    number: number
  };

  if (ext) {
    result.ext = ext;
  }

  return result;
}
/**
 * @param  {object} - `{ ?number, ?extension }`.
 * @return {string} Phone URI (RFC 3966).
 */

function formatRFC3966(_ref2) {
  var number = _ref2.number,
      ext = _ref2.ext;

  if (!number) {
    return '';
  }

  if (number[0] !== '+') {
    throw new Error("\"formatRFC3966()\" expects \"number\" to be in E.164 format.");
  }

  return "tel:".concat(number).concat(ext ? ';ext=' + ext : '');
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/applyInternationalSeparatorStyle.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/applyInternationalSeparatorStyle.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return applyInternationalSeparatorStyle; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/libphonenumber-js/es6/constants.js");
 // Removes brackets and replaces dashes with spaces.
//
// E.g. "(999) 111-22-33" -> "999 111 22 33"
//
// For some reason Google's metadata contains `<intlFormat/>`s with brackets and dashes.
// Meanwhile, there's no single opinion about using punctuation in international phone numbers.
//
// For example, Google's `<intlFormat/>` for USA is `+1 213-373-4253`.
// And here's a quote from WikiPedia's "North American Numbering Plan" page:
// https://en.wikipedia.org/wiki/North_American_Numbering_Plan
//
// "The country calling code for all countries participating in the NANP is 1.
// In international format, an NANP number should be listed as +1 301 555 01 00,
// where 301 is an area code (Maryland)."
//
// I personally prefer the international format without any punctuation.
// For example, brackets are remnants of the old age, meaning that the
// phone number part in brackets (so called "area code") can be omitted
// if dialing within the same "area".
// And hyphens were clearly introduced for splitting local numbers into memorizable groups.
// For example, remembering "5553535" is difficult but "555-35-35" is much simpler.
// Imagine a man taking a bus from home to work and seeing an ad with a phone number.
// He has a couple of seconds to memorize that number until it passes by.
// If it were spaces instead of hyphens the man wouldn't necessarily get it,
// but with hyphens instead of spaces the grouping is more explicit.
// I personally think that hyphens introduce visual clutter,
// so I prefer replacing them with spaces in international numbers.
// In the modern age all output is done on displays where spaces are clearly distinguishable
// so hyphens can be safely replaced with spaces without losing any legibility.
//

function applyInternationalSeparatorStyle(formattedNumber) {
  return formattedNumber.replace(new RegExp("[".concat(_constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_PUNCTUATION */ "f"], "]+"), 'g'), ' ').trim();
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js":
/*!*************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js ***!
  \*************************************************************************/
/*! exports provided: default, checkNumberLengthForType */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkNumberLength; });
/* unused harmony export checkNumberLengthForType */
/* harmony import */ var _mergeArrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeArrays */ "./node_modules/libphonenumber-js/es6/helpers/mergeArrays.js");

function checkNumberLength(nationalNumber, metadata) {
  return checkNumberLengthForType(nationalNumber, undefined, metadata);
} // Checks whether a number is possible for the country based on its length.
// Should only be called for the "new" metadata which has "possible lengths".

function checkNumberLengthForType(nationalNumber, type, metadata) {
  var type_info = metadata.type(type); // There should always be "<possiblePengths/>" set for every type element.
  // This is declared in the XML schema.
  // For size efficiency, where a sub-description (e.g. fixed-line)
  // has the same "<possiblePengths/>" as the "general description", this is missing,
  // so we fall back to the "general description". Where no numbers of the type
  // exist at all, there is one possible length (-1) which is guaranteed
  // not to match the length of any real phone number.

  var possible_lengths = type_info && type_info.possibleLengths() || metadata.possibleLengths(); // let local_lengths    = type_info && type.possibleLengthsLocal() || metadata.possibleLengthsLocal()
  // Metadata before version `1.0.18` didn't contain `possible_lengths`.

  if (!possible_lengths) {
    return 'IS_POSSIBLE';
  }

  if (type === 'FIXED_LINE_OR_MOBILE') {
    // No such country in metadata.

    /* istanbul ignore next */
    if (!metadata.type('FIXED_LINE')) {
      // The rare case has been encountered where no fixedLine data is available
      // (true for some non-geographic entities), so we just check mobile.
      return checkNumberLengthForType(nationalNumber, 'MOBILE', metadata);
    }

    var mobile_type = metadata.type('MOBILE');

    if (mobile_type) {
      // Merge the mobile data in if there was any. "Concat" creates a new
      // array, it doesn't edit possible_lengths in place, so we don't need a copy.
      // Note that when adding the possible lengths from mobile, we have
      // to again check they aren't empty since if they are this indicates
      // they are the same as the general desc and should be obtained from there.
      possible_lengths = Object(_mergeArrays__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(possible_lengths, mobile_type.possibleLengths()); // The current list is sorted; we need to merge in the new list and
      // re-sort (duplicates are okay). Sorting isn't so expensive because
      // the lists are very small.
      // if (local_lengths) {
      // 	local_lengths = mergeArrays(local_lengths, mobile_type.possibleLengthsLocal())
      // } else {
      // 	local_lengths = mobile_type.possibleLengthsLocal()
      // }
    }
  } // If the type doesn't exist then return 'INVALID_LENGTH'.
  else if (type && !type_info) {
      return 'INVALID_LENGTH';
    }

  var actual_length = nationalNumber.length; // In `libphonenumber-js` all "local-only" formats are dropped for simplicity.
  // // This is safe because there is never an overlap beween the possible lengths
  // // and the local-only lengths; this is checked at build time.
  // if (local_lengths && local_lengths.indexOf(nationalNumber.length) >= 0)
  // {
  // 	return 'IS_POSSIBLE_LOCAL_ONLY'
  // }

  var minimum_length = possible_lengths[0];

  if (minimum_length === actual_length) {
    return 'IS_POSSIBLE';
  }

  if (minimum_length > actual_length) {
    return 'TOO_SHORT';
  }

  if (possible_lengths[possible_lengths.length - 1] < actual_length) {
    return 'TOO_LONG';
  } // We skip the first element since we've already checked it.


  return possible_lengths.indexOf(actual_length, 1) >= 0 ? 'IS_POSSIBLE' : 'INVALID_LENGTH';
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createExtensionPattern; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./node_modules/libphonenumber-js/es6/constants.js");
 // The RFC 3966 format for extensions.

var RFC3966_EXTN_PREFIX = ';ext=';
/**
 * Helper method for constructing regular expressions for parsing. Creates
 * an expression that captures up to max_length digits.
 * @return {string} RegEx pattern to capture extension digits.
 */

var getExtensionDigitsPattern = function getExtensionDigitsPattern(maxLength) {
  return "([".concat(_constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_DIGITS */ "e"], "]{1,").concat(maxLength, "})");
};
/**
 * Helper initialiser method to create the regular-expression pattern to match
 * extensions.
 * Copy-pasted from Google's `libphonenumber`:
 * https://github.com/google/libphonenumber/blob/55b2646ec9393f4d3d6661b9c82ef9e258e8b829/javascript/i18n/phonenumbers/phonenumberutil.js#L759-L766
 * @return {string} RegEx pattern to capture extensions.
 */


function createExtensionPattern(purpose) {
  // We cap the maximum length of an extension based on the ambiguity of the way
  // the extension is prefixed. As per ITU, the officially allowed length for
  // extensions is actually 40, but we don't support this since we haven't seen real
  // examples and this introduces many false interpretations as the extension labels
  // are not standardized.

  /** @type {string} */
  var extLimitAfterExplicitLabel = '20';
  /** @type {string} */

  var extLimitAfterLikelyLabel = '15';
  /** @type {string} */

  var extLimitAfterAmbiguousChar = '9';
  /** @type {string} */

  var extLimitWhenNotSure = '6';
  /** @type {string} */

  var possibleSeparatorsBetweenNumberAndExtLabel = "[ \xA0\\t,]*"; // Optional full stop (.) or colon, followed by zero or more spaces/tabs/commas.

  /** @type {string} */

  var possibleCharsAfterExtLabel = "[:\\.\uFF0E]?[ \xA0\\t,-]*";
  /** @type {string} */

  var optionalExtnSuffix = "#?"; // Here the extension is called out in more explicit way, i.e mentioning it obvious
  // patterns like "ext.".

  /** @type {string} */

  var explicitExtLabels = "(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)"; // One-character symbols that can be used to indicate an extension, and less
  // commonly used or more ambiguous extension labels.

  /** @type {string} */

  var ambiguousExtLabels = "(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)"; // When extension is not separated clearly.

  /** @type {string} */

  var ambiguousSeparator = "[- ]+"; // This is the same as possibleSeparatorsBetweenNumberAndExtLabel, but not matching
  // comma as extension label may have it.

  /** @type {string} */

  var possibleSeparatorsNumberExtLabelNoComma = "[ \xA0\\t]*"; // ",," is commonly used for auto dialling the extension when connected. First
  // comma is matched through possibleSeparatorsBetweenNumberAndExtLabel, so we do
  // not repeat it here. Semi-colon works in Iphone and Android also to pop up a
  // button with the extension number following.

  /** @type {string} */

  var autoDiallingAndExtLabelsFound = "(?:,{2}|;)";
  /** @type {string} */

  var rfcExtn = RFC3966_EXTN_PREFIX + getExtensionDigitsPattern(extLimitAfterExplicitLabel);
  /** @type {string} */

  var explicitExtn = possibleSeparatorsBetweenNumberAndExtLabel + explicitExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterExplicitLabel) + optionalExtnSuffix;
  /** @type {string} */

  var ambiguousExtn = possibleSeparatorsBetweenNumberAndExtLabel + ambiguousExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
  /** @type {string} */

  var americanStyleExtnWithSuffix = ambiguousSeparator + getExtensionDigitsPattern(extLimitWhenNotSure) + "#";
  /** @type {string} */

  var autoDiallingExtn = possibleSeparatorsNumberExtLabelNoComma + autoDiallingAndExtLabelsFound + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterLikelyLabel) + optionalExtnSuffix;
  /** @type {string} */

  var onlyCommasExtn = possibleSeparatorsNumberExtLabelNoComma + "(?:,)+" + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix; // The first regular expression covers RFC 3966 format, where the extension is added
  // using ";ext=". The second more generic where extension is mentioned with explicit
  // labels like "ext:". In both the above cases we allow more numbers in extension than
  // any other extension labels. The third one captures when single character extension
  // labels or less commonly used labels are used. In such cases we capture fewer
  // extension digits in order to reduce the chance of falsely interpreting two
  // numbers beside each other as a number + extension. The fourth one covers the
  // special case of American numbers where the extension is written with a hash
  // at the end, such as "- 503#". The fifth one is exclusively for extension
  // autodialling formats which are used when dialling and in this case we accept longer
  // extensions. The last one is more liberal on the number of commas that acts as
  // extension labels, so we have a strict cap on the number of digits in such extensions.

  return rfcExtn + "|" + explicitExtn + "|" + ambiguousExtn + "|" + americanStyleExtnWithSuffix + "|" + autoDiallingExtn + "|" + onlyCommasExtn;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/extension/extractExtension.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/extension/extractExtension.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractExtension; });
/* harmony import */ var _createExtensionPattern__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createExtensionPattern */ "./node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js");
 // Regexp of all known extension prefixes used by different regions followed by
// 1 or more valid digits, for use when parsing.

var EXTN_PATTERN = new RegExp('(?:' + Object(_createExtensionPattern__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])() + ')$', 'i'); // Strips any extension (as in, the part of the number dialled after the call is
// connected, usually indicated with extn, ext, x or similar) from the end of
// the number, and returns it.

function extractExtension(number) {
  var start = number.search(EXTN_PATTERN);

  if (start < 0) {
    return {};
  } // If we find a potential extension, and the number preceding this is a viable
  // number, we assume it is an extension.


  var numberWithoutExtension = number.slice(0, start);
  var matches = number.match(EXTN_PATTERN);
  var i = 1;

  while (i < matches.length) {
    if (matches[i]) {
      return {
        number: numberWithoutExtension,
        ext: matches[i]
      };
    }

    i++;
  }
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCode.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCode.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractCountryCallingCode; });
/* harmony import */ var _stripIddPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stripIddPrefix */ "./node_modules/libphonenumber-js/es6/helpers/stripIddPrefix.js");
/* harmony import */ var _extractCountryCallingCodeFromInternationalNumberWithoutPlusSign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extractCountryCallingCodeFromInternationalNumberWithoutPlusSign */ "./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./node_modules/libphonenumber-js/es6/constants.js");




/**
 * Converts a phone number digits (possibly with a `+`)
 * into a calling code and the rest phone number digits.
 * The "rest phone number digits" could include
 * a national prefix, carrier code, and national
 * (significant) number.
 * @param  {string} number — Phone number digits (possibly with a `+`).
 * @param  {string} [country] — Default country.
 * @param  {string} [callingCode] — Default calling code (some phone numbering plans are non-geographic).
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`
 * @example
 * // Returns `{ countryCallingCode: "1", number: "2133734253" }`.
 * extractCountryCallingCode('2133734253', 'US', null, metadata)
 * extractCountryCallingCode('2133734253', null, '1', metadata)
 * extractCountryCallingCode('+12133734253', null, null, metadata)
 * extractCountryCallingCode('+12133734253', 'RU', null, metadata)
 */

function extractCountryCallingCode(number, country, callingCode, metadata) {
  if (!number) {
    return {};
  } // If this is not an international phone number,
  // then either extract an "IDD" prefix, or extract a
  // country calling code from a number by autocorrecting it
  // by prepending a leading `+` in cases when it starts
  // with the country calling code.
  // https://wikitravel.org/en/International_dialling_prefix
  // https://github.com/catamphetamine/libphonenumber-js/issues/376


  if (number[0] !== '+') {
    // Convert an "out-of-country" dialing phone number
    // to a proper international phone number.
    var numberWithoutIDD = Object(_stripIddPrefix__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(number, country, callingCode, metadata); // If an IDD prefix was stripped then
    // convert the number to international one
    // for subsequent parsing.

    if (numberWithoutIDD && numberWithoutIDD !== number) {
      number = '+' + numberWithoutIDD;
    } else {
      // Check to see if the number starts with the country calling code
      // for the default country. If so, we remove the country calling code,
      // and do some checks on the validity of the number before and after.
      // https://github.com/catamphetamine/libphonenumber-js/issues/376
      if (country || callingCode) {
        var _extractCountryCallin = Object(_extractCountryCallingCodeFromInternationalNumberWithoutPlusSign__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(number, country, callingCode, metadata),
            countryCallingCode = _extractCountryCallin.countryCallingCode,
            shorterNumber = _extractCountryCallin.number;

        if (countryCallingCode) {
          return {
            countryCallingCode: countryCallingCode,
            number: shorterNumber
          };
        }
      }

      return {
        number: number
      };
    }
  } // Fast abortion: country codes do not begin with a '0'


  if (number[1] === '0') {
    return {};
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](metadata); // The thing with country phone codes
  // is that they are orthogonal to each other
  // i.e. there's no such country phone code A
  // for which country phone code B exists
  // where B starts with A.
  // Therefore, while scanning digits,
  // if a valid country code is found,
  // that means that it is the country code.
  //

  var i = 2;

  while (i - 1 <= _constants__WEBPACK_IMPORTED_MODULE_3__[/* MAX_LENGTH_COUNTRY_CODE */ "a"] && i <= number.length) {
    var _countryCallingCode = number.slice(1, i);

    if (metadata.hasCallingCode(_countryCallingCode)) {
      metadata.selectNumberingPlan(_countryCallingCode);
      return {
        countryCallingCode: _countryCallingCode,
        number: number.slice(i)
      };
    }

    i++;
  }

  return {};
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractCountryCallingCodeFromInternationalNumberWithoutPlusSign; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _matchesEntirely__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matchesEntirely */ "./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js");
/* harmony import */ var _extractNationalNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractNationalNumber */ "./node_modules/libphonenumber-js/es6/helpers/extractNationalNumber.js");
/* harmony import */ var _checkNumberLength__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkNumberLength */ "./node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js");
/* harmony import */ var _getCountryCallingCode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../getCountryCallingCode */ "./node_modules/libphonenumber-js/es6/getCountryCallingCode.js");





/**
 * Sometimes some people incorrectly input international phone numbers
 * without the leading `+`. This function corrects such input.
 * @param  {string} number — Phone number digits.
 * @param  {string?} country
 * @param  {string?} callingCode
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`.
 */

function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata) {
  var countryCallingCode = country ? Object(_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(country, metadata) : callingCode;

  if (number.indexOf(countryCallingCode) === 0) {
    metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata);
    metadata.selectNumberingPlan(country, callingCode);
    var possibleShorterNumber = number.slice(countryCallingCode.length);

    var _extractNationalNumbe = Object(_extractNationalNumber__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(possibleShorterNumber, metadata),
        possibleShorterNationalNumber = _extractNationalNumbe.nationalNumber;

    var _extractNationalNumbe2 = Object(_extractNationalNumber__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(number, metadata),
        nationalNumber = _extractNationalNumbe2.nationalNumber; // If the number was not valid before but is valid now,
    // or if it was too long before, we consider the number
    // with the country calling code stripped to be a better result
    // and keep that instead.
    // For example, in Germany (+49), `49` is a valid area code,
    // so if a number starts with `49`, it could be both a valid
    // national German number or an international number without
    // a leading `+`.


    if (!Object(_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(nationalNumber, metadata.nationalNumberPattern()) && Object(_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(possibleShorterNationalNumber, metadata.nationalNumberPattern()) || Object(_checkNumberLength__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(nationalNumber, metadata) === 'TOO_LONG') {
      return {
        countryCallingCode: countryCallingCode,
        number: possibleShorterNumber
      };
    }
  }

  return {
    number: number
  };
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/extractNationalNumber.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/extractNationalNumber.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractNationalNumber; });
/* harmony import */ var _extractNationalNumberFromPossiblyIncompleteNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extractNationalNumberFromPossiblyIncompleteNumber */ "./node_modules/libphonenumber-js/es6/helpers/extractNationalNumberFromPossiblyIncompleteNumber.js");
/* harmony import */ var _matchesEntirely__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matchesEntirely */ "./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js");
/* harmony import */ var _checkNumberLength__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkNumberLength */ "./node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js");



/**
 * Strips national prefix and carrier code from a complete phone number.
 * The difference from the non-"FromCompleteNumber" function is that
 * it won't extract national prefix if the resultant number is too short
 * to be a complete number for the selected phone numbering plan.
 * @param  {string} number — Complete phone number digits.
 * @param  {Metadata} metadata — Metadata with a phone numbering plan selected.
 * @return {object} `{ nationalNumber: string, carrierCode: string? }`.
 */

function extractNationalNumber(number, metadata) {
  // Parsing national prefixes and carrier codes
  // is only required for local phone numbers
  // but some people don't understand that
  // and sometimes write international phone numbers
  // with national prefixes (or maybe even carrier codes).
  // http://ucken.blogspot.ru/2016/03/trunk-prefixes-in-skype4b.html
  // Google's original library forgives such mistakes
  // and so does this library, because it has been requested:
  // https://github.com/catamphetamine/libphonenumber-js/issues/127
  var _extractNationalNumbe = Object(_extractNationalNumberFromPossiblyIncompleteNumber__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(number, metadata),
      nationalNumber = _extractNationalNumbe.nationalNumber,
      carrierCode = _extractNationalNumbe.carrierCode;

  if (!shouldExtractNationalPrefix(number, nationalNumber, metadata)) {
    // Don't strip the national prefix.
    return {
      nationalNumber: number
    };
  } // If a national prefix has been extracted, check to see
  // if the resultant number isn't too short.
  // Same code in Google's `libphonenumber`:
  // https://github.com/google/libphonenumber/blob/e326fa1fc4283bb05eb35cb3c15c18f98a31af33/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L3291-L3302
  // For some reason, they do this check right after the `national_number_pattern` check
  // this library does in `shouldExtractNationalPrefix()` function.
  // Why is there a second "resultant" number validity check?
  // They don't provide an explanation.
  // This library just copies the behavior.


  if (number.length !== nationalNumber.length + (carrierCode ? carrierCode.length : 0)) {
    // If not using legacy generated metadata (before version `1.0.18`)
    // then it has "possible lengths", so use those to validate the number length.
    if (metadata.possibleLengths()) {
      // "We require that the NSN remaining after stripping the national prefix and
      // carrier code be long enough to be a possible length for the region.
      // Otherwise, we don't do the stripping, since the original number could be
      // a valid short number."
      // https://github.com/google/libphonenumber/blob/876268eb1ad6cdc1b7b5bef17fc5e43052702d57/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L3236-L3250
      switch (Object(_checkNumberLength__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(nationalNumber, metadata)) {
        case 'TOO_SHORT':
        case 'INVALID_LENGTH':
          // case 'IS_POSSIBLE_LOCAL_ONLY':
          // Don't strip the national prefix.
          return {
            nationalNumber: number
          };
      }
    }
  }

  return {
    nationalNumber: nationalNumber,
    carrierCode: carrierCode
  };
} // In some countries, the same digit could be a national prefix
// or a leading digit of a valid phone number.
// For example, in Russia, national prefix is `8`,
// and also `800 555 35 35` is a valid number
// in which `8` is not a national prefix, but the first digit
// of a national (significant) number.
// Same's with Belarus:
// `82004910060` is a valid national (significant) number,
// but `2004910060` is not.
// To support such cases (to prevent the code from always stripping
// national prefix), a condition is imposed: a national prefix
// is not extracted when the original number is "viable" and the
// resultant number is not, a "viable" national number being the one
// that matches `national_number_pattern`.

function shouldExtractNationalPrefix(number, nationalSignificantNumber, metadata) {
  // The equivalent in Google's code is:
  // https://github.com/google/libphonenumber/blob/e326fa1fc4283bb05eb35cb3c15c18f98a31af33/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L2969-L3004
  if (Object(_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(number, metadata.nationalNumberPattern()) && !Object(_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(nationalSignificantNumber, metadata.nationalNumberPattern())) {
    return false;
  } // Just "possible" number check would be more relaxed, so it's not used.
  // if (isPossibleNumber(number, metadata) &&
  // 	!isPossibleNumber(numberWithNationalPrefixExtracted, metadata)) {
  // 	return false
  // }


  return true;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/extractNationalNumberFromPossiblyIncompleteNumber.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/extractNationalNumberFromPossiblyIncompleteNumber.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractNationalNumberFromPossiblyIncompleteNumber; });
/**
 * Strips any national prefix (such as 0, 1) present in a
 * (possibly incomplete) number provided.
 * "Carrier codes" are only used  in Colombia and Brazil,
 * and only when dialing within those countries from a mobile phone to a fixed line number.
 * Sometimes it won't actually strip national prefix
 * and will instead prepend some digits to the `number`:
 * for example, when number `2345678` is passed with `VI` country selected,
 * it will return `{ number: "3402345678" }`, because `340` area code is prepended.
 * @param {string} number — National number digits.
 * @param {object} metadata — Metadata with country selected.
 * @return {object} `{ nationalNumber: string, nationalPrefix: string? carrierCode: string? }`.
 */
function extractNationalNumberFromPossiblyIncompleteNumber(number, metadata) {
  if (number && metadata.numberingPlan.nationalPrefixForParsing()) {
    // See METADATA.md for the description of
    // `national_prefix_for_parsing` and `national_prefix_transform_rule`.
    // Attempt to parse the first digits as a national prefix.
    var prefixPattern = new RegExp('^(?:' + metadata.numberingPlan.nationalPrefixForParsing() + ')');
    var prefixMatch = prefixPattern.exec(number);

    if (prefixMatch) {
      var nationalNumber;
      var carrierCode; // https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/METADATA.md#national_prefix_for_parsing--national_prefix_transform_rule
      // If a `national_prefix_for_parsing` has any "capturing groups"
      // then it means that the national (significant) number is equal to
      // those "capturing groups" transformed via `national_prefix_transform_rule`,
      // and nothing could be said about the actual national prefix:
      // what is it and was it even there.
      // If a `national_prefix_for_parsing` doesn't have any "capturing groups",
      // then everything it matches is a national prefix.
      // To determine whether `national_prefix_for_parsing` matched any
      // "capturing groups", the value of the result of calling `.exec()`
      // is looked at, and if it has non-undefined values where there're
      // "capturing groups" in the regular expression, then it means
      // that "capturing groups" have been matched.
      // It's not possible to tell whether there'll be any "capturing gropus"
      // before the matching process, because a `national_prefix_for_parsing`
      // could exhibit both behaviors.

      var capturedGroupsCount = prefixMatch.length - 1;
      var hasCapturedGroups = capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount];

      if (metadata.nationalPrefixTransformRule() && hasCapturedGroups) {
        nationalNumber = number.replace(prefixPattern, metadata.nationalPrefixTransformRule()); // If there's more than one captured group,
        // then carrier code is the second one.

        if (capturedGroupsCount > 1) {
          carrierCode = prefixMatch[1];
        }
      } // If there're no "capturing groups",
      // or if there're "capturing groups" but no
      // `national_prefix_transform_rule`,
      // then just strip the national prefix from the number,
      // and possibly a carrier code.
      // Seems like there could be more.
      else {
          // `prefixBeforeNationalNumber` is the whole substring matched by
          // the `national_prefix_for_parsing` regular expression.
          // There seem to be no guarantees that it's just a national prefix.
          // For example, if there's a carrier code, it's gonna be a
          // part of `prefixBeforeNationalNumber` too.
          var prefixBeforeNationalNumber = prefixMatch[0];
          nationalNumber = number.slice(prefixBeforeNationalNumber.length); // If there's at least one captured group,
          // then carrier code is the first one.

          if (hasCapturedGroups) {
            carrierCode = prefixMatch[1];
          }
        } // Tries to guess whether a national prefix was present in the input.
      // This is not something copy-pasted from Google's library:
      // they don't seem to have an equivalent for that.
      // So this isn't an "officially approved" way of doing something like that.
      // But since there seems no other existing method, this library uses it.


      var nationalPrefix;

      if (hasCapturedGroups) {
        var possiblePositionOfTheFirstCapturedGroup = number.indexOf(prefixMatch[1]);
        var possibleNationalPrefix = number.slice(0, possiblePositionOfTheFirstCapturedGroup); // Example: an Argentinian (AR) phone number `0111523456789`.
        // `prefixMatch[0]` is `01115`, and `$1` is `11`,
        // and the rest of the phone number is `23456789`.
        // The national number is transformed via `9$1` to `91123456789`.
        // National prefix `0` is detected being present at the start.
        // if (possibleNationalPrefix.indexOf(metadata.numberingPlan.nationalPrefix()) === 0) {

        if (possibleNationalPrefix === metadata.numberingPlan.nationalPrefix()) {
          nationalPrefix = metadata.numberingPlan.nationalPrefix();
        }
      } else {
        nationalPrefix = prefixMatch[0];
      }

      return {
        nationalNumber: nationalNumber,
        nationalPrefix: nationalPrefix,
        carrierCode: carrierCode
      };
    }
  }

  return {
    nationalNumber: number
  };
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js ***!
  \***************************************************************************************/
/*! exports provided: FIRST_GROUP_PATTERN, default */
/*! exports used: FIRST_GROUP_PATTERN, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIRST_GROUP_PATTERN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formatNationalNumberUsingFormat; });
/* harmony import */ var _applyInternationalSeparatorStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyInternationalSeparatorStyle */ "./node_modules/libphonenumber-js/es6/helpers/applyInternationalSeparatorStyle.js");
 // This was originally set to $1 but there are some countries for which the
// first group is not used in the national pattern (e.g. Argentina) so the $1
// group does not match correctly. Therefore, we use `\d`, so that the first
// group actually used in the pattern will be matched.

var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format, _ref) {
  var useInternationalFormat = _ref.useInternationalFormat,
      withNationalPrefix = _ref.withNationalPrefix,
      carrierCode = _ref.carrierCode,
      metadata = _ref.metadata;
  var formattedNumber = number.replace(new RegExp(format.pattern()), useInternationalFormat ? format.internationalFormat() : // This library doesn't use `domestic_carrier_code_formatting_rule`,
  // because that one is only used when formatting phone numbers
  // for dialing from a mobile phone, and this is not a dialing library.
  // carrierCode && format.domesticCarrierCodeFormattingRule()
  // 	// First, replace the $CC in the formatting rule with the desired carrier code.
  // 	// Then, replace the $FG in the formatting rule with the first group
  // 	// and the carrier code combined in the appropriate way.
  // 	? format.format().replace(FIRST_GROUP_PATTERN, format.domesticCarrierCodeFormattingRule().replace('$CC', carrierCode))
  // 	: (
  // 		withNationalPrefix && format.nationalPrefixFormattingRule()
  // 			? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
  // 			: format.format()
  // 	)
  withNationalPrefix && format.nationalPrefixFormattingRule() ? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule()) : format.format());

  if (useInternationalFormat) {
    return Object(_applyInternationalSeparatorStyle__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(formattedNumber);
  }

  return formattedNumber;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/getCountryByCallingCode.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/getCountryByCallingCode.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCountryByCallingCode; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _getNumberType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNumberType */ "./node_modules/libphonenumber-js/es6/helpers/getNumberType.js");


var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;
function getCountryByCallingCode(callingCode, nationalPhoneNumber, metadata) {
  /* istanbul ignore if */
  if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
    if (metadata.isNonGeographicCallingCode(callingCode)) {
      return '001';
    }
  } // Is always non-empty, because `callingCode` is always valid


  var possibleCountries = metadata.getCountryCodesForCallingCode(callingCode);

  if (!possibleCountries) {
    return;
  } // If there's just one country corresponding to the country code,
  // then just return it, without further phone number digits validation.


  if (possibleCountries.length === 1) {
    return possibleCountries[0];
  }

  return selectCountryFromList(possibleCountries, nationalPhoneNumber, metadata.metadata);
}

function selectCountryFromList(possibleCountries, nationalPhoneNumber, metadata) {
  // Re-create `metadata` because it will be selecting a `country`.
  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata);

  for (var _iterator = possibleCountries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var country = _ref;
    metadata.country(country); // Leading digits check would be the simplest one

    if (metadata.leadingDigits()) {
      if (nationalPhoneNumber && nationalPhoneNumber.search(metadata.leadingDigits()) === 0) {
        return country;
      }
    } // Else perform full validation with all of those
    // fixed-line/mobile/etc regular expressions.
    else if (Object(_getNumberType__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
        phone: nationalPhoneNumber,
        country: country
      }, undefined, metadata.metadata)) {
        return country;
      }
  }
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/getIddPrefix.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/getIddPrefix.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getIddPrefix; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");

/**
 * Pattern that makes it easy to distinguish whether a region has a single
 * international dialing prefix or not. If a region has a single international
 * prefix (e.g. 011 in USA), it will be represented as a string that contains
 * a sequence of ASCII digits, and possibly a tilde, which signals waiting for
 * the tone. If there are multiple available international prefixes in a
 * region, they will be represented as a regex string that always contains one
 * or more characters that are not ASCII digits or a tilde.
 */

var SINGLE_IDD_PREFIX_REG_EXP = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/; // For regions that have multiple IDD prefixes
// a preferred IDD prefix is returned.

function getIddPrefix(country, callingCode, metadata) {
  var countryMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata);
  countryMetadata.selectNumberingPlan(country, callingCode);

  if (SINGLE_IDD_PREFIX_REG_EXP.test(countryMetadata.IDDPrefix())) {
    return countryMetadata.IDDPrefix();
  }

  return countryMetadata.defaultIDDPrefix();
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/getNumberType.js":
/*!*********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/getNumberType.js ***!
  \*********************************************************************/
/*! exports provided: default, isNumberTypeEqualTo */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNumberType; });
/* unused harmony export isNumberTypeEqualTo */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _matchesEntirely__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matchesEntirely */ "./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js");


var NON_FIXED_LINE_PHONE_TYPES = ['MOBILE', 'PREMIUM_RATE', 'TOLL_FREE', 'SHARED_COST', 'VOIP', 'PERSONAL_NUMBER', 'PAGER', 'UAN', 'VOICEMAIL']; // Finds out national phone number type (fixed line, mobile, etc)

function getNumberType(input, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {}; // When `parse()` returned `{}`
  // meaning that the phone number is not a valid one.

  if (!input.country) {
    return;
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata);
  metadata.selectNumberingPlan(input.country, input.countryCallingCode);
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // The following is copy-pasted from the original function:
  // https://github.com/googlei18n/libphonenumber/blob/3ea547d4fbaa2d0b67588904dfa5d3f2557c27ff/javascript/i18n/phonenumbers/phonenumberutil.js#L2835
  // Is this national number even valid for this country

  if (!Object(_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(nationalNumber, metadata.nationalNumberPattern())) {
    return;
  } // Is it fixed line number


  if (isNumberTypeEqualTo(nationalNumber, 'FIXED_LINE', metadata)) {
    // Because duplicate regular expressions are removed
    // to reduce metadata size, if "mobile" pattern is ""
    // then it means it was removed due to being a duplicate of the fixed-line pattern.
    //
    if (metadata.type('MOBILE') && metadata.type('MOBILE').pattern() === '') {
      return 'FIXED_LINE_OR_MOBILE';
    } // v1 metadata.
    // Legacy.
    // Deprecated.


    if (!metadata.type('MOBILE')) {
      return 'FIXED_LINE_OR_MOBILE';
    } // Check if the number happens to qualify as both fixed line and mobile.
    // (no such country in the minimal metadata set)

    /* istanbul ignore if */


    if (isNumberTypeEqualTo(nationalNumber, 'MOBILE', metadata)) {
      return 'FIXED_LINE_OR_MOBILE';
    }

    return 'FIXED_LINE';
  }

  for (var _i = 0, _NON_FIXED_LINE_PHONE = NON_FIXED_LINE_PHONE_TYPES; _i < _NON_FIXED_LINE_PHONE.length; _i++) {
    var type = _NON_FIXED_LINE_PHONE[_i];

    if (isNumberTypeEqualTo(nationalNumber, type, metadata)) {
      return type;
    }
  }
}
function isNumberTypeEqualTo(nationalNumber, type, metadata) {
  type = metadata.type(type);

  if (!type || !type.pattern()) {
    return false;
  } // Check if any possible number lengths are present;
  // if so, we use them to avoid checking
  // the validation pattern if they don't match.
  // If they are absent, this means they match
  // the general description, which we have
  // already checked before a specific number type.


  if (type.possibleLengths() && type.possibleLengths().indexOf(nationalNumber.length) < 0) {
    return false;
  }

  return Object(_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(nationalNumber, type.pattern());
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js ***!
  \***************************************************************************/
/*! exports provided: VALID_PHONE_NUMBER, VALID_PHONE_NUMBER_WITH_EXTENSION, default */
/*! exports used: VALID_PHONE_NUMBER_WITH_EXTENSION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VALID_PHONE_NUMBER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VALID_PHONE_NUMBER_WITH_EXTENSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isViablePhoneNumber; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _extension_createExtensionPattern__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extension/createExtensionPattern */ "./node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js");

 //  Regular expression of viable phone numbers. This is location independent.
//  Checks we have at least three leading digits, and only valid punctuation,
//  alpha characters and digits in the phone number. Does not include extension
//  data. The symbol 'x' is allowed here as valid punctuation since it is often
//  used as a placeholder for carrier codes, for example in Brazilian phone
//  numbers. We also allow multiple '+' characters at the start.
//
//  Corresponds to the following:
//  [digits]{minLengthNsn}|
//  plus_sign*
//  (([punctuation]|[star])*[digits]){3,}([punctuation]|[star]|[digits]|[alpha])*
//
//  The first reg-ex is to allow short numbers (two digits long) to be parsed if
//  they are entered as "15" etc, but only if there is no punctuation in them.
//  The second expression restricts the number of digits to three or more, but
//  then allows them to be in international form, and to have alpha-characters
//  and punctuation. We split up the two reg-exes here and combine them when
//  creating the reg-ex VALID_PHONE_NUMBER_PATTERN itself so we can prefix it
//  with ^ and append $ to each branch.
//
//  "Note VALID_PUNCTUATION starts with a -,
//   so must be the first in the range" (c) Google devs.
//  (wtf did they mean by saying that; probably nothing)
//

var MIN_LENGTH_PHONE_NUMBER_PATTERN = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_DIGITS */ "e"] + ']{' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* MIN_LENGTH_FOR_NSN */ "c"] + '}'; //
// And this is the second reg-exp:
// (see MIN_LENGTH_PHONE_NUMBER_PATTERN for a full description of this reg-exp)
//

var VALID_PHONE_NUMBER = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* PLUS_CHARS */ "d"] + ']{0,1}' + '(?:' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_PUNCTUATION */ "f"] + ']*' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_DIGITS */ "e"] + ']' + '){3,}' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_PUNCTUATION */ "f"] + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_DIGITS */ "e"] + ']*';
var VALID_PHONE_NUMBER_WITH_EXTENSION = VALID_PHONE_NUMBER + // Phone number extensions
'(?:' + Object(_extension_createExtensionPattern__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])() + ')?'; // The combined regular expression for valid phone numbers:
//

var VALID_PHONE_NUMBER_PATTERN = new RegExp( // Either a short two-digit-only phone number
'^' + MIN_LENGTH_PHONE_NUMBER_PATTERN + '$' + '|' + // Or a longer fully parsed phone number (min 3 characters)
'^' + VALID_PHONE_NUMBER_WITH_EXTENSION + '$', 'i'); // Checks to see if the string of characters could possibly be a phone number at
// all. At the moment, checks to see that the string begins with at least 2
// digits, ignoring any punctuation commonly found in phone numbers. This method
// does not require the number to be normalized in advance - but does assume
// that leading non-number symbols have been removed, such as by the method
// `extract_possible_number`.
//

function isViablePhoneNumber(number) {
  return number.length >= _constants__WEBPACK_IMPORTED_MODULE_0__[/* MIN_LENGTH_FOR_NSN */ "c"] && VALID_PHONE_NUMBER_PATTERN.test(number);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js":
/*!***********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js ***!
  \***********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return matchesEntirely; });
/**
 * Checks whether the entire input sequence can be matched
 * against the regular expression.
 * @return {boolean}
 */
function matchesEntirely(text, regular_expression) {
  // If assigning the `''` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  text = text || '';
  return new RegExp('^(?:' + regular_expression + ')$').test(text);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/mergeArrays.js":
/*!*******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/mergeArrays.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeArrays; });
/**
 * Merges two arrays.
 * @param  {*} a
 * @param  {*} b
 * @return {*}
 */
function mergeArrays(a, b) {
  var merged = a.slice();

  for (var _iterator = b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var element = _ref;

    if (a.indexOf(element) < 0) {
      merged.push(element);
    }
  }

  return merged.sort(function (a, b) {
    return a - b;
  }); // ES6 version, requires Set polyfill.
  // let merged = new Set(a)
  // for (const element of b) {
  // 	merged.add(i)
  // }
  // return Array.from(merged).sort((a, b) => a - b)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js":
/*!*******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/parseDigits.js ***!
  \*******************************************************************/
/*! exports provided: DIGITS, parseDigit, default */
/*! exports used: default, parseDigit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DIGITS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parseDigit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseDigits; });
// These mappings map a character (key) to a specific digit that should
// replace it for normalization purposes. Non-European digits that
// may be used in phone numbers are mapped to a European equivalent.
//
// E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
//
var DIGITS = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  "\uFF10": '0',
  // Fullwidth digit 0
  "\uFF11": '1',
  // Fullwidth digit 1
  "\uFF12": '2',
  // Fullwidth digit 2
  "\uFF13": '3',
  // Fullwidth digit 3
  "\uFF14": '4',
  // Fullwidth digit 4
  "\uFF15": '5',
  // Fullwidth digit 5
  "\uFF16": '6',
  // Fullwidth digit 6
  "\uFF17": '7',
  // Fullwidth digit 7
  "\uFF18": '8',
  // Fullwidth digit 8
  "\uFF19": '9',
  // Fullwidth digit 9
  "\u0660": '0',
  // Arabic-indic digit 0
  "\u0661": '1',
  // Arabic-indic digit 1
  "\u0662": '2',
  // Arabic-indic digit 2
  "\u0663": '3',
  // Arabic-indic digit 3
  "\u0664": '4',
  // Arabic-indic digit 4
  "\u0665": '5',
  // Arabic-indic digit 5
  "\u0666": '6',
  // Arabic-indic digit 6
  "\u0667": '7',
  // Arabic-indic digit 7
  "\u0668": '8',
  // Arabic-indic digit 8
  "\u0669": '9',
  // Arabic-indic digit 9
  "\u06F0": '0',
  // Eastern-Arabic digit 0
  "\u06F1": '1',
  // Eastern-Arabic digit 1
  "\u06F2": '2',
  // Eastern-Arabic digit 2
  "\u06F3": '3',
  // Eastern-Arabic digit 3
  "\u06F4": '4',
  // Eastern-Arabic digit 4
  "\u06F5": '5',
  // Eastern-Arabic digit 5
  "\u06F6": '6',
  // Eastern-Arabic digit 6
  "\u06F7": '7',
  // Eastern-Arabic digit 7
  "\u06F8": '8',
  // Eastern-Arabic digit 8
  "\u06F9": '9' // Eastern-Arabic digit 9

};
function parseDigit(character) {
  return DIGITS[character];
}
/**
 * Parses phone number digits from a string.
 * Drops all punctuation leaving only digits.
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * parseDigits('8 (800) 555')
 * // Outputs '8800555'.
 * ```
 */

function parseDigits(string) {
  var result = ''; // Using `.split('')` here instead of normal `for ... of`
  // because the importing application doesn't neccessarily include an ES6 polyfill.
  // The `.split('')` approach discards "exotic" UTF-8 characters
  // (the ones consisting of four bytes) but digits
  // (including non-European ones) don't fall into that range
  // so such "exotic" characters would be discarded anyway.

  for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var character = _ref;
    var digit = parseDigit(character);

    if (digit) {
      result += digit;
    }
  }

  return result;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/helpers/stripIddPrefix.js":
/*!**********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/helpers/stripIddPrefix.js ***!
  \**********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stripIddPrefix; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/libphonenumber-js/es6/constants.js");


var CAPTURING_DIGIT_PATTERN = new RegExp('([' + _constants__WEBPACK_IMPORTED_MODULE_1__[/* VALID_DIGITS */ "e"] + '])');
function stripIddPrefix(number, country, callingCode, metadata) {
  if (!country) {
    return;
  } // Check if the number is IDD-prefixed.


  var countryMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata);
  countryMetadata.selectNumberingPlan(country, callingCode);
  var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());

  if (number.search(IDDPrefixPattern) !== 0) {
    return;
  } // Strip IDD prefix.


  number = number.slice(number.match(IDDPrefixPattern)[0].length); // If there're any digits after an IDD prefix,
  // then those digits are a country calling code.
  // Since no country code starts with a `0`,
  // the code below validates that the next digit (if present) is not `0`.

  var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);

  if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
    if (matchedGroups[1] === '0') {
      return;
    }
  }

  return number;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isPossibleNumber.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isPossibleNumber.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPossibleNumber; });
/* harmony import */ var _getNumberType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNumberType */ "./node_modules/libphonenumber-js/es6/getNumberType.js");
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isPossibleNumber_ */ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js");


/**
 * Checks if a given phone number is possible.
 * Which means it only checks phone number length
 * and doesn't test any regular expressions.
 *
 * Examples:
 *
 * ```js
 * isPossibleNumber('+78005553535', metadata)
 * isPossibleNumber('8005553535', 'RU', metadata)
 * isPossibleNumber('88005553535', 'RU', metadata)
 * isPossibleNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */

function isPossibleNumber() {
  var _normalizeArguments = Object(_getNumberType__WEBPACK_IMPORTED_MODULE_0__[/* normalizeArguments */ "b"])(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(input, options, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isPossibleNumber_.js ***!
  \*****************************************************************/
/*! exports provided: default, isPossibleNumber */
/*! exports used: default, isPossibleNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPossiblePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isPossibleNumber; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _helpers_checkNumberLength__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/checkNumberLength */ "./node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js");


function isPossiblePhoneNumber(input, options, metadata) {
  /* istanbul ignore if */
  if (options === undefined) {
    options = {};
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata);

  if (options.v2) {
    if (!input.countryCallingCode) {
      throw new Error('Invalid phone number object passed');
    }

    metadata.selectNumberingPlan(input.countryCallingCode);
  } else {
    if (!input.phone) {
      return false;
    }

    if (input.country) {
      if (!metadata.hasCountry(input.country)) {
        throw new Error("Unknown country: ".concat(input.country));
      }

      metadata.country(input.country);
    } else {
      if (!input.countryCallingCode) {
        throw new Error('Invalid phone number object passed');
      }

      metadata.selectNumberingPlan(input.countryCallingCode);
    }
  }

  if (metadata.possibleLengths()) {
    return isPossibleNumber(input.phone || input.nationalNumber, metadata);
  } else {
    // There was a bug between `1.7.35` and `1.7.37` where "possible_lengths"
    // were missing for "non-geographical" numbering plans.
    // Just assume the number is possible in such cases:
    // it's unlikely that anyone generated their custom metadata
    // in that short period of time (one day).
    // This code can be removed in some future major version update.
    if (input.countryCallingCode && metadata.isNonGeographicCallingCode(input.countryCallingCode)) {
      // "Non-geographic entities" did't have `possibleLengths`
      // due to a bug in metadata generation process.
      return true;
    } else {
      throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
    }
  }
}
function isPossibleNumber(nationalNumber, metadata) {
  //, isInternational) {
  switch (Object(_helpers_checkNumberLength__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(nationalNumber, metadata)) {
    case 'IS_POSSIBLE':
      return true;
    // This library ignores "local-only" phone numbers (for simplicity).
    // See the readme for more info on what are "local-only" phone numbers.
    // case 'IS_POSSIBLE_LOCAL_ONLY':
    // 	return !isInternational

    default:
      return false;
  }
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isPossiblePhoneNumber.js":
/*!*********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isPossiblePhoneNumber.js ***!
  \*********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPossiblePhoneNumber; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony import */ var _parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumberFromString_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function isPossiblePhoneNumber() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  options = _objectSpread({}, options, {
    extract: false
  });
  var phoneNumber = Object(_parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(text, options, metadata);
  return phoneNumber && phoneNumber.isPossible() || false;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion.js":
/*!**********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isValidNumberForRegion.js ***!
  \**********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isValidNumberForRegion; });
/* harmony import */ var _helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
/* harmony import */ var _isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isValidNumberForRegion_ */ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js");



function isValidNumberForRegion(number, country, metadata) {
  if (typeof number !== 'string') {
    throw new TypeError('number must be a string');
  }

  if (typeof country !== 'string') {
    throw new TypeError('country must be a string');
  } // `parse` extracts phone numbers from raw text,
  // therefore it will cut off all "garbage" characters,
  // while this `validate` function needs to verify
  // that the phone number contains no "garbage"
  // therefore the explicit `isViablePhoneNumber` check.


  var input;

  if (Object(_helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"])(number)) {
    input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(number, {
      defaultCountry: country
    }, metadata);
  } else {
    input = {};
  }

  return Object(_isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(input, country, undefined, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js":
/*!***********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js ***!
  \***********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isValidNumberForRegion; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");

/**
 * Checks if a given phone number is valid within a given region.
 * Is just an alias for `phoneNumber.isValid() && phoneNumber.country === country`.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 */

function isValidNumberForRegion(input, country, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  return input.country === country && Object(_validate___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(input, options, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isValidPhoneNumber.js":
/*!******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isValidPhoneNumber.js ***!
  \******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isValidPhoneNumber; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony import */ var _parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumberFromString_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function isValidPhoneNumber() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  options = _objectSpread({}, options, {
    extract: false
  });
  var phoneNumber = Object(_parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(text, options, metadata);
  return phoneNumber && phoneNumber.isValid() || false;
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/metadata.js ***!
  \********************************************************/
/*! exports provided: default, validateMetadata, getExtPrefix, getCountryCallingCode, isSupportedCountry */
/*! exports used: default, getCountryCallingCode, getExtPrefix, isSupportedCountry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Metadata; });
/* unused harmony export validateMetadata */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getExtPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCountryCallingCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isSupportedCountry; });
/* harmony import */ var _tools_semver_compare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/semver-compare */ "./node_modules/libphonenumber-js/es6/tools/semver-compare.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Added "possibleLengths" and renamed
// "country_phone_code_to_countries" to "country_calling_codes".

var V2 = '1.0.18'; // Added "idd_prefix" and "default_idd_prefix".

var V3 = '1.2.0'; // Moved `001` country code to "nonGeographic" section of metadata.

var V4 = '1.7.35';
var DEFAULT_EXT_PREFIX = ' ext. ';
var CALLING_CODE_REG_EXP = /^\d+$/;
/**
 * See: https://gitlab.com/catamphetamine/libphonenumber-js/blob/master/METADATA.md
 */

var Metadata =
/*#__PURE__*/
function () {
  function Metadata(metadata) {
    _classCallCheck(this, Metadata);

    validateMetadata(metadata);
    this.metadata = metadata;
    setVersion.call(this, metadata);
  }

  _createClass(Metadata, [{
    key: "getCountries",
    value: function getCountries() {
      return Object.keys(this.metadata.countries).filter(function (_) {
        return _ !== '001';
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function getCountryMetadata(countryCode) {
      return this.metadata.countries[countryCode];
    }
  }, {
    key: "nonGeographic",
    value: function nonGeographic() {
      if (this.v1 || this.v2 || this.v3) return; // `nonGeographical` was a typo.
      // It's present in metadata generated from `1.7.35` to `1.7.37`.

      return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function hasCountry(country) {
      return this.getCountryMetadata(country) !== undefined;
    }
  }, {
    key: "hasCallingCode",
    value: function hasCallingCode(callingCode) {
      if (this.getCountryCodesForCallingCode(callingCode)) {
        return true;
      }

      if (this.nonGeographic()) {
        if (this.nonGeographic()[callingCode]) {
          return true;
        }
      } else {
        // A hacky workaround for old custom metadata (generated before V4).
        var countryCodes = this.countryCallingCodes()[callingCode];

        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === '001') {
          return true;
        }
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function isNonGeographicCallingCode(callingCode) {
      if (this.nonGeographic()) {
        return this.nonGeographic()[callingCode] ? true : false;
      } else {
        return this.getCountryCodesForCallingCode(callingCode) ? false : true;
      }
    } // Deprecated.

  }, {
    key: "country",
    value: function country(countryCode) {
      return this.selectNumberingPlan(countryCode);
    }
  }, {
    key: "selectNumberingPlan",
    value: function selectNumberingPlan(countryCode, callingCode) {
      // Supports just passing `callingCode` as the first argument.
      if (countryCode && CALLING_CODE_REG_EXP.test(countryCode)) {
        callingCode = countryCode;
        countryCode = null;
      }

      if (countryCode && countryCode !== '001') {
        if (!this.hasCountry(countryCode)) {
          throw new Error("Unknown country: ".concat(countryCode));
        }

        this.numberingPlan = new NumberingPlan(this.getCountryMetadata(countryCode), this);
      } else if (callingCode) {
        if (!this.hasCallingCode(callingCode)) {
          throw new Error("Unknown calling code: ".concat(callingCode));
        }

        this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
      } else {
        this.numberingPlan = undefined;
      }

      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function getCountryCodesForCallingCode(callingCode) {
      var countryCodes = this.countryCallingCodes()[callingCode];

      if (countryCodes) {
        // Metadata before V4 included "non-geographic entity" calling codes
        // inside `country_calling_codes` (for example, `"881":["001"]`).
        // Now the semantics of `country_calling_codes` has changed:
        // it's specifically for "countries" now.
        // Older versions of custom metadata will simply skip parsing
        // "non-geographic entity" phone numbers with new versions
        // of this library: it's not considered a bug,
        // because such numbers are extremely rare,
        // and developers extremely rarely use custom metadata.
        if (countryCodes.length === 1 && countryCodes[0].length === 3) {
          return;
        }

        return countryCodes;
      }
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function getCountryCodeForCallingCode(callingCode) {
      var countryCodes = this.getCountryCodesForCallingCode(callingCode);

      if (countryCodes) {
        return countryCodes[0];
      }
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function getNumberingPlanMetadata(callingCode) {
      var countryCode = this.getCountryCodeForCallingCode(callingCode);

      if (countryCode) {
        return this.getCountryMetadata(countryCode);
      }

      if (this.nonGeographic()) {
        var metadata = this.nonGeographic()[callingCode];

        if (metadata) {
          return metadata;
        }
      } else {
        // A hacky workaround for old custom metadata (generated before V4).
        var countryCodes = this.countryCallingCodes()[callingCode];

        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === '001') {
          return this.metadata.countries['001'];
        }
      }
    } // Deprecated.

  }, {
    key: "countryCallingCode",
    value: function countryCallingCode() {
      return this.numberingPlan.callingCode();
    } // Deprecated.

  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      return this.numberingPlan.IDDPrefix();
    } // Deprecated.

  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      return this.numberingPlan.defaultIDDPrefix();
    } // Deprecated.

  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      return this.numberingPlan.nationalNumberPattern();
    } // Deprecated.

  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      return this.numberingPlan.possibleLengths();
    } // Deprecated.

  }, {
    key: "formats",
    value: function formats() {
      return this.numberingPlan.formats();
    } // Deprecated.

  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this.numberingPlan.nationalPrefixForParsing();
    } // Deprecated.

  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.numberingPlan.nationalPrefixTransformRule();
    } // Deprecated.

  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.numberingPlan.leadingDigits();
    } // Deprecated.

  }, {
    key: "hasTypes",
    value: function hasTypes() {
      return this.numberingPlan.hasTypes();
    } // Deprecated.

  }, {
    key: "type",
    value: function type(_type) {
      return this.numberingPlan.type(_type);
    } // Deprecated.

  }, {
    key: "ext",
    value: function ext() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function countryCallingCodes() {
      if (this.v1) return this.metadata.country_phone_code_to_countries;
      return this.metadata.country_calling_codes;
    } // Deprecated.

  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function chooseCountryByCountryCallingCode(callingCode) {
      return this.selectNumberingPlan(callingCode);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function hasSelectedNumberingPlan() {
      return this.numberingPlan !== undefined;
    }
  }]);

  return Metadata;
}();



var NumberingPlan =
/*#__PURE__*/
function () {
  function NumberingPlan(metadata, globalMetadataObject) {
    _classCallCheck(this, NumberingPlan);

    this.globalMetadataObject = globalMetadataObject;
    this.metadata = metadata;
    setVersion.call(this, globalMetadataObject.metadata);
  }

  _createClass(NumberingPlan, [{
    key: "callingCode",
    value: function callingCode() {
      return this.metadata[0];
    } // Formatting information for regions which share
    // a country calling code is contained by only one region
    // for performance reasons. For example, for NANPA region
    // ("North American Numbering Plan Administration",
    //  which includes USA, Canada, Cayman Islands, Bahamas, etc)
    // it will be contained in the metadata for `US`.

  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function getDefaultCountryMetadataForRegion() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[1];
    }
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      if (this.v1 || this.v2) return this.metadata[1];
      return this.metadata[2];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.v1) return;
      return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function _getFormats(metadata) {
      return metadata[this.v1 ? 2 : this.v2 ? 3 : 4];
    } // For countries of the same region (e.g. NANPA)
    // formats are all stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "formats",
    value: function formats() {
      var _this = this;

      var formats = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
      return formats.map(function (_) {
        return new Format(_, _this);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function nationalPrefix() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function _getNationalPrefixFormattingRule(metadata) {
      return metadata[this.v1 ? 4 : this.v2 ? 5 : 6];
    } // For countries of the same region (e.g. NANPA)
    // national prefix formatting rule is stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function _nationalPrefixForParsing() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      // If `national_prefix_for_parsing` is not set explicitly,
      // then infer it from `national_prefix` (if any)
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function _getNationalPrefixIsOptionalWhenFormatting() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    } // For countries of the same region (e.g. NANPA)
    // "national prefix is optional when formatting" flag is
    // stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function types() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      // Versions 1.2.0 - 1.2.4: can be `[]`.

      /* istanbul ignore next */
      if (this.types() && this.types().length === 0) {
        return false;
      } // Versions <= 1.2.4: can be `undefined`.
      // Version >= 1.2.5: can be `0`.


      return !!this.types();
    }
  }, {
    key: "type",
    value: function type(_type2) {
      if (this.hasTypes() && getType(this.types(), _type2)) {
        return new Type(getType(this.types(), _type2), this);
      }
    }
  }, {
    key: "ext",
    value: function ext() {
      if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
      return this.metadata[13] || DEFAULT_EXT_PREFIX;
    }
  }]);

  return NumberingPlan;
}();

var Format =
/*#__PURE__*/
function () {
  function Format(format, metadata) {
    _classCallCheck(this, Format);

    this._format = format;
    this.metadata = metadata;
  }

  _createClass(Format, [{
    key: "pattern",
    value: function pattern() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function format() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function leadingDigitsPatterns() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
      // National prefix is omitted if there's no national prefix formatting rule
      // set for this country, or when the national prefix formatting rule
      // contains no national prefix itself, or when this rule is set but
      // national prefix is optional for this phone number format
      // (and it is not enforced explicitly)
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    } // Checks whether national prefix formatting rule contains national prefix.

  }, {
    key: "usesNationalPrefix",
    value: function usesNationalPrefix() {
      return this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
      !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()) // In compressed metadata, `this.nationalPrefixFormattingRule()` is `0`
      // when `national_prefix_formatting_rule` is not present.
      // So, `true` or `false` are returned explicitly here, so that
      // `0` number isn't returned.
      ? true : false;
    }
  }, {
    key: "internationalFormat",
    value: function internationalFormat() {
      return this._format[5] || this.format();
    }
  }]);

  return Format;
}();
/**
 * A pattern that is used to determine if the national prefix formatting rule
 * has the first group only, i.e., does not start with the national prefix.
 * Note that the pattern explicitly allows for unbalanced parentheses.
 */


var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;

var Type =
/*#__PURE__*/
function () {
  function Type(type, metadata) {
    _classCallCheck(this, Type);

    this.type = type;
    this.metadata = metadata;
  }

  _createClass(Type, [{
    key: "pattern",
    value: function pattern() {
      if (this.metadata.v1) return this.type;
      return this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.metadata.v1) return;
      return this.type[1] || this.metadata.possibleLengths();
    }
  }]);

  return Type;
}();

function getType(types, type) {
  switch (type) {
    case 'FIXED_LINE':
      return types[0];

    case 'MOBILE':
      return types[1];

    case 'TOLL_FREE':
      return types[2];

    case 'PREMIUM_RATE':
      return types[3];

    case 'PERSONAL_NUMBER':
      return types[4];

    case 'VOICEMAIL':
      return types[5];

    case 'UAN':
      return types[6];

    case 'PAGER':
      return types[7];

    case 'VOIP':
      return types[8];

    case 'SHARED_COST':
      return types[9];
  }
}

function validateMetadata(metadata) {
  if (!metadata) {
    throw new Error('[libphonenumber-js] `metadata` argument not passed. Check your arguments.');
  } // `country_phone_code_to_countries` was renamed to
  // `country_calling_codes` in `1.0.18`.


  if (!is_object(metadata) || !is_object(metadata.countries)) {
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(is_object(metadata) ? 'an object of shape: { ' + Object.keys(metadata).join(', ') + ' }' : 'a ' + type_of(metadata) + ': ' + metadata, "."));
  }
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
  return _typeof(_) === 'object';
}; // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */


var type_of = function type_of(_) {
  return _typeof(_);
};
/**
 * Returns extension prefix for a country.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string?}
 * @example
 * // Returns " ext. "
 * getExtPrefix("US")
 */


function getExtPrefix(country, metadata) {
  metadata = new Metadata(metadata);

  if (metadata.hasCountry(country)) {
    return metadata.country(country).ext();
  }

  return DEFAULT_EXT_PREFIX;
}
/**
 * Returns "country calling code" for a country.
 * Throws an error if the country doesn't exist or isn't supported by this library.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string}
 * @example
 * // Returns "44"
 * getCountryCallingCode("GB")
 */

function getCountryCallingCode(country, metadata) {
  metadata = new Metadata(metadata);

  if (metadata.hasCountry(country)) {
    return metadata.country(country).countryCallingCode();
  }

  throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadata) {
  // metadata = new Metadata(metadata)
  // return metadata.hasCountry(country)
  return metadata.countries[country] !== undefined;
}

function setVersion(metadata) {
  var version = metadata.version;

  if (typeof version === 'number') {
    this.v1 = version === 1;
    this.v2 = version === 2;
    this.v3 = version === 3;
    this.v4 = version === 4;
  } else {
    if (!version) {
      this.v1 = true;
    } else if (Object(_tools_semver_compare__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(version, V3) === -1) {
      this.v2 = true;
    } else if (Object(_tools_semver_compare__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(version, V4) === -1) {
      this.v3 = true;
    } else {
      this.v4 = true;
    }
  }
} // const ISO_COUNTRY_CODE = /^[A-Z]{2}$/
// function isCountryCode(countryCode) {
// 	return ISO_COUNTRY_CODE.test(countryCodeOrCountryCallingCode)
// }


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parse.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseNumber; });
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");

 // `options`:
//  {
//    country:
//    {
//      restrict - (a two-letter country code)
//                 the phone number must be in this country
//
//      default - (a two-letter country code)
//                default country to use for phone number parsing and validation
//                (if no country code could be derived from the phone number)
//    }
//  }
//
// Returns `{ country, number }`
//
// Example use cases:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//

function parseNumber() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_parse___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(text, options, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js":
/*!**************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js ***!
  \**************************************************************************/
/*! exports provided: default, parsePhoneNumberCharacter */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseIncompletePhoneNumber; });
/* unused harmony export parsePhoneNumberCharacter */
/* harmony import */ var _helpers_parseDigits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/parseDigits */ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js");

/**
 * Parses phone number characters from a string.
 * Drops all punctuation leaving only digits and the leading `+` sign (if any).
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * // Outputs '8800555'.
 * parseIncompletePhoneNumber('8 (800) 555')
 * // Outputs '+7800555'.
 * parseIncompletePhoneNumber('+7 800 555')
 * ```
 */

function parseIncompletePhoneNumber(string) {
  var result = ''; // Using `.split('')` here instead of normal `for ... of`
  // because the importing application doesn't neccessarily include an ES6 polyfill.
  // The `.split('')` approach discards "exotic" UTF-8 characters
  // (the ones consisting of four bytes) but digits
  // (including non-European ones) don't fall into that range
  // so such "exotic" characters would be discarded anyway.

  for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var character = _ref;
    result += parsePhoneNumberCharacter(character, result) || '';
  }

  return result;
}
/**
 * Parses next character while parsing phone number digits (including a `+`)
 * from text: discards everything except `+` and digits, and `+` is only allowed
 * at the start of a phone number.
 * For example, is used in `react-phone-number-input` where it uses
 * [`input-format`](https://gitlab.com/catamphetamine/input-format).
 * @param  {string} character - Yet another character from raw input string.
 * @param  {string?} prevParsedCharacters - Previous parsed characters.
 * @param  {object} meta - Optional custom use-case-specific metadata.
 * @return {string?} The parsed character.
 */

function parsePhoneNumberCharacter(character, prevParsedCharacters) {
  // Only allow a leading `+`.
  if (character === '+') {
    // If this `+` is not the first parsed character
    // then discard it.
    if (prevParsedCharacters) {
      return;
    }

    return '+';
  } // Allow digits.


  return Object(_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_0__[/* parseDigit */ "b"])(character);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumber.js ***!
  \****************************************************************/
/*! exports provided: default, normalizeArguments */
/*! exports used: default, normalizeArguments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parsePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return normalizeArguments; });
/* harmony import */ var _parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function parsePhoneNumber() {
  var _normalizeArguments = normalizeArguments(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(text, options, metadata);
}
function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args),
      _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4),
      arg_1 = _Array$prototype$slic2[0],
      arg_2 = _Array$prototype$slic2[1],
      arg_3 = _Array$prototype$slic2[2],
      arg_4 = _Array$prototype$slic2[3];

  var text;
  var options;
  var metadata; // If the phone number is passed as a string.
  // `parsePhoneNumber('88005553535', ...)`.

  if (typeof arg_1 === 'string') {
    text = arg_1;
  } else throw new TypeError('A text for parsing must be a string.'); // If "default country" argument is being passed then move it to `options`.
  // `parsePhoneNumber('88005553535', 'RU', [options], metadata)`.


  if (!arg_2 || typeof arg_2 === 'string') {
    if (arg_4) {
      options = arg_3;
      metadata = arg_4;
    } else {
      options = undefined;
      metadata = arg_3;
    }

    if (arg_2) {
      options = _objectSpread({
        defaultCountry: arg_2
      }, options);
    }
  } // `defaultCountry` is not passed.
  // Example: `parsePhoneNumber('+78005553535', [options], metadata)`.
  else if (isObject(arg_2)) {
      if (arg_3) {
        options = arg_2;
        metadata = arg_3;
      } else {
        metadata = arg_2;
      }
    } else throw new Error("Invalid second argument: ".concat(arg_2));

  return {
    text: text,
    options: options,
    metadata: metadata
  };
} // Otherwise istanbul would show this as "branch not covered".

/* istanbul ignore next */

var isObject = function isObject(_) {
  return _typeof(_) === 'object';
};


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString.js":
/*!**************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parsePhoneNumberFromString; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony import */ var _parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumberFromString_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js");


function parsePhoneNumberFromString() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(text, options, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parsePhoneNumberFromString; });
/* harmony import */ var _parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js");
/* harmony import */ var _ParseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParseError */ "./node_modules/libphonenumber-js/es6/ParseError.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function parsePhoneNumberFromString(text, options, metadata) {
  // Validate `defaultCountry`.
  if (options && options.defaultCountry && !Object(_metadata__WEBPACK_IMPORTED_MODULE_2__[/* isSupportedCountry */ "d"])(options.defaultCountry, metadata)) {
    options = _objectSpread({}, options, {
      defaultCountry: undefined
    });
  } // Parse phone number.


  try {
    return Object(_parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(text, options, metadata);
  } catch (error) {
    /* istanbul ignore else */
    if (error instanceof _ParseError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]) {//
    } else {
      throw error;
    }
  }
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parsePhoneNumber; });
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function parsePhoneNumber(text, options, metadata) {
  return Object(_parse___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(text, _objectSpread({}, options, {
    v2: true
  }), metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parse_.js":
/*!******************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parse_.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parse; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _ParseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParseError */ "./node_modules/libphonenumber-js/es6/ParseError.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js");
/* harmony import */ var _helpers_extension_extractExtension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/extension/extractExtension */ "./node_modules/libphonenumber-js/es6/helpers/extension/extractExtension.js");
/* harmony import */ var _parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parseIncompletePhoneNumber */ "./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js");
/* harmony import */ var _getCountryCallingCode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getCountryCallingCode */ "./node_modules/libphonenumber-js/es6/getCountryCallingCode.js");
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./isPossibleNumber_ */ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js");
/* harmony import */ var _helpers_RFC3966__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/RFC3966 */ "./node_modules/libphonenumber-js/es6/helpers/RFC3966.js");
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");
/* harmony import */ var _helpers_matchesEntirely__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/matchesEntirely */ "./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js");
/* harmony import */ var _helpers_extractCountryCallingCode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/extractCountryCallingCode */ "./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCode.js");
/* harmony import */ var _helpers_extractCountryCallingCodeFromInternationalNumberWithoutPlusSign__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign */ "./node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js");
/* harmony import */ var _helpers_extractNationalNumber__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./helpers/extractNationalNumber */ "./node_modules/libphonenumber-js/es6/helpers/extractNationalNumber.js");
/* harmony import */ var _helpers_stripIddPrefix__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/stripIddPrefix */ "./node_modules/libphonenumber-js/es6/helpers/stripIddPrefix.js");
/* harmony import */ var _helpers_getCountryByCallingCode__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers/getCountryByCallingCode */ "./node_modules/libphonenumber-js/es6/helpers/getCountryByCallingCode.js");
// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js















 // We don't allow input strings for parsing to be longer than 250 chars.
// This prevents malicious input from consuming CPU.

var MAX_INPUT_STRING_LENGTH = 250; // This consists of the plus symbol, digits, and arabic-indic digits.

var PHONE_NUMBER_START_PATTERN = new RegExp('[' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* PLUS_CHARS */ "d"] + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_DIGITS */ "e"] + ']'); // Regular expression of trailing characters that we want to remove.
// A trailing `#` is sometimes used when writing phone numbers with extensions in US.
// Example: "+1 (645) 123 1234-910#" number has extension "910".

var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp('[^' + _constants__WEBPACK_IMPORTED_MODULE_0__[/* VALID_DIGITS */ "e"] + '#' + ']+$');
var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false; // Examples:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//

function parse(text, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](metadata); // Validate `defaultCountry`.

  if (options.defaultCountry && !metadata.hasCountry(options.defaultCountry)) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]('INVALID_COUNTRY');
    }

    throw new Error("Unknown country: ".concat(options.defaultCountry));
  } // Parse the phone number.


  var _parseInput = parseInput(text, options.v2, options.extract),
      formattedPhoneNumber = _parseInput.number,
      ext = _parseInput.ext; // If the phone number is not viable then return nothing.


  if (!formattedPhoneNumber) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]('NOT_A_NUMBER');
    }

    return {};
  }

  var _parsePhoneNumber = parsePhoneNumber(formattedPhoneNumber, options.defaultCountry, options.defaultCallingCode, metadata),
      country = _parsePhoneNumber.country,
      nationalNumber = _parsePhoneNumber.nationalNumber,
      countryCallingCode = _parsePhoneNumber.countryCallingCode,
      carrierCode = _parsePhoneNumber.carrierCode;

  if (!metadata.hasSelectedNumberingPlan()) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]('INVALID_COUNTRY');
    }

    return {};
  } // Validate national (significant) number length.


  if (!nationalNumber || nationalNumber.length < _constants__WEBPACK_IMPORTED_MODULE_0__[/* MIN_LENGTH_FOR_NSN */ "c"]) {
    // Won't throw here because the regexp already demands length > 1.

    /* istanbul ignore if */
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]('TOO_SHORT');
    } // Google's demo just throws an error in this case.


    return {};
  } // Validate national (significant) number length.
  //
  // A sidenote:
  //
  // They say that sometimes national (significant) numbers
  // can be longer than `MAX_LENGTH_FOR_NSN` (e.g. in Germany).
  // https://github.com/googlei18n/libphonenumber/blob/7e1748645552da39c4e1ba731e47969d97bdb539/resources/phonenumber.proto#L36
  // Such numbers will just be discarded.
  //


  if (nationalNumber.length > _constants__WEBPACK_IMPORTED_MODULE_0__[/* MAX_LENGTH_FOR_NSN */ "b"]) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]('TOO_LONG');
    } // Google's demo just throws an error in this case.


    return {};
  }

  if (options.v2) {
    var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"](countryCallingCode, nationalNumber, metadata.metadata);

    if (country) {
      phoneNumber.country = country;
    }

    if (carrierCode) {
      phoneNumber.carrierCode = carrierCode;
    }

    if (ext) {
      phoneNumber.ext = ext;
    }

    return phoneNumber;
  } // Check if national phone number pattern matches the number.
  // National number pattern is different for each country,
  // even for those ones which are part of the "NANPA" group.


  var valid = (options.extended ? metadata.hasSelectedNumberingPlan() : country) ? Object(_helpers_matchesEntirely__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(nationalNumber, metadata.nationalNumberPattern()) : false;

  if (!options.extended) {
    return valid ? result(country, nationalNumber, ext) : {};
  } // isInternational: countryCallingCode !== undefined


  return {
    country: country,
    countryCallingCode: countryCallingCode,
    carrierCode: carrierCode,
    valid: valid,
    possible: valid ? true : options.extended === true && metadata.possibleLengths() && Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_7__[/* isPossibleNumber */ "b"])(nationalNumber, metadata) ? true : false,
    phone: nationalNumber,
    ext: ext
  };
}
/**
 * Extracts a formatted phone number from text.
 * Doesn't guarantee that the extracted phone number
 * is a valid phone number (for example, doesn't validate its length).
 * @param  {string} text
 * @param  {boolean} [extract] — If `false`, then will parse the entire `text` as a phone number.
 * @param  {boolean} [throwOnError] — By default, it won't throw if the text is too long.
 * @return {string}
 * @example
 * // Returns "(213) 373-4253".
 * extractFormattedPhoneNumber("Call (213) 373-4253 for assistance.")
 */

function extractFormattedPhoneNumber(text, extract, throwOnError) {
  if (!text) {
    return;
  }

  if (text.length > MAX_INPUT_STRING_LENGTH) {
    if (throwOnError) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]('TOO_LONG');
    }

    return;
  }

  if (extract === false) {
    return text;
  } // Attempt to extract a possible number from the string passed in


  var startsAt = text.search(PHONE_NUMBER_START_PATTERN);

  if (startsAt < 0) {
    return;
  }

  return text // Trim everything to the left of the phone number
  .slice(startsAt) // Remove trailing non-numerical characters
  .replace(AFTER_PHONE_NUMBER_END_PATTERN, '');
}
/**
 * @param  {string} text - Input.
 * @param  {boolean} v2 - Legacy API functions don't pass `v2: true` flag.
 * @param  {boolean} [extract] - Whether to extract a phone number from `text`, or attempt to parse the entire text as a phone number.
 * @return {object} `{ ?number, ?ext }`.
 */


function parseInput(text, v2, extract) {
  // Parse RFC 3966 phone number URI.
  if (text && text.indexOf('tel:') === 0) {
    return Object(_helpers_RFC3966__WEBPACK_IMPORTED_MODULE_8__[/* parseRFC3966 */ "b"])(text);
  }

  var number = extractFormattedPhoneNumber(text, extract, v2); // If the phone number is not viable, then abort.

  if (!number || !Object(_helpers_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(number)) {
    return {};
  } // Attempt to parse extension first, since it doesn't require region-specific
  // data and we want to have the non-normalised number here.


  var withExtensionStripped = Object(_helpers_extension_extractExtension__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(number);

  if (withExtensionStripped.ext) {
    return withExtensionStripped;
  }

  return {
    number: number
  };
}
/**
 * Creates `parse()` result object.
 */


function result(country, nationalNumber, ext) {
  var result = {
    country: country,
    phone: nationalNumber
  };

  if (ext) {
    result.ext = ext;
  }

  return result;
}
/**
 * Parses a viable phone number.
 * @param {string} formattedPhoneNumber — Example: "(213) 373-4253".
 * @param {string} [defaultCountry]
 * @param {string} [defaultCallingCode]
 * @param {Metadata} metadata
 * @return {object} Returns `{ country: string?, countryCallingCode: string?, nationalNumber: string? }`.
 */


function parsePhoneNumber(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata) {
  // Extract calling code from phone number.
  var _extractCountryCallin = Object(_helpers_extractCountryCallingCode__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"])(Object(_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(formattedPhoneNumber), defaultCountry, defaultCallingCode, metadata.metadata),
      countryCallingCode = _extractCountryCallin.countryCallingCode,
      number = _extractCountryCallin.number; // Choose a country by `countryCallingCode`.


  var country;

  if (countryCallingCode) {
    metadata.selectNumberingPlan(countryCallingCode);
  } // If `formattedPhoneNumber` is in "national" format
  // then `number` is defined and `countryCallingCode` isn't.
  else if (number && (defaultCountry || defaultCallingCode)) {
      metadata.selectNumberingPlan(defaultCountry, defaultCallingCode);

      if (defaultCountry) {
        country = defaultCountry;
      } else {
        /* istanbul ignore if */
        if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
          if (metadata.isNonGeographicCallingCode(defaultCallingCode)) {
            country = '001';
          }
        }
      }

      countryCallingCode = defaultCallingCode || Object(_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(defaultCountry, metadata.metadata);
    } else return {};

  if (!number) {
    return {
      countryCallingCode: countryCallingCode
    };
  }

  var _extractNationalNumbe = Object(_helpers_extractNationalNumber__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(Object(_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(number), metadata),
      nationalNumber = _extractNationalNumbe.nationalNumber,
      carrierCode = _extractNationalNumbe.carrierCode; // Sometimes there are several countries
  // corresponding to the same country phone code
  // (e.g. NANPA countries all having `1` country phone code).
  // Therefore, to reliably determine the exact country,
  // national (significant) number should have been parsed first.
  //
  // When `metadata.json` is generated, all "ambiguous" country phone codes
  // get their countries populated with the full set of
  // "phone number type" regular expressions.
  //


  var exactCountry = Object(_helpers_getCountryByCallingCode__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(countryCallingCode, nationalNumber, metadata);

  if (exactCountry) {
    country = exactCountry;
    /* istanbul ignore if */

    if (exactCountry === '001') {// Can't happen with `USE_NON_GEOGRAPHIC_COUNTRY_CODE` being `false`.
      // If `USE_NON_GEOGRAPHIC_COUNTRY_CODE` is set to `true` for some reason,
      // then remove the "istanbul ignore if".
    } else {
      metadata.country(country);
    }
  }

  return {
    country: country,
    countryCallingCode: countryCallingCode,
    nationalNumber: nationalNumber,
    carrierCode: carrierCode
  };
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/searchNumbers.js":
/*!*************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/searchNumbers.js ***!
  \*************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchNumbers; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony import */ var _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhoneNumberMatcher */ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * @return ES6 `for ... of` iterator.
 */

function searchNumbers() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__[/* normalizeArguments */ "b"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  var matcher = new _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"](text, options, metadata);
  return _defineProperty({}, Symbol.iterator, function () {
    return {
      next: function next() {
        if (matcher.hasNext()) {
          return {
            done: false,
            value: matcher.next()
          };
        }

        return {
          done: true
        };
      }
    };
  });
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/searchPhoneNumbersInText.js":
/*!************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/searchPhoneNumbersInText.js ***!
  \************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchPhoneNumbersInText; });
/* harmony import */ var _searchNumbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./searchNumbers */ "./node_modules/libphonenumber-js/es6/searchNumbers.js");
/* harmony import */ var _findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findPhoneNumbersInText */ "./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js");


function searchPhoneNumbersInText(text, defaultCountry, options, metadata) {
  var args = Object(_findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_1__[/* getArguments */ "b"])(defaultCountry, options, metadata);
  return Object(_searchNumbers__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(text, args.options, args.metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/tools/semver-compare.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/tools/semver-compare.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copy-pasted from:
// https://github.com/substack/semver-compare/blob/master/index.js
//
// Inlining this function because some users reported issues with
// importing from `semver-compare` in a browser with ES6 "native" modules.
//
// Fixes `semver-compare` not being able to compare versions with alpha/beta/etc "tags".
// https://github.com/catamphetamine/libphonenumber-js/issues/381
/* harmony default export */ __webpack_exports__["a"] = (function (a, b) {
  a = a.split('-');
  b = b.split('-');
  var pa = a[0].split('.');
  var pb = b[0].split('.');

  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }

  if (a[1] && b[1]) {
    return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
  }

  return !a[1] && b[1] ? 1 : a[1] && !b[1] ? -1 : 0;
});


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/validate.js ***!
  \********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isValidNumber; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");
/* harmony import */ var _getNumberType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNumberType */ "./node_modules/libphonenumber-js/es6/getNumberType.js");

 // Finds out national phone number type (fixed line, mobile, etc)

function isValidNumber() {
  var _normalizeArguments = Object(_getNumberType__WEBPACK_IMPORTED_MODULE_1__[/* normalizeArguments */ "b"])(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_validate___WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(input, options, metadata);
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/validate_.js":
/*!*********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/validate_.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isValidNumber; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _helpers_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/matchesEntirely */ "./node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js");
/* harmony import */ var _helpers_getNumberType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/getNumberType */ "./node_modules/libphonenumber-js/es6/helpers/getNumberType.js");



/**
 * Checks if a given phone number is valid.
 *
 * If the `number` is a string, it will be parsed to an object,
 * but only if it contains only valid phone number characters (including punctuation).
 * If the `number` is an object, it is used as is.
 *
 * The optional `defaultCountry` argument is the default country.
 * I.e. it does not restrict to just that country,
 * e.g. in those cases where several countries share
 * the same phone numbering rules (NANPA, Britain, etc).
 * For example, even though the number `07624 369230`
 * belongs to the Isle of Man ("IM" country code)
 * calling `isValidNumber('07624369230', 'GB', metadata)`
 * still returns `true` because the country is not restricted to `GB`,
 * it's just that `GB` is the default one for the phone numbering rules.
 * For restricting the country see `isValidNumberForRegion()`
 * though restricting a country might not be a good idea.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 *
 * Examples:
 *
 * ```js
 * isValidNumber('+78005553535', metadata)
 * isValidNumber('8005553535', 'RU', metadata)
 * isValidNumber('88005553535', 'RU', metadata)
 * isValidNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */

function isValidNumber(input, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](metadata); // This is just to support `isValidNumber({})`
  // for cases when `parseNumber()` returns `{}`.

  if (!input.country) {
    return false;
  }

  metadata.selectNumberingPlan(input.country, input.countryCallingCode); // By default, countries only have type regexps when it's required for
  // distinguishing different countries having the same `countryCallingCode`.

  if (metadata.hasTypes()) {
    return Object(_helpers_getNumberType__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(input, options, metadata.metadata) !== undefined;
  } // If there are no type regexps for this country in metadata then use
  // `nationalNumberPattern` as a "better than nothing" replacement.


  var national_number = options.v2 ? input.nationalNumber : input.phone;
  return Object(_helpers_matchesEntirely__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(national_number, metadata.nationalNumberPattern());
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/PhoneNumberSearch.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/PhoneNumberSearch.js ***!
  \*******************************************************************************/
/*! exports provided: PhoneNumberSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PhoneNumberSearch */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/findPhoneNumbers_ */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js");




function PhoneNumberSearch(text, options) {
	_es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_1__[/* PhoneNumberSearch */ "a"].call(this, text, options, _min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])
}

// Deprecated.
PhoneNumberSearch.prototype = Object.create(_es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_1__[/* PhoneNumberSearch */ "a"].prototype, {})
PhoneNumberSearch.prototype.constructor = PhoneNumberSearch


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/findPhoneNumbers.js":
/*!******************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/findPhoneNumbers.js ***!
  \******************************************************************************/
/*! exports provided: findPhoneNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export findPhoneNumbers */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/findPhoneNumbers */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers.js");




function findPhoneNumbers() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/format.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/format.js ***!
  \********************************************************************/
/*! exports provided: format */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export format */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/format */ "./node_modules/libphonenumber-js/es6/format.js");




function format() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_format__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/getNumberType.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/getNumberType.js ***!
  \***************************************************************************/
/*! exports provided: getNumberType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getNumberType */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_getNumberType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/getNumberType */ "./node_modules/libphonenumber-js/es6/getNumberType.js");




function getNumberType() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_getNumberType__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/isPossibleNumber.js":
/*!******************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/isPossibleNumber.js ***!
  \******************************************************************************/
/*! exports provided: isPossibleNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isPossibleNumber */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_isPossibleNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/isPossibleNumber */ "./node_modules/libphonenumber-js/es6/isPossibleNumber.js");
// Deprecated.





function isPossibleNumber() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_isPossibleNumber__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/isValidNumber.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/isValidNumber.js ***!
  \***************************************************************************/
/*! exports provided: isValidNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isValidNumber */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/validate */ "./node_modules/libphonenumber-js/es6/validate.js");
// Deprecated.





function isValidNumber() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_validate__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/isValidNumberForRegion.js":
/*!************************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/isValidNumberForRegion.js ***!
  \************************************************************************************/
/*! exports provided: isValidNumberForRegion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isValidNumberForRegion */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_isValidNumberForRegion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/isValidNumberForRegion */ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion.js");




function isValidNumberForRegion() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_isValidNumberForRegion__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/parse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/parse.js ***!
  \*******************************************************************/
/*! exports provided: parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parse */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/parse */ "./node_modules/libphonenumber-js/es6/parse.js");




function parse() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_parse__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.exports/searchPhoneNumbers.js":
/*!********************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.exports/searchPhoneNumbers.js ***!
  \********************************************************************************/
/*! exports provided: searchPhoneNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export searchPhoneNumbers */
/* harmony import */ var _min_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../min/metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../es6/findPhoneNumbers */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers.js");




function searchPhoneNumbers() {
	return Object(_min_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_1__[/* searchPhoneNumbers */ "b"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.js":
/*!*****************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.js ***!
  \*****************************************************/
/*! exports provided: parsePhoneNumberWithError, parsePhoneNumber, parsePhoneNumberFromString, default, isValidPhoneNumber, isPossiblePhoneNumber, findNumbers, searchNumbers, findPhoneNumbersInText, searchPhoneNumbersInText, PhoneNumberMatcher, AsYouType, DIGIT_PLACEHOLDER, isSupportedCountry, getCountries, getCountryCallingCode, getPhoneCode, getExtPrefix, Metadata, getExampleNumber, formatIncompletePhoneNumber, ParseError, parseIncompletePhoneNumber, parsePhoneNumberCharacter, parseDigits, parseRFC3966, formatRFC3966, parseNumber, parse, formatNumber, format, getNumberType, isPossibleNumber, isValidNumber, isValidNumberForRegion, findPhoneNumbers, searchPhoneNumbers, PhoneNumberSearch, DIGITS, parseCustom, formatCustom, isValidNumberCustom, findPhoneNumbersCustom, searchPhoneNumbersCustom, PhoneNumberSearchCustom, getNumberTypeCustom, getCountryCallingCodeCustom, getPhoneCodeCustom, AsYouTypeCustom */
/*! exports used: parsePhoneNumberFromString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _min_exports_parsePhoneNumberWithError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./min/exports/parsePhoneNumberWithError */ "./node_modules/libphonenumber-js/min/exports/parsePhoneNumberWithError.js");
/* harmony import */ var _min_exports_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./min/exports/parsePhoneNumberFromString */ "./node_modules/libphonenumber-js/min/exports/parsePhoneNumberFromString.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _min_exports_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _min_exports_isValidPhoneNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./min/exports/isValidPhoneNumber */ "./node_modules/libphonenumber-js/min/exports/isValidPhoneNumber.js");
/* harmony import */ var _min_exports_isPossiblePhoneNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./min/exports/isPossiblePhoneNumber */ "./node_modules/libphonenumber-js/min/exports/isPossiblePhoneNumber.js");
/* harmony import */ var _min_exports_findNumbers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./min/exports/findNumbers */ "./node_modules/libphonenumber-js/min/exports/findNumbers.js");
/* harmony import */ var _min_exports_searchNumbers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./min/exports/searchNumbers */ "./node_modules/libphonenumber-js/min/exports/searchNumbers.js");
/* harmony import */ var _min_exports_findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./min/exports/findPhoneNumbersInText */ "./node_modules/libphonenumber-js/min/exports/findPhoneNumbersInText.js");
/* harmony import */ var _min_exports_searchPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./min/exports/searchPhoneNumbersInText */ "./node_modules/libphonenumber-js/min/exports/searchPhoneNumbersInText.js");
/* harmony import */ var _min_exports_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./min/exports/PhoneNumberMatcher */ "./node_modules/libphonenumber-js/min/exports/PhoneNumberMatcher.js");
/* harmony import */ var _min_exports_AsYouType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./min/exports/AsYouType */ "./node_modules/libphonenumber-js/min/exports/AsYouType.js");
/* harmony import */ var _es6_AsYouTypeFormatter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./es6/AsYouTypeFormatter */ "./node_modules/libphonenumber-js/es6/AsYouTypeFormatter.js");
/* harmony import */ var _min_exports_isSupportedCountry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./min/exports/isSupportedCountry */ "./node_modules/libphonenumber-js/min/exports/isSupportedCountry.js");
/* harmony import */ var _min_exports_getCountries__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./min/exports/getCountries */ "./node_modules/libphonenumber-js/min/exports/getCountries.js");
/* harmony import */ var _min_exports_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./min/exports/getCountryCallingCode */ "./node_modules/libphonenumber-js/min/exports/getCountryCallingCode.js");
/* harmony import */ var _min_exports_getExtPrefix__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./min/exports/getExtPrefix */ "./node_modules/libphonenumber-js/min/exports/getExtPrefix.js");
/* harmony import */ var _min_exports_Metadata__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./min/exports/Metadata */ "./node_modules/libphonenumber-js/min/exports/Metadata.js");
/* harmony import */ var _min_exports_getExampleNumber__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./min/exports/getExampleNumber */ "./node_modules/libphonenumber-js/min/exports/getExampleNumber.js");
/* harmony import */ var _min_exports_formatIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./min/exports/formatIncompletePhoneNumber */ "./node_modules/libphonenumber-js/min/exports/formatIncompletePhoneNumber.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./core/index */ "./node_modules/libphonenumber-js/core/index.js");
/* harmony import */ var _index_es6_exports_parse__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./index.es6.exports/parse */ "./node_modules/libphonenumber-js/index.es6.exports/parse.js");
/* harmony import */ var _index_es6_exports_format__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./index.es6.exports/format */ "./node_modules/libphonenumber-js/index.es6.exports/format.js");
/* harmony import */ var _index_es6_exports_getNumberType__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./index.es6.exports/getNumberType */ "./node_modules/libphonenumber-js/index.es6.exports/getNumberType.js");
/* harmony import */ var _index_es6_exports_isPossibleNumber__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./index.es6.exports/isPossibleNumber */ "./node_modules/libphonenumber-js/index.es6.exports/isPossibleNumber.js");
/* harmony import */ var _index_es6_exports_isValidNumber__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./index.es6.exports/isValidNumber */ "./node_modules/libphonenumber-js/index.es6.exports/isValidNumber.js");
/* harmony import */ var _index_es6_exports_isValidNumberForRegion__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./index.es6.exports/isValidNumberForRegion */ "./node_modules/libphonenumber-js/index.es6.exports/isValidNumberForRegion.js");
/* harmony import */ var _index_es6_exports_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./index.es6.exports/findPhoneNumbers */ "./node_modules/libphonenumber-js/index.es6.exports/findPhoneNumbers.js");
/* harmony import */ var _index_es6_exports_searchPhoneNumbers__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./index.es6.exports/searchPhoneNumbers */ "./node_modules/libphonenumber-js/index.es6.exports/searchPhoneNumbers.js");
/* harmony import */ var _index_es6_exports_PhoneNumberSearch__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./index.es6.exports/PhoneNumberSearch */ "./node_modules/libphonenumber-js/index.es6.exports/PhoneNumberSearch.js");
/* harmony import */ var _es6_helpers_parseDigits__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./es6/helpers/parseDigits */ "./node_modules/libphonenumber-js/es6/helpers/parseDigits.js");
/* harmony import */ var _es6_parse__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./es6/parse */ "./node_modules/libphonenumber-js/es6/parse.js");
/* harmony import */ var _es6_format__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./es6/format */ "./node_modules/libphonenumber-js/es6/format.js");
/* harmony import */ var _es6_validate__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./es6/validate */ "./node_modules/libphonenumber-js/es6/validate.js");
/* harmony import */ var _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./es6/findPhoneNumbers */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers.js");
/* harmony import */ var _es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./es6/findPhoneNumbers_ */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js");
/* harmony import */ var _es6_getNumberType__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./es6/getNumberType */ "./node_modules/libphonenumber-js/es6/getNumberType.js");
/* harmony import */ var _es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./es6/getCountryCallingCode */ "./node_modules/libphonenumber-js/es6/getCountryCallingCode.js");
/* harmony import */ var _es6_AsYouType__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./es6/AsYouType */ "./node_modules/libphonenumber-js/es6/AsYouType.js");
// `parsePhoneNumber()` named export has been renamed to `parsePhoneNumberWithError()`.

// `parsePhoneNumberFromString()` named export is now considered legacy:
// it has been promoted to a default export due to being too verbose.





// Deprecated.

// Deprecated.











// `getPhoneCode` name is deprecated, use `getCountryCallingCode` instead.










// Deprecated (old) exports.










// Deprecated DIGITS export.
// (it was used in `react-phone-number-input`)


// Deprecated "custom" exports.











/***/ }),

/***/ "./node_modules/libphonenumber-js/metadata.min.json.js":
/*!*************************************************************!*\
  !*** ./node_modules/libphonenumber-js/metadata.min.json.js ***!
  \*************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// This file is a workaround for a bug in web browsers' "native"
// ES6 importing system which is uncapable of importing "*.json" files.
// https://github.com/catamphetamine/libphonenumber-js/issues/239
/* harmony default export */ __webpack_exports__["a"] = ({"version":4,"country_calling_codes":{"1":["US","AG","AI","AS","BB","BM","BS","CA","DM","DO","GD","GU","JM","KN","KY","LC","MP","MS","PR","SX","TC","TT","VC","VG","VI"],"7":["RU","KZ"],"20":["EG"],"27":["ZA"],"30":["GR"],"31":["NL"],"32":["BE"],"33":["FR"],"34":["ES"],"36":["HU"],"39":["IT","VA"],"40":["RO"],"41":["CH"],"43":["AT"],"44":["GB","GG","IM","JE"],"45":["DK"],"46":["SE"],"47":["NO","SJ"],"48":["PL"],"49":["DE"],"51":["PE"],"52":["MX"],"53":["CU"],"54":["AR"],"55":["BR"],"56":["CL"],"57":["CO"],"58":["VE"],"60":["MY"],"61":["AU","CC","CX"],"62":["ID"],"63":["PH"],"64":["NZ"],"65":["SG"],"66":["TH"],"81":["JP"],"82":["KR"],"84":["VN"],"86":["CN"],"90":["TR"],"91":["IN"],"92":["PK"],"93":["AF"],"94":["LK"],"95":["MM"],"98":["IR"],"211":["SS"],"212":["MA","EH"],"213":["DZ"],"216":["TN"],"218":["LY"],"220":["GM"],"221":["SN"],"222":["MR"],"223":["ML"],"224":["GN"],"225":["CI"],"226":["BF"],"227":["NE"],"228":["TG"],"229":["BJ"],"230":["MU"],"231":["LR"],"232":["SL"],"233":["GH"],"234":["NG"],"235":["TD"],"236":["CF"],"237":["CM"],"238":["CV"],"239":["ST"],"240":["GQ"],"241":["GA"],"242":["CG"],"243":["CD"],"244":["AO"],"245":["GW"],"246":["IO"],"247":["AC"],"248":["SC"],"249":["SD"],"250":["RW"],"251":["ET"],"252":["SO"],"253":["DJ"],"254":["KE"],"255":["TZ"],"256":["UG"],"257":["BI"],"258":["MZ"],"260":["ZM"],"261":["MG"],"262":["RE","YT"],"263":["ZW"],"264":["NA"],"265":["MW"],"266":["LS"],"267":["BW"],"268":["SZ"],"269":["KM"],"290":["SH","TA"],"291":["ER"],"297":["AW"],"298":["FO"],"299":["GL"],"350":["GI"],"351":["PT"],"352":["LU"],"353":["IE"],"354":["IS"],"355":["AL"],"356":["MT"],"357":["CY"],"358":["FI","AX"],"359":["BG"],"370":["LT"],"371":["LV"],"372":["EE"],"373":["MD"],"374":["AM"],"375":["BY"],"376":["AD"],"377":["MC"],"378":["SM"],"380":["UA"],"381":["RS"],"382":["ME"],"383":["XK"],"385":["HR"],"386":["SI"],"387":["BA"],"389":["MK"],"420":["CZ"],"421":["SK"],"423":["LI"],"500":["FK"],"501":["BZ"],"502":["GT"],"503":["SV"],"504":["HN"],"505":["NI"],"506":["CR"],"507":["PA"],"508":["PM"],"509":["HT"],"590":["GP","BL","MF"],"591":["BO"],"592":["GY"],"593":["EC"],"594":["GF"],"595":["PY"],"596":["MQ"],"597":["SR"],"598":["UY"],"599":["CW","BQ"],"670":["TL"],"672":["NF"],"673":["BN"],"674":["NR"],"675":["PG"],"676":["TO"],"677":["SB"],"678":["VU"],"679":["FJ"],"680":["PW"],"681":["WF"],"682":["CK"],"683":["NU"],"685":["WS"],"686":["KI"],"687":["NC"],"688":["TV"],"689":["PF"],"690":["TK"],"691":["FM"],"692":["MH"],"850":["KP"],"852":["HK"],"853":["MO"],"855":["KH"],"856":["LA"],"880":["BD"],"886":["TW"],"960":["MV"],"961":["LB"],"962":["JO"],"963":["SY"],"964":["IQ"],"965":["KW"],"966":["SA"],"967":["YE"],"968":["OM"],"970":["PS"],"971":["AE"],"972":["IL"],"973":["BH"],"974":["QA"],"975":["BT"],"976":["MN"],"977":["NP"],"992":["TJ"],"993":["TM"],"994":["AZ"],"995":["GE"],"996":["KG"],"998":["UZ"]},"countries":{"AC":["247","00","(?:[01589]\\d|[46])\\d{4}",[5,6]],"AD":["376","00","(?:1|6\\d)\\d{7}|[135-9]\\d{5}",[6,8,9],[["(\\d{3})(\\d{3})","$1 $2",["[135-9]"]],["(\\d{4})(\\d{4})","$1 $2",["1"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]]],"AE":["971","00","(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",[5,6,7,8,9,10,11,12],[["(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],["(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"]],"0"],"AF":["93","00","[2-7]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],"0"],"AG":["1","011","(?:268|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([457]\\d{6})$","268$1",0,"268"],"AI":["1","011","(?:264|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2457]\\d{6})$","264$1",0,"264"],"AL":["355","00","(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",[6,7,8,9],[["(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],"0"],"AM":["374","00","(?:[1-489]\\d|55|60|77)\\d{6}",[8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0 $1"],["(\\d{3})(\\d{5})","$1 $2",["2|3[12]"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[3-9]"],"0$1"]],"0"],"AO":["244","00","[29]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]]],"AR":["54","00","(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}",[10,11],[["(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",1],["(\\d)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",0,"$1 $2 $3-$4"],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 15-$3-$4",["91"],"0$1",0,"$1 $2 $3-$4"],["(\\d{3})(\\d{3})(\\d{5})","$1-$2-$3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9"],"0$1",0,"$1 $2 $3-$4"]],"0",0,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1"],"AS":["1","011","(?:[58]\\d\\d|684|900)\\d{7}",[10],0,"1",0,"1|([267]\\d{6})$","684$1",0,"684"],"AT":["43","00","1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",[4,5,6,7,8,9,10,11,12,13],[["(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],["(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],["(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],["(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],["(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],"0"],"AU":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d{7,8}|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|4"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],"0",0,"0|(183[12])",0,0,0,[["(?:(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8]))\\d{3}|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4]))|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}",[9]],["4(?:83[0-38]|93[0-4])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,["163\\d{2,6}",[5,6,7,8,9]],["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"AW":["297","00","(?:[25-79]\\d\\d|800)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]]],"AX":["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",[5,6,7,8,9,10,11,12],0,"0",0,0,0,0,"18",0,"00"],"AZ":["994","00","365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365|46","1[28]|2|365(?:[0-46-9]|5[0-35-9])|46"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],"0"],"BA":["387","00","6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],"0"],"BB":["1","011","(?:246|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","246$1",0,"246"],"BD":["880","00","1\\d{9}|2\\d{7,8}|88\\d{4,6}|(?:8[0-79]|9\\d)\\d{4,8}|(?:[346]\\d|[57])\\d{5,8}",[6,7,8,9,10],[["(\\d{2})(\\d{4,6})","$1-$2",["31[5-8]|[459]1"],"0$1"],["(\\d{3})(\\d{3,7})","$1-$2",["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],"0$1"],["(\\d{4})(\\d{3,6})","$1-$2",["[13-9]"],"0$1"],["(\\d)(\\d{7,8})","$1-$2",["2"],"0$1"]],"0"],"BE":["32","00","4\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[239]|4[23]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-8]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],"0"],"BF":["226","00","[025-7]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[025-7]"]]]],"BG":["359","00","[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",[6,7,8,9],[["(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],"0"],"BH":["973","00","[136-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[13679]|8[047]"]]]],"BI":["257","00","(?:[267]\\d|31)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2367]"]]]],"BJ":["229","00","[25689]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[25689]"]]]],"BL":["590","00","(?:590|69\\d|976)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:2[7-9]|5[12]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"],0,0,0,0,0,0,["976[01]\\d{5}"]]],"BM":["1","011","(?:441|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-8]\\d{6})$","441$1",0,"441"],"BN":["673","00","[2-578]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]]],"BO":["591","00(?:1\\d)?","(?:[2-467]\\d\\d|8001)\\d{5}",[8,9],[["(\\d)(\\d{7})","$1 $2",["[23]|4[46]"]],["(\\d{8})","$1",["[67]"]],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["8"]]],"0",0,"0(1\\d)?"],"BQ":["599","00","(?:[34]1|7\\d)\\d{5}",[7],0,0,0,0,0,0,"[347]"],"BR":["55","00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",[8,9,10,11],[["(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],["(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)"],["(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)"]],"0",0,"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2"],"BS":["1","011","(?:242|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([3-8]\\d{6})$","242$1",0,"242"],"BT":["975","00","[17]\\d{7}|[2-8]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]]],"BW":["267","00","(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}",[7,8,10],[["(\\d{2})(\\d{5})","$1 $2",["90"]],["(\\d{3})(\\d{4})","$1 $2",["[24-6]|3[15-79]"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37]"]],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["0"]],["(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["8"]]]],"BY":["375","810","(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",[6,7,8,9,10,11],[["(\\d{3})(\\d{3})","$1 $2",["800"],"8 $1"],["(\\d{3})(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"],["(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:[56]|7[467])|2[1-3]"],"8 0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-4]"],"8 0$1"],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["[89]"],"8 $1"]],"8",0,"0|80?",0,0,0,0,"8~10"],"BZ":["501","00","(?:0800\\d|[2-8])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],["(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]]],"CA":["1","011","(?:[2-8]\\d|90)\\d{8}",[10],0,"1",0,0,0,0,0,[["(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|6[57])|4(?:03|1[68]|3[178]|50|74)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}"],0,0,0,["600[2-9]\\d{6}"]]],"CC":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|[148]\\d{8}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",[9]],["4(?:83[0-38]|93[0-4])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"CD":["243","00","[189]\\d{8}|[1-68]\\d{6}",[7,9],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"]],"0"],"CF":["236","00","(?:[27]\\d{3}|8776)\\d{4}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]]],"CG":["242","00","222\\d{6}|(?:0\\d|80)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]]]],"CH":["41","00","8\\d{11}|[2-9]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]|81"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],"0"],"CI":["225","00","[02]\\d{9}|[02-9]\\d{7}",[8,10],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[03-9]|2(?:[02-4]|1[023578])","[03-9]|2(?:[02-4]|1(?:[02357]|80))"]],["(\\d{2})(\\d{2})(\\d)(\\d{5})","$1 $2 $3 $4",["2"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3 $4",["0"]]]],"CK":["682","00","[2-578]\\d{4}",[5],[["(\\d{2})(\\d{3})","$1 $2",["[2-578]"]]]],"CL":["56","(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0","12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",[9,10,11],[["(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-3]"],"($1)"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]]],"CM":["237","00","[26]\\d{8}|88\\d{6,7}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]|88"]]]],"CN":["86","00|1(?:[12]\\d|79)\\d\\d00","1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}",[7,8,9,10,11,12],[["(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]","(?:10|2[0-57-9])(?:10|9[56])","(?:10|2[0-57-9])(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1",1],["(\\d{3})(\\d{7,8})","$1 $2",["9"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",1]],"0",0,"0|(1(?:[12]\\d|79)\\d\\d)",0,0,0,0,"00"],"CO":["57","00(?:4(?:[14]4|56)|[579])","(?:1\\d|3)\\d{9}|[124-8]\\d{7}",[8,10,11],[["(\\d)(\\d{7})","$1 $2",["[14][2-9]|[25-8]"],"($1)"],["(\\d{3})(\\d{7})","$1 $2",["3"]],["(\\d)(\\d{3})(\\d{7})","$1-$2-$3",["1"],"0$1",0,"$1 $2 $3"]],"0",0,"0([3579]|4(?:[14]4|56))?"],"CR":["506","00","(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",[8,10],[["(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[3-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]"]]],0,0,"(19(?:0[0-2468]|1[09]|20|66|77|99))"],"CU":["53","119","[27]\\d{6,7}|[34]\\d{5,7}|(?:5|8\\d\\d)\\d{7}",[6,7,8,10],[["(\\d{2})(\\d{4,6})","$1 $2",["2[1-4]|[34]"],"(0$1)"],["(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["5"],"0$1"],["(\\d{3})(\\d{7})","$1 $2",["8"],"0$1"]],"0"],"CV":["238","0","(?:[2-59]\\d\\d|800)\\d{4}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-589]"]]]],"CW":["599","00","(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[3467]"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],0,0,0,0,0,"[69]"],"CX":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|[148]\\d{8}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",[9]],["4(?:83[0-38]|93[0-4])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"CY":["357","00","(?:[279]\\d|[58]0)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]]],"CZ":["420","00","(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]]],"DE":["49","00","[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:[12]\\d|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[05]\\d|31|[46][1-8])\\d{1,9}",[4,5,6,7,8,9,10,11,12,13,14,15],[["(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],["(\\d{3})(\\d{3,12})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],["(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],["(\\d{5})(\\d{2,10})","$1 $2",["3"],"0$1"],["(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],["(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],["(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],["(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["15[0568]"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],["(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],["(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],["(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],["(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],"0"],"DJ":["253","00","(?:2\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]]],"DK":["45","00","[2-9]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]]],"DM":["1","011","(?:[58]\\d\\d|767|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","767$1",0,"767"],"DO":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,0,0,0,"8001|8[024]9"],"DZ":["213","00","(?:[1-4]|[5-79]\\d|80)\\d{7}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"]],"0"],"EC":["593","00","1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",[8,9,10,11],[["(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[2-7]"],"(0$1)",0,"$1-$2-$3"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],"0"],"EE":["372","00","8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",[7,8,10],[["(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]],["(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-49])","[45]|8(?:00[1-9]|[1-49])"]],["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]]],"EG":["20","00","[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",[8,9,10],[["(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],["(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|8[2468]|9[235-7]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[189]"],"0$1"]],"0"],"EH":["212","00","[5-8]\\d{8}",[9],0,"0",0,0,0,0,"528[89]"],"ER":["291","00","[178]\\d{6}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[178]"],"0$1"]],"0"],"ES":["34","00","[5-9]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]]],"ET":["251","00","(?:11|[2-59]\\d)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],"0"],"FI":["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",[5,6,7,8,9,10,11,12],[["(\\d)(\\d{4,9})","$1 $2",["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"],["(\\d{3})(\\d{3,7})","$1 $2",["[12]00|[368]|70[07-9]"],"0$1"],["(\\d{2})(\\d{4,8})","$1 $2",["[1245]|7[135]"],"0$1"],["(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"]],"0",0,0,0,0,"1[03-79]|[2-9]",0,"00"],"FJ":["679","0(?:0|52)","45\\d{5}|(?:0800\\d|[235-9])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],0,0,0,0,0,0,0,"00"],"FK":["500","00","[2-7]\\d{4}",[5]],"FM":["691","00","(?:[39]\\d\\d|820)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[389]"]]]],"FO":["298","00","[2-9]\\d{5}",[6],[["(\\d{6})","$1",["[2-9]"]]],0,0,"(10(?:01|[12]0|88))"],"FR":["33","00","[1-9]\\d{8}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],"0"],"GA":["241","00","(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",[7,8],[["(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["11|[67]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],0,0,"0(11\\d{6}|6[256]\\d{6}|7[47]\\d{6})","$1"],"GB":["44","00","[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",[7,9,10],[["(\\d{3})(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["845","8454","84546","845464"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["800"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["1(?:[2-69][02-9]|[78])"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[25]|7(?:0|6[02-9])","[25]|7(?:0|6(?:[03-9]|2[356]))"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[1389]"],"0$1"]],"0",0,0,0,0,0,[["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[03])|4(?:[0-5]\\d\\d|69[7-9])|(?:5[0-26-9]|6[0-4]|[78][0-49])\\d\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[02]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}",[9,10]],["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}",[10]],["56\\d{8}",[10]]],0," x"],"GD":["1","011","(?:473|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","473$1",0,"473"],"GE":["995","00","(?:[3-57]\\d\\d|800)\\d{6}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["32"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[57]"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"]],"0"],"GF":["594","00","(?:[56]94|976)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],"0"],"GG":["44","00","(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",[7,9,10],0,"0",0,"0|([25-9]\\d{5})$","1481$1",0,0,[["1481[25-9]\\d{5}",[10]],["7(?:(?:781|839)\\d|911[17])\\d{5}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}",[10]],["56\\d{8}",[10]]]],"GH":["233","00","(?:[235]\\d{3}|800)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],"0"],"GI":["350","00","(?:[25]\\d\\d|606)\\d{5}",[8],[["(\\d{3})(\\d{5})","$1 $2",["2"]]]],"GL":["299","00","(?:19|[2-689]\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-689]"]]]],"GM":["220","00","[2-9]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],"GN":["224","00","722\\d{6}|(?:3|6\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]]],"GP":["590","00","(?:590|69\\d|976)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],"0",0,0,0,0,0,[["590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"],0,0,0,0,0,0,["976[01]\\d{5}"]]],"GQ":["240","00","222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],["(\\d{3})(\\d{6})","$1 $2",["[89]"]]]],"GR":["30","00","5005000\\d{3}|8\\d{9,10}|(?:[269]\\d|70)\\d{8}",[10,11],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],["(\\d{4})(\\d{6})","$1 $2",["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2689]"]],["(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3",["8"]]]],"GT":["502","00","(?:1\\d{3}|[2-7])\\d{7}",[8,11],[["(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],"GU":["1","011","(?:[58]\\d\\d|671|900)\\d{7}",[10],0,"1",0,"1|([3-9]\\d{6})$","671$1",0,"671"],"GW":["245","00","[49]\\d{8}|4\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["40"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]]],"GY":["592","001","(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-46-9]"]]]],"HK":["852","00(?:30|5[09]|[126-9]?)","8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",[5,6,7,8,9,11],[["(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],["(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],["(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],0,0,0,0,0,0,0,"00"],"HN":["504","00","8\\d{10}|[237-9]\\d{7}",[8,11],[["(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]]],"HR":["385","00","(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",[6,7,8,9],[["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],"0"],"HT":["509","00","[2-489]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-489]"]]]],"HU":["36","00","[235-7]\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"(06 $1)"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],"(06 $1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"06 $1"]],"06"],"ID":["62","00[89]","(?:(?:00[1-9]|8\\d)\\d{4}|[1-36])\\d{6}|00\\d{10}|[1-9]\\d{8,10}|[2-9]\\d{7}",[7,8,9,10,11,12,13],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],["(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],["(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],["(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],["(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],["(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],["(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],"0"],"IE":["353","00","(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],["(\\d{3})(\\d{5})","$1 $2",["[45]0"],"(0$1)"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2569]|4[1-69]|7[14]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[78]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["4"],"(0$1)"],["(\\d{2})(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8"],"0$1"]],"0"],"IL":["972","0(?:0|1[2-9])","1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",[7,8,9,10,11,12],[["(\\d{4})(\\d{3})","$1-$2",["125"]],["(\\d{4})(\\d{2})(\\d{2})","$1-$2-$3",["121"]],["(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1-$2-$3",["12"]],["(\\d{4})(\\d{6})","$1-$2",["159"]],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["15"]]],"0"],"IM":["44","00","1624\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([25-8]\\d{5})$","1624$1",0,"74576|(?:16|7[56])24"],"IN":["91","00","(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",[8,9,10,11,12,13],[["(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],0,1],["(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],0,1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],0,1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],"0$1",1],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",1],["(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",1],["(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],0,1],["(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],0,1]],"0"],"IO":["246","00","3\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["3"]]]],"IQ":["964","00","(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],"IR":["98","00","[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",[4,5,6,7,10],[["(\\d{4,5})","$1",["96"],"0$1"],["(\\d{2})(\\d{4,5})","$1 $2",["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"]],"0"],"IS":["354","00|1(?:0(?:01|[12]0)|100)","(?:38\\d|[4-9])\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],0,0,0,0,0,0,0,"00"],"IT":["39","00","0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],[["(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],["(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],["(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],["(\\d{4})(\\d{4})","$1 $2",["894"]],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1[4679]|[38]"]],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],["(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],["(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["3"]]],0,0,0,0,0,0,[["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"],["3[1-9]\\d{8}|3[2-9]\\d{7}",[9,10]],["80(?:0\\d{3}|3)\\d{3}",[6,9]],["(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",[6,8,9,10]],["1(?:78\\d|99)\\d{6}",[9,10]],0,0,0,["55\\d{8}",[10]],["84(?:[08]\\d{3}|[17])\\d{3}",[6,9]]]],"JE":["44","00","1534\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([0-24-8]\\d{5})$","1534$1",0,0,[["1534[0-24-8]\\d{5}"],["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"],["80(?:07(?:35|81)|8901)\\d{4}"],["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],["701511\\d{4}"],0,["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"],["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}"],["56\\d{8}"]]],"JM":["1","011","(?:[58]\\d\\d|658|900)\\d{7}",[10],0,"1",0,0,0,0,"658|876"],"JO":["962","00","(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],["(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],"JP":["81","010","00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",[8,9,10,11,12,13,14,15,16,17],[["(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],["(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9]|636[457-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[27-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|51|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],["(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[289][2-9]|5[3-9]|7[2-4679]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[257-9]"],"0$1"]],"0"],"KE":["254","000","(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",[7,8,9,10],[["(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[17]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0"],"KG":["996","00","8\\d{9}|(?:[235-8]\\d|99)\\d{7}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["3(?:1[346]|[24-79])"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-79]|88"],"0$1"],["(\\d{3})(\\d{3})(\\d)(\\d{2,3})","$1 $2 $3 $4",["8"],"0$1"]],"0"],"KH":["855","00[14-9]","1\\d{9}|[1-9]\\d{7,8}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"KI":["686","00","(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",[5,8],0,"0"],"KM":["269","00","[3478]\\d{6}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]]],"KN":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","869$1",0,"869"],"KP":["850","00|99","85\\d{6}|(?:19\\d|[2-7])\\d{7}",[8,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"]],"0"],"KR":["82","00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",[5,6,8,9,10,11,12,13,14],[["(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1"],["(\\d{4})(\\d{4})","$1-$2",["1"]],["(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60|8"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1"]],"0",0,"0(8(?:[1-46-8]|5\\d\\d))?"],"KW":["965","00","(?:18|[2569]\\d\\d)\\d{5}",[7,8],[["(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],["(\\d{3})(\\d{5})","$1 $2",["[25]"]]]],"KY":["1","011","(?:345|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","345$1",0,"345"],"KZ":["7","810","33622\\d{5}|(?:7\\d|80)\\d{8}",[10],0,"8",0,0,0,0,"33|7",0,"8~10"],"LA":["856","00","[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30[013-9]"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[23]"],"0$1"]],"0"],"LB":["961","00","[27-9]\\d{7}|[13-9]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27-9]"]]],"0"],"LC":["1","011","(?:[58]\\d\\d|758|900)\\d{7}",[10],0,"1",0,"1|([2-8]\\d{6})$","758$1",0,"758"],"LI":["423","00","90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}",[7,9],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[237-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["69"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],"0",0,"0|(1001)"],"LK":["94","00","[1-9]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"]],"0"],"LR":["231","00","(?:2|33|5\\d|77|88)\\d{7}|[4-6]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[4-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3578]"],"0$1"]],"0"],"LS":["266","00","(?:[256]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2568]"]]]],"LT":["370","00","(?:[3469]\\d|52|[78]0)\\d{6}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["52[0-7]"],"(8-$1)",1],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",1],["(\\d{2})(\\d{6})","$1 $2",["37|4(?:[15]|6[1-8])"],"(8-$1)",1],["(\\d{3})(\\d{5})","$1 $2",["[3-6]"],"(8-$1)",1]],"8",0,"[08]"],"LU":["352","00","35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",[4,5,6,7,8,9,10,11],[["(\\d{2})(\\d{3})","$1 $2",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20[2-689]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["80[01]|90[015]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})","$1 $2 $3 $4",["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]],0,0,"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"],"LV":["371","00","(?:[268]\\d|90)\\d{6}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[269]|8[01]"]]]],"LY":["218","00","[2-9]\\d{8}",[9],[["(\\d{2})(\\d{7})","$1-$2",["[2-9]"],"0$1"]],"0"],"MA":["212","00","[5-8]\\d{8}",[9],[["(\\d{5})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]","5(?:29|38)[89]0"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[45]"],"0$1"],["(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|9)|892","5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"],"0$1"],["(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"],["(\\d{3})(\\d{6})","$1-$2",["[5-7]"],"0$1"]],"0",0,0,0,0,0,[["5(?:29(?:[189][05]|2[29]|3[01])|38[89][05])\\d{4}|5(?:2(?:[015-7]\\d|2[02-9]|3[0-578]|4[02-46-8]|8[0235-7]|90)|3(?:[0-47]\\d|5[02-9]|6[02-8]|80|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"],["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0\\d|6[1267]|7[0-57]))\\d{6}"],["80\\d{7}"],["89\\d{7}"],0,0,0,0,["592(?:4[0-2]|93)\\d{4}"]]],"MC":["377","00","(?:[3489]|6\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[389]"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],"0"],"MD":["373","00","(?:[235-7]\\d|[89]0)\\d{6}",[8],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"]],"0"],"ME":["382","00","(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"0$1"]],"0"],"MF":["590","00","(?:590|69\\d|976)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"],0,0,0,0,0,0,["976[01]\\d{5}"]]],"MG":["261","00","[23]\\d{8}",[9],[["(\\d{2})(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],"0",0,"0|([24-9]\\d{6})$","20$1"],"MH":["692","011","329\\d{4}|(?:[256]\\d|45)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],"1"],"MK":["389","00","[2-578]\\d{7}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],"0"],"ML":["223","00","[24-9]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]]],"MM":["95","00","1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",[6,7,8,9,10],[["(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-7]|8[1-35]"],"0$1"],["(\\d)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92"],"0$1"],["(\\d)(\\d{5})(\\d{4})","$1 $2 $3",["9"],"0$1"]],"0"],"MN":["976","001","[12]\\d{7,9}|[57-9]\\d{7}",[8,9,10],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[57-9]"]],["(\\d{3})(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["[12](?:27|3[2-8]|4[2-68]|5[1-4689])","[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["[12]"],"0$1"]],"0"],"MO":["853","00","(?:28|[68]\\d)\\d{6}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[268]"]]]],"MP":["1","011","[58]\\d{9}|(?:67|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","670$1",0,"670"],"MQ":["596","00","69\\d{7}|(?:59|97)6\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],"0"],"MR":["222","00","(?:[2-4]\\d\\d|800)\\d{5}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]]],"MS":["1","011","(?:[58]\\d\\d|664|900)\\d{7}",[10],0,"1",0,"1|([34]\\d{6})$","664$1",0,"664"],"MT":["356","00","3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]]],"MU":["230","0(?:0|[24-7]0|3[03])","(?:[2-468]|5\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-46]|8[013]"]],["(\\d{4})(\\d{4})","$1 $2",["5"]]],0,0,0,0,0,0,0,"020"],"MV":["960","0(?:0|19)","(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",[7,10],[["(\\d{3})(\\d{4})","$1-$2",["[3467]|9[13-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],0,0,0,0,0,0,0,"00"],"MW":["265","00","1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",[7,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[137-9]"],"0$1"]],"0"],"MX":["52","0[09]","(?:1(?:[01467]\\d|[2359][1-9]|8[1-79])|[2-9]\\d)\\d{8}",[10,11],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"],0,1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"],0,1],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 $3 $4",["1(?:33|5[56]|81)"],0,1],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 $3 $4",["1"],0,1]],"01",0,"0(?:[12]|4[45])|1",0,0,0,0,"00"],"MY":["60","00","1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1-$2 $3",["1(?:[02469]|[378][1-9])|8"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2 $3",["1"],"0$1"]],"0"],"MZ":["258","00","(?:2|8\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-79]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]]],"NA":["264","00","[68]\\d{7,8}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["87"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],"0"],"NC":["687","00","[2-57-9]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-57-9]"]]]],"NE":["227","00","[027-9]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["08"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[089]|2[013]|7[04]"]]]],"NF":["672","00","[13]\\d{5}",[6],[["(\\d{2})(\\d{4})","$1 $2",["1[0-3]"]],["(\\d)(\\d{5})","$1 $2",["[13]"]]],0,0,"([0-258]\\d{4})$","3$1"],"NG":["234","009","(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}",[7,8,10,11,12,13,14],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-7]|8[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[7-9]"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]"],"0$1"],["(\\d{3})(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]"],"0$1"]],"0"],"NI":["505","00","(?:1800|[25-8]\\d{3})\\d{4}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]]],"NL":["31","00","(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}",[5,6,7,8,9,10],[["(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],["(\\d)(\\d{8})","$1 $2",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-57-9]"],"0$1"]],"0"],"NO":["47","00","(?:0|[2-9]\\d{3})\\d{4}",[5,8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[489]|59"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],0,0,0,0,0,"[02-689]|7[0-8]"],"NP":["977","00","(?:1\\d|9)\\d{9}|[1-9]\\d{7}",[8,10,11],[["(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],["(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-579]|6[2-6])"],"0$1"],["(\\d{3})(\\d{7})","$1-$2",["9"]]],"0"],"NR":["674","00","(?:444|(?:55|8\\d)\\d|666)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[4-68]"]]]],"NU":["683","00","(?:[47]|888\\d)\\d{3}",[4,7],[["(\\d{3})(\\d{4})","$1 $2",["8"]]]],"NZ":["64","0(?:0|161)","[29]\\d{7,9}|50\\d{5}(?:\\d{2,3})?|6[0-35-9]\\d{6}|7\\d{7,8}|8\\d{4,9}|(?:11\\d|[34])\\d{7}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,8})","$1 $2",["8[1-579]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["50[036-8]|[89]0","50(?:[0367]|88)|[89]0"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["24|[346]|7[2-57-9]|9[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|[59]|80"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1|2[028]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:[169]|7[0-35-9])|7|86"],"0$1"]],"0",0,0,0,0,0,0,"00"],"OM":["968","00","(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}",[7,8,9],[["(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],["(\\d{2})(\\d{6})","$1 $2",["2"]],["(\\d{4})(\\d{4})","$1 $2",["[179]"]]]],"PA":["507","00","8\\d{9}|[68]\\d{7}|[1-57-9]\\d{6}",[7,8,10],[["(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],["(\\d{4})(\\d{4})","$1-$2",["[68]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]]],"PE":["51","19(?:1[124]|77|90)00","(?:[14-8]|9\\d)\\d{7}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["1"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[4-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],"0",0,0,0,0,0,0,0," Anexo "],"PF":["689","00","[48]\\d{7}|4\\d{5}",[6,8],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[48]"]]]],"PG":["675","00|140[1-3]","(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["18|[2-69]|85"]],["(\\d{4})(\\d{4})","$1 $2",["[78]"]]],0,0,0,0,0,0,0,"00"],"PH":["63","00","1800\\d{7,9}|(?:2|[89]\\d{4})\\d{5}|[2-8]\\d{8}|[28]\\d{7}",[6,8,9,10,11,12,13],[["(\\d)(\\d{5})","$1 $2",["2"],"(0$1)"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],["(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],["(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|8[2-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],"0"],"PK":["92","00","122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",[8,9,10,11,12],[["(\\d{3})(\\d{3})(\\d{2,7})","$1 $2 $3",["[89]0"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["1"]],["(\\d{3})(\\d{6,7})","$1 $2",["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])","9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],"(0$1)"],["(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],["(\\d{5})(\\d{5})","$1 $2",["58"],"(0$1)"],["(\\d{3})(\\d{7})","$1 $2",["3"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[24-9]"],"(0$1)"]],"0"],"PL":["48","00","6\\d{5}(?:\\d{2})?|8\\d{9}|[1-9]\\d{6}(?:\\d{2})?",[6,7,8,9,10],[["(\\d{5})","$1",["19"]],["(\\d{3})(\\d{3})","$1 $2",["11|64"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1","(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2-8]|[2-7]|8[1-79]|9[145]"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["8"]]]],"PM":["508","00","[45]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],"0"],"PR":["1","011","(?:[589]\\d\\d|787)\\d{7}",[10],0,"1",0,0,0,0,"787|939"],"PS":["970","00","[2489]2\\d{6}|(?:1\\d|5)\\d{8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"PT":["351","00","(?:[26-9]\\d|30)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"]]]],"PW":["680","01[12]","(?:[24-8]\\d\\d|345|900)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],"PY":["595","00","59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}",[6,7,8,9,10,11],[["(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],["(\\d{3})(\\d{4,5})","$1 $2",["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["87"]],["(\\d{3})(\\d{6})","$1 $2",["9(?:[5-79]|8[1-6])"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]"],"0$1"],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],"0"],"QA":["974","00","[2-7]\\d{7}|(?:2\\d\\d|800)\\d{4}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["2[126]|8"]],["(\\d{4})(\\d{4})","$1 $2",["[2-7]"]]]],"RE":["262","00","9769\\d{5}|(?:26|[68]\\d)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"],"0$1"]],"0",0,0,0,0,"26[23]|69|[89]"],"RO":["40","00","(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}",[6,9],[["(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],["(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[237-9]"],"0$1"]],"0",0,0,0,0,0,0,0," int "],"RS":["381","00","38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",[6,7,8,9,10,11,12],[["(\\d{3})(\\d{3,9})","$1 $2",["(?:2[389]|39)0|[7-9]"],"0$1"],["(\\d{2})(\\d{5,10})","$1 $2",["[1-36]"],"0$1"]],"0"],"RU":["7","810","[347-9]\\d{9}",[10],[["(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",1],["(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",1]],"8",0,0,0,0,"3[04-689]|[489]",0,"8~10"],"RW":["250","00","(?:06|[27]\\d\\d|[89]00)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]]],"0"],"SA":["966","00","92\\d{7}|(?:[15]|8\\d)\\d{8}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["9"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],"0"],"SB":["677","0[01]","(?:[1-6]|[7-9]\\d\\d)\\d{4}",[5,7],[["(\\d{2})(\\d{5})","$1 $2",["7|8[4-9]|9(?:[1-8]|9[0-8])"]]]],"SC":["248","010|0[0-2]","8000\\d{3}|(?:[249]\\d|64)\\d{5}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]|9[57]"]]],0,0,0,0,0,0,0,"00"],"SD":["249","00","[19]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[19]"],"0$1"]],"0"],"SE":["46","00","(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",[6,7,8,9,10],[["(\\d{2})(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{4})","$1-$2",["9(?:00|39|44)"],"0$1",0,"$1 $2"],["(\\d{2})(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3"],["(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{2,3})(\\d{3})","$1-$2 $3",["9(?:00|39|44)"],"0$1",0,"$1 $2 $3"],["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3 $4"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["10|7"],"0$1",0,"$1 $2 $3 $4"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["[26]"],"0$1",0,"$1 $2 $3 $4 $5"]],"0"],"SG":["65","0[0-3]\\d","(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",[8,10,11],[["(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:0[1-3]|[1-9])"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],["(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],"SH":["290","00","(?:[256]\\d|8)\\d{3}",[4,5],0,0,0,0,0,0,"[256]"],"SI":["386","00|10(?:22|66|88|99)","[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",[5,6,7,8],[["(\\d{2})(\\d{3,6})","$1 $2",["8[09]|9"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["59|8"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-57]"],"(0$1)"]],"0",0,0,0,0,0,0,"00"],"SJ":["47","00","0\\d{4}|(?:[489]\\d|[57]9)\\d{6}",[5,8],0,0,0,0,0,0,"79"],"SK":["421","00","[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",[6,7,9],[["(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],"0"],"SL":["232","00","(?:[2378]\\d|66|99)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[236-9]"],"(0$1)"]],"0"],"SM":["378","00","(?:0549|[5-7]\\d)\\d{6}",[8,10],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],["(\\d{4})(\\d{6})","$1 $2",["0"]]],0,0,"([89]\\d{5})$","0549$1"],"SN":["221","00","(?:[378]\\d{4}|93330)\\d{4}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]]]],"SO":["252","00","[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",[6,7,8,9],[["(\\d{2})(\\d{4})","$1 $2",["8[125]"]],["(\\d{6})","$1",["[134]"]],["(\\d)(\\d{6})","$1 $2",["[15]|2[0-79]|3[0-46-8]|4[0-7]"]],["(\\d)(\\d{7})","$1 $2",["24|[67]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3478]|64|90"]],["(\\d{2})(\\d{5,7})","$1 $2",["1|28|6[1-35-9]|9[2-9]"]]],"0"],"SR":["597","00","(?:[2-5]|68|[78]\\d)\\d{5}",[6,7],[["(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],["(\\d{3})(\\d{3})","$1-$2",["[2-5]"]],["(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]]],"SS":["211","00","[19]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],"0"],"ST":["239","00","(?:22|9\\d)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[29]"]]]],"SV":["503","00","[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",[7,8,11],[["(\\d{3})(\\d{4})","$1 $2",["[89]"]],["(\\d{4})(\\d{4})","$1 $2",["[267]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]]],"SX":["1","011","7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|(5\\d{6})$","721$1",0,"721"],"SY":["963","00","[1-39]\\d{8}|[1-5]\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",1]],"0"],"SZ":["268","00","0800\\d{4}|(?:[237]\\d|900)\\d{6}",[8,9],[["(\\d{4})(\\d{4})","$1 $2",["[0237]"]],["(\\d{5})(\\d{4})","$1 $2",["9"]]]],"TA":["290","00","8\\d{3}",[4],0,0,0,0,0,0,"8"],"TC":["1","011","(?:[58]\\d\\d|649|900)\\d{7}",[10],0,"1",0,"1|([2-479]\\d{6})$","649$1",0,"649"],"TD":["235","00|16","(?:22|[69]\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2679]"]]],0,0,0,0,0,0,0,"00"],"TG":["228","00","[279]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]]],"TH":["66","00[1-9]","1\\d{9}|[1689]\\d{8}|[1-57]\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"TJ":["992","810","(?:[02]0|11|[3-57-9]\\d)\\d{7}",[9],[["(\\d{6})(\\d)(\\d{2})","$1 $2 $3",["331","3317"],0,1],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],0,1],["(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3[1-5]"],0,1],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02-57-9]|11"],0,1]],"8",0,0,0,0,0,0,"8~10"],"TK":["690","00","[2-47]\\d{3,6}",[4,5,6,7]],"TL":["670","00","7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],["(\\d{4})(\\d{4})","$1 $2",["7"]]]],"TM":["993","810","[1-6]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"],["(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],"TN":["216","00","[2-57-9]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]]],"TO":["676","00","(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}",[5,7],[["(\\d{2})(\\d{3})","$1-$2",["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],["(\\d{4})(\\d{3})","$1 $2",["0"]],["(\\d{3})(\\d{4})","$1 $2",["[5-9]"]]]],"TR":["90","00","4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}",[7,10,12,13],[["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[01589]|90"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|616)","5(?:[0-59]|6161)"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",1],["(\\d{3})(\\d{3})(\\d{6,7})","$1 $2 $3",["80"],"0$1",1]],"0"],"TT":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-46-8]\\d{6})$","868$1",0,"868"],"TV":["688","00","(?:2|7\\d\\d|90)\\d{4}",[5,6,7],[["(\\d{2})(\\d{3})","$1 $2",["2"]],["(\\d{2})(\\d{4})","$1 $2",["90"]],["(\\d{2})(\\d{5})","$1 $2",["7"]]]],"TW":["886","0(?:0[25-79]|19)","[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",[7,8,9,10,11],[["(\\d{2})(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[258]0"],"0$1"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]","[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"],"0$1"],["(\\d{2})(\\d{4})(\\d{4,5})","$1 $2 $3",["7"],"0$1"]],"0",0,0,0,0,0,0,0,"#"],"TZ":["255","00[056]","(?:[26-8]\\d|41|90)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"]],"0"],"UA":["380","00","[89]\\d{9}|[3-9]\\d{8}",[9,10],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]","6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["4[45][0-5]|5(?:0|6[37])|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]","4[45][0-5]|5(?:0|6(?:3[14-7]|7))|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["[3-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0",0,0,0,0,0,0,"0~0"],"UG":["256","00[057]","800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",[9],[["(\\d{4})(\\d{5})","$1 $2",["202","2024"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[27-9]|4(?:6[45]|[7-9])"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[34]"],"0$1"]],"0"],"US":["1","011","[2-9]\\d{9}",[10],[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],0,1,"$1-$2-$3"]],"1",0,0,0,0,0,[["(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[01356]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[02357]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[0179]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-289]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01579]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}"]]],"UY":["598","0(?:0|1[3-9]\\d)","4\\d{9}|[249]\\d{7}|(?:[49]\\d|80)\\d{5}",[7,8,10],[["(\\d{3})(\\d{4})","$1 $2",["405|8|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[24]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["4"],"0$1"]],"0",0,0,0,0,0,0,"00"," int. "],"UZ":["998","810","55501\\d{4}|(?:33|[679]\\d|88)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[35-9]"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],"VA":["39","00","0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],0,0,0,0,0,0,"06698"],"VC":["1","011","(?:[58]\\d\\d|784|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","784$1",0,"784"],"VE":["58","00","[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",[10],[["(\\d{3})(\\d{7})","$1-$2",["[24-689]"],"0$1"]],"0"],"VG":["1","011","(?:284|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-578]\\d{6})$","284$1",0,"284"],"VI":["1","011","[58]\\d{9}|(?:34|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","340$1",0,"340"],"VN":["84","00","[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",1],["(\\d{4})(\\d{4,6})","$1 $2",["1"],0,1],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[69]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",1]],"0"],"VU":["678","00","[48]8\\d{3}|(?:[23]|[579]\\d\\d)\\d{4}",[5,7],[["(\\d{3})(\\d{4})","$1 $2",["[579]"]]]],"WF":["681","00","(?:[45]0|68|72|8\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[4-8]"]]]],"WS":["685","0","(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",[5,6,7,10],[["(\\d{5})","$1",["[2-5]|6[1-9]"]],["(\\d{3})(\\d{3,7})","$1 $2",["[68]"]],["(\\d{2})(\\d{5})","$1 $2",["7"]]]],"XK":["383","00","[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23]"],"0$1"]],"0"],"YE":["967","00","(?:1|7\\d)\\d{7}|[1-7]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],"0"],"YT":["262","00","80\\d{7}|(?:26|63)9\\d{6}",[9],0,"0",0,0,0,0,"269|63"],"ZA":["27","00","[1-79]\\d{8}|8\\d{4,9}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],"0"],"ZM":["260","00","(?:63|80)0\\d{6}|(?:21|[79]\\d)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[79]"],"0$1"]],"0"],"ZW":["263","00","2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",[5,6,7,8,9,10],[["(\\d{3})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],"0$1"],["(\\d)(\\d{3})(\\d{2,4})","$1 $2 $3",["[49]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["80"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2","2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)","2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["29[013-9]|39|54"],"0$1"],["(\\d{4})(\\d{3,5})","$1 $2",["(?:25|54)8","258|5483"],"0$1"]],"0"]},"nonGeographic":{"800":["800",0,"[1-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],0,0,0,0,0,0,[0,0,["[1-9]\\d{7}"]]],"808":["808",0,"[1-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],0,0,0,0,0,0,[0,0,0,0,0,0,0,0,0,["[1-9]\\d{7}"]]],"870":["870",0,"7\\d{11}|[35-7]\\d{8}",[9,12],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[35-7]"]]],0,0,0,0,0,0,[0,["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"]]],"878":["878",0,"10\\d{10}",[12],[["(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3",["1"]]],0,0,0,0,0,0,[0,0,0,0,0,0,0,0,["10\\d{10}"]]],"881":["881",0,"[0-36-9]\\d{8}",[9],[["(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[0-36-9]"]]],0,0,0,0,0,0,[0,["[0-36-9]\\d{8}"]]],"882":["882",0,"[13]\\d{6}(?:\\d{2,5})?|285\\d{9}|(?:[19]\\d|49)\\d{6}",[7,8,9,10,11,12],[["(\\d{2})(\\d{5})","$1 $2",["16|342"]],["(\\d{2})(\\d{6})","$1 $2",["4"]],["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[19]"]],["(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["34[57]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["34"]],["(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["[1-3]"]]],0,0,0,0,0,0,[0,["342\\d{4}|(?:337|49)\\d{6}|3(?:2|47|7\\d{3})\\d{7}",[7,8,9,10,12]],0,0,0,0,0,0,["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:(?:285\\d\\d|3(?:45|[69]\\d{3}))\\d|9[89])\\d{6}"]]],"883":["883",0,"51\\d{7}(?:\\d{3})?",[9,12],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],["(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["5"]]],0,0,0,0,0,0,[0,0,0,0,0,0,0,0,["51[013]0\\d{8}|5100\\d{5}"]]],"888":["888",0,"\\d{11}",[11],[["(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],0,0,0,0,0,0,[0,0,0,0,0,0,["\\d{11}"]]],"979":["979",0,"[1359]\\d{8}",[9],[["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[1359]"]]],0,0,0,0,0,0,[0,0,0,["[1359]\\d{8}"]]]}});

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/AsYouType.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/AsYouType.js ***!
  \*****************************************************************/
/*! exports provided: AsYouType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AsYouType */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function AsYouType(country) {
	return _core_index__WEBPACK_IMPORTED_MODULE_1__[/* AsYouType */ "a"].call(this, country, _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])
}

AsYouType.prototype = Object.create(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* AsYouType */ "a"].prototype, {})
AsYouType.prototype.constructor = AsYouType

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/Metadata.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/Metadata.js ***!
  \****************************************************************/
/*! exports provided: Metadata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Metadata */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function Metadata() {
	return _core_index__WEBPACK_IMPORTED_MODULE_1__[/* Metadata */ "b"].call(this, _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])
}

Metadata.prototype = Object.create(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* Metadata */ "b"].prototype, {})
Metadata.prototype.constructor = Metadata

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/PhoneNumberMatcher.js":
/*!**************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/PhoneNumberMatcher.js ***!
  \**************************************************************************/
/*! exports provided: PhoneNumberMatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PhoneNumberMatcher */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function PhoneNumberMatcher(text, options) {
	return _core_index__WEBPACK_IMPORTED_MODULE_1__[/* PhoneNumberMatcher */ "c"].call(this, text, options, _metadata__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])
}
PhoneNumberMatcher.prototype = Object.create(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* PhoneNumberMatcher */ "c"].prototype, {})
PhoneNumberMatcher.prototype.constructor = PhoneNumberMatcher


/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/findNumbers.js":
/*!*******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/findNumbers.js ***!
  \*******************************************************************/
/*! exports provided: findNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export findNumbers */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function findNumbers() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* findNumbers */ "d"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/findPhoneNumbersInText.js":
/*!******************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/findPhoneNumbersInText.js ***!
  \******************************************************************************/
/*! exports provided: findPhoneNumbersInText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export findPhoneNumbersInText */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function findPhoneNumbersInText() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* findPhoneNumbersInText */ "e"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/formatIncompletePhoneNumber.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/formatIncompletePhoneNumber.js ***!
  \***********************************************************************************/
/*! exports provided: formatIncompletePhoneNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export formatIncompletePhoneNumber */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function formatIncompletePhoneNumber() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* formatIncompletePhoneNumber */ "f"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/getCountries.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/getCountries.js ***!
  \********************************************************************/
/*! exports provided: getCountries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCountries */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function getCountries() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* getCountries */ "g"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/getCountryCallingCode.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/getCountryCallingCode.js ***!
  \*****************************************************************************/
/*! exports provided: getCountryCallingCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCountryCallingCode */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function getCountryCallingCode() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* getCountryCallingCode */ "h"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/getExampleNumber.js":
/*!************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/getExampleNumber.js ***!
  \************************************************************************/
/*! exports provided: getExampleNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getExampleNumber */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function getExampleNumber() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* getExampleNumber */ "i"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/getExtPrefix.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/getExtPrefix.js ***!
  \********************************************************************/
/*! exports provided: getExtPrefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getExtPrefix */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function getExtPrefix() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* getExtPrefix */ "j"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/isPossiblePhoneNumber.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/isPossiblePhoneNumber.js ***!
  \*****************************************************************************/
/*! exports provided: isPossiblePhoneNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isPossiblePhoneNumber */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function isPossiblePhoneNumber() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* isPossiblePhoneNumber */ "k"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/isSupportedCountry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/isSupportedCountry.js ***!
  \**************************************************************************/
/*! exports provided: isSupportedCountry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isSupportedCountry */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function isSupportedCountry() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* isSupportedCountry */ "l"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/isValidPhoneNumber.js":
/*!**************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/isValidPhoneNumber.js ***!
  \**************************************************************************/
/*! exports provided: isValidPhoneNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isValidPhoneNumber */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function isValidPhoneNumber() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* isValidPhoneNumber */ "m"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/parsePhoneNumberFromString.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/parsePhoneNumberFromString.js ***!
  \**********************************************************************************/
/*! exports provided: parsePhoneNumberFromString */
/*! exports used: parsePhoneNumberFromString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parsePhoneNumberFromString; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function parsePhoneNumberFromString() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* parsePhoneNumberFromString */ "n"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/parsePhoneNumberWithError.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/parsePhoneNumberWithError.js ***!
  \*********************************************************************************/
/*! exports provided: parsePhoneNumberWithError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parsePhoneNumberWithError */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function parsePhoneNumberWithError() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* parsePhoneNumberWithError */ "o"], arguments)
}


/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/searchNumbers.js":
/*!*********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/searchNumbers.js ***!
  \*********************************************************************/
/*! exports provided: searchNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export searchNumbers */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function searchNumbers() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* searchNumbers */ "p"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/exports/searchPhoneNumbersInText.js":
/*!********************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/exports/searchPhoneNumbersInText.js ***!
  \********************************************************************************/
/*! exports provided: searchPhoneNumbersInText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export searchPhoneNumbersInText */
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata */ "./node_modules/libphonenumber-js/min/metadata.js");
/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/index */ "./node_modules/libphonenumber-js/core/index.js");



function searchPhoneNumbersInText() {
	return Object(_metadata__WEBPACK_IMPORTED_MODULE_0__[/* withMetadata */ "b"])(_core_index__WEBPACK_IMPORTED_MODULE_1__[/* searchPhoneNumbersInText */ "q"], arguments)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/min/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/libphonenumber-js/min/metadata.js ***!
  \********************************************************/
/*! exports provided: default, withMetadata */
/*! exports used: default, withMetadata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return withMetadata; });
/* harmony import */ var _metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata.min.json.js */ "./node_modules/libphonenumber-js/metadata.min.json.js");
// Importing from `.json.js` a workaround for a bug in web browsers' "native"
// ES6 importing system which is uncapable of importing "*.json" files.
// https://github.com/catamphetamine/libphonenumber-js/issues/239

/* harmony default export */ __webpack_exports__["a"] = (_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

function withMetadata(func, _arguments) {
	var args = Array.prototype.slice.call(_arguments)
	args.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])
	return func.apply(this, args)
}

/***/ }),

/***/ "./node_modules/validator/lib/alpha.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/alpha.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commaDecimal = exports.dotDecimal = exports.farsiLocales = exports.arabicLocales = exports.englishLocales = exports.decimal = exports.alphanumeric = exports.alpha = void 0;
var alpha = {
  'en-US': /^[A-Z]+$/i,
  'az-AZ': /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[А-Я]+$/i,
  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[A-ZÆØÅ]+$/i,
  'de-DE': /^[A-ZÄÖÜß]+$/i,
  'el-GR': /^[Α-ώ]+$/i,
  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
  'fa-IR': /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'nb-NO': /^[A-ZÆØÅ]+$/i,
  'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[A-ZÆØÅ]+$/i,
  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[А-ЯЁ]+$/i,
  'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๐\s]+$/i,
  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
  'vi-VN': /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[א-ת]+$/,
  fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i
};
exports.alpha = alpha;
var alphanumeric = {
  'en-US': /^[0-9A-Z]+$/i,
  'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[0-9А-Я]+$/i,
  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[0-9A-ZÆØÅ]+$/i,
  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
  'el-GR': /^[0-9Α-ω]+$/i,
  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
  'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[0-9А-ЯЁ]+$/i,
  'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๙\s]+$/i,
  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
  'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  'vi-VN': /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[0-9א-ת]+$/,
  fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i
};
exports.alphanumeric = alphanumeric;
var decimal = {
  'en-US': '.',
  ar: '٫'
};
exports.decimal = decimal;
var englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
exports.englishLocales = englishLocales;

for (var locale, i = 0; i < englishLocales.length; i++) {
  locale = "en-".concat(englishLocales[i]);
  alpha[locale] = alpha['en-US'];
  alphanumeric[locale] = alphanumeric['en-US'];
  decimal[locale] = decimal['en-US'];
} // Source: http://www.localeplanet.com/java/


var arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
exports.arabicLocales = arabicLocales;

for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
  _locale = "ar-".concat(arabicLocales[_i]);
  alpha[_locale] = alpha.ar;
  alphanumeric[_locale] = alphanumeric.ar;
  decimal[_locale] = decimal.ar;
}

var farsiLocales = ['IR', 'AF'];
exports.farsiLocales = farsiLocales;

for (var _locale2, _i2 = 0; _i2 < farsiLocales.length; _i2++) {
  _locale2 = "fa-".concat(farsiLocales[_i2]);
  alphanumeric[_locale2] = alphanumeric.fa;
  decimal[_locale2] = decimal.ar;
} // Source: https://en.wikipedia.org/wiki/Decimal_mark


var dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
exports.dotDecimal = dotDecimal;
var commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'es-ES', 'fr-CA', 'fr-FR', 'id-ID', 'it-IT', 'ku-IQ', 'hu-HU', 'nb-NO', 'nn-NO', 'nl-NL', 'pl-PL', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS@latin', 'sr-RS', 'sv-SE', 'tr-TR', 'uk-UA', 'vi-VN'];
exports.commaDecimal = commaDecimal;

for (var _i3 = 0; _i3 < dotDecimal.length; _i3++) {
  decimal[dotDecimal[_i3]] = decimal['en-US'];
}

for (var _i4 = 0; _i4 < commaDecimal.length; _i4++) {
  decimal[commaDecimal[_i4]] = ',';
}

alpha['fr-CA'] = alpha['fr-FR'];
alphanumeric['fr-CA'] = alphanumeric['fr-FR'];
alpha['pt-BR'] = alpha['pt-PT'];
alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
decimal['pt-BR'] = decimal['pt-PT']; // see #862

alpha['pl-Pl'] = alpha['pl-PL'];
alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
decimal['pl-Pl'] = decimal['pl-PL']; // see #1455

alpha['fa-AF'] = alpha.fa;

/***/ }),

/***/ "./node_modules/validator/lib/contains.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/contains.js ***!
  \************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _toString = _interopRequireDefault(__webpack_require__(/*! ./util/toString */ "./node_modules/validator/lib/util/toString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaulContainsOptions = {
  ignoreCase: false
};

function contains(str, elem, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaulContainsOptions);
  return options.ignoreCase ? str.toLowerCase().indexOf((0, _toString.default)(elem).toLowerCase()) >= 0 : str.indexOf((0, _toString.default)(elem)) >= 0;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isAlpha.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isAlpha.js ***!
  \***********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAlpha;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAlpha(_str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0, _assertString.default)(_str);
  var str = _str;
  var ignore = options.ignore;

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '');
    } else if (typeof ignore === 'string') {
      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp');
    }
  }

  if (locale in _alpha.alpha) {
    return _alpha.alpha[locale].test(str);
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

var locales = Object.keys(_alpha.alpha);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isAlphanumeric.js":
/*!******************************************************!*\
  !*** ./node_modules/validator/lib/isAlphanumeric.js ***!
  \******************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAlphanumeric;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAlphanumeric(str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  (0, _assertString.default)(str);

  if (locale in _alpha.alphanumeric) {
    return _alpha.alphanumeric[locale].test(str);
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

var locales = Object.keys(_alpha.alphanumeric);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isAscii.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isAscii.js ***!
  \***********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAscii;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-control-regex */
var ascii = /^[\x00-\x7F]+$/;
/* eslint-enable no-control-regex */

function isAscii(str) {
  (0, _assertString.default)(str);
  return ascii.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBIC.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isBIC.js ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBIC;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBICReg = /^[A-z]{4}[A-z]{2}\w{2}(\w{3})?$/;

function isBIC(str) {
  (0, _assertString.default)(str);
  return isBICReg.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBase32.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isBase32.js ***!
  \************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase32;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base32 = /^[A-Z2-7]+=*$/;

function isBase32(str) {
  (0, _assertString.default)(str);
  var len = str.length;

  if (len % 8 === 0 && base32.test(str)) {
    return true;
  }

  return false;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBase64.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isBase64.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase64;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notBase64 = /[^A-Z0-9+\/=]/i;
var urlSafeBase64 = /^[A-Z0-9_\-]*$/i;
var defaultBase64Options = {
  urlSafe: false
};

function isBase64(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultBase64Options);
  var len = str.length;

  if (options.urlSafe) {
    return urlSafeBase64.test(str);
  }

  if (len % 4 !== 0 || notBase64.test(str)) {
    return false;
  }

  var firstPaddingChar = str.indexOf('=');
  return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBoolean.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isBoolean.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBoolean(str) {
  (0, _assertString.default)(str);
  return ['true', 'false', '1', '0'].indexOf(str) >= 0;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBtcAddress.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isBtcAddress.js ***!
  \****************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBtcAddress;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// supports Bech32 addresses
var btc = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;

function isBtcAddress(str) {
  (0, _assertString.default)(str);
  return btc.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isByteLength.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isByteLength.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isByteLength;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;

  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }

  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isCreditCard.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isCreditCard.js ***!
  \****************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCreditCard;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
/* eslint-enable max-len */

function isCreditCard(str) {
  (0, _assertString.default)(str);
  var sanitized = str.replace(/[- ]+/g, '');

  if (!creditCard.test(sanitized)) {
    return false;
  }

  var sum = 0;
  var digit;
  var tmpNum;
  var shouldDouble;

  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);

    if (shouldDouble) {
      tmpNum *= 2;

      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }

    shouldDouble = !shouldDouble;
  }

  return !!(sum % 10 === 0 ? sanitized : false);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isCurrency.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isCurrency.js ***!
  \**************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCurrency;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function currencyRegex(options) {
  var decimal_digits = "\\d{".concat(options.digits_after_decimal[0], "}");
  options.digits_after_decimal.forEach(function (digit, index) {
    if (index !== 0) decimal_digits = "".concat(decimal_digits, "|\\d{").concat(digit, "}");
  });
  var symbol = "(".concat(options.symbol.replace(/\W/, function (m) {
    return "\\".concat(m);
  }), ")").concat(options.require_symbol ? '' : '?'),
      negative = '-?',
      whole_dollar_amount_without_sep = '[1-9]\\d*',
      whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(options.thousands_separator, "\\d{3})*"),
      valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
      whole_dollar_amount = "(".concat(valid_whole_dollar_amounts.join('|'), ")?"),
      decimal_amount = "(\\".concat(options.decimal_separator, "(").concat(decimal_digits, "))").concat(options.require_decimal ? '' : '?');
  var pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : ''); // default is negative sign before symbol, but there are two other options (besides parens)

  if (options.allow_negatives && !options.parens_for_negatives) {
    if (options.negative_sign_after_digits) {
      pattern += negative;
    } else if (options.negative_sign_before_digits) {
      pattern = negative + pattern;
    }
  } // South African Rand, for example, uses R 123 (space) and R-123 (no space)


  if (options.allow_negative_sign_placeholder) {
    pattern = "( (?!\\-))?".concat(pattern);
  } else if (options.allow_space_after_symbol) {
    pattern = " ?".concat(pattern);
  } else if (options.allow_space_after_digits) {
    pattern += '( (?!$))?';
  }

  if (options.symbol_after_digits) {
    pattern += symbol;
  } else {
    pattern = symbol + pattern;
  }

  if (options.allow_negatives) {
    if (options.parens_for_negatives) {
      pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
      pattern = negative + pattern;
    }
  } // ensure there's a dollar and/or decimal amount, and that
  // it doesn't start with a space or a negative sign followed by a space


  return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
}

var default_currency_options = {
  symbol: '$',
  require_symbol: false,
  allow_space_after_symbol: false,
  symbol_after_digits: false,
  allow_negatives: true,
  parens_for_negatives: false,
  negative_sign_before_digits: false,
  negative_sign_after_digits: false,
  allow_negative_sign_placeholder: false,
  thousands_separator: ',',
  decimal_separator: '.',
  allow_decimal: true,
  require_decimal: false,
  digits_after_decimal: [2],
  allow_space_after_digits: false
};

function isCurrency(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_currency_options);
  return currencyRegex(options).test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isDataURI.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isDataURI.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDataURI;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validMediaType = /^[a-z]+\/[a-z0-9\-\+]+$/i;
var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;

function isDataURI(str) {
  (0, _assertString.default)(str);
  var data = str.split(',');

  if (data.length < 2) {
    return false;
  }

  var attributes = data.shift().trim().split(';');
  var schemeAndMediaType = attributes.shift();

  if (schemeAndMediaType.substr(0, 5) !== 'data:') {
    return false;
  }

  var mediaType = schemeAndMediaType.substr(5);

  if (mediaType !== '' && !validMediaType.test(mediaType)) {
    return false;
  }

  for (var i = 0; i < attributes.length; i++) {
    if (i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64') {// ok
    } else if (!validAttribute.test(attributes[i])) {
      return false;
    }
  }

  for (var _i = 0; _i < data.length; _i++) {
    if (!validData.test(data[_i])) {
      return false;
    }
  }

  return true;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isDecimal.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isDecimal.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDecimal;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _includes = _interopRequireDefault(__webpack_require__(/*! ./util/includes */ "./node_modules/validator/lib/util/includes.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function decimalRegExp(options) {
  var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? '' : '?', "$"));
  return regExp;
}

var default_decimal_options = {
  force_decimal: false,
  decimal_digits: '1,',
  locale: 'en-US'
};
var blacklist = ['', '-', '+'];

function isDecimal(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_decimal_options);

  if (options.locale in _alpha.decimal) {
    return !(0, _includes.default)(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
  }

  throw new Error("Invalid locale '".concat(options.locale, "'"));
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isDivisibleBy.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/isDivisibleBy.js ***!
  \*****************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDivisibleBy;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _toFloat = _interopRequireDefault(__webpack_require__(/*! ./toFloat */ "./node_modules/validator/lib/toFloat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDivisibleBy(str, num) {
  (0, _assertString.default)(str);
  return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isEAN.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isEAN.js ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEAN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The most commonly used EAN standard is
 * the thirteen-digit EAN-13, while the
 * less commonly used 8-digit EAN-8 barcode was
 * introduced for use on small packages.
 * EAN consists of:
 * GS1 prefix, manufacturer code, product code and check digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number
 */

/**
 * Define EAN Lenghts; 8 for EAN-8; 13 for EAN-13
 * and Regular Expression for valid EANs (EAN-8, EAN-13),
 * with exact numberic matching of 8 or 13 digits [0-9]
 */
var LENGTH_EAN_8 = 8;
var validEanRegex = /^(\d{8}|\d{13})$/;
/**
 * Get position weight given:
 * EAN length and digit index/position
 *
 * @param {number} length
 * @param {number} index
 * @return {number}
 */

function getPositionWeightThroughLengthAndIndex(length, index) {
  if (length === LENGTH_EAN_8) {
    return index % 2 === 0 ? 3 : 1;
  }

  return index % 2 === 0 ? 1 : 3;
}
/**
 * Calculate EAN Check Digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number#Calculation_of_checksum_digit
 *
 * @param {string} ean
 * @return {number}
 */


function calculateCheckDigit(ean) {
  var checksum = ean.slice(0, -1).split('').map(function (char, index) {
    return Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index);
  }).reduce(function (acc, partialSum) {
    return acc + partialSum;
  }, 0);
  var remainder = 10 - checksum % 10;
  return remainder < 10 ? remainder : 0;
}
/**
 * Check if string is valid EAN:
 * Matches EAN-8/EAN-13 regex
 * Has valid check digit.
 *
 * @param {string} str
 * @return {boolean}
 */


function isEAN(str) {
  (0, _assertString.default)(str);
  var actualCheckDigit = Number(str.slice(-1));
  return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isEmail.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isEmail.js ***!
  \***********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

var _isByteLength = _interopRequireDefault(__webpack_require__(/*! ./isByteLength */ "./node_modules/validator/lib/isByteLength.js"));

var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./isFQDN */ "./node_modules/validator/lib/isFQDN.js"));

var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: '',
  ignore_max_length: false
};
/* eslint-disable max-len */

/* eslint-disable no-control-regex */

var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var gmailUserPart = /^[a-z\d]+$/;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
var defaultMaxEmailLength = 254;
/* eslint-enable max-len */

/* eslint-enable no-control-regex */

/**
 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
 * @param {String} display_name
 */

function validateDisplayName(display_name) {
  var trim_quotes = display_name.match(/^"(.+)"$/i);
  var display_name_without_quotes = trim_quotes ? trim_quotes[1] : display_name; // display name with only spaces is not valid

  if (!display_name_without_quotes.trim()) {
    return false;
  } // check whether display name contains illegal character


  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);

  if (contains_illegal) {
    // if contains illegal characters,
    // must to be enclosed in double-quotes, otherwise it's not a valid display name
    if (!trim_quotes) {
      return false;
    } // the quotes in display name must start with character symbol \


    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;

    if (!all_start_with_back_slash) {
      return false;
    }
  }

  return true;
}

function isEmail(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(splitNameAddress);

    if (display_email) {
      var display_name;

      var _display_email = _slicedToArray(display_email, 3);

      display_name = _display_email[1];
      str = _display_email[2];

      // sometimes need to trim the last space to get the display name
      // because there may be a space between display name and email address
      // eg. myname <address@gmail.com>
      // the display name is `myname` instead of `myname `, so need to trim the last space
      if (display_name.endsWith(' ')) {
        display_name = display_name.substr(0, display_name.length - 1);
      }

      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }

  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
    return false;
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');
  var lower_domain = domain.toLowerCase();

  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    /*
      Previously we removed dots for gmail addresses before validating.
      This was removed because it allows `multiple..dots@gmail.com`
      to be reported as valid, but it is not.
      Gmail only normalizes single dots, removing them from here is pointless,
      should be done in normalizeEmail
    */
    user = user.toLowerCase(); // Removing sub-address from username before gmail validation

    var username = user.split('+')[0]; // Dots are not included in gmail length restriction

    if (!(0, _isByteLength.default)(username.replace('.', ''), {
      min: 6,
      max: 30
    })) {
      return false;
    }

    var _user_parts = username.split('.');

    for (var i = 0; i < _user_parts.length; i++) {
      if (!gmailUserPart.test(_user_parts[i])) {
        return false;
      }
    }
  }

  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
    max: 64
  }) || !(0, _isByteLength.default)(domain, {
    max: 254
  }))) {
    return false;
  }

  if (!(0, _isFQDN.default)(domain, {
    require_tld: options.require_tld
  })) {
    if (!options.allow_ip_domain) {
      return false;
    }

    if (!(0, _isIP.default)(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false;
      }

      var noBracketdomain = domain.substr(1, domain.length - 2);

      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
        return false;
      }
    }
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  var user_parts = user.split('.');

  for (var _i2 = 0; _i2 < user_parts.length; _i2++) {
    if (!pattern.test(user_parts[_i2])) {
      return false;
    }
  }

  if (options.blacklisted_chars) {
    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), 'g')) !== -1) return false;
  }

  return true;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isEthereumAddress.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/isEthereumAddress.js ***!
  \*********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEthereumAddress;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eth = /^(0x)[0-9a-f]{40}$/i;

function isEthereumAddress(str) {
  (0, _assertString.default)(str);
  return eth.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isFQDN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isFQDN.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_numeric_tld: false
};

function isFQDN(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_fqdn_options);
  /* Remove the optional trailing dot before checking validity */

  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }

  var parts = str.split('.');
  var tld = parts[parts.length - 1];

  if (options.require_tld) {
    // disallow fqdns without tld
    if (parts.length < 2) {
      return false;
    }

    if (!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    } // disallow spaces && special characers


    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(tld)) {
      return false;
    }
  } // reject numeric TLDs


  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
    return false;
  }

  return parts.every(function (part) {
    if (part.length > 63) {
      return false;
    }

    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    } // disallow full-width chars


    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    } // disallow parts starting or ending with hyphen


    if (/^-|-$/.test(part)) {
      return false;
    }

    if (!options.allow_underscores && /_/.test(part)) {
      return false;
    }

    return true;
  });
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isFloat.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isFloat.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFloat;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFloat(str, options) {
  (0, _assertString.default)(str);
  options = options || {};
  var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha.decimal[options.locale] : '.', "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));

  if (str === '' || str === '.' || str === '-' || str === '+') {
    return false;
  }

  var value = parseFloat(str.replace(',', '.'));
  return float.test(str) && (!options.hasOwnProperty('min') || value >= options.min) && (!options.hasOwnProperty('max') || value <= options.max) && (!options.hasOwnProperty('lt') || value < options.lt) && (!options.hasOwnProperty('gt') || value > options.gt);
}

var locales = Object.keys(_alpha.decimal);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isFullWidth.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isFullWidth.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFullWidth;
exports.fullWidth = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
exports.fullWidth = fullWidth;

function isFullWidth(str) {
  (0, _assertString.default)(str);
  return fullWidth.test(str);
}

/***/ }),

/***/ "./node_modules/validator/lib/isHSL.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isHSL.js ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHSL;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hslcomma = /^(hsl)a?\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn|\s*)(\s*,\s*(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s*(,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*)?\)$/i;
var hslspace = /^(hsl)a?\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn|\s)(\s*(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s*(\/\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*)?\)$/i;

function isHSL(str) {
  (0, _assertString.default)(str);
  return hslcomma.test(str) || hslspace.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isHalfWidth.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isHalfWidth.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHalfWidth;
exports.halfWidth = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
exports.halfWidth = halfWidth;

function isHalfWidth(str) {
  (0, _assertString.default)(str);
  return halfWidth.test(str);
}

/***/ }),

/***/ "./node_modules/validator/lib/isHash.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isHash.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHash;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lengths = {
  md5: 32,
  md4: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128,
  ripemd128: 32,
  ripemd160: 40,
  tiger128: 32,
  tiger160: 40,
  tiger192: 48,
  crc32: 8,
  crc32b: 8
};

function isHash(str, algorithm) {
  (0, _assertString.default)(str);
  var hash = new RegExp("^[a-fA-F0-9]{".concat(lengths[algorithm], "}$"));
  return hash.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isHexColor.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isHexColor.js ***!
  \**************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHexColor;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;

function isHexColor(str) {
  (0, _assertString.default)(str);
  return hexcolor.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isHexadecimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/isHexadecimal.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHexadecimal;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

function isHexadecimal(str) {
  (0, _assertString.default)(str);
  return hexadecimal.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIBAN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isIBAN.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIBAN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List of country codes with
 * corresponding IBAN regular expression
 * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
 */
var ibanRegexThroughCountryCode = {
  AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
  AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
  AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  AT: /^(AT[0-9]{2})\d{16}$/,
  AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  BA: /^(BA[0-9]{2})\d{16}$/,
  BE: /^(BE[0-9]{2})\d{12}$/,
  BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
  BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
  BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
  BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  CR: /^(CR[0-9]{2})\d{18}$/,
  CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  CZ: /^(CZ[0-9]{2})\d{20}$/,
  DE: /^(DE[0-9]{2})\d{18}$/,
  DK: /^(DK[0-9]{2})\d{14}$/,
  DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
  EE: /^(EE[0-9]{2})\d{16}$/,
  EG: /^(EG[0-9]{2})\d{25}$/,
  ES: /^(ES[0-9]{2})\d{20}$/,
  FI: /^(FI[0-9]{2})\d{14}$/,
  FO: /^(FO[0-9]{2})\d{14}$/,
  FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
  GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
  GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
  GL: /^(GL[0-9]{2})\d{14}$/,
  GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
  GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
  HR: /^(HR[0-9]{2})\d{17}$/,
  HU: /^(HU[0-9]{2})\d{24}$/,
  IE: /^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,
  IL: /^(IL[0-9]{2})\d{19}$/,
  IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
  IR: /^(IR[0-9]{2})0\d{2}0\d{18}$/,
  IS: /^(IS[0-9]{2})\d{22}$/,
  IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
  KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
  KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
  LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
  LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  LT: /^(LT[0-9]{2})\d{16}$/,
  LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
  MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
  ME: /^(ME[0-9]{2})\d{18}$/,
  MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
  MR: /^(MR[0-9]{2})\d{23}$/,
  MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
  MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
  NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
  NO: /^(NO[0-9]{2})\d{11}$/,
  PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  PL: /^(PL[0-9]{2})\d{24}$/,
  PS: /^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,
  PT: /^(PT[0-9]{2})\d{21}$/,
  QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
  RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
  RS: /^(RS[0-9]{2})\d{18}$/,
  SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
  SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
  SE: /^(SE[0-9]{2})\d{20}$/,
  SI: /^(SI[0-9]{2})\d{15}$/,
  SK: /^(SK[0-9]{2})\d{20}$/,
  SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  TL: /^(TL[0-9]{2})\d{19}$/,
  TN: /^(TN[0-9]{2})\d{20}$/,
  TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
  UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
  VA: /^(VA[0-9]{2})\d{18}$/,
  VG: /^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  XK: /^(XK[0-9]{2})\d{16}$/
};
/**
 * Check whether string has correct universal IBAN format
 * The IBAN consists of up to 34 alphanumeric characters, as follows:
 * Country Code using ISO 3166-1 alpha-2, two letters
 * check digits, two digits and
 * Basic Bank Account Number (BBAN), up to 30 alphanumeric characters.
 * NOTE: Permitted IBAN characters are: digits [0-9] and the 26 latin alphabetic [A-Z]
 *
 * @param {string} str - string under validation
 * @return {boolean}
 */

function hasValidIbanFormat(str) {
  // Strip white spaces and hyphens
  var strippedStr = str.replace(/[\s\-]+/gi, '').toUpperCase();
  var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
  return isoCountryCode in ibanRegexThroughCountryCode && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
}
/**
   * Check whether string has valid IBAN Checksum
   * by performing basic mod-97 operation and
   * the remainder should equal 1
   * -- Start by rearranging the IBAN by moving the four initial characters to the end of the string
   * -- Replace each letter in the string with two digits, A -> 10, B = 11, Z = 35
   * -- Interpret the string as a decimal integer and
   * -- compute the remainder on division by 97 (mod 97)
   * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
   *
   * @param {string} str
   * @return {boolean}
   */


function hasValidIbanChecksum(str) {
  var strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic

  var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
  var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function (char) {
    return char.charCodeAt(0) - 55;
  });
  var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function (acc, value) {
    return Number(acc + value) % 97;
  }, '');
  return remainder === 1;
}

function isIBAN(str) {
  (0, _assertString.default)(str);
  return hasValidIbanFormat(str) && hasValidIbanChecksum(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIP.js":
/*!********************************************!*\
  !*** ./node_modules/validator/lib/isIP.js ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
11.3.  Examples

   The following addresses

             fe80::1234 (on the 1st link of the node)
             ff02::5678 (on the 5th link of the node)
             ff08::9abc (on the 10th organization of the node)

   would be represented as follows:

             fe80::1234%1
             ff02::5678%5
             ff08::9abc%10

   (Here we assume a natural translation from a zone index to the
   <zone_id> part, where the Nth zone of any scope is translated into
   "N".)

   If we use interface names as <zone_id>, those addresses could also be
   represented as follows:

            fe80::1234%ne0
            ff02::5678%pvc1.3
            ff08::9abc%interface10

   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
   to the 5th link, and "interface10" belongs to the 10th organization.
 * * */
var ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _assertString.default)(str);
  version = String(version);

  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }

    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var addressAndZone = [str]; // ipv6 addresses could have scoped architecture
    // according to https://tools.ietf.org/html/rfc4007#section-11

    if (str.includes('%')) {
      addressAndZone = str.split('%');

      if (addressAndZone.length !== 2) {
        // it must be just two parts
        return false;
      }

      if (!addressAndZone[0].includes(':')) {
        // the first part must be the address
        return false;
      }

      if (addressAndZone[1] === '') {
        // the second part must not be empty
        return false;
      }
    }

    var blocks = addressAndZone[0].split(':');
    var foundOmissionBlock = false; // marker to indicate ::
    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.

    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    } // initial or final ::


    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }

        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {// it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }

    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }

    return blocks.length === expectedNumberOfBlocks;
  }

  return false;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISBN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISBN.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISBN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
var isbn13Maybe = /^(?:[0-9]{13})$/;
var factor = [1, 3];

function isISBN(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _assertString.default)(str);
  version = String(version);

  if (!version) {
    return isISBN(str, 10) || isISBN(str, 13);
  }

  var sanitized = str.replace(/[\s-]+/g, '');
  var checksum = 0;
  var i;

  if (version === '10') {
    if (!isbn10Maybe.test(sanitized)) {
      return false;
    }

    for (i = 0; i < 9; i++) {
      checksum += (i + 1) * sanitized.charAt(i);
    }

    if (sanitized.charAt(9) === 'X') {
      checksum += 10 * 10;
    } else {
      checksum += 10 * sanitized.charAt(9);
    }

    if (checksum % 11 === 0) {
      return !!sanitized;
    }
  } else if (version === '13') {
    if (!isbn13Maybe.test(sanitized)) {
      return false;
    }

    for (i = 0; i < 12; i++) {
      checksum += factor[i % 2] * sanitized.charAt(i);
    }

    if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
      return !!sanitized;
    }
  }

  return false;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISIN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISIN.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISIN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

function isISIN(str) {
  (0, _assertString.default)(str);

  if (!isin.test(str)) {
    return false;
  }

  var checksumStr = str.replace(/[A-Z]/g, function (character) {
    return parseInt(character, 36);
  });
  var sum = 0;
  var digit;
  var tmpNum;
  var shouldDouble = true;

  for (var i = checksumStr.length - 2; i >= 0; i--) {
    digit = checksumStr.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);

    if (shouldDouble) {
      tmpNum *= 2;

      if (tmpNum >= 10) {
        sum += tmpNum + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }

    shouldDouble = !shouldDouble;
  }

  return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISO31661Alpha2.js":
/*!********************************************************!*\
  !*** ./node_modules/validator/lib/isISO31661Alpha2.js ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISO31661Alpha2;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _includes = _interopRequireDefault(__webpack_require__(/*! ./util/includes */ "./node_modules/validator/lib/util/includes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
var validISO31661Alpha2CountriesCodes = ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];

function isISO31661Alpha2(str) {
  (0, _assertString.default)(str);
  return (0, _includes.default)(validISO31661Alpha2CountriesCodes, str.toUpperCase());
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISO31661Alpha3.js":
/*!********************************************************!*\
  !*** ./node_modules/validator/lib/isISO31661Alpha3.js ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISO31661Alpha3;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _includes = _interopRequireDefault(__webpack_require__(/*! ./util/includes */ "./node_modules/validator/lib/util/includes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
var validISO31661Alpha3CountriesCodes = ['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];

function isISO31661Alpha3(str) {
  (0, _assertString.default)(str);
  return (0, _includes.default)(validISO31661Alpha3CountriesCodes, str.toUpperCase());
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISO8601.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isISO8601.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISO8601;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
// from http://goo.gl/0ejHHW
var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/; // same as above, except with a strict 'T' separator between date and time

var iso8601StrictSeparator = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
/* eslint-enable max-len */

var isValidDate = function isValidDate(str) {
  // str must have passed the ISO8601 check
  // this check is meant to catch invalid dates
  // like 2009-02-31
  // first check for ordinal dates
  var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);

  if (ordinalMatch) {
    var oYear = Number(ordinalMatch[1]);
    var oDay = Number(ordinalMatch[2]); // if is leap year

    if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0) return oDay <= 366;
    return oDay <= 365;
  }

  var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
  var year = match[1];
  var month = match[2];
  var day = match[3];
  var monthString = month ? "0".concat(month).slice(-2) : month;
  var dayString = day ? "0".concat(day).slice(-2) : day; // create a date object and compare

  var d = new Date("".concat(year, "-").concat(monthString || '01', "-").concat(dayString || '01'));

  if (month && day) {
    return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
  }

  return true;
};

function isISO8601(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
  if (check && options.strict) return isValidDate(str);
  return check;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISRC.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISRC.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISRC;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// see http://isrc.ifpi.org/en/isrc-standard/code-syntax
var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;

function isISRC(str) {
  (0, _assertString.default)(str);
  return isrc.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISSN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISSN.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISSN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var issn = '^\\d{4}-?\\d{3}[\\dX]$';

function isISSN(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var testIssn = issn;
  testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
  testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');

  if (!testIssn.test(str)) {
    return false;
  }

  var digits = str.replace('-', '').toUpperCase();
  var checksum = 0;

  for (var i = 0; i < digits.length; i++) {
    var digit = digits[i];
    checksum += (digit === 'X' ? 10 : +digit) * (8 - i);
  }

  return checksum % 11 === 0;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIdentityCard.js":
/*!******************************************************!*\
  !*** ./node_modules/validator/lib/isIdentityCard.js ***!
  \******************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIdentityCard;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validators = {
  ES: function ES(str) {
    (0, _assertString.default)(str);
    var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    var charsValue = {
      X: 0,
      Y: 1,
      Z: 2
    };
    var controlDigits = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']; // sanitize user input

    var sanitized = str.trim().toUpperCase(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    } // validate the control digit


    var number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, function (char) {
      return charsValue[char];
    });
    return sanitized.endsWith(controlDigits[number % 23]);
  },
  IN: function IN(str) {
    var DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/; // multiplication table

    var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]; // permutation table

    var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]; // sanitize user input

    var sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    var c = 0;
    var invertedArray = sanitized.replace(/\s/g, '').split('').map(Number).reverse();
    invertedArray.forEach(function (val, i) {
      c = d[c][p[i % 8][val]];
    });
    return c === 0;
  },
  IT: function IT(str) {
    if (str.length !== 9) return false;
    if (str === 'CA00000AA') return false; // https://it.wikipedia.org/wiki/Carta_d%27identit%C3%A0_elettronica_italiana

    return str.search(/C[A-Z][0-9]{5}[A-Z]{2}/i) > -1;
  },
  NO: function NO(str) {
    var sanitized = str.trim();
    if (isNaN(Number(sanitized))) return false;
    if (sanitized.length !== 11) return false;
    if (sanitized === '00000000000') return false; // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer

    var f = sanitized.split('').map(Number);
    var k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
    var k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
    if (k1 !== f[9] || k2 !== f[10]) return false;
    return true;
  },
  'he-IL': function heIL(str) {
    var DNI = /^\d{9}$/; // sanitize user input

    var sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    var id = sanitized;
    var sum = 0,
        incNum;

    for (var i = 0; i < id.length; i++) {
      incNum = Number(id[i]) * (i % 2 + 1); // Multiply number by 1 or 2

      sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
    }

    return sum % 10 === 0;
  },
  'ar-TN': function arTN(str) {
    var DNI = /^\d{8}$/; // sanitize user input

    var sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    return true;
  },
  'zh-CN': function zhCN(str) {
    var provincesAndCities = ['11', // 北京
    '12', // 天津
    '13', // 河北
    '14', // 山西
    '15', // 内蒙古
    '21', // 辽宁
    '22', // 吉林
    '23', // 黑龙江
    '31', // 上海
    '32', // 江苏
    '33', // 浙江
    '34', // 安徽
    '35', // 福建
    '36', // 江西
    '37', // 山东
    '41', // 河南
    '42', // 湖北
    '43', // 湖南
    '44', // 广东
    '45', // 广西
    '46', // 海南
    '50', // 重庆
    '51', // 四川
    '52', // 贵州
    '53', // 云南
    '54', // 西藏
    '61', // 陕西
    '62', // 甘肃
    '63', // 青海
    '64', // 宁夏
    '65', // 新疆
    '71', // 台湾
    '81', // 香港
    '82', // 澳门
    '91' // 国外
    ];
    var powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
    var parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    var checkAddressCode = function checkAddressCode(addressCode) {
      return provincesAndCities.includes(addressCode);
    };

    var checkBirthDayCode = function checkBirthDayCode(birDayCode) {
      var yyyy = parseInt(birDayCode.substring(0, 4), 10);
      var mm = parseInt(birDayCode.substring(4, 6), 10);
      var dd = parseInt(birDayCode.substring(6), 10);
      var xdata = new Date(yyyy, mm - 1, dd);

      if (xdata > new Date()) {
        return false; // eslint-disable-next-line max-len
      } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
        return true;
      }

      return false;
    };

    var getParityBit = function getParityBit(idCardNo) {
      var id17 = idCardNo.substring(0, 17);
      var power = 0;

      for (var i = 0; i < 17; i++) {
        power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
      }

      var mod = power % 11;
      return parityBit[mod];
    };

    var checkParityBit = function checkParityBit(idCardNo) {
      return getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();
    };

    var check15IdCardNo = function check15IdCardNo(idCardNo) {
      var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
      if (!check) return false;
      var addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      var birDayCode = "19".concat(idCardNo.substring(6, 12));
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return true;
    };

    var check18IdCardNo = function check18IdCardNo(idCardNo) {
      var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
      if (!check) return false;
      var addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      var birDayCode = idCardNo.substring(6, 14);
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return checkParityBit(idCardNo);
    };

    var checkIdCardNo = function checkIdCardNo(idCardNo) {
      var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
      if (!check) return false;

      if (idCardNo.length === 15) {
        return check15IdCardNo(idCardNo);
      }

      return check18IdCardNo(idCardNo);
    };

    return checkIdCardNo(str);
  },
  'zh-TW': function zhTW(str) {
    var ALPHABET_CODES = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33
    };
    var sanitized = str.trim().toUpperCase();
    if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;
    return Array.from(sanitized).reduce(function (sum, number, index) {
      if (index === 0) {
        var code = ALPHABET_CODES[number];
        return code % 10 * 9 + Math.floor(code / 10);
      }

      if (index === 9) {
        return (10 - sum % 10 - Number(number)) % 10 === 0;
      }

      return sum + Number(number) * (9 - index);
    }, 0);
  }
};

function isIdentityCard(str, locale) {
  (0, _assertString.default)(str);

  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === 'any') {
    for (var key in validators) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (validators.hasOwnProperty(key)) {
        var validator = validators[key];

        if (validator(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isInt.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isInt.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInt;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
var intLeadingZeroes = /^[-+]?[0-9]+$/;

function isInt(str, options) {
  (0, _assertString.default)(str);
  options = options || {}; // Get the regex to use for testing, based on whether
  // leading zeroes are allowed or not.

  var regex = options.hasOwnProperty('allow_leading_zeroes') && !options.allow_leading_zeroes ? int : intLeadingZeroes; // Check min/max/lt/gt

  var minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
  var maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;
  var ltCheckPassed = !options.hasOwnProperty('lt') || str < options.lt;
  var gtCheckPassed = !options.hasOwnProperty('gt') || str > options.gt;
  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isJSON.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isJSON.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJSON;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var default_json_options = {
  allow_primitives: false
};

function isJSON(str, options) {
  (0, _assertString.default)(str);

  try {
    options = (0, _merge.default)(options, default_json_options);
    var primitives = [];

    if (options.allow_primitives) {
      primitives = [null, false, true];
    }

    var obj = JSON.parse(str);
    return primitives.includes(obj) || !!obj && _typeof(obj) === 'object';
  } catch (e) {
    /* ignore */
  }

  return false;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isJWT.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isJWT.js ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJWT;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isBase = _interopRequireDefault(__webpack_require__(/*! ./isBase64 */ "./node_modules/validator/lib/isBase64.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isJWT(str) {
  (0, _assertString.default)(str);
  var dotSplit = str.split('.');
  var len = dotSplit.length;

  if (len > 3 || len < 2) {
    return false;
  }

  return dotSplit.reduce(function (acc, currElem) {
    return acc && (0, _isBase.default)(currElem, {
      urlSafe: true
    });
  }, true);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLatLong.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isLatLong.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLatLong;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
var defaultLatLongOptions = {
  checkDMS: false
};

function isLatLong(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultLatLongOptions);
  if (!str.includes(',')) return false;
  var pair = str.split(',');
  if (pair[0].startsWith('(') && !pair[1].endsWith(')') || pair[1].endsWith(')') && !pair[0].startsWith('(')) return false;

  if (options.checkDMS) {
    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
  }

  return lat.test(pair[0]) && long.test(pair[1]);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLength.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isLength.js ***!
  \************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLength;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable prefer-rest-params */
function isLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;

  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }

  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  var len = str.length - surrogatePairs.length;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLocale.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isLocale.js ***!
  \************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLocale;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localeReg = /^[A-z]{2,4}([_-]([A-z]{4}|[\d]{3}))?([_-]([A-z]{2}|[\d]{3}))?$/;

function isLocale(str) {
  (0, _assertString.default)(str);

  if (str === 'en_US_POSIX' || str === 'ca_ES_VALENCIA') {
    return true;
  }

  return localeReg.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLowercase.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isLowercase.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLowercase;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLowercase(str) {
  (0, _assertString.default)(str);
  return str === str.toLowerCase();
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMACAddress.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isMACAddress.js ***!
  \****************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMACAddress;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
var macAddressNoColons = /^([0-9a-fA-F]){12}$/;
var macAddressWithHyphen = /^([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F])$/;
var macAddressWithSpaces = /^([0-9a-fA-F][0-9a-fA-F]\s){5}([0-9a-fA-F][0-9a-fA-F])$/;
var macAddressWithDots = /^([0-9a-fA-F]{4}).([0-9a-fA-F]{4}).([0-9a-fA-F]{4})$/;

function isMACAddress(str, options) {
  (0, _assertString.default)(str);

  if (options && options.no_colons) {
    return macAddressNoColons.test(str);
  }

  return macAddress.test(str) || macAddressWithHyphen.test(str) || macAddressWithSpaces.test(str) || macAddressWithDots.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMagnetURI.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isMagnetURI.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMagnetURI;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var magnetURI = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}&dn=.+&tr=.+$/i;

function isMagnetURI(url) {
  (0, _assertString.default)(url);
  return magnetURI.test(url.trim());
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMimeType.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isMimeType.js ***!
  \**************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMimeType;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Checks if the provided string matches to a correct Media type format (MIME type)

  This function only checks is the string format follows the
  etablished rules by the according RFC specifications.
  This function supports 'charset' in textual media types
  (https://tools.ietf.org/html/rfc6657).

  This function does not check against all the media types listed
  by the IANA (https://www.iana.org/assignments/media-types/media-types.xhtml)
  because of lightness purposes : it would require to include
  all these MIME types in this librairy, which would weigh it
  significantly. This kind of effort maybe is not worth for the use that
  this function has in this entire librairy.

  More informations in the RFC specifications :
  - https://tools.ietf.org/html/rfc2045
  - https://tools.ietf.org/html/rfc2046
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.1
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.5
*/
// Match simple MIME types
// NB :
//   Subtype length must not exceed 100 characters.
//   This rule does not comply to the RFC specs (what is the max length ?).
var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i; // eslint-disable-line max-len
// Handle "charset" in "text/*"

var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i; // eslint-disable-line max-len
// Handle "boundary" in "multipart/*"

var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i; // eslint-disable-line max-len

function isMimeType(str) {
  (0, _assertString.default)(str);
  return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMobilePhone.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/isMobilePhone.js ***!
  \*****************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobilePhone;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var phones = {
  'am-AM': /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
  'ar-BH': /^(\+?973)?(3|6)\d{7}$/,
  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
  'ar-LB': /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
  'ar-EG': /^((\+?20)|0)?1[0125]\d{8}$/,
  'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
  'ar-KW': /^(\+?965)[569]\d{7}$/,
  'ar-LY': /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
  'ar-MA': /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
  'ar-TN': /^(\+?216)?[2459]\d{7}$/,
  'az-AZ': /^(\+994|0)(5[015]|7[07]|99)\d{7}$/,
  'bs-BA': /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
  'bn-BD': /^(\+?880|0)1[13456789][0-9]{8}$/,
  'ca-AD': /^(\+376)?[346]\d{5}$/,
  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'de-DE': /^(\+49)?0?[1|3]([0|5][0-45-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
  'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
  'de-CH': /^(\+41|0)(7[5-9])\d{1,7}$/,
  'de-LU': /^(\+352)?((6\d1)\d{6})$/,
  'el-GR': /^(\+?30|0)?(69\d{8})$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-GB': /^(\+?44|0)7\d{9}$/,
  'en-GG': /^(\+?44|0)1481\d{6}$/,
  'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
  'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
  'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
  'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
  'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
  'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
  'en-MU': /^(\+?230|0)?\d{8}$/,
  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
  'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
  'en-PK': /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
  'en-PH': /^(09|\+639)\d{9}$/,
  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
  'en-SG': /^(\+65)?[689]\d{7}$/,
  'en-SL': /^(?:0|94|\+94)?(7(0|1|2|5|6|7|8)( |-)?\d)\d{6}$/,
  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
  'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
  'en-ZW': /^(\+263)[0-9]{9}$/,
  'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
  'es-BO': /^(\+?591)?(6|7)\d{7}$/,
  'es-CO': /^(\+?57)?([1-8]{1}|3[0-9]{2})?[2-9]{1}\d{6}$/,
  'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
  'es-CR': /^(\+506)?[2-8]\d{7}$/,
  'es-DO': /^(\+?1)?8[024]9\d{7}$/,
  'es-HN': /^(\+?504)?[9|8]\d{7}$/,
  'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  'es-ES': /^(\+?34)?[6|7]\d{8}$/,
  'es-PE': /^(\+?51)?9\d{8}$/,
  'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
  'es-PA': /^(\+?507)\d{7,8}$/,
  'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
  'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
  'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
  'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
  'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
  'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
  'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
  'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
  'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
  'ka-GE': /^(\+?995)?(5|79)\d{7}$/,
  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  'lt-LT': /^(\+370|8)\d{8}$/,
  'ms-MY': /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'ne-NP': /^(\+?977)?9[78]\d{8}$/,
  'nl-BE': /^(\+?32|0)4?\d{8}$/,
  'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[2-9]{1}\d{3}\-?\d{4}))$/,
  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
  'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'sq-AL': /^(\+355|0)6[789]\d{6}$/,
  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
  'th-TH': /^(\+66|66|0)\d{9}$/,
  'tr-TR': /^(\+?90|0)?5\d{9}$/,
  'uk-UA': /^(\+?38|8)?0\d{9}$/,
  'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
  'vi-VN': /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-6|89]))|(9([0-9])))([0-9]{7})$/,
  'zh-CN': /^((\+|00)86)?1([3568][0-9]|4[579]|6[67]|7[01235678]|9[012356789])[0-9]{8}$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
};
/* eslint-enable max-len */
// aliases

phones['en-CA'] = phones['en-US'];
phones['fr-CA'] = phones['en-CA'];
phones['fr-BE'] = phones['nl-BE'];
phones['zh-HK'] = phones['en-HK'];
phones['zh-MO'] = phones['en-MO'];
phones['ga-IE'] = phones['en-IE'];

function isMobilePhone(str, locale, options) {
  (0, _assertString.default)(str);

  if (options && options.strictMode && !str.startsWith('+')) {
    return false;
  }

  if (Array.isArray(locale)) {
    return locale.some(function (key) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }

      return false;
    });
  } else if (locale in phones) {
    return phones[locale].test(str); // alias falsey locale as 'any'
  } else if (!locale || locale === 'any') {
    for (var key in phones) {
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

var locales = Object.keys(phones);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isMongoId.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isMongoId.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMongoId;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isHexadecimal = _interopRequireDefault(__webpack_require__(/*! ./isHexadecimal */ "./node_modules/validator/lib/isHexadecimal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMongoId(str) {
  (0, _assertString.default)(str);
  return (0, _isHexadecimal.default)(str) && str.length === 24;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMultibyte.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isMultibyte.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMultibyte;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-control-regex */
var multibyte = /[^\x00-\x7F]/;
/* eslint-enable no-control-regex */

function isMultibyte(str) {
  (0, _assertString.default)(str);
  return multibyte.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isNumeric.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isNumeric.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumeric;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numericNoSymbols = /^[0-9]+$/;

function isNumeric(str, options) {
  (0, _assertString.default)(str);

  if (options && options.no_symbols) {
    return numericNoSymbols.test(str);
  }

  return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? _alpha.decimal[options.locale] : '.', "])?[0-9]+$")).test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isOctal.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isOctal.js ***!
  \***********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isOctal;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var octal = /^(0o)?[0-7]+$/i;

function isOctal(str) {
  (0, _assertString.default)(str);
  return octal.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isPassportNumber.js":
/*!********************************************************!*\
  !*** ./node_modules/validator/lib/isPassportNumber.js ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPassportNumber;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reference:
 * https://en.wikipedia.org/ -- Wikipedia
 * https://docs.microsoft.com/en-us/microsoft-365/compliance/eu-passport-number -- EU Passport Number
 * https://countrycode.org/ -- Country Codes
 */
var passportRegexByCountryCode = {
  AM: /^[A-Z]{2}\d{7}$/,
  // ARMENIA
  AR: /^[A-Z]{3}\d{6}$/,
  // ARGENTINA
  AT: /^[A-Z]\d{7}$/,
  // AUSTRIA
  AU: /^[A-Z]\d{7}$/,
  // AUSTRALIA
  BE: /^[A-Z]{2}\d{6}$/,
  // BELGIUM
  BG: /^\d{9}$/,
  // BULGARIA
  BY: /^[A-Z]{2}\d{7}$/,
  // BELARUS
  CA: /^[A-Z]{2}\d{6}$/,
  // CANADA
  CH: /^[A-Z]\d{7}$/,
  // SWITZERLAND
  CN: /^[GE]\d{8}$/,
  // CHINA [G=Ordinary, E=Electronic] followed by 8-digits
  CY: /^[A-Z](\d{6}|\d{8})$/,
  // CYPRUS
  CZ: /^\d{8}$/,
  // CZECH REPUBLIC
  DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
  // GERMANY
  DK: /^\d{9}$/,
  // DENMARK
  DZ: /^\d{9}$/,
  // ALGERIA
  EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
  // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
  ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
  // SPAIN
  FI: /^[A-Z]{2}\d{7}$/,
  // FINLAND
  FR: /^\d{2}[A-Z]{2}\d{5}$/,
  // FRANCE
  GB: /^\d{9}$/,
  // UNITED KINGDOM
  GR: /^[A-Z]{2}\d{7}$/,
  // GREECE
  HR: /^\d{9}$/,
  // CROATIA
  HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
  // HUNGARY
  IE: /^[A-Z0-9]{2}\d{7}$/,
  // IRELAND
  IN: /^[A-Z]{1}-?\d{7}$/,
  // INDIA
  IS: /^(A)\d{7}$/,
  // ICELAND
  IT: /^[A-Z0-9]{2}\d{7}$/,
  // ITALY
  JP: /^[A-Z]{2}\d{7}$/,
  // JAPAN
  KR: /^[MS]\d{8}$/,
  // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
  LT: /^[A-Z0-9]{8}$/,
  // LITHUANIA
  LU: /^[A-Z0-9]{8}$/,
  // LUXEMBURG
  LV: /^[A-Z0-9]{2}\d{7}$/,
  // LATVIA
  MT: /^\d{7}$/,
  // MALTA
  NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
  // NETHERLANDS
  PO: /^[A-Z]{2}\d{7}$/,
  // POLAND
  PT: /^[A-Z]\d{6}$/,
  // PORTUGAL
  RO: /^\d{8,9}$/,
  // ROMANIA
  RU: /^\d{2}\d{2}\d{6}$/,
  // RUSSIAN FEDERATION
  SE: /^\d{8}$/,
  // SWEDEN
  SL: /^(P)[A-Z]\d{7}$/,
  // SLOVANIA
  SK: /^[0-9A-Z]\d{7}$/,
  // SLOVAKIA
  TR: /^[A-Z]\d{8}$/,
  // TURKEY
  UA: /^[A-Z]{2}\d{6}$/,
  // UKRAINE
  US: /^\d{9}$/ // UNITED STATES

};
/**
 * Check if str is a valid passport number
 * relative to provided ISO Country Code.
 *
 * @param {string} str
 * @param {string} countryCode
 * @return {boolean}
 */

function isPassportNumber(str, countryCode) {
  (0, _assertString.default)(str);
  /** Remove All Whitespaces, Convert to UPPERCASE */

  var normalizedStr = str.replace(/\s/g, '').toUpperCase();
  return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isPort.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isPort.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPort;

var _isInt = _interopRequireDefault(__webpack_require__(/*! ./isInt */ "./node_modules/validator/lib/isInt.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPort(str) {
  return (0, _isInt.default)(str, {
    min: 0,
    max: 65535
  });
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isPostalCode.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isPostalCode.js ***!
  \****************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPostalCode;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// common patterns
var threeDigit = /^\d{3}$/;
var fourDigit = /^\d{4}$/;
var fiveDigit = /^\d{5}$/;
var sixDigit = /^\d{6}$/;
var patterns = {
  AD: /^AD\d{3}$/,
  AT: fourDigit,
  AU: fourDigit,
  AZ: /^AZ\d{4}$/,
  BE: fourDigit,
  BG: fourDigit,
  BR: /^\d{5}-\d{3}$/,
  BY: /2[1-4]{1}\d{4}$/,
  CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  CH: fourDigit,
  CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
  CZ: /^\d{3}\s?\d{2}$/,
  DE: fiveDigit,
  DK: fourDigit,
  DO: fiveDigit,
  DZ: fiveDigit,
  EE: fiveDigit,
  ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
  FI: fiveDigit,
  FR: /^\d{2}\s?\d{3}$/,
  GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
  GR: /^\d{3}\s?\d{2}$/,
  HR: /^([1-5]\d{4}$)/,
  HT: /^HT\d{4}$/,
  HU: fourDigit,
  ID: fiveDigit,
  IE: /^(?!.*(?:o))[A-z]\d[\dw]\s\w{4}$/i,
  IL: /^(\d{5}|\d{7})$/,
  IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
  IR: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
  IS: threeDigit,
  IT: fiveDigit,
  JP: /^\d{3}\-\d{4}$/,
  KE: fiveDigit,
  LI: /^(948[5-9]|949[0-7])$/,
  LT: /^LT\-\d{5}$/,
  LU: fourDigit,
  LV: /^LV\-\d{4}$/,
  MX: fiveDigit,
  MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
  MY: fiveDigit,
  NL: /^\d{4}\s?[a-z]{2}$/i,
  NO: fourDigit,
  NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
  NZ: fourDigit,
  PL: /^\d{2}\-\d{3}$/,
  PR: /^00[679]\d{2}([ -]\d{4})?$/,
  PT: /^\d{4}\-\d{3}?$/,
  RO: sixDigit,
  RU: sixDigit,
  SA: fiveDigit,
  SE: /^[1-9]\d{2}\s?\d{2}$/,
  SG: sixDigit,
  SI: fourDigit,
  SK: /^\d{3}\s?\d{2}$/,
  TH: fiveDigit,
  TN: fourDigit,
  TW: /^\d{3}(\d{2})?$/,
  UA: fiveDigit,
  US: /^\d{5}(-\d{4})?$/,
  ZA: fourDigit,
  ZM: fiveDigit
};
var locales = Object.keys(patterns);
exports.locales = locales;

function isPostalCode(str, locale) {
  (0, _assertString.default)(str);

  if (locale in patterns) {
    return patterns[locale].test(str);
  } else if (locale === 'any') {
    for (var key in patterns) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (patterns.hasOwnProperty(key)) {
        var pattern = patterns[key];

        if (pattern.test(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

/***/ }),

/***/ "./node_modules/validator/lib/isRFC3339.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isRFC3339.js ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRFC3339;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Based on https://tools.ietf.org/html/rfc3339#section-5.6 */
var dateFullYear = /[0-9]{4}/;
var dateMonth = /(0[1-9]|1[0-2])/;
var dateMDay = /([12]\d|0[1-9]|3[01])/;
var timeHour = /([01][0-9]|2[0-3])/;
var timeMinute = /[0-5][0-9]/;
var timeSecond = /([0-5][0-9]|60)/;
var timeSecFrac = /(\.[0-9]+)?/;
var timeNumOffset = new RegExp("[-+]".concat(timeHour.source, ":").concat(timeMinute.source));
var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
var partialTime = new RegExp("".concat(timeHour.source, ":").concat(timeMinute.source, ":").concat(timeSecond.source).concat(timeSecFrac.source));
var fullDate = new RegExp("".concat(dateFullYear.source, "-").concat(dateMonth.source, "-").concat(dateMDay.source));
var fullTime = new RegExp("".concat(partialTime.source).concat(timeOffset.source));
var rfc3339 = new RegExp("".concat(fullDate.source, "[ tT]").concat(fullTime.source));

function isRFC3339(str) {
  (0, _assertString.default)(str);
  return rfc3339.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isRgbColor.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isRgbColor.js ***!
  \**************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRgbColor;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rgbColor = /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/;
var rgbaColor = /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/;
var rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)/;
var rgbaColorPercent = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)/;

function isRgbColor(str) {
  var includePercentValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  (0, _assertString.default)(str);

  if (!includePercentValues) {
    return rgbColor.test(str) || rgbaColor.test(str);
  }

  return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isSemVer.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isSemVer.js ***!
  \************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSemVer;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _multilineRegex = _interopRequireDefault(__webpack_require__(/*! ./util/multilineRegex */ "./node_modules/validator/lib/util/multilineRegex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Regular Expression to match
 * semantic versioning (SemVer)
 * built from multi-line, multi-parts regexp
 * Reference: https://semver.org/
 */
var semanticVersioningRegex = (0, _multilineRegex.default)(['^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)', '(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))', '?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$'], 'i');

function isSemVer(str) {
  (0, _assertString.default)(str);
  return semanticVersioningRegex.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isSurrogatePair.js":
/*!*******************************************************!*\
  !*** ./node_modules/validator/lib/isSurrogatePair.js ***!
  \*******************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSurrogatePair;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

function isSurrogatePair(str) {
  (0, _assertString.default)(str);
  return surrogatePair.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isURL.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isURL.js ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./isFQDN */ "./node_modules/validator/lib/isFQDN.js"));

var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
options for isURL method

require_protocol - if set as true isURL will return false if protocol is not present in the URL
require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
protocols - valid protocols can be modified with this option
require_host - if set as false isURL will not check if host is present in the URL
require_port - if set as true isURL will check if port is present in the URL
allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
validate_length - if set as false isURL will skip string length validation (IE maximum is 2083)

*/
var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  validate_length: true
};
var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];

    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }

  return false;
}

function isURL(url, options) {
  (0, _assertString.default)(url);

  if (!url || /[\s<>]/.test(url)) {
    return false;
  }

  if (url.indexOf('mailto:') === 0) {
    return false;
  }

  options = (0, _merge.default)(options, default_url_options);

  if (options.validate_length && url.length >= 2083) {
    return false;
  }

  var protocol, auth, host, hostname, port, port_str, split, ipv6;
  split = url.split('#');
  url = split.shift();
  split = url.split('?');
  url = split.shift();
  split = url.split('://');

  if (split.length > 1) {
    protocol = split.shift().toLowerCase();

    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (url.substr(0, 2) === '//') {
    if (!options.allow_protocol_relative_urls) {
      return false;
    }

    split[0] = url.substr(2);
  }

  url = split.join('://');

  if (url === '') {
    return false;
  }

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');

  if (split.length > 1) {
    if (options.disallow_auth) {
      return false;
    }

    auth = split.shift();

    if (auth.indexOf(':') === -1 || auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }

  hostname = split.join('@');
  port_str = null;
  ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);

  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();

    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);

    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  } else if (options.require_port) {
    return false;
  }

  if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }

  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isUUID.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isUUID.js ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUUID;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuid = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};

function isUUID(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
  (0, _assertString.default)(str);
  var pattern = uuid[version];
  return pattern && pattern.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isUppercase.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isUppercase.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUppercase;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUppercase(str) {
  (0, _assertString.default)(str);
  return str === str.toUpperCase();
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isVariableWidth.js":
/*!*******************************************************!*\
  !*** ./node_modules/validator/lib/isVariableWidth.js ***!
  \*******************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVariableWidth;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isFullWidth = __webpack_require__(/*! ./isFullWidth */ "./node_modules/validator/lib/isFullWidth.js");

var _isHalfWidth = __webpack_require__(/*! ./isHalfWidth */ "./node_modules/validator/lib/isHalfWidth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isVariableWidth(str) {
  (0, _assertString.default)(str);
  return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/matches.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/matches.js ***!
  \***********************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matches(str, pattern, modifiers) {
  (0, _assertString.default)(str);

  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
    pattern = new RegExp(pattern, modifiers);
  }

  return pattern.test(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/toFloat.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/toFloat.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toFloat;

var _isFloat = _interopRequireDefault(__webpack_require__(/*! ./isFloat */ "./node_modules/validator/lib/isFloat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toFloat(str) {
  if (!(0, _isFloat.default)(str)) return NaN;
  return parseFloat(str);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/assertString.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/util/assertString.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    var invalidType = _typeof(input);

    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/includes.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/util/includes.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var includes = function includes(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal;
  });
};

var _default = includes;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/merge.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/util/merge.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 ? arguments[1] : undefined;

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }

  return obj;
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/multilineRegex.js":
/*!***********************************************************!*\
  !*** ./node_modules/validator/lib/util/multilineRegex.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = multilineRegexp;

/**
 * Build RegExp object from an array
 * of multiple/multi-line regexp parts
 *
 * @param {string[]} parts
 * @param {string} flags
 * @return {object} - RegExp object
 */
function multilineRegexp(parts, flags) {
  var regexpAsStringLiteral = parts.join('');
  return new RegExp(regexpAsStringLiteral, flags);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/toString.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/util/toString.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function toString(input) {
  if (_typeof(input) === 'object' && input !== null) {
    if (typeof input.toString === 'function') {
      input = input.toString();
    } else {
      input = '[object Object]';
    }
  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
    input = '';
  }

  return String(input);
}

module.exports = exports.default;
module.exports.default = exports.default;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=vendors~user.chunk.js.map