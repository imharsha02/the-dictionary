import { IoIosSearch } from "react-icons/io";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { useContext } from "react";
import { inputContext } from "../inputContext";
import { useState } from "react";
const Searchbar = () => {
  const {setSearchedWord} = useContext(inputContext);
  const [searchingWord,setSearchingWord] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingWord(e.target.value);
  }
  const handleSearch = () => {
    setSearchedWord(searchingWord)
  }
  return (
    <div className="rounded-full border-2 space-x-2 flex items-center pr-1">
      {/* Input field */}
      <Input
      onChange={handleSearchChange}
        placeholder="Search a word"
        className="rounded-full border-none focus:outline-none"
      />
      {/* Search icon button*/}
      <div className="h-full">
        <Button className="text-primary rounded-3xl bg-primary-foreground hover:bg-primary-foreground transition" title="Search" onClick={handleSearch}>
          <IoIosSearch />
        </Button>
      </div>
    </div>
  );
};

export default Searchbar;
