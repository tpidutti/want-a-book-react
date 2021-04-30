import React, { useRef } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_BOOK, LOADING } from '../../utils/actions';
import API from '../../utils/API';

function CreateBookForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: LOADING });
    API.saveBook({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      author: authorRef.current.value,
    })
      .then((result) => {
        dispatch({
          type: ADD_BOOK,
          post: result.data,
        });
      })
      .catch((err) => console.log(err));

    titleRef.current.value = '';
    bodyRef.current.value = '';
  };

  return (
    <div>
      <div className="jumbotron">
        <img
          className="img-fluid img-thumbnail"
          src="https://images.pexels.com/photos/459688/pexels-photo-459688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
      </div>
      <h1>Book</h1>
      <form className="form-group mt-5 mb-5" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          className="form-control mb-5"
          required
          ref={titleRef}
          id="title"
          placeholder="Title"
        />
        <label htmlFor="body">Body:</label>
        <textarea
          className="form-control mb-5"
          required
          ref={bodyRef}
          id="body"
          placeholder="Body"
        />
        <label htmlFor="description">Description:</label>
        <input
          className="form-control mb-5"
          ref={authorRef}
          id="description"
          placeholder="Description"
        />
        <button
          className="btn btn-success mt-3 mb-5"
          disabled={state.loading}
          type="submit"
        >
          Save Book
        </button>
      </form>
    </div>
  );
}

export default CreateBookForm;
