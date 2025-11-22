import { Recycle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DonationRecord {
  id: number;
  date: string;
  quantity: number;
}

const MOCK_RECORDS: DonationRecord[] = [
  {
    id: 1,
    date: '2024-11-17',
    quantity: 3.5,
  },
  {
    id: 2,
    date: '2024-11-15',
    quantity: 12.0,
  },
  {
    id: 3,
    date: '2024-11-10',
    quantity: 8.5,
  },
  {
    id: 4,
    date: '2024-11-05',
    quantity: 20.0,
  },
  {
    id: 5,
    date: '2024-11-01',
    quantity: 10.0,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  }).replace('.', '');
};

export const DonationRecords = () => {
  const navigate = useNavigate();
  const lastThree = MOCK_RECORDS.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Últimas Doações</h3>
        <button 
          onClick={() => navigate('/historico')}
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Ver todas
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-0">
        {lastThree.map((record, index) => (
          <div key={record.id}>
            <div className="flex items-center gap-4 py-4">
              <div className="flex-shrink-0 w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                <Recycle size={20} className="text-emerald-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Doação registrada</p>
                <p className="text-xs text-gray-500 mt-0.5">Peso registrado</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-600">+ {record.quantity} kg</p>
                <p className="text-xs text-gray-500 mt-0.5">{formatDate(record.date)}</p>
              </div>
            </div>
            
            {index < lastThree.length - 1 && (
              <div className="border-t border-gray-100" />
            )}
          </div>
        ))}
      </div>

      {MOCK_RECORDS.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Recycle size={32} className="text-emerald-600" />
          </div>
          <p className="text-gray-600 font-medium">Nenhuma doação registrada</p>
          <p className="text-sm text-gray-500 mt-1">Suas doações aparecerão aqui</p>
        </div>
      )}
    </div>
  );
};
