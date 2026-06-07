const storageKey = "opentask.tasks";

export function loadTasks() {
  try {
    const savedTasks = window.localStorage.getItem(storageKey);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  window.localStorage.setItem(storageKey, JSON.stringify(tasks));
}
