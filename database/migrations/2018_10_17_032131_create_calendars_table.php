<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCalendarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendars', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->string('tags')->nullable();
            $table->string('picture')->nullable();
            $table->enum('public', ['true', 'false']);
            $table->enum('status', ['true', 'false']);
            $table->enum('not', ['true', 'false']);
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
        Schema::dropIfExists('calendars');
    }
}
