<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CalendarCategory extends Model
{
    protected $fillable = [
        'company_id',
        'calendar_id',
        'category_id'
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function calendar()
    {
        return $this->belongsTo('App\Calendar');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
