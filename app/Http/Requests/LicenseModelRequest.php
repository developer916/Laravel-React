<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LicenseModelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' =>'required',
            'description' =>'required',
            'price' =>'required',
            'number_of_calendars' =>'required|numeric',
            'number_of_events' =>'required|numeric',
            'number_of_subscribers' =>'required|numeric',
        ];
    }
}
