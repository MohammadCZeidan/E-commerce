<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
        ]);

        $token = JWTAuth::fromUser($user);

        return [
            'token' => $token,
            'user' => $user,
        ];
    }

    public function login(array $credentials): ?array
    {
        $token = JWTAuth::attempt($credentials);
        if (!$token) {
            return null;
        }

        return [
            'token' => $token,
            'user' => auth('api')->user(),
        ];
    }

    public function me(User $user): User
    {
        return $user;
    }

    public function logout(): void
    {
        $token = JWTAuth::getToken();
        if ($token) {
            JWTAuth::invalidate($token);
        }
    }

    public function refresh(): string
    {
        return JWTAuth::refresh(JWTAuth::getToken());
    }
}
