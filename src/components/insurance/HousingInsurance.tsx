import React, { useState } from 'react';
import { Building, Plus, Home, MapPin, DollarSign } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const companies = [
  { id: '1', name: 'COLINA Assurances', logo: '🏢', rating: 4.8, premium: '120,000' },
  { id: '2', name: 'ASKIA Assurances', logo: '🏛️', rating: 4.6, premium: '110,000' },
  { id: '3', name: 'ALLIANZ Niger', logo: '🔷', rating: 4.9, premium: '135,000' },
];

const propertyTypes = [
  'Appartement', 'Maison individuelle', 'Villa', 'Studio', 'Duplex', 'Commerce', 'Bureau'
];

const existingContracts = [
  {
    id: '1',
    property: 'Appartement 3 pièces - Niamey',
    company: 'COLINA Assurances',
    policyNumber: 'HAB-2024-001',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    premium: '120,000 XOF',
    status: 'active',
    value: '15,000,000'
  }
];

export const HousingInsurance: React.FC = () => {
  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    city: '',
    surface: '',
    rooms: '',
    constructionYear: '',
    propertyValue: '',
    coverage: '',
    selectedCompany: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Housing insurance subscription:', formData);
    setShowNewSubscription(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Building className="w-8 h-8 text-sky-500" />
            Assurance Habitation
          </h1>
          <p className="text-slate-600 mt-2">Protégez votre logement et vos biens personnels</p>
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
          <h2 className="text-xl font-bold text-slate-800 mb-6">Mes Contrats Habitation</h2>
          <div className="grid gap-6">
            {existingContracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{contract.property}</h3>
                      <p className="text-sm text-slate-600 mt-1">{contract.company}</p>
                      <p className="text-sm text-slate-500">Police: {contract.policyNumber}</p>
                      <p className="text-sm text-slate-500">Valeur: {parseInt(contract.value).toLocaleString()} XOF</p>
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
          <h2 className="text-xl font-bold text-slate-800 mb-6">Nouvelle Assurance Habitation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Informations du logement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type de bien</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner le type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <Input
                  type="text"
                  label="Ville"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  leftIcon={<MapPin className="w-5 h-5" />}
                  placeholder="Ex: Niamey, Maradi..."
                  required
                />

                <div className="md:col-span-2">
                  <Input
                    type="text"
                    label="Adresse complète"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    leftIcon={<Home className="w-5 h-5" />}
                    placeholder="Numéro, rue, quartier..."
                    required
                  />
                </div>

                <Input
                  type="number"
                  label="Surface (m²)"
                  value={formData.surface}
                  onChange={(e) => handleInputChange('surface', e.target.value)}
                  placeholder="Ex: 80"
                  required
                />

                <Input
                  type="number"
                  label="Nombre de pièces"
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', e.target.value)}
                  placeholder="Ex: 3"
                  required
                />

                <Input
                  type="number"
                  label="Année de construction"
                  value={formData.constructionYear}
                  onChange={(e) => handleInputChange('constructionYear', e.target.value)}
                  placeholder="Ex: 2020"
                  required
                />

                <Input
                  type="number"
                  label="Valeur du bien (XOF)"
                  value={formData.propertyValue}
                  onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                  leftIcon={<DollarSign className="w-5 h-5" />}
                  placeholder="Ex: 15000000"
                  required
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type de couverture</label>
                  <select
                    value={formData.coverage}
                    onChange={(e) => handleInputChange('coverage', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner la couverture</option>
                    <option value="basic">Basique (Incendie + Dégâts des eaux)</option>
                    <option value="standard">Standard (+ Vol + Bris de glace)</option>
                    <option value="premium">Premium (Tous risques + Responsabilité civile)</option>
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
    </div>
  );
};