import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

class ErrorBoundaryRouter extends React.Component<Props> {
  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>{this.props.children}</ErrorBoundary>
      </BrowserRouter>
    );
  }
}

export default ErrorBoundaryRouter;
