<?php

use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/status", function(Request $request){
    return response("Working", 200);
});

Route::post("/upload", [FileController::class, "create"]);

Route::get("/file/{teles3_file_id}", [FileController::class, "getTelegramFileId"]);

Route::get("/fileexists/{teles3_file_id}", [FileController::class, "getFileExistence"]);
