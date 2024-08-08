<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    

    public static function register($start, $end, $time_taken, $ip_address, $status, $req_type){
        ModelsRequest::create([
           'start' => $start,
           'end' => $end,
           'time_taken' => $time_taken,
           'ip_address' => $ip_address,
           'status' => $status ,
           'type' => $req_type
        ]);
    }

}
