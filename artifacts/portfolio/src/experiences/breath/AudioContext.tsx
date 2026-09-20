import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  started: boolean;
  muted: boolean;
  startExperience: () => void;
  toggleMute: () => void;
  playNarration: (src: string) => void;
  stopNarration: () => void;
  playSfx: (src: string) => void;
}

const AudioContextContext = createContext<AudioContextType | null>(null);

// There is deliberately NO background music bed on this page. The room is
// silent except for the bowl strike, the mantra clips, and the narrator.
// (Two beds were tried and rejected; do not reintroduce one.)
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  const narrationRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<Set<HTMLAudioElement>>(new Set());

  useEffect(() => {
    const sfxSet = sfxRef.current;
    return () => {
      narrationRef.current?.pause();
      sfxSet.forEach((a) => a.pause());
      sfxSet.clear();
    };
  }, []);

  useEffect(() => {
    if (narrationRef.current) narrationRef.current.muted = muted;
    sfxRef.current.forEach((a) => {
      a.muted = muted;
    });
  }, [muted]);

  // Kept as the user-gesture gate that unlocks audio playback for the page.
  const startExperience = () => {
    if (started) return;
    setStarted(true);
  };

  const toggleMute = () => setMuted((m) => !m);

  // The bowl rings for ~10s; if the listener scrolls ahead mid-ritual it must
  // bow out the moment the narrator speaks. Gentle ~0.5s fade, no click.
  const fadeOutAllSfx = () => {
    sfxRef.current.forEach((sfx) => {
      const finish = () => {
        // pause() rejects a still-pending play() so the clip can never start
        // late after being superseded.
        sfx.pause();
        sfxRef.current.delete(sfx);
      };
      const step = () => {
        if (sfx.paused) {
          finish();
          return;
        }
        if (sfx.volume > 0.03) {
          sfx.volume = Math.max(0, sfx.volume - 0.03);
          window.setTimeout(step, 40);
        } else {
          finish();
        }
      };
      step();
    });
  };

  const stopNarration = () => {
    const current = narrationRef.current;
    if (!current) return;
    current.pause();
    current.currentTime = 0;
    narrationRef.current = null;
  };

  const playNarration = (src: string) => {
    if (!started) return;
    stopNarration();
    fadeOutAllSfx();

    const audio = new Audio(src);
    audio.muted = muted;
    narrationRef.current = audio;

    audio.play().catch((err) => {
      // pause() interrupting a pending play() is expected on fast scrolls
      if (err?.name !== "AbortError") console.error(err);
    });
  };

  const playSfx = (src: string) => {
    if (!started) return;
    // One voice at a time: a new cue supersedes whatever is still ringing,
    // so a bowl tail can never sit under the mantra, and double-clicking a
    // play button can never stack two copies of the same clip.
    fadeOutAllSfx();
    const sfx = new Audio(src);
    sfx.volume = 0.4;
    sfx.muted = muted;
    sfxRef.current.add(sfx);

    const remove = () => {
      sfxRef.current.delete(sfx);
    };

    sfx.addEventListener("ended", remove);
    sfx.addEventListener("error", remove);
    sfx.play().catch((err) => {
      remove();
      if (err?.name !== "AbortError") console.error(err);
    });
  };

  return (
    <AudioContextContext.Provider
      value={{
        started,
        muted,
        startExperience,
        toggleMute,
        playNarration,
        stopNarration,
        playSfx,
      }}
    >
      {children}
    </AudioContextContext.Provider>
  );
}

export const useAudio = () => {
  const ctx = useContext(AudioContextContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
