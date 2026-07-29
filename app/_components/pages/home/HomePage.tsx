import Image from "next/image";
import { memories, wishes } from "./data";

type HomePageProps = {
  onRestart: () => void;
};

export default function HomePage({ onRestart }: HomePageProps) {
  return (
    <main className="birthday-home">
      <nav className="home-nav" aria-label="Navigasi utama">
        <a className="monogram" href="#top" aria-label="Kembali ke atas">
          BC
        </a>
        <p>Untuk hari terbaikmu</p>
        <a className="nav-date" href="#letter">
          27 · 07 · 26
        </a>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-kicker reveal">Twenty Seven · July</p>
          <h1 className="reveal">
            Happy birthday,
            <em>Belinda.</em>
          </h1>
          <p className="hero-intro reveal">
            Hari ini, dunia punya satu alasan lagi untuk tersenyum: kamu bertambah
            usia.
          </p>
        </div>
        <div className="hero-photo-wrap reveal">
          <span className="hero-stamp">
            the birthday
            <br />
            girl
          </span>
          <div className="hero-photo">
            <Image
              src="/images/foto4.png"
              alt="Belinda tersenyum cerah di taman"
              fill
              priority
              sizes="(max-width: 760px) 82vw, 38vw"
            />
          </div>
          <span className="photo-tape tape-one" />
          <span className="photo-tape tape-two" />
        </div>
        <a className="scroll-cue" href="#letter">
          <span>Scroll untuk membuka</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="letter-section" id="letter">
        <div className="section-number reveal">01</div>
        <div className="letter-heading reveal">
          <p className="section-kicker">A note, from the heart</p>
          <h2>Untuk perempuan yang membuat hari biasa terasa istimewa.</h2>
        </div>
        <article className="letter-card reveal">
          <span className="letter-card-date">27 / 07 / 2026</span>
          <p className="letter-salutation">Dear Belinda,</p>
          <p>
            Selamat ulang tahun. Terima kasih sudah menjadi kamu—dengan semua
            kebaikan, ketulusan, dan caramu membuat orang-orang di sekelilingmu
            merasa berarti.
          </p>
          <p>
            Di usia yang baru ini, semoga langkahmu terasa lebih ringan, doamu satu
            per satu menemukan jawaban, dan bahagiamu selalu punya alasan untuk
            pulang.
          </p>
          <p>
            Jangan lupa: kamu dicintai lebih banyak dari yang mungkin kamu sadari.
          </p>
          <div className="letter-signature">
            <span>with all the best wishes,</span>
            <strong>seseorang yang beruntung memilikimu ♡</strong>
          </div>
        </article>
      </section>

      <section className="memory-section">
        <div className="section-number reveal">02</div>
        <div className="memory-heading reveal">
          <p className="section-kicker">Little moments, big feelings</p>
          <h2>Beberapa halaman dari kamu yang selalu kusuka.</h2>
          <p>
            Karena setiap fotomu menyimpan cerita yang pantas diingat lebih lama.
          </p>
        </div>
        <div className="photo-grid">
          {memories.map((memory, index) => (
            <figure
              className={`memory-card memory-card-${index + 1} reveal`}
              key={memory.src}
            >
              <div className="memory-image">
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  fill
                  sizes="(max-width: 700px) 86vw, (max-width: 1100px) 44vw, 28vw"
                />
              </div>
              <figcaption>
                <span>{memory.number}</span>
                <p>{memory.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <span className="quote-flower flower-left" aria-hidden="true">
          ❀
        </span>
        <span className="quote-flower flower-right" aria-hidden="true">
          ❀
        </span>
        <p className="section-kicker reveal">A small reminder</p>
        <blockquote className="reveal">
          “Semoga kamu selalu melihat dirimu seindah orang-orang yang menyayangimu
          melihatmu.”
        </blockquote>
        <span className="quote-rule reveal" />
      </section>

      <section className="wishes-section">
        <div className="wishes-intro reveal">
          <div className="section-number">03</div>
          <p className="section-kicker">This year, I wish you</p>
          <h2>Empat doa kecil untuk satu tahun yang besar.</h2>
        </div>
        <div className="wishes-grid">
          {wishes.map((wish) => (
            <article className="wish-card reveal" key={wish.number}>
              <span>{wish.number}</span>
              <div className="wish-icon" aria-hidden="true">
                ✦
              </div>
              <h3>{wish.title}</h3>
              <p>{wish.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="together-section">
        <div className="together-photo reveal">
          <Image
            src="/images/fotbar1.png"
            alt="Momen hangat bersama Belinda"
            fill
            sizes="(max-width: 800px) 92vw, 54vw"
          />
        </div>
        <div className="together-copy reveal">
          <p className="section-kicker">And after all...</p>
          <h2>Terima kasih sudah hadir di dunia.</h2>
          <p>
            Semoga hari ini memelukmu dengan lembut, seperti caramu membuat banyak
            hari terasa lebih hangat.
          </p>
          <span className="together-date">27 JULI — BELINDA CAHYANI</span>
        </div>
      </section>

      <footer className="birthday-footer">
        <p className="footer-small">Made with a full heart for</p>
        <h2>Belinda Cahyani</h2>
        <p className="footer-wish">Selamat bertambah usia, sayang. ♡</p>
        <button type="button" className="restart-button" onClick={onRestart}>
          <span className="restart-icon" aria-hidden="true">
            ↺
          </span>
          Mulai dari awal
        </button>
        <p className="restart-note">Putar kembali semua kejutan</p>
        <p className="footer-year">MMXXVI · 27 JULI</p>
      </footer>
    </main>
  );
}
