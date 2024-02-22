import React from "react";

const Buttons = ({ dispatch, state }) => {
  return (
    <>
      {state.total}
      <button onClick={() => dispatch({ type: "LIKE" })}>Like</button>
      <button onClick={() => dispatch({ type: "DISLIKE" })}>Dislike</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </>
  );
};

export default Buttons;
