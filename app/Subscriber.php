<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = [
        'company_id',
        'calendar_id',
        'email',
        'name',
        'description',
        'status',
        'link-hash',
        'uuid'
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function calendar()
    {
        return $this->belongsTo('App\Calendar');
    }

    public function logs()
    {
        return $this->hasMany('App\SubscriberLog', 'subscriber_id');
    }
}
