// Configuration d'environnement centralisée
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
  },
  
  // App Configuration
  app: {
    name: 'MedConnect',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development',
  },
  
  // Features flags
  features: {
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
    enableTeleconsultation: import.meta.env.VITE_ENABLE_TELECONSULTATION === 'true',
    enablePayments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
  },
  
  // External services
  services: {
    emailService: import.meta.env.VITE_EMAIL_SERVICE_URL,
    smsService: import.meta.env.VITE_SMS_SERVICE_URL,
  },
  
  // Development helpers
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validation des variables d'environnement requises
const requiredEnvVars = ['VITE_API_URL'];

export const validateEnvironment = () => {
  const missingVars = requiredEnvVars.filter(
    varName => !import.meta.env[varName]
  );
  
  if (missingVars.length > 0 && config.isProduction) {
    console.error('Variables d\'environnement manquantes:', missingVars);
    throw new Error(`Variables d'environnement requises manquantes: ${missingVars.join(', ')}`);
  }
  
  if (config.isDevelopment) {
    console.log('Configuration:', config);
  }
};