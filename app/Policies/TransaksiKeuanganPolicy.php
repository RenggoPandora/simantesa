<?php

namespace App\Policies;

use App\Models\TransaksiKeuangan;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TransaksiKeuanganPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     * Transaksi hanya bisa dilihat oleh Super Admin atau owner project.
     */
    public function view(User $user, TransaksiKeuangan $transaksiKeuangan): bool
    {
        return $user->isSuperAdmin() || $transaksiKeuangan->project->owner_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     * Transaksi hanya bisa dibuat oleh Super Admin atau owner project.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     * Transaksi hanya bisa diupdate oleh Super Admin atau owner project.
     */
    public function update(User $user, TransaksiKeuangan $transaksiKeuangan): bool
    {
        return $user->isSuperAdmin() || $transaksiKeuangan->project->owner_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     * Transaksi hanya bisa dihapus oleh Super Admin atau owner project.
     */
    public function delete(User $user, TransaksiKeuangan $transaksiKeuangan): bool
    {
        return $user->isSuperAdmin() || $transaksiKeuangan->project->owner_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TransaksiKeuangan $transaksiKeuangan): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TransaksiKeuangan $transaksiKeuangan): bool
    {
        return $user->isSuperAdmin();
    }
}
