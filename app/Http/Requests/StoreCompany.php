<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompany extends FormRequest
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
            'name'          => 'required',
            'street'        => 'required',
            'postal_code'   => 'required|min:5',
            'city'          => 'required|min:2',
            'country'       => 'required|min:2',
            'phone'         => 'required|min:10',
            'email'         => 'nullable|email',
            'iban'          => 'required',
            'bic'           => 'required',
            'status'        => 'required'
        ];
    }
}
