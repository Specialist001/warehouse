<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (auth()->guard('web')->check() && auth()->user()->hasRole(['admin', 'superadmin', 'moderator'])) {
            return $next($request);
        }

        // delete session and redirect to login page
        auth()->guard('web')->logout();
        return redirect()->route('admin.auth.login');
    }
}
