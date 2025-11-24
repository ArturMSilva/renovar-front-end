import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  Recycle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Sidebar } from "../components/Sidebar";
import imagemLatinhas from "../assets/images/materials/latinhas-de-aluminio.jpeg";
import imagemPapelao from "../assets/images/materials/papelao.jpeg";
import imagemPapel from "../assets/images/materials/papeis.jpeg";
import imagemPlasticos from "../assets/images/materials/plasticos.jpeg";
import imagemFerro from "../assets/images/materials/sucata-de-ferro.jpeg";
import imagemEletronicos from "../assets/images/materials/eletronicos.jpeg";
import imagemEletrodomesticos from "../assets/images/materials/eletronicos.jpeg";

interface MaterialInfo {
  id: string;
  title: string;
  image: string;
  recyclable: string[];
  notRecyclable: string[];
  impact: string;
}

const materials: MaterialInfo[] = [
  {
    id: "latinhas",
    title: "Latinhas de Alumínio",
    image: imagemLatinhas,
    recyclable: [
      "Latas de cerveja",
      "Latas de refrigerante",
      "Latas de energético",
      "Latas de sucos",
      "Latas de chás gelados",
      "Latas de drinks prontos",
    ],
    notRecyclable: [
      "Cheias de líquido",
      "Com resíduos orgânicos",
      "Misturadas com lixo contaminante",
      "Basta esvaziar e pode ir para reciclagem normalmente",
    ],
    impact:
      "Reciclável INFINITAMENTE. O alumínio não perde suas propriedades. Uma lata reciclada vira outra lata em cerca de 30 dias. O Brasil é líder mundial com 97% de reciclagem anual",
  },
  {
    id: "papelao",
    title: "Papelão",
    image: imagemPapelao,
    recyclable: [
      "Papelão ondulado (caixas de embalagens de mercadorias)",
      "Papelão duplex (caixas de alimentos)",
      "Caixas de transporte diversas",
    ],
    notRecyclable: [
      "Papelão sujo de óleo, graxa, tinta, gesso",
      "Papelão com resíduos orgânicos",
      "Papelão plastificado ou parafinado",
      "Caixa de Leite Tetra Pack ou Sucos",
      "Caxeta de Ovo",
      "Bandeja de Frutas de Maçã e Outros",
    ],
    impact:
      "Pode ser reciclado de 5 a 7 vezes. As fibras vão ficando curtas e fracas com cada reciclagem. Tempo de decomposição: 3 a 6 meses",
  },
  {
    id: "papel",
    title: "Livros, Cadernos, Revistas e Folhas",
    image: imagemPapel,
    recyclable: [
      "Livros",
      "Cadernos",
      "Revistas",
      "Folhas soltas",
      "Apostilas",
      "Papel couchê (revistas brilhantes)",
      "Papel offset",
      "Papel jornal",
    ],
    notRecyclable: [
      "Restos de alimentos",
      "Gordura ou óleo",
      "Cola quente em excesso",
      "Papel-carbono",
      "Papéis metalizados",
    ],
    impact:
      "Pode ser reciclado de 5 a 7 vezes. Cada tonelada de papel reciclado evita o corte de 20 a 30 árvores. Reduz desmatamento e economiza água e energia",
  },
  {
    id: "plasticos",
    title: "Plásticos",
    image: imagemPlasticos,
    recyclable: [
      "Garrafas PET (Refrigerantes, Energético, Água, Suco)",
      "Embalagens de produtos de limpeza (Amaciante, Detergente, Água Sanitária, Álcool)",
      "Embalagens de Produtos de Higiene (Shampoo, Condicionador, Sabonete Líquido)",
      "Sacolas plásticas (Sacolas de Supermercado, Embalagem de Arroz, Feijão, Açucar)",
      "Embalagens de alimentos (Requeijão, Água de Côco, Iogurte, Pote de Sorvete)",
      "Plástico Duro (Cadeiras, Mesas, Forro de PVC, Balde, Bacia, Cestos de Lixos)",
    ],
    notRecyclable: [
      "Isopor",
      "Embalagem de Quentinha e Similares",
      "Embalagens metalizadas (Salgadinho, Bolachas, Biscoitos, Leite em Pó)",
      "Escovas de dente (mistura de materiais)",
    ],
    impact:
      "Até 10 vezes reciclável. Tempo de decomposição: 400 a 600 anos. Um dos materiais mais persistentes no meio ambiente",
  },
  {
    id: "sucata-ferro",
    title: "Sucata de Ferro",
    image: imagemFerro,
    recyclable: [
      "Ferro e aço comuns",
      "Barras e vergalhões",
      "Peças de construção civil",
      "Tubos e canos antigos",
      "Ferragens diversas",
      "Chapas metálicas",
      "Sucatas de máquinas e equipamentos",
      "Engrenagens",
      "Parafusos, porcas e suportes",
      "Peças de ferramentas",
      "Estruturas oxidadas",
    ],
    notRecyclable: [
      "Todos os tipos de ferro podem ser reciclados sem exceção",
    ],
    impact:
      "Reciclável QUASE INFINITAMENTE. O ferro não perde suas propriedades. Economiza até 74% de energia. Tempo de decomposição: 100 a 500 anos",
  },
  {
    id: "eletronicos",
    title: "Eletrônicos (E-lixo)",
    image: imagemEletronicos,
    recyclable: [
      "Celulares",
      "Tablets",
      "Notebooks e computadores",
      "TVs",
      "Impressoras",
      "Teclados, mouses",
      "Monitores",
      "Cabos e fios elétricos",
      "DVD players, modens, roteadores",
      "Baterias e pilhas (em coleta especial)",
    ],
    notRecyclable: [
      "Nunca colocar na coleta comum — precisam de ponto de descarte específico",
    ],
    impact:
      "Contêm metais preciosos e materiais tóxicos. Necessitam descarte especializado para reciclagem adequada",
  },
  {
    id: "eletrodomesticos",
    title: "Eletrodomésticos",
    image: imagemEletrodomesticos,
    recyclable: [
      "Micro-ondas",
      "Geladeiras",
      "Fogões",
      "Ventiladores",
      "Liquidificadores",
      "Ferros elétricos",
      "Batedeiras",
      "Máquinas de lavar",
      "Torradeiras",
      "Ar-condicionado",
    ],
    notRecyclable: [
      "Necessitam de descarte em pontos especializados para remoção de gases e componentes perigosos",
    ],
    impact:
      "Contêm metais, plásticos e componentes eletrônicos valiosos. Reciclagem adequada recupera materiais e evita contaminação",
  },
];

export const GuiaReciclagem = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMaterial = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleRevisarOnboarding = () => {
    localStorage.removeItem("onboarding-completed");
    navigate("/introducao");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-emerald-50/30">
      <Sidebar
        userName={user?.name || "Usuário"}
        userCode={
          user?.userCode || user?.id?.substring(0, 8).toUpperCase() || "N/A"
        }
        onLogout={handleSignOut}
      />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Guia de Reciclagem
            </h1>
            <p className="text-gray-600">
              Aprenda sobre materiais recicláveis e descubra como fazer a
              diferença
            </p>
          </div>

          {/* Revisar Onboarding */}
          <div className="mb-8">
            <button
              onClick={handleRevisarOnboarding}
              className="w-full bg-white border-2 border-emerald-500 rounded-xl p-4 hover:bg-emerald-50 transition-colors duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <BookOpen className="text-emerald-600" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">
                    Revisar Introdução
                  </h3>
                  <p className="text-sm text-gray-600">
                    Relembre como funciona o Renovar
                  </p>
                </div>
              </div>
              <ChevronRight
                className="text-emerald-600 group-hover:translate-x-1 transition-transform"
                size={24}
              />
            </button>
          </div>

          {/* Materiais Recicláveis - Acordeão */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Materiais Recicláveis
            </h2>

            {materials.map((material) => {
              const isExpanded = expandedId === material.id;

              return (
                <div
                  key={material.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Header do Acordeão */}
                  <button
                    onClick={() => toggleMaterial(material.id)}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-left">
                      {material.title}
                    </span>
                    <ChevronRight
                      className={`text-gray-600 transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                      size={20}
                    />
                  </button>

                  {/* Conteúdo Expandido */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 bg-gray-50/50 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                      {/* Imagem do Material */}
                      <div className="mb-4 flex justify-center">
                        <img
                          src={material.image}
                          alt={material.title}
                          loading="lazy"
                          className="w-full max-w-[200px] aspect-square object-cover rounded-xl shadow-md"
                        />
                      </div>

                      {/* O que é reciclável */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                          <CheckCircle2
                            className="text-emerald-600"
                            size={18}
                          />
                          <span>O que é reciclável</span>
                        </h4>
                        <ul className="space-y-1">
                          {material.recyclable.map((item, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 pl-4"
                            >
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* O que NÃO é reciclável */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                          <XCircle className="text-red-600" size={18} />
                          <span>O que não é reciclável</span>
                        </h4>
                        <ul className="space-y-1">
                          {material.notRecyclable.map((item, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 pl-4"
                            >
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impacto */}
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                        <p className="text-sm font-medium text-emerald-800 flex items-start gap-2">
                          <Recycle
                            className="text-emerald-600 flex-shrink-0"
                            size={18}
                          />
                          <span>{material.impact}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
