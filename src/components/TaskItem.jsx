import { CalendarDays, Check, Pencil, Trash2, Undo2 } from "lucide-react";
import { priorities } from "../constants.js";

const priorityNames = priorities.reduce((result, priority) => {
  result[priority.value] = priority.label;
  return result;
}, {});

function formatDate(value) {
  if (!value) {
    return "Без срока";
  }

  return new Intl.DateTimeFormat("ru-RU").format(new Date(`${value}T00:00:00`));
}

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-check">
        <button
          className={task.completed ? "complete-button done" : "complete-button"}
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Вернуть задачу в работу" : "Отметить задачу выполненной"}
        >
          {task.completed ? <Undo2 size={18} /> : <Check size={18} />}
        </button>
      </div>

      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`priority-badge ${task.priority}`}>{priorityNames[task.priority]}</span>
        </div>

        {task.description ? <p>{task.description}</p> : null}

        <div className="task-meta">
          <span>{task.category}</span>
          <span>
            <CalendarDays size={16} />
            {formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button className="icon-button" type="button" onClick={() => onEdit(task)} aria-label="Редактировать задачу">
          <Pencil size={18} />
        </button>
        <button className="icon-button danger" type="button" onClick={() => onDelete(task.id)} aria-label="Удалить задачу">
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
