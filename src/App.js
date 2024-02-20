import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Simpson from "./components/Simpson";
import Controls from "./components/Controls";
import "./App.modules.css";
import Spinner from "./components/Spinner";

const App = () => {
  const [simpsons, setSimpsons] = useState();
  const [text, setText] = useState("");
  const [sortSelect, setSortSelect] = useState("");
  const [deleteBtn, setDelete] = useState();
  const [likeBtn, setLike] = useState();
  // const [total, setTotal] = useState(0);

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

  console.log(simpsons);

  const onTextInput = (e) => {
    setText(e.target.value);
  };

  const onSortSelect = (e) => {
    setSortSelect(e.target.value);
  };

  if (!simpsons) {
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
  let filtered = [...simpsons];
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
    const index = simpsons.findIndex((simpson) => simpson.quote === quote);
    simpsons.splice(index, 1);
    setDelete({ simpsons });
  };
  const onLikeCharacter = (quote) => {
    const index = simpsons.findIndex((simpson) => simpson.quote === quote);
    simpsons[index].liked = !simpsons[index].liked;
    setLike({ simpsons });
  };
  let totalLiked = 0;
  simpsons.forEach((simpson) => {
    if (simpson.liked) {
      totalLiked++;
    }
  });
  return (
    <>
      <Controls onTextInput={onTextInput} onSortSelect={onSortSelect} />
      <p>Liked out of {simpsons.length} Characters</p>
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
