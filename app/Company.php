<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'company';

    protected $fillable = [
        'name',
        'street',
        'postal_code',
        'city',
        'country',
        'phone',
        'email',
        'website',
        'tax_id',
        'iban',
        'bic',
        'license_model',
        'license_expire_date',
        'salesforce',
        'smtp_server',
        'smtp_user',
        'smtp_password',
        'smtp_from_email',
        'description',
        'status',
        'search_name'
    ];

    public function user()
    {
        return $this->hasOne('App\User', 'company_id');
    }

    public function calenders()
    {
        return $this->hasMany('App\Calendar', 'company_id');
    }

    public function events()
    {
        return $this->hasMany('App\Event', 'company_id');
    }

    public function subscribers()
    {
        return $this->hasMany('App\Subscriber', 'company_id');
    }

    public function subscriberLogs()
    {
        return $this->hasMany('App\SubscriberLog', 'company_id');
    }

    public function companyConfiguration()
    {
        return $this->hasOne('App\CompanyConfiguration', 'company_id');
    }

    public function licenseModel() {
        return $this->hasOne('App\LicenseModel', 'id', 'license_model');
    }
}
