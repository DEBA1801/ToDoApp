import Item from "./item";
import { getShoppingList, getCompletedList } from "./model";

const shoppingListDiv = document.querySelector(".shopping-list");
const completedListDiv = document.querySelector(".completed");

export const renderShoppingList = () => {
  const domNodes = getShoppingList().map(({ item, priority, id }) => {
    return Item(item, priority, id);
  });

  shoppingListDiv.innerHTML = domNodes.join("");
};

export const renderCompletedList = () => {
  const domNodes = getCompletedList().map(({ item, priority, id }) => {
    return Item(item, priority, id);
  });

  completedListDiv.innerHTML = domNodes.join("");
};
