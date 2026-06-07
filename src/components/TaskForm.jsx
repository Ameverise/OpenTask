import { useEffect, useState } from "react";
import { Check, Plus, X, Trash2 } from "lucide-react";
import { categories, defaultTask, priorities } from "../constants.js";

function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultTask);
  const [subtaskInput, setSubtaskInput] = useState("");

  useEffect(() => {
    setForm(editingTask ? { ...editingTask, subtasks: editingTask.subtasks ?? [] } : { ...defaultTask, subtasks: [] });
    setSubtaskInput("");
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const addSubtask = () => {
    const text = subtaskInput.trim();
    if (!text) return;
    setForm((f) => ({
      ...f,
      subtasks: [...(f.subtasks ?? []), { id: crypto.randomUUID(), text, completed: false }]
    }));
    setSubtaskInput("");
  };

  const removeSubtask = (id) => {
    setForm((f) => ({ ...f, subtasks: f.subtasks.filter((s) => s.id !== id) }));
  };

  const handleSubtaskKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addSubtask(); }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    if (!editingTask) setForm({ ...defaultTask, subtasks: [] });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <h2>{editingTask ? "Редактирование задачи" : "Новая задача"}</h2>
          <p>Заполните основные поля и сохраните задачу в списке.</p>
        </div>
        {editingTask ? (
          <button className="icon-button" type="button" onClick={onCancel} aria-label="Отменить редактирование">
            <X size={20} />
          </button>
        ) : null}
      </div>

      <label>
        Название
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Например: подготовить отчет"
          required
        />
      </label>

      <label>
        Описание
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Кратко опишите задачу"
          rows="4"
        />
      </label>

      <div className="form-grid">
        <label>
          Категория
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          Приоритет
          <select name="priority" value={form.priority} onChange={handleChange}>
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </select>
        </label>

        <label>
          Срок
          <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        </label>
      </div>

      <div className="subtasks-section">
        <span className="subtasks-label">Подзадачи</span>
        <div className="subtask-input-row">
          <input
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            onKeyDown={handleSubtaskKey}
            placeholder="Добавить подзадачу..."
          />
          <button type="button" className="icon-button" onClick={addSubtask} aria-label="Добавить подзадачу">
            <Plus size={18} />
          </button>
        </div>

        {form.subtasks && form.subtasks.length > 0 && (
          <ul className="subtask-list">
            {form.subtasks.map((s) => (
              <li key={s.id} className="subtask-item-form">
                <span>{s.text}</span>
                <button type="button" className="icon-button danger subtask-remove" onClick={() => removeSubtask(s.id)} aria-label="Удалить подзадачу">
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="primary-button" type="submit">
        {editingTask ? <Check size={18} /> : <Plus size={18} />}
        {editingTask ? "Сохранить" : "Добавить"}
      </button>
    </form>
  );
}

export default TaskForm;
