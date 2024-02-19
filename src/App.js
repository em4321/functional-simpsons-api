import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Simpson from "./components/Simpson";
import Controls from "./components/Controls";

const App = () => {
  const [simpsons, setSimpsons] = useState();
  const [text, setText] = useState("");
  const [sortSelect, setSortSelect] = useState("");
  const [deleteBtn, setDelete] = useState();
  const [likeBtn, setLike] = useState();

  const getData = useCallback(async () => {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );

    setSimpsons(data);
  }, []);

  // const getData = async () => {
  //   const { data } = await axios.get(
  //     `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
  //   );
  //   setSimpsons(data);
  // };

  useEffect(() => {
    getData();
  }, [getData]);

  const onTextInput = (e) => {
    setText(e.target.value);
  };
  console.log(text);
  const onSortSelect = (e) => {
    setSortSelect(e.target.value);
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

  if (sortSelect === "Z-A") {
    filtered.reverse();
  }

  const onDeleteCharacter = (quote) => {
    const index = simpsons.findIndex((simpson) => simpson.quote === quote);
    simpsons.splice(index, 1);
    setDelete({ simpsons });
  };
  const onLikeCharacter = (quote) => {
    const index = simpsons.findIndex((simpson) => simpson.quote === quote);
    simpsons[index] = !simpsons[index];
    setLike({ simpsons });
  };

  console.log(text, simpsons, deleteBtn, likeBtn);
  return (
    <>
      <Controls
        onTextInput={onTextInput}
        onSortSelect={onSortSelect}
        onDeleteCharacter={onDeleteCharacter}
        onLikeCharacter={onLikeCharacter}
      />
      {filtered.map((simpson, index) => {
        return <Simpson key={index} {...simpson} index={index} />;
      })}
    </>
  );
};

export default App;
