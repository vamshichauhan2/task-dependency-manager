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


