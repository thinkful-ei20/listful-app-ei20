'use strict';
const items = require('./data/items');

console.log(items.filter((item) => item.name.includes('')));
console.log(items.find((item) => item._id === 1003));
