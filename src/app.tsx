import { Keyboard, Navbar } from "@/components";
import { Grid } from "@/components/grid/grid";
import Div100vh from "@/components/misc/div-100-vh";
import {
  MAX_CHALLENGES,
  NOT_ENOUGH_LETTERS_MESSAGE,
  REVEAL_TIME_MS,
  TOAST_DURATION,
  WIN_MESSAGES,
} from "@/constants/settings";
import { getChars } from "@/lib/words";
import { useGameStore } from "@/stores/useGameStore";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function App() {
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);

  const solution = useGameStore((state) => state.solution);
  const currentGuess = useGameStore((state) => state.currentGuess);
  const guesses = useGameStore((state) => state.guesses);
  const setCurrentGuess = useGameStore((state) => state.setCurrentGuess);
  const setGuesses = useGameStore((state) => state.setGuesses);
  const isGameWon = useGameStore((state) => state.isGameWon);
  const isGameLost = useGameStore((state) => state.isGameLost);

  const onChar = (value: string) => {
    if (isGameWon() || isGameLost()) {
      return;
    }

    const newGuess = `${currentGuess}${value}`;

    if (newGuess.length <= solution.length) {
      setCurrentGuess(newGuess);
    }
  };

  const onDelete = () => {
    setCurrentGuess(getChars(currentGuess).slice(0, -1).join(""));
  };

  const clearCurrentRowClass = () => {
    setCurrentRowClass("");
  };

  const onEnter = () => {
    if (isGameWon() || isGameLost()) {
      return;
    }

    const notEnoughLetters = currentGuess.length !== solution.length;
    if (notEnoughLetters) {
      setCurrentRowClass("jiggle");

      setTimeout(() => {
        clearCurrentRowClass();
      }, TOAST_DURATION);

      toast.error(NOT_ENOUGH_LETTERS_MESSAGE, {
        duration: TOAST_DURATION,
      });

      return;
    }

    if (guesses.length < MAX_CHALLENGES) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");
    }

    setIsRevealing(true);
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false);

      if (isGameWon()) {
        const winMessage =
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];

        toast.success(winMessage, {
          duration: TOAST_DURATION,
        });

        return;
      }

      if (isGameLost()) {
        toast(`The word was ${solution}`, {
          duration: TOAST_DURATION,
        });
      }
    }, REVEAL_TIME_MS * solution.length);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Div100vh className="flex flex-col">
        <Navbar />
        <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
          <div className="pb-6 grow">
            <Grid
              isRevealing={isRevealing}
              currentRowClassName={currentRowClass}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            isRevealing={isRevealing}
          />
        </div>
      </Div100vh>
    </>
  );
}
