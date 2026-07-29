export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {Array.from({ length: 15 }, (_, index) => (
        <span key={index} className={`sparkle sparkle-${index + 1}`}>
          {index % 3 === 0 ? "✦" : "·"}
        </span>
      ))}
    </div>
  );
}
