import React, { useState, useEffect } from 'react'
import BookDataService from '../services/booksDataService'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

//tk63@njit.edu          11/14/24             Tanvi Karad         IT302-451           Phase 4


const Book = (props) => {
  const [comments, setComments] = useState([["All Comments"]]);
  const [book, setBook] = useState({
    id: null,
    title: "",
    rated: "",
    comments: []
  })
  let { id } = useParams();

  const getBook = id => {
    BookDataService.get(id)
      .then(response => {
        console.log("book data", response.data.books[0]);
        setBook(response.data.books[0])
      })
      .catch(e => {
        console.log(e);
      })
  }
  const getComment= id => {
 BookDataService.getComment(id)
      .then(response => {
        setComments(response.data.comments[0])
      })
      .catch(e => {
        console.log(e);
      })
  }


  useEffect(() => {
    getBook(id)
  }, [id])

  useEffect( () => {
    getComment(id)
  }, [book])

  const deleteComment = (commentID, index) => {
    BookDataService.deleteComment(commentID, props.user.id)
      .then(response => {
        setBook((prevState) => {
          prevState.comments.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
    return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={book.image} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{book.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Page Count: {book.pageCount}
                </Card.Text>
                {props.user &&
                  <Link to={"/tk63/books/" + id + "/tk63/comment"}>
                    Add Comment
                  </Link>}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Comments for {book.title}</h2> <ul> {comments?.map(comment => ( <li key={comment._id}>{comments.comment}</li> ))} </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default Book;
