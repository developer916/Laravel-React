<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;

class AdminStoreUser extends FormRequest
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
        if($request->has('change_password') && $request->get('change_password') == 1) {
            return [
                'name' => 'required|min:3',
                'email' => 'required|email|unique:users,email,'.$this->user_id,
                'password' => 'required|min:6|confirmed',
                'password_confirmation' => 'required|min:6',
                'company_id' =>'required',
                'role' =>'required',
                'status' =>'required'
            ];
        } else{
            return [
                'name' => 'required|min:3',
                'email' => 'required|email|unique:users,email,'.$this->user_id,
                'company_id' =>'required',
                'role' =>'required',
                'status' =>'required'
            ];
        }

    }
}
