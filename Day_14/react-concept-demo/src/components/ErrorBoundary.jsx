import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so next render shows fallback
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", marginTop: 20 }}>
          <h3>⚠️ Something went wrong!</h3>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
