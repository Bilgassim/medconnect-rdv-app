import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Stethoscope, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  price: number;
  availableDays: number[]; // 0=dimanche, 1=lundi, etc.
}

interface AppointmentData {
  doctor: Doctor | null;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  reason: string;
  isUrgent: boolean;
}

const Appointment = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    doctor: null,
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    reason: '',
    isUrgent: false
  });

  const doctors: Doctor[] = [
    { 
      id: '1', 
      name: 'Dr. Martin Dubois', 
      specialty: 'Médecine générale',
      location: 'Cabinet principal - 1er étage',
      price: 25,
      availableDays: [1, 2, 3, 4, 5] // Lun-Ven
    },
    { 
      id: '2', 
      name: 'Dr. Sophie Leroy', 
      specialty: 'Cardiologie',
      location: 'Cabinet principal - 2ème étage', 
      price: 70,
      availableDays: [2, 4, 5] // Mar, Jeu, Ven
    },
    { 
      id: '3', 
      name: 'Dr. Pierre Bernard', 
      specialty: 'Dermatologie',
      location: 'Cabinet annexe - Rez-de-chaussée',
      price: 60,
      availableDays: [1, 3, 5] // Lun, Mer, Ven
    },
    { 
      id: '4', 
      name: 'Dr. Marie Rousseau', 
      specialty: 'Pédiatrie',
      location: 'Cabinet principal - Rez-de-chaussée',
      price: 30,
      availableDays: [1, 2, 3, 4, 6] // Lun-Jeu + Sam
    },
  ];

  const baseTimeSlots = [
    '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Créneaux occupés simulés (en réalité, cela viendrait de la base de données)
  const bookedSlots = [
    { doctorId: '1', date: format(new Date(), 'yyyy-MM-dd'), time: '09:00' },
    { doctorId: '1', date: format(new Date(), 'yyyy-MM-dd'), time: '10:30' },
    { doctorId: '2', date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), time: '14:00' },
  ];

  // Générer les dates disponibles pour les 30 prochains jours
  const availableDates = useMemo(() => {
    if (!appointmentData.doctor) return [];
    
    const dates = [];
    const today = startOfDay(new Date());
    
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      
      if (appointmentData.doctor.availableDays.includes(dayOfWeek)) {
        dates.push(date);
      }
    }
    
    return dates;
  }, [appointmentData.doctor]);

  // Filtrer les créneaux disponibles selon le médecin et la date
  const availableTimeSlots = useMemo(() => {
    if (!appointmentData.doctor || !appointmentData.date) return [];
    
    return baseTimeSlots.filter(time => {
      const isBooked = bookedSlots.some(slot => 
        slot.doctorId === appointmentData.doctor?.id &&
        slot.date === appointmentData.date &&
        slot.time === time
      );
      return !isBooked;
    });
  }, [appointmentData.doctor, appointmentData.date]);

  const canProceedToNext = () => {
    switch (step) {
      case 1:
        return appointmentData.doctor !== null;
      case 2:
        return appointmentData.date && appointmentData.time;
      case 3:
        return appointmentData.firstName && 
               appointmentData.lastName && 
               appointmentData.email && 
               appointmentData.phone &&
               appointmentData.birthDate &&
               appointmentData.reason;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (step < 3 && canProceedToNext()) {
      setStep(step + 1);
    } else if (!canProceedToNext()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs requis avant de continuer.",
        variant: "destructive"
      });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectDoctor = (doctor: Doctor) => {
    setAppointmentData({
      ...appointmentData,
      doctor,
      date: '', // Reset date when changing doctor
      time: ''  // Reset time when changing doctor
    });
  };

  const selectDate = (date: string) => {
    setAppointmentData({
      ...appointmentData,
      date,
      time: '' // Reset time when changing date
    });
  };

  const selectTime = (time: string) => {
    setAppointmentData({
      ...appointmentData,
      time
    });
  };

  const handleInputChange = (field: keyof AppointmentData, value: string | boolean) => {
    setAppointmentData({
      ...appointmentData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if (!canProceedToNext()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive"
      });
      return;
    }

    // TODO: Envoyer les données à Supabase
    console.log('Données du rendez-vous:', appointmentData);
    
    toast({
      title: "Rendez-vous confirmé !",
      description: `Votre rendez-vous avec ${appointmentData.doctor?.name} est programmé le ${format(new Date(appointmentData.date), 'dd MMMM yyyy', { locale: fr })} à ${appointmentData.time}. Un email de confirmation vous sera envoyé.`,
    });

    // Reset form
    setAppointmentData({
      doctor: null,
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      reason: '',
      isUrgent: false
    });
    setStep(1);
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <Card 
                      key={doctor.id} 
                      className={`cursor-pointer hover:shadow-md transition-all duration-200 border-2 ${
                        appointmentData.doctor?.id === doctor.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary'
                      }`}
                      onClick={() => selectDoctor(doctor)}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                              <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                            </div>
                            {appointmentData.doctor?.id === doctor.id && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Tarif: {doctor.price}€</span>
                              <Badge variant="secondary">
                                {doctor.availableDays.length} jours/semaine
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {appointmentData.doctor && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-medium">
                        {appointmentData.doctor.name} sélectionné(e)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Étape 2: Choix de la date et heure */}
            {step === 2 && (
              <div className="space-y-6">
                {appointmentData.doctor && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-blue-900 dark:text-blue-100">
                          {appointmentData.doctor.name}
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {appointmentData.doctor.specialty} - {appointmentData.doctor.price}€
                        </p>
                      </div>
                      <Badge>{appointmentData.doctor.location}</Badge>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Choisissez une date</Label>
                    <Select value={appointmentData.date} onValueChange={selectDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une date" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDates.map((date) => (
                          <SelectItem 
                            key={format(date, 'yyyy-MM-dd')} 
                            value={format(date, 'yyyy-MM-dd')}
                          >
                            {format(date, 'EEEE dd MMMM yyyy', { locale: fr })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {appointmentData.date && (
                    <div className="space-y-2">
                      <Label>Créneaux disponibles</Label>
                      {availableTimeSlots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                          {availableTimeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={appointmentData.time === time ? "default" : "outline"}
                              size="sm"
                              className={`h-10 ${
                                appointmentData.time === time 
                                  ? 'bg-primary text-white' 
                                  : 'hover:bg-primary hover:text-white'
                              }`}
                              onClick={() => selectTime(time)}
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                            <AlertCircle className="w-4 h-4" />
                            <span>Aucun créneau disponible pour cette date.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {appointmentData.date && appointmentData.time && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-medium">
                        Rendez-vous le {format(new Date(appointmentData.date), 'dd MMMM yyyy', { locale: fr })} à {appointmentData.time}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Étape 3: Informations personnelles */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Résumé du RDV */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Récapitulatif</h3>
                  <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <p><strong>Médecin:</strong> {appointmentData.doctor?.name}</p>
                    <p><strong>Spécialité:</strong> {appointmentData.doctor?.specialty}</p>
                    <p><strong>Date:</strong> {format(new Date(appointmentData.date), 'dd MMMM yyyy', { locale: fr })}</p>
                    <p><strong>Heure:</strong> {appointmentData.time}</p>
                    <p><strong>Tarif:</strong> {appointmentData.doctor?.price}€</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Votre prénom"
                      value={appointmentData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Votre nom"
                      value={appointmentData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="votre.email@exemple.com"
                      value={appointmentData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="06 12 34 56 78"
                      value={appointmentData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de naissance *</Label>
                  <Input 
                    id="birthDate" 
                    type="date"
                    value={appointmentData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Motif de la consultation *</Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Décrivez brièvement le motif de votre consultation (symptômes, problème de santé, consultation de routine, etc.)"
                    className="min-h-[100px]"
                    value={appointmentData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={appointmentData.isUrgent}
                    onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="urgent" className="text-sm">
                    Il s'agit d'une consultation urgente
                  </Label>
                </div>

                <div className="text-xs text-muted-foreground">
                  * Champs obligatoires
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
                  disabled={!canProceedToNext()}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-secondary"
                  disabled={!canProceedToNext()}
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