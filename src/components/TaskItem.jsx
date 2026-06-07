import { AlertCircle, CalendarDays, Check, Pencil, Trash2, Undo2 } from "lucide-react";
import { useState } from "react";
import { priorities } from "../constants.js";
import { isOverdue, overdueDays } from "../utils/tasks.js";

const priorityNames = priorities.reduce((result, priority) => {
  result[priority.value] = priority.label;
  return result;
}, {});

function formatDate(value) {
  if (!value) return "Без срока";
  return new Intl.DateTimeFormat("ru-RU").format(new Date(`${value}T00:00:00`));
}

function TaskItem({ task, onToggle, onEdit, onDelete, onSubtaskToggle }) {
  const overdue = isOverdue(task);
  const days = overdue ? overdueDays(task.dueDate) : 0;
  const subtasks = task.subtasks ?? [];
  const doneCount = subtasks.filter((s) => s.completed).length;
  const progress = subtasks.length > 0 ? Math.round((doneCount / subtasks.length) * 100) : null;

  return (
    <article className={`task-item ${task.completed ? "completed" : ""} ${overdue ? "overdue" : ""}`}>
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
          <h3>
            {task.title}
            {overdue && (
              <span className="overdue-badge">
                <AlertCircle size={12} />
                Просрочено
              </span>
            )}
          </h3>
          <span className={`priority-badge ${task.priority}`}>{priorityNames[task.priority]}</span>
        </div>

        {task.description ? <p>{task.description}</p> : null}

        {subtasks.length > 0 && (
          <div className="subtasks-block">
            <div className="subtasks-progress-row">
              <div className="subtasks-progress-bar">
                <div className="subtasks-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="subtasks-counter">{doneCount}/{subtasks.length}</span>
            </div>
            <ul className="subtask-list subtask-list--view">
              {subtasks.map((s) => (
                <li key={s.id} className={`subtask-view-item ${s.completed ? "done" : ""}`}>
                  <button
                    type="button"
                    className="subtask-check"
                    onClick={() => onSubtaskToggle(task.id, s.id)}
                    aria-label={s.completed ? "Снять отметку" : "Отметить выполненной"}
                  >
                    {s.completed ? <Check size={12} /> : null}
                  </button>
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="task-meta">
          <span>{task.category}</span>
          <span className={overdue ? "overdue-date" : ""}>
            <CalendarDays size={16} />
            {formatDate(task.dueDate)}
            {overdue && ` — просрочено на ${days} дн.`}
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
