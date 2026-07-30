"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import content from "./content.json";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reef = [
  { src: "/images/sea-animation/rumputlaut.webp", className: "seaweed" },
  { src: "/images/sea-animation/karang1.webp", className: "coral-one" },
  { src: "/images/sea-animation/karang2.webp", className: "coral-two" },
  { src: "/images/sea-animation/karang3.webp", className: "coral-three" },
  { src: "/images/sea-animation/karang4.webp", className: "coral-four" },
  { src: "/images/sea-animation/karang6.webp", className: "coral-six" },
  { src: "/images/sea-animation/karang7.webp", className: "coral-seven" },
];

const memoryDecorations = [
  { friend: "/images/sea-animation/nemo.webp", reef: "/images/sea-animation/karang1.webp" },
  { friend: "/images/sea-animation/kudalaut.webp", reef: "/images/sea-animation/karang2.webp" },
  { friend: "/images/sea-animation/squid.webp", reef: "/images/sea-animation/karang3.webp" },
  { friend: "/images/sea-animation/buntal.webp", reef: "/images/sea-animation/karang4.webp" },
  { friend: "/images/sea-animation/turtle.webp", reef: "/images/sea-animation/karang6.webp" },
  { friend: "/images/sea-animation/lumba.webp", reef: "/images/sea-animation/karang7.webp" },
];

type BookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
};

type SwimmerProps = {
  src: string;
  className: string;
  direction: "left" | "right";
  size?: "small" | "medium" | "large";
};

function SectionSwimmer({
  src,
  className,
  direction,
  size = "medium",
}: SwimmerProps) {
  return (
    <div
      className={`section-swimmer swimmer-${direction} swimmer-${size} ${className}`}
      data-swim={direction}
      aria-hidden="true"
    >
      <Image src={src} alt="" fill sizes="280px" />
      <span className="swimmer-bubbles"><i /><i /><i /></span>
    </div>
  );
}

function OceanWorld() {
  return (
    <div className="ocean-world" aria-hidden="true">
      <div className="sun-rays" />
      <div className="water-grain" />
      <div className="bubble-field bubble-field-one">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>
      <div className="bubble-field bubble-field-two">
        {Array.from({ length: 10 }, (_, index) => <i key={index} />)}
      </div>
      <div className="reef-floor">
        <div className="sand-glow" />
        {reef.map((item) => (
          <div className={`reef-piece ${item.className}`} key={item.src}>
            <Image src={item.src} alt="" fill sizes="260px" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DiveIntro({ onDive }: { onDive: () => void }) {
  return (
    <section className="dive-intro">
      <div className="intro-bubbles" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
      </div>
      <div className="intro-orbit intro-orbit-one" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-two" aria-hidden="true" />
      <div className="intro-fish intro-fish-left" aria-hidden="true">
        <Image src="/images/sea-animation/nemo.webp" alt="" fill sizes="180px" priority />
      </div>
      <div className="intro-fish intro-fish-right" aria-hidden="true">
        <Image src="/images/sea-animation/shark 2.webp" alt="" fill sizes="210px" priority />
      </div>
      <div className="intro-shell">
        <p className="micro-label">a little ocean of memories</p>
        <span className="intro-date">{content.hero.eyebrow}</span>
        <h1>
          Happy
          <em>Anniversary</em>
        </h1>
        <p>{content.intro.copy}</p>
        <button type="button" className="dive-button" onClick={onDive}>
          <span>{content.intro.button}</span>
          <i aria-hidden="true">↓</i>
        </button>
      </div>
      <p className="intro-note">made for us, with love</p>
    </section>
  );
}

function StoryBook() {
  const bookRef = useRef<BookRef | null>(null);
  const [page, setPage] = useState(0);

  return (
    <div className="book-shell">
      <div className="book-topline">
        <p>{content.book.hint}</p>
        <span>{String(page + 1).padStart(2, "0")} / 06</span>
      </div>
      <HTMLFlipBook
        ref={bookRef}
        className="memory-book"
        style={{}}
        startPage={0}
        size="stretch"
        width={460}
        height={600}
        minWidth={290}
        maxWidth={460}
        minHeight={390}
        maxHeight={600}
        drawShadow
        flippingTime={900}
        usePortrait
        startZIndex={10}
        autoSize
        maxShadowOpacity={0.35}
        showCover
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={20}
        showPageCorners
        disableFlipByClick={false}
        onFlip={(event) => setPage(event.data)}
      >
        <div className="book-page book-cover" data-density="hard">
          <span className="book-bubble">♡</span>
          <p>OUR LITTLE</p>
          <h3>Sea of<br /><em>Memories</em></h3>
          <small>tap the corner to begin</small>
        </div>
        <div className="book-page photo-page">
          <span className="page-number">01</span>
          <div className="book-photo">
            <Image src={content.memories[0].src} alt={content.memories[0].alt} fill sizes="460px" />
          </div>
          <p>{content.memories[0].caption}</p>
        </div>
        <div className="book-page letter-page">
          <span className="page-number">02</span>
          <p className="letter-kicker">DEAR, US</p>
          <h3>{content.book.letterTitle}</h3>
          {content.book.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <strong>{content.book.signature}</strong>
        </div>
        <div className="book-page photo-page">
          <span className="page-number">03</span>
          <div className="book-photo">
            <Image src={content.memories[4].src} alt={content.memories[4].alt} fill sizes="460px" />
          </div>
          <p>{content.memories[4].caption}</p>
        </div>
        <div className="book-page promise-page">
          <span className="page-number">04</span>
          <p className="letter-kicker">A PROMISE</p>
          <h3>{content.book.promiseTitle}</h3>
          <div className="promise-list">
            {content.book.promises.map((promise, index) => (
              <p key={promise}><span>0{index + 1}</span>{promise}</p>
            ))}
          </div>
        </div>
        <div className="book-page book-back" data-density="hard">
          <p>AND THE STORY</p>
          <h3>goes on...</h3>
          <span>∞</span>
          <small>always &amp; all ways</small>
        </div>
      </HTMLFlipBook>
      <div className="book-controls">
        <button type="button" onClick={() => bookRef.current?.pageFlip().flipPrev()} aria-label="Halaman sebelumnya">←</button>
        <span>geser atau tekan sudut halaman</span>
        <button type="button" onClick={() => bookRef.current?.pageFlip().flipNext()} aria-label="Halaman berikutnya">→</button>
      </div>
    </div>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const interactiveBubbles = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) {
      document.body.classList.add("story-locked");
      return () => document.body.classList.remove("story-locked");
    }

    document.body.classList.remove("story-locked");
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    const bubbleLayer = interactiveBubbles.current;
    let lastPointerBubble = 0;
    let lastScrollBubble = 0;

    const makeBubble = (x: number, y: number, large = false) => {
      if (!bubbleLayer) return;
      const bubble = document.createElement("i");
      const size = large ? 18 + Math.random() * 32 : 5 + Math.random() * 14;
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.width = `${size}px`;
      bubble.style.setProperty("--bubble-drift", `${-35 + Math.random() * 70}px`);
      bubble.style.setProperty("--bubble-rise", `${100 + Math.random() * 180}px`);
      bubbleLayer.appendChild(bubble);
      bubble.addEventListener("animationend", () => bubble.remove(), { once: true });
    };

    const makeBurst = () => {
      for (let index = 0; index < 14; index += 1) {
        window.setTimeout(() => {
          makeBubble(
            window.innerWidth * (0.08 + Math.random() * 0.84),
            window.innerHeight * (0.65 + Math.random() * 0.28),
            index % 4 === 0,
          );
        }, index * 35);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointerBubble < 70) return;
      lastPointerBubble = now;
      makeBubble(event.clientX + (Math.random() - 0.5) * 18, event.clientY + 10);
    };

    const onScroll = () => {
      const now = performance.now();
      if (now - lastScrollBubble < 105) return;
      lastScrollBubble = now;
      makeBubble(
        window.innerWidth * (0.12 + Math.random() * 0.76),
        window.innerHeight - 12,
        Math.random() > 0.78,
      );
    };

    const seenSections = new WeakSet<Element>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seenSections.has(entry.target)) {
            seenSections.add(entry.target);
            makeBurst();
          }
        });
      },
      { threshold: 0.32 },
    );
    document.querySelectorAll("main > section").forEach((section) => sectionObserver.observe(section));
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      sectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      bubbleLayer?.replaceChildren();
    };
  }, [entered]);

  useGSAP(() => {
    if (!entered) return;

    const sections = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    sections.forEach((element) => {
      gsap.fromTo(
        element,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%", once: true },
        },
      );
    });

    gsap.to(".sun-rays", {
      rotate: 9,
      yPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: ".anniversary-site", start: "top top", end: "bottom bottom", scrub: 1.2 },
    });
    gsap.utils.toArray<HTMLElement>(".memory-card").forEach((card, index) => {
      gsap.from(card, {
        y: 100 + index * 10,
        rotate: index % 2 ? 5 : -5,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
      gsap.from(card.querySelector(".card-ocean-friend"), {
        x: index % 2 === 0 ? 130 : -130,
        scale: 0.45,
        opacity: 0,
        duration: 1.15,
        delay: 0.25,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
      gsap.from(card.querySelector(".card-ocean-reef"), {
        x: index % 2 === 0 ? -120 : 120,
        y: 55,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>(".section-swimmer").forEach((swimmer) => {
      const entersFromLeft = swimmer.dataset.swim === "left";
      const isMemoryTurtle = swimmer.classList.contains("memory-turtle");
      const isMemoryFish = swimmer.classList.contains("memory-dolphin");
      const isDelayedMemoryObject = isMemoryTurtle || isMemoryFish;
      gsap.fromTo(
        swimmer,
        {
          x: entersFromLeft ? -480 : 480,
          rotate: entersFromLeft ? -12 : 12,
          opacity: 0,
        },
        {
          x: 0,
          rotate: entersFromLeft ? 4 : -4,
          opacity: 1,
          duration: isDelayedMemoryObject ? 2.15 : 1.35,
          delay: isMemoryFish ? 0.5 : isMemoryTurtle ? 0.3 : 0,
          ease: isDelayedMemoryObject ? "power3.out" : "back.out(1.35)",
          scrollTrigger: {
            trigger: swimmer,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, { scope: root, dependencies: [entered], revertOnUpdate: true });

  const enterStory = () => {
    const timeline = gsap.timeline();
    timeline
      .set(".transition-burst", { autoAlpha: 1 })
      .fromTo(
        ".transition-burst i",
        { scale: 0.05, opacity: 0 },
        {
          x: () => -20 + Math.random() * 40,
          y: () => -20 + Math.random() * 40,
          scale: () => 2.5 + Math.random() * 0.75,
          opacity: 1,
          duration: 0.62,
          stagger: { amount: 0.18, from: "random" },
          ease: "power2.out",
          force3D: true,
        },
      )
      .to(".intro-shell, .intro-fish, .intro-note", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }, 0.2)
      .to(".dive-intro", {
        opacity: 0,
        duration: 0.18,
        ease: "none",
      }, 0.58)
      .call(() => {
        setEntered(true);
        window.scrollTo({ top: 0 });
      }, [], 0.64)
      .to(".transition-burst", {
        opacity: 0,
        duration: 0.42,
        ease: "power2.inOut",
      }, 0.82)
      .set(".transition-burst", { visibility: "hidden" })
      .set(".transition-burst i", { clearProps: "transform,opacity" });
  };

  return (
    <div ref={root} className={`anniversary-site ${entered ? "has-entered" : ""}`}>
      <OceanWorld />
      <div ref={interactiveBubbles} className="interactive-bubbles" aria-hidden="true" />
      <div className="transition-burst" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${6 + (index % 6) * 17.6}%`,
              top: `${10 + Math.floor(index / 6) * 40}%`,
              width: `${155 + ((index * 19) % 75)}px`,
            }}
          />
        ))}
      </div>
      {!entered && <DiveIntro onDive={enterStory} />}

      <nav className="ocean-nav">
        <p>our anniversary</p>
        <a href="#memories">our story <span>↓</span></a>
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-distant-fish distant-fish-one" aria-hidden="true">
            <Image src="/images/sea-animation/nemo.webp" alt="" fill sizes="110px" />
          </div>
          <div className="hero-distant-fish distant-fish-two" aria-hidden="true">
            <Image src="/images/sea-animation/shark 2.webp" alt="" fill sizes="150px" />
          </div>
          <SectionSwimmer src="/images/sea-animation/squid.webp" className="hero-squid" direction="left" size="small" />
          <div className="hero-copy">
            <p className="hero-eyebrow" data-reveal>{content.hero.eyebrow}</p>
            <h1 data-reveal>
              Another year,
              <em>still you.</em>
            </h1>
            <p className="hero-description" data-reveal>{content.hero.copy}</p>
            <a className="hero-link" href="#memories" data-reveal>
              <span>selami cerita kita</span><i>↓</i>
            </a>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="hero-photo hero-photo-back">
              <Image src={content.memories[1].src} alt={content.memories[1].alt} fill priority sizes="(max-width: 760px) 68vw, 28vw" />
            </div>
            <div className="hero-photo hero-photo-front">
              <Image src={content.memories[0].src} alt={content.memories[0].alt} fill priority sizes="(max-width: 760px) 68vw, 28vw" />
            </div>
            <div className="hero-photo-reef hero-reef-left" aria-hidden="true">
              <Image src="/images/sea-animation/karang7.webp" alt="" fill sizes="180px" />
            </div>
            <div className="hero-photo-reef hero-reef-center" aria-hidden="true">
              <Image src="/images/sea-animation/karang6.webp" alt="" fill sizes="130px" />
            </div>
            <div className="hero-photo-reef hero-reef-right" aria-hidden="true">
              <Image src="/images/sea-animation/karang3.webp" alt="" fill sizes="160px" />
            </div>
            <span className="hero-sticker">you<br />&amp; me</span>
            <span className="photo-caption">the best thing I found<br />in this big blue world</span>
          </div>
          <div className="depth-marker"><span>00 M</span><i /><span>OUR DAY</span></div>
        </section>

        <section className="love-note">
          <SectionSwimmer src="/images/sea-animation/nemo.webp" className="note-nemo" direction="left" size="small" />
          <SectionSwimmer src="/images/sea-animation/buntal.webp" className="note-puffer" direction="right" size="small" />
          <div className="note-orbit" aria-hidden="true" />
          <p className="section-index" data-reveal>01 — INTO THE BLUE</p>
          <h2 data-reveal>{content.note.title}</h2>
          <p className="note-copy" data-reveal>{content.note.copy}</p>
          <div className="love-stats" data-reveal>
            <div><strong>2</strong><span>hearts</span></div>
            <i>+</i>
            <div><strong>1</strong><span>story</span></div>
            <i>=</i>
            <div><strong>∞</strong><span>memories</span></div>
          </div>
        </section>

        <section className="memory-journey" id="memories">
          <SectionSwimmer src="/images/sea-animation/turtle.webp" className="memory-turtle" direction="right" size="medium" />
          <SectionSwimmer src="/images/sea-animation/lumba.webp" className="memory-dolphin" direction="right" size="large" />
          <header className="memory-header">
            <p className="section-index" data-reveal>02 — OUR FAVORITE MOMENTS</p>
            <h2 data-reveal>Enam bingkai,<br /><em>satu cerita kita.</em></h2>
            <p data-reveal>{content.gallery.copy}</p>
          </header>
          <div className="memory-grid">
            {content.memories.map((memory, index) => (
              <figure className={`memory-card memory-card-${index + 1}`} key={memory.src}>
                <div className="card-ocean-friend" aria-hidden="true">
                  <Image src={memoryDecorations[index].friend} alt="" fill sizes="120px" />
                  <span><i /><i /><i /></span>
                </div>
                <div className="card-ocean-reef" aria-hidden="true">
                  <Image src={memoryDecorations[index].reef} alt="" fill sizes="150px" />
                </div>
                <div className="memory-photo">
                  <Image src={memory.src} alt={memory.alt} fill sizes="(max-width: 700px) 78vw, 34vw" />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{memory.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <SectionSwimmer src="/images/sea-animation/shark 2.webp" className="quote-shark" direction="left" size="medium" />
          <SectionSwimmer src="/images/sea-animation/squid.webp" className="quote-squid" direction="right" size="small" />
          <div className="quote-bubbles" aria-hidden="true"><i /><i /><i /><i /></div>
          <p className="section-index" data-reveal>FOUND AT THE DEEPEST PART OF MY HEART</p>
          <blockquote data-reveal>“{content.quote}”</blockquote>
          <span data-reveal>— always, us</span>
        </section>

        <section className="book-section">
          <SectionSwimmer src="/images/sea-animation/kudalaut.webp" className="book-seahorse" direction="left" size="small" />
          <SectionSwimmer src="/images/sea-animation/nemo.webp" className="book-nemo" direction="right" size="small" />
          <SectionSwimmer src="/images/sea-animation/shark.webp" className="book-shark" direction="left" size="large" />
          <div className="book-heading">
            <p className="section-index" data-reveal>03 — A LETTER FOR US</p>
            <h2 data-reveal>A little book of<br /><em>big feelings.</em></h2>
            <p data-reveal>{content.book.copy}</p>
          </div>
          <div data-reveal><StoryBook /></div>
        </section>

        <section className="closing-section">
          <SectionSwimmer src="/images/sea-animation/turtle.webp" className="closing-turtle" direction="right" size="medium" />
          <SectionSwimmer src="/images/sea-animation/lumba.webp" className="closing-dolphin" direction="left" size="large" />
          <div className="closing-ring closing-ring-one" aria-hidden="true" />
          <div className="closing-ring closing-ring-two" aria-hidden="true" />
          <p className="section-index" data-reveal>TO BE CONTINUED — FOREVER</p>
          <h2 data-reveal>
            Happy anniversary,
            <em>sayang.</em>
          </h2>
          <p data-reveal>{content.closing}</p>
          <div className="closing-heart" data-reveal>♡</div>
          <a href="#top" className="back-to-top" data-reveal>
            kembali ke permukaan <span>↑</span>
          </a>
          <small>MADE WITH LOVE • FOR OUR LITTLE UNIVERSE</small>
        </section>
      </main>
    </div>
  );
}
