export const initialState = { total: 0 };

export function reducer(state, action) {
  switch (action.type) {
    case "LIKE":
      return { total: state.total + 1 };

    case "DISLIKE":
      return { total: state.total - 1 };

    case "RESET":
      return { total: 0 };

    default:
      break;
  }
}
