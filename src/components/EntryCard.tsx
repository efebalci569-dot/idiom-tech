interface Props {
  title: string;
  badge?: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
}

export function EntryCard({ title, badge, subtitle, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`entry-card${selected ? ' selected' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <div className="head">{title}</div>
      <div className="meta">
        {badge && <span className="pos">{badge}</span>}
        {subtitle}
      </div>
    </button>
  );
}
