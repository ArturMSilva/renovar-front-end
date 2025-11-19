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
import { DonationHistory } from './pages/DonationHistory';
import { InformationPage } from './pages/InformationPage';
import { Onboarding } from './pages/Onboarding';
import { LoadingSpinner } from './components/LoadingSpinner';

function AppRoutes() {
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
      return <Navigate to="/selecionar-tipo-conta" />;
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
      return <Navigate to="/selecionar-tipo-conta" />;
    }

    return user && user.profileCompleted ? <Navigate to="/painel" /> : <>{children}</>;
  };


  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      
      <Route
        path="/cadastro"
        element={
          <PublicRoute>
            <QuickSignup />
          </PublicRoute>
        }
      />
      
      <Route
        path="/confirmacao-inicial"
        element={
          <PublicRoute>
            <InitialConfirmation />
          </PublicRoute>
        }
      />
      
      <Route
        path="/selecionar-tipo-conta"
        element={
          <PrivateRoute>
            <SelectAccountType />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/completar-residencial"
        element={
          <PrivateRoute>
            <CompleteResidential />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/completar-empresa"
        element={
          <PrivateRoute>
            <CompleteBusiness />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/confirmacao-final"
        element={
          <PrivateRoute>
            <FinalConfirmation />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/painel"
        element={
          <DashboardRoute>
            <Dashboard />
          </DashboardRoute>
        }
      />
      
      <Route
        path="/informacoes"
        element={
          <DashboardRoute>
            <InformationPage />
          </DashboardRoute>
        }
      />
      
      <Route
        path="/introducao"
        element={
          <DashboardRoute>
            <Onboarding />
          </DashboardRoute>
        }
      />
      
      <Route
        path="/historico-doacoes"
        element={
          <DashboardRoute>
            <DonationHistory />
          </DashboardRoute>
        }
      />
      
      <Route
        path="/historico"
        element={
          <DashboardRoute>
            <DonationHistory />
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
