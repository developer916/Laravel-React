<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateCalendarHashCode extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('calendars', function($table) {
            $table->string('hash_code')->nullable();
        });

        Schema::table('events', function($table) {
            $table->dropColumn('hash_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('calendars', function($table) {
            $table->dropColumn('hash_code');
        });

        Schema::table('events', function($table) {
            $table->string('hash_code')->nullable();

        });
    }
}
