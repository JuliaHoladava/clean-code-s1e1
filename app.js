//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//Create new task list item
var createNewTaskElement = function(taskString) {

  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input");
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input");
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.className = "item-task";

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  checkBox.className = "input-checkbox";

  editInput.type = "text";
  editInput.className = "input-text task";

  editButton.innerText = "Edit";
  editButton.className = "edit-button";

  deleteButton.className = "delete-button";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "button-img";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  console.log(listItem);
  return listItem;
}

// Add a new task
var addTask = function() {

  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

var editTask = function() {

  var listItem = this.parentNode;

  var editInput = listItem.querySelector(".input-text");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit-button");
  var containsClass = listItem.classList.contains("edit-mode");

  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    label.classList.toggle("label-edit-task");
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    label.classList.toggle("label-edit-task");
  }

  listItem.classList.toggle("edit-mode");
};

var deleteTask = function() {

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {

  var listItem = this.parentNode;
  var label = listItem.querySelector("label");

  completedTasksHolder.appendChild(listItem);
  label.classList.toggle("completed-label");
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete.
var taskIncomplete = function() {

  var listItem = this.parentNode;
  var label = listItem.querySelector("label");

  incompleteTaskHolder.appendChild(listItem);
  label.classList.remove("completed-label");
  bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);

//
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){

  var checkBox = taskListItem.querySelector(".input-checkbox");
  var editButton = taskListItem.querySelector(".edit-button");
  var deleteButton = taskListItem.querySelector(".delete-button");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}