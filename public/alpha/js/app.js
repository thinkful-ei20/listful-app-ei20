/* global $ Api Render Store */
'use strict';

class Store {
  // Setting all the store properties to null is not strictly necessary but
  // it does provide a nice way of documenting the fields
  constructor() {
    this.data = null;     // search result - array of objects (documents) 
    this.view = null;     // current view: list | details | create | edit 
    this.query = null;    // search query values
  }

  findById(id) {
    return this.data.find(item => item.id === Number(id));
  }

  findByIdAndRemove(id) {
    const index = this.data.findIndex(item => item.id === Number(id));
    if (index !== -1) {
      return this.data.splice(index, 1).length;
    } else {
      return 0;
    }
  }

  findByIdAndUpdate(id, update) {
    let item = this.findById(Number(id));
    if (item) {
      Object.assign(item, update);
    }
    return item;
  }

}

const api = new Api('/items');
const store = new Store();
const render = new Render(store, api);

$(function () {

  api.search()
    .then(response => {
      store.data = response;
      render.shoppingList();
    }).catch(err => {
      console.error(err);
    });

  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();

    const inputForm = $(event.currentTarget);
    const newItemInput = inputForm.find('input[name=shopping-list-input]');

    api.create({ name: newItemInput.val() })
      .then(response => {
        newItemInput.val('');
        store.data.unshift(response);
        render.shoppingList();
      }).catch(err => {
        console.error(err);
      });
  });

  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    event.preventDefault();
    const id = $(event.currentTarget).closest('.js-item-id-element').attr('data-item-id');
    const item = store.findById(id);

    api.update(id, { checked: !item.checked })
      .then(response => {
        item.checked = response.checked;
        render.shoppingList();
      }).catch(err => {
        console.error(err);
      });
  });

  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    event.preventDefault();
    const id = $(event.currentTarget).closest('.js-item-id-element').attr('data-item-id');

    api.remove(id)
      .then(() => {
        store.findByIdAndRemove(id);
        render.shoppingList();
      }).catch(err => {
        console.error(err);
      });
  });

  $('.js-shopping-list').on('change', '.js-shopping-item', event => {
    event.preventDefault();
    const id = $(event.currentTarget).closest('.js-item-id-element').attr('data-item-id');
    const itemUpdate = { name: $(event.currentTarget).val() };

    api.update(id, itemUpdate)
      .then(() => {
        store.findByIdAndUpdate(id, itemUpdate);
        render.shoppingList();
      }).catch(err => {
        console.error(err);
      });

  });

});
