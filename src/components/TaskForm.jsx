import { useEffect, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { categories, defaultTask, priorities } from "../constants.js";

function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultTask);

  useEffect(() => {
    setForm(editingTask ?? defaultTask);
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    onSubmit(form);

    if (!editingTask) {
      setForm(defaultTask);
    }
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
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Приоритет
          <select name="priority" value={form.priority} onChange={handleChange}>
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Срок
          <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        </label>
      </div>

      <button className="primary-button" type="submit">
        {editingTask ? <Check size={18} /> : <Plus size={18} />}
        {editingTask ? "Сохранить" : "Добавить"}
      </button>
    </form>
  );
}

export default TaskForm;
