export const initialState = {};

export function reducer(state, action) {
  switch (action.type) {
    case "STORE_API_DATA":
      return { ...state, apiData: action.payload };

    case "ON_LIKE_TOGGLE":
      console.log("toggle like");
      {
        const apiData = [...state.apiData];
        const index = state.apiData.findIndex(
          (simpson) => simpson.quote === action.payload
        );
        console.log(index);
        apiData[index].liked = !apiData[index].liked;
        console.log(apiData);
        return { ...state, apiData };
      }

    case "ON_DELETE": {
      const apiData = [...state.apiData];
      const index = apiData.findIndex(
        (simpson) => simpson.quote === action.payload
      );
      apiData.splice(index, 1);
      return { ...state, apiData };
    }
    default:
      break;
  }
}
