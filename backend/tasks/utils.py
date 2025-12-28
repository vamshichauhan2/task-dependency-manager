from collections import defaultdict
from .models import TaskDependency


def detect_cycle(task_id, depends_on_id):
    """
    Returns:
    - None if no cycle
    - List of task ids representing the cycle path if cycle exists
    """

    graph = defaultdict(list)

    # Build existing dependency graph
    for dep in TaskDependency.objects.all():
        graph[dep.depends_on_id].append(dep.task_id)

    # Simulate adding new edge: depends_on -> task
    graph[depends_on_id].append(task_id)

    visited = set()
    stack = []

    def dfs(node):
        # Cycle detected
        if node in stack:
            return stack[stack.index(node):] + [node]

        if node in visited:
            return None

        visited.add(node)
        stack.append(node)

        for neighbor in graph[node]:
            cycle_path = dfs(neighbor)
            if cycle_path:
                return cycle_path

        stack.pop()
        return None

    return dfs(depends_on_id)
