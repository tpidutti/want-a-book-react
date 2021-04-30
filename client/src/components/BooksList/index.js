import React, { useEffect } from "react";
import { ListItem, List } from "../List";
import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_BOOK, UPDATE_BOOKS, LOADING } from "../../utils/actions";
import API from "../../utils/API";

function BooksList() {
  const [state, dispatch] = useStoreContext();

  const removeBook = id => {
    API.deleteBook(id)
      .then(() => {
        dispatch({
          type: REMOVE_BOOK,
          _id: id
        });
      })
      .catch(err => console.log(err));
  };

  const getBook = () => {
    dispatch({ type: LOADING });
    API.getBook()
      .then(results => {
        dispatch({
          type: UPDATE_BOOKS,
          posts: results.data
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div>
      <h1>All Books</h1>
      <h3 className="mb-5 mt-5">Click on the book to view</h3>
      {state.books.length ? (
        <List>
          {state.books.map(book => (
            <ListItem key={book._id}>
              <Link to={"/posts/" + book._id}>
                <strong>
                  {book.title} by {book.author}
                </strong>
              </Link>
              <DeleteBtn onClick={() => removeBook(book._id)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3>You haven't added any books yet!</h3>
      )}
      <div className="mt-5">
        <Link to="favorites">View saved books</Link>
      </div>
    </div>
  );
}

export default BooksList;
