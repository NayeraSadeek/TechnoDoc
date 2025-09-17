<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
         $table->id();
         $table->unsignedBigInteger('patient_id');
        $table->unsignedBigInteger('doctor_id');
        $table->date('appointment_date');
        $table->enum('status', ['pending', 'approved', 'canceled'])->default('pending');
        $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
        $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
        $table->foreign('slot_id')->references('id')->on('doctor_available_times')->onDelete('cascade');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
