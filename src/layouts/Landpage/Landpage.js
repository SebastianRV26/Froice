import classes from "./Landpage.module.css";
import NavbarCustom from "../../components/navbar/Navbar";

const Landpage = () => {
  return (
    <div className={classes.landpage}>
      

      <NavbarCustom buttonText='Register/Login'/>

      <div className={classes.chart}>
        <h1 className={classes.headerLandpage}>Froice network</h1>
        <h2 className={classes.headerLandpage}>
          In this network you can say any opinion about anything without
          censoring
        </h2>

        <h3 className={classes.headerLandpage}>
          If you not are member sign up <a href="/login">here</a>
        </h3>
      </div>

      <footer>
        <p>Web Project ©</p>
      </footer>
    </div>
  );
};

export default Landpage;
