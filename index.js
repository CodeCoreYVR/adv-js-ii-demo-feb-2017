// Logger is an higher-order function that takes a function as argument. It logs
// the functions return value, then returns that value

// the fn argument is a callback. Logger will call it at some point inside its body
/*
const logger = function (fn, args) {
  const result = fn(args);
  console.log('Log: ', result);
  return result;
}
*/

// gamble returns an integer between 0 and n
const gamble = function (n) {
  return Math.floor(Math.random() * n);
}

// Exercise: Pass Logging Function as Argument

// loggerFn is callback that should be a function that log to standard output
// or console or a file
// 👇 (NEW!) Gather
// ...args will gather all the leftover arguments into an array of the name `args`
const logger = function (loggerFn, fn, ...args) {
  // 👇 pauses execution of your javascript program where the keyword debugger is
  // written. This gives you a live console in the same scope as debugger and a bunch
  // of other useful debugging tools
  // debugger
  // 👇 (NEW!) Spread
  // fn(...args) (assuming args is an array) will apply every element of args as
  // individual argumets to fn
  const result = fn(...args);
  loggerFn('Log: ', result);
  return result;
}

// add returns the sum of arguments a & b
const add = function (a, b) { return a + b }

// example usage:
/*
> logger(console.info, add, 10, 12)
index.js:33 Log:  22
< 22

> logger(console.info, add, 10, 15)
index.js:33 Log:  25
< 25
*/

// DEMO: Implement each

// each is an higher-order function takes a callback and an array (or, a list like
// object). It calls the callback with every element from the array in order
function each(fn, arr) {
  for (let index = 0, max = arr.length; index < max; index += 1) {
    // the passed in callback, fn, will be called with the value of the element
    // (i.e. arr[index]), the index of the current element and the array itself
    fn(arr[index], index, arr)
  }
}

// example usage:
/*
each(function (value, index, arr) {
    console.info('Ele: ', value, 'Index: ', index, 'arr: ', arr)
  },
  [1,23,4,5,6,7,8]
)

VM610:2 Ele:  1 Index:  0 arr:  [1, 23, 4, 5, 6, 7, 8]
VM610:2 Ele:  23 Index:  1 arr:  [1, 23, 4, 5, 6, 7, 8]
VM610:2 Ele:  4 Index:  2 arr:  [1, 23, 4, 5, 6, 7, 8]
VM610:2 Ele:  5 Index:  3 arr:  [1, 23, 4, 5, 6, 7, 8]
VM610:2 Ele:  6 Index:  4 arr:  [1, 23, 4, 5, 6, 7, 8]
VM610:2 Ele:  7 Index:  5 arr:  [1, 23, 4, 5, 6, 7, 8]
VM610:2 Ele:  8 Index:  6 arr:  [1, 23, 4, 5, 6, 7, 8]
*/

// Exercise: Implement map
// Iterative implementation of map
function map(fn, arr) {
  let outArr = [];
  for (let index = 0, max = arr.length; index < max; index += 1) {
    outArr.push(fn(arr[index], index, arr));
  }
  return outArr;
}

// Recursive implementation of map
function rmap(fn, arr, i = 0) {
  // end clause when there is nothing
  // in the first element
  return arr[0] === undefined
    ? []
    : [fn(arr[0], i), ...rmap(fn, arr.slice(1), i + 1)]
}

const repeatDigit = function (digit, n) {
  return Number(
    `${digit}`.repeat(n + 1)
  );
}

// Demo: Call Stack
// assign console.log function to variable named l
// to save time writing console.log
const l = console.log;
function callStackDemo () {
  debugger;
  function a () { l('This is a'); }
  function b () { a(); l('This is b'); }
  function c () { b(); l('This is c'); }
  function d () { c(); l('This is d'); }
  function e () { d(); l('This is e'); }

  e();
}

// Demo: Delay Logging one second

const delayedLogger = function (delay, loggerFn, fn, ...args) {
  const result = fn(...args);
  // setTimeout is a global function that will call a callback fn
  // a delay in milliseconds later. The first argument is the callback function.
  // The second argument is the delay in milliseconds.
  setTimeout(function () { loggerFn('Log: ', result) }, delay);
  return result;
}

// Exercise: Log every second
const everySecondLogger = function (loggerFn, fn, ...args) {
  const result = fn(...args);
  setInterval(function () { loggerFn('Log: ', result) }, 1000);
  return result;
}

// Demo: Call Stack with asynchronous function
function asyncCallStackDemo () {
  debugger;
  function a () { l('This is a'); }
  function b () { a(); l('This is b'); }
  function c () { b(); l('This is c'); }
  function d () { debugger; c(); l('This is d'); }
  function e () { setTimeout(d, 1000); d(); l('This is e'); }

  e();
}

// setInterval and setTimeout can be cancelled
// they both return a number which represent their id
// use the functions clearInterval and clearTimeout, respectively, with their
// returned ids to cancel the interval or timeout
const intervalId = setInterval(
  function () { console.log('1000ms went by... ⌛️') },
  1000
);

clearInterval(intervalId) // 👈 this ends the setInterval declared above

// Demo: What!? Logger is evolving!

// Implement a logger named logWith that instead of calling callback immediately
// it'll return a new version the callback that logs
function logWith(loggerFn, fn) {
  return function (...args) {
    // the function return by logWith should return the same thing as its given
    // callback, fn
    const result = fn(...args);

    loggerFn(result);
    return result;
  }
}

/* example usage: */
// louderGamble will be a function that just passes all its arguments to its
// callback, gamble. Logs gamble's return value and returns it.
const louderGamble = logWith(
  function (result) {
    console.log('You rolled: ', result)
  }, gamble
);

// Exercise: Add log message to logWith

function decider () {
  return ['yes', 'no'][Math.floor(Math.random() * 2)]
}

function logWithComment(loggerFn, comment, fn) {
  // the returned function below holds on to the scope of logWithComment
  // at the moment it was declared. It can do this because of closures.
  return function (...args) {
    const result = fn(...args);

    loggerFn(comment, result);
    return result;
  }
}

// Exercise: Create a higher-order function once that will only allow the new function
// to return a value once

/* example usage:
const add = function (a, b) { return a + b};
add(1,1) // returns 2
add(1,3) // returns 4
const addOnce = once(add);
addOnce(1,1) // returns 2
addOnce(1,3) // returns 2
addOnce(2,3) // returns 2
*/

function once (fn) {
  let result;
  return function (...args) {
    // if the result variable is undefined,
    // assign it the return of the callback with its args
    if (result === undefined) {
      result = fn(...args);
    }
    // always return the result
    return result;
  }
}

// Exercise: Create until function...

function until (fn, delay) {
  let result, timeoutId, isComplete = false;

  return function (...args) {
    // we're check the timeoutId variable if its been assigned to make sure
    // we only use setTimeout once
    if (timeoutId === undefined) {
      timeoutId = setTimeout(
        // after delay milliseconds, the following callback is
        // called and sets isComplete to true
        // which will block setting new results below
        function () { isComplete = true },
        delay
      );
    }

    // the function only allows new results to be assigned from the return
    // value of fn while isComplete is not true
    if (isComplete !== true) {
      result = fn(...args)
    }

    return result
  }
}

























/* */
