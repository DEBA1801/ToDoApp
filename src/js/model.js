import { saveToStore, getFromStore } from "./storage";

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

  saveToStore({
    shoppingList,
    completedList,
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

  saveToStore({
    shoppingList,
    completedList,
  });
};

export const removeItem = (itemID) => {
  shoppingList = shoppingList.filter(({ id }) => id !== itemID);
  saveToStore({
    shoppingList,
    completedList,
  });
};

export const getShoppingList = () => shoppingList;

export const addToCompletedList = (itemID) => {
  const getItem = shoppingList.find(({ id }) => id === itemID);
  shoppingList = shoppingList.filter(({ id }) => id !== itemID);
  completedList = [getItem, ...completedList];

  saveToStore({
    shoppingList,
    completedList,
  });
};

export const getCompletedList = () => completedList;

export const clearCompleted = () => {
  completedList = [];
  saveToStore({
    shoppingList,
    completedList,
  });
};

export const bootUp = () => {
  const { active, completed } = getFromStore();
  shoppingList = active;
  completedList = completed;
};
