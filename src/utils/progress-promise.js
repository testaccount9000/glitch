export default ProgressPromise;

// Extend promises with `finally`
// From: https://github.com/domenic/promises-unwrapping/issues/18
if (Promise.prototype.finally == null) { Promise.prototype.finally = function(callback) {
  // We don’t invoke the callback in here,
  // because we want then() to handle its exceptions
  return this.then(
    // Callback fulfills: pass on predecessor settlement
    // Callback rejects: pass on rejection (=omit 2nd arg.)
    value =>
      Promise.resolve(callback())
        .then(() => value)
    ,
    reason =>
      Promise.resolve(callback())
        .then(function() { throw reason; })
  );
}; }

if (Promise.prototype._notify == null) { Promise.prototype._notify = function(event) {
  return this._progressHandlers.forEach(function(handler) {
    try {
      return handler(event);
    } catch (error) {
      // empty
    }
  });
}; }

if (Promise.prototype.progress == null) { Promise.prototype.progress = function(handler) {
  if (this._progressHandlers == null) { this._progressHandlers = []; }
  this._progressHandlers.push(handler);

  return this;
}; }

function ProgressPromise(fn) {
  var p = new Promise(function(resolve, reject) {
    const notify = () =>
      p._progressHandlers != null ? p._progressHandlers.forEach(function(handler) {
        try {
          return handler(event);
        } catch (error) {
          //empty
        }
      }) : undefined
    ;

    return fn(resolve, reject, notify);
  });

  p.then = function(onFulfilled, onRejected) {
    const result = Promise.prototype.then.call(p, onFulfilled, onRejected);
    // Pass progress through
    p.progress(result._notify.bind(result));

    return result;
  };

  return p;
}
