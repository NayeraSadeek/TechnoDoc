<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\ApprovedAppointment;



class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'email' => 'required|email|exists:patients,email',
            'appointment_date' => 'required|date',
 'slot' => 'required',
    'issue' => 'required|string',
    'paymentmethod' => 'required|string',
        ]);

                $patient = Patient::where('email', $request->email)->first();

                if (!$patient) {
            return response()->json([
                        'error' => 'Patient not found with this email'
            ], 404);
        }
        $appointment = Appointment::create([
            'patient_id' => $patient->id,
            'doctor_id' => $request->doctor_id,
            'appointment_date' => $request->appointment_date,
            'slot' => $request->slot,  
            'status' => 'pending',
            'issue' => $request->issue,
            'paymentmethod' => $request->paymentmethod,
        ]);

        return response()->json([
            'message' => 'Appointment created successfully',
            'appointment' => $appointment
        ], 201);
    }


    public function index(Request $request)
{
    $query = Appointment::with(['patient', 'doctor']);

    if ($request->has('doctor_id')) {
        $query->where('doctor_id', $request->doctor_id);
    }

    if ($request->has('appointment_date')) {
        $query->whereDate('appointment_date', $request->appointment_date);
    }

    $appointments = $query->orderBy('appointment_date', 'asc')
                          ->orderBy('slot', 'asc')
                          ->get();

    return response()->json($appointments);
}

public function updateStatus(Request $request, $id)
{

    $request->validate([
        'status' => 'required|in:approved,canceled',
    ]);

    $appointment = Appointment::findOrFail($id);
    $appointment->status = $request->status;
    $appointment->save();
    $approvedId = null;

    // إذا تم الموافقة، انسخه في approved_appointments
    if ($request->status === 'approved') {
         $approved=  ApprovedAppointment::updateOrCreate(
            ['appointment_id' => $appointment->id],
            [
           'patient_id' => $appointment->patient_id,
            'doctor_id' => $appointment->doctor_id,
            'appointment_date' => $appointment->appointment_date,
            'slot' => $appointment->slot,
            'issue' => $appointment->issue,
            'paymentmethod' => $appointment->paymentmethod,
            'status' => 'waiting',
            ]
        );
           $approvedId = $approved->id;
    }

    return response()->json([
        'message' => 'Appointment status updated successfully',
        'appointment' => $appointment,
                'approved_id' => $approvedId

    ]);
}

public function getAppointments($id)
{
    $appointments = Appointment::with(['patient', 'doctor'])
                               ->where('patient_id', $id)
                               ->get(); 
    return response()->json($appointments);
}


public function getApprovedAppointments($doctorId)
{
    $appointments = Appointment::with('patient')
        ->where('doctor_id', $doctorId)
        // ->where('status', 'approved')
        ->orderBy('appointment_date', 'asc')
        ->orderBy('slot', 'asc')
        ->get();

    return response()->json($appointments);
}

public function getApprovedAppointmentsForPatient($patientId)
{
    $appointments = ApprovedAppointment::with('doctor')
        ->where('patient_id', $patientId)
        ->orderBy('appointment_date', 'asc')
        ->orderBy('slot', 'asc')
        ->get();

    return response()->json($appointments);
}

public function updateApprovedStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:waiting,completed,no-show',
    ]);

    $appointment = ApprovedAppointment::findOrFail($id);
    $appointment->status = $request->status;
    $appointment->save();

    return response()->json([
        'message' => 'Approved appointment status updated successfully',
        'appointment' => $appointment
    ]);
}

}
