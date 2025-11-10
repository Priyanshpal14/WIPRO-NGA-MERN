import React, { Suspense, useState, useEffect } from "react";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import PureDisplay from "./components/PureDisplay";
import ModalPortal from "./components/ModalPortal";
import ExplodingChild from "./components/ExplodingChild";

const HeavyPage = React.lazy(() => import("./pages/HeavyPage"));

export default function App() {
  const [section, setSection] = useState("home");
  const [showModal, setShowModal] = useState(false);

  // For Pure Component demo
  const [parentCount, setParentCount] = useState(0);
  const [title, setTitle] = useState("Pure Component Demo");

  useEffect(() => {
    const timer = setInterval(() => {
      setParentCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>React Advanced Concepts Demo</h1>

      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setSection("lazy")}>Lazy Load</button>
        <button onClick={() => setSection("pure")}>Pure Component</button>
        <button onClick={() => setSection("error")}>Error Boundary</button>
        <button onClick={() => setSection("portal")}>Portal (Modal)</button>
      </nav>

      <hr />

      {section === "home" && <Home />}

      {section === "lazy" && (
        <Suspense fallback={<p>Loading heavy component...</p>}>
          <HeavyPage />
        </Suspense>
      )}

      {section === "pure" && (
        <div>
          <p>Parent count (changes every second): {parentCount}</p>
          <PureDisplay title={title} count={0} />
          <button onClick={() => setTitle("Title Changed!")}>
            Change Title
          </button>
        </div>
      )}

      {section === "error" && (
        <ErrorBoundary>
          <ExplodingChild />
        </ErrorBoundary>
      )}

      {section === "portal" && (
        <>
          <button onClick={() => setShowModal(true)}>Open Modal</button>
          <ModalPortal show={showModal} onClose={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
}
