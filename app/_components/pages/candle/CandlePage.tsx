import { Sparkles } from "../../shared/StoryDecorations";

type CandlePageProps = {
  lit: boolean;
  onExtinguish: () => void;
};

function Candle({ lit, onExtinguish }: CandlePageProps) {
  return (
    <button
      type="button"
      className={`candle-button ${lit ? "is-lit" : "is-out"}`}
      onClick={onExtinguish}
      aria-label={lit ? "Klik untuk memadamkan lilin" : "Lilin sudah padam"}
      disabled={!lit}
    >
      <svg
        className="candle-svg"
        viewBox="0 0 240 390"
        role="img"
        aria-labelledby="candle-title"
      >
        <title id="candle-title">Lilin ulang tahun dengan api yang menyala</title>
        <defs>
          <linearGradient id="waxGradient" x1="0" x2="1">
            <stop offset="0" stopColor="#258fc8" />
            <stop offset="0.48" stopColor="#61c8f2" />
            <stop offset="1" stopColor="#176f9f" />
          </linearGradient>
          <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff7c7" />
            <stop offset="0.38" stopColor="#ffcf57" />
            <stop offset="1" stopColor="#ef6a30" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.55" stopColor="#fff4a8" />
            <stop offset="1" stopColor="#ff9b3d" />
          </linearGradient>
          <filter id="flameGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feFlood floodColor="#ffb13b" floodOpacity=".75" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="9"
              floodColor="#155f87"
              floodOpacity=".24"
            />
          </filter>
        </defs>

        <ellipse className="candle-halo" cx="120" cy="92" rx="72" ry="66" />

        <g className={`flame ${lit ? "" : "flame-out"}`} filter="url(#flameGlow)">
          <path
            className="flame-outer"
            fill="url(#flameOuter)"
            d="M120 18C91 48 91 70 101 88c5 9 12 15 19 22 17-14 30-28 28-48-2-16-12-29-28-44Z"
          />
          <path
            className="flame-middle"
            fill="#ffbb3f"
            d="M120 45c-14 18-18 31-11 43 3 6 7 10 12 15 10-9 17-18 16-29-1-10-7-19-17-29Z"
          />
          <path
            className="flame-inner"
            fill="url(#flameInner)"
            d="M120 66c-7 10-9 17-5 24 1 4 4 7 6 9 6-5 9-10 8-16 0-6-3-11-9-17Z"
          />
        </g>

        <g className={`smoke ${lit ? "" : "smoke-visible"}`} aria-hidden="true">
          <path d="M120 106C101 82 143 78 121 54C108 40 122 29 132 19" />
          <path d="M125 105C146 87 116 77 137 59" />
        </g>

        <path className="wick" d="M120 122c0-10 1-18 0-28" />
        <g filter="url(#softShadow)">
          <path
            fill="url(#waxGradient)"
            d="M71 126c0-13 11-23 24-23h50c13 0 24 10 24 23v198c0 18-15 33-33 33H104c-18 0-33-15-33-33V126Z"
          />
          <path
            className="wax-highlight"
            d="M91 130c0-6 5-11 11-11h4c6 0 11 5 11 11v183c0 9-6 16-13 16s-13-7-13-16V130Z"
          />
          <path
            className="wax-drip"
            d="M91 105h58c11 0 20 9 20 20v17c-11 0-13-15-23-15-13 0-12 30-25 30-12 0-11-27-23-27-9 0-14 12-27 12v-17c0-11 9-20 20-20Z"
          />
          <ellipse cx="120" cy="107" rx="49" ry="15" fill="#7bd8f8" />
          <ellipse cx="120" cy="108" rx="37" ry="9" fill="#2da4da" opacity=".65" />
        </g>
        <ellipse className="candle-shadow" cx="120" cy="362" rx="74" ry="12" />
      </svg>
      <span className="tap-ring" aria-hidden="true" />
    </button>
  );
}

export default function CandlePage({ lit, onExtinguish }: CandlePageProps) {
  return (
    <section className="story-scene candle-scene">
      <Sparkles />
      <div className="scene-copy">
        <span className="mini-label">make a wish</span>
        <h2>{lit ? "Satu harapan dulu." : "Semoga terkabul."}</h2>
        <p>
          {lit
            ? "Pejamkan mata, buat satu harapan terbaik, lalu klik apinya untuk meniup lilin."
            : "Harapanmu sudah dikirim ke langit. Ada kejutan berikutnya..."}
        </p>
      </div>
      <Candle lit={lit} onExtinguish={onExtinguish} />
      <p className="interaction-hint">
        <span className={lit ? "pulse-dot" : "check-dot"}>{lit ? "" : "✓"}</span>
        {lit ? "Klik api untuk memadamkan" : "Lilin berhasil dipadamkan"}
      </p>
      <p className="scene-index">
        02 <span /> 04
      </p>
    </section>
  );
}
