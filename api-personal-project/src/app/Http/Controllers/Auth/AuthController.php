<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login (Request $request){
      $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
      ]);
      $credentials = request(['email', 'password']);
      if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
      $user = $request->user();
      $tokenResult = $user->createToken('Personal Access Token');
      $token = $tokenResult->token;
      if ($request->remember_me)
          $token->expires_at = Carbon::now()->addWeeks(1);
      $token->save();
      return response()->json([
          'access_token' => $tokenResult->accessToken,
          'token_type' => 'Bearer',
          'expires_at' => Carbon::parse(
              $tokenResult->token->expires_at
          )->toDateTimeString()
      ]);
    }

    public function sendResetLinkEmail(Request $request){
      (new ForgotPasswordController)->sendResetLinkEmail($request);
      return response()->json([
        'message' => 'Email sended Successfully!'
      ], 201);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->admin = $request->admin;
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}