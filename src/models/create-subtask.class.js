class CreateSubTask {
    constructor(subtaskName, checkBox) {
    this.title = subtaskName,
    this.done = checkBox
    }

  }

class UpdateSubTask {
    constructor(id, subtaskName, checkBox, task) {
    this.id = id,
    this.title = subtaskName,
    this.done = checkBox,
    this.task = task
    }

  }