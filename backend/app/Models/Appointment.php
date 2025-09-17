<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
   protected $fillable = [
        'patient_id',
        'doctor_id',
        'appointment_date',
        'status',
        'slot',   
        'issue',
         'paymentmethod',

    

    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function slot()
    {
        return $this->belongsTo(DoctorAppointment::class, 'slot_id');
    }
}
