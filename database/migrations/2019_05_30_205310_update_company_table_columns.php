<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateCompanyTableColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company', function($table) {
            $table->longText('name')->change();
            $table->longText('street')->change();
            $table->longText('postal_code')->change();
            $table->longText('city')->change();
            $table->longText('country')->change();
            $table->longText('phone')->change();
            $table->longText('email')->change();
            $table->longText('iban')->change();
            $table->longText('bic')->change();
            $table->longText('smtp_server')->change();
            $table->longText('smtp_user')->change();
            $table->longText('smtp_password')->change();
            $table->longText('smtp_from_email')->change();
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
            $table->string('name')->change();
            $table->string('street')->change();
            $table->string('postal_code')->change();
            $table->string('city')->change();
            $table->string('country')->change();
            $table->string('phone')->change();
            $table->string('email')->change();
            $table->string('iban')->change();
            $table->string('bic')->change();
            $table->string('smtp_server')->change();
            $table->string('smtp_user')->change();
            $table->string('smtp_password')->change();
            $table->string('smtp_from_email')->change();
        });
    }
}
