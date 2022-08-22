import { Cell } from "@/components/grid/cell";
import { getChars } from "@/lib/words";
import { useGameStore } from "@/stores/useGameStore";

type Props = {
  isRevealing?: boolean;
  guess: string;
};

export const CompletedRow = ({ isRevealing, guess }: Props) => {
  const getGuessStatuses = useGameStore((state) => state.getGuessStatuses);

  const statuses = getGuessStatuses(guess);
  const splitGuess = getChars(guess);

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  );
};
