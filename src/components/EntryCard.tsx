interface Props {
  title: string;
  badge?: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
}

function badgeClass(badge?: string): string {
  if (!badge) return '';
  const b = badge.toLowerCase();
  if (b.includes('idiom') || b.includes('deyim')) return ' idiom';
  if (b.includes('phrasal')) return ' phrasal';
  return '';
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
        {badge && <span className={`pos${badgeClass(badge)}`}>{badge}</span>}
        {subtitle}
      </div>
    </button>
  );
}
