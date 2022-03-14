import classes from "./Slider.module.css";
import { useRef, useState } from 'react';

const Slider = (props) => {

    console.log(props.slideDef);

    //const loginForm = useRef(null);
    const loginPage = useRef(null);
    const registerPage = useRef(null);

    const [expand, setExpand] = useState(true);


    function onClickDownSlider(e) {
        loginPage.current.className = expand ? classes.defaultSlide + " " + classes.hide : classes.defaultSlide;

        registerPage.current.className = expand ? classes.loginText + " " +classes.expand :classes.loginText ;

        setExpand(!expand);
    }

    return (
        <div className={classes.wrapper}>
            <div ref={registerPage} className={classes.loginText}>
                <button className={classes.cta} onClick={onClickDownSlider}>{expand?"Register":"Login"}</button>
                {props.slideAlt}
            </div>
            <div ref={loginPage} className={classes.defaultSlide}>
                {props.slideDef}
            </div>
        </div>
    );
};

export default Slider;
