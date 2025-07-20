import React, { useState } from 'react';
import { Plane, Plus, MapPin, Calendar, Users, Globe } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const companies = [
  { id: '1', name: 'COLINA Assurances', logo: '🏢', rating: 4.8, premium: '75,000' },
  { id: '2', name: 'ASKIA Assurances', logo: '🏛️', rating: 4.6, premium: '68,000' },
  { id: '3', name: 'ALLIANZ Niger', logo: '🔷', rating: 4.9, premium: '82,000' },
];

const destinations = [
  'France', 'Maroc', 'Sénégal', 'Côte d\'Ivoire', 'Burkina Faso', 'Mali', 'Ghana', 'Bénin', 'Togo', 'Autre'
];

const existingContracts = [
  {
    id: '1',
    destination: 'France',
    company: 'COLINA Assurances',
    policyNumber: 'VOYAGE-2024-001',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    premium: '75,000 XOF',
    status: 'active',
    travelers: 2
  }
];

export const TravelInsurance: React.FC = () => {
  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: '1',
    purpose: '',
    coverage: '',
    selectedCompany: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Travel insurance subscription:', formData);
    setShowNewSubscription(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Plane className="w-8 h-8 text-sky-500" />
            Assurance Voyage
          </h1>
          <p className="text-slate-600 mt-2">Voyagez en toute sérénité avec nos couvertures adaptées</p>
        </div>
        <Button
          onClick={() => setShowNewSubscription(true)}
          leftIcon={<Plus className="w-5 h-5" />}
          size="lg"
        >
          Nouvelle souscription
        </Button>
      </div>

      {/* Existing Contracts */}
      {existingContracts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Mes Contrats Voyage</h2>
          <div className="grid gap-6">
            {existingContracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Voyage vers {contract.destination}</h3>
                      <p className="text-sm text-slate-600 mt-1">{contract.company}</p>
                      <p className="text-sm text-slate-500">Police: {contract.policyNumber}</p>
                      <p className="text-sm text-slate-500">{contract.travelers} voyageur(s)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Départ</p>
                      <p className="font-medium">{new Date(contract.startDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Retour</p>
                      <p className="font-medium">{new Date(contract.endDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Prime</p>
                      <p className="font-medium text-sky-600">{contract.premium}</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Actif
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New Subscription Form */}
      {showNewSubscription && (
        <Card>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Nouvelle Assurance Voyage</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Détails du voyage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner une destination</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre de voyageurs</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => handleInputChange('travelers', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} voyageur{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <Input
                  type="date"
                  label="Date de départ"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  leftIcon={<Calendar className="w-5 h-5" />}
                  required
                />

                <Input
                  type="date"
                  label="Date de retour"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  leftIcon={<Calendar className="w-5 h-5" />}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Motif du voyage</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner le motif</option>
                    <option value="tourism">Tourisme</option>
                    <option value="business">Affaires</option>
                    <option value="medical">Médical</option>
                    <option value="education">Études</option>
                    <option value="family">Visite familiale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type de couverture</label>
                  <select
                    value={formData.coverage}
                    onChange={(e) => handleInputChange('coverage', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner la couverture</option>
                    <option value="basic">Basique (Médical + Rapatriement)</option>
                    <option value="standard">Standard (+ Bagages + Annulation)</option>
                    <option value="premium">Premium (Couverture complète)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Company Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Choisir une compagnie</h3>
              <div className="grid gap-4">
                {companies.map((company) => (
                  <label key={company.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="company"
                      value={company.id}
                      checked={formData.selectedCompany === company.id}
                      onChange={(e) => handleInputChange('selectedCompany', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`
                      p-4 border-2 rounded-xl transition-all duration-200
                      ${formData.selectedCompany === company.id 
                        ? 'border-sky-400 bg-sky-50' 
                        : 'border-slate-200 hover:border-sky-300'
                      }
                    `}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{company.logo}</div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{company.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-orange-600">★ {company.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-sky-600">{company.premium} XOF</p>
                          <p className="text-sm text-slate-500">par voyage</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewSubscription(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Souscrire maintenant
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};