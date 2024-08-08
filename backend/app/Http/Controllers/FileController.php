<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Http;
use Nette\Utils\Random;

class FileController extends Controller
{

    public static function generateTeleS3FileId()
    {
        $teles3_file_id = Random::generate(env("TELES3_FILEID_LENGTH"), '0-9a-zA-Z');
        $tokenExists = File::where('teles3_file_id', $teles3_file_id)->exists();
        if ($tokenExists) {
            return FileController::generateTeleS3FileId();
        } else {
            return $teles3_file_id;
        }
    }

    public function create(Request $request)
    {

        $request_start = time();

        $filename = '';
        if ($request->file("file")->isValid()) {
            global $filename;
            $filename = $request->file("file")->getClientOriginalName();
            $request->file("file")->storeAs("temp", $filename);
        } else {
            return response("file not valid", 400);
        }

        $responseFromTelegramAPI = Http::attach(
            'document',
            file_get_contents(storage_path('app/temp/' . $filename)),
            $request->file("file")->getClientOriginalName(),
        )->post('https://api.telegram.org/bot' . env("BOT_TOKEN") . '/sendDocument?chat_id=' . env("CHAT_ID"));

        $decodedResponse = json_decode($responseFromTelegramAPI, true);

        if (isset($decodedResponse['result']['document']['file_id'])) {
            global $tg_file_id;
            $tg_file_id = $decodedResponse['result']['document']['file_id'];
        } else if (isset($decodedResponse['result']['video']['file_id'])) {
            global $tg_file_id;
            $tg_file_id = $decodedResponse['result']['video']['file_id'];
        } else {
            echo print_r($decodedResponse['result']);
            exit();
        }

        $req_ip_address = $request->ip();

        $teles3_file_id = FileController::generateTeleS3FileId();

        $newEntry = File::create([
            "teles3_file_id" => $teles3_file_id,
            "tg_file_id" => $tg_file_id,
            "created_by" => $req_ip_address,
            "file_name" => $filename
        ]);

        StorageController::clearTempFile();

        $request_end = time();

        $time_taken = (int)$request_end - (int)$request_start;

        RequestController::register(
            $request_start,
            $request_end,
            $time_taken,
            $req_ip_address,
            $newEntry ? 1 : 0,
            'upload'
        );

        if ($newEntry) {
            return response($teles3_file_id, 200);
        } else {
            return response("error while saving entry", 500);
        }
    }






    public static function getTelegramFileId(Request $request, String $teles3_file_id)
    {

        if (strlen($teles3_file_id) != env("TELES3_FILEID_LENGTH")) {
            return response("Invalid Link", 404);
        }

        $file = File::where("teles3_file_id", $teles3_file_id)->first();

        if ($file) {

            $tg_file_id = $file["tg_file_id"];

            $file_path_req = Http::get('https://api.telegram.org/bot' . env("BOT_TOKEN") . '/getFile?file_id=' . $tg_file_id);
            $decoded_file_path_req = json_decode($file_path_req, true);
            global $file_path, $file_name;
            $file_path = $decoded_file_path_req['result']['file_path'];
            $file_name = $file["file_name"];

            return response()->streamDownload(function () {

                global $file_path, $file_name;
                echo file_get_contents('https://api.telegram.org/file/bot' . env("BOT_TOKEN") . '/' . $file_path);
            }, $file_name, [
                "Content-type" => "application/octet-stream",
                "Content-Disposition" => "attachment; filename=" . $file_name, ";",
            ]);

        } else {
            return response("File not found", 404);
        }
    }


    public static function getFileExistence(Request $requset, String $teles3_file_id)
    {

        if (strlen($teles3_file_id) != env("TELES3_FILEID_LENGTH")) {
            return response("Invalid Link", 404);
        }

        $file = File::where("teles3_file_id", $teles3_file_id)->first();

        if ($file) {
            $file_name = $file["file_name"];
            return response([
                "status" => "exists",
                "filename" => $file_name
            ], 200);
        } else {
            return response([
                "status" => "does not exist"
            ], 404);
        }
    }
}
