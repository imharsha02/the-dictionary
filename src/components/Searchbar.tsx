import { IoIosSearch } from "react-icons/io";
import { motion } from "framer-motion";
import { useContext } from "react";
import { inputContext } from "../inputContext";
import { useEffect, useRef } from "react";
const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchedWord,searchingWord,setSearchingWord, setSearchedWord, setIsSearchClicked } = useContext(inputContext);
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
    <div className="rounded-full border-2 space-x-2 flex items-center pr-1">
      {/* Input field */}
      <motion.input
        ref={inputRef}
        className="flex h-10 w-full rounded-full focus:outline-none border-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={handleSearchChange}
        required
        value={searchingWord}
        placeholder="Search a word"
      />
      {/* Search icon button*/}
      <div className="h-full">
        <motion.button
          className="text-primary rounded-3xl bg-primary-foreground hover:bg-primary-foreground transition"
          title="Search"
          onClick={handleSearch}
        >
          <IoIosSearch />
        </motion.button>
      </div>
    </div>
  );
};

export default Searchbar;
