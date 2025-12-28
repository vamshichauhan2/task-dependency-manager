# Design Decisions

This document explains the main decisions taken while building
the Task Dependency Management System.

---

## Data Model

Each task is treated as a node.
Dependencies between tasks are treated as directed connections.

A separate `TaskDependency` table is used instead of embedding
dependencies inside the task model.  
This keeps relationships clear and easy to work with.

---

## Circular Dependency Handling

Before adding a new dependency, the system checks whether it
will create a circular dependency.

If a task A is made dependent on task B, the system checks if
there is already a path from B back to A.

This check is implemented using Depth First Search (DFS).
If a cycle is found, the dependency is rejected.

Time complexity of this check is O(V + E).

---

## Task Status Logic

A task’s status depends on the status of its dependencies:

- If any dependency is blocked, the task becomes blocked
- If all dependencies are completed, the task becomes in_progress
- Otherwise, the task remains pending

Status updates are applied only to affected tasks to keep the
logic simple and efficient.

---

## Backend Responsibility

All validation and business rules are handled in the backend.
The frontend only displays the current state returned by the API.

This ensures correctness even if multiple clients interact
with the system.

---

## Frontend Graph

The task dependency graph is drawn using basic SVG elements.
No external graph libraries were used.

This keeps the visualization simple and aligned with the
assignment requirements.

