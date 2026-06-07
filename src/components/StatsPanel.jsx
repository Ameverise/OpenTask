import { CircleCheck, CircleDashed, ListTodo } from "lucide-react";

function StatsPanel({ stats }) {
  const cards = [
    {
      label: "Всего",
      value: stats.total,
      icon: ListTodo
    },
    {
      label: "Активные",
      value: stats.active,
      icon: CircleDashed
    },
    {
      label: "Выполненные",
      value: stats.completed,
      icon: CircleCheck
    }
  ];

  return (
    <section className="stats-grid" aria-label="Статистика задач">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article className="stat-card" key={card.label}>
            <Icon size={22} />
            <div>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default StatsPanel;
