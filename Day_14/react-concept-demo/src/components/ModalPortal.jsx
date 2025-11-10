import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function ModalPortal({ show, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          margin: "15% auto",
          width: "300px",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Modal Content</h3>
        <p>This modal is rendered via React Portal.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    modalRoot
  );
}
