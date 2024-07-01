import { createContext, Dispatch, SetStateAction } from "react";

interface InputContextType {
  searchedWord: string;
  searchingWord:string;
  setSearchingWord:Dispatch<SetStateAction<string>>;
  setSearchedWord: Dispatch<SetStateAction<string>>;
  isSearchClicked:boolean;
  setIsSearchClicked:Dispatch<SetStateAction<boolean>>;
}

export const inputContext = createContext<InputContextType>({
  searchingWord:"",
  setSearchingWord:() => {},
  isSearchClicked:false,
  setIsSearchClicked:() => {},
  searchedWord: "",
  setSearchedWord: () => {},
});
