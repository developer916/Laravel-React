<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::pattern('id', '[A-Za-z0-9]+');

Route::post('login', 'Auth\LoginController@login')->name('auth.login');
Route::post('confirmation', 'Auth\RegisterController@confirmation')->name('auth.confirmation');
Route::post('forgot_password', 'Auth\RegisterController@forgotPassword')->name('auth.forgotPassword');
Route::post('set_password', 'Auth\RegisterController@setPassword')->name('auth.setPassword');
Route::post('register', 'Auth\RegisterController@register')->name('auth.register');

Route::group(['middleware' => 'auth:api'], function() {
    Route::delete('/logout', 'Auth\LoginController@logout')->name('auth.logout');;

    Route::get('/user', 'UserController@authUser')->name('auth.getUser');
});