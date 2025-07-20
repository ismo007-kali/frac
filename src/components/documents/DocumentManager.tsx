import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Plus, Search } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const documentCategories = [
  { id: 'contracts', name: 'Contrats d\'assurance', icon: '📄', color: 'from-blue-500 to-blue-600' },
  { id: 'invoices', name: 'Factures et reçus', icon: '🧾', color: 'from-green-500 to-green-600' },
  { id: 'claims', name: 'Documents de sinistres', icon: '📋', color: 'from-red-500 to-red-600' },
  { id: 'identity', name: 'Pièces d\'identité', icon: '🆔', color: 'from-purple-500 to-purple-600' },
  { id: 'vehicle', name: 'Documents véhicule', icon: '🚗', color: 'from-orange-500 to-orange-600' },
  { id: 'other', name: 'Autres documents', icon: '📁', color: 'from-slate-500 to-slate-600' }
];

const existingDocuments = [
  {
    id: '1',
    name: 'Contrat Auto Peugeot 308.pdf',
    category: 'contracts',
    size: '2.4 MB',
    uploadDate: '2024-01-15T10:30:00',
    type: 'pdf',
    description: 'Contrat d\'assurance automobile pour Peugeot 308'
  },
  {
    id: '2',
    name: 'Permis de conduire.jpg',
    category: 'identity',
    size: '1.2 MB',
    uploadDate: '2024-01-10T14:20:00',
    type: 'image',
    description: 'Copie du permis de conduire'
  },
  {
    id: '3',
    name: 'Carte grise Peugeot.pdf',
    category: 'vehicle',
    size: '0.8 MB',
    uploadDate: '2024-01-10T14:25:00',
    type: 'pdf',
    description: 'Carte grise du véhicule Peugeot 308'
  },
  {
    id: '4',
    name: 'Facture réparation accident.pdf',
    category: 'claims',
    size: '1.5 MB',
    uploadDate: '2024-01-16T09:15:00',
    type: 'pdf',
    description: 'Facture de réparation suite à accident'
  },
  {
    id: '5',
    name: 'Reçu paiement prime.pdf',
    category: 'invoices',
    size: '0.5 MB',
    uploadDate: '2024-01-15T11:00:00',
    type: 'pdf',
    description: 'Reçu de paiement de la prime d\'assurance'
  }
];

export const DocumentManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    category: '',
    description: ''
  });

  const filteredDocuments = existingDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'image':
        return '🖼️';
      case 'doc':
        return '📝';
      default:
        return '📁';
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = documentCategories.find(c => c.id === categoryId);
    return category?.name || 'Autre';
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Upload document:', uploadData);
    setShowUpload(false);
    setUploadData({ category: '', description: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-sky-500" />
            Mes Documents
          </h1>
          <p className="text-slate-600 mt-2">Gérez tous vos documents d'assurance en un seul endroit</p>
        </div>
        <Button
          onClick={() => setShowUpload(true)}
          leftIcon={<Plus className="w-5 h-5" />}
          size="lg"
        >
          Ajouter un document
        </Button>
      </div>

      {/* Document Categories */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'border-sky-400 bg-sky-50'
                : 'border-slate-200 hover:border-sky-300'
            }`}
          >
            <div className="text-2xl mb-2">📂</div>
            <p className="text-sm font-medium">Tous</p>
            <p className="text-xs text-slate-500">{existingDocuments.length}</p>
          </button>
          
          {documentCategories.map((category) => {
            const count = existingDocuments.filter(doc => doc.category === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'border-sky-400 bg-sky-50'
                    : 'border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="text-sm font-medium">{category.name}</p>
                <p className="text-xs text-slate-500">{count}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Button variant="outline">
            Trier par date
          </Button>
        </div>
      </Card>

      {/* Upload Form */}
      {showUpload && (
        <Card>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Ajouter un document</h2>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
              <select
                value={uploadData.category}
                onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {documentCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <input
                type="text"
                value={uploadData.description}
                onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 focus:outline-none"
                placeholder="Description du document"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fichier</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-sky-400 transition-colors">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Glissez-déposez votre fichier ici ou</p>
                <Button variant="outline" size="sm">
                  Choisir un fichier
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  Formats acceptés: PDF, JPG, PNG, DOC (Max: 10MB)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUpload(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Télécharger
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Documents List */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Documents {selectedCategory !== 'all' && `- ${getCategoryName(selectedCategory)}`}
        </h2>
        
        <div className="grid gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-2xl">
                    {getFileIcon(document.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{document.name}</h3>
                    <p className="text-sm text-slate-600">{document.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                      <span>{getCategoryName(document.category)}</span>
                      <span>{document.size}</span>
                      <span>Ajouté le {new Date(document.uploadDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Aucun document trouvé</h3>
            <p className="text-slate-600 mb-4">
              {selectedCategory === 'all' 
                ? 'Commencez par ajouter vos premiers documents'
                : 'Aucun document dans cette catégorie'
              }
            </p>
            <Button onClick={() => setShowUpload(true)}>
              Ajouter un document
            </Button>
          </Card>
        )}
      </div>

      {/* Storage Info */}
      <Card className="bg-gradient-to-r from-sky-50 to-sky-100 border-sky-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sky-800 mb-2">Stockage sécurisé</h3>
            <p className="text-sky-700 mb-2">
              Vos documents sont stockés de manière sécurisée et chiffrée. Espace utilisé: 6.4 MB / 100 MB
            </p>
            <div className="w-full bg-sky-200 rounded-full h-2">
              <div className="bg-sky-500 h-2 rounded-full" style={{ width: '6.4%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};