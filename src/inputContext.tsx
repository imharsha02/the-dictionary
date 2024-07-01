import { createContext, Dispatch, SetStateAction } from "react";

interface InputContextType {
  searchedWord: string;
  setSearchedWord: Dispatch<SetStateAction<string>>;
  isSearchClicked:boolean;
  setIsSearchClicked:Dispatch<SetStateAction<boolean>>;
}

export const inputContext = createContext<InputContextType>({
  isSearchClicked:false,
  setIsSearchClicked:() => {},
  searchedWord: "",
  setSearchedWord: () => {},
});
