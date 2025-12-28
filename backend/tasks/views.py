from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Task, TaskDependency
from .serializers import TaskSerializer
from .utils import detect_cycle
from .services import recalculate_status


class TaskListCreate(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        return Response(TaskSerializer(tasks, many=True).data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class TaskUpdate(APIView):
    def patch(self, request, task_id):
        task = Task.objects.get(id=task_id)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if task.status == 'completed':
            dependents = TaskDependency.objects.filter(depends_on=task)
            for dep in dependents:
                recalculate_status(dep.task)

        return Response(serializer.data)


class AddDependency(APIView):
    def post(self, request, task_id):
        depends_on_id = request.data.get("depends_on_id")

        if task_id == depends_on_id:
            return Response({"error": "Task cannot depend on itself"}, status=400)

        cycle = detect_cycle(task_id, depends_on_id)
        if cycle:
            return Response(
                {"error": "Circular dependency detected", "path": cycle},
                status=400
            )

        TaskDependency.objects.create(
            task_id=task_id,
            depends_on_id=depends_on_id
        )

        recalculate_status(Task.objects.get(id=task_id))

        return Response({"message": "Dependency added"}, status=201)
