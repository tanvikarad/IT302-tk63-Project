import React, { useState, useEffect } from 'react'
import BookDataService from "../services/booksDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Book from './books';

const BooksList = () => {
    const [book, setBook] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [PageCount, setPageCount] = useState(["All Page Count"]);
    const [searchPageCount, setSearchPageCount] = useState(["All Page Counts"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0)
    const [currentSearchMode, setCurrentSearchMode] = useState("")
  
    useEffect(() => {
      retrieveBooks();
      retrievePageCount();
      
    }, []);
  
    useEffect( () => {
      setCurrentPage(0)
    }, [currentSearchMode])
    
    useEffect(() => {
      retrieveNextPage()
    }, [currentPage])
  
    const retrieveNextPage = () => {
      if(currentSearchMode === "findByTitle") {
        findByTitle()
      } else if(currentSearchMode === "findByPageNumber") {
        findByPageCount()
      } else {
        retrieveBooks()
      }
    }
    
  
    const retrieveBooks = () => {
      setCurrentSearchMode("")
      BookDataService.getAll(currentPage)
        .then((response) => {
          console.log("is this it", response.data);
          setBook(response.data.book);
          setCurrentPage(response.data.page)
          setEntriesPerPage(
            response.data.entries_per_page)
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const retrievePageCount = () => {
      BookDataService.getPageCount()
        .then((response) => {
          console.log(response.data);
          console.log(response.data.books);
          console.log(response.data.books[0].pageCount);
          //start with 'All page count' if user doesn't specify any page count
          setSearchPageCount(["All Page Counts"].concat(response.data.books));
          console.log("searchPageCount:", searchPageCount);
        })
        .catch(e => {
          console.log(e);
        });
    };
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value
      setSearchTitle(searchTitle);
    };
  
    const onChangeSearchRPageCount = (e) => {
        console.log("updating page count");
      setPageCount(e.target.value);
    };
  
    const find = (query, by) => {
      BookDataService.find(query, by, currentPage)
        .then(response => {
          console.log("is THIS it", response.data);
          console.log(response.data.books)
          setBook(response.data.books)
        })
        .catch(e => {
          console.log(e)
        })
    }
    const findByTitle =
      () => {
        //setSearchPageCount("")
        setCurrentSearchMode("findByTitle")
        find(searchTitle, "title")
      }
    const findByPageCount =
      () => {
        setSearchTitle("")
        setCurrentSearchMode("findbyPageCount")
        if (searchPageCount === "All Page Counts") {
          retrieveBooks()
        } else {
            console.log("here");
          find(PageCount, "pageCount")
        }
      }
  
    return (
      <div className="App">
        <Container>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={onChangeSearchTitle}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={findByTitle}
                >
                  Search
                </Button>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="select" onChange={onChangeSearchRPageCount} >
                    {searchPageCount.map(PageCount => {
                      return (
                        <option value={typeof(PageCount) === "string" ? PageCount : PageCount.pageCount} selected={typeof(PageCount) === "string" ? PageCount : PageCount.pageCount === searchPageCount} >{typeof(PageCount) === "string" ? PageCount : PageCount.pageCount}</option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={findByPageCount}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
            {book?.map((book) => {
              console.log("BOOKS FROM SEARCH", book);
              return (
                <Col>
                  <Card style={{ width: '18rem' }}>
                  <Card.Img src={book.image} fluid />
                  <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        PageCount: {book.pageCount}
                      </Card.Text>
                      <Link to={"/tk63/books/" + book.id} >View Comments </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
          <br />
          Showing Page: {currentPage}
          <Button
            variant="link"
            onClick={() => { setCurrentPage(currentPage + 1) }} >
            Get Next {entriesPerPage} Results
          </Button>
        </Container>
      </div>
    );
  }
  

export default BooksList;
