import { Leaf, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DonationRecord {
  id: number;
  date: string;
  quantity: number;
}

const MOCK_RECORDS: DonationRecord[] = [
  { id: 1, date: '2024-11-17', quantity: 3.5 },
  { id: 2, date: '2024-11-15', quantity: 12.0 },
  { id: 3, date: '2024-11-10', quantity: 8.5 },
  { id: 4, date: '2024-11-05', quantity: 20.0 },
  { id: 5, date: '2024-11-01', quantity: 10.0 },
];

const formatDateFull = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const groupByDate = (records: DonationRecord[]) => {
  const groups: { [key: string]: DonationRecord[] } = {};
  
  records.forEach(record => {
    const dateKey = record.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(record);
  });
  
  return groups;
};

export const DonationHistory = () => {
  const navigate = useNavigate();
  const groupedRecords = groupByDate(MOCK_RECORDS);
  const dates = Object.keys(groupedRecords).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Voltar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Histórico de Doações</h1>

        <div className="bg-white rounded-3xl overflow-hidden">
          {dates.map((date, groupIndex) => (
            <div key={date}>
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {formatDateFull(date)}
                </p>
              </div>

              <div>
                {groupedRecords[date].map((record, index) => (
                  <div key={record.id}>
                    <div className="flex items-center gap-4 px-6 py-4">
                      <div className="flex-shrink-0 w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                        <Leaf size={20} className="text-gray-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Doação registrada</p>
                        <p className="text-xs text-gray-500 mt-0.5">Peso registrado</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-600">+ {record.quantity} kg</p>
                      </div>
                    </div>
                    
                    {index < groupedRecords[date].length - 1 && (
                      <div className="mx-6 border-t border-gray-100" />
                    )}
                  </div>
                ))}
              </div>

              {groupIndex < dates.length - 1 && (
                <div className="h-2 bg-gray-50" />
              )}
            </div>
          ))}
        </div>

        {MOCK_RECORDS.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Nenhuma doação registrada</p>
            <p className="text-sm text-gray-500 mt-1">Suas doações aparecerão aqui</p>
          </div>
        )}
      </main>
    </div>
  );
};
