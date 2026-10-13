import { ALPHABET } from '../utils/search';

interface Props {
  selected: string;
  onSelect: (letter: string) => void;
  label: string;
}

export default function AlphabetFilter({ selected, onSelect, label }: Props) {
  return (
    <div className="alphabet" role="group" aria-label={label}>
      <button
        type="button"
        className={`alpha-btn all${selected === 'ALL' ? ' active' : ''}`}
        aria-pressed={selected === 'ALL'}
        onClick={() => onSelect('ALL')}
      >
        Tümü
      </button>
      {ALPHABET.map((letter) => (
        <button
          key={letter}
          type="button"
          className={`alpha-btn${selected === letter ? ' active' : ''}`}
          aria-pressed={selected === letter}
          aria-label={`${letter} ile başlayanlar`}
          onClick={() => onSelect(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
