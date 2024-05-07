function generateTodoHTML(task, i) {
  return `
      <div id="${task["id"]}" draggable="true" ondragstart="startDragging(${task["id"]}); rotateTask(); highlight()" onclick="openAddTaskDialog('task-overlay', 'task-modal', ${task["id"]})" class="board-task">
          <span class="department ${task["category"]["color"]}">${task["category"]["title"]}</span>
          <span class="task-headline">${task["title"]}</span>
          <span class="task-description">${task["description"]}</span>
          <div class="progress-container d-none" id="progress-container${task["id"]}">
              <div class="progress" style="height: 8px;">
                  <div class="progress-bar" id="progress-bar${i}" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span><span id="progress-report${i}"></span></span>
          </div>
          <div class="contact-and-urgency">
              <div class="task-contacts-container" id="task-contacts-container${task["id"]}">
              </div>
              <div class="task-urgency">
                  <img src="../img/priority-${task["urgency"]}-icon.png" alt="urgency">
              </div>
          </div>
      </div>
      `;
}

function generateAssignedContactsHTML(contact, color) {
  return `
          <div style="background-color:${color}" class="task-contacts">${contact}</div>
      `;
}

// function generateTaskProcessStatus(taskID) {
//   let currentTaskStatus = taskID["process_status"];
//   let content = document.getElementById("current-process-status");
//   return (content.innerHTML = `Process-Status:&nbsp;<b>${currentTaskStatus}</b>  
//         `);
// }

// function generateTaskProcessStatusforEditDialog(taskID) {
//   let currentTaskStatus = findTaskWithId(taskID)["process_status"];
//   let content = document.getElementById("tasks_moveTo");
//   if (currentTaskStatus === "to-do") {
//     return (content.innerHTML = `
//                               <option value="to-do" selected>To do</option>
//                               <option value="in-progress">In progress</option>
//                               <option value="await-feedback">Await feedback</option>
//                               <option value="done">Done</option>

//     `);
//   } else if (currentTaskStatus === "await-feedback") {
//     return (content.innerHTML = `
//                               <option value="to-do">To do</option>
//                               <option value="in-progress">In progress</option>
//                               <option value="await-feedback" selected>Await feedback</option>
//                               <option value="done">Done</option>

//     `);
//   } else if (currentTaskStatus === "in-progress") {
//     return (content.innerHTML = `
//                               <option value="to-do">To do</option>
//                               <option value="in-progress" selected>In progress</option>
//                               <option value="await-feedback">Await feedback</option>
//                               <option value="done">Done</option>

//     `);
//   } else {
//     return (content.innerHTML = `
//                                   <option value="to-do">To do</option>
//                                   <option value="in-progress">In progress</option>
//                                   <option value="await-feedback">Await feedback</option>
//                                   <option value="done" selected>Done</option>
    
//         `);
//   }
// }

function generateTaskModalHTML(task) {
  return `
          <div class="task-modal-container">
                      <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                          onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                      <span class="department department-overlay ${task["category"]["color"]}">${task["category"]["title"]}</span>
                      <h3 class="task-headline-overlay">${task["title"]}</h3>
                      <span class="task-description-overlay">${task["description"]}</span>

                      <div class="due-date-container">
                          <span>Due date:</span>
                          <span>${task["due_date"]}</span>
                      </div>
                      <div class="prio-container">
                          <span>Priority:</span>
                          <img id="prio-overlay" src="../img/prio-overlay-${task["urgency"]}.png" alt="prio-overlay">
                      </div>
                      <div class="assigned-to-container">
                          <span>Assigned To:</span>
                          <div class="assigned-contacts" id="assigned-contacts${task["id"]}">  
                          </div>
                      </div>
                      <div class="assigned-to-container">
                          <span>Subtasks</span>
                          <div class="input-check" id="subtasks${task["id"]}"></div>
                          </div>
                      </div>
                      <div class="edit-delete-btn-container">
                        <button class="btn-add-task edit-btn" onclick="deleteTask(${task["id"]})">
                            <img onmouseover="this.src='../img/delete-icon-hover.png'" onmouseout="this.src='../img/delete-icon.png'" src="../img/delete-icon.png" alt="">
                        </button>
                        |
                        <button class="btn-add-task edit-btn" onclick="editTasks(${task["id"]})">
                            <img onmouseover="this.src='../img/edit-icon-hover.png'" onmouseout="this.src='../img/edit-icon.png'" src="../img/edit-icon.png" alt="">
                        </button>
                      </div>
                  </div>
      `;
}

function generateTaskModalContactsHTML(contactInitials, contact, color) {
  return `
          <div class="assigned-contact-row">
              <div style="background-color:${color}" class="task-contacts-overlay">${contactInitials}</div>
              <span>${contact}</span>
          </div>
      `;
}

function generateTaskModalContactsInitialsHTML(contactInitials, contact, color) {
  return `
          <div class="assigned-contact-initials">
              <div style="background-color:${color}" class="task-contacts-overlay">${contactInitials}</div>
          </div>
      `;
}

function generateEditTaskHTML(task) {
  return `
      <div class="task-modal-container">
                      <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                          onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                          <form class="edit-task">
                          <div class="form-width input-title margin-btn-25">
                              <input id="edit-headline${task["id"]}" class="add-title input-title-font" type="text" placeholder="Enter a title" value="${task["title"]}">
                          </div>
                          <div class="description-area description-area-overlay flex-column margin-btn-45">
                              <span class="category-header">Description</span>
                              <textarea class="edit-description" name="" id="edit-description${task["id"]}" cols="30" rows="5"
                                  placeholder="Enter a Description">${task["description"]}</textarea>
                          </div>
                          <div class="date-area flex-column margin-btn-45">
                              <span class="category-header">Due date</span>
                              <input id="edit-date${task["id"]}" class="uniform-sizing date" type="date" value="${task["due_date"]}">
                          </div>
                          <div class="button-area margin-btn-56">
                              <button type="button" value="high" class="add-task-prio-high" id="edit-high" onclick="checkButton('edit-high')" onmouseover="hoverButton('edit-high')" onmouseleave="leaveHoverButton('edit-high')">
                              <input type="radio" id="edit-high-prio" name="prio-edit" value="high">
                              <label for="edit-high-prio">
                                  <span class="priority-button-text text-19pt">Urgent</span>
                                  <img src="../img/prio_bnt_urgent.png" alt="">
                              </label>
                              </button>
                              <button type="button" value="medium" class="add-task-prio-medium" id="edit-medium" onclick="checkButton('edit-medium')" onmouseover="hoverButton('edit-medium')" onmouseleave="leaveHoverButton('edit-medium')">
                                  <input type="radio" id="edit-medium-prio" name="prio-edit" value="medium">
                                  <label for="edit-medium-prio">
                                      <span class="priority-button-text text-19pt">Medium</span>
                                      <img src="../img/prio_bnt_medium.png" alt="">
                                  </label>
                              </button>
                              <button type="button" value="low" class="add-task-prio-low" id="edit-low" onclick="checkButton('edit-low')" onmouseover="hoverButton('edit-low')" onmouseleave="leaveHoverButton('edit-low')">
                                  <input type="radio" id="edit-low-prio" name="prio-edit" value="low">
                                  <label for="edit-low-prio">
                                      <span class="priority-button-text text-19pt">Low</span>
                                      <img src="../img/prio_bnt_low.png" alt="">
                                  </label>
                              </button>
                          </div>
                          <div class="uniform-sizing text-19pt dropdown" role="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseContactsEdit" aria-expanded="false" aria-controls="collapseContactsEdit" id="contact-dropdown-edit">
                              <span>Select contacts to assign</span>
                              <img src="../img/select-arrow.png" alt="">
                          </div>
                          <div class="assigned-contacts-initials" id="assigned-contacts">  
                          </div>
                          <div class="subtasks-input-area d-none" id="contact-input-area-edit">
                              <input class="" type="email" placeholder="Contact email" id="contact-input-edit" required>
                              <div class="subtask-icons">
                                  <img onclick="closeContactInput('contact-input-area-edit', 'contact-dropdown-edit', 'contact-input-edit')" class="cursor-pointer"
                                      src="../img/cancel-subtask.png" alt="">
                                  <img src="../img/subtask-line.png" alt="">
                                  <img onclick="addContact()" class="cursor-pointer" src="../img/check-subtask.png"
                                      alt="">
                              </div>
                          </div>
                          <div class="margin-btn-25 assign-contact-container" id="contact-container-edit">
                              <div class="dropdown-contacts-container collapse scroll" id="collapseContactsEdit">
                                  <div class="dropdown-contact" onclick="openContactInput('contact-dropdown-edit', 'contact-input-area-edit', 'contact-input-edit')" role="button" data-bs-toggle="collapse"
                                  data-bs-target="#collapseContactsEdit" aria-expanded="false" aria-controls="collapseContactsEdit" id="contact-dropdown-edit">
                                      <label for="">Invite new contact</label>
                                      <img src="../img/new-contact-icon.png" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="subtasks-area margin-btn-45">
                          <span class="category-header margin-btn-25">Subtasks</span>
                          <!--
                          <div class="subtasks-input-area gray-fonts cursor-pointer" id="subtasks-area${task["id"]}"
                              onclick="openSubtaskInput(${task["id"]})">
                              <span>Add new subtask</span>
                              <img src="../img/subtask-icon.png" alt="">
                          </div>
                          <div class="subtasks-input-area d-none" id="subtasks-input-area${task["id"]}">
                              <input class="" type="text" placeholder="Add new subtask" id="subtask-input${task["id"]}" onkeydown="return (event.key == 'Enter' ? addSubtask(${task["id"]}) : '');">
                              <div class="subtask-icons">
                                  <img onclick="closeSubtaskInput(${task["id"]})" class="cursor-pointer"
                                      src="../img/cancel-subtask.png" alt="">
                                  <img src="../img/subtask-line.png" alt="">
                                  <img onclick="addSubtask(${task["id"]})" class="cursor-pointer" src="../img/check-subtask.png"
                                      alt="">
                              </div>
                          </div>
                          <div class="input-check" id="subtask-container${task["id"]}">
                          </div>
                          -->
                          <div class="input-check" id="subtask-edit-container"></div>

                      </div>
                      </form>
                      <div class="button-edit-task-area-confirm">
                      <button class="btn-add-task ok-btn" onclick="saveTasks(${task["id"]})">
                          Ok
                          <img src="../img/check-icon.png" alt="add-icon">
                      </button>
                      </div>
                  </div>
      `;
}

function createSubtaskHTML(subtaskName) {
  return `
      <div class="subtask text-19pt">
          <input type="checkbox" name="subtask-checkbox">
          <label for="check" name="subtask-name" id="subtask-name">${subtaskName}</label>
      </div>
      `;
}

function createSubtaskEditHTML(subtaskName, checkBox) {
  if (checkBox === true) {
    return `
          <div class="subtask text-19pt">
              <input type="checkbox" checked="checked" name="subtask-checkbox">
              <label for="check" name="subtask-name" id="subtask-name">${subtaskName}</label>
          </div>
          `;
  } else {
    return `
        <div class="subtask text-19pt">
            <input type="checkbox" name="subtask-checkbox">
            <label for="check" name="subtask-name" id="subtask-name">${subtaskName}</label>
        </div>
        `;
  }
}

function createContactHTML() {
  return `
      <div class="task-contacts-overlay-container">
          <div class="task-contacts-overlay font-size21">SM</div>
          <div class="task-contacts-overlay font-size21">MV</div>
          <div class="task-contacts-overlay font-size21">EF</div>
      </div>
      `;
}

/**
 * The function contains the HTML template coresponding to the tasks shown on board.
 *
 * @param {number} i - Task id.
 * @returns HTML element
 */
function templateTask(i) {
  return `<div id="template${i}" class="template-task"><div>`;
}

/**
 * function renders the contact edit dialog modal
 * @param {integer} index
 * @returns HTML code
 */
function generateContactEditDialog(index) {
    return `
    <div class="contact-dialog-top">
                      <img class="close-icon" src="../img/close_icon.png" onclick="closeEditContactDialog()">
                      <img src="../img/join-logo.png">
                      <h2 class="contact-title" id="exampleModalLabel">Edit contact</h2>
    
                      <h4 id="info-text" class="info-text">Tasks are better with a team!</h4>
    
                  </div>
                  <div class="contact-dialog-bottom">
  
                      <div class="user-avatar" id="user-avatar"></div>
                      
                      <div class="form">
                          <form class="add-contact_form" onsubmit="handleFormSubmission(event, ${index}); return false;">
                              <div class="add-contact-input-field">
                                  <input id="edit-contact-name" class="contact-form-control contacts_input" type="text"
                                      placeholder="Name" required>
                                  <img src="../img/input_name.png" alt="">
                              </div>
                              <div class="add-contact-input-field">
                                  <input id="edit-contact-email" class="contact-form-control contacts_input " type="email"
                                      placeholder="Email" required>
                                  <img src="../img/input_mail.png" alt="">
                              </div>
                              <div class="add-contact-input-field">
                                  <input id="edit-contact-phone" class="contact-form-control contacts_input " type="number"
                                      pattern="" onKeyPress="if(this.value.length==12) return false;" placeholder="Phone" required>
                                  <img src="../img/phone_icon.png" alt="">
                              </div>
                              <div class="edit-contact-buttons">
                              <button type="submit" class="edit-contact-button delete-contact-button">
                                  <span>Delete</span>
                              </button>
                              <button type="submit" class="edit-contact-button">
                                  <span>Save</span><img src="../img/addcontact.png">
                              </button>
                              </div>
                          </form>
                      </div>
                  </div>
                  `;
  }

  /**
 * function renders the contact details
 * @param {integer} index
 * @param {string} name
 * @param {string} initials
 * @param {string} initialsColor
 * @param {string} email
 * @param {string} phone
 * @returns HTML code
 */
function generateContactDetail(index, name, initials, initialsColor, email, phone) {
    return `
      <div onclick="slideOut()" class="contact-detail-mobile" id="contact-detail-mobile"><img src="../img/arrow_back.png" alt=""></div>
      <span class="span-display-none">Kanban Project Management Tool</span>
      <div class="contact-detail-header">
      <div class="letters-large" style="background-color: ${initialsColor}">${initials}
      </div>
      <div>
          <div class="contact-detail-header-right">
              <div class="contact-name">${name}</div>
              <div class="edit-delete-btn-container">
                        <button class="btn-add-task edit-btn" onclick="openEditContactDialog(${index})">
                            <img onmouseover="this.src='../img/edit-icon-hover.png'" onmouseout="this.src='../img/edit-icon.png'" src="../img/edit-icon.png" alt="">
                        </button>
                        <button class="btn-add-task edit-btn" onclick="deleteContact(${index})">
                            <img onmouseover="this.src='../img/delete-icon-hover.png'" onmouseout="this.src='../img/delete-icon.png'" src="../img/delete-icon.png" alt="">
                        </button>
                      </div>
          </div>
    
      </div>
      </div> 
    
    <div class="contact-body">
    
      <div class="contact-body-header">
          <div class="contact-information">Contact Information</div>
      </div>
      <div class="contact-detail-bold">Email</div>
      <a class="contact-detail-medium" href="mailto:${email}">${email}</a>
      <div class="contact-detail-bold">Phone</div>
      <a class="contact-detail-medium" href="tel:${phone}">${phone}</a>
      <div class="edit-contact-responsive" onclick="openEditContactDialog(${index})"><img  src="../img/edit_contact_responsive_icon.png"></div>
      </div>
    </div>
          `;
  }

  /**
 *
 * @param {string} category
 * @param {string} color
 * @returns HTML code that renders content in drop-down menue of Add-Task
 */
function generateCategoryHTML(category, color) {
    return `
      <div onclick="selectCategory('${category}','${color}')" class="dropdown-category" id="" role="button" data-bs-toggle="collapse"
      data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
      <label for="category-${category}">${category}</label>
      <input type="radio" name="category" id="category-${category}" value="${category}">
      <div class="category-color ${color}"></div>
      </div>
      `;
  }