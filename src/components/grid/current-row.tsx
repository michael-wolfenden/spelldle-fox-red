import { Cell } from "@/components/grid/cell";
import { getChars } from "@/lib/words";
import { useGameStore } from "@/stores/useGameStore";

type Props = {
  className: string;
};

export const CurrentRow = ({ className }: Props) => {
  const solution = useGameStore((state) => state.solution);
  const guess = useGameStore((state) => state.currentGuess);

  const splitGuess = getChars(guess);
  const emptyCells = Array.from(Array(solution.length - splitGuess.length));
  const classes = `flex justify-center mb-1 ${className}`;

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
