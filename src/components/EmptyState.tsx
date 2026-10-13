import { SearchX } from 'lucide-react';

interface Props {
  message: string;
  onReset?: () => void;
}

export default function EmptyState({ message, onReset }: Props) {
  return (
    <div className="empty" role="status">
      <SearchX size={36} aria-hidden="true" />
      <p style={{ fontWeight: 700, color: 'var(--text)' }}>{message}</p>
      {onReset && (
        <button type="button" className="btn btn-secondary" onClick={onReset}>
          Aramayı ve filtreleri temizle
        </button>
      )}
    </div>
  );
}
