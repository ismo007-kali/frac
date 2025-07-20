import React, { useState } from 'react';
import { AlertTriangle, Plus, MapPin, Calendar, Camera, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const existingIncidents = [
  {
    id: '1',
    type: 'Accident de circulation',
    location: 'Rond-point Kennedy, Niamey',
    date: '2024-01-15',
    description: 'Collision avec un autre véhicule au rond-point Kennedy. Dégâts matériels importants sur l\'avant du véhicule.',
    status: 'investigating',
    estimatedAmount: 850000,
    policyNumber: 'AUTO-2024-001',
    createdAt: '2024-01-15T14:30:00'
  },
  {
    id: '2',
    type: 'Vol de bagages',
    location: 'Aéroport Diori Hamani',
    date: '2024-01-08',
    description: 'Vol de bagages lors du transit à l\'aéroport. Valise contenant effets personnels et documents.',
    status: 'approved',
    estimatedAmount: 320000,
    policyNumber: 'VOYAGE-2024-001',
    createdAt: '2024-01-08T09:15:00'
  },
  {
    id: '3',
    type: 'Dégât des eaux',
    location: 'Domicile - Quartier Plateau',
    date: '2024-01-20',
    description: 'Fuite d\'eau importante causée par la rupture d\'une canalisation. Dégâts sur le mobilier et l\'électroménager.',
    status: 'declared',
    estimatedAmount: 1200000,
    policyNumber: 'HAB-2024-001',
    createdAt: '2024-01-20T16:45:00'
  }
];

const incidentTypes = [
  'Accident de circulation',
  'Vol/Cambriolage',
  'Incendie',
  'Dégât des eaux',
  'Bris de glace',
  'Catastrophe naturelle',
  'Vol de bagages',
  'Annulation de voyage',
  'Autre'
];

export const IncidentManagement: React.FC = () => {
  const [showNewIncident, setShowNewIncident] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    date: '',
    time: '',
    circumstances: '',
    description: '',
    estimatedAmount: '',
    witnesses: '',
    policeReport: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New incident:', formData);
    setShowNewIncident(false);
    setFormData({
      type: '',
      location: '',
      date: '',
      time: '',
      circumstances: '',
      description: '',
      estimatedAmount: '',
      witnesses: '',
      policeReport: false
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'declared':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'investigating':
        return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-slate-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'declared':
        return 'Déclaré';
      case 'investigating':
        return 'En enquête';
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'declared':
        return 'bg-orange-100 text-orange-800';
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-sky-500" />
            Gestion des Sinistres
          </h1>
          <p className="text-slate-600 mt-2">Déclarez et suivez vos sinistres en temps réel</p>
        </div>
        <Button
          onClick={() => setShowNewIncident(true)}
          leftIcon={<Plus className="w-5 h-5" />}
          size="lg"
        >
          Déclarer un sinistre
        </Button>
      </div>

      {/* New Incident Form */}
      {showNewIncident && (
        <Card>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Déclaration de Sinistre</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Informations générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type de sinistre</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner le type</option>
                    {incidentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <Input
                  type="text"
                  label="Lieu du sinistre"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  leftIcon={<MapPin className="w-5 h-5" />}
                  placeholder="Adresse précise ou lieu-dit"
                  required
                />

                <Input
                  type="date"
                  label="Date du sinistre"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  leftIcon={<Calendar className="w-5 h-5" />}
                  required
                />

                <Input
                  type="time"
                  label="Heure approximative"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />

                <div className="md:col-span-2">
                  <Input
                    type="number"
                    label="Montant estimé des dégâts (XOF)"
                    value={formData.estimatedAmount}
                    onChange={(e) => handleInputChange('estimatedAmount', e.target.value)}
                    placeholder="Ex: 500000"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Détails du sinistre</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Circonstances</label>
                  <textarea
                    value={formData.circumstances}
                    onChange={(e) => handleInputChange('circumstances', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none resize-none"
                    placeholder="Comment le sinistre s'est-il produit ?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description détaillée</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none resize-none"
                    placeholder="Décrivez précisément les dégâts et les circonstances..."
                    required
                  />
                </div>

                <Input
                  type="text"
                  label="Témoins (optionnel)"
                  value={formData.witnesses}
                  onChange={(e) => handleInputChange('witnesses', e.target.value)}
                  placeholder="Noms et contacts des témoins"
                />

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="policeReport"
                    checked={formData.policeReport}
                    onChange={(e) => handleInputChange('policeReport', e.target.checked)}
                    className="w-5 h-5 text-sky-600 border-2 border-slate-300 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="policeReport" className="text-sm font-medium text-slate-700">
                    Un rapport de police a été établi
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Camera className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Documents et photos</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Vous pourrez joindre des photos, factures et documents justificatifs après avoir créé votre déclaration.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewIncident(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Déclarer le sinistre
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Existing Incidents */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Mes Sinistres</h2>
        <div className="space-y-4">
          {existingIncidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    {getStatusIcon(incident.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{incident.type}</h3>
                        <p className="text-sm text-slate-600">{incident.location}</p>
                        <p className="text-sm text-slate-500">Police: {incident.policyNumber}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {getStatusLabel(incident.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{incident.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Sinistre du {new Date(incident.date).toLocaleDateString('fr-FR')}</span>
                      <span>Déclaré le {new Date(incident.createdAt).toLocaleDateString('fr-FR')}</span>
                      {incident.estimatedAmount && (
                        <span className="font-medium text-sky-600">
                          Montant: {incident.estimatedAmount.toLocaleString()} XOF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                    Documents
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-2">Urgence Sinistre</h3>
            <p className="text-red-700 mb-4">
              En cas de sinistre grave, contactez immédiatement notre service d'urgence 24h/24.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm">
                Appeler l'urgence
              </Button>
              <Button variant="ghost" size="sm">
                +227 20 XX XX XX
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};