import froiceLogo from "../../assets/icons/froicelogo.png";
import classes from "./Landpage.module.css";

const Landpage = () => {
  return (
    <div className={classes.landpage}>
      <nav className={classes.navbar}>
        <a href="/">
          <img id={classes.navbarLogo} alt="froiceLogo" src={froiceLogo} />
        </a>
        <h2 className={classes.headerLandpage}>Froice</h2>
        <button className={classes.landPageButtons}>Login / Register</button>
      </nav>

      <div className={classes.chart}>
        <h1 className={classes.headerLandpage}>Froice network</h1>
        <h2 className={classes.headerLandpage}>
          In this network you can say any opinion about anything without
          censoring
        </h2>

        <h3 className={classes.headerLandpage}>
          If you not are member sign up <a href="/register">here</a>
        </h3>
      </div>

      <footer>
        <p>Web Project ©</p>
      </footer>
    </div>
  );
};

export default Landpage;
