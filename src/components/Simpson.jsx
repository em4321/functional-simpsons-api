// import Image from "./Image";

const Simpson = ({
  character,
  characterDirection,
  image,
  quote,
  onDeleteCharacter,
  onLikeCharacter,
  liked,
}) => {
  console.log(liked);
  return (
    <>
      <div className="character" key={character}>
        <div className="nameAndButtons">
          <h1
            className="characterName"
            style={{
              textAlign: "center",
              backgroundColor: "#efcba4",
            }}
          >
            {character.toUpperCase()}
          </h1>

          <button
            className="delete"
            style={{ backgroundColor: "#f5f580" }}
            onClick={() => onDeleteCharacter(quote)}
          >
            delete
          </button>
          <button
            className="like"
            style={{
              backgroundColor: liked ? "#f66e85" : "#f5f580",
            }}
            onClick={() => onLikeCharacter(quote)}
          >
            like
          </button>
        </div>
        {/* <Image */}
        <img className={characterDirection} src={image} alt={character} />

        <h3>..."{quote}"</h3>
      </div>
    </>
  );
};

export default Simpson;
