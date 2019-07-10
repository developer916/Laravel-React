<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapAnalyse extends Model
{
    protected $table = 'map_analyse';
    protected $fillable = ['calendar_id','uuid', 'ip','code','name','company_id'];
}
