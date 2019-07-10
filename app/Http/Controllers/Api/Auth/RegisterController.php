<?php

namespace App\Http\Controllers\Api\Auth;

use App\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordPost;
use App\Http\Requests\StoreSetNewPassword;
use App\Jobs\EmailSend;
use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
Use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Crypt;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
        ], [
            'password.confirmed' => 'The password does not match.'
        ]);
        try {
            event(new Registered($user = $this->create($request->all())));


//            $http = new Client;
//
//            $response = $http->post(env('APP_URL') . '/oauth/token', [
//                'form_params' => [
//                    'grant_type' => 'password',
//                    'client_id' => env('PASSWORD_CLIENT_ID'),
//                    'client_secret' => env('PASSWORD_CLIENT_SECRET'),
//                    'username' => $request->get('email'),
//                    'password' => $request->get('password'),
//                    'remember' => false,
//                    'scope' => '',
//                ],
//            ]);
//
//            return json_decode((string)$response->getBody(), true);
            if($user){
                $user->name = decrypt($user->name);
            }
            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getCode(), $e->getTrace());
            return response()->json([
                "error" => "invalid_credentials",
                "message" => "The user credentials were incorrect."
            ], 401);
        }
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name'          => encrypt($data['name']),
            'email'         => $data['email'],
            'password'      => bcrypt($data['password']),
            'company_id'    => 0, // as default - no company yet
            'status'        => 'inactive'
        ]);
    }

    public function confirmation(Request $request){
        $token = $request->get('token');
        $user = User::where('remember_token', $token)->get();

        if(count($user) >0){
            User::where('id', $user[0]->id)->update([
                'status' =>'active'
            ]);
            if($user[0]->role == "company"){
                Company::where('id', $user[0]->company_id)->update([
                    'status' =>'active'
                ]);
            }
            return response()->json(['status' =>'success'], 200);
        }else{
            return response()->json(['status' =>'failed'], 401);
        }
    }

    public function forgotPassword(ForgotPasswordPost $request){
        $user = User::where('email', $request->get('email'))->first();
        if($user) {
            $forgotPasswordLink =URL::to('/').'/forgot_password/'.$user->remember_token;
            $subject = trans('passwords.forgot_password');
            $message = trans('passwords.forgot_password_message', ['link' => $forgotPasswordLink]);
            $this->dispatch(new EmailSend($user, $subject, $message));
            return response()->json(['status' =>'success'], 200);
        }else{
            return response()->json(['status' =>'failed'], 401);
        }
    }

    public function setPassword(StoreSetNewPassword $request){
        $token = $request->get('token');
        $user = User::where('remember_token', $token)->get();

        if(count($user) >0){
            User::where('id', $user[0]->id)->update([
                'password' =>bcrypt($request->get('password'))
            ]);
            return response()->json(['status' =>'success'], 200);
        }else{
            return response()->json(['status' =>'failed'], 401);
        }
    }
}
