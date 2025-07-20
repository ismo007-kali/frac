import React, { useState } from 'react';
import { Car, Plus, FileText, Calendar, DollarSign, Building } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const companies = [
  { id: '1', name: 'COLINA Assurances', logo: '🏢', rating: 4.8, premium: '180,000' },
  { id: '2', name: 'ASKIA Assurances', logo: '🏛️', rating: 4.6, premium: '165,000' },
  { id: '3', name: 'ALLIANZ Niger', logo: '🔷', rating: 4.9, premium: '195,000' },
];

const existingContracts = [
  {
    id: '1',
    vehicle: 'Peugeot 308 - 2020',
    company: 'COLINA Assurances',
    policyNumber: 'AUTO-2024-001',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    premium: '180,000 XOF',
    status: 'active'
  },
  {
    id: '2',
    vehicle: 'Toyota Corolla - 2019',
    company: 'ASKIA Assurances', 
    policyNumber: 'AUTO-2023-012',
    startDate: '2023-06-10',
    endDate: '2024-06-10',
    premium: '165,000 XOF',
    status: 'expiring'
  }
];

export const AutoInsurance: React.FC = () => {
  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    usage: '',
    energy: '',
    licensePlate: '',
    selectedCompany: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Auto insurance subscription:', formData);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Car className="w-8 h-8 text-sky-500" />
            Assurance Automobile
          </h1>
          <p className="text-slate-600 mt-2">Protégez votre véhicule avec nos offres adaptées</p>
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
          <h2 className="text-xl font-bold text-slate-800 mb-6">Mes Contrats Auto</h2>
          <div className="grid gap-6">
            {existingContracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{contract.vehicle}</h3>
                      <p className="text-sm text-slate-600 mt-1">{contract.company}</p>
                      <p className="text-sm text-slate-500">Police: {contract.policyNumber}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Début</p>
                      <p className="font-medium">{new Date(contract.startDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Fin</p>
                      <p className="font-medium">{new Date(contract.endDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Prime</p>
                      <p className="font-medium text-sky-600">{contract.premium}</p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        contract.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {contract.status === 'active' ? 'Actif' : 'Expire bientôt'}
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
          <h2 className="text-xl font-bold text-slate-800 mb-6">Nouvelle Souscription Auto</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Informations du véhicule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Marque</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner une marque</option>
                    <option value="peugeot">Peugeot</option>
                    <option value="toyota">Toyota</option>
                    <option value="nissan">Nissan</option>
                    <option value="honda">Honda</option>
                    <option value="hyundai">Hyundai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Modèle</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    placeholder="Ex: 308, Corolla..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Année</label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner l'année</option>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Usage</label>
                  <select
                    value={formData.usage}
                    onChange={(e) => handleInputChange('usage', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner l'usage</option>
                    <option value="personal">Personnel</option>
                    <option value="commercial">Commercial</option>
                    <option value="taxi">Taxi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Énergie</label>
                  <select
                    value={formData.energy}
                    onChange={(e) => handleInputChange('energy', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner l'énergie</option>
                    <option value="gasoline">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Électrique</option>
                    <option value="hybrid">Hybride</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Plaque d'immatriculation</label>
                  <input
                    type="text"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    placeholder="Ex: NE-123-AB"
                    required
                  />
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
                              <span className="text-sm text-slate-500">• Prime: {company.premium} XOF</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-sky-600">{company.premium} XOF</p>
                          <p className="text-sm text-slate-500">par an</p>
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

      {/* Insurance Companies */}
      {!showNewSubscription && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Compagnies Partenaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{company.logo}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{company.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-orange-600">★ {company.rating}</span>
                </div>
                <p className="text-lg font-bold text-sky-600 mb-4">{company.premium} XOF</p>
                <Button variant="outline" fullWidth size="sm">
                  En savoir plus
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};