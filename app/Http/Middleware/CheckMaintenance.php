<?php

namespace App\Http\Middleware;

use Closure;
use App\Maintenance;
use App\User;

class CheckMaintenance
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
        if($request->has('user_id')) {
            $user = User::where('id', $request->get('user_id'))->first();
        }else{
            $user = $request->user();
        }
        if($user) {
            $maintenaces = Maintenance::all();
            if(count($maintenaces) >0 ){
                $maintenace = $maintenaces[0]->confirm;
                if($maintenace == 'true'){
                    return response()->json('Unauthorized', 401);
                }
            }
            return $next($request);
        } else {
            return response()->json('Unauthorized', 401);
        }
    }
}
