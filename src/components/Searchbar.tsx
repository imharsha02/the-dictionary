import { IoIosSearch } from "react-icons/io";
import { useContext } from "react";
import { inputContext } from "../inputContext";
import { useEffect, useRef } from "react";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/input";
const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    searchedWord,
    searchingWord,
    setSearchingWord,
    setSearchedWord,
    setIsSearchClicked,
  } = useContext(inputContext);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingWord(e.target.value);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleSearch = () => {
    setSearchedWord(searchingWord);
    if (searchedWord !== "") {
      setIsSearchClicked(true);
    }
  };
  return (
    <div className="rounded-full flex items-center pr-1">
      {/* Input field */}
      <Input
        ref={inputRef}
        onChange={handleSearchChange}
        required
        value={searchingWord}
        placeholder="Search a word"
      />
      {/* Search icon button*/}
      <div className="h-full">
        <Button
          className="text-primary rounded-3xl px-1 bg-blend hover:scale-110 transition"
          title="Search"
          onClick={handleSearch}
        >
          <IoIosSearch className="h-7 w-7"/>
        </Button>
      </div>
    </div>
  );
};

export default Searchbar;
