<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstName')->after('id');
            $table->string('lastName')->after('firstName');
            $table->string('phone')->nullable()->after('email');
            $table->enum('role', ['patient', 'doctor', 'admin'])->default('patient')->after('phone');
            $table->dropColumn('name');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->after('id');
            $table->dropColumn(['firstName', 'lastName', 'phone', 'role']);
        });
    }
};