import { useEffect, useMemo, useState } from "react";
import FilterBar from "./components/FilterBar.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import Toast from "./components/Toast.jsx";
import { loadTasks, saveTasks } from "./utils/storage.js";
import { createTask, filterTasks, getTaskStats, exportTasks } from "./utils/tasks.js";
import { Moon, Sun, Trash2, Download } from "lucide-react";

const initialFilters = {
  search: "",
  status: "all",
  category: "all",
  priority: "all",
  sort: "dueDate"
};

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
  } catch {
    return false;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function saveTheme(isDark) {
  try {
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    return;
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filters, setFilters] = useState(initialFilters);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => { saveTasks(tasks); }, [tasks]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    saveTheme(isDark);
  }, [isDark]);

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
                dueDate: form.dueDate,
                subtasks: form.subtasks ?? []
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

  const handleSubtaskToggle = (taskId, subtaskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: (task.subtasks ?? []).map((s) =>
                s.id === subtaskId ? { ...s, completed: !s.completed } : s
              )
            }
          : task
      )
    );
  };

  const handleDelete = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    const snapshot = [...tasks];
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    if (editingTask?.id === taskId) setEditingTask(null);
    setToast({ id: taskId, title: taskToDelete.title, snapshot });
  };

  const handleUndo = () => {
    if (toast?.snapshot) setTasks(toast.snapshot);
    setToast(null);
  };

  const handleToastClose = () => setToast(null);

  const clearCompleted = () => {
    if (!tasks.some((t) => t.completed)) return;
    setShowConfirm(true);
  };

  const confirmClearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
    setShowConfirm(false);
  };

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <span className="eyebrow">Менеджер задач</span>
          <h1>OpenTask</h1>
          <p>Организуйте задачи по срокам, статусу, категориям и приоритетам.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="icon-button"
            onClick={() => exportTasks(tasks)}
            aria-label="Экспорт задач"
            title="Скачать задачи в JSON"
          >
            <Download size={20} />
          </button>
          <button
            className="icon-button"
            onClick={() => setIsDark(!isDark)}
            aria-label="Переключить тему"
            title="Переключить тему"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <StatsPanel stats={stats} />

      <div className="workspace">
        <TaskForm editingTask={editingTask} onSubmit={handleSubmit} onCancel={() => setEditingTask(null)} />

        <section className="tasks-panel">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            stats={stats}
            onClearCompleted={clearCompleted}
          />
          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggle}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onSubtaskToggle={handleSubtaskToggle}
          />
        </section>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-wrap">
              <Trash2 size={22} />
            </div>
            <h3>Удалить выполненные?</h3>
            <p>Это действие нельзя отменить. Все отмеченные задачи будут удалены безвозвратно.</p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowConfirm(false)}>Отмена</button>
              <button className="modal-confirm" onClick={confirmClearCompleted}>
                <Trash2 size={16} /> Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast message={`«${toast.title}»`} onUndo={handleUndo} onClose={handleToastClose} />
      )}
    </main>
  );
}

export default App;
