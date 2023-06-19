import React, { ErrorInfo } from 'react';

import { ErrorBoundaryContextProvider } from './ErrorBoundaryContextProvider';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
  info?: ErrorInfo;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: string) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, info: errorInfo });
    console.warn('error: ', this.state.error);
  }

  render() {
    return (
      <ErrorBoundaryContextProvider error={this.state.error}>
        {this.props.children}
      </ErrorBoundaryContextProvider>
    );
  }
}

export default ErrorBoundary;
