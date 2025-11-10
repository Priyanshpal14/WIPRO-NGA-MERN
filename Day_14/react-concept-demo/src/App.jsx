import React, { Suspense, useState } from "react";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import PureDisplay from "./components/PureDisplay";
import ModalPortal from "./components/ModalPortal";

const HeavyPage = React.lazy(() => import("./pages/HeavyPage"));

function App() {
  const [section, setSection] = useState("home");
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>React Advanced Concepts Demo</h1>

      <nav>
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
      {section === "pure" && <PureDisplay />}
      {section === "error" && (
        <ErrorBoundary>
          <ProblematicComponent />
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

// Dummy error component for Error Boundary test
function ProblematicComponent() {
  throw new Error("Oops! Something went wrong!");
}

export default App;
