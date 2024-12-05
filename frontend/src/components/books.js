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
        console.log('API RESPONSE COMMENT:', response.data);
       
        setComments(response.data)
        //setBook({...book, comments: response.data[0].comments})
      }
      
  )
      .catch(e => {
        console.log(e);
      })
  }


  useEffect(() => {
    getBook(id)
  }, [id])

  useEffect(() => {
    console.log("new state of comments", comments)
    setBook({...book, comments: comments})
  }, [comments])

  useEffect( () => {
    getComment(id)
  }, [])

  useEffect( () => {
    console.log("new book updated", book);
  })

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
                  <Link to={"/books/" + id + "/comment"}>
                    Add Comment
                  </Link>}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Comments</h2><br></br>
            {book.comments ? book.comments.map((comment, index) => {
              console.log("in map", comment)
              return (
                <Card key={index}>
                  <Card.Body>
                    <h5>{comment.name + " commented on " + new Date(Date.parse(comment.date)).toDateString()}</h5>
                    <p>{comment.comment}</p>
                    {props.user && props.user.id === comment.user_id &&
                      <Row>
                        <Col><Link
                          to={"/books/" + id + "/comment"}
                          state={{ currentComment: comment }}
                        >Edit</Link>
                        </Col>
                        <Col><Button variant="link">Delete</Button></Col>
                      </Row>}
                  </Card.Body>
                </Card>
              )
            }) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default Book;
