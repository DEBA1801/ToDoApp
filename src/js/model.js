let shoppingList = [];
let completedList = [];

export const addToShoppingList = (item) => {
  const itemID = `${parseInt(
    Math.random() * 100000000
  )} - ${new Date().getTime()}`;

  shoppingList.push({
    id: itemID,
    item,
    priority: "normal",
  });
};

export const setPriority = (itemID, priority) => {
  shoppingList = shoppingList.map((item) => {
    if (item.id === itemID) {
      return {
        ...item,
        priority,
      };
    }

    return item;
  });
};

export const removeItem = (itemID) => {
  const confirm = window.confirm("Do you really want to remove the item?");
  if (confirm) {
    shoppingList = shoppingList.filter(({ id }) => id !== itemID);
    return true;
  }
  return false;
};

export const getShoppingList = () => shoppingList;

export const addToCompletedList = (itemID) => {
  const getItem = shoppingList.find(({ id }) => id === itemID);
  shoppingList = shoppingList.filter(({ id }) => id !== itemID);
  completedList = [getItem, ...completedList];
};

export const getCompletedList = () => completedList;

export const clearCompleted = () => (completedList = []);
