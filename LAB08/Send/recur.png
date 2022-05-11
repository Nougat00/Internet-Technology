var fibonacci = cached([0, 1], function (recur, n) {
  return recur(n - 1) + recur(n - 2);
});

var factorial = cached([1], function (recur, n) {
  return recur(n - 1) * n;
});

function cached(data, fun) {
  return function recur(i) {
    if (data[i] !== undefined) {
      return data[i];
    }
    return (data[i] = fun(recur, i));
  };
}

console.log(fibonacci(5));
