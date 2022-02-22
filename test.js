function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

console.log(isNumber('a123'));