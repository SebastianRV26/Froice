import React from "react";
import CustomModal from "../CustomModal/CustomModal";

const ConfirmationModal = ({ show, title, description, onConfirm, onHide }) => {
  return (
    <CustomModal
      show={show}
      title={title}
      onHide={onHide}
      onConfirm={onConfirm}
    >
      <p>{description}</p>
    </CustomModal>
  );
};

export default ConfirmationModal;
