import React from "react";
import './Landpage.css'
import froiceLogo from '../assets/icons/froicelogo.png'

function landpage() {
  return (
    <div className="landpage">

      <nav className="navbar">
        <a href="/"><img id="navbarLogo" alt="froiceLogo" src={froiceLogo} /></a>
        <h2 className="headerLandpage">Froice</h2>
        <button className="landPageButtons">Login / Register</button>
      </nav>

      <div className="chart">
        <h1 className="headerLandpage">
          Prosteta network
        </h1>
        <h2 className="headerLandpage">
          In this network you can say any opinion about anything without censoring
        </h2>

        <h3 className="headerLandpage">
          If you not are member sign up <a href="/register">here</a>
        </h3>
      </div>

      <footer>
        <p>Web Project ©</p>
      </footer>

    </div>
  );
}

export default landpage;