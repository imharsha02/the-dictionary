import Header from "./components/Header";
import { inputContext } from "./inputContext";
import { useState, useEffect } from "react";
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
        
        2) Body:
            Word: definition
            word is a 'pronoun/adjective/adverb/...'
            Example sentence:
      */}
      <div className="max-w-6xl mx-auto">
        <Header />
        {searchedWord && wordDetails && searchedWord && wordDetails && (
          <div>
            <h2 className="text-lg">
              {wordDetails[0].word}:{" "}
              {wordDetails[0].meanings[0].definitions[0].definition}
            </h2>
            <p>{wordDetails[0].word} is a {wordDetails[0].meanings[0].partOfSpeech}</p>
            <p>Example sentence: {wordDetails[0].meanings[0].definitions[0].example}</p>
          </div>
        )}
      </div>
    </inputContext.Provider>
  );
};

export default App;
