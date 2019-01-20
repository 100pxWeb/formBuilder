export const setStorage = (key, state) => localStorage.setItem(key, JSON.stringify(state))

export const getStorage = (key) =>  JSON.parse(localStorage.getItem(key))