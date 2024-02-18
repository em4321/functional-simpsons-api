import React from "react";
const Controls = (
  onTextInput,
  onSortSelect,
  onDeleteCharacter,
  onLikeCharacter,
  liked,
  quote
) => {
  return (
    <>
      <div className="search">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search Simpsons character..."
          onInput={onTextInput.onTextInput}
          style={{
            borderRadius: "25px",
            textAlign: "center",
            width: "350px",
            height: "40px",
            backgroundColor: "white",
          }}
        ></input>
      </div>
      <div className="sortSelect">
        <select
          onChange={onSortSelect.onSortSelect}
          style={{
            backgroundColor: "#efcba4",
            borderRadius: "25px",
            textAlign: "center",
            width: "150px",
            height: "40px",
            color: "white",
            border: "1px solid white",
          }}
        >
          <option value="">Please Select</option>
          <option value="A-Z">Character: A-Z</option>
          <option value="Z-A">Character: Z-A</option>
        </select>
      </div>
      <button
      // style={{ backgroundColor: "#f5f580" }}
      // onClick={() => onDeleteCharacter(quote)}
      >
        delete
      </button>
      <button
      // style={{
      //   backgroundColor: liked ? "#f66e85" : "#f5f580",
      // }}
      // onClick={() => onLikeCharacter(quote)}
      >
        like
      </button>
    </>
  );
};

export default Controls;