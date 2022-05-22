import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import classes from "./WorkerCards.module.css";

const WorkerCards = ({ workers }) => {
  const openUrl = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <>
      <Row xs={1} md={3} className={`g-4`}>
        {workers.map((el, idx) => (
          <Col key={idx} className={`${classes.text}`}>
            <div className={classes.center}>
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
                    as="a"
                    href={`https://github.com/${el.github}`}
                    target="_blank"
                  >
                    GitHub
                  </Button>
                  <Button
                    as="a"
                    href={`https://www.linkedin.com/in/${el.linkedin}/`}
                    target="_blank"
                  >
                    LinkedIn
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default WorkerCards;
