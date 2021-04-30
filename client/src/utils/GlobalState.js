import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOKS,
  ADD_BOOK,
  ADD_SAVED,
  UPDATE_SAVED,
  REMOVE_SAVED,
  LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case SET_CURRENT_BOOK:
    return {
      ...state,
      currentBook: action.book,
      loading: false
    };

  case UPDATE_BOOKS:
    return {
      ...state,
      books: [...action.books],
      loading: false
    };

  case ADD_BOOK:
    return {
      ...state,
      books: [action.book, ...state.books],
      loading: false
    };

  case REMOVE_BOOK:
    return {
      ...state,
      books: state.books.filter((book) => {
        return book._id !== action._id; 
      })
    };

  case ADD_SAVED:
    return {
      ...state,
      saved: [action.book, ...state.saved],
      loading: false
    };

  case UPDATE_SAVED:
    return {
      ...state,
      saved: [...state.saved],
      loading: false
    };

  case REMOVE_SAVED:
    return {
      ...state,
      saved: state.saved.filter((book) => {
        return book._id !== action._id; 
      })
    };

  case LOADING:
    return {
      ...state,
      loading: true
    };

  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    books: [],
    currentBook: {
      _id: 0,
      title: "",
      body: "",
      author: ""
    },
    saved: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
