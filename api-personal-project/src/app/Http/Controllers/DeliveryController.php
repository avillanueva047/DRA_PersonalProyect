<?php

namespace App\Http\Controllers;

use App\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function index()
    {
        $data = Delivery::all();
        return response()->json([
          'message' => 'Deliveries retrieved Successfully!'
        ], 201);;
    }

    public function create(Request $request){
        $request->validate([
            'user_id' => 'required',
            'deliver_name' => 'required',
            'delivery_name' => 'required',
            'client_name' => 'required',
            'client_email' => 'required | email',
            'client_direction' => 'required',
            'client_phone' => 'required | regex:/[0-9]{9}/',
            'latitude' => 'required',
            'longitud' => 'required'
        ]);

        Delivery::create($request->all());

        return response()->json([
          'message' => 'Delivery created Successfully!'
        ], 201);
      }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Delivery  $delivery
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Delivery::where('id', $id)->delete();

        return response()->json([
          'message' => 'Delivery deleted Successfully!'
        ], 201);
    }
}
