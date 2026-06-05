import { ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <section className="empty-state">
        <ClipboardList size={42} />
        <h2>Задачи не найдены</h2>
        <p>Добавьте новую задачу или измените параметры поиска.</p>
      </section>
    );
  }

  return (
    <section className="task-list" aria-label="Список задач">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default TaskList;
