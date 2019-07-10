<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSmtpCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company', function($table) {
            $table->string('smtp_server')->nullable();
            $table->string('smtp_user')->nullable();
            $table->string('smtp_password')->nullable();
            $table->string('smtp_from_email')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company', function($table) {
            $table->dropColumn('smtp_server');
            $table->dropColumn('smtp_user');
            $table->dropColumn('smtp_password');
            $table->dropColumn('smtp_from_email');
        });
    }
}
