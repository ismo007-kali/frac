# FRACTALIS_APPLICATION

Application web complète d'assurance et de courtage pour le Niger.

## 🚀 Fonctionnalités

### Authentification
- Connexion via numéro de téléphone avec indicatif pays
- Vérification OTP par SMS
- Réinitialisation de mot de passe sécurisée

### Assurances
- **Automobile** : Souscription avec détails véhicule, choix compagnie
- **Voyage** : Couverture internationale avec options flexibles
- **Habitation** : Protection logement et biens personnels
- **Éducation** : Financement études avec formules adaptées

### Gestion
- **Sinistres** : Déclaration et suivi en temps réel
- **Plaintes** : Système de réclamation intégré
- **Paiements** : Historique complet avec moyens locaux
- **Documents** : Stockage sécurisé et organisé

### Moyens de paiement
- Airtel Money
- Orange Money
- Flooz
- Mynita Amanata

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript + Vite
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **State Management** : React Context
- **Build Tool** : Vite

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/fractalis/fractalis-app.git
cd fractalis-app

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Démarrer en développement
npm run dev

# Build pour production
npm run build:prod
```

## 🌍 Déploiement

### Prérequis
- Node.js 18+
- Service SMS configuré
- Domaine et certificat SSL

### Variables d'environnement
Configurer les variables dans `.env` :
- `VITE_SMS_API_KEY` : Clé API service SMS
- `VITE_API_BASE_URL` : URL API backend
- Autres configurations selon besoins

### Build et déploiement
```bash
# Build optimisé
npm run build:prod

# Le dossier dist/ contient les fichiers à déployer
```

## 📱 Utilisation

### Connexion
1. Saisir numéro de téléphone avec indicatif (+227 pour Niger)
2. Entrer mot de passe
3. Validation automatique

### Souscription
1. Choisir type d'assurance
2. Remplir formulaire détaillé
3. Sélectionner compagnie partenaire
4. Procéder au paiement

### Sinistre
1. Déclarer incident avec détails
2. Joindre photos/documents
3. Suivre statut en temps réel
4. Recevoir notifications SMS

## 🔧 Configuration

### Service SMS
Intégrer avec fournisseur SMS local :
```typescript
// src/services/smsService.ts
const SMS_CONFIG = {
  apiUrl: process.env.VITE_SMS_API_URL,
  apiKey: process.env.VITE_SMS_API_KEY,
  sender: 'FRACTALIS'
};
```

### Paiements
Configurer les moyens de paiement locaux dans :
```typescript
// src/components/payments/PaymentMethods.tsx
```

## 📊 Monitoring

### Métriques importantes
- Taux de conversion souscriptions
- Temps de traitement sinistres
- Satisfaction client
- Performance paiements

### Logs
- Authentifications
- Transactions
- Erreurs système
- Actions utilisateurs

## 🔒 Sécurité

### Mesures implémentées
- Chiffrement données sensibles
- Validation côté client et serveur
- Sessions sécurisées
- Protection CSRF
- Limitation tentatives connexion

### Conformité
- RGPD (données personnelles)
- Réglementation assurance Niger
- Standards sécurité bancaire

## 🤝 Support

### Contact technique
- Email : dev@fractalis.ne
- Téléphone : +227 XX XX XX XX
- Documentation : https://docs.fractalis.ne

### Maintenance
- Mises à jour sécurité mensuelles
- Nouvelles fonctionnalités trimestrielles
- Support 24/7 pour incidents critiques

## 📄 Licence

© 2024 FRACTALIS COURTAGE - Tous droits réservés
Agrément courtage Niger n° XXX/2024