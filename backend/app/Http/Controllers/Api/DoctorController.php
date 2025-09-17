<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\DoctorAppointment;

class DoctorController extends Controller
{
    public function register(Request $request)
    {
        // \Log::info('Doctor register request:', $request->all());

        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'name'       => 'required|string|max:255',
                'email'      => 'required|string|email|max:255|unique:users',
                'password'   => 'required|string|min:6',
                'gender'     => 'required|string',
                'department' => 'required|string',
                'clinic'     => 'required|string',
                'fee'        => 'required|numeric',
                'Cfee'       => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors'  => $validator->errors()
                ], 422);
            }

            // Create User
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'role'     => 'doctor',
            ]);

            // Create Doctor linked to User
            $doctor = Doctor::create([
                'user_id'    => $user->id,
                'name'       => $request->name,
                'email'      => $request->email,
                'gender'     => $request->gender,
                'department' => $request->department,
                'clinic'     => $request->clinic,
                'fee'        => (float)$request->fee,
                'Cfee'       => (float)$request->Cfee,
            ]);

            if ($request->has('doctorappointment') && is_array($request->doctorappointment)) {
    foreach ($request->doctorappointment as $appointment) {

        DoctorAppointment::create([
            'doctor_id'  => $doctor->id,
            'day'        => $appointment['day'],
            'start_time' => $appointment['start_time'],
            'end_time'   => $appointment['end_time'],
        ]);
    }
}
            return response()->json([
                'message' => 'Doctor registered successfully!',
                            'data' => $request->all(),

                'user'    => $user,
                'doctor'  => $doctor
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function show($id)
{
    $doctor = Doctor::find($id);

      if (!$doctor) {
        $doctor = Doctor::with('appointments')->where('user_id', $id)->first();
    }
    
    if (!$doctor) {
        return response()->json(['message' => 'Doctor not found'], 404);
    }

    return response()->json($doctor);
}

   public function index()
{
$doctors = Doctor::with('appointments')->get();
    return response()->json($doctors);
}
public function availableTimes($id)
{
    $doctor = Doctor::findOrFail($id);

    $times = $doctor->times; 

    return response()->json($times);
}

public function update(Request $request, $id)
{
    $doctor = Doctor::findOrFail($id);

    // تحديث بيانات الدكتور الأساسية
    $doctor->update($request->only([
        'name',
        'email',
        'gender',
        'department',
        'clinic',
        'fee',
        'Cfee',
        'clinic_location_link',
        'certificate'
    ]));

    // تحديث المواعيد (availability)
    if ($request->has('availability')) {
        // نمسح المواعيد القديمة
        $doctor->schedules()->delete();

        $availability = $request->input('availability', []);

        foreach ($availability as $day) {
            if ($day['active']) {
                foreach ($day['times'] as $slot) {
                    $doctor->schedules()->create([
                        'day' => $day['day'],
                        'start_time'  => $slot['from'],
                        'end_time'    => $slot['to'],
                    ]);
                }
            }
        }
    }

    return response()->json([
        'message' => 'Doctor profile updated successfully',
        'doctor'  => $doctor->load('schedules'),
    ]);
}

public function updateAvailability(Request $request, $doctorId)
{
    $request->validate([
        'availability' => 'required|array',
        'availability.*.day' => 'required|string',
        'availability.*.from' => 'required',
        'availability.*.to' => 'required',
    ]);

    // امسح المواعيد القديمة
    DoctorAppointment::where('doctor_id', $doctorId)->delete();

    //  المواعيد الجديدة
    foreach ($request->availability as $slot) {
        DoctorAppointment::create([
            'doctor_id' => $doctorId,
            'day'       => $slot['day'],
            'start_time'      => $slot['from'],
            'end_time'        => $slot['to'],
        ]);
    }

    return response()->json(['message' => 'Availability updated successfully']);
}

}



