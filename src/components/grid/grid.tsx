import { CompletedRow } from "@/components/grid/completed-row";
import { CurrentRow } from "@/components/grid/current-row";
import { EmptyRow } from "@/components/grid/empty-row";
import { MAX_CHALLENGES } from "@/constants/settings";
import { useGameStore } from "@/stores/useGameStore";

type Props = {
  isRevealing?: boolean;
  currentRowClassName: string;
};

export const Grid = ({ isRevealing, currentRowClassName }: Props) => {
  const guesses = useGameStore((state) => state.guesses);

  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : [];

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow className={currentRowClassName} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  );
};
