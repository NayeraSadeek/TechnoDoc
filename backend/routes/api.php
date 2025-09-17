<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\ApprovedAppointmentController;

use App\Http\Controllers\Api\PatientController;
// Route::get('/test', function () {
//     return response()->json(['message' => 'API working!']);
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/register/patient', [PatientController::class, 'register']);
Route::post('/register/doctor', [DoctorController::class, 'register']);

Route::post('/login/patient', [AuthController::class, 'loginPatient']);
Route::post('/login/doctor', [AuthController::class, 'loginDoctor']);
Route::post('/login',  [AuthController::class, 'login']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/doctor/{id}', [DoctorController::class, 'show']);
Route::get('/patient/{id}', [PatientController::class, 'show']);

// doctorcards
Route::get('/doctors', [DoctorController::class, 'index']);

// Availabale Times
Route::get('/doctors/{id}/available-times', [DoctorController::class, 'availableTimes']);

// Appointments
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::get('/appointments', [AppointmentController::class, 'index']);
Route::patch('/appointments/{id}/status', [AppointmentController::class, 'updateStatus']);

Route::get('patients/{id}/appointments', [AppointmentController::class, 'getAppointments']);
Route::get('/doctor/{doctorId}/approved_appointments', [AppointmentController::class, 'getApprovedAppointments']);
// Route::get('/patient/{patientId}/approved_appointments', [AppointmentController::class, 'getApprovedAppointmentsForPatient']);
Route::get('/patient/{patientId}/approved_appointments', [AppointmentController::class, 'getApprovedAppointments']);

// Route::patch('/approved_appointments/{id}/status', [AppointmentController::class, 'updateApprovedStatus']);
Route::patch('/approved_appointments/{id}/status', [ApprovedAppointmentController::class, 'updateStatus']);

//EditProfile
Route::put('/doctors/{id}', [DoctorController::class, 'update']);
Route::get('/doctors/{id}', [DoctorController::class, 'show']);


Route::put('/patients/{id}', [PatientController::class, 'updatePatientProfile']);
Route::get('/patients/{id}', [PatientController::class, 'getPatientProfile']); 
Route::get('/patients/user/{userId}', [PatientController::class, 'getByUserId']);

Route::put('/patients/user/{userId}', [PatientController::class, 'updatePatientProfile']);


Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
