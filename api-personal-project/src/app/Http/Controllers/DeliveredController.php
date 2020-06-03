<?php

namespace App\Http\Controllers;

use App\Delivery;
use App\Delivered;

use Illuminate\Http\Request;

class DeliveredController extends Controller
{
    public function create(Request $request){
        $id = $request->id;
        $delivery = Delivery::where('id', $id)->first();
        $delivered = new Delivered;
  
        $delivered->user_id = $delivery->user_id;
        $delivered->delivery_name = $delivery->delivery_name;
        $delivered->deliver_name = $delivery->deliver_name;
        $delivered->client_name = $delivery->client_name;
        $delivered->client_email = $delivery->client_email;
        $delivered->client_direction = $delivery->client_direction;
        $delivered->client_phone = $delivery->client_phone;
        $delivered->latitude = $delivery->latitude;
        $delivered->longitud = $delivery->longitud;
  
        $delivered->save();
  
        (new DeliveryController)->destroy($request->id);
        return response()->json([
          'message' => 'Delivery handed Successfully!'
        ], 201);
      }
}
