<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;

use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response as Psr7Response;
use App\User;
class LoginController extends Controller
{
    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6'
        ], [
            'email.exists' => 'The user credentials were incorrect.'
        ]);
         $user = User::where('email', $request->email)->first();
         if($user){

            if(\Hash::check($request->password, $user->password)){

                if($user->status == 'active') {
                    $http = new Client;

                    $response = $http->post(env('APP_URL') . '/oauth/token', [
                        'form_params' => [
                            'grant_type' => 'password',
                            'client_id' => env('PASSWORD_CLIENT_ID'),
                            'client_secret' => env('PASSWORD_CLIENT_SECRET'),
                            'username' => $request->get('email'),
                            'password' => $request->get('password'),
                            'remember' => $request->get('remember'),
                            'scope' => '',
                        ],
                    ]);
                    $data = json_decode((string)$response->getBody());
					if($user->company){
						$user->company = $this->decryptCompany($user->company);
					}
                    $user->name = decrypt($user->name);
                    if ($user->role === 'company') {
                        $license = $user->company->licenseModel;
                        return response()->json(['data' => $data, 'user'=> $user, 'license' => $license], 200);
                    }
                    return response()->json(['data' => $data, 'user'=> $user], 200);

                }else if($user->status =='inactive'){
                    return response()->json([
                        'error' => 'invalid_credentials',
                        'message' => "Your account has been suspended, please contact Customer Support."
                    ], 401);
                }else{
                    return response()->json([
                        'error' => 'invalid_credentials',
                        'message' => "You have to verify your email address."
                    ], 401);
                }
            }else{
                return response()->json([
                    'error' => 'invalid_credentials',
                    'message' => "The user credentials were incorrect"
                ], 401);
            }
         }else{
            return response()->json([
                'error' => 'invalid_credentials',
                'message' => "The user credentials were incorrect"
            ], 401);

         }
//        try {
//            $http = new Client;
//
//            $response = $http->post(env('APP_URL') . '/oauth/token', [
//                'form_params' => [
//                    'grant_type' => 'password',
//                    'client_id' => env('PASSWORD_CLIENT_ID'),
//                    'client_secret' => env('PASSWORD_CLIENT_SECRET'),
//                    'username' => $request->get('email'),
//                    'password' => $request->get('password'),
//                    'remember' => $request->get('remember'),
//                    'scope' => '',
//                ],
//            ]);
//
//                return json_decode((string)$response->getBody(), true);
//        } catch (\Exception $e) {
//            return response()->json([
//                'error' => 'invalid_credentials',
//                'message' => "{$e->getCode()}: {$e->getMessage()}"
//            ], 401);
//        }
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();

        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        return response()->json([], 201);
    }

	 public function decryptCompany($company){
			if($company){
				$company->name = decrypt($company->name);
				$company->street = decrypt($company->street);
				$company->postal_code = decrypt($company->postal_code);
				$company->city = decrypt($company->city);
				if($company->country != "" && $company->country != null) {
					$company->country = decrypt($company->country);
				}
				$company->phone = decrypt($company->phone);

				if($company->email != "" && $company->email != null){
					$company->email = decrypt($company->email);
				}

				if($company->iban != "" && $company->iban != null){
					$company->iban = decrypt($company->iban);
				}

				if($company->bic != "" && $company->bic != null){
					$company->bic = decrypt($company->bic);
				}

				if($company->smtp_server != "" && $company->smtp_server != null){
					$company->smtp_server = decrypt($company->smtp_server);
				}

				if($company->smtp_user != "" && $company->smtp_user != null){
					$company->smtp_user = decrypt($company->smtp_user);
				}

				if($company->smtp_password != "" && $company->smtp_password != null){
					$company->smtp_password = decrypt($company->smtp_password);
				}

				if($company->smtp_from_email != "" && $company->smtp_from_email != null){
					$company->smtp_from_email = decrypt($company->smtp_from_email);
				}

				if($company->website !="" && $company->website != null){
					$company->website = decrypt($company->website);
				}

				if($company->tax_id !="" && $company->tax_id != null){
					$company->tax_id = decrypt($company->tax_id);
				}
			}
			return $company;
		}

}
