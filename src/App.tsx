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
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [wordDetails, setWordDetails] = useState<WordDetails[] | null>(null);
  const [searchedWord, setSearchedWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchingWord, setSearchingWord] = useState("");
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

  // Logic to rendering limited number of definitions and examples
  let definitionsToRender: Definition[] = [];
  let examplesToRender: string[] = [];
  if (wordDetails) {
    const slicedDefinitionsArray = wordDetails[0].meanings[0].definitions.slice(
      0,
      5
    );
    if (
      (slicedDefinitionsArray.length >= 1 &&
        slicedDefinitionsArray.length < 5) ||
      slicedDefinitionsArray.length === 5
    ) {
      definitionsToRender = slicedDefinitionsArray;
    }
    const slicedExamplesArray = examples.slice(0, 3);
    if (slicedExamplesArray.length >= 1) {
      examplesToRender = slicedExamplesArray;
    }
  }

  return (
    <inputContext.Provider
      value={{
        searchedWord,
        setSearchedWord,
        isSearchClicked,
        setIsSearchClicked,
        searchingWord,
        setSearchingWord,
      }}
    >
      {/* Container div */}

      <div className="bg-red-100 h-screen">
        <div className="max-w-6xl mx-auto">
          <motion.div
            animate={
              isSearchClicked || searchedWord !== ""
                ? { y: 0, scale: 1 }
                : { y: 350, scale: 1.5 }
            }
            initial={{ y: 350, scale: 1.5 }}
            transition={{ type: "spring", stiffness: 45 }}
          >
            <Header />
            {/* Rendering history */}
            <div className="flex items-center my-4 space-x-2">
              {history.length > 0 && (
                <TypographySmall>Search history:</TypographySmall>
              )}
              {/* List of words fetched from local storage as buttons */}
              <div className="flex flex-wrap gap-2">
                {history.map((word) => (
                  <Button
                    className="rounded-full hover:scale-110 border shadow-sm bg-primary-foreground text-primary transition"
                    onClick={() => {
                      setSearchedWord(word);
                      setSearchingWord(word);
                    }}
                    key={word}
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rendering data */}

          {/* Render loading indicator */}
          {loading && (
            <motion.div
              className="w-5 h-5 rounded-full bg-primary opacity-80"
              animate={{ y: [1, 20, 1] }}
              transition={{
                loop: Infinity,
                ease: "linear",
              }}
            ></motion.div>
          )}
          {!loading && wordDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <TypographyLarge>
                {definitionsToRender.length === 1
                  ? `Definition of ${wordDetails[0].word}`
                  : `Definitions of ${wordDetails[0].word}`}
              </TypographyLarge>
              {definitionsToRender.length === 1 ? (
                definitionsToRender.map((definition) => (
                  <TypographyP>{definition.definition}</TypographyP>
                ))
              ) : (
                <TypographyList>
                  {definitionsToRender.map((definition) => (
                    <li key={definition.definition}>{definition.definition}</li>
                  ))}
                </TypographyList>
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
                examplesToRender.length !== 0 && (
                  <>
                    <TypographyLarge>Sample sentences:</TypographyLarge>
                    <TypographyList>
                      {examplesToRender.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </TypographyList>
                  </>
                )
              }
            </motion.div>
          )}
          {!loading && !wordDetails && searchedWord && (
            <TypographyP className="text-red-500">
              No data available for the searched word.
            </TypographyP>
          )}
        </div>
        {/* Suggest more words to search in the dictionary */}
        {searchedWord && wordDetails && loading === false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="max-w-6xl mx-auto"
          >
            <TypographyP>Suggest more words to search</TypographyP>
          </motion.div>
        )}
      </div>
    </inputContext.Provider>
  );
};

export default App;
