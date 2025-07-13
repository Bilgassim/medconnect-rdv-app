# MedConnect - Plateforme de Gestion des Rendez-vous Médicaux

## 🎯 Description du Projet

MedConnect est une plateforme web moderne et responsive dédiée à la gestion des rendez-vous médicaux pour les cabinets médicaux. Elle permet aux patients de prendre rendez-vous en ligne et aux professionnels de santé de gérer efficacement leur planning.

## 🚀 Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le styling
- **Shadcn/ui** pour les composants UI
- **React Router DOM** pour la navigation
- **React Query** pour la gestion des données

### Backend (Structure préparée)
- **Laravel** (structure prête dans le dossier `/backend`)
- **MySQL** pour la base de données
- **Laravel Sanctum** pour l'authentification API
- **APIs RESTful** pour la communication frontend/backend

## ✅ Fonctionnalités Développées

### Interface Utilisateur
- ✅ Design system médical complet (couleurs, typography, composants)
- ✅ Layout responsive avec header et footer
- ✅ Page d'accueil avec hero section et présentation des services
- ✅ Formulaire de prise de rendez-vous en 3 étapes
- ✅ Pages de connexion et d'inscription
- ✅ Page de contact avec informations du cabinet
- ✅ Navigation responsive avec menu mobile

### Système de Rendez-vous
- ✅ Formulaire intelligent de prise de RDV
- ✅ Sélection du médecin et de la spécialité
- ✅ Calendrier interactif pour choisir la date
- ✅ Gestion des créneaux horaires disponibles
- ✅ Récapitulatif avant confirmation
- ✅ Validation des données à chaque étape

### Architecture Frontend
- ✅ Services API préparés pour Laravel
- ✅ Hooks d'authentification
- ✅ Context Provider pour la gestion d'état
- ✅ Types TypeScript pour toutes les entités
- ✅ Gestion des tokens d'authentification

### Backend (Structure)
- ✅ Modèles Laravel (User, Doctor, Appointment, Specialty)
- ✅ Migrations de base de données
- ✅ Routes API complètes
- ✅ Architecture prête pour l'authentification

## 🔄 Fonctionnalités à Développer

### Authentification & Autorisation
- 🔲 Implémentation complète de l'authentification Laravel
- 🔲 Système de rôles (Patient, Médecin, Admin)
- 🔲 Middleware de protection des routes
- 🔲 Gestion des sessions et tokens

### Tableaux de Bord
- 🔲 **Dashboard Patient** : 
  - Historique des consultations
  - Rendez-vous à venir
  - Notifications
  - Profil personnel
- 🔲 **Dashboard Médecin** :
  - Planning des rendez-vous
  - Validation/refus des demandes
  - Notes sur les patients
  - Gestion des disponibilités
- 🔲 **Dashboard Admin** :
  - Gestion des comptes utilisateurs
  - Calendrier global
  - Configuration des horaires
  - Statistiques

### Gestion Avancée des RDV
- 🔲 Système de notifications en temps réel
- 🔲 Rappels automatiques par email
- 🔲 Possibilité d'annuler/reporter un RDV
- 🔲 Gestion des urgences
- 🔲 Salle d'attente virtuelle

### Fonctionnalités Métier
- 🔲 Gestion des dossiers patients
- 🔲 Historique médical
- 🔲 Ordonnances en ligne
- 🔲 Facturation et paiements
- 🔲 Téléconsultation (optionnel)

### Administration
- 🔲 Configuration des horaires du cabinet
- 🔲 Gestion des jours fériés
- 🔲 Paramètres de notification
- 🔲 Rapports et statistiques
- 🔲 Sauvegarde des données

### Sécurité & Performance
- 🔲 Chiffrement des données sensibles
- 🔲 Audit logs
- 🔲 Rate limiting
- 🔲 Optimisation des performances
- 🔲 Tests automatisés

## 🛠️ Installation et Configuration

### Prérequis
- Node.js 18+
- PHP 8.1+
- Composer
- MySQL

### Frontend
```bash
npm install
npm run dev
```

### Backend (à configurer)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## 📁 Structure du Projet

```
├── src/
│   ├── components/         # Composants réutilisables
│   ├── pages/             # Pages de l'application
│   ├── services/          # Services API
│   ├── hooks/             # Custom hooks
│   └── lib/               # Utilitaires
├── backend/               # Structure Laravel
│   ├── app/
│   ├── database/
│   └── routes/
└── public/                # Assets statiques
```

## 🎨 Design System

Le projet utilise un design system médical professionnel avec :
- Palette de couleurs médicales (bleu, vert, blanc)
- Typography cohérente
- Composants UI standardisés
- Responsive design mobile-first

## 🚀 Déploiement

### Frontend
- **Développement** : `npm run dev`
- **Production** : `npm run build`
- **Hébergement** : Netlify (recommandé)

### Backend
- **Serveur** : Apache/Nginx avec PHP
- **Base de données** : MySQL
- **Hébergement** : VPS ou cloud provider

## 📧 Contact

Pour toute question ou contribution, contactez l'équipe de développement.

---

**Version actuelle** : 1.0.0 (Frontend base)  
**Dernière mise à jour** : $(date)  
**Statut** : En développement actif
