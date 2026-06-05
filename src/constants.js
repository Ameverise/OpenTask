export const categories = [
  "Работа",
  "Учеба",
  "Дом",
  "Личное",
  "Проект"
];

export const priorities = [
  {
    value: "low",
    label: "Низкий"
  },
  {
    value: "medium",
    label: "Средний"
  },
  {
    value: "high",
    label: "Высокий"
  }
];

export const statusFilters = [
  {
    value: "all",
    label: "Все"
  },
  {
    value: "active",
    label: "Активные"
  },
  {
    value: "completed",
    label: "Выполненные"
  }
];

export const defaultTask = {
  title: "",
  description: "",
  category: categories[0],
  priority: "medium",
  dueDate: ""
};
