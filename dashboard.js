function checkPriority() {
  const selected = document.querySelector('input[name="priority"]:checked')
  return selected.value
}

let tasks
document.addEventListener('DOMContentLoaded', function() {
  tasks = JSON.parse(localStorage.getItem("tasks"))
  renderTasks()
})

function createNewTask() {
  if(tasks == null){
    tasks = []
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
  const title = document.getElementById("task-title-input")
  const description = document.getElementById("task-desc-input")
  const category = document.getElementById("task-cat")
  const dueDate = document.getElementById("task-due-date")
  const waiting = document.getElementById("task-waiting")

  const task = {
    title: title.value.lower(),
    description: description.value.lower(),
    priority: checkPriority().lower(),
    category: category.value.lower(),
    dueDate: dueDate.value,
    waiting: waiting.value.lower()
  }
  tasks.push(task)

  try{
    localStorage.setItem("tasks", JSON.stringify(tasks))
  } catch (e) {
    window.alert(e.name + ":" + e.message)
  }
}

function renderTasks() {
  if(tasks == null){
    tasks = []
    localStorage.setItem("tasks", JSON.stringify(tasks))
    return
  }
  const container = document.querySelector(".task-list")
  
  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i]
    const dateToday = Date.now()
    const projectDate = new Date(t.dueDate)
    const difference = (dateToday - projectDate) / (1000 * 60 * 60 * 24)
    let status
    if (dateToday == projectDate) {
      status = "today"
    } else if (difference < 0) {
      status = "waiting"
    } else if (difference > 0) {
      status = "overdue"
    }

    const item = document.createElement("div")
    item.classList.add('task-item')
    item.classList.add(`status-${status}`)
    item.innerHTML = `
    <div class="task-item status-${status}">
      <div class="task-checkbox-wrap">
          <input type="checkbox" id="task-1" title="Mark complete">
      </div>
      <div class="task-details">
          <div class="task-title-row">
              <span class="task-title">${t.title}</span>
              <span class="badge-tag badge-${t.priority}">${t.priority}</span>
              <span class="badge-tag badge-${t.category}">${t.category}</span>
          </div>
          <p class="task-desc">${t.description}</p>
          <div class="task-meta-row">
              <span class="meta-due overdue">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  Overdue: Sep 5 (2 days ago)
              </span>
              <span>&bull;</span>
              <span> Assigned to: Boris</span>
          </div>
      </div>
      <div class="task-actions">
          <button class="btn-icon" title="Edit task">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="btn-icon" title="Delete task">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
      </div>
  </div>
    `

    container.appendChild(item)
  }
}

/*let date = "2026-09-07"
let year; let month; let day;
let splitDate = date.split("-")
console.log(splitDate)
for (let i = 0; i < splitDate.length; i++) {
  if (i === 0) year = splitDate[i]
  if (i === 1) month = splitDate[i]
  if (i === 2) day = splitDate[i]
}
let newDate = new Date(year, month, day)
let milliseconds = newDate.getTime()
console.log(milliseconds)*/

