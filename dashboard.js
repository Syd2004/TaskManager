function logout() {
    localStorage.removeItem("currentUser")
    window.location.href = "/login.html"
}

let editingTaskId
let currentFilter = "all"
let currentCategory = "all"
let currentPriority = "all"
let currentSort = "due-date"

const currentUserId = localStorage.getItem("currentUser");

if (!currentUserId) {
    window.location.href = "/login.html";
}

const users = JSON.parse(localStorage.getItem("users") || "[]");

const currentUser = users.find(user => user.id === currentUserId);

if (!currentUser) {
    localStorage.removeItem("currentUser");
    window.location.href = "/login.html";
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("username-display").textContent = currentUser.username
  document.getElementById("profile-username").textContent = currentUser.username

  document.getElementById("category-filter").addEventListener("change", function() {
        currentCategory = this.value;
        renderTasks();
    });

    document.getElementById("priority-filter").addEventListener("change", function() {
        currentPriority = this.value;
        renderTasks();
    });

    document.getElementById("sort-tasks").addEventListener("change", function() {
        currentSort = this.value;
        renderTasks();
    });

    renderTasks();
    renderRecommendedTask()

    document.getElementById("total-tasks").textContent = currentUser.tasks.length
    document.getElementById("tasks-due-today").textContent = currentUser.tasks.filter(task => task.dueDate == new Date().toISOString().split("T")[0]).length
    document.getElementById("tasks-overdue").textContent = currentUser.tasks.filter(task => task.dueDate < new Date().toISOString().split("T")[0]).length
    document.getElementById("tasks-completed").textContent = currentUser.tasks.filter(task => task.completed).length
    document.getElementById("total-overdue").textContent = `${currentUser.tasks.filter(task => task.dueDate < new Date().toISOString().split("T")[0]).length} Overdue`
    document.getElementById("total-due-today").textContent = `${currentUser.tasks.filter(task => task.dueDate == new Date().toISOString().split("T")[0]).length} Due Today`
    document.getElementById("total-completed").textContent = `${currentUser.tasks.filter(task => task.completed).length} Completed`
    document.getElementById("user-avatar").textContent = currentUser.username[0].toUpperCase()

    renderStatCards()
})

function renderTasks() {
    const taskList = document.getElementById("task-list");

    taskList.innerHTML = "";

    let filteredTasks = currentUser.tasks.filter(task => {

        // Status filter
        if (currentFilter === "today") {
            if (task.dueDate !== new Date().toISOString().split("T")[0]) {
                return false;
            }
        }

        if (currentFilter === "overdue") {
            if (
                task.dueDate >= new Date().toISOString().split("T")[0] ||
                task.completed
            ) {
                return false;
            }
        }

        if (currentFilter === "completed") {
            if (!task.completed) {
                return false;
            }
        }

        // Category filter
        if (
            currentCategory !== "all" &&
            task.category !== currentCategory
        ) {
            return false;
        }

        // Priority filter
        if (
            currentPriority !== "all" &&
            task.priority !== currentPriority
        ) {
            return false;
        }

        return true;
    });

    // Sorting
    filteredTasks.sort((a, b) => {

        if (currentSort === "priority") {
            const priorityOrder = {
                urgent: 4,
                high: 3,
                medium: 2,
                low: 1
            };

            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        if (currentSort === "due-date") {
            return a.dueDate.localeCompare(b.dueDate);
        }

        if (currentSort === "title") {
            return a.title.localeCompare(b.title);
        }

        if (currentSort === "created") {
            return b.id.localeCompare(a.id);
        }

        return 0;
    });


    filteredTasks.forEach(task => {
        const taskElement = document.createElement("div");

        taskElement.classList.add("task-item");

        if (task.dueDate === new Date().toISOString().split("T")[0]) {
            taskElement.classList.add("status-today");
        }
        if (task.completed) {
          taskElement.classList.add("status-completed")
        }

        taskElement.innerHTML = `
            <div class="task-checkbox-wrap">
                <input 
                    type="checkbox" 
                    id="task-${task.id}" 
                    title="Mark complete"
                    ${task.completed ? "checked" : ""}
                    onchange="completeTask('${task.id}')"
                >
            </div>

            <div class="task-details">
                <div class="task-title-row">
                    <span class="task-title">${task.title}</span>

                    <span class="badge-tag badge-${task.priority}">
                        ${task.priority}
                    </span>

                    <span class="badge-tag badge-category">
                        ${task.category}
                    </span>
                </div>

                <p class="task-desc">
                    ${task.description}
                </p>

                <div class="task-meta-row">
                    <span class="meta-due">
                        Due: ${task.dueDate}
                    </span>
                </div>
            </div>

            <div class="task-actions">
                <button 
                    class="btn-icon" 
                    title="Edit task"
                    onclick="editTask('${task.id}')"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>

                <button 
                    class="btn-icon" 
                    title="Delete task"
                    onclick="deleteTask('${task.id}')"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });
}

function addTask() {
    const title = document.getElementById("quick-task-title").value;
    const description = document.getElementById("quick-task-desc").value;
    const priority = document.getElementById("quick-task-priority").value;
    const category = document.getElementById("quick-task-category").value;
    const dueDate = document.getElementById("quick-task-date").value;

    createTask(
        title,
        description,
        priority,
        category,
        dueDate
    );
}

function saveTask() {
    const title = document.getElementById("task-title-input").value;
    const description = document.getElementById("task-desc-input").value;
    const priority = document.querySelector(
        'input[name="priority"]:checked'
    ).value;
    const category = document.getElementById("task-cat").value;
    const dueDate = document.getElementById("task-due-date").value;

    if (editingTaskId) {
        const task = currentUser.tasks.find(
            task => task.id === editingTaskId
        );

        if (!task) return;

        task.title = title;
        task.description = description;
        task.priority = priority;
        task.category = category;
        task.dueDate = dueDate;

        editingTaskId = null;
    } else {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            description,
            priority,
            category,
            dueDate,
            createdAt: Date.now(),
            completed: false
        };

        currentUser.tasks.push(newTask);
    }

    saveUsers()
    renderTasks()
    renderRecommendedTask()
    resetTaskForm()

    window.location.href = "#"
}

function createTask(title, description, priority, category, dueDate) {
    const newTask = {
        id: crypto.randomUUID(),
        title,
        description,
        priority,
        category,
        dueDate,
        createdAt: Date.now(),
        completed: false
    };

    currentUser.tasks.push(newTask);

    saveUsers();
    renderTasks();
    renderRecommendedTask()
}

function saveUsers() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const index = users.findIndex(user => user.id === currentUser.id);

    users[index] = currentUser;

    localStorage.setItem("users", JSON.stringify(users));
}

function deleteTask(taskId) {
    currentUser.tasks = currentUser.tasks.filter(
        task => task.id !== taskId
    );

    saveUsers();
    renderTasks();
}

function completeTask(taskId) {
    const task = currentUser.tasks.find(
        task => task.id === taskId
    );

    if (!task) return;

    task.completed = !task.completed;

    saveUsers();
    renderTasks();
    renderRecommendedTask()
}

function editTask(taskId) {
    const task = currentUser.tasks.find(task => task.id === taskId);
    document.getElementById("modal-title").textContent = "Edit Task"

    if (!task) return;

    editingTaskId = taskId;

    document.getElementById("task-title-input").value = task.title;
    document.getElementById("task-desc-input").value = task.description;
    document.getElementById("task-cat").value = task.category;
    document.getElementById("task-due-date").value = task.dueDate;

    document.querySelector(
        `input[name="priority"][value="${task.priority}"]`
    ).checked = true;

    window.location.href = "#new-task-modal"
}

function resetTaskForm() {
    document.getElementById("modal-title").textContent = "Create New Task"
    document.getElementById("task-title-input").value = "";
    document.getElementById("task-desc-input").value = "";
    document.getElementById("task-cat").value = "";
    document.getElementById("task-due-date").value = "";

    document.querySelector(
        'input[name="priority"][value="medium"]'
    ).checked = true;

    editingTaskId = null;
}

function filterTasks(filter, button) {
    currentFilter = filter;
    renderTasks();

    document.querySelectorAll(".filter-tab").forEach(tab => {
        tab.classList.remove("active");
    });

    button.classList.add("active");
}

function renderStatCards() {
  const container = document.getElementById("stats-grid")

  const totals = document.createElement("div")
  totals.classList.add("stat-card")
  totals.innerHTML = 
  `
  <div class="stat-header">
      <span class="stat-title">Total Tasks</span>
      <div class="stat-icon icon-cyan">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      </div>
  </div>
  <div class="stat-body">
      <span class="stat-number">${currentUser.tasks.length}</span>
  </div>
  <div class="stat-progress-bar">
      <div class="stat-progress-fill fill-cyan" style="width: ${(currentUser.tasks.length === 0) ? 0 : 100}%;"></div>
  </div>
  <span class="stat-footer">Active in workspace</span>
  `

  const completed = document.createElement("div")
  completed.classList.add("stat-card")
  completed.innerHTML = 
  `
  <div class="stat-header">
      <span class="stat-title">Completed Tasks</span>
      <div class="stat-icon icon-green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
  </div>
  <div class="stat-body">
      <span class="stat-number">${currentUser.tasks.filter(task => task.completed).length}</span>
      <span class="stat-change positive">${(currentUser.tasks.length === 0) ? 0 : Math.round((currentUser.tasks.filter(task => task.completed).length / currentUser.tasks.length) * 100)}% rate</span>
  </div>
  <div class="stat-progress-bar">
      <div class="stat-progress-fill fill-green" style="width: ${(currentUser.tasks.length === 0) ? 0 : Math.round((currentUser.tasks.filter(task => task.completed).length / currentUser.tasks.length) * 100)}%;"></div>
  </div>
  <span class="stat-footer">${currentUser.tasks.filter(task => task.completed).length} of ${currentUser.tasks.length} tasks finished</span>
  `

  const overdue = document.createElement("div")
  overdue.classList.add("stat-card")
  overdue.classList.add("alert-card")
  const message = (currentUser.tasks.filter(task => task.dueDate < new Date().toISOString().split("T")[0]).length === 0)
  ? "Everything is on schedule"
  : "Falling behind schedule"
  overdue.innerHTML = 
  `
  <div class="stat-header">
      <span class="stat-title" style="color: #F87171;">Overdue</span>
      <div class="stat-icon icon-red">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      </div>
  </div>
  <div class="stat-body">
      <span class="stat-number" style="color: #EF4444;">${currentUser.tasks.filter(task => task.dueDate < new Date().toISOString().split("T")[0]).length}</span>
      <span class="stat-change negative">Needs Attention</span>
  </div>
  <div class="stat-progress-bar">
      <div class="stat-progress-fill fill-red" style="width: ${(currentUser.tasks.length === 0) ? 0 : Math.round((currentUser.tasks.filter(task => task.dueDate < new Date().toISOString().split("T")[0]).length / currentUser.tasks.length) * 100)}%;"></div>
  </div>
  <span class="stat-footer">${message}</span>
  `

  container.appendChild(totals)
  container.appendChild(completed)
  container.appendChild(overdue)
}

function renderRecommendedTask() {
    const incompleteTasks = currentUser.tasks.filter(
        task => !task.completed
    );

    const title = document.getElementById("recommended-title");
    const description = document.getElementById("recommended-description");
    const badge = document.getElementById("recommended-badge");
    const due = document.getElementById("recommended-due");
    //const category = document.getElementById("recommended-category");
    const completeButton = document.getElementById("recommended-complete");

    // No tasks available
    if (incompleteTasks.length === 0) {
        title.textContent = "You're all caught up!";
        description.textContent =
            "There are no incomplete tasks. Nice work.";

        badge.textContent = "All Clear";
        badge.className = "badge-tag badge-category";

        due.textContent = "No pending tasks";
        //category.textContent = "Workspace";

        completeButton.style.display = "none";

        return;
    }

    const today = new Date().toISOString().split("T")[0];

    const priorityOrder = {
        urgent: 4,
        high: 3,
        medium: 2,
        low: 1
    };

    const recommendedTask = [...incompleteTasks].sort((a, b) => {

        const aOverdue = a.dueDate < today;
        const bOverdue = b.dueDate < today;

        // 1. Overdue tasks come first
        if (aOverdue !== bOverdue) {
            return bOverdue - aOverdue;
        }

        // 2. Higher priority comes first
        const priorityDifference =
            priorityOrder[b.priority] - priorityOrder[a.priority];

        if (priorityDifference !== 0) {
            return priorityDifference;
        }

        // 3. Earlier due date comes first
        return a.dueDate.localeCompare(b.dueDate);
    })[0];

    title.textContent = recommendedTask.title;

    description.textContent =
        recommendedTask.description ||
        "No additional notes have been added for this task.";

    // Badge
    if (recommendedTask.dueDate < today) {
        badge.textContent = "Overdue";
        badge.className = "badge-tag badge-urgent";
    } else if (recommendedTask.dueDate === today) {
        badge.textContent =
            `${recommendedTask.priority} • Due Today`;
        badge.className = "badge-tag badge-urgent";
    } else {
        badge.textContent =
            `${recommendedTask.priority} Priority`;
        badge.className = "badge-tag badge-category";
    }

    // Due date
    if (recommendedTask.dueDate < today) {
        const overdueDays = Math.floor(
            (new Date(today) - new Date(recommendedTask.dueDate))
            / (1000 * 60 * 60 * 24)
        );

        due.textContent =
            `Overdue by ${overdueDays} day${overdueDays === 1 ? "" : "s"}`;
    } else if (recommendedTask.dueDate === today) {
        due.textContent = "Due today";
    } else {
        due.textContent = `Due: ${recommendedTask.dueDate}`;
    }

    /*category.textContent =
        `${recommendedTask.category} • ${recommendedTask.priority}`;*/

    completeButton.style.display = "";

    completeButton.onclick = function () {
        completeTask(recommendedTask.id);
        renderRecommendedTask();
    };
}