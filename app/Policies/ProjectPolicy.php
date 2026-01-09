<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    /**
     * Determine whether the user can view any models.
     * Super Admin bisa lihat semua, Perangkat Desa cuma lihat miliknya.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     * Super Admin bisa lihat semua, Perangkat Desa hanya miliknya.
     */
    public function view(User $user, Project $project): bool
    {
        return $user->isSuperAdmin() || $project->owner_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     * Semua user bisa buat project.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     * Super Admin bisa update semua, Perangkat Desa hanya miliknya.
     */
    public function update(User $user, Project $project): bool
    {
        return $user->isSuperAdmin() || $project->owner_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     * Super Admin bisa hapus semua, Perangkat Desa hanya miliknya.
     */
    public function delete(User $user, Project $project): bool
    {
        return $user->isSuperAdmin() || $project->owner_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return $user->isSuperAdmin();
    }
}
