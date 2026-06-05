import { useEffect, useMemo, useState } from "react";
import FilterBar from "./components/FilterBar.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { loadTasks, saveTasks } from "./utils/storage.js";
import { createTask, filterTasks, getTaskStats } from "./utils/tasks.js";

const initialFilters = {
  search: "",
  status: "all",
  category: "all",
  priority: "all"
};

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filters, setFilters] = useState(initialFilters);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const visibleTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const handleSubmit = (form) => {
    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: form.title.trim(),
                description: form.description.trim(),
                category: form.category,
                priority: form.priority,
                dueDate: form.dueDate
              }
            : task
        )
      );
      setEditingTask(null);
      return;
    }

    setTasks((currentTasks) => [createTask(form), ...currentTasks]);
  };

  const handleToggle = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleDelete = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <span className="eyebrow">Менеджер задач</span>
          <h1>OpenTask</h1>
          <p>Организуйте задачи по срокам, статусу, категориям и приоритетам.</p>
        </div>
      </header>

      <StatsPanel stats={stats} />

      <div className="workspace">
        <TaskForm editingTask={editingTask} onSubmit={handleSubmit} onCancel={() => setEditingTask(null)} />

        <section className="tasks-panel">
          <FilterBar filters={filters} onChange={setFilters} />
          <TaskList tasks={visibleTasks} onToggle={handleToggle} onEdit={setEditingTask} onDelete={handleDelete} />
        </section>
      </div>
    </main>
  );
}

export default App;
