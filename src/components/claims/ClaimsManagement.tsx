import React, { useState } from 'react';
import { MessageSquare, Plus, Clock, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const existingClaims = [
  {
    id: '1',
    category: 'Assurance Auto',
    subject: 'Remboursement suite à accident',
    description: 'Demande de remboursement pour les réparations suite à un accident de la circulation du 15 janvier 2024.',
    status: 'in-progress',
    createdAt: '2024-01-16',
    responseTime: '2-3 jours ouvrés'
  },
  {
    id: '2',
    category: 'Assurance Voyage',
    subject: 'Annulation de voyage',
    description: 'Demande de remboursement pour annulation de voyage pour raisons médicales.',
    status: 'resolved',
    createdAt: '2024-01-10',
    resolvedAt: '2024-01-12'
  },
  {
    id: '3',
    category: 'Service Client',
    subject: 'Problème de facturation',
    description: 'Erreur dans le calcul de la prime d\'assurance habitation.',
    status: 'pending',
    createdAt: '2024-01-20'
  }
];

const categories = [
  'Assurance Auto',
  'Assurance Voyage', 
  'Assurance Habitation',
  'Assurance Éducation',
  'Service Client',
  'Facturation',
  'Autre'
];

export const ClaimsManagement: React.FC = () => {
  const [showNewClaim, setShowNewClaim] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New claim:', formData);
    setShowNewClaim(false);
    setFormData({ category: '', subject: '', description: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'in-progress':
        return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-slate-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in-progress':
        return 'En cours';
      case 'resolved':
        return 'Résolu';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
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
            <MessageSquare className="w-8 h-8 text-sky-500" />
            Gestion des Plaintes
          </h1>
          <p className="text-slate-600 mt-2">Suivez et gérez vos réclamations</p>
        </div>
        <Button
          onClick={() => setShowNewClaim(true)}
          leftIcon={<Plus className="w-5 h-5" />}
          size="lg"
        >
          Nouvelle plainte
        </Button>
      </div>

      {/* New Claim Form */}
      {showNewClaim && (
        <Card>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Nouvelle Plainte</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <Input
              type="text"
              label="Sujet"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Résumé de votre plainte"
              required
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description détaillée</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none resize-none"
                placeholder="Décrivez votre problème en détail..."
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Documents justificatifs</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Vous pourrez joindre des documents (photos, factures, etc.) après avoir créé votre plainte.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewClaim(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Soumettre la plainte
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Existing Claims */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Mes Plaintes</h2>
        <div className="space-y-4">
          {existingClaims.map((claim) => (
            <Card key={claim.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    {getStatusIcon(claim.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{claim.subject}</h3>
                        <p className="text-sm text-slate-600">{claim.category}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                        {getStatusLabel(claim.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{claim.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Créé le {new Date(claim.createdAt).toLocaleDateString('fr-FR')}</span>
                      {claim.status === 'resolved' && claim.resolvedAt && (
                        <span>Résolu le {new Date(claim.resolvedAt).toLocaleDateString('fr-FR')}</span>
                      )}
                      {claim.status === 'in-progress' && claim.responseTime && (
                        <span>Réponse sous {claim.responseTime}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                  {claim.status === 'pending' && (
                    <Button variant="ghost" size="sm">
                      Modifier
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Support Info */}
      <Card className="bg-gradient-to-r from-sky-50 to-sky-100 border-sky-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sky-800 mb-2">Besoin d'aide ?</h3>
            <p className="text-sky-700 mb-4">
              Notre équipe de support est disponible 24/7 pour vous accompagner dans vos démarches.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm">
                Chat en direct
              </Button>
              <Button variant="ghost" size="sm">
                Appeler le support
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};