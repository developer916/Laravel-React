<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapCountry extends Model
{
    protected $table = 'map_countries';

    protected $fillable = ['code','name'];

}

