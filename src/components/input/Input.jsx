import React from 'react'
import classes from './Input.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export const Input = React.forwardRef((props, ref) => {

  let isInputPassword = props.type === 'password' ? true : false;

  let getClassName = () =>{
    switch (props.type) {
      case "text": 
        return (props.faIcon !== undefined || props.iconSrc !== undefined) ?  classes.input : classes.inputWithoutIcon;
      case "phone":
        return classes.inputWithPhone;
      default:
        return (props.faIcon !== undefined || props.iconSrc !== undefined) ?  classes.input : classes.inputWithoutIcon;
    }
  }

  let getType = () => { 
      switch (props.type) {
        case "text": 
        return "text"
      case "phone":
        return "number"
      default:
        return props.type;
      }
  }


  const seePassword = () => {
    if (isInputPassword && ref !== null) {
      ref.current.type === 'password' ? ref.current.type = 'text' : ref.current.type = 'password';
    } else {
      console.error("Enviar un ref");
    }
  }

  return (
    <div className={classes.inputBody}>

      {props.faIcon !== undefined ? <FontAwesomeIcon onClick={seePassword} className={classes.inputIcon} icon={props.faIcon} /> : null}

      {props.iconSrc !== undefined ?
        <img alt=""
          src={props.iconSrc}
          width={props.size === null ? 32 : props.size}
          height={props.size === null ? 32 : props.size}
        />
        :
        null
      }

      
      {
        props.type === 'phone'?
          <select className={classes.phoneAreaZone}>
            <option value="+506">+506</option>
            <option value="+1" >+1</option>
            <option value="+2">+2</option>
          </select>
          :
          null
      }
    
      <input
        onChange={props.onChange}
        ref={ref}
        className={getClassName()}
        text={props.text !== null ? props.text : ""}
        placeholder={props.placeholder !== null ? props.placeholder : null}
        type={getType()}
      />

      {props.type === 'password' ? <FontAwesomeIcon onClick={seePassword} className={classes.togglePassword} icon={faEye} /> : <div className={classes.togglePasswordDisabled} />}

    </div>
  )
});
