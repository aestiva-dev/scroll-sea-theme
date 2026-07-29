import { ArrowIcon, Sparkles } from "../../shared/StoryDecorations";

type WelcomePageProps = {
  onNext: () => void;
};

export default function WelcomePage({ onNext }: WelcomePageProps) {
  return (
    <section className="story-scene welcome-scene">
      <Sparkles />
      <div className="scene-card welcome-card">
        <div className="eyebrow">
          <span /> 27 Juli 2026 <span />
        </div>
        <p className="hand-note">a little something for you</p>
        <h1>
          Hari ini milikmu,
          <em>Belinda Cahyani.</em>
        </h1>
        <p className="welcome-copy">
          Ada sebuah perjalanan kecil yang sudah disiapkan. Luangkan sebentar,
          tersenyum, lalu nikmati setiap bagiannya.
        </p>
        <button type="button" className="primary-button" onClick={onNext}>
          Mulai kejutan <ArrowIcon />
        </button>
      </div>
      <p className="scene-index">
        01 <span /> 04
      </p>
    </section>
  );
}
