import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Appointment = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const doctors = [
    { id: '1', name: 'Dr. Martin Dubois', specialty: 'Médecine générale' },
    { id: '2', name: 'Dr. Sophie Leroy', specialty: 'Cardiologie' },
    { id: '3', name: 'Dr. Pierre Bernard', specialty: 'Dermatologie' },
    { id: '4', name: 'Dr. Marie Rousseau', specialty: 'Pédiatrie' },
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Rendez-vous demandé",
      description: "Votre demande de rendez-vous a été envoyée. Nous vous confirmerons par email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary-lighter/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Prendre Rendez-vous
          </h1>
          <p className="text-xl text-muted-foreground">
            Réservez votre consultation en quelques clics
          </p>
        </div>

        {/* Indicateur de progression */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {step === 1 && <Stethoscope className="w-5 h-5 text-primary" />}
              {step === 2 && <Calendar className="w-5 h-5 text-primary" />}
              {step === 3 && <User className="w-5 h-5 text-primary" />}
              <span>
                {step === 1 && 'Choisir le médecin'}
                {step === 2 && 'Choisir la date et l\'heure'}
                {step === 3 && 'Vos informations'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Étape 1: Choix du médecin */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <Card 
                      key={doctor.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Étape 2: Choix de la date et heure */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date souhaitée</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Heure souhaitée</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-white"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3: Informations personnelles */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre.email@exemple.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="01 23 45 67 89" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de naissance</Label>
                  <Input id="birthDate" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Raison de la consultation</Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Décrivez brièvement le motif de votre consultation..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={step === 1}
              >
                Précédent
              </Button>
              
              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  Confirmer le rendez-vous
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointment;