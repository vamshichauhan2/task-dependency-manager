from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Task, TaskDependency
from .serializers import TaskSerializer
from .utils import detect_cycle


class TaskListCreate(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AddDependency(APIView):
    def post(self, request, task_id):
        depends_on_id = request.data.get("depends_on_id")

        if not depends_on_id:
            return Response(
                {"error": "depends_on_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if task_id == depends_on_id:
            return Response(
                {"error": "Task cannot depend on itself"},
                status=status.HTTP_400_BAD_REQUEST
            )

        cycle_path = detect_cycle(task_id, depends_on_id)
        if cycle_path:
            return Response(
                {
                    "error": "Circular dependency detected",
                    "path": cycle_path
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        TaskDependency.objects.create(
            task_id=task_id,
            depends_on_id=depends_on_id
        )

        return Response(
            {"message": "Dependency added successfully"},
            status=status.HTTP_201_CREATED
        )
