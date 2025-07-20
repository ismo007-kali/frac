import React from 'react';
import { Home, Car, Plane, Building, GraduationCap, AlertTriangle, MessageSquare, CreditCard, FileText, BarChart } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'auto', label: 'Assurance Auto', icon: Car },
  { id: 'travel', label: 'Assurance Voyage', icon: Plane },
  { id: 'housing', label: 'Assurance Habitation', icon: Building },
  { id: 'education', label: 'Assurance Éducation', icon: GraduationCap },
  { id: 'incidents', label: 'Sinistres', icon: AlertTriangle },
  { id: 'claims', label: 'Plaintes', icon: MessageSquare },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'reports', label: 'Rapports', icon: BarChart },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, isOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => onSectionChange(activeSection)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Menu Principal</h2>
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSectionChange(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-sky-50 to-sky-100 text-sky-700 border border-sky-200' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-slate-200">
            <div className="bg-gradient-to-r from-sky-50 to-sky-100 rounded-xl p-4 border border-sky-200">
              <h3 className="font-semibold text-sky-800 mb-2">Assistance 24/7</h3>
              <p className="text-sm text-sky-600 mb-3">Besoin d'aide ? Contactez notre équipe</p>
              <button className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Contacter
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};