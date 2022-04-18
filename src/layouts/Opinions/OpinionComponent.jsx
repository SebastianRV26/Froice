import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Navbar,
} from "react-bootstrap";
import classes from "./OpinionComponent.module.css";
import user from "../../assets/icons/user.png";
import CustomModal from "../../components/modals/CustomModal/CustomModal";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import useModify from "../../hooks/use-modify";
import useDelete from "../../hooks/use-delete";
import ConfirmationModal from "../../components/modals/ConfirmationModal/ConfirmationModal";

const OpinionComponent = ({ element }) => {
  let { name, time, description } = element;
  const [commentModalShow, setCommentModalShow] = useState(false);
  const [modifyModalShow, setModifyModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [modifyOpinion] = useModify();
  const [deleteHook] = useDelete();

  const ChangeCommentModal = () => {
    setCommentModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeDeleteModal = () => {
    setDeleteModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeModifyModal = () => {
    setModifyModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeReportModal = () => {
    setReportModalShow((prevModalShow) => !prevModalShow);
  };

  const Comment = () => {};

  const ModifyOpinion = () => {
    let opinionId = "XDXD";
    let opinion = {};
    modifyOpinion(
      "opinions",
      opinionId,
      opinion,
      "Opinión editada",
      "Error al editar opinión"
    );
  };

  const DeleteOpinion = () => {
    let opinionId = "XDXD";
    deleteHook(
      "opinions",
      opinionId,
      "Se elimino la opinión",
      "Error al eliminar opinión"
    );
  };

  const ReportOpinion = () => {};

  return (
    <div>
      <Card className={classes.myrow}>
        <Card.Body>
          <DropdownButton
            className={classes.options}
            as={ButtonGroup}
            title="..."
            id="bg-vertical-dropdown-1"
          >
            <Dropdown.Item eventKey="1" onClick={ChangeModifyModal}>
              Modificar
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={ChangeDeleteModal}>
              Eliminar
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={ChangeReportModal}>
              Reportar
            </Dropdown.Item>
          </DropdownButton>
          <div className={classes.container}>
            <ButtonGroup vertical>
              <Button>+</Button>
              <Button disabled>0</Button>
              <Button>-</Button>
            </ButtonGroup>

            <div className={classes.item2}>
              <Navbar bg="light">
                <Container>
                  <Navbar.Brand>
                    <img
                      src={user}
                      width="35"
                      height="35"
                      roundedCircle
                      className="d-inline-block align-top" //{classes.image}
                      alt="React Bootstrap logo"
                    />
                  </Navbar.Brand>
                  <Navbar.Brand>{name}</Navbar.Brand>
                  <Navbar.Brand className={classes.time}>{time}</Navbar.Brand>
                  <Button className={classes.time} variant="secondary">
                    Follow
                  </Button>
                </Container>
              </Navbar>

              <Card.Text>{description}</Card.Text>
              <Button onClick={ChangeCommentModal} variant="primary">
                Comment
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/*Commet Modal */}
      {commentModalShow && (
        <CustomModal
          show={commentModalShow}
          title="Comentar opinión"
          message=""
          onHide={() => setCommentModalShow(false)}
        >
          <NewOpinion onSend={Comment} message="" />
        </CustomModal>
      )}

      {/*Modify Modal */}
      {modifyModalShow && (
        <CustomModal
          show={modifyModalShow}
          title="Modificar opinión"
          onHide={() => setModifyModalShow(false)}
        >
          <NewOpinion onSend={ModifyOpinion} message={description} />
        </CustomModal>
      )}

      {/*Delete Modal */}
      {deleteModalShow && (
        <ConfirmationModal
          show={deleteModalShow}
          title={"Eliminar opinión"}
          description={"Está seguro de que desea eliminar esta opinión?"}
          onConfirm={DeleteOpinion}
          onHide={() => setDeleteModalShow(false)}
        />
      )}

      {/*Report Modal */}
      {reportModalShow && (
        <ConfirmationModal
          show={reportModalShow}
          title={"Reportar opinión"}
          description={"Está seguro de que desea reportar esta opinión?"}
          onConfirm={ReportOpinion}
          onHide={() => setReportModalShow(false)}
        />
      )}
    </div>
  );
};

export default OpinionComponent;
