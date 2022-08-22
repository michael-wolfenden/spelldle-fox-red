import { Cell } from "@/components/grid/cell";
import { useGameStore } from "@/stores/useGameStore";

export const EmptyRow = () => {
  const solution = useGameStore((state) => state.solution);
  const emptyCells = Array.from(Array(solution.length));

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
