<?php

use Illuminate\Http\Request;
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

Route::group([
    'prefix' => 'auth'
  ], function () {
    Route::post('reset', 'Auth\AuthController@sendResetLinkEmail');
    Route::post('login', 'Auth\AuthController@login');
    Route::post('register', 'Auth\AuthController@register');
    
    Route::post('admin/create', 'DeliveryController@create');
    Route::post('user/delivered', 'DeliveredController@create');
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
      Route::get('logout', 'Auth\AuthController@logout');
      Route::get('user', 'Auth\AuthController@user');
      Route::get('admin/workers', 'HomeController@getWorkers');
      Route::get('admin/deliveries/{id}', 'HomeController@getDeliveries');
      Route::get('admin/delivered/{id}', 'HomeController@getDelivered');
      Route::get('user/delivered/{id}', 'HomeController@getDelivered');
    });
  });