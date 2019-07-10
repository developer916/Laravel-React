<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'company_id',
        'calendar_id',
        'summary',
        'description',
        'destination',
        'date_from',
        'date_to',
        'not1',
        'not2',
        'not3',
        'not',
        'hash_code',
        'short_link'
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function calendar()
    {
        return $this->belongsTo('App\Calendar');
    }

    public function reminders(){
        return $this->hasMany(EventReminder::class);
    }
}
