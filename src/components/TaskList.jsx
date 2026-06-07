import { useState } from "react";
import { ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onEdit, onDelete, onSubtaskToggle }) {
  const [removingIds, setRemovingIds] = useState(new Set());

  const handleDelete = (taskId) => {
    setRemovingIds((prev) => new Set(prev).add(taskId));
    setTimeout(() => {
      onDelete(taskId);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(taskId);
        return next;
      });
    }, 280);
  };

  if (!tasks.length) {
    return (
      <section className="empty-state task-fade-in">
        <ClipboardList size={42} />
        <h2>Задачи не найдены</h2>
        <p>Добавьте новую задачу или измените параметры поиска.</p>
      </section>
    );
  }

  return (
    <section className="task-list" aria-label="Список задач">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-animate-wrap ${removingIds.has(task.id) ? "task-removing" : "task-entering"}`}
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={handleDelete}
            onSubtaskToggle={onSubtaskToggle}
          />
        </div>
      ))}
    </section>
  );
}

export default TaskList;
