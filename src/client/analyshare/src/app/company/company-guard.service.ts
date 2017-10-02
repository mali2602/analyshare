import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';

import { SharedService } from '../shared/shared.service';

@Injectable()
export class CompanyGuard implements CanActivate, CanActivateChild {
    constructor(private sharedService: SharedService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        if (this.sharedService.getSearchDetails()) {
            return true;
        }
        this.router.navigate(['/search']);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
