import { formatUserId } from '../utils/validation';

interface UserInfoHeaderProps {
  userName: string;
  userCode: string;
}

export const UserInfoHeader = ({ userName, userCode }: UserInfoHeaderProps) => {
  const firstName = userName.split(' ')[0];
  const formattedCode = formatUserId(userCode);

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {firstName}! 👋
          </h2>
          <p className="text-gray-600">Acompanhe seu impacto ambiental em tempo real</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Seu código</p>
            <p className="text-sm font-bold text-emerald-600">{formattedCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
