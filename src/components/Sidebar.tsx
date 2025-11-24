import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  userName: string;
  userCode: string;
  onLogout: () => void;
}

export const Sidebar = ({ userName, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/painel', label: 'Painel', icon: Home },
    { path: '/historico-doacoes', label: 'Doações', icon: Heart },
    { path: '/guia-reciclagem', label: 'Guia de Reciclagem', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-dvh bg-white border-r border-gray-200 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 flex flex-col
        `}
      >
        {/* User Info Header */}
        <div className="p-6 border-b border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 mt-0.5">Doador Ativo</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${
                    active
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={active ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group"
          >
            <LogOut size={20} className="text-red-500" />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};
