//  Header:
//     The dictionary
//     ---------------------------------
//     | Search a word      Search icon |
//     ----------------------------------
//     Search history:

//    Body (When no word is searched)

//    Body (when a word is searched):
//       Word: definition
//       word is a 'pronoun/adjective/adverb/...'
//       Example sentence:

import Header from "./components/Header";
import { inputContext } from "./inputContext";
import { useState, useEffect } from "react";
import { TypographyP } from "./@/components/ui/TypographyP";
import { TypographyLarge } from "./@/components/ui/TypographyLarge";
import { Button } from "./@/components/ui/button";
import { TypographySmall } from "./@/components/ui/TypographySmall";
import { TypographyList } from "./@/components/ui/TypographyList";
import { motion } from "framer-motion";

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
  const [isSearchClicked,setIsSearchClicked] = useState(false);
  const [wordDetails, setWordDetails] = useState<WordDetails[] | null>(null);
  const [searchedWord, setSearchedWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem("History");
    return savedHistory ? JSON.parse(savedHistory) : [];
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
            const updatedHistory = pervHistory.filter(
              (word) => word !== searchedWord
            );
            const listOfSearchedWords = [searchedWord, ...updatedHistory];
            localStorage.setItem(
              "History",
              JSON.stringify(listOfSearchedWords)
            );
            return listOfSearchedWords;
          });
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
  console.log(wordDetails);

  let examples: string[] = [];
  if (wordDetails) {
    for (const wordDetail of wordDetails) {
      for (const meaning of wordDetail.meanings) {
        for (const def of meaning.definitions) {
          if (def.example) {
            examples.push(def.example);
          }
        }
      }
    }
  }
  return (
    <inputContext.Provider value={{ searchedWord, setSearchedWord, isSearchClicked,setIsSearchClicked }}>
      {/* Container div */}
      <div className="max-w-6xl mx-auto">
        <motion.div animate = {isSearchClicked || searchedWord !== ""?{y:0, scale:1}:{y:350, scale:1.5}} initial={{y:350, scale:1.5}} transition={{type:"spring", stiffness:50}}>
          <Header />
          {/* Rendering history */}
          <div className="flex items-center my-4 space-x-2">
            {history.length > 0 && (
              <TypographySmall>Search history:</TypographySmall>
            )}
            {/* List of words fetched from local storage as buttons */}
            {history.map((word) => (
              <Button
                className="rounded-full hover:scale-110 border shadow-sm bg-primary-foreground text-primary transition"
                onClick={() => {
                  setSearchedWord(word);
                }}
                key={word}
              >
                {word}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Rendering data */}

        {/* Render loading indicator */}
        {loading && <p>Loading...</p>}
        {!loading && wordDetails && (
          <>
            {wordDetails[0].meanings[0].definitions.length > 1 ? (
              <>
                <TypographyLarge>
                  Definitions of {wordDetails[0].word}:{" "}
                </TypographyLarge>
                <TypographyList>
                  {wordDetails[0].meanings[0].definitions.map((definition) => (
                    <li key={definition.definition}>{definition.definition}</li>
                  ))}
                </TypographyList>
              </>
            ) : (
              <div className="flex items-center">
                <TypographyLarge>{wordDetails[0].word}: </TypographyLarge>
                <TypographyP>
                  {wordDetails[0].meanings[0].definitions[0].definition}
                </TypographyP>
              </div>
            )}
            <div className="flex items-center space-x-1 my-4">
              <TypographyLarge>Part of speech:</TypographyLarge>
              <TypographyP>
                {wordDetails[0].word} is a{" "}
                <i>{wordDetails[0].meanings[0].partOfSpeech}</i>
              </TypographyP>
            </div>
            {
              // If there is no example in the definitions, don't render the example. Else render all the examples.
              examples.length > 1 && (
                <>
                  <TypographyLarge>Sample sentences:</TypographyLarge>
                  <TypographyList>
                    {examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </TypographyList>
                </>
              )
            }
            {examples.length === 1 && (
              <div className="flex items-center space-x-2">
                <TypographyLarge>Sample sentence</TypographyLarge>
                <TypographyP>{examples[0]}</TypographyP>
              </div>
            )}
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
