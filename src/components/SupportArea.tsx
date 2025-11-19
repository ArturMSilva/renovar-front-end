import { MessageCircle, HelpCircle } from 'lucide-react';

export const SupportArea = () => {
  const whatsappNumber = '558999734340';
  const whatsappMessage = encodeURIComponent('Olá, Renovar! Preciso de suporte. Poderiam me ajudar, por favor?');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <HelpCircle size={24} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Precisa de Ajuda?</h3>
          <p className="text-xs text-gray-600">Estamos aqui para você</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-6">
        Nossa equipe está pronta para responder suas dúvidas sobre doações, coletas e muito mais.
      </p>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 mb-3"
      >
        <MessageCircle size={20} />
        <span>Falar no WhatsApp</span>
      </a>
    </div>
  );
};
