<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->text('reason')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('price', 8, 2)->nullable();
            $table->timestamps();

            $table->unique(['doctor_id', 'appointment_date', 'appointment_time']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};