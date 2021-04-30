import React, { useEffect } from "react";
import { ListItem, List } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_SAVED, LOADING, UPDATE_SAVED } from "../utils/actions";

const SavedList = () => {
  const [state, dispatch] = useStoreContext();

  const getSaved = () => {
    dispatch({ type: LOADING });
    dispatch({ type: UPDATE_SAVED });
  };

  const removeFromSaved = id => {
    dispatch({
      type: REMOVE_SAVED,
      _id: id
    });
  };

  useEffect(() => {
    getSaved();
  }, []);

  return (
    <div className="container mb-5 mt-5">
      <h1 className="text-center">Here's All of Your Saved Books</h1>
      {state.saved.length ? (
        <List>
          <h3 className="mb-5 mt-5">Click on a book to view it</h3>
          {state.saved.map(book => (
            <ListItem key={book._id}>
              <Link to={"/books/" + book._id}>
                <strong>
                  {book.title} by {book.author}
                </strong>
              </Link>
              <DeleteBtn onClick={() => removeFromSaved(book._id)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3>You haven't saved any books yet!</h3>
      )}
      <div className="mt-5">
        <Link to="home">Back to home</Link>
      </div>
    </div>
  );
};

export default SavedList;
