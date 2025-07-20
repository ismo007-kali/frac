import React, { useState } from 'react';
import { CreditCard, Download, Filter, Search, Calendar } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const paymentHistory = [
  {
    id: '1',
    subscriptionId: 'AUTO-2024-001',
    amount: 180000,
    currency: 'XOF',
    method: 'orange',
    methodName: 'Orange Money',
    status: 'completed',
    transactionId: 'TXN-20240115-001',
    date: '2024-01-15T10:30:00',
    description: 'Prime assurance automobile - Peugeot 308'
  },
  {
    id: '2',
    subscriptionId: 'VOYAGE-2024-001',
    amount: 75000,
    currency: 'XOF',
    method: 'airtel',
    methodName: 'Airtel Money',
    status: 'completed',
    transactionId: 'TXN-20240110-002',
    date: '2024-01-10T14:20:00',
    description: 'Assurance voyage - France'
  },
  {
    id: '3',
    subscriptionId: 'HAB-2024-001',
    amount: 120000,
    currency: 'XOF',
    method: 'flooz',
    methodName: 'Flooz',
    status: 'completed',
    transactionId: 'TXN-20240105-003',
    date: '2024-01-05T16:45:00',
    description: 'Prime assurance habitation'
  },
  {
    id: '4',
    subscriptionId: 'AUTO-2024-002',
    amount: 165000,
    currency: 'XOF',
    method: 'mynita',
    methodName: 'Mynita Amanata',
    status: 'pending',
    transactionId: 'TXN-20240122-004',
    date: '2024-01-22T09:15:00',
    description: 'Prime assurance automobile - Toyota Corolla'
  },
  {
    id: '5',
    subscriptionId: 'EDU-2024-001',
    amount: 95000,
    currency: 'XOF',
    method: 'orange',
    methodName: 'Orange Money',
    status: 'failed',
    transactionId: 'TXN-20240120-005',
    date: '2024-01-20T11:30:00',
    description: 'Assurance éducation - Aminata IBRAHIM'
  }
];

const paymentMethods = [
  { id: 'all', name: 'Tous les moyens', icon: '💳' },
  { id: 'orange', name: 'Orange Money', icon: '🍊' },
  { id: 'airtel', name: 'Airtel Money', icon: '📱' },
  { id: 'flooz', name: 'Flooz', icon: '💳' },
  { id: 'mynita', name: 'Mynita Amanata', icon: '🏦' }
];

export const PaymentHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      default:
        return status;
    }
  };

  const getMethodIcon = (method: string) => {
    const methodData = paymentMethods.find(m => m.id === method);
    return methodData?.icon || '💳';
  };

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'all' || payment.method === selectedMethod;
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const totalAmount = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Description', 'Montant', 'Méthode', 'Statut', 'Transaction ID'],
      ...filteredPayments.map(payment => [
        new Date(payment.date).toLocaleDateString('fr-FR'),
        payment.description,
        `${payment.amount} ${payment.currency}`,
        payment.methodName,
        getStatusLabel(payment.status),
        payment.transactionId
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historique-paiements.csv';
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-sky-500" />
            Historique des Paiements
          </h1>
          <p className="text-slate-600 mt-2">Consultez tous vos paiements et transactions</p>
        </div>
        <Button
          onClick={exportToCSV}
          leftIcon={<Download className="w-5 h-5" />}
          variant="outline"
          size="lg"
        >
          Exporter CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600">Total payé</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {totalAmount.toLocaleString()} XOF
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600">Transactions</p>
            <p className="text-2xl font-bold text-sky-600 mt-1">
              {filteredPayments.length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600">En attente</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {filteredPayments.filter(p => p.status === 'pending').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Filtres</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />

          <div>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
            >
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.icon} {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Complété</option>
              <option value="pending">En attente</option>
              <option value="failed">Échoué</option>
            </select>
          </div>

          <Button variant="outline" leftIcon={<Filter className="w-5 h-5" />}>
            Plus de filtres
          </Button>
        </div>
      </Card>

      {/* Payment History */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Transactions</h2>
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-2xl">
                    {getMethodIcon(payment.method)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{payment.description}</h3>
                        <p className="text-sm text-slate-600">{payment.methodName}</p>
                        <p className="text-sm text-slate-500">ID: {payment.transactionId}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{new Date(payment.date).toLocaleDateString('fr-FR')} à {new Date(payment.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>Police: {payment.subscriptionId}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-800">
                    {payment.amount.toLocaleString()} {payment.currency}
                  </p>
                  <Button variant="ghost" size="sm">
                    Voir détails
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPayments.length === 0 && (
          <Card className="text-center py-12">
            <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Aucune transaction trouvée</h3>
            <p className="text-slate-600">Modifiez vos filtres pour voir plus de résultats</p>
          </Card>
        )}
      </div>
    </div>
  );
};