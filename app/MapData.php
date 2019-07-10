<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapData extends Model
{
    protected $table = 'map_data';
    protected $fillable = ['calendar_id','code', 'name', 'value'];
}
