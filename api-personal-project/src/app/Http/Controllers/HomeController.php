<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Delivery;
use App\Delivered;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    /**
     * Get Deliveries
     */
    public function getDeliveries($id)
    {
      $deliveries = Delivery::where('user_id', $id)->get();
      return $deliveries;
    }

    /**
     * Get Delivered
     */
    public function getDelivered($id)
    {
        $delivered = Delivered::where('user_id', $id)->get();
        return $delivered;
    }

    /**
     * Get all Workers
     */

    public function getWorkers()
    {
        $users = User::where('admin', 0)->get();
        return $users;
    }
}
