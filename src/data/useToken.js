/* eslint-disable import/prefer-default-export */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

export const localStorageHelper = {
    load(key) {
        const stored = localStorage.getItem(key);
        return !stored ? undefined : JSON.parse(stored);
    },
    store(key, value) {
        console.log(value);
        localStorage.setItem(key, JSON.stringify(value));
    },
    modify(key, fn) {
        this.store(key, fn(this.load(key)));
    },
    appendItemToArray: (item, storageID) => {
        this.modify(storageID, (storage = []) => [...storage, item]);
    },
    removeItemFromArray: (item, storageID) => {
        this.modify(storageID, (storage = []) => storage.filter((s) => s !== item));
    },
    saveItemToObject: (item, storageID) => {
        this.modify(storageID, (storage = {}) => ({ ...storage, item }));
    }
};