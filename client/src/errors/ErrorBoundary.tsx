import React from "react";
import { ErrorPage } from "./ErrorPage";

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    // TODO log the error to a tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
