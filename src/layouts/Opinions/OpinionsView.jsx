import React, { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Nav, Navbar } from "react-bootstrap";
import OpinionsTable from "./OpinionsTable";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.config";
import { collection, orderBy, where } from "firebase/firestore";
import useAuth from "../../hooks/use-auth";
import { PaginationHelper } from "../../helpers/PaginationHelper";
//import classes from "./OpinionsView.module.css";

const myOpinions = [
  {
    id: 1,
    name: "Sebas",
    time: "26s",
    description: "No es mucho pero es trabajo honesto XD",
    likes: 7,
  },
];

const homeOpinions = [
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
  const [opinions, setOpinions] = useState([]);
  const authData = useAuth();
  const userId = authData.user.uid;

  // para el helper
  const [opinionsCollection, setOpinionsCollection] = useState(
    collection(db, "opinions")
  );

  //console.log(opinionsCollection)

  const columns = [{ key: "name", label: "Nombre", filter: true }];
  const filters = columns.filter((colData) => colData.filter);

  const [myQueryOptions, setMyQueryOptions] = useState([
    orderBy(filters[0].key),
  ]);
  const pageSize = 5;
  const { list, page, showNextPage, showPreviousPage } = PaginationHelper(
    opinionsCollection,
    myQueryOptions,
    pageSize
  );

  const signOutHandler = () => {
    signOut(auth);
  };

  const handleOpinion = (mCollection, isOwn = false) => {
    if (isOwn) {
      console.log("XD");
      setMyQueryOptions([
        where("userId", "==", userId),
        orderBy(filters[0].key),
      ]);
    }else{
      setMyQueryOptions([
        orderBy(filters[0].key),
      ]);
    }

    setOpinionsCollection(collection(db, mCollection));
    setOpinions(list);
    console.log(list);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>Froice</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  handleOpinion("opinions"); // homeOpinions
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  handleOpinion("opinions"); // homeOpinions
                }}
              >
                Explore
              </Nav.Link>
              <Nav.Link href="#notifications">Notifications</Nav.Link>
              <NavDropdown title="Cuenta" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    handleOpinion(`opinions`, true); // myOpinions
                  }}
                >
                  Mi Perfil
                </NavDropdown.Item>
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
