<?php

Route::group([
    'prefix'    => 'settings',
    'as'        => 'settings'
], function () {
    Route::group(['middleware' => 'CheckMaintenance'], function(){

        Route::post('ca',  ['as' => 'ca',  'uses' => 'CompanyController@updateCompanyAddress']);
        Route::post('cbi', ['as' => 'cbi', 'uses' => 'CompanyController@updateCompanyBankInformation']);

        Route::group(['middleware' => 'auth:api'], function() {
            Route::post('csi', ['as' => 'csi', 'uses' => 'CompanyController@storeCompanySmtpInformation']);
            Route::post('pc',  ['as' => 'pc',  'uses' => 'CompanyController@updatePassword']);
            Route::post('gd',  ['as' => 'gd',  'uses' => 'CompanyController@getDashboardData']);
            Route::post('ge',  ['as' => 'ge',  'uses' => 'CompanyController@getEvents']);
            Route::post('gec', ['as' => 'gec', 'uses' => 'CompanyController@getEventByCalendar']);
            Route::post('gc',  ['as' => 'gc',  'uses' => 'CompanyController@getCompanyInfo']);
        });
    });

});

Route::group(['middleware' => 'CheckMaintenance'], function() {
    Route::group(['middleware' => 'auth:api'], function () {

        Route::post('gh', ['as' => 'gh', 'uses' => 'HtmlGenerateController@getHtmlGenerate']);

        Route::group(['middleware' => 'UserType'], function () {
            Route::post('ul', ['as' => 'ul', 'uses' => 'UserController@userList']);
            Route::post('su', ['as' => 'su', 'uses' => 'UserController@storeUser']);
            Route::post('gu', ['as' => 'gu', 'uses' => 'UserController@getUser']);
            Route::post('du', ['as' => 'du', 'uses' => 'UserController@deleteUser']);
            Route::post('sus', ['as' => 'sus', 'uses' => 'UserController@storeUserStatus']);


            //subscribers & subscribe logs
            Route::post('gs', ['as' => 'gs', 'uses' => 'SubscriberManagerController@getSubscribers']);
            Route::get('gsi', ['as' => 'gsi', 'uses' => 'SubscriberManagerController@getSubscriber']);
            Route::post('ds', ['as' => 'ds', 'uses' => 'SubscriberManagerController@deleteSubscriber']);
            Route::post('ss', ['as' => 'ss', 'uses' => 'SubscriberManagerController@storeSubscribe']);
            Route::post('gsl', ['as' => 'gsl', 'uses' => 'SubscriberManagerController@getSubscribeLogs']);

            //html generate
            Route::post('sh', ['as' => 'sh', 'uses' => 'HtmlGenerateController@storeHtmlGenerate']);
        });
    });
});