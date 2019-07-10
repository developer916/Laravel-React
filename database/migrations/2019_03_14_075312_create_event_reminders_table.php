<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventRemindersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_reminders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->integer('calendar_id');
            $table->integer('event_id');
            $table->string('unit')->nullable();
            $table->integer('time')->default(0)->nullable();
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
        Schema::dropIfExists('event_reminders');
    }
}
