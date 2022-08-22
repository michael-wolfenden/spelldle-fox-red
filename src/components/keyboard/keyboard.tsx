import { Key } from "@/components/keyboard/key";
import { useGameStore } from "@/stores/useGameStore";
import { useEffect } from "react";

interface Props {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  isRevealing?: boolean;
}

export function Keyboard({ onChar, onDelete, onEnter, isRevealing }: Props) {
  const charStatuses = useGameStore((state) => state.getCharStatuses());

  const onClick = (value: string) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toLocaleUpperCase();
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);

    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className="flex justify-center mb-1">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key variant="wide" value="ENTER" onClick={onClick}>
          Enter
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key variant="wide" value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  );
}
