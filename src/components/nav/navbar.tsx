import { PlayIcon } from "@/components/nav/play-icon";
import { NextIcon } from "@/components/nav/next-icon";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useGameStore } from "@/stores/useGameStore";

export function Navbar() {
  const newGame = useGameStore((state) => state.newGame);
  const solution = useGameStore((state) => state.solution);
  const [voices, speak] = useSpeechSynthesis();

  const catherine = voices.find(
    (v) => v.name === "Microsoft Catherine - English (Australia)"
  )!;

  const onRefreshClick = () => {
    speak(newGame(), catherine);
  };

  const onPlayClick = () => {
    speak(solution, catherine);
  };

  return (
    <div>
      <div className="flex items-center justify-between h-12 p-4">
        <PlayIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={onPlayClick}
        />
        <p className="text-xl font-bold">Spelldle</p>
        <NextIcon className="h-6 w-6 cursor-pointer" onClick={onRefreshClick} />
      </div>
      <hr></hr>
    </div>
  );
}
