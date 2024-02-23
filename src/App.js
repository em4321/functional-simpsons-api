import React, { useCallback, useReducer, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Simpson from "./components/Simpson";
import Controls from "./components/Controls";
import "./App.modules.css";
import Spinner from "./components/Spinner";

import { reducer, initialState } from "./components/appReducer";

const App = () => {
  const [text, setText] = useState("");
  const [sortSelect, setSortSelect] = useState("");
  const [simpsons, dispatch] = useReducer(reducer, initialState);

  const getData = useCallback(async () => {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );

    dispatch({ type: "STORE_API_DATA", payload: data });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const onTextInput = (e) => {
    setText(e.target.value);
  };

  const onSortSelect = (e) => {
    setSortSelect(e.target.value);
  };

  if (!simpsons.apiData) {
    return (
      <div
        className="loading"
        style={{
          marginTop: "300px",
        }}
      >
        <h1>Loading Quotes...</h1>
        <Spinner />
      </div>
    );
  }
  let filtered = [...simpsons.apiData];
  filtered = filtered.filter((simpson) => {
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
    dispatch({ type: "ON_DELETE", payload: quote });
  };
  const onLikeCharacter = (quote) => {
    dispatch({ type: "ON_LIKE_TOGGLE", payload: quote });
  };

  let totalLiked = 0;
  simpsons.apiData.forEach((simpson) => {
    if (simpson.liked) {
      totalLiked++;
    }
  });

  return (
    <>
      <Controls onTextInput={onTextInput} onSortSelect={onSortSelect} />
      <p>
        {totalLiked} liked out of {simpsons.apiData.length} Characters
      </p>

      {filtered.map((simpson, index) => {
        return (
          <Simpson
            simpsons={filtered}
            key={index}
            {...simpson}
            index={index}
            onDeleteCharacter={onDeleteCharacter}
            onLikeCharacter={onLikeCharacter}
          />
        );
      })}
    </>
  );
};

export default App;
