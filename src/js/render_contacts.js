/*// HTML RENDERING & ANIMATION ////////////////////////////////*/
/**
 * function opens contact Detail Modal and calls the necessary functions to render details and HTML
 * @param {integer} index
 */
function openContactDetail(index) {
  setTimeout(() => {
    document.getElementById("contact-detail").classList.remove("slide-in");
  }, 20);

  let content = document.getElementById("contact-detail");
  let { email, initials, initialsColor, name, phone } = getContactDetails(index);

  content.innerHTML = "";
  content.innerHTML = generateContactDetail(index, name, getInitials(name), setColorForInitial(getInitials(name)), email, phone);
  setTimeout(() => {
    document.getElementById("contact-detail").classList.add("slide-in");
  }, 200);
}

/**
 * function adds style to initiate slide-in CSS animation
 */
function slideOut() {
  document.getElementById("contact-detail").classList.remove("slide-in");
}

/**
 * function calls helper functions to render all contacts in a list
 */
function renderContactList() {
  sortActiveUserContacts();
  let firstLetters = activeUserContacts.map((item) => item.name[0].toUpperCase());

  let content = document.getElementById("contact-list");
  content.innerHTML = " ";

  for (let i = 0; i < activeUserContacts.length; i++) {
    renderRegistery(i, firstLetters);
    content.innerHTML += `
        <div class="contact-box" onclick="openContactDetail(${i})">
        <div class="letters" style="background-color: ${setColorForInitial(getInitials(activeUserContacts[i].name))}">${getInitials(activeUserContacts[i].name)}</div>
        <div class="word-break">
        <div>${activeUserContacts[i]["name"]}</div>
        <div>${activeUserContacts[i]["email"]}</div>
        <div>${activeUserContacts[i]["phone"]}</div>
        </div>
        </div>
        `;
  }
}

/**
 *
 * @param {integer} i
 * @param {string} firstLetters
 * @returns function renders initials
 */
function renderRegistery(i, firstLetters) {
  if (firstLetters[i] == priorLetter) {
    return;
  } else {
    document.getElementById("contact-list").innerHTML += `
    <div class="contact-registery">${firstLetters[i]}
    `;
    priorLetter = firstLetters[i];
  }
}

/**
 * function opens AddContactDialog Modal
 */
function openAddContactDialog() {
  clearContent();

  setTimeout(() => {
    document.getElementById("add-contact-modal").classList.add("slide-in");
  }, 10);
}

/**
 * function closes prior opend dialog
 */
function closeAddContactDialog() {
  clearContent();
  document.getElementById("add-contact-modal").classList.remove("slide-in");

  setTimeout(() => {
    document.getElementById("overlay").classList.add("d-none");
  }, 200);
}

/**
 * function clears form values and css classes
 */
function clearContent() {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("info-text").classList.remove("info-text-alert");
  document.getElementById("info-text").classList.add("info-text");
  document.getElementById("info-text").innerHTML = "Tasks are better with a team!";
  document.getElementById("new-contact-name").value = "";
  document.getElementById("new-contact-email").value = "";
  document.getElementById("new-contact-phone").value = "";
  document.getElementById("new-contact-email").style.color = "black";
}

/**
 * function clears form values and css classes
 */
function clearEditContent() {
  document.getElementById("edit-contact-name").value = "";
  document.getElementById("edit-contact-email").value = "";
  document.getElementById("edit-contact-phone").value = "";
}

/**
 * function opens Edit Contact Dialog
 * @param {integer} index
 */
function openEditContactDialog(index) {
  document.getElementById("overlay2").classList.remove("d-none");
  let contact = getContactDetails(index);
  let { email, initials, initialsColor, name, phone } = contact;
  let content = document.getElementById("edit-contact-modal");
  content.innerHTML = generateContactEditDialog(index);
  document.getElementById("user-avatar").textContent = `${initials}`;
  document.getElementById("user-avatar").style = `background-color:${initialsColor}`;
  document.getElementById("edit-contact-name").value = `${name}`;
  document.getElementById("edit-contact-email").value = `${email}`;
  document.getElementById("edit-contact-phone").value = `${phone}`;
  animateEditDialog();
}

/**
 * function runs animation
 */
function animateEditDialog() {
  setTimeout(() => {
    document.getElementById("edit-contact-modal").classList.add("slide-in");
  }, 10);
}

/**
 * function closes Edit Contact Dialog
 */
function closeEditContactDialog() {
  document.getElementById("edit-contact-modal").classList.remove("slide-in");

  setTimeout(() => {
    document.getElementById("overlay2").classList.add("d-none");
  }, 200);
}

