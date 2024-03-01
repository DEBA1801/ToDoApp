import {
  addToShoppingList,
  setPriority,
  removeItem,
  addToCompletedList,
  getCompletedList,
  clearCompleted,
} from "./model";
import { renderCompletedList, renderShoppingList } from "./view";

const itemInput = document.querySelector("input[name='itemInput']");
const shoppingListDiv = document.querySelector(".shopping-list");
const completedDiv = document.querySelector(".completed");
const clearCompletedBtn = document.querySelector("#clear-completed");

itemInput.addEventListener("keyup", function (evt) {
  if (evt.key === "Enter") {
    // Add to shopping list
    addToShoppingList(this.value);
    // Update the view
    renderShoppingList();
    //clear input field on pressing enter
    this.value = "";
  }
});

shoppingListDiv.addEventListener("click", function (evt) {
  //priority
  if (evt.target.parentElement.classList.contains("priority-control")) {
    const priority = evt.target.classList.value;
    const itemID =
      evt.target.parentElement.parentElement.getAttribute("data-id");

    //Set Priority
    setPriority(itemID, priority);

    //Render View
    renderShoppingList();
  }

  // Remove button
  if (evt.target.classList.contains("remove-btn")) {
    const itemID = evt.target.parentElement.getAttribute("data-id");
    //if the item is deleted, update the view
    if (removeItem(itemID)) {
      renderShoppingList();
    }
  }
});

shoppingListDiv.addEventListener("dragstart", function (evt) {
  if (evt.target.classList.contains("item")) {
    const getId = evt.target.getAttribute("data-id");
    evt.dataTransfer.setData("text/plain", getId);
  }
});

completedDiv.addEventListener("drop", function (evt) {
  const itemID = evt.dataTransfer.getData("text/plain");
  if (itemID) {
    //Add to completed list
    addToCompletedList(itemID);
    //update shopping list
    renderShoppingList();
    //update completed task list
    renderCompletedList();
  }
});

completedDiv.addEventListener("dragover", function (evt) {
  evt.preventDefault();
});

clearCompletedBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  clearCompleted();
  renderCompletedList();
});
