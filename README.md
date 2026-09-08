# **Task Manager**

## Overview

Task manager is a browser based task management system that allows users to create an account, log in and manage their own personal tasks from a dashboard.

The application currently allows:

* User registration
* User login
* Password validation
* Task creation
* Task editing
* Task deletion
* Task completion
* Task filtering
* Task sorting
* Productivity statistics
* Recommended next-task functionality
* User logout



It is currently a client-side app using HTML/CSS/JS. All data is stored in the browser's **local storage**



## **User Authentication**

A new user starts by entering a username and password on the sign up page. Before the account is created, the application checks for: 

* Password strength (≥8 characters, both upper and lower case letters, has a number, has a special character)
* Password confirmation - the confirmation field is compared with the original password as the user types
* Validation - checks if the passwords match and that the chosen password is at least 8 characters long



After validation is done, *the users* array is retrieved from local storage. The app checks whether the username exists. If it does, an error is shown. If there's no error then a new user is created with id, username, password and an empty *tasks* array.



{

&#x09;id: "unique-id",

&#x09;username: "username",

&#x09;password: "password"

&#x09;tasks: \[]

}



The application stores the updated users array and the user is then redirected to the log in page.



## **Login**

The login process begins when the user submits the login form.

The application first checks that:



* A username has been provided
* A password has been provided



The form submission is prevented from performing a normal HTTP submission (e.preventDefault()).

The application then gets the users array from localStorage and searches for a user whose username and password match the given values.

If no match is found, **Invalid username or password!** is displayed.

If a matching user is found, their ID is stored as: currentUser

The user is then redirected to: **dashboard.html**



## **Session Manageme**nt

The application uses the currentUser value in localStorage to identify the user that's currently logged in.

When the dashboard loads, it gets: localStorage.getItem("currentUser")

The ID is then compared against the users stored in localStorage.

If there is no current user, the application redirects the user to the login page.

If a currentUser exists but does not correspond to an actual user, the stored value is removed and the user is redirected to login.



## **Productivity Statistics**

The dashboard calculates some statistics from the current user's task list.

These include:

* Total Tasks- The total number of tasks that belong to the current user.
* Completed Tasks - The number of tasks whose completed property is true.

The dashboard also calculates the completion percentage:

&#x09;*completed tasks / total tasks × 100*

* Overdue Tasks - Tasks whose due date is earlier than the current date are considered overdue.

These statistics are generated dynamically when the dashboard loads.



## **Task Data Model**

Each task is stored inside the current user's *tasks* array.

A task has the following structure:

{

&#x20;   "id": "unique-task-id",

&#x20;   "title": "Task title",

&#x20;   "description": "Task description",

&#x20;   "priority": "medium",

&#x20;   "category": "learning",

&#x20;   "dueDate": "2026-09-07",

&#x20;   "createdAt": 1757200000000,

&#x20;   "completed": false

}



The application creates a unique ID using crypto.randomUUID() and records the creation time using Date.now().



## **Creating Tasks**

There are two ways to create a task:

### Quick Add

The dashboard provides a Quick Add Task form containing:

* Title
* Description
* Priority
* Category
* Due date

The available priorities are:

* Urgent
* High
* Medium
* Low

The available categories include:

* Work
* Learning
* Project
* Follow-up

When submitted, the form calls addTask(), which collects the values and passes them to createTask().



### New Task Modal

The dashboard also provides a larger task creation form accessible through the New Task button.



This form allows the user to enter:

* Task title
* Description
* Priority
* Category
* Due date

The same form is also used when editing an existing task.



## **Editing Tasks**

When the user selects the edit button on a task, editTask() finds the selected task and places its existing values into the task form.

The application then changes the modal title to:

&#x09;*Edit Task*

The selected task ID is stored in:

&#x09;editingTaskId

When the user saves the form, saveTask() detects that an editing ID exists and updates the existing task instead of creating a new one.



## **Deleting Tasks**

The delete functionality removes a task by filtering it out of the current user's task array. The deleteTask() function performs this operation and then saves the updated user data.



## **Completing Tasks**

Tasks can be marked as completed using their checkbox.

When the checkbox is changed, completeTask() finds the corresponding task and reverses its completed value.

For example:

* false → true
* true  → false

The updated data is then saved and the task list is rendered again.



## **Filtering Tasks**

The dashboard provides four status filters:

* All Tasks
* Today's Focus
* Overdue
* Completed

The JavaScript also provides category and priority filters.



### Category

* All Categories
* Work
* Learning
* Project

### Priority

* All Priorities
* Urgent
* High
* Medium
* Low



The filters are applied inside renderTasks(). Tasks that do not satisfy the selected filters are excluded from the displayed list.



## **Sorting Tasks**

Tasks can be sorted using four options:

* Due Date
* Priority (Highest first)
* Recently Added
* Alphabetical

The sorting implementation uses different comparison rules depending on the selected option.

For priority sorting, the application assigns numerical values:

* Urgent - 4
* High - 3
* Medium - 2
* Low - 1

This allows higher-priority tasks to appear first.



## **Recommended Next Focus**

One of the dashboard's main features is the *Recommended Next Focus* section.

The purpose of this section is to identify the incomplete task that should receive attention first.

The algorithm considers tasks in this order:

#### 1\. Overdue status

Overdue tasks are given priority.



#### 2\. Task priority

Tasks with the same overdue status are ranked by priority



#### 3\. Due date

If priority is also equal, the task with the earlier due date is selected.



Therefore, the general decision process is:

Incomplete tasks - Overdue first - Higher priority - Earlier due date - Recommended task



If there are no incomplete tasks, the dashboard instead displays:

**You're all caught up!** and hides the completion button.



## **Data Persistence**

The application does not currently use a backend server or database.

Instead, information is stored in the browser's localStorage.

The main keys are:

* users
* currentUser



**users**

Contains the application's registered users and their tasks.



**currentUser**

Contains the ID of the user currently logged in.



When task information changes, saveUsers() retrieves the stored users, replaces the current user's record, and writes the updated array back to localStorage.



## **Logout**

When the user logs out, the application removes:

**currentUser** from localStorage.



The user is then redirected to the login page.

Logging out does not delete the user's account. It only removes the identifier that represents the current login session.



## **Known Limitations**

Based on the current implementation, the project has several limitations.



#### Client-side storage

All users and tasks are stored in browser localStorage. This means the data is tied to the browser/device where the application is being used.



#### Password storage

Passwords are currently stored directly as part of the user object rather than being hashed. This is appropriate to identify as a limitation of the current implementation rather than treating the authentication system as production-ready.



#### Client-side authentication

Authentication is performed entirely in JavaScript using locally stored data. There is currently no backend authentication service.



#### Search

The dashboard contains a search bar in the HTML interface, but the supplied dashboard.js does not currently implement search functionality.



#### Notifications

The dashboard contains a notification interface with example notification content, but the supplied JavaScript does not currently generate those notifications dynamically.

