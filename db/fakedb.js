'use strict';

const Storage = {

  create: function (item) {
    item.id = this.nextVal++;
    this.data.push(item);
    return item;
  },

  find: function (query = {}) {
    return this.data.filter(item => Object.keys(query).every(key => item[key] === query[key]));
  },

  findById: function (id) {
    return this.data.find(item => item.id === Number(id));
  },

  findByIdAndReplace: function (id, update) {
    id = Number(id);
    
    const index = this.data.findIndex(item => item.id === Number(id));
    if (index !== -1) {
      update.id = id;
      this.data.splice(index, 1, update);
      return update;
    }   
  },

  findByIdAndUpdate: function (id, update) {
    id = Number(id);
    let item = this.findById(id);
    if (item) {
      Object.assign(item, update);
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
  },

  initialize: function(data) {
    this.nextVal = 1000;
    this.data = data.map(item => {
      item.id = this.nextVal++;
      return item;
    });
    return this;
  },

  destroy: function() {    
    this.nextVal = 1000;
    this.data = [];
    return this;
  }
};

const storage = Object.create(Storage);

module.exports = storage;
