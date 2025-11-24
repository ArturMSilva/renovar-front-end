import { Recycle } from 'lucide-react';

export const DonationPanel = () => {
  const totalKg = 125.5;

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-xl shadow-emerald-500/20 mb-6">
      <div className="text-center text-white">
        <p className="text-xs font-medium text-emerald-100 mb-2 uppercase tracking-wide">Seu Impacto Ambiental</p>
        <div className="flex items-baseline justify-center gap-2">
          <Recycle className="text-white" size={40} strokeWidth={2.5} />
          <span className="text-5xl font-bold">{totalKg}</span>
          <span className="text-2xl font-semibold">kg</span>
        </div>
        <p className="text-emerald-50 mt-3 text-base">de material reciclado</p>
      </div>
    </div>
  );
};
