const updateItem = (array, payload) => {
  return [
    ...array.slice(0, payload.index),
    payload.item,
    ...array.slice(payload.index + 1)
  ];
};

const deleteItem = (array, payload) => {
  return array.filter((item, index) => index !== payload.index);
};

const addItem = (array, payload) => {
  return [...array.slice(0, payload.index), payload];
}

export {updateItem, deleteItem, addItem};
