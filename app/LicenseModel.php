<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LicenseModel extends Model
{
    protected $table = 'license_models';

    protected $fillable = [
        'name',
        'description',
        'price',
        'language',
        'number_of_calendars',
        'number_of_events',
        'number_of_subscribers',
        'enabled_html',
        'enabled_website',
        'enabled_social',
        'enabled_function'
    ];

}
