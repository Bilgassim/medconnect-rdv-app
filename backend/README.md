# Backend Laravel - Gestion RDV Médicaux

## Structure du projet

Ce dossier contient la structure prête pour l'implémentation Laravel.

## Installation Laravel

```bash
cd backend
composer create-project laravel/laravel .
```

## APIs à implémenter

### Authentification
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout
- GET /api/auth/user

### Utilisateurs
- GET /api/users
- POST /api/users
- PUT /api/users/{id}
- DELETE /api/users/{id}

### Médecins
- GET /api/doctors
- GET /api/doctors/{id}
- GET /api/doctors/{id}/availability

### Rendez-vous
- GET /api/appointments
- POST /api/appointments
- PUT /api/appointments/{id}
- DELETE /api/appointments/{id}

### Spécialités
- GET /api/specialties

## Configuration CORS

Configurer CORS pour permettre les requêtes depuis le frontend (localhost:8080 en dev).

## Base de données

### Tables principales
- users (patients, médecins, admin)
- doctors (profil médecin)
- appointments
- specialties
- availability_slots

## Variables d'environnement

```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:8080
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=medconnect
DB_USERNAME=root
DB_PASSWORD=
```