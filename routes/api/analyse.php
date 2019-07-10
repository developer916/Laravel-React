<?php
Route::group(['middleware' => 'CheckMaintenance'], function() {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('gs', ['as' => 'gs', 'uses' => 'AnalyseController@getSubscribers']);
        Route::group(['middleware' => 'UserType'], function () {
            Route::post('gm', ['as' => 'gm', 'uses' => 'AnalyseController@getMapData']);
        });
    });
});