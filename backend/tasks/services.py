from .models import TaskDependency


def recalculate_status(task):
    dependencies = TaskDependency.objects.filter(task=task)

    if not dependencies.exists():
        return

    dep_statuses = [d.depends_on.status for d in dependencies]

    if any(status == 'blocked' for status in dep_statuses):
        task.status = 'blocked'
    elif all(status == 'completed' for status in dep_statuses):
        task.status = 'in_progress'
    else:
        task.status = 'pending'

    task.save()
