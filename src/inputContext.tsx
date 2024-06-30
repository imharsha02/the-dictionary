import { createContext, Dispatch, SetStateAction } from "react";

interface InputContextType {
  searchedWord: string;
  setSearchedWord: Dispatch<SetStateAction<string>>;
}

export const inputContext = createContext<InputContextType>({
  searchedWord: "",
  setSearchedWord: () => {},
});
