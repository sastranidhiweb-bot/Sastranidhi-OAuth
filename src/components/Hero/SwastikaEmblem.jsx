// Devotional swastika emblem for the home hero: a right-facing (Hindu)
// swastika with four dots, inside a beaded cream circle and a ring of lotus
// petals. Drawn in a 100×100 box centred on 0,0; decorative only.

const RED = '#C62828';
const SAFFRON = '#F6A623';
const GOLD = '#F6C343';
const CREAM = '#FFF6E0';
const GREEN = '#3E9B6E';
const GREEN_DARK = '#1F5E43';
// white lotus petals
const PETAL = '#FFFFFF';
const PETAL_HEART = '#FFF1D2';
const VEIN = '#D9B65C';

const angles = (count, offset = 0) =>
  Array.from({ length: count }, (_, i) => offset + (360 / count) * i);

// right-facing: top arm turns right, right arm down, bottom left, left up
const SWASTIKA = 'M0 -13V13 M-13 0H13 M0 -13H13 M13 0V13 M0 13H-13 M-13 0V-13';

export default function SwastikaEmblem({ className }) {
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden="true" focusable="false">
      {/* lotus: tiny dots ringing the flower, green leaves behind, then
          layered white petals (cream heart, fine gold veins) */}
      {angles(16, 11.25).map((a) => (
        <circle key={`o${a}`} cx="0" cy="-48.5" r="1" fill={GOLD} transform={`rotate(${a})`} />
      ))}
      {angles(8, 22.5).map((a) => (
        <path
          key={`l${a}`}
          d="M0 -46 Q9 -38 0 -29 Q-9 -38 0 -46 Z M0 -44 V-31"
          fill={GREEN}
          stroke={GREEN_DARK}
          strokeWidth="0.8"
          transform={`rotate(${a})`}
        />
      ))}
      {angles(8).map((a) => (
        <g key={`p${a}`} transform={`rotate(${a})`}>
          {/* outer petal with a pointed lotus tip */}
          <path
            d="M0 -48 C5 -45 12 -38 9 -31 C6 -28 -6 -28 -9 -31 C-12 -38 -5 -45 0 -48 Z"
            fill={PETAL}
            stroke={GOLD}
            strokeWidth="1"
          />
          {/* inner petal */}
          <path
            d="M0 -44 C4 -41 7 -36 5 -31 L-5 -31 C-7 -36 -4 -41 0 -44 Z"
            fill={PETAL_HEART}
          />
          {/* veins fanning from the base */}
          <path
            d="M0 -31 V-42 M0 -31 L3 -39 M0 -31 L-3 -39 M0 -31 L5 -35 M0 -31 L-5 -35"
            stroke={VEIN}
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </g>
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
