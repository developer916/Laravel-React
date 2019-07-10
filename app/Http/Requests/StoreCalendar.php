<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class StoreCalendar extends FormRequest
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
    public function rules(Request $request)
    {
        if($request->hasFile('image')){
            return [
                'company_id'            => 'required',
                'name'                  => 'required',
                'description'           => 'required',
                'image'                 => 'max:5120'
            ];
        } else {
            return [
                'company_id'            => 'required',
                'name'                  => 'required',
                'description'           => 'required',
            ];
        }

    }
}
