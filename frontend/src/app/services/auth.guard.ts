import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";
import { Api } from "./api";

export const adminGuard: CanActivateFn = (route, state) => {
    const apiService = inject(Api);
    const router = inject(Router);

    return apiService.role$.pipe(
        map(role => {
            if (role === 'admin') {
                return true;
            }
            router.navigate(['/home']);
            return false;
        })
    )
}