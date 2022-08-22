import { useEffect, useRef, useState } from "react";

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = useRef<typeof window.speechSynthesis>(window.speechSynthesis);

  const updateVoices = () => {
    setVoices(synth.current.getVoices());
  };

  const speak = (
    text: string,
    voice: SpeechSynthesisVoice,
    pitch = 1,
    rate = 0.7
  ) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    synth.current.speak(utterance);
  };

  useEffect(() => {
    if (typeof window !== "object" || !window.speechSynthesis) return;

    synth.current = window.speechSynthesis;
    synth.current.onvoiceschanged = updateVoices;
    updateVoices();

    return () => {
      synth.current.onvoiceschanged = null;
    };
  }, []);

  return [voices, speak] as const;
}
