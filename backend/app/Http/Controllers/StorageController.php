<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    public static function clearTempFile(){
        Storage::deleteDirectory('temp');
    }
}
