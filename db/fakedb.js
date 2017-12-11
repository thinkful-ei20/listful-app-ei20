'use strict';

const Storage = {
  create: function (item) {
    item.id = this.nextVal++;
    this.data.push(item);
    return item;
  },
  find: function (query = {}) {
    if (query) {
      return this.data.filter(item => Object.keys(query).every(key => item[key] === query[key]));
    } else {
      return this.data;
    }
  },
  findById: function (id) {
    return this.data.find(item => item.id === Number(id));
  },
  findByIdAndUpdate: function (id, update) {
    let item = this.findById(Number(id));
    if (item) {
      Object.assign(item, update);
    }
    return item;
  },
  findByIdAndReplace: function (id, update) {
    let item = this.findById(Number(id));
    if (item) {
      item = update;
    }
    return item;
  },
  findByIdAndRemove: function (id) {
    const index = this.data.findIndex(item => item.id === Number(id));
    if (index !== -1) {
      return this.data.splice(index, 1).length;
    } else {
      return 0;
    }
  }
};

module.exports = function (data) {
  const storage = Object.create(Storage);
  storage.nextVal = 1000;
  storage.data = data.map(item => {
    item.id = storage.nextVal++;
    return item;
  });

  storage.restore = function () {
    storage.nextVal = 1000;
    storage.data = data.map(item => {
      item.id = storage.nextVal++;
      return item;
    });
  };

  return storage;
};