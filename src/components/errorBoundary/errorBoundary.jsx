import React, { Component } from "react";
import classes from "./errorBoundary.module.css";

export class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    const { error, fallback } = this.state;
    const { children } = this.props;
    if (error && !fallback) return <ErrorScreen error={error} />;
    if (error) return <fallback error={error} />;
    return children;
  }
}
export function ErrorScreen({ error }) {
  return (
    <div className={classes.errorWrapper}>
      <h3>We are sorry... something went wrong</h3>
      <p>We cannot process your request at this moment.</p>
      <p>ERROR: {error.message}</p>
    </div>
  );
}
