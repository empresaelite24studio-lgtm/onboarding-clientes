import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="space-y-8 max-w-md">
            <h1 className="text-4xl font-playfair text-brand-gold">Ups, algo salió mal</h1>
            <p className="text-white/60 font-light leading-relaxed">
              La experiencia ha encontrado un error inesperado. Esto puede deberse a datos antiguos guardados en tu navegador.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded text-xs text-red-400 font-mono overflow-auto max-h-40">
              {this.state.error?.message}
            </div>
            <div className="flex flex-col gap-4">
               <button 
                onClick={() => window.location.reload()}
                className="primary-btn w-full"
               >
                Reintentar cargar
               </button>
               <button 
                onClick={this.handleReset}
                className="secondary-btn w-full"
               >
                Limpiar datos y Reiniciar sesión
               </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
