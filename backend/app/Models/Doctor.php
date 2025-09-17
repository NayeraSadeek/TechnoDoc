<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Doctor extends Model
{
    use HasFactory;   

    protected $fillable = [
        'user_id',
        'name',
        // 'specialization',
        // 'phone',
        'email',
        'gender',
        'department',
        'clinic',
        'fee',
        'Cfee',
        'clinic_location_link',
    'certificate',

    ];

    public function user()
{
    return $this->belongsTo(User::class);
}

public function appointments()
{
    return $this->hasMany(DoctorAppointment::class,'doctor_id');
}
public function times()
{
    return $this->hasMany(DoctorAppointment::class);
}
public function schedules()
{
    return $this->hasMany(DoctorAppointment::class);
}


}
