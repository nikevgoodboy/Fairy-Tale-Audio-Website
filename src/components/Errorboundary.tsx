import React, { ErrorInfo, ReactNode } from "react";

// Define prop types
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

// Define state types
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static defaultProps = {
    fallback: null,
    onError: undefined,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console with additional context
    console.error("ErrorBoundary caught an error:", {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI with reset option
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            Something went wrong
          </h1>
          {this.state.error && (
            <p className="text-red-800 bg-red-100 p-4 rounded-md mb-4 max-w-lg">
              {this.state.error.message}
            </p>
          )}
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
