import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function ModalPortal({ children, onClose }) {
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, el);
}

export default ModalPortal;
