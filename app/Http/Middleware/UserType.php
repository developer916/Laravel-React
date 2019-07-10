<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class UserType
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
        if($request->user()) {
            $user = User::where('id', $request->user()->id)->first();
            if($user->role =='user'){
                return response()->json('Unauthorized', 401);
            }
            return $next($request);
        }else{
            return response()->json('Unauthorized', 401);
        }
    }
}
