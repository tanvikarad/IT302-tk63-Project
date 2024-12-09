import React, { useState, useCallback } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import AddComment from "./components/addComment";
import BooksList from "./components/booksList";
import Book from "./components/books.js";
import Login from "./components/login";
import { BrowserRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

//tk63@njit.edu          12/8/24             Tanvi Karad         IT302-451           Phase 5



function App() {
  const [user, setUser] = useState(null);
  const loginSetter = useCallback(user => {
    setUser(user);
  }, [setUser]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Book Comments</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/tk63/books"}>
              Books
            </Nav.Link>
            <Nav.Link as={NavLink} to={user ? "" : "/tk63/login"}>
              {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes basename="/tk63">
        <Route path="/tk63/" element={<BooksList />}></Route>
        <Route path="/tk63/books" element={<BooksList />}></Route>

        <Route path="/tk63/books/:id/" element={<Book user={user} />}></Route>
        <Route path="/books/:id/comment" element={<AddComment user={user}    />}></Route>   
        <Route path="/tk63/books/:id/comment" element={<AddComment user={user}    />}></Route>   

        <Route path="/tk63/login" element={<Login user={user} loginSetter={loginSetter} />}></Route>
      </Routes>
    </div>
  );
}
export default App;


