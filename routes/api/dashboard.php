<?php

Route::post('pc', ['as' => 'pc', 'uses' => 'DashboardController@getPublicCalendar']);
Route::get('gc', ['as' => 'gc', 'uses' => 'DashboardController@getCompanies']);
Route::post('vc',['as' => 'gc', 'uses' => 'DashboardController@ViewCalendar']);
Route::post('an',['as' => 'an', 'uses' => 'DashboardController@subscribeCalendar']);
Route::post('gm',['as' => 'gm', 'uses' => 'DashboardController@getMapData']);
Route::post('gebh',  ['as' => 'gebh', 'uses' => 'DashboardController@getEventByHashCode']);
Route::post('ss',  ['as' => 'ss', 'uses' => 'DashboardController@storeSubscriber']);
Route::post('us',  ['as' => 'us', 'uses' => 'DashboardController@updateSubscriberLogs']);
Route::post('gh',  ['as' => 'gh', 'uses' => 'DashboardController@getHtmlGenerate']);
Route::get('gma',  ['as' =>'gma',  'uses' => 'DashboardController@getMaintenance']);
Route::get('gca',  ['as' =>'gca', 'uses' => 'DashboardController@getCategories']);