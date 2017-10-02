import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SharedService } from './shared.service';

@Injectable()
export class ApiService {
    private basePath = 'http://localhost:8888/api';

    constructor(
        private http: HttpClient,
        private sharedService: SharedService
    ) {
        this.http = http;
    }
    private getUrl(path) {
        return `${this.basePath}/${path}`;
    }
    getCompanyInfo() {
        const details = this.sharedService.getSearchDetails();
        const params = new HttpParams().set('sessionid', details.sessionid);
        return this.http.get(this.getUrl(`data/${details.stockcode}`), {params});
    }
    getCashflow() {
        const details = this.sharedService.getSearchDetails();
        const params = new HttpParams().set('sessionid', details.sessionid);
        return this.http.get(this.getUrl(`cashflow/${details.stockcode}`), {params});
    }
    getBalanceSheet() {
        const details = this.sharedService.getSearchDetails();
        return this.http.get(this.getUrl(`balancesheet/${details.mccode}`));
    }
    getProfitLoss() {
        const details = this.sharedService.getSearchDetails();
        return this.http.get(this.getUrl(`profitloss/${details.mccode}`));
    }
}
