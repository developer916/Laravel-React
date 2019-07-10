<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyConfigurationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_configurations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->string('default_email')->nullable();
            $table->string('default_private')->nullable();
            $table->string('default_calendar_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_configurations');
    }
}
