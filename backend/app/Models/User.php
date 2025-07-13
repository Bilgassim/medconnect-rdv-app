<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'phone',
        'role',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Relation avec le profil médecin
     */
    public function doctor()
    {
        return $this->hasOne(Doctor::class);
    }

    /**
     * Relation avec les rendez-vous (patient)
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_id');
    }

    /**
     * Vérifier si l'utilisateur est un médecin
     */
    public function isDoctor()
    {
        return $this->role === 'doctor';
    }

    /**
     * Vérifier si l'utilisateur est un admin
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Vérifier si l'utilisateur est un patient
     */
    public function isPatient()
    {
        return $this->role === 'patient';
    }
}