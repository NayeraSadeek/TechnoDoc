<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Patient;
use App\Models\Doctor;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\DoctorAppointment;
use Illuminate\Support\Facades\DB;   //
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // // validate
        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|email|unique:users',
        //     'password' => 'required|min:6',
        //     'role' => 'required|in:patient,doctor',
        // ]);
    dd($request->all());

        // create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // if role = patient, create patient profile
        if ($user->role === 'patient') {
            Patient::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password) 

            ]);
        }


        //  $doctor=null;
        // if role = doctor, create doctor profile
        if ($user->role === 'doctor') {
          $doctor=  Doctor::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
            ]);
        
//  هباصيله ك موديل 
if ($request->has('doctorappointment') && is_array($request->doctorappointment)) {
    foreach ($request->doctorappointment as $appointment) {
        // \Log::info("Saving appointment", $appointment);

        DoctorAppointment::create([
            'doctor_id'  => $doctor->id,
            'day'        => $appointment['day'],
            'start_time' => $appointment['start_time'],
            'end_time'   => $appointment['end_time'],
        ]);
    }
}

        }
        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'user' => $user
        ],201);

    }



 public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

      // Logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}

