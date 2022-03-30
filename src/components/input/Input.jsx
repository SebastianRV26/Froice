import React from 'react'
import classes from './Input.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export const Input = React.forwardRef((props, ref) => {

  let isInputPassword = props.type === 'password' ? true : false;


  const seePassword = () => {

    if (isInputPassword && ref!==null) {
      if (ref.current.type === 'password') {
        ref.current.type = 'text';
      } else {
        ref.current.type = 'password';
      }
    }else{
      console.error("No sea caballo pd: Enviar un ref");
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
      <input
        ref={ref}
        className={(props.faIcon !== undefined || props.iconSrc !== undefined) ? classes.input : classes.inputWithoutIcon}
        text={props.text !== null ? props.text : ""}
        placeholder={props.placeholder !== null ? props.placeholder : null}
        type={props.type !== undefined ? props.type : 'text'}
      />

      {props.type === 'password' ? <FontAwesomeIcon onClick={seePassword} className={classes.togglePassword} icon={faEye} /> : <div className={classes.togglePasswordDisabled} />}

    </div>
  )
});
