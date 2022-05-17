import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Link, Outlet, useNavigate } from "react-router-dom";
//import classes from "./OpinionsView.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>Froice</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  //handleOpinion("opinions"); // homeOpinions
                }}
              >
                Inicio
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  //handleOpinion("opinions"); // homeOpinions
                }}
              >
                Explorar
              </Nav.Link>
              <Nav.Link href="#notifications">Notificaciones</Nav.Link>
              <NavDropdown title="Cuenta" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/dashboard/profile">
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dashboard/reports">
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
      <Outlet />
    </>
  );
};

export default Dashboard;
