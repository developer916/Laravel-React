<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// default name space for all routes is 'App\Http\Controllers\Api'
$api_version = config('api.api_version');

Route::group(["prefix" => "{$api_version}"], function() {
    // register auth routes
    Route::prefix('auth')
        ->group(base_path('routes/api/auth.php'));
    // register users routes
    Route::prefix('users')
        ->group(base_path('routes/api/users.php'));
    // register articles routes
    Route::prefix('articles')
        ->group(base_path('routes/api/articles.php'));
    // companies routes
    Route::prefix('companies')
        ->group(base_path('routes/api/companies.php'));
    // calendar routes
    Route::prefix('calendar')
        ->group(base_path('routes/api/calendar.php'));
    // event routes
    Route::prefix('event')
        ->group(base_path('routes/api/event.php'));
    // admin routes
    Route::prefix('admin')
        ->group(base_path('routes/api/admin.php'));
    Route::prefix('dashboard')
        ->group(base_path('routes/api/dashboard.php'));
    Route::prefix('analyse')
        ->group(base_path('routes/api/analyse.php'));
});
