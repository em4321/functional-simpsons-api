import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Simpson from "./components/Simpson";
import Controls from "./components/Controls";

const App = () => {
  const [simpsons, setApi] = useState();
  const [text, setText] = useState("");
  const [select, setSort] = useState("");
  // const [deleteBtn, setDelete] = useState();
  // const [likeBtn, setLike] = useState();

  const getData = async () => {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );
    setApi(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const onTextInput = (e) => {
    setText(e.target.value);
  };

  const onSortSelect = (e) => {
    setSort(e.target.value);
  };

  if (!simpsons) {
    return <h1>Loading Quotes...</h1>;
  }
  const filtered = simpsons.filter((simpson) => {
    return simpson.character.toLowerCase().includes(text.toLowerCase());
  });

  filtered.sort((a, b) => {
    if (a.character > b.character) {
      return 1;
    }
    if (b.character > a.character) {
      return -1;
    }
    return 0;
  });

  if (select === "Z-A") {
    filtered.reverse();
  }

  // const onDeleteCharacter = (quote) => {
  //   const simpsons = [simpsons];
  //   const index = simpsons.findIndex((simpson) => simpson.quote === quote);
  //   simpsons.splice(index, 1);
  //   setDelete({ simpsons });
  // };
  // const onLikeCharacter = (quote) => {
  //   const simpsons = [simpsons];
  //   const index = simpsons.findIndex((simpson) => simpson.quote === quote);
  //   simpsons[index].liked = !simpsons[index].liked;
  //   setLike({ simpsons });
  // };

  console.log(simpsons, text);
  return (
    <>
      <Controls
        onTextInput={onTextInput}
        onSortSelect={onSortSelect}
        // onDeleteCharacter={onDeleteCharacter}
        // onLikeCharacter={onLikeCharacter}
      />
      {filtered.map((simpson, index) => {
        return (
          <Simpson
            key={index}
            {...simpson}
            // onDeleteCharacter={onDeleteCharacter}
            // onLikeCharacter={onLikeCharacter}
            // index={index}
          />
        );
      })}
    </>
  );
};

export default App;
