<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class ApprovedAppointment extends Model
{
    use HasFactory;

    protected $table = 'approved_appointments';
//  const STATUS_WAITING   = 'waiting';
//     const STATUS_COMPLETED = 'completed';
//     const STATUS_NO_SHOW   = 'no-show';
    protected $fillable = [
        'appointment_id',
        'doctor_id',
        'patient_id',
        'appointment_date',
        'slot',
        'issue',
        'paymentmethod',
        'status',
    ];

    // protected $dates = [
    //     'appointment_date',
    //     'slot',
    //     'created_at',
    //     'updated_at'
    // ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class,'doctor_id');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function originalAppointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}
