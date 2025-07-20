import React, { useState } from 'react';
import { GraduationCap, Plus, User, School, Calendar } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const companies = [
  { id: '1', name: 'COLINA Assurances', logo: '🏢', rating: 4.8, premium: '95,000' },
  { id: '2', name: 'ASKIA Assurances', logo: '🏛️', rating: 4.6, premium: '88,000' },
  { id: '3', name: 'ALLIANZ Niger', logo: '🔷', rating: 4.9, premium: '105,000' },
];

const formulas = [
  { id: 'basic', name: 'Formule Basique', coverage: 'Frais de scolarité uniquement', price: '50,000' },
  { id: 'premium', name: 'Formule Premium', coverage: 'Scolarité + Fournitures + Transport', price: '85,000' },
  { id: 'gold', name: 'Formule Gold', coverage: 'Couverture complète + Bourses d\'excellence', price: '120,000' }
];

const existingContracts = [
  {
    id: '1',
    beneficiary: 'Aminata IBRAHIM',
    school: 'Université Abdou Moumouni',
    company: 'COLINA Assurances',
    policyNumber: 'EDU-2024-001',
    formula: 'Premium',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    premium: '95,000 XOF',
    status: 'active'
  }
];

export const EducationInsurance: React.FC = () => {
  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const [formData, setFormData] = useState({
    beneficiaryName: '',
    beneficiaryAge: '',
    schoolName: '',
    schoolLevel: '',
    academicYear: '',
    formula: '',
    duration: '1',
    selectedCompany: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Education insurance subscription:', formData);
    setShowNewSubscription(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-sky-500" />
            Assurance Éducation
          </h1>
          <p className="text-slate-600 mt-2">Investissez dans l'avenir éducatif de vos enfants</p>
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
          <h2 className="text-xl font-bold text-slate-800 mb-6">Mes Contrats Éducation</h2>
          <div className="grid gap-6">
            {existingContracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{contract.beneficiary}</h3>
                      <p className="text-sm text-slate-600 mt-1">{contract.school}</p>
                      <p className="text-sm text-slate-500">Police: {contract.policyNumber}</p>
                      <p className="text-sm text-slate-500">Formule: {contract.formula}</p>
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
          <h2 className="text-xl font-bold text-slate-800 mb-6">Nouvelle Assurance Éducation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Informations du bénéficiaire</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Nom complet du bénéficiaire"
                  value={formData.beneficiaryName}
                  onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
                  leftIcon={<User className="w-5 h-5" />}
                  placeholder="Ex: Aminata IBRAHIM"
                  required
                />

                <Input
                  type="number"
                  label="Âge du bénéficiaire"
                  value={formData.beneficiaryAge}
                  onChange={(e) => handleInputChange('beneficiaryAge', e.target.value)}
                  placeholder="Ex: 18"
                  required
                />

                <Input
                  type="text"
                  label="Nom de l'établissement"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  leftIcon={<School className="w-5 h-5" />}
                  placeholder="Ex: Université Abdou Moumouni"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Niveau d'études</label>
                  <select
                    value={formData.schoolLevel}
                    onChange={(e) => handleInputChange('schoolLevel', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionner le niveau</option>
                    <option value="primaire">Primaire</option>
                    <option value="college">Collège</option>
                    <option value="lycee">Lycée</option>
                    <option value="universite">Université</option>
                    <option value="formation">Formation professionnelle</option>
                  </select>
                </div>

                <Input
                  type="text"
                  label="Année académique"
                  value={formData.academicYear}
                  onChange={(e) => handleInputChange('academicYear', e.target.value)}
                  leftIcon={<Calendar className="w-5 h-5" />}
                  placeholder="Ex: 2024-2025"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Durée du contrat (années)</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                    required
                  >
                    {[1,2,3,4,5].map(year => (
                      <option key={year} value={year}>{year} an{year > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Formula Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Choisir une formule</h3>
              <div className="grid gap-4">
                {formulas.map((formula) => (
                  <label key={formula.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="formula"
                      value={formula.id}
                      checked={formData.formula === formula.id}
                      onChange={(e) => handleInputChange('formula', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`
                      p-4 border-2 rounded-xl transition-all duration-200
                      ${formData.formula === formula.id 
                        ? 'border-sky-400 bg-sky-50' 
                        : 'border-slate-200 hover:border-sky-300'
                      }
                    `}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-800">{formula.name}</h4>
                          <p className="text-sm text-slate-600 mt-1">{formula.coverage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-sky-600">{formula.price} XOF</p>
                          <p className="text-sm text-slate-500">par an</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
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

      {/* Education Benefits */}
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-800 mb-2">Avantages de l'assurance éducation</h3>
            <ul className="text-orange-700 space-y-1 text-sm">
              <li>• Garantie de financement des études en cas d'imprévu</li>
              <li>• Bourses d'excellence pour les meilleurs résultats</li>
              <li>• Couverture des frais de scolarité et fournitures</li>
              <li>• Accompagnement personnalisé tout au long du parcours</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};