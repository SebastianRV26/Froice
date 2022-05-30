import React, { useEffect, useState, useRef } from "react";
import { Image } from "react-bootstrap";
import classes from "./NotificationsBox.module.css";
import defUserImg from "../../assets/icons/user.png";
import { Link } from "react-router-dom";

const NotificationsBox = (props) => {
  let counter = 0;
  return (
    <div className={classes.notificationsBoxContainer}>
      {props.notificationsList.map((notification) => {
        return (
          <div style={{display: 'flex', flexDirection:"column"}} key={counter++}>
            <div className={classes.notificationLine}>
              <Image
                src={defUserImg}
                width="32"
                height="32"
                roundedCircle
                className="align-middle"
                //className="d-inline-block align-top" //{classes.image}
                alt="Imagen de perfil"
              />{" "}
              <Link to={`/dashboard/opinions/users/${notification.userId}`}>
                {notification.name + " is " + notification.action + " you "}
              </Link>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsBox;
