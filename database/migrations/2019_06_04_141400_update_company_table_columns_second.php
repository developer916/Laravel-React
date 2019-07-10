<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateCompanyTableColumnsSecond extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company', function($table) {
            $table->longText('website')->nullable()->change();
            $table->longText('tax_id')->nullable()->change();
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
            $table->string('website')->nullable()->change();
            $table->string('tax_id')->nullable()->change();
        });
    }
}
