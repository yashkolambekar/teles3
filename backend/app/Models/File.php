<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;


    protected $fillable = [
        'tg_file_id',
        'teles3_file_id',
        'file_name',
        'created_by'
    ];



    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'files';
}
