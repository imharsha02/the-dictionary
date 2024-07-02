import { useContext } from "react";
import { inputContext } from "../inputContext";
import { useEffect, useRef } from "react";
type Callback = (event: KeyboardEvent) => void;


// Custom hook to handle enter key press
const useKey = (key:string,cb:Callback) => {
  const callbackRef = useRef<Callback>(cb)
  useEffect(() => {
    callbackRef.current = cb
  })
  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
}
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
  useKey("Enter",handleSearch)
  return (
    <div className="relative mx-auto w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="relative">
        {/* Input field */}
        <input
          ref={inputRef}
          onChange={handleSearchChange}
          required
          value={searchingWord}
          placeholder="Search a word"
          className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
        />
        <svg className="pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400" xmlns="http://www.w3.org/2000/svg"><path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path></svg>
        </div>
      </div>
      {/* Search icon button*/}
      <div className="h-full">
        {/* <Button
          className="text-primary rounded-3xl px-1 bg-blend hover:scale-110 transition"
          title="Search"
          onClick={handleSearch}
        >
          <IoIosSearch className="h-7 w-7" />
        </Button> */}
      </div>
    </div>
  );
};

export default Searchbar;
