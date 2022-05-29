import React, { useEffect, useState, useRef } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Nav, Navbar, Overlay, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as NotificationSolid } from "@fortawesome/free-solid-svg-icons";
import { faBell as NotificationOutlined } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../hooks/use-auth";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import froicelogo from "../../assets/icons/froicelogo.png";
//import classes from "./OpinionsView.module.css";
import NotificationsBox from "./../../components/NotificationsBox/NotificationsBox";
const Dashboard = () => {
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut(auth);
    navigate("/");
  };

  const [notifications, setNotifications] = useState([]);

  const authData = useAuth();
  useEffect(() => {
    if (!authData?.user?.uid || authData?.user?.uid === null) {
      return;
    }
    const docRef = doc(db, "users", authData.user.uid);
    const colRef = collection(docRef, "notifications");

    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      const data = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        let userData = {
          id: doc.id,
          ...doc.data(),
        };
        data.push(userData);
      });
      setNotifications(data);
    });
    setNotificationsViewed(true);
    return unsubscribe;
  }, [authData?.user?.uid]);

  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [notificationsViewed, setNotificationsViewed] = useState(false);

  const handleOnClickNotificationsButton = () => {
    setShow(!show);
    setNotificationsViewed(false);
  };

  return (
    <>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              src={froicelogo}
              width="20"
              height="30"
              className="d-inline-block align-top"
              alt="Froice logo"
            />{" "}
            Froice
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard/opinions">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard/explore">
                Explorar
              </Nav.Link>
            </Nav>
            <Nav>
              <Button
                variant={
                  notifications.length > 0 && notificationsViewed
                    ? "success"
                    : "light"
                }
                ref={target}
                onClick={handleOnClickNotificationsButton}
              >
                {" "}
                <FontAwesomeIcon
                  icon={
                    notifications.length > 0 && notificationsViewed
                      ? NotificationSolid
                      : NotificationOutlined
                  }
                />{" "}
                Notificaciones
              </Button>
              <Overlay target={target.current} show={show} placement="bottom">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      position: "absolute",
                      backgroundColor: "transparent",
                      color: "white",
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    <NotificationsBox notificationsList={notifications} />
                  </div>
                )}
              </Overlay>
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
