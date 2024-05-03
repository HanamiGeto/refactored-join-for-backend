class CreateTask {

  constructor(id, department, title, description, contacts, urgency, dueDate, color, subtasks) {
    this.id = id,
    this.category = { title: department.trim(), color: color}
    this.title = title,
    this.description = description,
    this.assigned_to = contacts,
    this.urgency = urgency,
    this.process_status = 'to-do',
    this.due_date = dueDate,
    this.subtasks = subtasks;
    this.pushTask();
  }

  pushTask() {
    tasks.push(this);
  }
}

class UpdateTask {

  constructor(id, title, description, contacts, urgency, processStatus, dueDate, subtasks) {
    this.id = id,
    this.title = title,
    this.description = description,
    this.assigned_to = contacts,
    this.urgency = urgency,
    this.process_status = processStatus,
    this.due_date = dueDate,
    this.subtasks = subtasks;
  }

}