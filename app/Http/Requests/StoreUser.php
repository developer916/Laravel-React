<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
class StoreUser extends FormRequest
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
                'role' =>'required',
                'status' => 'required'
            ];
        } else {
            return [
                'name' => 'required|min:3',
                'email' => 'required|email|unique:users,email,'.$this->user_id,
                'role' =>'required',
                'status' => 'required'
            ];
        }
    }
}
