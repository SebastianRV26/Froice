import React from "react";
import CustomModal from "../CustomModal/CustomModal";

const ConfirmationModal = ({
  show,
  title,
  description,
  onConfirm,
  onHide,
  myButtonTitle,
}) => {
  return (
    <CustomModal
      show={show}
      title={title}
      onHide={onHide}
      onConfirm={onConfirm}
      myButtonTitle={myButtonTitle}
    >
      <p>{description}</p>
    </CustomModal>
  );
};

export default ConfirmationModal;
