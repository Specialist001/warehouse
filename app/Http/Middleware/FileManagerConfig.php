<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class FileManagerConfig
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $userFolder = 'user_' . Auth::id();
            config(['lfm.user_folder_name' => $userFolder]);
        }

        return $next($request);
    }
}
