<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::pattern('fileName', '[A-Za-z0-9./-]+');
Route::get('ics/{fileName}', ['as' => 'ics',         'uses' => 'ICSController@getICS']);
//Route::prefix('admin')->group(function () {
//    Route::get('/', function(){
//       return redirect()->route('admin.login');
//    });
//    Route::get('login',                 ['as' => 'admin.login',             'uses' => 'Admin\LoginController@login']);
//    Route::post('doLogin',              ['as' => 'admin.doLogin',           'uses' => 'Admin\LoginController@postLogin']);
//    Route::get('logout',                ['as' => 'admin.logout',            'uses' => 'Admin\LoginController@logout']);
//    Route::group(['middleware' => 'SuperAdmin'], function() {
//        Route::get('companies',                       ['as' => 'admin.companies',         'uses' => 'Admin\CompanyController@index']);
//        Route::get('company/add',                     ['as' => 'admin.company.add',     'uses' => 'Admin\CompanyController@create']);
//        Route::get('company/edit/{id}',               ['as' => 'admin.company.edit',     'uses' => 'Admin\CompanyController@edit']);
//        Route::post('company/view' ,                  ['as' => 'admin.company.view',      'uses' =>'Admin\CompanyController@view']);
//        Route::post('company/store',                  ['as' => 'admin.company.store',   'uses' => 'Admin\CompanyController@store']);
//        Route::post('company/delete',                 ['as' => 'admin.company.delete',   'uses' => 'Admin\CompanyController@delete']);
//        Route::post('company/status',                 ['as' => 'admin.company.status',   'uses' => 'Admin\CompanyController@status']);
//
//        Route::get('users',                             ['as' =>'admin.users',                  'uses' =>'Admin\UserController@index']);
//        Route::get('user/add',                     ['as' => 'admin.user.add',     'uses' => 'Admin\UserController@create']);
//        Route::get('user/edit/{id}',               ['as' => 'admin.user.edit',     'uses' => 'Admin\UserController@edit']);
//        Route::post('user/view' ,                  ['as' => 'admin.user.view',      'uses' =>'Admin\UserController@view']);
//        Route::post('user/store',                  ['as' => 'admin.user.store',   'uses' => 'Admin\UserController@store']);
//        Route::post('user/delete',                 ['as' => 'admin.user.delete',   'uses' => 'Admin\UserController@delete']);
//        Route::get('logout',                            ['as' => 'admin.logout',            'uses' => 'Admin\LoginController@logout']);
//    });
//});

//
Route::get( '/{any}', function () {
    return view('index');
})->where('any', '.*');