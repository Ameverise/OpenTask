export function createTask(data) {
  return {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category,
    priority: data.priority,
    dueDate: data.dueDate,
    subtasks: data.subtasks ?? [],
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

const priorityOrder = { high: 0, medium: 1, low: 2 };

export function filterTasks(tasks, filters) {
  const search = filters.search.trim().toLowerCase();

  const filtered = tasks
    .filter((task) => {
      if (filters.status === "active") return !task.completed;
      if (filters.status === "completed") return task.completed;
      return true;
    })
    .filter((task) => (filters.category === "all" ? true : task.category === filters.category))
    .filter((task) => (filters.priority === "all" ? true : task.priority === filters.priority))
    .filter((task) => task.title.toLowerCase().includes(search));

  switch (filters.sort) {
    case "priority":
      return filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case "title":
      return filtered.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    case "createdAt":
      return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case "dueDate":
    default:
      return filtered.sort((a, b) => {
        const da = a.dueDate || "9999-12-31";
        const db = b.dueDate || "9999-12-31";
        return da.localeCompare(db);
      });
  }
}

export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.dueDate) < today;
}

export function overdueDays(dueDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  return Math.round((today - due) / (1000 * 60 * 60 * 24));
}

export function exportTasks(tasks) {
  const json = JSON.stringify(tasks, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `opentask-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}