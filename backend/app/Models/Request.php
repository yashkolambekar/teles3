<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'start',
        'end',
        'time_taken',
        'status',
        'ip_address',
        'type'
    ];



    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'requests';

}
