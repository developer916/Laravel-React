<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventReminder extends Model
{
    protected $fillable = [
        'company_id',
        'calendar_id',
        'event_id',
        'unit',
        'time',
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function calendar()
    {
        return $this->belongsTo('App\Calendar');
    }

    public function event(){
        return $this->belongsTo('App\Event');
    }
}
