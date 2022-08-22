import { wordList } from "@/lib/word-list";

export function getRandomWord() {
  return wordList[
    Math.floor(Math.random() * wordList.length)
  ].toLocaleUpperCase();
}

export function getChars(value: string) {
  return value.split("");
}
