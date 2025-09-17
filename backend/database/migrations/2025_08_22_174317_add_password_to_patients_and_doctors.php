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
          Schema::table('patients', function (Blueprint $table) {
            if (!Schema::hasColumn('patients', 'password')) {
                $table->string('password')->after('email');
            }
        });

           Schema::table('doctors', function (Blueprint $table) {
            if (!Schema::hasColumn('doctors', 'password')) {
                $table->string('password')->after('email');
            }
        });
   
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            if (Schema::hasColumn('patients', 'password')) {
                $table->dropColumn('password');
            }
        });

        Schema::table('doctors', function (Blueprint $table) {
            if (Schema::hasColumn('doctors', 'password')) {
                $table->dropColumn('password');
            }
        });
    }
};
