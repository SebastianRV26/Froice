import classes from "./Landpage.module.css";
import NavbarCustom from "../../components/navbar/Navbar.bootstrap";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Landpage = () => {


  let navigate = useNavigate();
  return (
    <div className={classes.landpage}>


      <NavbarCustom buttonText='Register/Login' />

      <div className={classes.chart}>
        <h1 className={classes.headerLandpage}>Froice network</h1>
        <h2 className={classes.headerLandpage}>
          In this network you can say any opinion about anything without
          censoring
        </h2>

        <h3 className={classes.headerLandpage}>
          If you not are member sign up
          {" "}<Button
            variant="link"
            className={classes.link}
            onClick={() => navigate('/register')}
          >
            here
          </Button>{" "}
        </h3>

        <Button
          variant="link"
          className={classes.link}
          onClick={() => navigate('/login')}
        >
          Are you member? click here
        </Button>
      </div>

      <footer>
        <p>Web Project ©</p>
      </footer>
    </div>
  );
};

export default Landpage;
