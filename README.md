# Task Dependency Management System

This project is a simple Task Dependency Management System built using Django for the backend and React for the frontend.

It allows users to create tasks, define dependencies between them, and automatically manage task status based on those dependencies.

Features:
- Create and list tasks
- Add dependencies between tasks
- Prevent circular dependencies
- Automatically update task status
- View a simple visual representation of task dependencies

Tech Stack:
- Backend: Django, Django REST Framework
- Frontend: React
- Database: SQLite

Setup Instructions:

Backend:
cd backend
python manage.py migrate
python manage.py runserver

Backend server runs at:
http://localhost:8000

Frontend:
cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000



## Notes, Limitations & Future Improvements

This project focuses mainly on the core requirements of the assignment such as task dependency handling, circular dependency prevention, automatic status updates, and dependency visualization.

Some features were intentionally not implemented. The reasons and possible improvements are listed below.

### Drag-and-Drop in Graph (Not Implemented)

This feature was mentioned as optional. I chose not to implement drag-and-drop because the primary goal was to ensure correctness in dependency logic rather than advanced UI interactions.

In the future, this can be implemented by adding mouse event handlers to SVG elements and storing node positions in state.

### Zoom In / Zoom Out in Graph (Not Implemented)

Zoom functionality was not added since the current graph layout is designed for small to medium-sized task sets and remains readable without zoom.

This can be implemented later using SVG scale transformations and simple zoom controls.

### Graph Export as Image (Not Implemented)

Exporting the dependency graph as an image was listed as an optional enhancement. The current focus was kept on live visualization instead of export functionality.

This can be implemented by converting the SVG to a canvas and using browser APIs to export the image.

### Task Deletion via UI (Partially Implemented)

Task deletion was handled at the backend level during development to remove duplicate or test tasks. When a task is deleted, all related dependencies are automatically removed using database cascade rules.

A delete button was not added to the UI to keep the focus on core dependency behavior.

This can be added later by introducing a delete action with confirmation in the frontend and a DELETE API endpoint in the backend.

### What Was Prioritized

- Correct circular dependency detection using DFS  
- Automatic status updates based on dependencies  
- Clean and consistent REST APIs  
- Simple and readable user interface  
- Maintainable and human-readable code  

### Summary

All mandatory requirements of the assignment have been completed. Optional features were intentionally scoped out and documented to maintain focus on correctness and clarity. 




Brief Write-up

Circular Dependency Detection & Time Complexity
To detect circular dependencies, I treated tasks and their dependencies as a directed graph.
Whenever a new dependency is added, I run a Depth-First Search (DFS) starting from the dependency node to check if the original task can be reached again. If it can, a cycle exists and the dependency is rejected.
This approach runs in O(V + E) time, where V is the number of tasks and E is the number of dependencies, which is efficient for the expected task size.

Most Challenging Part & How I Solved It
The most challenging part was keeping task statuses consistent when dependencies changed.
I solved this by recalculating the status of dependent tasks whenever a task is updated. This ensures that blocked, pending, in-progress, and completed states always reflect the current dependency state without manual intervention.

What I Would Improve With More Time
With more time, I would add drag-and-drop support in the graph visualization, zoom controls, and the ability to export the graph as an image. I would also enhance the UI with smoother interactions and possibly add real-time updates using WebSockets.


