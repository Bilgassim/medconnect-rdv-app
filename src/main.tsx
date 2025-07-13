import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { validateEnvironment } from "@/config/environment";

// Valider la configuration au démarrage
validateEnvironment();

createRoot(document.getElementById("root")!).render(<App />);
