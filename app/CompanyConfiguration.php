<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompanyConfiguration extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}
