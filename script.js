// getting all required elements
const usernameBox = document.querySelector(".inputLogin");
const inputBox = document.querySelector("#inputField input");
const addBtn = document.querySelector("#inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const submitBtn = document.querySelector(".submitBtn");
const loginEle = document.querySelector(".login");
const formEle = document.querySelector(".form");
const userInfoEle = document.querySelector(".userinfo");
const logoutEle = document.querySelector(".logout");

let user = null;

console.log(deleteAllBtn);
formEle.classList.add("hidden");

// onkeyup event
inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
usernameBox.onkeyup = () => {
  let value = usernameBox.value;
  if (value.trim() !== 0) {
    submitBtn.classList.add("active");
  } else {
    submitBtn.classList.remove("active");
  }
};

submitBtn.onclick = () => {
  login();
  usernameBox.value = "";
};

logoutEle.onclick = () => {
  user = null;
  formEle.classList.add("hidden");
  loginEle.classList.remove("hidden");
};

addBtn.onclick = () => {
  //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem(user); //getting localstorage of current user
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem(user, JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
};

function showTasks() {
  let getLocalStorageData = localStorage.getItem(user);
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  console.log(listArray, user);
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if (listArray.length > 0) {
    //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem(user);
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem(user, JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
  console.log("CLICKED");
  let getLocalStorageData = localStorage.getItem(user); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    listArray = [];
  }
  localStorage.setItem(user, JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
};

function login() {
  myAudio.play();
  myAudio.volume = 0.1;
  let userEnteredValue = usernameBox.value;
  if (userEnteredValue.trim() != 0) {
    submitBtn.classList.add("active");
  } else {
    submitBtn.classList.remove("active");
    return;
  }
  user = userEnteredValue;
  userInfoEle.innerHTML = `<b>${user}'s</b> todo`;
  loginEle.classList.add("hidden");
  formEle.classList.remove("hidden");
  showTasks();
  submitBtn.classList.remove("active");
}

// song
let myAudio = new Audio("./music/lofi.mp3");
if (typeof myAudio.loop == "boolean") {
  myAudio.loop = true;
} else {
  myAudio.addEventListener(
    "ended",
    function () {
      this.currentTime = 0;
      this.play();
      myAudio.volume = 0.1;
    },
    false
  );
}
