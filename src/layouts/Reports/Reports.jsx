// import classes from "./Reports.module.css";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import TableFilter from "../../components/TableFilter/TableFilter";
import { db } from "../../firebase/firebase.config";
import commentSlash from "../../assets/icons/comment-slash.svg";
import userSlash from "../../assets/icons/user-slash.svg";
import windowClose from "../../assets/icons/window-close.svg";
import ReportActionModal from "./ReportActionModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import useDelete from "../../hooks/use-delete";

const Reports = () => {
  /*useEffect(() => {
    addDoc(collection(db, "reports"), {
      reportedId: "1",
      reportedName: "Croqui",
      reporterId: "2",
      reporterName: "Jairo",
      opinionId: "1",
      opinionText: "Text",
      description: "No me gustó",
    });
  }, []);*/
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [report, setReport] = useState();
  const [actionType, setActionType] = useState();
  const [reportsCollection, setReportsCollection] = useState(
    collection(db, "reports")
  );
  const [deleteHook, loading] = useDelete();

  const deleteCommentDialogHandler = (report) => {
    setReport(report);
    setShowReportModal(true);
    setActionType("comment");
  };

  const banUserDialogHandler = (report) => {
    setReport(report);
    setShowBanModal(true);
  };

  const cancelReportDialogHandler = (report) => {
    setReport(report);
    setShowReportModal(true);
    setActionType("cancel");
  };

  const banUserHandler = () => {
    const deleteUserPromise = deleteHook(
      "users",
      report.reportedId,
      "Se eliminó el usuario correctamente",
      "Error al eliminar el usuario"
    );
    const deleteReportPromise = deleteHook(
      "reports",
      report.id,
      "Se eliminó el reporte correctamente",
      "Error al eliminar el reporte"
    );
    Promise.all([deleteUserPromise, deleteReportPromise]).then(() => {
      setReport(null);
      setShowBanModal(false);
      setReportsCollection(collection(db, "reports"));
    });
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
            actionHandler: banUserDialogHandler,
          },
          {
            key: "deleteComment",
            label: "Eliminar comentario",
            icon: commentSlash,
            actionHandler: deleteCommentDialogHandler,
          },
          {
            key: "cancelReport",
            label: "Cancelar reporte",
            icon: windowClose,
            actionHandler: cancelReportDialogHandler,
          },
        ]}
        collection={reportsCollection}
      />
      {showReportModal && (
        <ReportActionModal
          actionType={actionType}
          report={report}
          onHide={setShowReportModal.bind(this, false)}
          onSuccess={setReportsCollection.bind(this, collection(db, "reports"))}
        />
      )}
      {showBanModal && (
        <ConfirmationModal
          show={showBanModal}
          title="Banear usuario"
          description="¿Está seguro de que desea banear al usuario?"
          onConfirm={banUserHandler}
          onHide={setShowBanModal.bind(this, false)}
          loading={loading}
        />
      )}
    </>
  );
};

export default Reports;
