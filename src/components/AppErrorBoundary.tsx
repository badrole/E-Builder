import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App runtime error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="max-w-container mx-auto px-4 sm:px-8 py-12">
          <div className="bg-red-50 text-red-700 rounded-2xl border border-red-200 p-6 space-y-2">
            <h1 className="text-h3 font-bold">Terjadi error aplikasi</h1>
            <p className="text-sm">{this.state.error.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

