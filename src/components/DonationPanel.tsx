export const DonationPanel = () => {
  const totalKg = 125.5;

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-2xl shadow-emerald-500/30 mb-8">
      <div className="text-center text-white">
        <p className="text-sm font-medium text-emerald-100 mb-3 uppercase tracking-wide">Seu Impacto Ambiental</p>
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-7xl font-bold">{totalKg}</span>
          <span className="text-3xl font-semibold">kg</span>
        </div>
        <p className="text-emerald-50 mt-4 text-lg">de material reciclado</p>
      </div>
    </div>
  );
};
