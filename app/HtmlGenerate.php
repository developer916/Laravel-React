<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HtmlGenerate extends Model
{
    protected $fillable = [
        'company_id',
        'type',
        'html_code',
        'html_json',
        'calendar_id'
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function calendar()
    {
        return $this->belongsTo('App\Calendar');
    }
}
