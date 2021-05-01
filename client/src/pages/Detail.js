import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_BOOK, ADD_SAVED, REMOVE_SAVED } from "../utils/actions";

const Detail = props => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    API.getBook(props.match.params.id)
      .then(res => dispatch({ type: SET_CURRENT_BOOK, book: res.data }))
      .catch(err => console.log(err));
  }, []);

  const addSaved = () => {
    dispatch({
      type: ADD_SAVED,
      book: state.currentBook
    });
  };

  const removeSaved = () => {
    dispatch({
      type: REMOVE_SAVED,
      _id: state.currentBook._id
    });
  };

  return (
    <>{state.currentBook ? (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {state.currentBook.title} by {state.currentBook.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Book:</h1>
              <p>{state.currentBook.body}</p>
            </article>
          </Col>
          {state.saved.indexOf(state.currentBook) !== -1 ? (
            <button className="btn btn-danger" onClick={removeSaved}>
                Remove from saved book!
            </button>
          ) : (
            <button className="btn" onClick={addSaved}>
                Add book to saved
            </button>
          )}
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Books</Link>
          </Col>
        </Row>
      </Container>
    ) : (
      <div>loading...</div>
    )}</>
  );
};

export default Detail;
