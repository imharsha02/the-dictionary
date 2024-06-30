import Header from "./components/Header";
import { inputContext } from "./inputContext";
import { useState, useEffect } from "react";
import { Button } from "./@/components/ui/button";
import { TypographyP } from "./@/components/ui/TypographyP";
import { TypographyLarge } from "./@/components/ui/TypographyLarge";
import { TypographySmall } from "./@/components/ui/TypographySmall";
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
  const [wordDetails, setWordDetails] = useState<WordDetails[] | null>();
  const [searchedWord, setSearchedWord] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    const fetchWordDetails = async () => {
      if (searchedWord) {
        try {
          const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setWordDetails(data);
          setHistory((prevHistory) =>
            Array.from(new Set([searchedWord, ...prevHistory]))
          );
        } catch (error) {
          console.error("Error fetching word details:", error);
        }
      }
    };
    fetchWordDetails();
  }, [searchedWord]);
  console.log(wordDetails);
  return (
    <inputContext.Provider value={{ searchedWord, setSearchedWord }}>
      {/*
      1) Header: 
          The dictionary
          ---------------------------------
          | Search a word      Search icon |
          ----------------------------------

          Your previous searches:
        
        2) Body:
            Word: definition
            word is a 'pronoun/adjective/adverb/...'
            Example sentence:
      */}

      {/* Container div */}
      <div className="max-w-6xl mx-auto flex flex-col space-y-4">
        <Header />
        {/* Rendering history */}
        <div className="flex items-center space-x-2">
          <TypographyP>You searched for: </TypographyP>
          {history.map((word) => (
            <Button
              title="Click to see definition"
              key={word}
              className="mr-3 rounded-full border-2 bg-primary-foreground text-primary hover:text-primary-foreground transition"
              onClick={() => {
                setSearchedWord(word);
              }}
            >
              {word}
            </Button>
          ))}
        </div>

        {/* Rendering data */}
        {searchedWord && wordDetails && wordDetails && (
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
                <TypographySmall>
                  {wordDetails[0].meanings[0].partOfSpeech}
                </TypographySmall>
              </TypographyP>
            </div>
            <div className="flex items-center space-x-1">
              <TypographyLarge>Sample sentence: </TypographyLarge>
              <TypographyP>
                {wordDetails[0].meanings[0].definitions[0].example}
              </TypographyP>
            </div>
          </>
        )}
      </div>
    </inputContext.Provider>
  );
};

export default App;
