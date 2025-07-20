import React from 'react';
import { Car, Plane, Building, GraduationCap, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';

const stats = [
  { 
    id: 'total-contracts', 
    label: 'Contrats Actifs', 
    value: '4', 
    icon: CheckCircle, 
    color: 'text-green-600 bg-green-100',
    trend: '+2 ce mois'
  },
  { 
    id: 'pending-claims', 
    label: 'Sinistres en cours', 
    value: '1', 
    icon: Clock, 
    color: 'text-orange-600 bg-orange-100',
    trend: 'En traitement'
  },
  { 
    id: 'total-premium', 
    label: 'Prime totale', 
    value: '450,000', 
    icon: TrendingUp, 
    color: 'text-sky-600 bg-sky-100',
    currency: 'XOF'
  },
  { 
    id: 'expiring-soon', 
    label: 'Expiration proche', 
    value: '2', 
    icon: AlertCircle, 
    color: 'text-red-600 bg-red-100',
    trend: 'Dans 30 jours'
  },
];

const insuranceTypes = [
  { 
    id: 'auto', 
    label: 'Assurance Automobile', 
    icon: Car, 
    color: 'from-blue-500 to-blue-600',
    contracts: 2,
    premium: '180,000 XOF'
  },
  { 
    id: 'travel', 
    label: 'Assurance Voyage', 
    icon: Plane, 
    color: 'from-green-500 to-green-600',
    contracts: 1,
    premium: '75,000 XOF'
  },
  { 
    id: 'housing', 
    label: 'Assurance Habitation', 
    icon: Building, 
    color: 'from-purple-500 to-purple-600',
    contracts: 1,
    premium: '120,000 XOF'
  },
  { 
    id: 'education', 
    label: 'Assurance Éducation', 
    icon: GraduationCap, 
    color: 'from-orange-500 to-orange-600',
    contracts: 0,
    premium: '0 XOF'
  },
];

const recentActivities = [
  {
    id: '1',
    type: 'subscription',
    title: 'Souscription Auto confirmée',
    description: 'Police #AUTO-2024-001 - Peugeot 308',
    date: '2024-01-15',
    status: 'success'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Paiement effectué',
    description: '180,000 XOF via Orange Money',
    date: '2024-01-14',
    status: 'success'
  },
  {
    id: '3',
    type: 'claim',
    title: 'Sinistre déclaré',
    description: 'Accident de circulation - En cours de traitement',
    date: '2024-01-10',
    status: 'pending'
  },
];

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-2xl font-bold text-slate-800">
                      {stat.value}
                      {stat.currency && <span className="text-sm text-slate-500 ml-1">{stat.currency}</span>}
                    </p>
                  </div>
                  {stat.trend && (
                    <p className="text-xs text-slate-500 mt-1">{stat.trend}</p>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Insurance Types Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Mes Assurances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insuranceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => onNavigate(type.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{type.label}</h3>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>{type.contracts} contrat{type.contracts > 1 ? 's' : ''}</p>
                    <p className="font-medium text-sky-600">{type.premium}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Activités Récentes</h2>
        <Card>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${activity.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}
                `}>
                  {activity.status === 'success' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{activity.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-slate-500 mt-2">{new Date(activity.date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};