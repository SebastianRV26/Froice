import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import classes from './OpinionComponent.module.css'
import user from '../../assets/icons/user.png'

const OpinionComponent = ({ element }) => {
    let { name, time, description } = element;

    return (
        <Card className={classes.myrow}>
            <Card.Body>
                <div className={classes.container}>
                    <div className={classes.item1}>

                        <Button variant="secondary">+</Button>
                        <p style={{ marginTop: "revert" }}>0</p>
                        <Button variant="secondary">-</Button>
                    </div>
                    <div className={classes.item2}>
                        <Card.Title>
                            <div className={classes.container}>
                                <Image src={user} roundedCircle className={classes.image} />
                                <h5>{name}</h5>
                                <h5 className={classes.time}>{time}</h5>

                            </div>
                        </Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                        <Button variant="primary">Comment</Button>
                    </div>
                </div>

            </Card.Body>
        </Card>
    );
}

export default OpinionComponent;