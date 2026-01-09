<?php

namespace App\Policies;

use App\Models\Aset;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AsetPolicy
{
    /**
     * Determine whether the user can view any models.
     * Semua user bisa lihat aset.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     * Semua user bisa lihat detail aset.
     */
    public function view(User $user, Aset $aset): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     * Semua user bisa menambah aset.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     * Semua user bisa update aset.
     */
    public function update(User $user, Aset $aset): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     * Semua user bisa hapus aset.
     */
    public function delete(User $user, Aset $aset): bool
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Aset $aset): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Aset $aset): bool
    {
        return $user->isSuperAdmin();
    }
}
