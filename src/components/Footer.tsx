import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Cabinet Médical</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Votre santé est notre priorité. Nous offrons des soins médicaux de qualité 
              dans un environnement moderne et accueillant.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                01 23 45 67 89
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                contact@cabinet-medical.fr
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-muted-foreground hover:text-primary transition-colors">
                  Prendre RDV
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Nos services
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations pratiques */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  123 Avenue de la Santé<br />
                  75001 Paris, France
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  Lun-Ven: 8h00-18h00<br />
                  Sam: 9h00-12h00<br />
                  Dim: Fermé
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur et mentions légales */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Cabinet Médical. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="/legal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;