import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./WorkerCards.module.css";

const WorkerCards = ({ workers }) => {
  return (
    <>
      <div className={classes.center}>
        <Row xs={1} md={3} className={`g-4`}>
          {workers.map((el, idx) => (
            <Col key={idx} className={`${classes.text}`}>
              <Card style={{ width: "19rem" }} className={classes.rounded}>
                <Card.Img
                  className={classes.rounded}
                  variant="top"
                  src={`https://avatars.githubusercontent.com/${el.github}`}
                />
                <Card.Body>
                  <Card.Title>{el.name}</Card.Title>
                  <Card.Text>
                    <p>{el.role}</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <a href={`mailto:${el.email}`}>{el.email}</a>
                  <br />
                  <Button
                    className={classes.right}
                    as={Link}
                    to={`https://github.com/${el.github}`}
                  >
                    GitHub
                  </Button>
                  <Button as={Link} to={`https://github.com/${el.github}`}>
                    LinkedIn
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default WorkerCards;
