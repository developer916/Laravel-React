<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

use App\User;

class SuperAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        if(Auth::user()) {
//            if(Auth::user()->role != 'admin') {
//                return redirect()->route('admin.login');
//            }else {
//                return $next($request);
//            }
//        }else{
//            return redirect()->route('admin.login');
//        }
        if($request->user()) {
            $user = User::where('id', $request->user()->id)->first();
            if($user->role !='admin'){
                return response()->json('Unauthorized', 401);
            }
            return $next($request);
        }else{
            return response()->json('Unauthorized', 401);
        }
    }
}
