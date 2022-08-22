import { MAX_CHALLENGES } from "@/constants/settings";
import { getChars, getRandomWord } from "@/lib/words";
import create from "zustand";
import { persist } from "zustand/middleware";

export type CharStatus = "absent" | "present" | "correct";

function getCharStatues(solution: string, guesses: string[]) {
  const statuses: Record<string, CharStatus> = {};
  const solutionChars = getChars(solution);

  guesses.forEach((guess) => {
    const guessChars = getChars(guess);
    guessChars.forEach((letter, i) => {
      statuses[letter] = !solutionChars.includes(letter)
        ? "absent"
        : letter === solutionChars[i]
        ? "correct"
        : "present";
    });
  });

  return statuses;
}

function getGuessStatuses(solution: string, guess: string) {
  const statuses: CharStatus[] = Array.from(Array(guess.length));

  const solutionSplit = getChars(solution);
  const solutionCharsTaken = solutionSplit.map(() => false);

  const guessSplit = getChars(guess);

  // handle all correct cases first
  guessSplit.forEach((letter, i) => {
    if (letter === solutionSplit[i]) {
      statuses[i] = "correct";
      solutionCharsTaken[i] = true;
      return;
    }
  });

  guessSplit.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!solutionSplit.includes(letter)) {
      // handles the absent case
      statuses[i] = "absent";
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = solutionSplit.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = "present";
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = "absent";
      return;
    }
  });

  return statuses;
}

interface GameState {
  guesses: string[];
  currentGuess: string;
  solution: string;
  newGame: () => string;
  setCurrentGuess: (currentGuess: string) => void;
  setGuesses: (guesses: string[]) => void;
  getCharStatuses: () => Record<string, CharStatus>;
  getGuessStatuses: (guess: string) => CharStatus[];
  isGameWon: () => boolean;
  isGameLost: () => boolean;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      guesses: [],
      currentGuess: "",
      solution: getRandomWord(),
      newGame: () => {
        const newSolution = getRandomWord();
        set({ solution: newSolution, guesses: [], currentGuess: "" });
        return newSolution;
      },
      setCurrentGuess: (currentGuess: string) => set({ currentGuess }),
      setGuesses: (guesses: string[]) => set({ guesses }),
      getCharStatuses: () => getCharStatues(get().solution, get().guesses),
      getGuessStatuses: (guess: string) =>
        getGuessStatuses(get().solution, guess),
      isGameWon: () => get().guesses.includes(get().solution),
      isGameLost: () =>
        get().guesses.length == MAX_CHALLENGES && !get().isGameWon(),
    }),
    {
      name: "spelldle",
    }
  )
);
