import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { QuickSignup } from './pages/QuickSignup';
import { InitialConfirmation } from './pages/InitialConfirmation';
import { SelectAccountType } from './pages/SelectAccountType';
import { CompleteResidential } from './pages/CompleteResidential';
import { CompleteBusiness } from './pages/CompleteBusiness';
import { FinalConfirmation } from './pages/FinalConfirmation';
import { Dashboard } from './pages/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/" />;
};

const DashboardRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!user.profileCompleted) {
    return <Navigate to="/select-account-type" />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (user && !user.profileCompleted) {
    return <Navigate to="/select-account-type" />;
  }

  return user && user.profileCompleted ? <Navigate to="/dashboard" /> : <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Login principal */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      
      {/* Cadastro rápido */}
      <Route
        path="/quick-signup"
        element={
          <PublicRoute>
            <QuickSignup />
          </PublicRoute>
        }
      />
      
      {/* Confirmação inicial após cadastro rápido */}
      <Route
        path="/initial-confirmation"
        element={
          <PublicRoute>
            <InitialConfirmation />
          </PublicRoute>
        }
      />
      
      {/* Seleção de tipo de conta (após login) */}
      <Route
        path="/select-account-type"
        element={
          <PrivateRoute>
            <SelectAccountType />
          </PrivateRoute>
        }
      />
      
      {/* Conclusão de cadastro - Residencial */}
      <Route
        path="/complete-residential"
        element={
          <PrivateRoute>
            <CompleteResidential />
          </PrivateRoute>
        }
      />
      
      {/* Conclusão de cadastro - Empresa */}
      <Route
        path="/complete-business"
        element={
          <PrivateRoute>
            <CompleteBusiness />
          </PrivateRoute>
        }
      />
      
      {/* Confirmação final com ID */}
      <Route
        path="/final-confirmation"
        element={
          <PrivateRoute>
            <FinalConfirmation />
          </PrivateRoute>
        }
      />
      
      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <DashboardRoute>
            <Dashboard />
          </DashboardRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
