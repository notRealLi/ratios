export default (state, action) => {
  switch (action.type) {
    case "SEARCH_STOCK":
      return {
        ...state,
        loading: false,
        selectedStock: action.payload,
      };
    case "SEARCH_SYMBOL":
      return {
        ...state,
        loading: false,
        suggestions: action.payload,
      };
    default:
      return state;
  }
};
