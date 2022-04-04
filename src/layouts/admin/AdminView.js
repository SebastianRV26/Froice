//import classes from './AdminView.module.css'

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Administrador</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/profile">
                Perfil
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/cagories">
                Quejas
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/orders">
                Opiniones
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/users">
                Usuarios
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AdminPage;
