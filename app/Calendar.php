<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'description',
        'tags',
        'public',
        'status',
        'picture',
        'not',
        'hash_code'
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function events()
    {
        return $this->hasMany('App\Event', 'calendar_id');
    }

    public function subscribers()
    {
        return $this->hasMany('App\Subscriber', 'calendar_id');
    }

}
