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

