<?php

declare(strict_types=1);

namespace App\Validation;

class AuthValidation
{
    public static function registerRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'in:admin,shop_owner,seller,buyer'],
        ];
    }

    public static function loginRules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ];
    }
}
