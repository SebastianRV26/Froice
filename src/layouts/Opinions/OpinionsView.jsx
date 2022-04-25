import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Nav, Navbar } from "react-bootstrap";
import OpinionsTable from "./OpinionsTable";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
//import classes from "./OpinionsView.module.css";

const opinions = [
  {
    id: 1,
    name: "Sebas",
    time: "26s",
    description: "No es mucho pero es trabajo honesto XD",
    likes: 7,
  },
  {
    id: 2,
    name: "Lorem ipsum",
    time: "30s",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: -7,
  },
];

const OpinionsView = () => {
  const signOutHandler = () => {
    signOut(auth);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">My Profile</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="#feed">Home</Nav.Link>
              <Nav.Link href="#explore">Explore</Nav.Link>
              <Nav.Link href="#notifications">Notifications</Nav.Link>
              <NavDropdown title="Cuenta" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={signOutHandler}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <OpinionsTable data={opinions} />
    </>
  );
};

export default OpinionsView;
