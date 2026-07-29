"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CandlePage from "./_components/pages/candle/CandlePage";
import GiftPage from "./_components/pages/gift/GiftPage";
import HomePage from "./_components/pages/home/HomePage";
import WelcomePage from "./_components/pages/welcome/WelcomePage";

type Scene = "welcome" | "candle" | "gift" | "home";
type TransitionPhase = "idle" | "exiting" | "entering";

export default function Home() {
  const [scene, setScene] = useState<Scene>("welcome");
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("idle");
  const [candleLit, setCandleLit] = useState(true);
  const [giftOpened, setGiftOpened] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const delay = useCallback((callback: () => void, duration: number) => {
    const timer = setTimeout(callback, duration);
    timers.current.push(timer);
  }, []);

  const changeScene = useCallback(
    (nextScene: Scene) => {
      if (transitionPhase !== "idle") return;

      setTransitionPhase("exiting");
      delay(() => {
        setScene(nextScene);
        setTransitionPhase("entering");
        if (nextScene === "home") {
          window.scrollTo({ top: 0 });
        }
      }, 440);
      delay(() => setTransitionPhase("idle"), 1220);
    },
    [delay, transitionPhase],
  );

  const extinguishCandle = () => {
    if (!candleLit) return;
    setCandleLit(false);
    delay(() => changeScene("gift"), 1500);
  };

  const openGift = () => {
    if (giftOpened) return;
    setGiftOpened(true);
    delay(() => changeScene("home"), 3200);
  };

  const restartExperience = () => {
    if (transitionPhase !== "idle") return;

    setTransitionPhase("exiting");
    delay(() => {
      setCandleLit(true);
      setGiftOpened(false);
      setScene("welcome");
      setTransitionPhase("entering");
      window.scrollTo({ top: 0 });
    }, 440);
    delay(() => setTransitionPhase("idle"), 1220);
  };

  useEffect(() => {
    document.body.classList.toggle("story-locked", scene !== "home");
    return () => document.body.classList.remove("story-locked");
  }, [scene]);

  useEffect(() => {
    if (scene !== "home") return;

    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [scene]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  return (
    <div
      className={`experience scene-${scene} transition-${transitionPhase}`}
    >
      {scene === "welcome" && (
        <WelcomePage onNext={() => changeScene("candle")} />
      )}
      {scene === "candle" && (
        <CandlePage lit={candleLit} onExtinguish={extinguishCandle} />
      )}
      {scene === "gift" && <GiftPage opened={giftOpened} onOpen={openGift} />}
      {scene === "home" && <HomePage onRestart={restartExperience} />}
    </div>
  );
}
