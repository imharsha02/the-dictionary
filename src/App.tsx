// 1) Header:
//     The dictionary
//     ---------------------------------
//     | Search a word      Search icon |
//     ----------------------------------

//     Your previous searches:

//   2) Body:
//       Word: definition
//       word is a 'pronoun/adjective/adverb/...'
//       Example sentence:

import Header from "./components/Header";
import { inputContext } from "./inputContext";
import { useState, useEffect } from "react";
import { TypographyP } from "./@/components/ui/TypographyP";
import { TypographyLarge } from "./@/components/ui/TypographyLarge";
import { Button } from "./@/components/ui/button";
interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordDetails {
  word: string;
  meanings: Meaning[];
}

const App = () => {
  const [wordDetails, setWordDetails] = useState<WordDetails[] | null>(null);
  const [searchedWord, setSearchedWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem("History");
    return savedHistory ? JSON.parse(savedHistory):[]
  });
  useEffect(() => {
    const fetchWordDetails = async () => {
      if (searchedWord) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setWordDetails(data);
          setHistory((pervHistory) => {
            const updatedHistory = pervHistory.filter((word) => word!==searchedWord)
            const listOfSearchedWords = [searchedWord, ...updatedHistory]
            localStorage.setItem("History",JSON.stringify(listOfSearchedWords));
            return listOfSearchedWords;
          })
        } catch (error) {
          console.error("Error fetching word details:", error);
          setWordDetails(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWordDetails();
  }, [searchedWord]);
  return (
    <inputContext.Provider value={{ searchedWord, setSearchedWord }}>
      {/* Container div */}
      <div className="max-w-6xl mx-auto flex flex-col space-y-4">
        <Header />
        {/* Rendering history */}
        <div className="flex items-center space-x-2">
          <TypographyP>You searched for: </TypographyP>
          {/* List of words fetched from local storage as buttons */}
          {history.map(word => (
            <Button className="rounded-full bg-primary-foreground text-primary hover:text-primary-foreground" onClick={() => {setSearchedWord(word)}} key={word}>{word}</Button>
          ))}
        </div>

        {/* Rendering data */}

        {/* Render loading indicator */}
        {loading && <h1>Loading...</h1>}
        {!loading && wordDetails && (
          <>
            <div className="flex items-center space-x-1">
              <TypographyLarge>{wordDetails[0].word}: </TypographyLarge>
              <TypographyP>
                {wordDetails[0].meanings[0].definitions[0].definition}
              </TypographyP>
            </div>
            <div className="flex items-center space-x-1">
              <TypographyLarge>Part of speech:</TypographyLarge>
              <TypographyP>
                {wordDetails[0].word} is a{" "}
                <i>{wordDetails[0].meanings[0].partOfSpeech}</i>
              </TypographyP>
            </div>
            <div className="flex items-center space-x-1">
              <TypographyLarge>Sample sentence: </TypographyLarge>
              <TypographyP>
                {!wordDetails[0].meanings[0].definitions[0].example?"No example":wordDetails[0].meanings[0].definitions[0].example}
              </TypographyP>
            </div>
          </>
        )}
        {!loading && !wordDetails && searchedWord && (
          <h1>No data available for the searched word.</h1>
        )}
      </div>
    </inputContext.Provider>
  );
};

export default App;
