<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateMapAnalyseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('map_analyse', function($table) {
            $table->string('code')->nullable();
            $table->string('name')->nullable();
            $table->integer('company_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('map_analyse', function($table) {
            $table->dropColumn('code');
            $table->dropColumn('name');
            $table->dropColumn('company_id');
        });
    }
}
