from django.urls import path
from .views import TaskListCreate, TaskUpdate, AddDependency

urlpatterns = [
    path('tasks/', TaskListCreate.as_view()),
    path('tasks/<int:task_id>/', TaskUpdate.as_view()),
    path('tasks/<int:task_id>/dependencies/', AddDependency.as_view()),
]
