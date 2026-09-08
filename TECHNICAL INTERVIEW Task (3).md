**Business Case:**
Mr Boris is a recent graduate who just started working. He has a lot of things he needs to learn and projects he needs to finish, but he often feels paralysed. He writes tasks on sticky notes, but they get lost. He isn't sure what he should be working on�*right now*, and he often forgets to follow up on things he was waiting for. He needs a simple, visual tool that not only lists his tasks but helps him understand his progress and reminds him of what is falling behind.

**Your Objective:**
Build a web application, a productivity tool designed to help users like Mr Boris move from confusion to action. The app should allow a user to manage their tasks, but the main goal is to provide a "dashboard" view that gives them immediate insight into their workload and what needs attention next.

# Frontend Requirements

Focus on the **user interface and user experience**.

Your application should include the following features:

User Access Screens

Create screens that allow users to:

* Register an account
* Log in to the application
* Access their personal workspace

The system should ensure that:

* Users see only their own tasks
* A logged-in user can securely access their dashboard

## Task Creation Interface

Users must be able to create and manage tasks by providing sufficient information such as: Task title, Priority level etc.

The interface should make task entry simple and clear.

## Task Management View

Users should be able to manage their tasks including: View all their tasks, Mark tasks as completed, identify tasks that are overdue.

The interface should make it easy to see which tasks require attention.

## Dashboard View

The dashboard should help users quickly understand their productivity.

It should visually summarize information eg: Total tasks, completed tasks, Pending tasks etc

The dashboard should allow users to instantly know what needs attention.

## Reminder/Alerts and Notification Indicators

The interface should notify users about:

* Tasks that are due soon
* Tasks that are overdue

This should help the user avoid missing deadlines.

## Task Organization Features

The interface should allow users to filter, sort and view tasks and status

These features should help users focus on what matters most.

# Backend Requirements

focus on the system logic and data handling.

Your backend should support the following concepts.

## User Management

The system should allow:

* User registration
* User login
* Secure access to user data

The system should ensure that users cannot access another user's tasks.

## Task Management Logic

The backend must support operations that allow users to: Create tasks, update, mark as complete etc.

The system should keep track of important information related to tasks.

## Task Status Tracking

Each task should have a state that indicates its progress.

The system should be able to determine whether a task is:

* Pending
* Completed
* Overdue

The backend should maintain this information so the frontend can display it.

## Dashboard Data

The backend should provide summarized information about the user's tasks that will make good analytics. E.g. Total number of tasks, Number of completed tasks etc.

This information will be used by the frontend to display the productivity dashboard.

## Reminder Logic

The system should be capable of identifying tasks that are due or overdue

This information should be made available so the frontend can notify the user.

## Data Organization

The system should structure data in a way that allows:

* Efficient storage
* Easy retrieval
* Logical relationships between users and tasks

# Final Goal

When Mr Boris logs into the application, he should immediately be able to answer among other question:

* What should I do today?
* What tasks are overdue?
* What progress have I made?

N.B Innovation and clear process explanation beyond the task description always awards more points.

