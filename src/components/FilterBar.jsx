import { Search } from "lucide-react";
import { categories, priorities, statusFilters } from "../constants.js";

function FilterBar({ filters, onChange }) {
  const updateFilter = (name, value) => {
    onChange({
      ...filters,
      [name]: value
    });
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
              {filter.label}
            </button>
          ))}
        </div>

        <select value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
          <option value="all">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select value={filters.priority} onChange={(event) => updateFilter("priority", event.target.value)}>
          <option value="all">Любой приоритет</option>
          {priorities.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default FilterBar;
