<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateLicenseModelsAddFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('license_models', function($table) {
            $table->integer('number_of_calendars')->default(0)->nullable();
            $table->integer('number_of_events')->default(0)->nullable();
            $table->integer('number_of_subscribers')->default(0)->nullable();
            $table->integer('enabled_html')->default(0)->nullable();
            $table->integer('enabled_website')->default(0)->nullable();
            $table->integer('enabled_social')->default(0)->nullable();
            $table->string('enabled_function')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('license_models', function($table) {
            $table->dropColumn('number_of_calendars');
            $table->dropColumn('number_of_events');
            $table->dropColumn('number_of_subscribers');
            $table->dropColumn('enabled_html');
            $table->dropColumn('enabled_website');
            $table->dropColumn('enabled_social');
            $table->dropColumn('enabled_function');
        });
    }
}
