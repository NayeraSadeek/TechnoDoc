<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ApprovedAppointment;

class ApprovedAppointmentController extends Controller
{
     public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:waiting,completed,no-show',
        ]);

        // $appointment = ApprovedAppointment::findOrFail($id);
        $appointment = ApprovedAppointment::where('appointment_id', $id)->firstOrFail();

        $appointment->status = $request->status;
        $appointment->save();

        return response()->json([
            'message' => 'Approved appointment status updated successfully',
            'appointment' => $appointment
        ]);
    }
}
