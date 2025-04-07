<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\OTPLoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->route('admin.dashboard');
    }

    public function createForCabinet(): Response
    {
        return Inertia::render('Auth/CabinetLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
//            'telegram_redirect_uri' => config('services.telegram.redirect'),
//            'telegram_bot_name' => config('services.telegram.bot'),
        ]);
    }

    public function storeForCabinet(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->route('cabinet.dashboard');
    }

    public function otpForCabinet(OTPLoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->route('cabinet.dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function telegram() // перенаправляем юзера на яндекс Auth
    {
        return Socialite::driver('telegram')->redirect();
    }

    public function telegramCallback() // принимаем возвращаемые данные и работаем с ними
    {
        $user = Socialite::driver('telegram')->user();

        $user = User::firstOrCreate([
            'telegram_id' => $user->getId(),
        ], [
            'name' => $user->getName(),
            'telegram_id' => $user->getId(),
            'email' => $user->getEmail(),
            'password' => bcrypt(Str::random(24)),
        ]);

        Auth::login($user, true);

        redirect()->route('main');
    }
}
