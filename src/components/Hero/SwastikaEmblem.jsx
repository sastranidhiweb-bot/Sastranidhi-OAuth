// Devotional swastika emblem for the home hero: a right-facing (Hindu)
// swastika with four dots, inside a beaded cream circle and a ring of lotus
// petals. Drawn in a 100×100 box centred on 0,0; decorative only.

const RED = '#C62828';
const SAFFRON = '#F6A623';
const GOLD = '#F6C343';
const CREAM = '#FFF6E0';

const angles = (count, offset = 0) =>
  Array.from({ length: count }, (_, i) => offset + (360 / count) * i);

// right-facing: top arm turns right, right arm down, bottom left, left up
const SWASTIKA = 'M0 -13V13 M-13 0H13 M0 -13H13 M13 0V13 M0 13H-13 M-13 0V-13';

export default function SwastikaEmblem({ className }) {
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden="true" focusable="false">
      {/* outer lotus petals: large red, small saffron between them */}
      {angles(8).map((a) => (
        <path
          key={`p${a}`}
          d="M0 -48 Q11 -38 0 -28 Q-11 -38 0 -48 Z"
          fill={RED}
          stroke={GOLD}
          strokeWidth="1.2"
          transform={`rotate(${a})`}
        />
      ))}
      {angles(8, 22.5).map((a) => (
        <path
          key={`s${a}`}
          d="M0 -42 Q7 -35 0 -28 Q-7 -35 0 -42 Z"
          fill={SAFFRON}
          stroke={RED}
          strokeWidth="0.8"
          transform={`rotate(${a})`}
        />
      ))}

      {/* saffron ring, cream band with a ring of beads, inner disc */}
      <circle r="31" fill={SAFFRON} stroke={RED} strokeWidth="1.2" />
      <circle r="28" fill={CREAM} stroke={RED} strokeWidth="1" />
      {angles(16).map((a) => (
        <circle
          key={`b${a}`}
          cx="0"
          cy="-25"
          r="1.5"
          fill="none"
          stroke={SAFFRON}
          strokeWidth="1"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="22" fill="#FFE9C4" stroke={RED} strokeWidth="1" />

      {/* two-tone swastika: red outline with a saffron core */}
      <path d={SWASTIKA} fill="none" stroke={RED} strokeWidth="5.5" strokeLinecap="square" />
      <path d={SWASTIKA} fill="none" stroke={SAFFRON} strokeWidth="2.2" strokeLinecap="square" />

      {/* the four dots between the arms */}
      {[[6.5, -6.5], [6.5, 6.5], [-6.5, 6.5], [-6.5, -6.5]].map(([x, y]) => (
        <circle key={`d${x}${y}`} cx={x} cy={y} r="2" fill={RED} />
      ))}
    </svg>
  );
}
