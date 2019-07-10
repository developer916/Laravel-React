<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUser;
use App\Http\Requests\UserRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class UserController extends Controller
{
    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->validated());

        return response()->json([
            'user' => $user
        ], 201);
    }

    public function userList(Request $request){
        $user = $request->user();
        if($user->role == "company"){
            $users = User::where('company_id' , $user->company_id)->where('role', 'user')->get();
            if(count($users)>0){
                foreach ($users as $key => $user){
                    $user->name = decrypt($user->name);
                }
            }
            return response()->json(['status' =>'success', 'users' => $users], 200);
        } else {
            return response()->json(['status' =>'failed'], 401);
        }
    }

    public function getUser(Request $request){
        $user = User::where('id', $request->id)->first();
        if($user){
            $user->name = decrypt($user->name);
        }
        return response()->json(['status' => 'success', 'user' => $user], 200);
    }

    public function authUser(Request $request) {
        $user = $request->user();
        if ($user->role === 'company') {
            $license = $user->company->licenseModel;
            return response()->json(['status' => 'success', 'user'=> $user, 'license' => $license], 200);
        }
        return response()->json(['status' => 'success', 'user'=> $user], 200);
    }

    public function storeUser(StoreUser $request){
        $data = $request->all();
        $user = "";
        if($request->has('change_password') ) {
            unset($data['change_password']);
        }
        $data['name'] = encrypt($data['name']);
        if($request->user_id) {
            unset($data['user_id']);

//            User::where('id', $request->user_id)->update($data);
            if($request->has('change_password')  && $request->get('change_password') == 1){
                User::where('id', $request->user_id)->update([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' =>bcrypt($data['password']),
                    'company_id' => $data['company_id'],
                    'status' => $data['status'],
                    'role' => $data['role']

                ]);
            } else {
//                if($request->has('name')){
//                    User::where('id', $request->user_id)->update([
//                        'name' => $data['name'],
//                        'email' => $data['email'],
//                        'company_id' => $data['company_id'],
//                        'status' => $data['status'],
//                        'role' => $data['role']
//                    ]);
//                }
                 User::where('id', $request->user_id)->update($data);
            }
            $user=  User::where('id', $request->user_id)->first();
        }else{
            $user = User::create([
                'name'          => $data['name'],
                'email'         => $data['email'],
                'password'      => bcrypt($data['password']),
                'company_id'    => $data['company_id'],
                'status'        => $data['status'],
                'role'          => $data['role']
            ]);
        }
        if($user){
            $user->name = decrypt($user->name);
        }
        return response()->json(['status' => 'success', 'user' => $user], 200);
    }

    public function deleteUser(Request $request){
        $user = $request->user();
        if($user->role == "company"){
            User::where('id', $request->user_id)->delete();
            return response()->json(['status' =>'success', 'user_id' => $request->user_id], 200);
        } else {
            return response()->json(['status' =>'failed'], 401);
        }
    }

    public function storeUserStatus(Request $request){
        $user = $request->user();
        if($user->role == "company"){
            $user = User::where('id', $request->get('user_id'))->where('company_id', $request->get('company_id'))->first();
            if($user){
                $user->update([
                    'status' => $request->get('status')
                ]);
                return response()->json(['status' => 'success', 'user' => $user], 200);
            } else{
                return response()->json(['status' =>'failed'], 401);
            }
        } else{
            return response()->json(['status' =>'failed'], 401);
        }
    }

}
