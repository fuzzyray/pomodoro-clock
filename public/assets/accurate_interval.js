/*
Copied from https://gist.githubusercontent.com/AlexJWayne/1d99b3cd81d610ac7351/raw/b672b98a9253df7705eb322cc25b9f84a4253dd1/accurate_interval.js
Reference: https://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
*/
(function() {
  window.accurateInterval = function(time, fn) {
    var cancel, nextAt, timeout, wrapper, _ref;
    nextAt = new Date().getTime() + time;
    timeout = null;
    if (typeof time === 'function') _ref = [time, fn], fn = _ref[0], time = _ref[1];
    wrapper = function() {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function() {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    };
  };
}).call(this);