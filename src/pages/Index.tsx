import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Clock, Shield, Phone, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/medical-hero.jpg';

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Prise de RDV en ligne',
      description: 'Réservez votre consultation 24h/24 et 7j/7 en quelques clics.'
    },
    {
      icon: Users,
      title: 'Équipe médicale qualifiée',
      description: 'Médecins expérimentés et spécialistes à votre service.'
    },
    {
      icon: Clock,
      title: 'Horaires étendus',
      description: 'Ouvert du lundi au samedi pour s\'adapter à votre emploi du temps.'
    },
    {
      icon: Shield,
      title: 'Soins de qualité',
      description: 'Équipements modernes et protocoles médicaux rigoureux.'
    }
  ];

  const services = [
    {
      icon: Stethoscope,
      title: 'Médecine générale',
      description: 'Consultations, bilans de santé, suivi médical personnalisé.'
    },
    {
      icon: Users,
      title: 'Spécialités médicales',
      description: 'Cardiologie, dermatologie, pédiatrie et bien plus.'
    },
    {
      icon: Phone,
      title: 'Urgences',
      description: 'Service d\'urgence disponible pour les cas critiques.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-lighter/20 to-secondary-lighter/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Votre santé, 
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {' '}notre priorité
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Cabinet médical moderne offrant des soins de qualité dans un environnement 
                professionnel et chaleureux. Prenez rendez-vous en ligne dès maintenant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/appointment">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-lg px-8 py-3"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Prendre RDV
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Cabinet médical moderne"
                className="relative rounded-lg shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Pourquoi choisir notre cabinet ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une approche moderne de la médecine avec des services personnalisés pour votre bien-être.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nos services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une gamme complète de services médicaux pour répondre à tous vos besoins de santé.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à prendre soin de votre santé ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez les milliers de patients qui nous font confiance. 
            Prenez rendez-vous dès aujourd'hui pour une consultation personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointment">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-3 bg-white text-primary hover:bg-white/90"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Téléphone</h3>
              <p className="text-muted-foreground">01 23 45 67 89</p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Horaires</h3>
              <p className="text-muted-foreground">Lun-Ven: 8h-18h<br />Sam: 9h-12h</p>
            </div>
            <div>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Équipe</h3>
              <p className="text-muted-foreground">4 médecins qualifiés</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;