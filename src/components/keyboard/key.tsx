import { ReactNode } from "react";
import clsx from "clsx";
import { REVEAL_TIME_MS } from "@/constants/settings";
import { useGameStore } from "@/stores/useGameStore";
import type { CharStatus } from "@/stores/useGameStore";

interface Props {
  children?: ReactNode;
  value: string;
  status?: CharStatus;
  onClick: (value: string) => void;
  isRevealing?: boolean;
  variant?: "normal" | "wide";
}

export function Key({
  children,
  status,
  variant = "normal",
  value,
  onClick,
  isRevealing,
}: Props) {
  const solution = useGameStore((state) => state.solution);

  const keyDelayMs = REVEAL_TIME_MS * solution.length;

  const classes = clsx(
    "flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none h-14",
    {
      "transition ease-in-out": isRevealing,
      "bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400":
        status == undefined,
      "bg-slate-400 dark:bg-slate-800 text-white": status === "absent",
      "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white":
        status === "correct",
      "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white":
        status === "present",
      "w-10": variant === "normal",
      "w-16": variant === "wide",
    }
  );

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : "unset",
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button
      style={styles}
      aria-label={`${value} ${status}`}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  );
}
