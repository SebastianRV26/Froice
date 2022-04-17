// import classes from "./Reports.module.css";
import { collection } from "firebase/firestore";
import { useState } from "react";
import TableFilter from "../../components/TableFilter/TableFilter";
import { db } from "../../firebase/firebase.config";
import commentSlash from "../../assets/icons/comment-slash.svg";
import userSlash from "../../assets/icons/user-slash.svg";
import windowClose from "../../assets/icons/window-close.svg";
import ReportActionModal from "./ReportActionModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const Reports = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [report, setReport] = useState();
  const [actionType, setActionType] = useState();
  const [reportsCollection, setReportsCollection] = useState(
    collection(db, "reports")
  );

  const deleteCommentHandler = (report) => {
    setReport(report);
    setShowReportModal(true);
    setActionType("comment");
  };

  const banUserHandler = (report) => {
    setReport(report);
    setShowBanModal(true);
  };

  const cancelReportHandler = (report) => {
    setReport(report);
    setShowReportModal(true);
    setActionType("cancel");
  };

  return (
    <>
      <TableFilter
        title="Gestión de reportes"
        columns={[
          { key: "reportedName", label: "Usuario reportado", filter: true },
          { key: "reporterName", label: "Usuario reportador", filter: true },
          { key: "opinionText", label: "Opinión", filter: false },
          { key: "description", label: "Descripción", filter: false },
        ]}
        actions={[
          {
            key: "userBan",
            label: "Banear usuario",
            icon: userSlash,
            actionHandler: banUserHandler,
          },
          {
            key: "deleteComment",
            label: "Eliminar comentario",
            icon: commentSlash,
            actionHandler: deleteCommentHandler,
          },
          {
            key: "cancelReport",
            label: "Cancelar reporte",
            icon: windowClose,
            actionHandler: cancelReportHandler,
          },
        ]}
        collection={reportsCollection}
      />
      {showReportModal && (
        <ReportActionModal
          onHide={setShowReportModal.bind(this, false)}
          actionType={actionType}
        />
      )}
      {showBanModal && (
        <ConfirmationModal
          show={showBanModal}
          title="Banear usuario"
          description="¿Está seguro de que desea banear al usuario?"
          //onConfirm={deleteUserHandler}
          onHide={setShowBanModal.bind(this, false)}
          //loading={loading}
        />
      )}
    </>
  );
};

export default Reports;
