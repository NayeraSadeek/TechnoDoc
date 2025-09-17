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
        Schema::create('approved_appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('appointment_id')->unique(); 
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('doctor_id');
            $table->date('appointment_date');
            $table->string('slot');
            $table->string('issue');
            $table->string('paymentmethod');
   $table->enum('status', ['waiting', 'completed',  'no-show'])
              ->default('waiting')
              ->change();
            $table->timestamps();
              $table->foreign('appointment_id')->references('id')->on('appointments')->onDelete('cascade');
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
   Schema::table('approved_appointments', function (Blueprint $table) {
        $table->enum('status', ['approved', 'canceled'])
              ->default('approved')
              ->change();
    });    }
};
