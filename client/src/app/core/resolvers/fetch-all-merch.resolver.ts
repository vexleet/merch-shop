import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IMerch } from '../models';
import { MerchService } from '../services/merch.service';

@Injectable({
    providedIn: 'root'
})
export class FetchAllMerchResolver implements Resolve<IMerch[]> {

    constructor(private merchService: MerchService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<IMerch[]> {
        return this.merchService.getAllMerch();
    }
}