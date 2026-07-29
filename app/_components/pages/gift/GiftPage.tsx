import { Sparkles } from "../../shared/StoryDecorations";

type GiftPageProps = {
  opened: boolean;
  onOpen: () => void;
};

function GiftEnvelope({ opened, onOpen }: GiftPageProps) {
  return (
    <button
      type="button"
      className={`gift-button ${opened ? "is-open" : ""}`}
      onClick={onOpen}
      aria-label={opened ? "Surat sudah terbuka" : "Klik untuk membuka amplop"}
      disabled={opened}
    >
      <div className="envelope-scene" aria-hidden="true">
        <div className="envelope-back" />
        <div className="gift-letter">
          <div className="popup-titlebar">
            <span className="popup-controls">
              <i />
              <i />
              <i />
            </span>
            <small>pesan untukmu</small>
          </div>
          <div className="popup-content">
            <span className="letter-flower">✦</span>
            <small>khusus untuk</small>
            <strong>Belinda</strong>
            <em>27 · 07</em>
            <span className="popup-progress" />
          </div>
        </div>
        <div className="envelope-flap">
          <span className="envelope-seal">B</span>
        </div>
        <div className="envelope-front">
          <span className="envelope-fold envelope-fold-left" />
          <span className="envelope-fold envelope-fold-right" />
          <span className="envelope-fold envelope-fold-bottom" />
        </div>
        <span className="envelope-shine" />
        <div className="envelope-floor-shadow" />
      </div>
    </button>
  );
}

export default function GiftPage({ opened, onOpen }: GiftPageProps) {
  return (
    <section className={`story-scene gift-page ${opened ? "gift-page-open" : ""}`}>
      <Sparkles />
      <div className="scene-copy">
        <span className="mini-label">one more thing</span>
        <h2>{opened ? "Surat kecil untukmu." : "Ada sesuatu untukmu."}</h2>
        <p>
          {opened
            ? "Biarkan pesannya terbuka sebentar. Setelah ini, halaman kenanganmu akan muncul."
            : "Sebuah pesan kecil yang dibuat dengan banyak rasa. Coba buka amplopnya."}
        </p>
      </div>
      <GiftEnvelope opened={opened} onOpen={onOpen} />
      <p className="interaction-hint">
        <span className={opened ? "check-dot" : "pulse-dot"}>
          {opened ? "✓" : ""}
        </span>
        {opened ? "Popup terbuka · lanjut otomatis..." : "Klik amplopnya"}
      </p>
      <p className="scene-index">
        03 <span /> 04
      </p>
    </section>
  );
}
