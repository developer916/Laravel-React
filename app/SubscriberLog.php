<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubscriberLog extends Model
{
    protected $fillable = [
        'company_id',
        'subscriber_id',
        'user_agent',
        'location_la',
        'location_lo',
        'ip',
        'link_hash'
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function subscriber()
    {
        return $this->belongsTo('App\Subscriber');
    }
}
