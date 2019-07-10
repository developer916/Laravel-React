<?php


Route::group(['middleware' => 'auth:api'], function() {
    Route::group(['middleware' => 'SuperAdmin'], function () {
        Route::post('ul',   ['as' => 'ul', 'uses' =>'AdminController@userList']);
        Route::post('su',  ['as' => 'su', 'uses' =>'AdminController@storeUser']);
        Route::post('gu',  ['as' => 'gu', 'uses' =>'AdminController@getUser']);
        Route::post('du',  ['as' => 'du', 'uses' =>'AdminController@deleteUser']);
        Route::post('dau', ['as' => 'dau', 'uses' =>'AdminController@deactivateUser']);

        Route::post('pc',  ['as' => 'pc', 'uses' =>'AdminController@updatePassword']);
        Route::post('pm',  ['as' => 'pm', 'uses' =>'AdminController@updateMaintenance']);
        Route::post('gm',  ['as' => 'gm', 'uses' =>'AdminController@getMaintenance']);

        Route::get('ca',   ['as' => 'ca', 'uses' => 'AdminController@getCategories']);
        Route::get('gcag', ['as' => 'gcag','uses' => 'AdminController@getCategory']);
        Route::post('sca', ['as' => 'sca','uses' => 'AdminController@storeCategory']);
        Route::post('dca', ['as' => 'dca','uses' => 'AdminController@deleteCategory']);



        Route::get('cl',   ['as' => 'cl', 'uses' =>'AdminController@companyList']);
        Route::get('gc',   ['as' => 'gc', 'uses' =>'AdminController@getCompany']);
        Route::post('dc',  ['as' => 'dc', 'uses' =>'AdminController@deleteCompany']);
        Route::post('sc',  ['as' => 'sc', 'uses' =>'AdminController@storeCompany']);
        Route::post('dac', ['as' => 'dc', 'uses' =>'AdminController@deactivateCompany']);
        Route::post('scl', ['as' => 'scl','uses' =>'AdminController@setCompanyLicenseModel']);

        Route::get('gcs',  ['as' => 'gcs','uses' =>'AdminController@getCompanySettings']);
        Route::post('ucs', ['as' => 'ucs','uses' =>'AdminController@updateCompanySettings']);

        Route::post('slm', ['as' => 'slm','uses' =>'AdminController@storeLicenseModel']);
        Route::get('glm',  ['as' => 'glm','uses' =>'AdminController@getLicenseModel']);
        Route::post('dlm', ['as' => 'dlm','uses' =>'AdminController@deleteLicenseModel']);
        Route::post('lm',  ['as' => 'lm', 'uses' =>'AdminController@getAllLicenseModel']);

        Route::get('gca', ['as' => 'gca', 'uses' => 'AdminController@getCalendars']);
        Route::post('gs', ['as' => 'gs',  'uses' => 'AnalyseController@getSubscribers']);
    });
});