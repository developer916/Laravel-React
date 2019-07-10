<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriberLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriber_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->integer('subscriber_id');
            $table->string('user_agent')->nullable();
            $table->string('location_la')->nullable();
            $table->string('location_lo')->nullable();
            $table->string('ip')->nullable();
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
        Schema::dropIfExists('subscriber_logs');
    }
}
