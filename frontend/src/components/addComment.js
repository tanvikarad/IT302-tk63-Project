import React, { useState } from 'react'
import BookDataService from "../services/booksDataService"
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Book from './books';

//tk63@njit.edu          11/14/24             Tanvi Karad         IT302-451           Phase 4


const AddComment = (props) => {
    let editing = false
    let initialCommentState = ""
    const location = useLocation();
    if (location.state && location.state.currentComment) {
      editing = true
      initialCommentState = location.state.currentComment.comment
    }
  
    const [comment, setComment] = useState(initialCommentState)
    // keeps track if review is submitted
    const [submitted, setSubmitted] = useState(false)
  
    let { id } = useParams();
  
    const onChangeComment = e => {
      const comment = e.target.value
      setComment(comment);
    }
  
    const saveComment = () => {
      var data = {
        comment: comment,
        name: props.user.name,
        user_id: props.user.id,
        book_id: id
      }
      if (editing) {
        // get existing review id
        data.comment_id = location.state.currentComment._id
        BookDataService.updateRComment(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
      } else {
        BookDataService.createComment(data)
          .then(response => {
            setSubmitted(true)
          }).catch(e => { })
      }
    }
  
    return (
      <div>
        {submitted ? (
          <div>
            <h5>Comment submitted successfully</h5>
            <Link to={"/books/" + id}>
              Back to the Book
            </Link>
          </div>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>{editing ? "Edit" : "Create"} Comment</Form.Label>
              <Form.Control
                type="text"
                required
                value={comment}
                onChange={onChangeComment}
              />
            </Form.Group>
            <Button variant="primary" onClick={saveComment}>
              Submit
            </Button>
          </Form>
        )}
      </div>
    )
  }
  
export default AddComment;
