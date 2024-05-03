/***    Array       ***/
let usersArray = [];      // Array that holds the user list from the backend;
let activeUser = [];      // Array that holds the actiov user info;
let activeUserContacts = [];  // Array that holds the contacts of the active user;
/***    Functions   ***/

/**
 * After openning the page, calls the functions that animate the logo;
 * 
 */
async function logoAnimation() {
  transitionLogo();
  setTimeout(changeBg, 350);
  setTimeout(showCardAndHeader, 400);
  await loadUsersFromBackend();
  logInByQuickAcces();
}


/**
 * After "Log In", the function is collectiong a serial if data throw the corresponding functions
 */
async function init() {
  await includeHTML();
  await loadUsersFromBackend();
  await getActiveUser();
  await loadUserContactsFromBackend();
  await loadUserTasksFromBackend();
  getHighlight();
}

/**
 * The function provides the HTML Template.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes all code that is wrapped in the <div> with the specified attribute".
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


// Local Storage & Active user.
/**
 * The functions does save the active user in local storage.
 * 
 * @param {object} activeUser - The object contains the informations of the active user.
 */
async function saveLocalActiveUser(activeUser) {
  let stringStorage = await JSON.stringify(activeUser);
  localStorage.setItem("activeUser", stringStorage);
}


/**
 * The functions is deleting the active user in local storage.
 * 
 * @param {array} activeUser - The object contains the informations of the active user.
 */
async function deleteLocalActiveUser(activeUser) {
  window.localStorage.clear();
  activeUser = [];
}


/**
 * The function is checking is the user was already register throw local storage.
 * If user was already registered, the data of active user are collected from the Local Storage, otherwise from the URL.
 */
async function getActiveUser() {
  if (localStorage.getItem("activeUser") !== null) {
    let stringStorage = localStorage.getItem("activeUser");
    activeUser = await JSON.parse(stringStorage);
    activeUser.quickAcces = true;
  } else if (localStorage.getItem("activeUser") === null) {
    await setActiveUser(collectActiveUserFromURL())
    await saveLocalActiveUser(activeUser)
  }
}


/**
 * The functions is collecting the active user email from the UR.
 * 
 * @returns - the email of the active user.
 */
function collectActiveUserFromURL() {
  var params = new URLSearchParams(window.location.search);
  var first = params.get("first");
  var userEmail = JSON.parse(params.get("second"));
  return userEmail;
}


/**
 * The functions provides the info if the user is allowed to be saved in local storage
 * 
 * @returns - "True" or "False".
 */
async function checkIfQuickAcces() {
  goLogIn = activeUser["quickAcces"];
  return goLogIn;
}


//////////////// Backend functions /////////////
/**
 * The function is provideing the users data from the server.
 */
async function loadUsersFromBackend() {
  try {
    const response = await fetch('http://127.0.0.1:8000/users/')
    const data = await response.json();
    usersArray = data;
  } catch (error) {
    console.error(`Load users failed: ${error.message}`)
  }
}


/**
 * The function is saveing the users data in server.
 */
async function saveUserInBackend(newUser) {
  try {
    const response = await fetch('http://127.0.0.1:8000/register/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': newUser.userName,
        'email': newUser.userEmail,
        'password': newUser.userPassword
      })
    })
    .then((resp) => resp.json())
  } catch (error) {
    console.error(`Failed to save task into backend: ${error.message}`)
  }
}


///////// Backend Contacts
/**
 * function saves all specific contacts of active user in Backend under the key 'activeUserEmail'
 */
async function saveInBackendUserContacts(contact) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/contact/', {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(contact)
    })
    .then((resp) => resp.json())
  } catch (error) {
    console.error(`Failed to save task into backend: ${error.message}`)
  }
}

async function updateBackendUserContacts(contact, id) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:8000/contact/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(contact)
    })
    .then((resp) => resp.json())
  } catch (error) {
    console.error(`Failed to save task into backend: ${error.message}`)
  }
}

/**
 * function loads all spedific contacts of active user from Backend
 */
async function loadUserContactsFromBackend() {
  try {
    const response = await fetch('http://127.0.0.1:8000/contact/')
    const data = await response.json();
    activeUserContacts = data;
  } catch (error) {
    console.error(`Failed to fetch contacts: ${error.message}`)
  }
}

/**
 * function displays red alert button before final deletion of all active user contacts in Backend 
 */
function deleteUserContacts() {
  document.getElementById("delete-contact-button").classList.add("d-none");
  document.getElementById("delete-contact-button-alert").classList.remove("d-none");
}

/**
 * function aborts deletion
 */
function abortDeleteContacts() {
  document.getElementById("delete-contact-button").classList.remove("d-none");
  document.getElementById("delete-contact-button-alert").classList.add("d-none");
}

/**
 * function deletes all specific active user contacts in Backend, which are save under this key 'activeUserEmail'
 */
async function executeDeleteContacts() {
  document.getElementById("delete-contact-button-alert").classList.add("d-none");
  await backend.deleteItem(`${activeUserEmail}`);
  activeUserContacts = [];
  document.getElementById("contact-list").innerHTML = "";
  document.getElementById("contact-detail").innerHTML = "";
}


//// BACKEND Tasks
/**
 * function saves all tasks of active user in Backend under this key 'activeUserEmail_task'
 */
async function saveInBackendUserTasks(task) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/tasks/', {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(task)
    })
    .then((resp) => resp.json())
  } catch (error) {
    console.error(`Failed to save task into backend: ${error.message}`)
  }
}

async function updateUserTasks(taskID, task) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:8000/tasks/${taskID}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(task)
    })
    .then((resp) => resp.json())
  } catch (error) {
    console.error(`Failed to update task into backend: ${error.message}`)
  }
}

/**
 * function loads all active user tasks from Backend
 */
async function loadUserTasksFromBackend() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/tasks/', {
      headers: {Authorization: `Token ${token}`}
    })
    const data = await response.json();
    tasks = data;
  } catch (error) {
    console.error(`Failed to load Tasks: ${error.message}`)
  }
}

/***    Log In  &  Log Out  ***/
/**
 * The function does the procceses for the "Log In". 
 */
async function logInUser() {
  let emailUser = document.getElementById("email").value;
  let passwordUser = document.getElementById("password").value;

  try {
    const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': emailUser,
        'password': passwordUser
      })
    });
    const data = await response.json();

    if (response.ok) {
      await checkIfRmemberMe(emailUser)
      localStorage.setItem('token', data.token);
      let params = await getActiveUserURL(emailUser)
      location.href = "./src/html/summary.html?" + params.toString();
    } else {
      let validation = document.getElementById('logIn__validation');
      validation.classList.remove('d-none');
      validation.innerHTML = 'Wrong email or password'
    }
  } catch (error) {
    console.error(`Login failed: ${error.message}`)
  }
}


/**
 * The function does log is the previous user, if "Remember me" was selected.
 */
async function logInByQuickAcces() {
  if (localStorage.getItem("activeUser") !== null) {
    let stringStorage = localStorage.getItem("activeUser");
    activeUser = await JSON.parse(stringStorage);
  }
  if (activeUser.quickAcces) {
    let acces = activeUser.quickAcces;
    let emailUser = activeUser.emailUser;
    goToSummary(acces, emailUser);
  }
}


/**
 * The function does the procceses for the "Log Out". 
 */
async function logOut() {
  activeUser.quickAcces = false;
  window.localStorage.clear();
  toLogInPage();
}

/**
 * The funtion is checking if the user decided to be saved local.
 * 
 * @param {string} emailUser - Value coresponding to the email given by the user.
 */
async function checkIfRmemberMe(emailUser) {
  let checkbox = callCheckBox();
  if (checkbox) {
    await setActiveUser(emailUser);
    activeUser.quickAcces = true;
    await saveLocalActiveUser(activeUser)
  } else {
    await deleteLocalActiveUser(activeUser);
  }
}

/**
 * The function forwards to "Log In" page.
 */
function toLogInPage() {
  window.location.href = "./../../index.html";
}

/**
 * The function shows the HTML element where the "Log Out" button is situated.
 */
function toLogOut() {
  const target = document.getElementById('userPhoto');
  document.addEventListener('click', (event) => {
    const withinBoundaries = event.composedPath().includes(target)
    const tologOut = document.getElementById('logOut__btn--container');
    if (withinBoundaries) {
      tologOut.classList.remove('d-none');
    } else {
      tologOut.classList.add('d-none');
    }
  });
}

/**
 * The function is taking the first letter from each word and creates a new word. 
 * 
 * @param {string} newName - Value coresponding to the givin name from the new user.
 * @returns - A string made with the first letter of each word from "newName".
 */
function getInitials(newName) {
  let names = newName.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  } else if (names.length == 1) {
    initials = newName.substring(0, 2).toUpperCase();
  }
  return initials;
}

/**
 *
 * @param {string} initials
 * @returns a string that represents one of 5 possible rgb colors
 */
function setColorForInitial(initials) {
  let number = 0;
  for (let i = 0; i < initials.length; i++) {
    let letterNumber = initials.charCodeAt(i) - 64;
    number = number + letterNumber;
  }
  let remainder = number % 5;
  if (remainder === 0) {
    return "rgb(221,70,60)";
  } else if (remainder === 1) {
    return "rgb(252,188,201)";
  } else if (remainder === 2) {
    return "rgb(99,191,215)";
  } else if (remainder === 3) {
    return "rgb(253,197,38)";
  } else return "rgb(128,168,77)";
}

/**
 * function renders all active user contacs into Contacts Edit DropDown
 * @param {integer} taskID
 */
function renderContactsInEditDropDown(taskID) {
  content = document.getElementById("collapseContactsEdit");
  content.innerHTML = " ";
  for (let i = 0; i < activeUserContacts.length; i++) {
    let name = activeUserContacts[i]["name"];
    content.innerHTML += `
      <label class="dropdown-contact" for="${name}">
        ${name}
        <input type="checkbox" ${assignedToContactTrue(taskID, name) ? "checked" : ""} id="${name}" name="assign-contacts" value="${name}">
      </label>
  `;
  }
}

/**
 * function gets arry activeUserContacts and renders drop-down in Add-Task Dialog
 */
function renderContactsInDropDown() {
  content = document.getElementById("collapseContacts");
  content.innerHTML = " ";
  for (let i = 0; i < activeUserContacts.length; i++) {
    let name = activeUserContacts[i]["name"];
    content.innerHTML += `
      <label class="dropdown-contact" onclick="event.stopPropagation()" for="${name}">
        ${name}
        <input type="checkbox" id="${name}" name="assign-contacts" value="${name}">
      </label>
      `;
  }
}

/**
 * function searches task to derive contact names that are assign to task
 * @param {integer} taskID
 * @param {string} name
 * @returns
 */
function assignedToContactTrue(taskID, name) {
  let checkedNames = [];
  if (findTaskWithId(taskID)["assigned_to"] != null) {
    for (let i = 0; i < findTaskWithId(taskID)["assigned_to"].length; i++) {
      checkedNames.push(findTaskWithId(taskID)["assigned_to"][i].name);
    }
    return checkedNames.includes(name);
  }
}


function dropdownFields() {
  document.getElementById("add-task-modal").addEventListener("click", function (event) {
    // if the clicked element isn't child of the navbar, you must close it if is open
    if (!event.target.closest("add-task-modal") && document.getElementById("collapseContacts").classList.contains("show") && event.target.parentElement.className != 'dropdown-contact') {
      document.getElementById("contact-dropdown").click();
    } else if (!event.target.closest("add-task-modal") && document.getElementById("collapseCategory").classList.contains("show")) {
      document.getElementById("category-dropdown").click();
    }
  });
}


