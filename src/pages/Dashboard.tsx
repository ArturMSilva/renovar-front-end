import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DonationPanel } from '../components/DonationPanel';
import { DonationRecords } from '../components/DonationRecords';
import { SupportArea } from '../components/SupportArea';
import { Sidebar } from '../components/Sidebar';
import { UserInfoHeader } from '../components/UserInfoHeader';
import { formatUserId } from '../utils/validation';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboarding-completed');
    if (!onboardingCompleted) {
      navigate('/introducao');
    }
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-emerald-50/30">
      <Sidebar
        userName={user?.name || 'Usuário'}
        userCode={user?.userCode || user?.id?.substring(0, 8).toUpperCase() || 'N/A'}
        onLogout={handleSignOut}
      />

      {/* Mobile Code Badge - Fixed Top Right */}
      <div className="lg:hidden fixed top-4 right-4 z-40 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-md text-right">
        <p className="text-xs text-gray-500 font-medium">Código Único</p>
        <p className="text-sm font-bold text-emerald-600">
          {formatUserId(user?.userCode || user?.id?.substring(0, 8).toUpperCase() || 'N/A')}
        </p>
      </div>

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UserInfoHeader
            userName={user?.name || 'Usuário'}
            userCode={user?.userCode || user?.id?.substring(0, 8).toUpperCase() || 'N/A'}
          />

          <DonationPanel />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <DonationRecords />
            </div>

            <div className="space-y-6">
              <SupportArea />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
