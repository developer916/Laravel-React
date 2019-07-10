<?php
Route::group(['middleware' => 'CheckMaintenance'], function() {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('lv', ['as' => 'lv', 'uses' => 'CalendarController@listView']);
        Route::post('vc', ['as' => 'vc', 'uses' => 'CalendarController@ViewCalendar']);
        Route::group(['middleware' => 'UserType'], function () {
            Route::post('sc', ['as' => 'sc', 'uses' => 'CalendarController@storeCalendar']);
            Route::post('dc', ['as' => 'dc', 'uses' => 'CalendarController@deleteCalendar']);
            Route::post('gc', ['as' => 'gc', 'uses' => 'CalendarController@getCalendar']);
        });
    });
});