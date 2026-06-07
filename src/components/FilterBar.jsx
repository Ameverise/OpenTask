import { Search, Trash2 } from "lucide-react";
import { categories, priorities, statusFilters } from "../constants.js";

const sortOptions = [
  { value: "dueDate",   label: "По сроку" },
  { value: "priority",  label: "По приоритету" },
  { value: "createdAt", label: "По дате создания" },
  { value: "title",     label: "По названию" }
];

function FilterBar({ filters, onChange, stats, onClearCompleted }) {
  const updateFilter = (name, value) => {
    onChange({ ...filters, [name]: value });
  };

  const countByStatus = {
    all: stats.total,
    active: stats.active,
    completed: stats.completed
  };

  return (
    <section className="filter-bar" aria-label="Фильтры задач">
      <div className="search-field">
        <Search size={19} />
        <input
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          placeholder="Поиск по названию"
        />
      </div>

      <div className="filter-row">
        <div className="segmented-control">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              className={filters.status === filter.value ? "active" : ""}
              type="button"
              onClick={() => updateFilter("status", filter.value)}
            >
              <span>{filter.label}</span>
              <span className={`status-count ${filters.status === filter.value ? "active" : ""}`}>
                {countByStatus[filter.value]}
              </span>
            </button>
          ))}
        </div>

        <select value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
          <option value="all">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select value={filters.priority} onChange={(event) => updateFilter("priority", event.target.value)}>
          <option value="all">Любой приоритет</option>
          {priorities.map((priority) => (
            <option key={priority.value} value={priority.value}>{priority.label}</option>
          ))}
        </select>

        <select value={filters.sort || "dueDate"} onChange={(event) => updateFilter("sort", event.target.value)}>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <button
          className="icon-button danger clear-completed-btn"
          onClick={onClearCompleted}
          title="Удалить все выполненные задачи"
        >
          <Trash2 size={18} />
          Очистить ({stats.completed})
        </button>
      </div>
    </section>
  );
}

export default FilterBar;
