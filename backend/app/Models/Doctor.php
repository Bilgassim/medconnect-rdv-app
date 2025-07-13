<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialty_id',
        'license_number',
        'bio',
        'consultation_price',
        'is_available'
    ];

    protected $casts = [
        'consultation_price' => 'decimal:2',
        'is_available' => 'boolean'
    ];

    /**
     * Relation avec l'utilisateur
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec la spécialité
     */
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    /**
     * Relation avec les rendez-vous
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Relation avec les créneaux de disponibilité
     */
    public function availabilitySlots()
    {
        return $this->hasMany(AvailabilitySlot::class);
    }
}