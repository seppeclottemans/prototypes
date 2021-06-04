<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function index(){
        return view('index');
    }

    public function multiply(Request $request){
        return response()->json([
            'result' => $request['number'] * $request['number']
        ]);
    }

    public function save(Request $request){
        Storage::disk( "local" )->put('file.txt', "text: {$request['text']}");

        return response('saved successfully.', 200)->header('Content-Type', 'text/plain');
    }
}
