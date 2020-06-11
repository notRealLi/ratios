export default (state, action) => {
  switch (action.type) {
    case "SEARCH_STOCK":
      return {
        ...state,
        error: null,
        loading: false,
        suggestions: [],
        selectedStock: action.payload,
      };
    case "SEARCH_SYMBOL":
      return {
        ...state,
        error: null,
        loading: false,
        suggestions: action.payload,
      };
    case "SEARCH_NEWS":
      return {
        ...state,
        error: null,
        loading: false,
        newsList: action.payload,
      };
    case "SYMBOL_API_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "STOCK_API_ERROR":
      action.payload.type = "stock";
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
