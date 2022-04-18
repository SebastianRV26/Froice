import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import OpinionsTable from "./OpinionsTable";
//import classes from "./OpinionsView.module.css";

const opinions = [
  {
    id: 1,
    name: "Sebas",
    time: "26s",
    description: "No es mucho pero es trabajo honesto XD",
  },
  {
    id: 2,
    name: "Lorem ipsum",
    time: "30s",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const OpinionsView = () => {
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <OpinionsTable data={opinions} />
    </>
  );
};

export default OpinionsView;
