import React, { useCallback, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Nav, Navbar } from "react-bootstrap";
import OpinionsTable from "./OpinionsTable";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebase/firebase.config";
import { collection, orderBy, where } from "firebase/firestore";
import useAuth from "../../hooks/use-auth";
import { PaginationHelper } from "../../helpers/PaginationHelper";
import { getDownloadURL, ref } from "firebase/storage";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // para el helper
  const [opinionsCollection, setOpinionsCollection] = useState(
    collection(db, "opinions")
  );

  const columns = [{ key: "name", label: "Nombre", filter: true }];
  const filters = columns.filter((colData) => colData.filter);

  const [myQueryOptions, setMyQueryOptions] = useState([
    orderBy(filters[0].key),
  ]);
  const pageSize = 5;

  const onFetchStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onFetchFinish = useCallback(async (list) => {
    for (let opinion of list) {
      if (opinion?.imageUrl)
        opinion.imageUrl = await getDownloadURL(ref(storage, opinion.image));
    }
    setOpinions(list);
    setLoading(false);
  }, []);

  const onFetchError = useCallback((error) => {
    setLoading(false);
    console.log(error);
  }, []);

  const { list, page, showNextPage, showPreviousPage } = PaginationHelper(
    opinionsCollection,
    myQueryOptions,
    pageSize,
    onFetchStart,
    onFetchFinish,
    onFetchError
  );

  const signOutHandler = () => {
    signOut(auth);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/');
  };

  const handleOpinion = (mCollection, isOwn = false) => {
    if (isOwn) {
      console.log("XD");
      setMyQueryOptions([
        where("userId", "==", userId),
        orderBy(filters[0].key),
      ]);
    } else {
      setMyQueryOptions([orderBy(filters[0].key)]);
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
                Inicio
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  handleOpinion("opinions"); // homeOpinions
                }}
              >
                Explorar
              </Nav.Link>
              <Nav.Link href="#notifications">Notificaciones</Nav.Link>
              <NavDropdown title="Cuenta" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    handleOpinion(`opinions`, true); // myOpinions
                  }}
                >
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/reports">
                  Mis reportes
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
