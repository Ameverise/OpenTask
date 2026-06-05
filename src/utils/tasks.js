export function createTask(data) {
  return {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category,
    priority: data.priority,
    dueDate: data.dueDate,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length;

  return {
    total: tasks.length,
    completed,
    active: tasks.length - completed
  };
}

export function filterTasks(tasks, filters) {
  const search = filters.search.trim().toLowerCase();

  return tasks
    .filter((task) => {
      if (filters.status === "active") {
        return !task.completed;
      }

      if (filters.status === "completed") {
        return task.completed;
      }

      return true;
    })
    .filter((task) => (filters.category === "all" ? true : task.category === filters.category))
    .filter((task) => (filters.priority === "all" ? true : task.priority === filters.priority))
    .filter((task) => task.title.toLowerCase().includes(search))
    .sort((firstTask, secondTask) => {
      const firstDate = firstTask.dueDate || "9999-12-31";
      const secondDate = secondTask.dueDate || "9999-12-31";
      return firstDate.localeCompare(secondDate);
    });
}
