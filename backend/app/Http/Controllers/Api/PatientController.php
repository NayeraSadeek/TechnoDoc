<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Patient;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\ApprovedAppointment;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name'     => 'required|string|max:255',
                'email'    => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'age'      => 'required|integer|min:0',
                'gender'   => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors'  => $validator->errors()
                ], 422);
            }

            // Create user
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'role'     => 'patient',
            ]);

            // Create patient linked to the user
            $patient = Patient::create([
                'user_id' => $user->id,
                'name'    => $request->name,
                'email'   => $request->email,
                'gender'  => $request->gender,
                'age'     => $request->age,
                        // 'password' => bcrypt($request->password), 

                'phone'=>$request->phone,
            ]);

            return response()->json([
                'message' => 'Patient registered successfully!',
                'patient' => $patient
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
    $patient = Patient::find($id);

      if (!$patient) {
        $patient = Patient::where('user_id', $id)->first();
    }
    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    return response()->json($patient);
}

public function getApprovedAppointments($id)
{
    $appointments = ApprovedAppointment::with('doctor') // علاقة مع جدول الدكاترة
        ->where('patient_id', $id)
        ->whereDate('appointment_date', '>=', now()) // بس المواعيد اللي لسه جاية
        ->orderBy('appointment_date', 'asc')
        ->orderBy('slot', 'asc')
        ->get();

    return response()->json($appointments);
}

public function updatePatientProfile(Request $request, $userId)
{
    $patient = Patient::where('user_id', $userId)->firstOrFail();

    $data = $request->only([
        'name',
        'age',
        'gender',
        'phone',
        'email',
        'password'
    ]);

    if ($request->filled('password')) {
        $data['password'] = Hash::make($request->password);
    }

    $patient->update($data);

    return response()->json([
        'message' => 'Patient profile updated successfully',
        'patient' => $patient,
    ]);
}
public function getByUserId($userId)
{
    $patient = Patient::where('user_id', $userId)->firstOrFail();
    return response()->json($patient);
}
public function getPatientProfile($id)
{
    $patient = Patient::findOrFail($id);
    return response()->json($patient);
}

public function updateByUserId(Request $request, $userId)
{
    $patient = Patient::where('user_id', $userId)->firstOrFail();

    $data = $request->only([
        'name', 'age', 'gender', 'phone', 'email', 'password'
    ]);

    if ($request->filled('password')) {
        $data['password'] = Hash::make($request->password);
    }

    $patient->update($data);

    return response()->json([
        'message' => 'Patient profile updated successfully',
        'patient' => $patient,
    ]);
}

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
