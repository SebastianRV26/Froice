import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import classes from './NewOpinion.module.css'
import user from '../../assets/icons/user.png'

const NewOpinion = () => {
    return (
        <div>
            <Card className={classes.myrow}>
                <Card.Body>
                    <div className={classes.container}>
                        <Image src={user} roundedCircle className={classes.image} />
                        <textarea placeholder="Realizar nueva queja" className={classes.ta} />
                    </div>
                    <div>
                        <Button variant="secondary">Attach</Button>
                        <Button variant="primary" className={classes.send}>Send</Button>
                    </div>


                </Card.Body>
            </Card>
        </div>
    );
};

export default NewOpinion;