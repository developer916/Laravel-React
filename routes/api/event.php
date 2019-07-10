<?php

Route::group(['middleware' => 'CheckMaintenance'], function() {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['middleware' => 'UserType'], function () {
            Route::post('gel', ['as' => 'gel', 'uses' => 'EventController@getEventShortLink']);
            Route::post('gebh', ['as' => 'gebh', 'uses' => 'EventController@getEventByHashCode']);
            Route::post('ge', ['as' => 'ge', 'uses' => 'EventController@getEvent']);
            Route::post('se', ['as' => 'se', 'uses' => 'EventController@storeEvent']);
            Route::post('de', ['as' => 'de', 'uses' => 'EventController@deleteEvent']);
            Route::post('ue', ['as' => 'ue', 'uses' => 'EventController@updateEvent']);
        });
    });
});